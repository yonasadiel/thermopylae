import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SettingsContext, defaultSettings } from './hooks/settings';

const Index = () => {
  const [settings, setSettings] = useState(defaultSettings);
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <App />
    </SettingsContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
