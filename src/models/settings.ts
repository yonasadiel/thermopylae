import { Quote } from './quote';

export interface Settings {
    backgroundImagePath?: string;
    backgroundParticlesEnabled: boolean;
    backgroundParticlesConfig: any;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
    terminalURLs: string[];
}
