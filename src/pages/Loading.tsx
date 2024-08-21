import { useSettingsStore } from '../store/settings';
import { InfinitySpin } from 'react-loader-spinner';

export default function Loading() {
  const darkMode = useSettingsStore((state) => state.darkMode);
  return (
    <main className="grow flex flex-col bg-gray-100 dark:bg-neutral-900 h-screen">
      <div
        className={`${darkMode ? 'bg-neutral-800' : 'bg-gray-200'} ${
          darkMode ? 'text-white' : 'text-black'
        } grow rounded-t-[100px] flex gap-24 md:gap-44 pb-36 items-center justify-center jus flex-col transition-all`}
      >
        <InfinitySpin color="#eab308" />
      </div>
    </main>
  );
}
