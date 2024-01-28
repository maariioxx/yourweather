import { useState } from 'react';
import { City } from '../types/city';

type NavbarProps = {
  citiesData: City[];
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ citiesData, setCurrentCity }: NavbarProps) {
  const [currentInput, setCurrentInput] = useState('');
  return (
    <header className="flex justify-between p-6">
      <h1>YourWeather</h1>
      <div className="flex">
        <div className="flex flex-col">
          <input
            type="text"
            onChange={(e) => setCurrentInput(e.target.value)}
          />
          <div>
            {citiesData
              .filter((city) => {
                if (
                  currentInput.length > 3 &&
                  city.city.toLowerCase().includes(currentInput.toLowerCase())
                )
                  return city;
              })
              .map((city) => {
                return (
                  <p key={crypto.randomUUID()}>
                    {`${city.city.charAt(0).toUpperCase()}${city.city
                      .slice(1)
                      .toLowerCase()}`}
                  </p>
                );
              })}
          </div>
        </div>
        <button onClick={() => setCurrentCity(currentInput)}>Search</button>
      </div>
    </header>
  );
}
