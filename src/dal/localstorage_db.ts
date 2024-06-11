import { Database, ConfigKeys } from "./db";


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


// For Type checking.
const _: Database = new LocalStorageDB();

export default LocalStorageDB;