import { Quote } from '../quote/types';

export interface Settings {
    backgroundImagePath?: string;
    backgroundParticlesEnabled: boolean;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
}
