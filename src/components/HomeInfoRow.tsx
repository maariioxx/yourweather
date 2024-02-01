import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../types/SettingsContextType';
import { HomeInfoRowPropsType } from '../types/HomeInfoRowPropsType';
import { useContext } from 'react';

export default function HomeInfoRow({
  title,
  iconName,
  isInfoAUnit,
  info,
  optionalInfo,
  text,
  optionalText,
}: HomeInfoRowPropsType) {
  const { imperialUnits } = useContext(SettingsContext) as SettingsContextType;
  return (
    <div className="flex items-center gap-64 justify-between">
      <h2>{title}</h2>
      <div className="flex items-center">
        <img
          src={`/weather/${iconName}.svg`}
          alt=""
          className=" w-16 rounded-sm"
        />
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
      </div>
    </div>
  );
}
