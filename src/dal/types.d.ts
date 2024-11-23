import { Settings } from '../models/settings';

export type Config = {
    settings: Settings,
    backgroundImage: string,
}

export interface Database {
    save<K extends keyof Config>(database: K, data: Config[K]): void;
    load<K extends keyof Config>(database: K): Config[K] | null;
}
