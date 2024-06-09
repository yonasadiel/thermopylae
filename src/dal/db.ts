export enum Database {
    Settings = "settings",
}

// Loads the data from the database.
export const Load = (database: Database): any => {
    const data = localStorage.getItem(database);
    if (!data) return undefined;
    return JSON.parse(data);
}

export const Save = (database: Database, data: any) => {
    localStorage.setItem(database, JSON.stringify(data));
}
