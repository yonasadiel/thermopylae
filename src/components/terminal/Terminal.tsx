import { KeyboardEvent, useMemo, useState } from 'react';
import { filterBangs, preprocessBangs, processBang, recordHistory } from './util';
import { ProcessedBang } from '../../models/terminal';
import useSettings from '../../hooks/useSettings';
import './Terminal.css';

export default function Terminal() {
    const { settings } = useSettings();
    const [query, setQuery] = useState<string>('');
    
    const loadedBangs = useMemo(() => {
        const processedBangs = preprocessBangs(settings.terminalBangConfigs);
        console.log(`Loaded ${processedBangs.length} bangs from settings`);
        return processedBangs;
    }, [settings.terminalBangConfigs]);
    
    const filteredBangs = useMemo(() => {
        const firstWord = query.split(' ')[0] || '';
        return filterBangs(loadedBangs, firstWord);
    }, [query, loadedBangs]);
    const processedBang = useMemo<ProcessedBang | null>(() => {
        if (!!filteredBangs && filteredBangs.length > 0) return processBang(filteredBangs[0], query)
        return null
    }, [filteredBangs, query]);

    const handleKeyDown = (ev?: KeyboardEvent<HTMLInputElement>) => {
        if (ev?.code === 'Enter') {
            if (!!processedBang) {
                recordHistory(processedBang.history);
                window.location.replace(processedBang.target);
            } else {
                console.warn('no bang available'); // TODO: show toast or something
            }
        } else if (ev?.code === 'Tab') {
            ev.preventDefault();
            if (!!processedBang && !!processedBang.suggestions?.[0]) {
                setQuery(processedBang.suggestions[0]);
            } else {
                console.warn('no suggestion available'); // TODO: show toast or something
            }
        }
    }

    return (
        <div className="terminal">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                onKeyDown={(ev) => handleKeyDown(ev)}
                list="bangs" />
            <div
                id="bangs">
                {!!processedBang && (
                    <>
                        <div className="target">{processedBang.target}</div>
                        {processedBang.suggestions.map((suggestion) => (
                            <div className="suggestion" key={suggestion}>
                                <p className="pattern">{suggestion}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

