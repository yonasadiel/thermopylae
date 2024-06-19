import { useSettings } from '../../hooks';
import './Background.css';

const BackgroundSettings = () => {
    const { settings, setSettingValue } = useSettings();

    return (
        <div className="background-settings">
            <div className="input-group">
                <label>Background Image</label>
                <input
                    type="file"
                    onChange={(e) =>
                        setSettingValue('backgroundImagePath', e.target.value)
                    }
                    value={settings.backgroundImagePath}
                />
            </div>
            <div className="input-group">
                <label>Particles</label>
                <p>
                    <input
                        type="checkbox"
                        checked={settings.backgroundParticlesEnabled}
                        onChange={(e) =>
                            setSettingValue(
                                'backgroundParticlesEnabled',
                                !!e.currentTarget.checked,
                            )
                        }
                    />
                    <span>Enabled</span>
                </p>
            </div>
            <div className="input-group">
                <label>Particles Settings</label>
                <p>
                    You can import your own settings from{' '}
                    <a
                        href="https://vincentgarreau.com/particles.js/"
                        target="_blank"
                        rel="noreferrer"
                    >here</a>
                </p>
                <textarea
                    onChange={(e) =>
                        setSettingValue(
                            'backgroundParticlesConfig',
                            JSON.parse(e.currentTarget.value),
                        )}
                    value={JSON.stringify(settings.backgroundParticlesConfig)}
                />
            </div>
        </div>
    );
};

export default BackgroundSettings;
