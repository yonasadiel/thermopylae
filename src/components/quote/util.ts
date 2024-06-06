import { PreloadedQuote, Quote, QuoteSetting } from "./types";

// Fisher–Yates shuffle, in place
export function shuffle(array: Quote[]): Quote[] {
    let currentIndex = array.length, randomIndex;
    let randomSeed = 1337; // Magic number because Math.random() is not seedable
    while (currentIndex !== 0) {
        randomSeed = (1103515245 * randomSeed + 12345) % 2147483648; // Linear congruential generator, glibc seed
        randomIndex = randomSeed % currentIndex;
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function loadPreloadedQuotes(preloadedQuotesPath: string[]): Promise<PreloadedQuote[]> {
    const get = (url: string) => new Promise<PreloadedQuote>((resolve, _reject) => {
        const req = new XMLHttpRequest();
        req.addEventListener('load', (data: Event) => {
            resolve(JSON.parse((data.target as XMLHttpRequest).responseText) as PreloadedQuote);
        });
        req.open('GET', url);
        req.send();
    });
    return Promise.all(preloadedQuotesPath.map((v) => get(v)));
}

const QUOTE_LOCAL_STORAGE_KEY = 'quote';

export function loadQuotes(preloadedQuotes: PreloadedQuote[]): Quote[] {
    const activeQuotes: Quote[] = []
    const quoteData = (JSON.parse(localStorage.getItem(QUOTE_LOCAL_STORAGE_KEY) || 'null') as QuoteSetting) || { preloaded: ['life']};
    if (quoteData.quotes) {
        activeQuotes.push(...quoteData.quotes); // TODO: feature to manually add a quote
        console.log(`Loaded ${quoteData.quotes.length} from local storage`);
    }
    for (const preloadedName of quoteData.preloaded) {
        const preloaded = preloadedQuotes.find((v) => v.name === preloadedName);
        if (!preloaded) continue;
        activeQuotes.push(...preloaded.quotes);
        console.log(`Loaded ${preloaded.quotes.length} ${preloaded.title} quotes`);
    }
    shuffle(activeQuotes);
    return activeQuotes;
}