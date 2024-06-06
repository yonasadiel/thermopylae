export interface Quote {
    text: string;
    subtext?: string;
}

export interface PreloadedQuote {
    name: string;
    title: string;
    quotes: Quote[];
}

export interface QuoteSetting {
    preloaded: string[];
    quotes: Quote[];
}