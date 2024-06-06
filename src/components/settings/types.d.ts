export interface Settings {
    backgroundImagePath?: string;
    backgroundParticlesEnabled: boolean;
    particlesConfig: any;
    group: Group[];
    quotes: Quote[];
}

export interface Quote {
    text: string;
    subtext: string;
}

export interface Group {
    title: string;
    bangs: Bang[];
}

export interface Bang {
    commands: string[];
    description: string;
    target: string;
    params: Param[];
}

export interface Param {
    key: string;
    default: string?;
}