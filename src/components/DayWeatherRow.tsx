import dayjs from 'dayjs';
import { DayWeatherRowType } from '../types/DayWeatherRowType';
import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons';
import { useSettingsStore } from '../store/settings';
export default function DayWeatherRow({
  date,
  day,
}: {
  date: string;
  day: DayWeatherRowType;
}) {
  const imperialUnits = useSettingsStore((state) => state.imperialUnits);
  const weatherCode = weatherCodesAndIcons.filter((code) => {
    if (code.codes.includes(day.condition.code)) return code;
    return;
  });
  const weatherStyle = weatherCode[0].day;

  return (
    <div className="grid grid-cols-4 items-center gap-8 w-96">
      <p>{dayjs(date).format('D/MM')}</p>
      <img src={weatherStyle.icon} alt="" />
      <div className="flex gap-1 items-end">
        <p className="text-2xl -mb-0.5">
          {imperialUnits ? day.maxtemp_f.toFixed(0) : day.maxtemp_c.toFixed(0)}º
        </p>
        <p>
          {imperialUnits ? day.mintemp_f.toFixed(0) : day.mintemp_c.toFixed(0)}º
        </p>
      </div>
      <div className="flex items-center col-start-4 col-end-5 row-start-1 row-end-2">
        {day.daily_chance_of_snow > 0 ? (
          <>
            <img
              src="/weather/snowflake.svg"
              alt=""
              className="w-8 h-8 -mx-1"
            />
            <p className="">{day.daily_chance_of_snow}%</p>
          </>
        ) : (
          <>
            <img
              src="/weather/raindrops.svg"
              alt=""
              className="w-8 h-8 -mx-1"
            />
            <p className="">{day.daily_chance_of_rain}%</p>
          </>
        )}
      </div>
    </div>
  );
}
