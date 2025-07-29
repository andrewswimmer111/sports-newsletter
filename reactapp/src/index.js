import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(<App />); // Use the root to render your app.

console.log("Frontend URL:", process.env.REACT_APP_LOCAL_HOST);
console.log("Backend URL:", process.env.REACT_APP_API_URL);
