import { useCallback } from 'react';
import { useDebounceFn, useSettings } from '../../hooks';
import db from '../../dal/storage';
import { convertBlobToBase64 } from './util';
import './Theme.css';

const ThemeSettings = () => {
    const { settings, setSettingValue } = useSettings();
    const setBackgroundColor = useDebounceFn((color: string) => setSettingValue('themeBackgroundColor', color), 100, [setSettingValue]);
    const setForegroundColor = useDebounceFn((color: string) => setSettingValue('themeForegroundColor', color), 100, [setSettingValue]);

    const storeBackgroundImage = useCallback((imageBlob?: Blob) => {
        if (!!imageBlob) {
            convertBlobToBase64(imageBlob).then((imageBase64) => {
                db.save('backgroundImage', imageBase64);
                setSettingValue('themeBackgroundImageEnabled', true);
            });
        } else {
            db.save('backgroundImage', '');
            setSettingValue('themeBackgroundImageEnabled', false);
        }
    }, [setSettingValue]);

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
                <p>
                    <input
                        type="checkbox"
                        checked={settings.themeBackgroundImageEnabled}
                        onChange={(e) => setSettingValue('themeBackgroundImageEnabled', !!e.currentTarget.checked)} />
                    <span>Enabled</span>
                </p>
                <input
                    type="file"
                    accept='image/*'
                    onChange={(e) => { e.target.files?.[0] && storeBackgroundImage(e.target.files?.[0]) }} />
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
