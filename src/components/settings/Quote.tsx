import { useSettings } from '../../hooks';
import preloadedQuotes from '../quote/preloaded';
import { Quote } from '../quote/types';
import './Quote.css';

const QuoteSettings = () => {
    const { settings, setSettingValue } = useSettings();
    const handlePreloadedChange = (name: string, active: boolean) => {
        if (active) {
            setSettingValue('quotePreloaded', [...settings.quotePreloaded, name]);
        } else {
            setSettingValue('quotePreloaded', [...settings.quotePreloaded.filter((v) => v !== name)]);
        }
    }
    const updateCustomQuote = (idx: number, q: Quote) =>
        setSettingValue('quoteCustom', [...settings.quoteCustom.slice(0, idx), q, ...settings.quoteCustom.slice(idx+1)]);

    return (
        <div className="quote-settings">
            <div className="input-group">
                <label>General</label>
                <p>
                    <input
                        type="checkbox"
                        checked={settings.quoteEnabled}
                        onChange={(e) => setSettingValue('quoteEnabled', e.currentTarget.checked)}/>
                    <span>Enabled</span>
                </p>
            </div>
            <div className="input-group">
                <label>Preloaded Quotes</label>
                {preloadedQuotes.map((q) => (
                    <p key={q.name} className="preloaded-option">
                        <input
                            type="checkbox"
                            checked={settings.quotePreloaded.findIndex((v) => v === q.name) !== -1}
                            onChange={(e) => handlePreloadedChange(q.name, !!e.currentTarget.checked)} />
                        <span>{q.title}</span>
                    </p>
                ))}
            </div>
            <div className="input-group">
                <label>Custom Quotes</label>
                {settings.quoteCustom.map((q, idx) => (
                    <div key={idx} className="custom-row">
                        <input
                            type="text"
                            value={q.text}
                            placeholder="Main Text"
                            onChange={(e) => updateCustomQuote(idx, { text: e.currentTarget.value, subtext: q.subtext })} />
                        <textarea placeholder="Subtext here..." cols={40} onChange={(e) => updateCustomQuote(idx, { text: q.text, subtext: e.currentTarget.value})}>{q.subtext}</textarea>
                    </div>
                ))}
                <p>
                    <button
                        type="button"
                        onClick={() => setSettingValue('quoteCustom', [...settings.quoteCustom, { text: '' }])}>
                        add
                    </button>
                </p>
            </div>
        </div>
    );
}

export default QuoteSettings;
