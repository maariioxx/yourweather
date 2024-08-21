import { MdKeyboardArrowUp } from 'react-icons/md'
import DayWeatherRow from '../components/DayWeatherRow'
import { useWeatherStore } from '../store/weather'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function DailyWeather() {
  const weather = useWeatherStore((state) => state.weather)
  const [t] = useTranslation('global')

  return (
    <div className="flex flex-col items-center gap-12">
      <h1 className="text-3xl">
        {weather.location.name} | {t('hourly.title')}
      </h1>
      <div className="flex flex-col gap-6">
        {weather.forecast.forecastday.map((day) => {
          return (
            <Link to={`/day/${day.date_epoch}`} key={crypto.randomUUID()}>
              <div
                className={`flex items-center justify-center gap-6 bg-black bg-opacity-10 px-10 py-5 border-2 border-black/10 hover:border-yellow-400 'border-yellow-400'
                      rounded-3xl transition-colors cursor-pointer`}
              >
                <DayWeatherRow date={day.date} day={day.day} />
                <MdKeyboardArrowUp
                  className={`
                          'rotate-180 transform'
                        } transition-transform h-8 w-8`}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
