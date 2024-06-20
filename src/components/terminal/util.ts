import { Bang, BangConfig, LocalConfig, Param, ParamOption, ProcessedBang, ProcessedParam } from '../../models/terminal';

export const loadBangs = (): Promise<BangConfig[]> => {
    // TODO: load this from local storage
    const BANGS: string[] = [];
    return Promise.all(
        BANGS.map((url) => fetch(url).then((res) => res.json()))
    );
};

export const preprocessBangs = (bangConfigs: BangConfig[]): Bang[] => {
    const flatten: Bang[] = [];
    for (const config of bangConfigs) {
        for (const bang of config.bangs) {
            flatten.push({
                ...bang,
                source: config.title,
                params: bang.params.map((p: Param | { template: string; }) =>
                    'template' in p ?
                        { ...config.paramsTemplate[p.template], ...p }
                        : p
                )
            });
        }
    }
    return flatten;
};

export const filterBangs = (loadedBangs: Bang[], prefix: string): Bang[] => {
    return prefix === ''
        ? []
        : loadedBangs.filter((b) => (
            b.commands.findIndex((cmd) => cmd.startsWith(prefix)) !== -1
        ));
};

export const processBang = (bang: Bang, query: string): ProcessedBang => {
    const words = query.split(' ');
    const cmd = bang.commands.find((cmd) => cmd.startsWith(words[0] || '')) || '';
    const processedParams: ProcessedParam[] = bang.params.map((p) => ({
        key: p.key,
        text: p.default,
        value: findOption(p.default, p.options) || p.default,
        default: true,
        original: p,
    }));

    // 1. Process the query
    let collectedDependencies: { [key: string]: string; } = {};
    let lastProcessedParamIdx = 0;
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        let paramIdx = processedParams.findIndex((p) => p.default);
        if (paramIdx === -1) continue;

        let option = null;
        for (let j = 0; j < bang.params.length; j++) {
            const o = findOption(word, bang.params[j].options || {});
            if (!!o) {
                option = o;
                paramIdx = j;
                if (!!bang.params[j].options?.[o]?.dependencies) {
                    collectedDependencies = { ...collectedDependencies, ...bang.params[j].options?.[o].dependencies };
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
        suggestions.push(cmd);
    } else if (!processedParams[lastProcessedParamIdx].original.options) {
        const lastWord = words[words.length - 1];
        const historyKey = processedParams[lastProcessedParamIdx].original.history || '';
        const history = loadHistory(historyKey);
        suggestions.push(...Object.keys(history)
            .filter((v) => v.startsWith(lastWord))
            .sort((a, b) => history[a] < history[b] ? 1 : -1)
            .map((k) => words.filter((_, idx) => idx !== words.length - 1).join(' ') + ' ' + k)
        );
    } else {
        const lastWord = words[words.length - 1];
        suggestions.push(...Object.keys(processedParams[lastProcessedParamIdx].original.options || {})
            .filter((v) => v.startsWith(lastWord))
            .map((k) => words.filter((_, idx) => idx !== words.length - 1).join(' ') + ' ' + k)
        );
    }

    // 3. Fill the rest of params, with dependency in mind
    for (let i = 0; i < processedParams.length; i++) {
        const param = processedParams[i];
        if (param.default && param.key in collectedDependencies) {
            param.value = findOption(collectedDependencies[param.key], processedParams[i].original.options) || '';
            param.text = collectedDependencies[param.key];
        }
    }

    // 4. Generate the target
    let target = bang.target;
    for (let i = 0; i < processedParams.length; i++) {
        const param = processedParams[i];
        target = target.replace('${' + param.key + '}', param.value);
    }

    return {
        title: [cmd, ...processedParams.map((p) => `[${p.key}:${p.text}]`)].join(' '),
        history: processedParams.filter((p) => !!p.original.history).map((p) => ({ key: p.original.history || '', value: p.value })),
        target: target,
        suggestions: suggestions,
    };
};

export const findOption = (word: string, options?: ParamOption): string | null => {
    for (const k in options) {
        if (k === word || options[k].aliases.findIndex((a) => a === word) !== -1) {
            return k;
        }
    }
    return null;
};

// Control how recency affects the suggestion ranking.
// 1 means only suggest the last one, ignore the old and 0 means
// no history is recorded.
const RECENCY_FACTOR = 0.05;
const HISTORY_PRECISION = 100_000;

export const recordHistory = (history: { key: string; value: string; }[]): void => {
    const terminal = JSON.parse(localStorage.getItem('terminal') || '{}') as LocalConfig;
    if (!terminal.history) terminal.history = {};
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

export const loadHistory = (historyKey: string): { [key: string]: number; } => {
    const terminal = JSON.parse(localStorage.getItem('terminal') || '{}') as LocalConfig;
    if (!!terminal.history) {
        return terminal.history[historyKey] || {};
    }
    return {};
};
