import { createContext, useCallback, useContext } from 'react';
import db from '../dal/storage';
import { Settings } from '../models/settings';

export const defaultSettings: Settings = {
    themeForegroundColor: 'white',
    themeBackgroundColor: 'black',
    themeBackgroundImageEnabled: false,
    themeBackgroundParticlesEnabled: true,
    quoteEnabled: false,
    quotePreloaded: ['pragmatic-programmer', 'programming'],
    quoteCustom: [],
    clocks: [{ title: 'Singapore', timezone: 'Asia/Singapore' }],
    clocks12Hour: true,
    terminalBangConfigs: [],
}

export interface SettingsContext {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
}

export const getCurrentSettings = (): Settings => {
    let settings = db.load('settings') ?? defaultSettings;
    for (const key in defaultSettings) {
        if (!(key in settings)) {
            settings = { ...settings, [key]: defaultSettings[key as keyof Settings] };
        }
    }
    return settings;
};

export const SettingsContext = createContext<SettingsContext>({ settings: defaultSettings, setSettings: () => {}});

const useSettings = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const setSettingValue = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
        const newSettings: Settings = { ...settings, [key]: value, };
        db.save('settings', newSettings);
        setSettings(newSettings);
    }, [setSettings]);
    return {
        settings,
        setSettingValue,
    };
}

export default useSettings;
