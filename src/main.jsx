// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './index.css';
import App from './App.jsx';
import 'bulma/css/bulma.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Envuelve App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);