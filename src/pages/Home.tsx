import { WeatherType } from '../types/WeatherType';
import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons';
import { useContext } from 'react';
import { ThemesContext } from '../context/Themes';
import { ThemesContextType } from '../types/ThemesContextType';

export function Home({ weather }: { weather: WeatherType }) {
  const { darkMode, themeBackground } = useContext(
    ThemesContext
  ) as ThemesContextType;
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
      } grow rounded-t-xl flex gap-2 justify-center items-center flex-col transition-all`}
    >
      <div className="flex items-center gap-2">
        <img src={weatherStyle.icon} alt="" className="w-48" />
        <div className="flex gap-2 flex-col">
          <div className="flex gap-2">
            <p className="text-4xl">{weather.current.temp_c}ºC</p>
            <p className="text-xl">
              {weather.current.feelslike_c.toFixed(0)}ºC
            </p>
          </div>
          <hr
            className={
              weather.current.is_day === 1 ? 'border-black' : 'border-white'
            }
          />
          <div>
            <p className="text-4xl">
              {weather.current.wind_kph.toFixed(0)}{' '}
              <span className="text-xl">km/h</span>
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
  );
}
