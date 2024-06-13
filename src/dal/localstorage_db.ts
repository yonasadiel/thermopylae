import { ConfigKeys } from "./types";


class LocalStorageDB {
    Save(database: ConfigKeys, data: any) {
        localStorage.setItem(database, JSON.stringify(data));
    }

    Load(database: ConfigKeys): any {
        const data = localStorage.getItem(database);
        if (!data) return undefined;
        return JSON.parse(data);
    }
}

export default LocalStorageDB;
