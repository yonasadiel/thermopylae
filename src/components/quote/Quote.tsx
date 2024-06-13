import { useEffect, useState } from "react";
import { filterPreloadedQuotes } from "./util";
import { Quote } from "../../models/quote";
import { useSettings } from "../../hooks";
import preloadedQuotes from "./preloaded";
import "./Quote.css";

const ENABLE_NEXT_BUTTON = false;

const Quote = () => {
    const [activeQuotes, setActiveQuotes] = useState<Quote[]>([]);
    const { settings } = useSettings();
    useEffect(() => {
        setActiveQuotes([
            ...filterPreloadedQuotes(preloadedQuotes, settings.quotePreloaded),
            ...settings.quoteCustom,
        ]);
    }, [settings.quotePreloaded, settings.quoteCustom]);

    const seed = Math.floor(new Date().getTime() / (60 * 60 * 1000));
    const quoteToShow = activeQuotes[seed % activeQuotes.length] || {};

    return (
        <div
            className="quote"
            style={{ display: settings.quoteEnabled ? "flex" : "none" }}
        >
            <div className="text-line">
                <span>{quoteToShow.text}</span>
            </div>
            <div className="subtext-line">
                <span>{quoteToShow.subtext}</span>
            </div>
            {ENABLE_NEXT_BUTTON && <div className="nav-line">Next&gt;&gt;</div>}
        </div>
    );
};

export default Quote;
