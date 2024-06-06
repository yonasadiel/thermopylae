import { useState } from 'react';
import Terminal from './components/terminal';
import Quote from './components/quote/Quote';
import Settings from './components/settings/Settings';
import Particles from './components/particles/Particles';
import { useSettings } from './hooks';
import './app.css';

const App = () => {
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const { settings } = useSettings();
    return (
        <div className="main">
            <Particles />
            <div className="center">
                <img src={settings.backgroundImagePath} />
                <Terminal />
                <Quote />
            </div>
            <div className="top-right" onClick={() => setOpenSettings(true)}>
                <a><img alt="settings" src="./assets/gear.svg" width="20px" height="20px" /></a>
            </div>
            <div className={`settings-mask ${openSettings ? 'active' : ''}`}>
                {(<Settings onClose={() => setOpenSettings(false)} />)}
            </div>
        </div >
    );
}

export default App;
