import { Quote } from './quote';

export interface Settings {
    themeForegroundColor: string;
    themeBackgroundColor: string;
    themeBackgroundImagePath?: string;
    themeBackgroundParticlesEnabled: boolean;
    themeBackgroundParticlesConfig: any;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
    terminalURLs: string[];
}
