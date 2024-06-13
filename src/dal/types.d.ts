export enum ConfigKeys {
    Settings = "settings",
}

export interface Database {
    Save: (database: ConfigKeys, data: any) => void;
    Load: (database: ConfigKeys) => any;
}
