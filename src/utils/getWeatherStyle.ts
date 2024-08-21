import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons'
import { HourWeatherRowType } from '../types/HourWeatherRowType'
import { WeatherCurrent, WeatherDay } from '../types/WeatherStoreType'

export function getWeatherStyle({
  weather,
}: {
  weather: WeatherDay | HourWeatherRowType | WeatherCurrent
}) {
  const weatherCode = weatherCodesAndIcons.filter((code) => {
    if (code.codes.includes(weather.condition.code)) return code
    return
  })

  function isDay(w: WeatherCurrent | HourWeatherRowType | WeatherDay) {
    if ('is_day' in w) {
      return true
    }
    return false
  }
  let weatherStyle: { bgColor: string; textColor: string; icon: string }
  isDay(weather)
    ? // @ts-ignore
      weather.is_day === 1
      ? (weatherStyle = weatherCode[0].day)
      : (weatherStyle = weatherCode[0].night)
    : (weatherStyle = weatherCode[0].day)

  return weatherStyle
}
