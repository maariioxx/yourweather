import { Route, Routes } from 'react-router-dom'
import HomeCurrentWeather from '../components/HomeCurrentWeather'
import HomeNavbar from '../components/HomeNavbar'
import { useSettingsStore } from '../store/settings.ts'
import { useWeatherStore } from '../store/weather.ts'
import { getWeatherStyle } from '../utils/getWeatherStyle.ts'
import DailyWeather from './DailyWeather.tsx'
import DayWeather from './DayWeather.tsx'
import HourlyWeather from './HourlyWeather.tsx'

export function Home() {
  const weather = useWeatherStore((state) => state.weather.current)
  const weatherStyle = getWeatherStyle({ weather: weather })
  const [darkMode, themeBackground] = useSettingsStore((state) => [
    state.darkMode,
    state.themeBackground,
  ])
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
        } grow rounded-t-[100px] flex gap-24 md:gap-44 pb-96 items-center flex-col transition-all`}
      >
        <HomeNavbar />
        <Routes>
          <Route
            path="/"
            element={<HomeCurrentWeather weatherStyle={weatherStyle} />}
          />
          <Route path="/hourly" element={<HourlyWeather />} />
          <Route path="/daily" element={<DailyWeather />} />
          <Route path="/day/:date_epoch" element={<DayWeather />} />
        </Routes>
      </div>
    </main>
  )
}
