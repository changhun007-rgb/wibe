import { useEffect } from 'react';
import { TweakContext } from './components.jsx';
import { Nav, Footer } from './sections.jsx';
import './styles.css';

// Shared brand/tone defaults. Every page wraps its content in this so the
// header, footer, and CSS variables stay consistent across the multi-page
// build (home, /about, /services, /global, /contact).
const DEFAULTS = {
  accentColor: '#1d8cc6',
  brandName: 'WIBE',
  titleScale: 100,
  sectionPadding: 120,
  cardRadius: 12,
  showBridge: true,
  showSectionLabels: true,
  uppercaseCTA: true,
  ctaPrimary: '상담 문의하기',
  ctaSecondary: 'WIBE 서비스 소개',
  _tone: { base: '#121212', alt: '#0e0e0e', surface: '#181818', text: '#ffffff' },
};

export default function Layout({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', DEFAULTS.accentColor);
    root.style.setProperty('--bg-base', DEFAULTS._tone.base);
    root.style.setProperty('--bg-alt', DEFAULTS._tone.alt);
    root.style.setProperty('--bg-surface', DEFAULTS._tone.surface);
    root.style.setProperty('--text-base', DEFAULTS._tone.text);
    document.body.style.background = DEFAULTS._tone.base;
    document.body.style.color = DEFAULTS._tone.text;
  }, []);

  return (
    <TweakContext.Provider value={DEFAULTS}>
      <Nav/>
      {children}
      <Footer/>
    </TweakContext.Provider>
  );
}
