import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdLocationOn } from 'react-icons/md'
import DropdownMenu from './DropdownMenu'

type NavbarProps = {
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>
}

export default function Navbar({ setCurrentCity }: NavbarProps) {
  const [t, i18next] = useTranslation('global')
  const [currentInput, setCurrentInput] = useState(
    localStorage.getItem('city') || ''
  )
  const [titleHovered, setTitleHovered] = useState(false)

  function onSettingCurrentCity(input: string) {
    setCurrentCity(input)
    localStorage.setItem('city', input)
  }

  async function getActualLocation() {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const response = await fetch('/.netlify/api/weather', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        })
        if (!response.ok) throw new Error('Geocoding API fetch failed')
        const data = await response.json()
        onSettingCurrentCity(data)
      })
    }
    fetchData()
  }
  return (
    <header className="flex flex-col items-center justify-center gap-6 py-8 mx-0 bg-gray-100 md:flex-row sm:justify-evenly md:pr-6 lg:pr-12 xl:pr-24 dark:bg-neutral-900 dark:text-white">
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
      <div className="flex items-center gap-3 mr-0">
        <div className="flex gap-1">
          <button
            onClick={() => getActualLocation()}
            className="relative w-8 h-8 text-xl transition-colors bg-gray-100 border-2 rounded dark:bg-neutral-800 hover:bg-yellow-400 hover:border-yellow-400 dark:hover:bg-yellow-400 dark:hover:border-yellow-400 dark:hover:text-black dark:border-neutral-700"
          >
            <MdLocationOn className="absolute top-1 left-1" />
          </button>
          <div className="relative flex flex-col">
            <div id="cityinput" className="hidden">
              City input
            </div>
            <input
              aria-labelledby="cityinput"
              placeholder={t('navbar.placeholder')}
              type="text"
              value={currentInput}
              onChange={(e) => {
                setCurrentInput(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSettingCurrentCity(currentInput)
              }}
              className="bg-gray-100 dark:bg-neutral-800 pl-1 p-0.5 rounded border-2 dark:border-neutral-700 outline-none hover:border-yellow-400 focus:border-yellow-400 dark:hover:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
            />
          </div>
          <button
            onClick={() => onSettingCurrentCity(currentInput)}
            className="px-3 py-1 transition-colors bg-gray-200 rounded dark:bg-neutral-800 hover:bg-yellow-400 dark:hover:bg-yellow-400 dark:hover:border-yellow-400 dark:hover:text-black"
          >
            {t('navbar.search')}
          </button>
        </div>
      </div>
      <DropdownMenu />
    </header>
  )
}
