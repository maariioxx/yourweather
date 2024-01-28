import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './Home';
import Navbar from './components/Navbar.js';
import { City } from './types/city.js';
import { initialData, initialCity } from './data/initialData.js';

export default function App() {
  const [citiesData, setCitiesData] = useState<City[]>(initialCity);
  const [currentCity, setCurrentCity] = useState('London');
  const [weather, setWeather] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/population/cities'
      );
      const data = await response.json();
      setCitiesData(data.data);
    };
    fetchData();
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
    <div className="min-h-screen font-poppins">
      <Navbar citiesData={citiesData} setCurrentCity={setCurrentCity} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
