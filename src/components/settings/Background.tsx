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
                    onChange={(e) => setSettingValue('backgroundImagePath', e.target.value)} value={settings.backgroundImagePath} />
            </div>
            <div className="input-group">
                <label>Particles</label>
                <p>
                    <input
                        type="checkbox"
                        checked={settings.backgroundParticlesEnabled}
                        onChange={(e) => {
                        setSettingValue('backgroundParticlesEnabled', !!e.currentTarget.checked)}} />
                    <span>Enabled</span>
                </p>
            </div>
        </div>
    );
}

export default BackgroundSettings;
