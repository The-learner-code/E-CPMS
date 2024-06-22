import React from 'react';  // Importing the main React library
import ReactDOM from 'react-dom';  // Importing ReactDOM for rendering React components into the DOM
import App from './App';  // Importing the root component of the application

// Creating a root for React rendering at the DOM element with ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the entire application wrapped in <React.StrictMode>
root.render(
  <React.StrictMode>
    <App />  {/* Rendering the root component of the application */}
  </React.StrictMode>
);
