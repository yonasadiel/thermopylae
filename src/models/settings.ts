import { Clock } from './clock';
import { Quote } from './quote';
import { BangConfig } from './terminal';

export interface Settings {
    themeForegroundColor: string;
    themeBackgroundColor: string;
    themeBackgroundImageEnabled: boolean;
    themeBackgroundParticlesEnabled: boolean;
    quoteEnabled: boolean;
    quotePreloaded: string[];
    quoteCustom: Quote[];
    clocks: Clock[];
    clocks12Hour: boolean;
    terminalBangConfigs: BangConfig[];
}
