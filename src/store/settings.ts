import { create } from 'zustand';
import { SettingsContextType } from '../types/SettingsStoreType';

type State = SettingsContextType;

export const useSettingsStore = create<State>((set) => {
  return {
    darkMode: false,
    setDarkMode: (data: boolean) => {
      set({ darkMode: data });
    },
    themeBackground: false,
    setThemeBackground: (data: boolean) => {
      set({ themeBackground: data });
    },
    imperialUnits: false,
    setImperialUnits: (data: boolean) => {
      set({ imperialUnits: data });
    },
  };
});
