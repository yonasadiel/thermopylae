import { useState } from 'react';
import ClockSettings from '../clock/ClockSettings';
import QuoteSettings from '../quote/QuoteSettings';
import './Settings.css';
import ThemeSettings from './Theme';

export interface SettingsProps {
    onClose: () => void
}

const MENU_THEME = 'theme';
const MENU_TERMINAL = 'terminal';
const MENU_CLOCK = 'clock';
const MENU_QUOTE = 'quote';

export default function Settings(props: SettingsProps) {
    const { onClose } = props;
    const [menu, setMenu] = useState(MENU_THEME);
    return (
        <div className="settings">
            <div className="close-button" onClick={() => onClose()}>
                {/* TODO: make this custom color */}
                <img alt="cross" src="/assets/cross.svg" width="20px" height="20px" />
            </div>
            <div className="navbar">
                <div className={`menu ${menu === MENU_THEME ? 'active' : ''}`} onClick={() => setMenu(MENU_THEME)}>Theme</div>
                <div className={`menu ${menu === MENU_TERMINAL ? 'active' : ''}`} onClick={() => setMenu(MENU_TERMINAL)}>Terminal</div>
                <div className={`menu ${menu === MENU_CLOCK ? 'active': ''}`} onClick={() => setMenu(MENU_CLOCK)}>Clocks</div>
                <div className={`menu ${menu === MENU_QUOTE ? 'active' : ''}`} onClick={() => setMenu(MENU_QUOTE)}>Quote</div>
            </div>
            <div className="divider" />
            <div className="settings-content">
                {menu === MENU_THEME && <ThemeSettings />}
                {menu === MENU_TERMINAL && <TerminalSettings />}
                {menu === MENU_CLOCK && <ClockSettings />}
                {menu === MENU_QUOTE && <QuoteSettings />}
            </div>
        </div>
    )
}

const TerminalSettings = () => {
    return <div></div>
}
