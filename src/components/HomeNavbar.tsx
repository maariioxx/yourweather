import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function HomeNavbar() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (location.pathname === '/') setSelectedTab(0);
    else if (location.pathname === '/hourly') setSelectedTab(1);
  }, [location.pathname]);

  return (
    <div className="w-full flex justify-center text-white bg-gray-50 bg-opacity-5 items-center h-32 gap-32 home-border-radius">
      <Link
        to="/"
        className={`${
          selectedTab === 0 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-50'
        } hover:border-yellow-400 border-2 rounded-3xl px-3 py-1 text-black transition-colors`}
        onClick={() => setSelectedTab(0)}
      >
        Current
      </Link>
      <Link
        to="/hourly"
        className={`${
          selectedTab === 1 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-50'
        } hover:border-yellow-400 border-2 rounded-3xl px-3 py-1 text-black transition-colors`}
        onClick={() => setSelectedTab(1)}
      >
        Hourly
      </Link>
      <Link
        to="/daily"
        className={`${
          selectedTab === 2 ? 'bg-yellow-400 border-yellow-400' : 'bg-gray-50'
        } hover:border-yellow-400 border-2 rounded-3xl px-3 py-1 text-black transition-colors`}
        onClick={() => setSelectedTab(2)}
      >
        Daily
      </Link>
    </div>
  );
}
