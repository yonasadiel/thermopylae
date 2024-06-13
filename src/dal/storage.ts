import { Database } from './types';
import LocalStorageDB from './localstorage_db';

export const storage: Database = new LocalStorageDB();