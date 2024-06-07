import { Quote } from './quote';

export interface Settings {
    backgroundImagePath?: string;
    backgroundParticlesEnabled: boolean;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
}
