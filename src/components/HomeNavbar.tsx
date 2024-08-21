import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

export default function HomeNavbar() {
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState(0)
  const [t] = useTranslation('global')

  useEffect(() => {
    if (location.pathname === '/') setSelectedTab(0)
    else if (location.pathname === '/hourly') setSelectedTab(1)
    else if (location.pathname === '/daily') setSelectedTab(2)
  }, [location.pathname])

  return (
    <div className="flex items-center justify-center gap-4 mt-4 text-white md:flex-row bg-opacity-5 md:mt-12 md:gap-32 home-border-radius">
      <Link
        to="/"
        className={`${
          selectedTab === 0 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-50'
        } hover:border-yellow-400 border-2 rounded-3xl px-3 py-1 text-black transition-colors`}
        onClick={() => setSelectedTab(0)}
      >
        {t('home-navbar.current')}
      </Link>
      <Link
        to="/hourly"
        className={`${
          selectedTab === 1 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-50'
        } hover:border-yellow-400 border-2 rounded-3xl px-3 py-1 text-black transition-colors`}
        onClick={() => setSelectedTab(1)}
      >
        {t('home-navbar.hourly')}
      </Link>
      <Link
        to="/daily"
        className={`${
          selectedTab === 2 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-50'
        } hover:border-yellow-400 border-2 rounded-3xl px-3 py-1 text-black transition-colors`}
        onClick={() => setSelectedTab(2)}
      >
        {t('home-navbar.daily')}
      </Link>
    </div>
  )
}
