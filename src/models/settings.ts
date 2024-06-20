import { Quote } from './quote';

export interface Settings {
    themeForegroundColor: string;
    themeBackgroundColor: string;
    themeBackgroundImageBase64?: string;
    themeBackgroundParticlesEnabled: boolean;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
}
