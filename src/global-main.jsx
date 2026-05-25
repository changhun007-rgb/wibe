import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalPage from './GlobalPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalPage/>
  </StrictMode>,
);
