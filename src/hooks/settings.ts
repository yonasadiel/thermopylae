import { createContext, useContext } from 'react';
import { Settings } from '../models/settings';
import { Load, Save, Database } from '../dal/db';
import { DEFAULT_BACKGROUND_PARTICLES_ENABLED, DEFAULT_GROUPS, DEFAULT_IMAGE_PATH, DEFAULT_PARTICLE_SETTINGS } from '../components/settings/defaults';


export const defaultSettings: Settings = {
    backgroundImagePath: DEFAULT_IMAGE_PATH,
    backgroundParticlesEnabled: DEFAULT_BACKGROUND_PARTICLES_ENABLED,
    quoteEnabled: true,
    quotePreloaded: ['pragmatic-programmer', 'programming'],
    quoteCustom: [],
    backgroundParticlesConfig: DEFAULT_PARTICLE_SETTINGS,
    terminalURLs: DEFAULT_GROUPS,
}

export interface SettingsContext {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
}

export const getCurrentSettings = (): Settings => {
    return Load(Database.Settings) as Settings ?? defaultSettings;
}

export const SettingsContext = createContext<SettingsContext>({
    settings: defaultSettings,
    setSettings: () => { },
});

const useSettings = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const setSettingValue = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        console.log(key, value);
        const newSettings: Settings = {
            ...settings,
            [key]: value,
        };
        setSettings(newSettings);
        Save(Database.Settings, newSettings);
    }
    return {
        settings,
        setSettingValue,
    };
}

export default useSettings;
