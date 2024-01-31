import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../types/SettingsContextType';
import { WeatherType } from '../types/WeatherType';
import { useContext } from 'react';
import HomeInfoRow from './HomeInfoRow';
import HomeInfoLine from './HomeInfoLine';

export default function HomeInfo({ weather }: { weather: WeatherType }) {
  const { darkMode, themeBackground } = useContext(
    SettingsContext
  ) as SettingsContextType;
  return (
    <div className="flex flex-col gap-4">
      <HomeInfoRow
        title="Wind"
        iconName="wind"
        isInfoAUnit={true}
        info={weather.current.wind_kph}
        optionalInfo={weather.current.wind_mph}
        text="km/h"
        optionalText="mph"
      />
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
      <HomeInfoRow
        title="Wind Gusts"
        iconName="windsock"
        isInfoAUnit={true}
        info={weather.current.gust_kph}
        optionalInfo={weather.current.gust_mph}
        text="km/h"
        optionalText="mph"
      />
      <HomeInfoLine isDay={weather.current.is_day} />
      <div className="flex items-center gap-2 justify-around">
        <div className="flex gap-8 items-center justify-between">
          <h2>Sunrise</h2>
          <div className="flex items-center">
            <img
              src="/weather/sunrise.svg"
              alt=""
              className=" w-16 rounded-sm"
            />
            <p className="text-3xl">
              {weather.forecast.forecastday[0].astro.sunrise}
            </p>
          </div>
        </div>
        <hr
          className={`${
            themeBackground
              ? darkMode
                ? 'border-white'
                : 'border-black'
              : weather.current.is_day === 1
              ? 'border-black'
              : 'border-white'
          } w-10 rotate-90`}
        />
        <div className="flex gap-8 justify-between items-center">
          <h2>Sunset</h2>
          <div className="flex items-center">
            <img
              src="/weather/sunset.svg"
              alt=""
              className=" w-16 rounded-sm"
            />
            <p className="text-3xl">
              {weather.forecast.forecastday[0].astro.sunset}
            </p>
          </div>
        </div>
      </div>
      <HomeInfoLine isDay={weather.current.is_day} />
      <HomeInfoRow
        title="Humidity"
        iconName="humidity"
        isInfoAUnit={false}
        info={weather.current.humidity}
        text="%"
      />
      <HomeInfoLine isDay={weather.current.is_day} />
      <HomeInfoRow
        title="UV"
        iconName={
          weather.current.uv > 11
            ? 'uv-index-11-plus'
            : `uv-index-${weather.current.uv}`
        }
        isInfoAUnit={false}
        info={weather.current.uv}
        text=""
      />
    </div>
  );
}
