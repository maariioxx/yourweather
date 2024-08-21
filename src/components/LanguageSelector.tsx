import { useState, useEffect, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { MdCompareArrows } from 'react-icons/md';
import { useSettingsStore } from '../store/settings';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const [t, i18n] = useTranslation('global');
  const darkMode = useSettingsStore((state) => state.darkMode);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    switch (localStorage.getItem('language')) {
      case 'es':
        setSelectedLanguage('es');
        break;
      default:
        setSelectedLanguage('en');
        break;
    }
  }, []);
  useEffect(() => {
    switch (selectedLanguage) {
      case 'en':
        i18n.changeLanguage('en');
        localStorage.setItem('language', 'en');
        break;
      case 'es':
        i18n.changeLanguage('es');
        localStorage.setItem('language', 'es');
        break;
    }
  }, [selectedLanguage]);

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <p>Language</p>
      <Listbox
        value={selectedLanguage === 'en' ? 'English' : 'Spanish'}
        onChange={setSelectedLanguage}
      >
        <Listbox.Button
          className={`${
            darkMode ? 'bg-gray-50' : 'bg-black'
          } bg-opacity-15 py-1 px-3 rounded-xl flex gap-2 items-center`}
        >
          <span>{selectedLanguage === 'en' ? 'English' : 'Spanish'}</span>
          <span>{<MdCompareArrows />}</span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={`${
              darkMode ? 'bg-gray-50' : 'bg-black'
            } bg-opacity-15 rounded-xl`}
          >
            <Listbox.Option
              value={'en'}
              className={({ active }) =>
                `cursor-pointer select-none py-2 px-4 flex justify-center rounded-t-xl ${
                  active ? 'bg-yellow-400 text-black' : ''
                }`
              }
            >
              English
            </Listbox.Option>
            <Listbox.Option
              value={'es'}
              className={({ active }) =>
                `text-center cursor-pointer select-none py-2 px-4 flex justify-center rounded-b-xl ${
                  active ? 'bg-yellow-400 text-black' : ''
                }`
              }
            >
              Spanish
            </Listbox.Option>
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
