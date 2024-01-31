import { WeatherType } from '../types/WeatherType';
import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons';
import { useContext } from 'react';
import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../types/SettingsContextType';

export function Home({ weather }: { weather: WeatherType }) {
  const { darkMode, themeBackground, imperialUnits } = useContext(
    SettingsContext
  ) as SettingsContextType;
  const weatherCode = weatherCodesAndIcons.filter((code) => {
    if (code.codes.includes(weather.current.condition.code)) return code;
    return;
  });
  let weatherStyle: { bgColor: string; textColor: string; icon: string };
  weather.current.is_day === 1
    ? (weatherStyle = weatherCode[0].day)
    : (weatherStyle = weatherCode[0].night);
  return (
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
      } grow rounded-t-xl flex gap-96 pb-96  items-center flex-col transition-all`}
    >
      <div className="flex flex-col mt-56 gap-4 items-center ">
        <div className="flex items-center gap-2">
          <img src={weatherStyle.icon} alt="" className="w-48" />
          <div className="flex gap-2 flex-col">
            <div className="flex items-center">
              <img src="/weather/thermometer.svg" alt="" className="w-12" />
              <div className="flex gap-2">
                <p className="text-4xl">
                  {imperialUnits
                    ? `${weather.current.temp_f}ºF`
                    : `${weather.current.temp_c}ºC`}{' '}
                </p>
                <p className="text-xl">
                  {imperialUnits
                    ? `${weather.current.feelslike_f}ºF`
                    : `${weather.current.feelslike_c}ºC`}
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
              <img src="/weather/raindrops.svg" alt="" className="w-12 h-14" />
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
      <div className="flex">
        <div className="flex items-center justify-between">
          <h2>Wind Gusts</h2>
          <img
            src="/weather/windsock.svg"
            alt=""
            className=" w-16 rounded-sm"
          />

          <p className="text-4xl">
            {imperialUnits
              ? `${weather.current.wind_mph}`
              : `${weather.current.wind_kph}`}
            <span className="text-xl">{imperialUnits ? 'mph' : 'km/h'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
