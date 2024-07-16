import { useDebounceFn, useSettings } from '../../hooks';
import './Theme.css';

const ThemeSettings = () => {
    const { settings, setSettingValue } = useSettings();
    const setBackgroundColor = useDebounceFn((color: string) => setSettingValue('themeBackgroundColor', color), 100, [setSettingValue]);
    const setForegroundColor = useDebounceFn((color: string) => setSettingValue('themeForegroundColor', color), 100, [setSettingValue]);

    return (
        <div className="theme-settings">
            <div className="input-group">
                <label>Style</label>
                <p>
                    <input
                        type="color"
                        value={settings.themeBackgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)} />
                    <span>{'Background Color'}</span>
                </p>
                <p>
                    <input
                        type="color"
                        value={settings.themeForegroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)} />
                    <span>{'Color'}</span>
                </p>
            </div>
            <div className="input-group">
                <label>Background Image</label>
                <input
                    type="file"
                    onChange={(e) => setSettingValue('themeBackgroundImagePath', e.target.value)} value={settings.themeBackgroundImagePath} />
            </div>
            <div className="input-group">
                <label>Particles</label>
                <p>
                    <input
                        type="checkbox"
                        checked={settings.themeBackgroundParticlesEnabled}
                        onChange={(e) => setSettingValue('themeBackgroundParticlesEnabled', !!e.currentTarget.checked)} />
                    <span>Enabled</span>
                </p>
            </div>
        </div>
    );
};

export default ThemeSettings;
