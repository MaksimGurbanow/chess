import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import WrappedApp from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
