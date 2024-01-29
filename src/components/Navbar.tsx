import { useState } from 'react';

type NavbarProps = {
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ setCurrentCity }: NavbarProps) {
  const [currentInput, setCurrentInput] = useState(
    localStorage.getItem('city') || ''
  );
  const [titleHovered, setTitleHovered] = useState(false);

  function onSubmitClick() {
    setCurrentCity(currentInput);
    localStorage.setItem('city', currentInput);
  }
  return (
    <header className="flex justify-between p-8 bg-gray-50">
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
      <div className="flex mr-5 gap-1 items-center">
        <div className="flex flex-col relative">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
            }}
            className="bg-gray-100 p-0.5 rounded border-2 outline-none hover:border-yellow-400 focus:border-yellow-400 transition-colors"
          />
        </div>
        <button
          onFocus={() => onSubmitClick()}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-yellow-400 transition-colors"
        >
          Search
        </button>
      </div>
    </header>
  );
}
