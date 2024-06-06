import { useEffect, useState } from "react";
import "./Quote.css";
import { useSettings } from "../../hooks";
import { Quote } from "../settings/types";

const ENABLE_NEXT_BUTTON = false;

const Quote = () => {
  const { settings } = useSettings();
  const [activeQuotes, setActiveQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    setActiveQuotes(settings.quotes);
  }, [settings]);

  const seed = Math.floor(new Date().getTime() / (60 * 60 * 1000));
  const quoteToShow = activeQuotes[seed % activeQuotes.length] || {};

  return (
    <div className="quote">
      <div className="text-line" style={{ maxWidth: 500 }}>
        <span>{quoteToShow.text}</span>
      </div>
      <div className="subtext-line" style={{ maxWidth: 600 }}>
        <span>{quoteToShow.subtext}</span>
      </div>
      {ENABLE_NEXT_BUTTON && <div className="nav-line">Next&gt;&gt;</div>}
    </div>
  );
};

export default Quote;
