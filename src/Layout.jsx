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

// Continuous full-page atmospheric background. Multiple soft radial gradients
// in the brand palette create depth and "light source" cues, layered over a
// subtle vertical tone gradient. Sections render on top of this transparently
// so the whole page reads as one canvas instead of stacked slides.
const PAGE_BACKGROUND = `
  radial-gradient(ellipse 1200px 800px at 12% 6%,  rgba(29, 140, 198, 0.12),  transparent 60%),
  radial-gradient(ellipse 1000px 700px at 88% 28%, rgba(64, 196, 216, 0.08),  transparent 60%),
  radial-gradient(ellipse 1100px 800px at 25% 55%, rgba(29, 140, 198, 0.07),  transparent 60%),
  radial-gradient(ellipse 1000px 700px at 80% 80%, rgba(64, 196, 216, 0.06),  transparent 60%),
  linear-gradient(180deg, #181818 0%, #131313 30%, #0f0f0f 70%, #0a0a0a 100%)
`;

export default function Layout({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', DEFAULTS.accentColor);
    root.style.setProperty('--bg-base', DEFAULTS._tone.base);
    root.style.setProperty('--bg-alt', DEFAULTS._tone.alt);
    root.style.setProperty('--bg-surface', DEFAULTS._tone.surface);
    root.style.setProperty('--text-base', DEFAULTS._tone.text);
    document.body.style.background = '#0a0a0a';
    document.body.style.color = DEFAULTS._tone.text;
  }, []);

  return (
    <TweakContext.Provider value={DEFAULTS}>
      <Nav/>
      <div style={{
        position: 'relative',
        background: PAGE_BACKGROUND,
        backgroundAttachment: 'fixed',
      }}>
        {children}
      </div>
      <Footer/>
    </TweakContext.Provider>
  );
}
