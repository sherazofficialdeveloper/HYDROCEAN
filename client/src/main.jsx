import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './styles/index.css';

console.log('✅ main.jsx loaded'); // ✅ Debug log

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);