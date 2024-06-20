/// <reference types="chrome"/>
import { Config } from './types';


const localStorageDB = {
    save<K extends keyof Config>(database: K, data: Config[K]): void {
        localStorage.setItem(database, JSON.stringify(data));
    },
    load<K extends keyof Config>(database: K): Config[K] | null {
        const data = localStorage.getItem(database);
        if (!data) return null;

        return JSON.parse(data);
    },
};

export default localStorageDB;
