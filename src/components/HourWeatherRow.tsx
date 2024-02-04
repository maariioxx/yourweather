import dayjs from 'dayjs';
import { HourWeatherRowType } from '../types/HourWeatherRowType';
import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons';

export default function HourWeatherRow({ hour }: { hour: HourWeatherRowType }) {
  const weatherCode = weatherCodesAndIcons.filter((code) => {
    if (code.codes.includes(hour.condition.code)) return code;
    return;
  });
  let weatherStyle: { bgColor: string; textColor: string; icon: string };
  hour.is_day === 1
    ? (weatherStyle = weatherCode[0].day)
    : (weatherStyle = weatherCode[0].night);
  return (
    <div className="grid grid-cols-4 items-center gap-6 w-64">
      <div className="flex flex-col">
        <p>{dayjs(hour.time.split(' ')[0]).format('D/MM')}</p>
        <p>{hour.time.split(' ')[1]}</p>
      </div>
      <img src={weatherStyle.icon} alt="" className="w-20 h-20" />
      <div className="flex items-center">
        <img src="/weather/thermometer.svg" alt="" className="w-8 h-8 -mx-2" />
        <p>{hour.temp_c.toFixed(0)}º</p>
      </div>
      <div className="flex items-center col-start-4 col-end-5 row-start-1 row-end-2">
        {hour.chance_of_snow > 0 ? (
          <>
            <img
              src="/weather/snowflake.svg"
              alt=""
              className="w-8 h-8 -mx-1"
            />
            <p className="">{hour.chance_of_snow}%</p>
          </>
        ) : (
          <>
            <img
              src="/weather/raindrops.svg"
              alt=""
              className="w-8 h-8 -mx-1"
            />
            <p className="">{hour.chance_of_rain}%</p>
          </>
        )}
      </div>
    </div>
  );
}
