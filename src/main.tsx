import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './global.css';
import { AppContextProvider } from './providers/app-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
);
