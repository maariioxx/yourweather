import React, { createContext, useState, useEffect } from 'react';
import { SettingsContextType } from '../types/SettingsContextType';

export const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [themeBackground, setThemeBackground] = useState(false);
  const [imperialUnits, setImperialUnits] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('dark-mode') == null) {
      localStorage.setItem('dark-mode', 'false');
    } else {
      setDarkMode(localStorage.getItem('dark-mode') == 'true');
    }
    if (localStorage.getItem('theme-background') == null) {
      localStorage.setItem('theme-background', 'false');
    } else {
      setThemeBackground(localStorage.getItem('theme-background') == 'true');
    }
    if (localStorage.getItem('imperial-units') == null) {
      localStorage.setItem('imperial-units', 'false');
    } else {
      setImperialUnits(localStorage.getItem('imperial-units') == 'true');
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        themeBackground,
        setThemeBackground,
        imperialUnits,
        setImperialUnits,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
