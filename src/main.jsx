import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import './styles.css';

const path = window.location.pathname;
const isPrivacy = path === '/privacy' || path === '/privacy/';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isPrivacy ? <PrivacyPolicy/> : <App/>}
  </StrictMode>,
);
