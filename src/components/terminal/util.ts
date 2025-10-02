import { Bang, BangConfig, LocalConfig, Param, ParamOption, ProcessedBang, ProcessedParam } from '../../models/terminal';

// preprocessBangs from bang config into a structure that is easy to process.
// 1. It flattens out bangs from multiple configs to one list of bangs.
// 2. If the bang has a templated param, we duplicate the template so the processor doesn't need to lookup the template
// 3. If the bang has an aliasGroups param, we duplicate the aliases from the aliasGroups.
export const preprocessBangs = (bangConfigs: BangConfig[]): Bang[] => {
    const flatten: Bang[] = [];
    for (const config of bangConfigs) {
        for (const bang of config.bangs) {
            flatten.push({
                ...bang,
                source: config.title,
                params: bang.params.map((paramOrTemplate: Param | { template: string }) => {
                    // if the param is a template, load the template.
                    const p: Param = ('template' in paramOrTemplate) ? { ...config.paramsTemplate[paramOrTemplate.template], ...paramOrTemplate } as Param : paramOrTemplate;
                    // backward compatibility: old options are an object, we convert them to an array.
                    if (Object.prototype.toString.apply(p.options) === '[object Object]') {
                        const oldOptions = ((p.options as unknown) as { [k: string]: ParamOption });
                        p.options = [];
                        for (let k in oldOptions) {
                            p.options.push({ ...oldOptions[k], value: k });
                        }
                    }
                    // We add the aliases from the aliasGroups.
                    !!p.options && p.options?.forEach((o) => {
                        !!o.aliasGroups && o.aliasGroups.forEach((a) => {
                            o.aliases = [...(o.aliases ?? []), ...(config.aliasGroups[a] || [])];
                        });
                    });
                    return p;
                })
            });
        }
    }
    return flatten;
};

export const processBang = (processedBangs: Bang[], query: string): ProcessedBang => {
    const firstWord = query.split(' ')[0] || '';
    const bang = processedBangs.find((b) => b.commands.findIndex((cmd) => cmd.startsWith(firstWord)) !== -1);
    if (!bang) return { title: query, history: [], target: '', suggestions: [] };

    const words = query.split(' ');
    const cmd = bang.commands.find((cmd) => cmd.startsWith(words[0] || '')) || '';
    const processedParams: ProcessedParam[] = bang.params.map((p) => ({
        key: p.key,
        text: p.default,
        value: findOption(p.default, p.options)?.value || p.default,
        default: true,
        original: p,
    }));

    // 1. Process the query
    let collectedDependencies: { [key: string]: string } = {};
    let lastProcessedParamIdx = 0;
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        let paramIdx = processedParams.findIndex((p) => p.default);
        if (paramIdx === -1) continue;

        let option = null;
        for (let j = 0; j < bang.params.length; j++) {
            const o = findOption(word, bang.params[j].options);
            if (!!o) {
                option = o.value;
                paramIdx = j;
                if (!!o?.dependencies) {
                    collectedDependencies = { ...collectedDependencies, ...o.dependencies };
                }
            }
        }
        processedParams[paramIdx].text = word;
        processedParams[paramIdx].value = !!option ? option : word;
        processedParams[paramIdx].default = false;
        lastProcessedParamIdx = paramIdx;
    }

    // 2. Calculate suggestions
    const suggestions: string[] = [];
    if (words.length === 1) {
        // case 1: look for the command
        suggestions.push(...processedBangs.map((b) => b.commands.find((cmd) => cmd.startsWith(words[0])) || '').filter((v) => v !== ''));
    } else if (!processedParams[lastProcessedParamIdx].original.options) {
        // case 2: there are no options, so we show history
        const lastWord = words[words.length - 1];
        const historyKey = processedParams[lastProcessedParamIdx].original.history || '';
        const history = loadHistory(historyKey);
        suggestions.push(...Object.keys(history)
            .filter((v) => v.startsWith(lastWord))
            .sort((a, b) => history[a] < history[b] ? 1 : -1)
            .map((k) => words.filter((_, idx) => idx !== words.length - 1).join(' ') + ' ' + k)
        );
    } else {
        // case 3: show options
        const lastWord = words[words.length - 1];
        suggestions.push(...(processedParams[lastProcessedParamIdx].original.options ?? [])
            .map((o) => o.value.startsWith(lastWord) ? o.value : o.aliases.find((a) => a.startsWith(lastWord)) || '')
            .filter((v) => v != '')
            .map((k) => words.filter((_, idx) => idx !== words.length - 1).join(' ') + ' ' + k)
        );
    }

    // 3. Fill the rest of params, with dependency in mind
    for (let i = 0; i < processedParams.length; i++) {
        const param = processedParams[i];
        if (param.default && param.key in collectedDependencies) {
            param.value = findOption(collectedDependencies[param.key], processedParams[i].original.options)?.value ?? '';
            param.text = collectedDependencies[param.key];
        }
    }

    // 4. Generate the target
    let target = bang.target;
    for (let i = 0; i < processedParams.length; i++) {
        const param = processedParams[i];
        target = target.replace('${' + param.key + '}', param.value);
    }

    const processedBang = {
        title: [cmd, ...processedParams.map((p) => `[${p.key}:${p.text}]`)].join(' '),
        history: processedParams.filter((p) => !!p.original.history).map((p) => ({ key: p.original.history || '', value: p.value })),
        target: target,
        suggestions: suggestions.slice(0, 10),
    };
    return processedBang
};

export const findOption = (word: string, options?: ParamOption[]): ParamOption | null => {
    if (!options) return null;
    for (let i=0; i<options?.length; i++) {
        if (options[i].aliases.findIndex((a) => a === word) !== -1) {
            return options[i];
        }
    }
    return null;
};

// Control how recency affects the suggestion ranking.
// 1 means only suggest the last one, ignore the old and 0 means
// no history is recorded.
const RECENCY_FACTOR = 0.05;
const HISTORY_PRECISION = 100_000;

export const recordHistory = (history: { key: string; value: string }[]): void => {
    const terminal = JSON.parse(localStorage.getItem('terminal') || '{}') as LocalConfig;
    if (!terminal.history) terminal.history = {}
    for (let i = 0; i < history.length; i++) {
        const { key, value } = history[i];
        if (!(key in terminal.history)) {
            terminal.history[key] = {};
        }
        let leftover = HISTORY_PRECISION;
        for (let v in terminal.history[key]) {
            terminal.history[key][v] = Math.floor(terminal.history[key][v] * (1 - RECENCY_FACTOR));
            leftover -= terminal.history[key][v];
        }
        if (!(value in terminal.history[key])) {
            terminal.history[key][value] = 0;
        }
        terminal.history[key][value] += leftover;
    }
    localStorage.setItem('terminal', JSON.stringify(terminal));
};

export const loadHistory = (historyKey: string): { [key: string]: number } => {
    const terminal = JSON.parse(localStorage.getItem('terminal') || '{}') as LocalConfig;
    if (!!terminal.history) {
        return terminal.history[historyKey] || {};
    }
    return {};
};
