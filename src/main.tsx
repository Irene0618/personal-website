import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ParticleCat from './ParticleCat';
import './index.css';
import './portfolio-motion.css';
import './home-theme.css';
import './site-theme.css';
import './fish-cursor.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ParticleCat />
  </React.StrictMode>,
);
