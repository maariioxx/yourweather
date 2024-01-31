import { Menu, Transition } from '@headlessui/react';
import { MdOutlineSettings } from 'react-icons/md';
import { useContext, Fragment } from 'react';
import { SettingsContext } from '../context/Settings';
import { SettingsContextType } from '../types/SettingsContextType';
import MenuRow from './MenuRow';

export default function DropdownMenu() {
  const {
    darkMode,
    setDarkMode,
    themeBackground,
    setThemeBackground,
    imperialUnits,
    setImperialUnits,
  } = useContext(SettingsContext) as SettingsContextType;
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative bg-gray-100 dark:bg-neutral-800 hover:bg-yellow-400 hover:border-yellow-400 text-xl w-8 h-8 border-2 rounded dark:border-neutral-700 dark:hover:bg-yellow-400 dark:hover:border-yellow-400 dark:hover:text-black transition-colors">
        <MdOutlineSettings className="absolute top-1 left-1" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="flex flex-col gap-6 bg-gray-100 dark:bg-neutral-800 border-2 dark:border-neutral-700 rounded-xl absolute top-10 -left-24 sm:-left-44 p-4">
          <MenuRow
            state={darkMode}
            setState={setDarkMode}
            localStorageName="dark-mode"
            title="Theme"
            leftinfo="Light"
            rightinfo="Dark"
          />
          <MenuRow
            state={themeBackground}
            setState={setThemeBackground}
            localStorageName="theme-background"
            title="Background"
            leftinfo="Weather"
            rightinfo="Theme"
          />
          <MenuRow
            state={imperialUnits}
            setState={setImperialUnits}
            localStorageName="imperial-units"
            title="Units"
            leftinfo="Metric"
            rightinfo="Imperial"
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
