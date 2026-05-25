import { createContext, useContext, useState } from 'react';

export const TweakContext = createContext({});
export const useTweak = () => useContext(TweakContext);

function shiftColor(hex, amt) {
  if (!hex || hex[0] !== '#') return hex;
  let h = hex.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = parseInt(h, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0xff) + amt;
  let b = (num & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

export const COLORS = {
  base: '#121212',
  surface: '#181818',
  elevated: '#1f1f1f',
  card2: '#252525',
  card3: '#272727',
  green: '#1d8cc6',
  greenPress: '#1779ad',
  textBase: '#ffffff',
  textMutedBright: '#cbcbcb',
  textMuted: '#b3b3b3',
  textSubdued: '#7c7c7c',
  borderMuted: '#7c7c7c',
};

export const PrimaryButton = ({ children, href, onClick, size = 'md', type = 'a' }) => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  const upper = t.uppercaseCTA !== false;
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const padding = size === 'lg' ? '16px 36px' : '12px 28px';
  const fontSize = size === 'lg' ? 15 : 14;
  const style = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    background: accent,
    color: '#000',
    padding,
    borderRadius: 9999,
    fontSize,
    fontWeight: 700,
    textTransform: upper ? 'uppercase' : 'none',
    letterSpacing: upper ? '1.4px' : '0',
    transform: press ? 'scale(0.99)' : (hover ? 'scale(1.04)' : 'scale(1)'),
    transition: 'transform 200ms cubic-bezier(0.3,0,0,1), background 200ms',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    border: 0,
  };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
  };
  if (type === 'submit') {
    return <button type="submit" onClick={onClick} {...handlers} style={style}>{children}</button>;
  }
  return <a href={href} onClick={onClick} {...handlers} style={style}>{children}</a>;
};

export const SecondaryButton = ({ children, href, onClick, size = 'md' }) => {
  const t = useTweak();
  const upper = t.uppercaseCTA !== false;
  const [hover, setHover] = useState(false);
  const padding = size === 'lg' ? '15px 34px' : '11px 26px';
  const fontSize = size === 'lg' ? 15 : 14;
  return (
    <a href={href} onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: 'transparent',
        color: COLORS.textBase,
        padding,
        borderRadius: 9999,
        fontSize,
        fontWeight: 700,
        textTransform: upper ? 'uppercase' : 'none',
        letterSpacing: upper ? '1.4px' : '0',
        border: `1px solid ${hover ? COLORS.textBase : COLORS.borderMuted}`,
        transition: 'border-color 200ms, transform 150ms',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}>
      {children}
    </a>
  );
};

export const SectionLabel = ({ children, accent = false }) => {
  const t = useTweak();
  if (t.showSectionLabels === false) return null;
  const accentCol = t.accentColor || COLORS.green;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: accent ? accentCol : COLORS.textMuted,
      marginBottom: 20,
    }}>
      <span style={{
        display: 'inline-block', width: 24, height: 1,
        background: accent ? accentCol : COLORS.textSubdued,
      }}/>
      {children}
    </div>
  );
};

export const SectionHeading = ({ children, size = 'lg' }) => {
  const t = useTweak();
  const scale = (t.titleScale || 100) / 100;
  const textColor = t._tone?.text || COLORS.textBase;
  const fs = size === 'xl'
    ? `clamp(${36 * scale}px, ${5 * scale}vw, ${56 * scale}px)`
    : `clamp(${28 * scale}px, ${4 * scale}vw, ${44 * scale}px)`;
  return (
    <h2 style={{
      fontFamily: 'var(--font-title)',
      fontSize: fs,
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
      color: textColor,
      margin: '0 0 24px 0',
      textWrap: 'pretty',
    }}>
      {children}
    </h2>
  );
};

export const Lead = ({ children }) => {
  const t = useTweak();
  const textColor = t._tone?.text || COLORS.textBase;
  const mutedColor = textColor === '#ffffff' ? COLORS.textMutedBright : 'rgba(0,0,0,0.72)';
  return (
    <p style={{
      fontSize: 'clamp(15px, 1.4vw, 18px)',
      lineHeight: 1.7,
      color: mutedColor,
      margin: '0 0 24px 0',
      maxWidth: 720,
      textWrap: 'pretty',
    }}>
      {children}
    </p>
  );
};

export const Card = ({ children, padding = 28, hover: hoverable = false, style = {} }) => {
  const t = useTweak();
  const radius = t.cardRadius != null ? t.cardRadius : 12;
  const surface = t._tone?.surface || COLORS.surface;
  const elevated = t._tone?.surface ? shiftColor(surface, 8) : COLORS.elevated;
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={() => hoverable && setHover(false)}
      style={{
        background: hoverable && hover ? elevated : surface,
        borderRadius: radius,
        padding,
        transition: 'background 200ms cubic-bezier(0.3,0,0,1)',
        boxShadow: hover ? 'rgba(0,0,0,0.5) 0 8px 24px' : 'rgba(0,0,0,0.3) 0 4px 8px',
        ...style,
      }}>
      {children}
    </div>
  );
};

export const Highlight = ({ children }) => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  return (
    <div style={{
      borderTop: `1px solid ${accent}`,
      paddingTop: 24,
      marginTop: 32,
      maxWidth: 880,
    }}>
      <p style={{
        fontFamily: 'var(--font-title)',
        fontSize: 'clamp(20px, 2.2vw, 28px)',
        fontWeight: 700,
        lineHeight: 1.4,
        color: COLORS.textBase,
        margin: 0,
        letterSpacing: '-0.01em',
        textWrap: 'pretty',
      }}>
        {children}
      </p>
    </div>
  );
};

export const Section = ({ id, children, bg, py }) => {
  const t = useTweak();
  const padY = py != null ? py : (t.sectionPadding || 120);
  // Sections default to transparent so the continuous body atmosphere
  // (set by Layout) shows through — avoids the "stacked slides" feel.
  // 'alt' is now a very subtle lightening overlay rather than a different
  // opaque color, just enough to create rhythm without hard boundaries.
  const resolvedBg = bg === 'alt'
    ? 'rgba(255, 255, 255, 0.015)'
    : (bg || 'transparent');
  return (
    <section id={id} style={{
      background: resolvedBg,
      padding: `${padY}px clamp(20px, 5vw, 64px)`,
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
};

export const BrandMark = ({ size = 32 }) => (
  <img
    src="/logo.png"
    alt="WIBE"
    width={size}
    height={size}
    style={{ display: 'block', objectFit: 'contain' }}
  />
);
