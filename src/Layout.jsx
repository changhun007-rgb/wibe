import { useEffect } from 'react';
import { TweakContext } from './components.jsx';
import { Nav, Footer, FloatingOrbs } from './sections.jsx';
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

// Single continuous canvas: one gentle vertical tone with one big soft accent
// glow at the top, applied to the body. Avoids the multi-radial layered look
// that was making the boundary between hero and the next section visible.
// FloatingOrbs are mounted at the document-level (not trapped inside Hero) so
// the atmosphere flows through the entire scroll.

export default function Layout({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', DEFAULTS.accentColor);
    root.style.setProperty('--bg-base', DEFAULTS._tone.base);
    root.style.setProperty('--bg-alt', DEFAULTS._tone.alt);
    root.style.setProperty('--bg-surface', DEFAULTS._tone.surface);
    root.style.setProperty('--text-base', DEFAULTS._tone.text);
    document.body.style.background = `
      radial-gradient(ellipse 1400px 900px at 50% -10%, ${DEFAULTS.accentColor}1f, transparent 60%),
      linear-gradient(180deg, #161616 0%, #111111 40%, #0c0c0c 100%)
    `;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.color = DEFAULTS._tone.text;
  }, []);

  return (
    <TweakContext.Provider value={DEFAULTS}>
      <Nav/>
      {/* Page-level orbs: float behind every section so the atmosphere flows
          through the whole scroll, not just the hero. pointer-events: none and
          z-index 0 keep them strictly decorative. */}
      <div style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <FloatingOrbs accent={DEFAULTS.accentColor}/>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <Footer/>
    </TweakContext.Provider>
  );
}
