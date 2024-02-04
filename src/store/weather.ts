import { initialData } from '../data/initialData';
import { WeatherStoreType } from '../types/WeatherStoreType';
import { create } from 'zustand';

export const useWeatherStore = create<WeatherStoreType>((set) => {
  return {
    weather: initialData,
    setWeather: (data: typeof initialData) => {
      set({ weather: data });
    },
  };
});
