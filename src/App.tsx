import { memo, useState } from 'react';
import Terminal from './components/terminal/Terminal';
import Quote from './components/quote/Quote';
import Settings from './components/settings/Settings';
import Particles from './components/particles/Particles';
import { useSettings } from './hooks';
import './App.css';

const App = memo(() => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const { settings } = useSettings();
    return (
        <div
            className="main"
            style={{
                "--background-color": settings.themeBackgroundColor,
                "--foreground-color": settings.themeForegroundColor,
            } as React.CSSProperties}
            >
            <Particles />
            <img src={settings.themeBackgroundImagePath} />
            <div className="center">
                <Terminal />
                <Quote />
            </div>
            <div className="top-right">
                <button type="button" className={`settings-button ${openSettings ? '' : 'show'}`} onClick={() => setOpenSettings(true)}>
                    {/* TODO: make this custom color */}
                    <img alt="settings" src="./assets/gear.svg" width="20px" height="20px" />
                </button>
            </div>
            <div className={`settings-mask ${openSettings ? 'active' : ''}`}>
                {(<Settings onClose={() => setOpenSettings(false)} />)}
            </div>
        </div >
    );
});

export default App;
