import { initialData } from '../data/initialData';

export type WeatherStoreType = {
  weather: typeof initialData;
  setWeather: (data: typeof initialData) => void;
};
