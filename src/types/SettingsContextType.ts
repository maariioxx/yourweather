export type SettingsContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  themeBackground: boolean;
  setThemeBackground: React.Dispatch<React.SetStateAction<boolean>>;
  imperialUnits: boolean;
  setImperialUnits: React.Dispatch<React.SetStateAction<boolean>>;
};
