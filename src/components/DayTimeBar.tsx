import { useWeatherStore } from '../store/weather'
import { useState, useEffect } from 'react'

export default function DayTimeBar() {
  const weather = useWeatherStore((state) => state.weather)
  const [percentage, setPercentage] = useState(0)
  function calculateDayPercentage() {
    const rise = Number(
      `${
        weather.current.is_day === 1
          ? weather.forecast.forecastday[0].astro.sunrise
              .split(' ')[0]
              .split(':')[0]
          : weather.forecast.forecastday[0].astro.sunset
              .split(' ')[0]
              .split(':')[0]
      }.${
        weather.current.is_day === 1
          ? (
              (Number(
                weather.forecast.forecastday[0].astro.sunrise
                  .split(' ')[0]
                  .split(':')[1]
              ) /
                60) *
              1000
            ).toFixed(0)
          : (
              (Number(
                weather.forecast.forecastday[0].astro.sunset
                  .split(' ')[0]
                  .split(':')[1]
              ) /
                60) *
              1000
            ).toFixed(0)
      }`
    )
    const set = Number(
      `${
        weather.current.is_day
          ? Number(
              weather.forecast.forecastday[0].astro.sunset
                .split(' ')[0]
                .split(':')[0]
            ) + 12
          : Number(weather.current.last_updated.split(' ')[1].split(':')[0]) <
            Number(
              weather.forecast.forecastday[0].astro.sunrise
                .split(' ')[0]
                .split(':')[0]
            )
          ? Number(
              weather.forecast.forecastday[0].astro.sunrise
                .split(' ')[0]
                .split(':')[0]
            ) + 12
          : Number(
              weather.forecast.forecastday[1].astro.sunrise
                .split(' ')[0]
                .split(':')[0]
            ) + 12
      }.${
        weather.current.is_day === 1
          ? (
              (Number(
                weather.forecast.forecastday[0].astro.sunset
                  .split(' ')[0]
                  .split(':')[1]
              ) /
                60) *
              1000
            ).toFixed(0)
          : Number(weather.current.last_updated.split(' ')[1].split(':')[0]) <
            Number(
              weather.forecast.forecastday[0].astro.sunrise
                .split(' ')[0]
                .split(':')[0]
            )
          ? (
              (Number(
                weather.forecast.forecastday[0].astro.sunrise
                  .split(' ')[0]
                  .split(':')[1]
              ) /
                60) *
              1000
            ).toFixed(0)
          : (
              (Number(
                weather.forecast.forecastday[1].astro.sunrise
                  .split(' ')[0]
                  .split(':')[1]
              ) /
                60) *
              1000
            ).toFixed(0)
      }`
    )
    const current = Number(
      `${
        weather.current.is_day
          ? weather.current.last_updated.split(' ')[1].split(':')[0]
          : Number(weather.current.last_updated.split(' ')[1].split(':')[0]) <
            Number(
              weather.forecast.forecastday[0].astro.sunrise
                .split(' ')[0]
                .split(':')[0]
            )
          ? Number(weather.current.last_updated.split(' ')[1].split(':')[0]) +
            12
          : Number(weather.current.last_updated.split(' ')[1].split(':')[0]) -
            12
      }.${(
        (Number(weather.current.last_updated.split(' ')[1].split(':')[1]) /
          60) *
        1000
      ).toFixed(0)}`
    )
    const perc = Math.round(((current - rise) / (set - rise)) * 100)
    return perc
  }

  useEffect(() => {
    const perc = calculateDayPercentage()
    setPercentage(perc)
  }, [weather])

  return (
    <div>
      <div className="relative mb-5">
        <div
          className={`absolute ${
            weather.current.is_day ? 'bg-yellow-300' : 'bg-white'
          } h-4 rounded-3xl z-10`}
          style={{
            width: `${percentage}%`,
          }}
        >
          <img
            src={
              weather.current.is_day === 1
                ? '/weather/clear-day.svg'
                : '/weather/clear-night.svg'
            }
            alt=""
            className={`absolute -top-4 w-12 z-20 ${
              weather.current.is_day === 1 ? '-right-5' : '-right-7'
            }`}
          />
        </div>

        <div
          className={`absolute ${
            weather.current.is_day ? 'bg-gray-200' : 'bg-gray-500'
          } w-full h-4 rounded-3xl`}
        ></div>
      </div>
    </div>
  )
}
