import { useState } from 'react';
import BackgroundSettings from './Background';
import QuoteSettings from './Quote';
import './Settings.css';

export interface SettingsProps {
    onClose: () => void
}

const MENU_BACKGROUND = 'background';
const MENU_QUOTE = 'quote';
const MENU_TERMINAL = 'terminal';

export default function Settings(props: SettingsProps) {
    const { onClose } = props;
    const [menu, setMenu] = useState(MENU_BACKGROUND);
    return (
        <div className="settings">
            <div className="close-button" onClick={() => onClose()}>
                <img alt="cross" src="/assets/cross.svg" width="20px" height="20px" />
            </div>
            <div className="navbar">
                <div className={`menu ${menu === MENU_BACKGROUND ? 'active' : ''}`} onClick={() => setMenu(MENU_BACKGROUND)}>Background</div>
                <div className={`menu ${menu === MENU_QUOTE ? 'active' : ''}`} onClick={() => setMenu(MENU_QUOTE)}>Quote</div>
                <div className={`menu ${menu === MENU_TERMINAL ? 'active' : ''}`} onClick={() => setMenu(MENU_TERMINAL)}>Terminal</div>
            </div>
            <div className="divider" />
            <div className="settings-content">
                {menu === MENU_BACKGROUND && <BackgroundSettings />}
                {menu === MENU_QUOTE && <QuoteSettings />}
                {menu === MENU_TERMINAL && <TerminalSettings />}
            </div>
        </div>
    )
}

const TerminalSettings = () => {
    return <div></div>
}
