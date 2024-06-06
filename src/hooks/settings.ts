import { createContext, useContext } from 'react';
import { Settings } from '../components/settings/types';

export const defaultSettings: Settings = {
    backgroundImagePath: undefined,
    backgroundParticlesEnabled: true,
}

export interface SettingsContext {
    settings: Settings;
    setSettings: (newSettings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContext>({ settings: defaultSettings, setSettings: () => {}});

const useSettings = () => {
    const { settings, setSettings } = useContext(SettingsContext);
    const setSettingValue = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings({
            ...settings,
            [key]: value,
        })
    }
    return {
        settings,
        setSettingValue,
    };
}

export default useSettings;
