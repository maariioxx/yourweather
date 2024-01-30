import React, { createContext, useState, useEffect } from 'react';
import { ThemesContextType } from '../types/ThemesContextType';

export const ThemesContext = createContext<ThemesContextType | null>(null);

export function ThemesProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [themeBackground, setThemeBackground] = useState(false);

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
  }, []);

  return (
    <ThemesContext.Provider
      value={{ darkMode, setDarkMode, themeBackground, setThemeBackground }}
    >
      {children}
    </ThemesContext.Provider>
  );
}
