import { useEffect } from 'react';
import { TweakContext } from './components.jsx';
import {
  Nav, Hero, MarketBackground, WhyJapan, Services, Process, WhyUs, GlobalExpansion, Contact, Footer,
} from './sections.jsx';

const DEFAULTS = {
  accentColor: '#ee9144',
  brandName: 'WIBE',
  heroEmphasis: '일본',
  activeCountry: 'JP',
  titleScale: 100,
  sectionPadding: 120,
  cardRadius: 12,
  showCountryChain: true,
  showBridge: true,
  uppercaseCTA: true,
  showSectionLabels: true,
  ctaPrimary: '상담 문의하기',
  ctaSecondary: 'WIBE 서비스 소개',
  _tone: { base: '#121212', alt: '#0e0e0e', surface: '#181818', text: '#ffffff' },
};

export default function App() {
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
      <Hero/>
      <MarketBackground/>
      <WhyJapan/>
      <Services/>
      <Process/>
      <WhyUs/>
      <GlobalExpansion/>
      <Contact/>
      <Footer/>
    </TweakContext.Provider>
  );
}
