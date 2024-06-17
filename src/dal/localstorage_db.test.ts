import { describe, expect, test } from '@jest/globals';
import localStorageDB from './localstorage_db';

describe('Local Storage DB', () => {
    const defaultTestSettings = {
        backgroundParticlesEnabled: true,
        quoteEnabled: true,
        quoteCustom: [],
        quotePreloaded: [],
    };

    test('should save and load', () => {
        localStorageDB.save('settings', defaultTestSettings);
        const loaded = localStorageDB.load('settings');
        expect(loaded).toEqual(defaultTestSettings);
    });
});

