import { HomeInfoRowPropsType } from '../types/HomeInfoRowPropsType';
import { useSettingsStore } from '../store/settings';

export default function HomeInfoRow({
  title,
  iconName,
  isInfoAUnit,
  info,
  optionalInfo,
  text,
  optionalText,
}: HomeInfoRowPropsType) {
  const imperialUnits = useSettingsStore((state) => state.imperialUnits);
  return (
    <div className="flex items-center gap-64 justify-between">
      <h2>{title}</h2>
      <div className="flex items-center">
        {typeof iconName !== 'undefined' && (
          <img
            src={`/weather/${iconName}.svg`}
            alt=""
            className=" w-16 rounded-sm"
          />
        )}
        {typeof info === 'string' || typeof info === 'number' ? (
          <p className="text-4xl">
            {isInfoAUnit
              ? imperialUnits
                ? `${optionalInfo}`
                : `${info}`
              : `${info}`}
            <span className="text-xl">
              {isInfoAUnit
                ? imperialUnits
                  ? `${optionalText}`
                  : `${text}`
                : `${text}`}
            </span>
          </p>
        ) : (
          <p className={`${info.color} text-white px-4 py-2 rounded-2xl`}>
            {info.text}
          </p>
        )}
      </div>
    </div>
  );
}
