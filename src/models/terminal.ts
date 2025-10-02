export interface ParamOption {
    value: string;
    aliases: string[];
    aliasGroups: string[];
    dependencies?: { [key: string]: string };
}

export interface Param {
    key: string;
    default: string;
    options?: ParamOption[];
    history?: string;
}

export interface Bang {
    source: string;
    commands: string[];
    params: Param[];
    target: string;
}

export interface LocalConfig {
    history?: { [key: string]: { [value: string]: number } };
}

export interface BangConfig {
    title: string;
    bangs: (
        Omit<Bang, 'params'> &
        { params: (Param | { template: string })[]}
    )[];
    paramsTemplate: { [key: string]: Param }
    aliasGroups: { [key: string]: string[] }
}

export interface ProcessedParam {
    key: string;
    text: string;
    value: string;
    default: boolean;
    original: Param;
}

export interface ProcessedBang {
    title: string;
    history: { key: string; value: string }[];
    target: string;
    suggestions: string[];
}
