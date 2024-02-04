import DayWeatherRow from '../components/DayWeatherRow';
import { useWeatherStore } from '../store/weather';
import { Disclosure, Transition } from '@headlessui/react';

export default function DailyWeather() {
  const weather = useWeatherStore((state) => state.weather);

  return (
    <div>
      <h1 className="text-3xl">{weather.location.name} | Next 3 days</h1>
      {weather.forecast.forecastday.map((day) => {
        return (
          <div>
            <Disclosure>
              <Disclosure.Button>
                <DayWeatherRow date={day.date} day={day.day} />
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
                  <h1>EEEE</h1>
                </Disclosure.Panel>
              </Transition>
            </Disclosure>
          </div>
        );
      })}
    </div>
  );
}
