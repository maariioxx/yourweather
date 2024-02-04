import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons';
import { useWeatherStore } from '../store/weather';
import HomeNavbar from '../components/HomeNavbar';
import HomeCurrentWeather from '../components/HomeCurrentWeather';
import { Routes, Route } from 'react-router-dom';
import HourlyWeather from './HourlyWeather.tsx';
import { useSettingsStore } from '../store/settings.ts';
import DailyWeather from './DailyWeather.tsx';

export function Home() {
  const weather = useWeatherStore((state) => state.weather);
  const [darkMode, themeBackground] = useSettingsStore((state) => [
    state.darkMode,
    state.themeBackground,
  ]);
  const weatherCode = weatherCodesAndIcons.filter((code) => {
    if (code.codes.includes(weather.current.condition.code)) return code;
    return;
  });
  let weatherStyle: { bgColor: string; textColor: string; icon: string };
  weather.current.is_day === 1
    ? (weatherStyle = weatherCode[0].day)
    : (weatherStyle = weatherCode[0].night);
  return (
    <main className="grow flex flex-col bg-gray-100 dark:bg-neutral-900">
      <div
        className={`${
          themeBackground
            ? darkMode
              ? 'bg-neutral-800'
              : 'bg-gray-200'
            : weatherStyle.bgColor
        } ${
          themeBackground
            ? darkMode
              ? 'text-white'
              : 'text-black'
            : weatherStyle.textColor
        } grow home-border-radius flex gap-44 pb-96 items-center flex-col transition-all`}
      >
        <HomeNavbar />
        <Routes>
          <Route
            path="/"
            element={<HomeCurrentWeather weatherStyle={weatherStyle} />}
          />
          <Route path="/hourly" element={<HourlyWeather />} />
          <Route path="/daily" element={<DailyWeather />} />
        </Routes>
      </div>
    </main>
  );
}
