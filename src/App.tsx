import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.js';
import Navbar from './components/Navbar.js';
import { initialData } from './data/initialData.js';
import { SettingsContext } from './context/Settings.js';
import { SettingsContextType } from './types/SettingsContextType.js';

export default function App() {
  const [currentCity, setCurrentCity] = useState('London');
  const [weather, setWeather] = useState<typeof initialData | null>(
    initialData
  );
  const { darkMode } = useContext(SettingsContext) as SettingsContextType;
  useEffect(() => {
    if (localStorage.getItem('city') == null) {
      localStorage.setItem('city', 'London');
      setCurrentCity('London');
    } else {
      const city = localStorage.getItem('city')!;
      setCurrentCity(city);
    }
  }, []);

  console.log(weather);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${currentCity}&days=6&aqi=yes&alerts=no`
      );
      if (!response.ok) throw new Error('WeatherAPI request failed');
      const data = await response.json();
      setWeather(data);
    };
    fetchData();
  }, [currentCity]);

  return (
    <div
      className={`${
        darkMode ? 'dark' : ''
      } h-full -mb-52 font-poppins flex flex-col bg-gray-50 dark:bg-black`}
    >
      <Navbar setCurrentCity={setCurrentCity} />
      <main className="grow flex flex-col dark:bg-neutral-900">
        <Routes>
          <Route path="/" element={<Home weather={weather!} />} />
        </Routes>
      </main>
    </div>
  );
}
