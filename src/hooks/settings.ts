import { createContext, useContext } from 'react';
import { Settings } from '../models/settings';
import {
    DEFAULT_BACKGROUND_COLOR,
    DEFAULT_BACKGROUND_PARTICLES_ENABLED,
    DEFAULT_CUSTOM_QUOTE,
    DEFAULT_FOREGROUND_COLOR,
    DEFAULT_GROUPS,
    DEFAULT_IMAGE_PATH,
    DEFAULT_PARTICLE_SETTINGS,
    DEFAULT_PRELOADED_QUOTE,
    DEFAULT_QUOTE_ENABLED,
} from '../components/settings/defaults';
import db from '../dal/storage';

export const defaultSettings: Settings = {
    themeForegroundColor: DEFAULT_FOREGROUND_COLOR,
    themeBackgroundColor: DEFAULT_BACKGROUND_COLOR,
    themeBackgroundImagePath: DEFAULT_IMAGE_PATH,
    themeBackgroundParticlesEnabled: DEFAULT_BACKGROUND_PARTICLES_ENABLED,
    quoteEnabled: DEFAULT_QUOTE_ENABLED,
    quotePreloaded: DEFAULT_PRELOADED_QUOTE,
    quoteCustom: DEFAULT_CUSTOM_QUOTE,
    themeBackgroundParticlesConfig: DEFAULT_PARTICLE_SETTINGS,
    terminalURLs: DEFAULT_GROUPS,
};

export interface SettingsContext {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
}

export const getCurrentSettings = (): Settings => {
    return db.load('settings') ?? defaultSettings;
};

export const SettingsContext = createContext<SettingsContext>({ settings: defaultSettings, setSettings: () => { } });

const useSettings = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const setSettingValue = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        const newSettings: Settings = { ...settings, [key]: value, };
        db.save('settings', newSettings);
        setSettings(newSettings);
    };
    return {
        settings,
        setSettingValue,
    };
};

export default useSettings;
