import { HourWeatherRowType } from './HourWeatherRowType';

export type WeatherInfoType =
  | {
      currentWeather: CurrentWeather;
      astro: true;
      astroInfo: AstroType;
      airQuality: true;
      airQualityInfo: AirQualityType;
    }
  | {
      currentWeather: CurrentWeather;
      astro: false;
      astroInfo?: never;
      airQuality: false;
      airQualityInfo?: never;
    };

type CurrentWeather = HourWeatherRowType | Weather;

type AstroType = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
};

type AirQualityType = {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  'us-epa-index': number;
  'gb-defra-index': number;
};

type Weather = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality: { [key: string]: number };
};

type Condition = {
  text: string;
  icon: string;
  code: number;
};
