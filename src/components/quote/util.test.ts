import { describe, expect, test } from '@jest/globals';
import { filterPreloadedQuotes, shuffle } from './util';
import preloadedQuotes from './preloaded';

describe('Quote Util', () => {
    describe('filterPreloadedQuotes', () => {
        test('should shuffle if there are no filters', () => {
            const array = preloadedQuotes;
            const shuffled = filterPreloadedQuotes(array, []);
            expect(shuffled).toEqual([]);
        });
        test('should filter out keys', () => {
            const array = preloadedQuotes;
            const shuffled = filterPreloadedQuotes(array, [array[0].name]);
            for (const q of array[0].quotes) {
                expect(shuffled).toContain(q);
            }
            expect(shuffled.length).toBe(array[0].quotes.length);
        });
    });

    describe('shuffle', () => {
        test('should shuffle', () => {
            const array = [1, 2, 3, 4, 5];
            const original = [...array];
            const shuffled = shuffle(array);
            expect(original).not.toEqual(shuffled); // Should be shuffled
            expect(shuffled).toBe(array); // Should be in place
        });
    });
});
