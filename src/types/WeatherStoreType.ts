import { initialData } from '../data/initialData';

const day = initialData.forecast.forecastday[0].day;

type Weather = typeof initialData;
export type WeatherCurrent = typeof initialData.current;
export type WeatherDay = typeof day;

export type WeatherStoreType = {
  weather: Weather;
  setWeather: (data: typeof initialData) => void;
};
