import { useEffect, useState } from 'react';
import { loadPreloadedQuotes, loadQuotes } from './util';
import { Quote } from './types';
import './Quote.css'

const ENABLE_NEXT_BUTTON = false;
const QUOTE_PRELOADED_RESOURCES = [
    'data/quote-life.json',
    'data/quote-pragmatic-programmer.json',
    'data/quote-programming.json',
];

const Quote = () => {
    const [activeQuotes, setActiveQuotes] = useState<Quote[]>([]);
    useEffect(() => {
        loadPreloadedQuotes(QUOTE_PRELOADED_RESOURCES)
            .then((preloadedQuotes) => setActiveQuotes(loadQuotes(preloadedQuotes)));
    }, [QUOTE_PRELOADED_RESOURCES]);

    const seed = Math.floor((new Date()).getTime() / (60 * 60 * 1000));
    const quoteToShow = activeQuotes[seed % activeQuotes.length] || {};

    return (
        <div className="quote">
            <div className="text-line" style={{ maxWidth: 500 }}>
                <span>{quoteToShow.text}</span>
            </div>
            <div className="subtext-line" style={{ maxWidth: 600 }}>
                <span>{quoteToShow.subtext}</span>
            </div>
            {ENABLE_NEXT_BUTTON && (
                <div className="nav-line">Next&gt;&gt;</div>
            )}
        </div>
    );
}

export default Quote;
