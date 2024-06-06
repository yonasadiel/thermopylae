import { useSettings } from '../../hooks';
import preloadedQuotes from '../quote/preloaded';
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
        </div>
    );
}

export default QuoteSettings;
