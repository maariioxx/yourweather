import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../types/SettingsContextType';
import { useContext } from 'react';

export default function HomeInfoLine({ isDay }: { isDay: number }) {
  const { darkMode, themeBackground } = useContext(
    SettingsContext
  ) as SettingsContextType;
  return (
    <hr
      className={
        themeBackground
          ? darkMode
            ? 'border-white'
            : 'border-black'
          : isDay === 1
          ? 'border-black'
          : 'border-white'
      }
    />
  );
}
