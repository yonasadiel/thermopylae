import { Quote } from './quote';

export interface Settings {
    themeForegroundColor: string;
    themeBackgroundColor: string;
    themeBackgroundImagePath?: string;
    themeBackgroundParticlesEnabled: boolean;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
}
