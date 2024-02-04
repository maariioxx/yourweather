import { useWeatherStore } from '../store/weather';

import WeatherInfo from './WeatherInfo';
import { useSettingsStore } from '../store/settings';

type HomeCurrentWeatherProps = {
  bgColor: string;
  textColor: string;
  icon: string;
};

export default function HomeCurrentWeather({
  weatherStyle,
}: {
  weatherStyle: HomeCurrentWeatherProps;
}) {
  const weather = useWeatherStore((state) => state.weather);
  const [darkMode, themeBackground, imperialUnits] = useSettingsStore(
    (state) => [state.darkMode, state.themeBackground, state.imperialUnits]
  );
  return (
    <>
      <div className="flex flex-col gap-4 items-center ">
        <div className="flex items-center gap-2">
          <img src={weatherStyle.icon} alt="" className="w-48" />
          <div className="flex gap-2 flex-col">
            <div className="flex items-center">
              <img src="/weather/thermometer.svg" alt="" className="w-12" />
              <div className="flex gap-2">
                <p className="text-4xl">
                  {imperialUnits
                    ? `${weather.current.temp_f.toFixed(0)}ºF`
                    : `${weather.current.temp_c.toFixed(0)}ºC`}{' '}
                </p>
                <p className="text-xl">
                  {imperialUnits
                    ? `${weather.current.feelslike_f.toFixed(0)}ºF`
                    : `${weather.current.feelslike_c.toFixed(0)}ºC`}
                </p>
              </div>
            </div>
            <hr
              className={
                themeBackground
                  ? darkMode
                    ? 'border-white'
                    : 'border-black'
                  : weather.current.is_day === 1
                  ? 'border-black'
                  : 'border-white'
              }
            />
            <div className="flex items-center">
              <img
                src={`/weather/${
                  weather.current.precip_mm > 0
                    ? 'raindrop-measure'
                    : 'raindrops'
                }.svg`}
                alt=""
                className="w-12 h-14"
              />
              <p className="text-4xl">
                {weather.current.precip_mm > 0
                  ? imperialUnits
                    ? weather.current.precip_in
                    : weather.current.precip_mm
                  : weather.forecast.forecastday[0].day.daily_chance_of_rain}
                <span className="text-xl">
                  {weather.current.precip_mm > 0
                    ? imperialUnits
                      ? 'in'
                      : 'mm'
                    : '%'}
                </span>
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-5xl sm:text-7xl">{weather.location.name}</h1>
        <div className="flex items-center gap-5 text-xl">
          <p className="text-xl">{weather.location.country}</p>|
          <p>{weather.location.localtime.split(' ')[1]}</p>
        </div>
      </div>
      <WeatherInfo
        currentWeather={weather.current}
        astro={true}
        astroInfo={weather.forecast.forecastday[0].astro}
        airQuality={true}
        airQualityInfo={weather.current.air_quality}
      />
    </>
  );
}
