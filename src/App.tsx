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
    const fetchData = async () => {
      const response = await fetch('/.netlify/api/weather', {
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
    if (localStorage.getItem('city') == null) {
      localStorage.setItem('city', 'London');
      setCurrentCity('London');
    } else {
      const city = localStorage.getItem('city')!;
      setCurrentCity(city);
    }
  }, []);

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
