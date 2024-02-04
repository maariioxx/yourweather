import dayjs from 'dayjs';
import { DayWeatherRowType } from '../types/DayWeatherRowType';
import { weatherCodesAndIcons } from '../data/weatherCodesAndIcons';
export default function DayWeatherRow({
  date,
  day,
}: {
  date: string;
  day: DayWeatherRowType;
}) {
  const weatherCode = weatherCodesAndIcons.filter((code) => {
    if (code.codes.includes(day.condition.code)) return code;
    return;
  });
  const weatherStyle = weatherCode[0].day;

  return (
    <div className="grid grid-cols-4 items-center gap-6 w-64">
      <p>{dayjs(date).format('D/MM')}</p>
      <img src={weatherStyle.icon} alt="" />
    </div>
  );
}
