
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { analytics } from './services/analytics';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Initialize analytics on app load
analytics.initialize();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
