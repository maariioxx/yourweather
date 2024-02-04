import { useSettingsStore } from '../store/settings';

export default function Line({
  isDay,
  width,
}: {
  isDay: number;
  width: number;
}) {
  const [darkMode, themeBackground] = useSettingsStore((state) => [
    state.darkMode,
    state.themeBackground,
  ]);
  return (
    <hr
      className={`${
        themeBackground
          ? darkMode
            ? 'border-white'
            : 'border-black'
          : isDay === 1
          ? 'border-black'
          : 'border-white'
      } w-${width}`}
    />
  );
}
