import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ServicesPage from './ServicesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServicesPage/>
  </StrictMode>,
);
