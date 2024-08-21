import HomeInfoRow from './HomeInfoRow';
import Line from './Line';
import { WeatherInfoType } from '../types/WeatherInfoPropsType';
import { useSettingsStore } from '../store/settings';
import { useTranslation } from 'react-i18next';
import DayTimeBar from './DayTimeBar';

export default function WeatherInfo({
  currentWeather,
  astro,
  astroInfo,
  airQuality,
  airQualityInfo,
}: WeatherInfoType) {
  const [darkMode, themeBackground] = useSettingsStore((state) => [
    state.darkMode,
    state.themeBackground,
  ]);
  const [t, i18n] = useTranslation('global');

  function AirQualityData() {
    switch (airQualityInfo?.['us-epa-index']) {
      case 1:
        return { text: 'Good', color: 'bg-green-500' };
      case 2:
        return { text: 'Moderate', color: 'bg-amber-500' };
      case 3:
        return {
          text: 'Unhealthy fron sensitive groups',
          color: 'bg-orange-500',
        };
      case 4:
        return { text: 'Unhealthy', color: 'bg-red-500' };
      case 5:
        return { text: 'Very unhealthy', color: 'bg-purple-500' };
      case 6:
        return { text: 'Hazardous', color: 'bg-stone-950' };
    }
  }
  return (
    <div className="flex flex-col gap-4 bg-black bg-opacity-10 rounded-3xl px-10 py-6">
      <HomeInfoRow
        title={t('home.wind')}
        iconName="wind"
        isInfoAUnit={true}
        info={currentWeather.wind_kph.toFixed(0)}
        optionalInfo={currentWeather.wind_mph.toFixed(0)}
        text="km/h"
        optionalText="mph"
      />
      <Line isDay={currentWeather.is_day} width={128} />
      <HomeInfoRow
        title={t('home.windgusts')}
        iconName="windsock"
        isInfoAUnit={true}
        info={currentWeather.gust_kph.toFixed(0)}
        optionalInfo={currentWeather.gust_mph.toFixed(0)}
        text="km/h"
        optionalText="mph"
      />
      <Line isDay={currentWeather.is_day} width={128} />
      {astro && (
        <>
          <div className="flex items-center gap-2 justify-around">
            <div className="flex gap-8 items-center justify-between">
              <h2>{t('home.sunrise')}</h2>
              <div className="flex items-center">
                <img
                  src="/weather/sunrise.svg"
                  alt=""
                  className=" w-16 rounded-sm"
                />
                <p className="text-3xl">{astroInfo.sunrise}</p>
              </div>
            </div>
            <hr
              className={`${
                themeBackground
                  ? darkMode
                    ? 'border-white'
                    : 'border-black'
                  : currentWeather.is_day === 1
                  ? 'border-black'
                  : 'border-white'
              } w-10 rotate-90`}
            />
            <div className="flex gap-8 justify-between items-center">
              <h2>{t('home.sunset')}</h2>
              <div className="flex items-center">
                <img
                  src="/weather/sunset.svg"
                  alt=""
                  className=" w-16 rounded-sm"
                />
                <p className="text-3xl">{astroInfo.sunset}</p>
              </div>
            </div>
          </div>
          <DayTimeBar />
          <Line isDay={currentWeather.is_day} width={128} />
        </>
      )}

      <HomeInfoRow
        title={t('home.humidity')}
        iconName="humidity"
        isInfoAUnit={false}
        info={currentWeather.humidity}
        text="%"
      />
      <Line isDay={currentWeather.is_day} width={128} />
      <HomeInfoRow
        title="UV"
        iconName={
          currentWeather.uv > 11
            ? 'uv-index-11-plus'
            : `uv-index-${currentWeather.uv}`
        }
        isInfoAUnit={false}
        info={currentWeather.uv}
        text=""
      />
      {airQuality && (
        <div className="mb-4 flex flex-col gap-8">
          <Line isDay={currentWeather.is_day} width={128} />
          <HomeInfoRow
            title={t('home.airquality')}
            isInfoAUnit={false}
            info={AirQualityData()!}
            text=""
          />
        </div>
      )}
    </div>
  );
}
