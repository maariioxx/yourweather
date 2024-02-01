import { useState } from 'react';
import { fromLatLng, setKey } from 'react-geocode';
import { GeocodingAPIType } from '../types/GeocodingAPIType';
import { MdLocationOn } from 'react-icons/md';
import DropdownMenu from './DropdownMenu';

type NavbarProps = {
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setCurrentCity }: NavbarProps) {
  const [currentInput, setCurrentInput] = useState(
    localStorage.getItem('city') || ''
  );
  const [titleHovered, setTitleHovered] = useState(false);

  function onSettingCurrentCity(input: string) {
    setCurrentCity(input);
    localStorage.setItem('city', input);
  }

  async function getActualLocation() {
    const response = await fetch('http://localhost:3000/geocoding-api');
    const data = await response.json();
    setKey(data.key);
    navigator.geolocation.getCurrentPosition((position) => {
      fromLatLng(position.coords.latitude, position.coords.longitude).then(
        ({ results }: { results: GeocodingAPIType[] }) => {
          const res = results.filter((result) => {
            if (result.types.includes('locality')) return result;
          });
          onSettingCurrentCity(res[0].formatted_address);
        }
      );
    });
  }
  return (
    <header className="flex mx-0 flex-col md:flex-row items-center gap-6 justify-center sm:justify-evenly md:pr-6 lg:pr-12 xl:pr-24 py-8 bg-gray-100 dark:bg-neutral-900 dark:text-white">
      <h1
        className="text-3xl"
        onMouseOver={() => setTitleHovered(true)}
        onMouseOut={() => setTitleHovered(false)}
      >
        <span
          className={`${titleHovered && 'text-yellow-400'} transition-colors`}
        >
          Your
        </span>
        Weather
      </h1>
      <div className="flex mr-0  gap-3 items-center">
        <div className="flex gap-1">
          <button
            onClick={() => getActualLocation()}
            className="relative bg-gray-100 dark:bg-neutral-800 hover:bg-yellow-400 hover:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:border-yellow-400 dark:hover:text-black text-xl w-8 h-8 border-2 dark:border-neutral-700 rounded transition-colors"
          >
            <MdLocationOn className="absolute top-1 left-1" />
          </button>
          <div className="flex flex-col relative">
            <div id="cityinput" className="hidden">
              City input
            </div>
            <input
              aria-labelledby="cityinput"
              placeholder="Insert your desired city!"
              type="text"
              value={currentInput}
              onChange={(e) => {
                setCurrentInput(e.target.value);
              }}
              className="bg-gray-100 dark:bg-neutral-800 pl-1 p-0.5 rounded border-2 dark:border-neutral-700 outline-none hover:border-yellow-400 focus:border-yellow-400 dark:hover:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
            />
          </div>
          <button
            onFocus={() => onSettingCurrentCity(currentInput)}
            className="bg-gray-200 dark:bg-neutral-800 px-3 py-1 rounded hover:bg-yellow-400 dark:hover:bg-yellow-400 dark:hover:border-yellow-400 dark:hover:text-black transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <DropdownMenu />
    </header>
  );
}
