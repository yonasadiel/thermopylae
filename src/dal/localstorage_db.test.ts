import { describe, expect, test } from '@jest/globals';
import localStorageDB from './localstorage_db';

describe('Local Storage DB', () => {
    const defaultTestSettings = {
        backgroundParticlesEnabled: true,
        quoteEnabled: true,
        quoteCustom: [],
        quotePreloaded: [],
        themeBackgroundColor: '#000000',
        themeBackgroundImagePath: '',
        themeForegroundColor: '#ffffff',
        themeBackgroundParticlesEnabled: true,
    };

    test('should save and load', () => {
        localStorageDB.save('settings', defaultTestSettings);
        const loaded = localStorageDB.load('settings');
        expect(loaded).toEqual(defaultTestSettings);
    });
});

