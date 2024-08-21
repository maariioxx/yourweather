import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useWeatherStore } from '../store/weather'
import { getWeatherStyle } from '../utils/getWeatherStyle'

export default function DayWeather() {
  const weather = useWeatherStore((state) => state.weather)
  const { date_epoch } = useParams()

  const day = weather.forecast.forecastday.filter((day) => {
    if (day.date_epoch.toString() === date_epoch) return day
  })[0]

  const weatherStyle = getWeatherStyle({ weather: day.day })

  return (
    <div className={`${weatherStyle.bgColor} w-full h-full`}>
      <h1>{date_epoch}</h1>
      <h1>{day.date}</h1>
    </div>
  )
}
