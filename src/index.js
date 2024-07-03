import React from 'react';  // Importing the main React library
import { createRoot } from 'react-dom/client';  // Importing createRoot from react-dom/client
import App from './App';  // Importing the root component of the application

// Creating a root for React rendering at the DOM element with ID 'root'
const container = document.getElementById('root');
const root = createRoot(container);

// Rendering the entire application wrapped in <React.StrictMode>
root.render(
  <React.StrictMode>
    <App />  {/* Rendering the root component of the application */}
  </React.StrictMode>
);
