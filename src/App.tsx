import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home.js';
import Navbar from './components/Navbar.js';
import { initialData } from './data/initialData.js';

export default function App() {
  const [currentCity, setCurrentCity] = useState('London');
  const [weather, setWeather] = useState<typeof initialData>(initialData);

  useEffect(() => {
    if (localStorage.getItem('city') == null) {
      localStorage.setItem('city', 'London');
    } else {
      const city = localStorage.getItem('city')!;
      setCurrentCity(city);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=f761d4a415a94079961121143231412&q=${currentCity}&days=6&aqi=yes&alerts=no`
      );
      if (!response.ok) throw new Error('WeatherAPI request failed');
      const data = await response.json();
      setWeather(data);
    };
    fetchData();
  }, [currentCity]);

  return (
    <div className="min-h-screen font-poppins flex flex-col bg-gray-50">
      <Navbar setCurrentCity={setCurrentCity} />
      <main className="grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home weather={weather} />} />
        </Routes>
      </main>
    </div>
  );
}
