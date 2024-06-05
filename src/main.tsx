import React from 'react';
import ReactDOM from 'react-dom/client';
import './client/index.scss';
import WrappedApp from './client/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WrappedApp />
  </React.StrictMode>
);
