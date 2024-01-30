import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemesProvider } from './context/Themes.tsx';
import App from './App.tsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemesProvider>
  </React.StrictMode>
);
