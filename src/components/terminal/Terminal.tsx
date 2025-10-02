import { KeyboardEvent, useMemo, useState } from 'react';
import useSettings from '../../hooks/useSettings';
import { ProcessedBang } from '../../models/terminal';
import './Terminal.css';
import { preprocessBangs, processBang, recordHistory } from './util';

export default function Terminal() {
    const { settings } = useSettings();
    const [query, setQuery] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);
    
    const loadedBangs = useMemo(() => {
        const processedBangs = preprocessBangs(settings.terminalBangConfigs);
        console.log(`Loaded ${processedBangs.length} bangs from settings`);
        return processedBangs;
    }, [settings.terminalBangConfigs]);
    
    const processedBang = useMemo<ProcessedBang | null>(() => {
        return processBang(loadedBangs, query);
    }, [loadedBangs, query]);

    // Reset suggestion index when query changes
    useMemo(() => {
        setSelectedSuggestionIndex(-1);
    }, [query]);

    const handleKeyDown = (ev?: KeyboardEvent<HTMLInputElement>) => {
        if (ev?.code === 'Enter') {
            if (!!processedBang && selectedSuggestionIndex >= 0 && processedBang.suggestions.length > 0) {
                // Select current suggestion
                setQuery(processedBang.suggestions[selectedSuggestionIndex] + ' ');
            } else if (!!processedBang) {
                recordHistory(processedBang.history);
                window.location.replace(processedBang.target);
            } else {
                console.warn('no bang available'); // TODO: show toast or something
            }
        } else if (ev?.code === 'Tab') {
            ev.preventDefault();
            if (!!processedBang && processedBang.suggestions.length > 0) {
                // Cycle through suggestions
                const nextIndex = (selectedSuggestionIndex + 1) % processedBang.suggestions.length;
                setSelectedSuggestionIndex(nextIndex);
            }
        } else if (ev?.code === 'ArrowDown') {
            ev.preventDefault();
            if (!!processedBang && processedBang.suggestions.length > 0) {
                const nextIndex = (selectedSuggestionIndex + 1) % processedBang.suggestions.length;
                setSelectedSuggestionIndex(nextIndex);
            }
        } else if (ev?.code === 'ArrowUp') {
            ev.preventDefault();
            if (!!processedBang && processedBang.suggestions.length > 0) {
                const prevIndex = selectedSuggestionIndex <= 0 
                    ? processedBang.suggestions.length - 1 
                    : selectedSuggestionIndex - 1;
                setSelectedSuggestionIndex(prevIndex);
            }
        } else if (ev?.code === 'ArrowRight' || (ev?.code === 'Space' && selectedSuggestionIndex >= 0)) {
            if (!!processedBang && selectedSuggestionIndex >= 0 && processedBang.suggestions.length > 0) {
                ev.preventDefault();
                // Select current suggestion
                setQuery(processedBang.suggestions[selectedSuggestionIndex] + ' ');
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
                onFocus={() => setFocused(true)}
                list="bangs" />
            <div id="bangs">
                {focused && !!processedBang && (
                    <>
                        <div className="target">{processedBang.target}</div>
                        {processedBang.suggestions.map((suggestion, index) => (
                            <div 
                                className={`suggestion ${index === selectedSuggestionIndex ? 'selected' : ''}`} 
                                key={suggestion}
                            >
                                <p className="pattern">{suggestion}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

