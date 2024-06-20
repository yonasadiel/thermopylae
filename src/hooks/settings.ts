import { createContext, useContext } from 'react';
import { Settings } from '../models/settings';
import db from '../dal/storage';

export const defaultSettings: Settings = {
    themeForegroundColor: 'white',
    themeBackgroundColor: 'black',
    themeBackgroundImageBase64: undefined,
    themeBackgroundParticlesEnabled: true,
    quoteEnabled: true,
    quotePreloaded: ['pragmatic-programmer', 'programming'],
    quoteCustom: [],
}

export interface SettingsContext {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
}

export const getCurrentSettings = (): Settings => {
    return db.load('settings') ?? defaultSettings;
};

export const SettingsContext = createContext<SettingsContext>({ settings: defaultSettings, setSettings: () => {}});

const useSettings = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const setSettingValue = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        const newSettings: Settings = { ...settings, [key]: value, };
        db.save('settings', newSettings);
        setSettings(newSettings);
    }
    return {
        settings,
        setSettingValue,
    };
}

export default useSettings;
