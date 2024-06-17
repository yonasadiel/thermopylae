import { PreloadedQuote, Quote } from '../../models/quote';

// Fisher–Yates shuffle, in place
export const shuffle = <T extends any>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    let randomSeed = 1337; // Magic number because Math.random() is not seedable
    while (currentIndex !== 0) {
        randomSeed = (1103515245 * randomSeed + 12345) % 2147483648; // Linear congruential generator, glibc seed
        randomIndex = randomSeed % currentIndex;
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};


export function filterPreloadedQuotes(preloadedQuotes: PreloadedQuote[], keys: string[]): Quote[] {
    const activeQuotes: Quote[] = [];
    for (const preloadedName of keys) {
        const preloaded = preloadedQuotes.find((v) => v.name === preloadedName);
        if (!preloaded) continue;
        activeQuotes.push(...preloaded.quotes);
        console.log(`Loaded ${preloaded.quotes.length} ${preloaded.title} quotes`);
    }
    shuffle(activeQuotes);
    return activeQuotes;
}
