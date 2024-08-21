import { useTranslation } from 'react-i18next';
import HourWeatherRow from '../components/HourWeatherRow';
import WeatherInfo from '../components/WeatherInfo';
import { useWeatherStore } from '../store/weather';
import { Disclosure, Transition } from '@headlessui/react';
import { MdKeyboardArrowUp } from 'react-icons/md';

export default function HourlyWeather() {
  const weather = useWeatherStore((state) => state.weather);
  const [t, i18n] = useTranslation('global');
  const hourlyWeather = weather.forecast.forecastday[0].hour.filter((hour) => {
    if (
      hour.time.split(' ')[1].split(':')[0] >
      weather.location.localtime.split(' ')[1].split(':')[0]
    )
      return hour;
    return;
  });

  for (const hour of weather.forecast.forecastday[1].hour) {
    if (hourlyWeather.length < 24) hourlyWeather.push(hour);
  }
  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      <h1 className="text-3xl">
        {weather.location.name} | {t('hourly.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-24 justify-center items-start">
        {hourlyWeather.map((hour) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="flex flex-col items-center justify-center gap-6 w-[600px] transition-all"
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex items-center justify-center gap-6 bg-black bg-opacity-10 px-10 py-5 border-2 border-black/10 hover:border-yellow-400 ${
                        open && 'border-yellow-400'
                      } rounded-3xl transition-colors`}
                    >
                      <HourWeatherRow hour={hour} />
                      <MdKeyboardArrowUp
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } transition-transform h-8 w-8`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel>
                        <WeatherInfo
                          currentWeather={hour}
                          astro={false}
                          airQuality={false}
                        />
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          );
        })}
      </div>
    </div>
  );
}
