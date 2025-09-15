import React, { useRef } from 'react';
import { useSettings } from '../../hooks';
import { BangConfig } from '../../models/terminal';

export default function TerminalSettings() {
    const { settings, setSettingValue } = useSettings();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const bangConfig: BangConfig = JSON.parse(content);
                
                // Validate that it's a proper BangConfig
                if (!bangConfig.title || !bangConfig.bangs || !Array.isArray(bangConfig.bangs)) {
                    alert('Invalid BangConfig file format. Please ensure it has "title" and "bangs" properties.');
                    return;
                }

                // Check if this config already exists (by title)
                const existingIndex = settings.terminalBangConfigs.findIndex(
                    config => config.title === bangConfig.title
                );

                let updatedConfigs;
                if (existingIndex >= 0) {
                    // Replace existing config
                    updatedConfigs = [...settings.terminalBangConfigs];
                    updatedConfigs[existingIndex] = bangConfig;
                } else {
                    // Add new config
                    updatedConfigs = [...settings.terminalBangConfigs, bangConfig];
                }

                setSettingValue('terminalBangConfigs', updatedConfigs);
                
                // Clear the file input
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (error) {
                alert('Error parsing JSON file. Please ensure it\'s a valid JSON format.');
                console.error('JSON parsing error:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleRemoveConfig = (title: string) => {
        const updatedConfigs = settings.terminalBangConfigs.filter(
            config => config.title !== title
        );
        setSettingValue('terminalBangConfigs', updatedConfigs);
    };

    return (
        <div className="terminal-settings">
            <div className="input-group">
                <label htmlFor="bang-file-upload">Config File</label>
                <input
                    id="bang-file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                />
                <small>Upload a JSON file containing BangConfig structure</small>
            </div>

            <div className="input-group">
                <label>Loaded Configs</label>
                {settings.terminalBangConfigs.length === 0 ? (
                    <p>No configurations loaded</p>
                ) : (
                    <ul>
                        {settings.terminalBangConfigs.map((config, index) => (
                            <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{config.title}</strong>
                                        <br />
                                        <small>{config.bangs.length} bang(s) loaded</small>
                                    </div>
                                    <button 
                                        onClick={() => handleRemoveConfig(config.title)}
                                        style={{ 
                                            background: '#ff4444', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '5px 10px', 
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
