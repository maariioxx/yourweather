import { useState, useEffect } from 'react'

import { Home } from './pages/Home.js'
import Navbar from './components/Navbar.js'
import { useWeatherStore } from './store/weather.js'
import { useSettingsStore } from './store/settings.js'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loading from './pages/Loading.js'

export default function App() {
  const [currentCity, setCurrentCity] = useState(
    localStorage.getItem('city') || 'London'
  )
  const setWeather = useWeatherStore((state) => state.setWeather)
  const [darkMode, setDarkMode, setThemeBackground, setImperialUnits] =
    useSettingsStore((state) => [
      state.darkMode,
      state.setDarkMode,
      state.setThemeBackground,
      state.setImperialUnits,
    ])
  const [_, i18next] = useTranslation('global')

  useEffect(() => {
    if (localStorage.getItem('language') == null) {
      localStorage.setItem('language', 'en')
      i18next.changeLanguage('en')
    } else {
      const language = localStorage.getItem('language')!
      i18next.changeLanguage(language)
    }
  }, [])

  console.log(process.env.NODE_ENV)

  /*eslint-disable react-hooks/exhaustive-deps */

  async function fetchWeather() {
    const { data } = await axios.post(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/weather-api'
        : 'https://yourweather1.netlify.app/',
      {
        city: currentCity,
      }
    )
    return data
  }

  const weather = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  })

  useEffect(() => {
    if (weather.isSuccess && weather.data.location) setWeather(weather.data)
  }, [weather])

  useEffect(() => {
    weather.refetch()
  }, [currentCity])

  useEffect(() => {
    if (localStorage.getItem('dark-mode') == null) {
      localStorage.setItem('dark-mode', 'false')
    } else {
      setDarkMode(localStorage.getItem('dark-mode') == 'true')
    }
    if (localStorage.getItem('theme-background') == null) {
      localStorage.setItem('theme-background', 'false')
    } else {
      setThemeBackground(localStorage.getItem('theme-background') == 'true')
    }
    if (localStorage.getItem('imperial-units') == null) {
      localStorage.setItem('imperial-units', 'false')
    } else {
      setImperialUnits(localStorage.getItem('imperial-units') == 'true')
    }
  }, [])
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <div
      className={`${
        darkMode ? 'dark' : ''
      } h-full -mb-52 -mr-5 md:-mr-0 font-poppins flex flex-col bg-gray-50 dark:bg-black`}
    >
      <Navbar setCurrentCity={setCurrentCity} />
      {weather.isLoading ? <Loading /> : <Home />}
    </div>
  )
}
