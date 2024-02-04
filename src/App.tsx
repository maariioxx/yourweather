import { useState, useEffect } from 'react';

import { Home } from './pages/Home.js';
import Navbar from './components/Navbar.js';
import { useWeatherStore } from './store/weather.js';
import { useSettingsStore } from './store/settings.js';

export default function App() {
  const [currentCity, setCurrentCity] = useState('London');
  const setWeather = useWeatherStore((state) => state.setWeather);
  const [darkMode, setDarkMode, setThemeBackground, setImperialUnits] =
    useSettingsStore((state) => [
      state.darkMode,
      state.setDarkMode,
      state.setThemeBackground,
      state.setImperialUnits,
    ]);

  useEffect(() => {
    if (localStorage.getItem('city') == null) {
      localStorage.setItem('city', 'London');
      setCurrentCity('London');
    } else {
      const city = localStorage.getItem('city')!;
      setCurrentCity(city);
    }
  }, []);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/weather-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: currentCity }),
      });
      if (!response.ok) throw new Error('Weather API fetch failed');
      const data = await response.json();
      setWeather(data);
      localStorage.setItem('city', currentCity);
    };
    fetchData();
  }, [currentCity]);

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
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div
      className={`${
        darkMode ? 'dark' : ''
      } h-full -mb-52 font-poppins flex flex-col bg-gray-50 dark:bg-black`}
    >
      <Navbar setCurrentCity={setCurrentCity} />
      <Home />
    </div>
  );
}
