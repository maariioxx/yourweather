import { Menu, Transition } from '@headlessui/react'
import { MdOutlineSettings } from 'react-icons/md'
import { Fragment } from 'react'
import MenuRow from './MenuRow'
import { useSettingsStore } from '../store/settings'
import LanguageSelector from './LanguageSelector'
import { useTranslation } from 'react-i18next'

export default function DropdownMenu() {
  const [
    darkMode,
    setDarkMode,
    themeBackground,
    setThemeBackground,
    imperialUnits,
    setImperialUnits,
  ] = useSettingsStore((state) => [
    state.darkMode,
    state.setDarkMode,
    state.themeBackground,
    state.setThemeBackground,
    state.imperialUnits,
    state.setImperialUnits,
  ])
  const [t] = useTranslation('global')

  return (
    <Menu as="div" className="relative z-10">
      <Menu.Button className="relative w-8 h-8 text-xl transition-colors bg-gray-100 border-2 rounded dark:bg-neutral-800 hover:bg-yellow-400 hover:border-yellow-400 dark:border-neutral-700 dark:hover:bg-yellow-400 dark:hover:border-yellow-400 dark:hover:text-black">
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
        <Menu.Items className="absolute flex flex-col gap-6 p-4 bg-gray-100 border-2 dark:bg-neutral-800 dark:border-neutral-700 rounded-xl top-10 -left-24 sm:-left-44">
          <MenuRow
            state={darkMode}
            setState={setDarkMode}
            localStorageName="dark-mode"
            title={t('navbar.settings.theme')}
            leftinfo={t('navbar.settings.light')}
            rightinfo={t('navbar.settings.dark')}
          />
          <MenuRow
            state={themeBackground}
            setState={setThemeBackground}
            localStorageName="theme-background"
            title={t('navbar.settings.background')}
            leftinfo={t('navbar.settings.weather')}
            rightinfo={t('navbar.settings.theme')}
          />
          <MenuRow
            state={imperialUnits}
            setState={setImperialUnits}
            localStorageName="imperial-units"
            title={t('navbar.settings.units')}
            leftinfo={t('navbar.settings.metric')}
            rightinfo={t('navbar.settings.imperial')}
          />

          <LanguageSelector />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
