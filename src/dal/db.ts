export enum ConfigKeys {
    Settings = 'settings',
}

export interface Database {
    Save: (database: ConfigKeys, data: any) => void;
    Load: (database: ConfigKeys) => any;
}

// Loads the data from the database.
export const Load = (database: ConfigKeys): any => {
    const data = localStorage.getItem(database);
    if (!data) return undefined;
    return JSON.parse(data);
}

export const Save = (database: ConfigKeys, data: any) => {
    localStorage.setItem(database, JSON.stringify(data));
}
