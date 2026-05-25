import { useState, useEffect, Fragment } from 'react';
import {
  COLORS, useTweak,
  PrimaryButton, SecondaryButton,
  SectionLabel, SectionHeading, Lead, Card, Highlight, Section, BrandMark,
} from './components.jsx';

// ─── NAV ────────────────────────────────────────────
// Page-based nav (multi-page Vite build). "Active" is determined by the
// current pathname rather than scroll position. The CTA button on the right
// always points to /contact/.
const NAV = [
  { href: '/',          label: '홈',           short: '홈',     match: (p) => p === '/' || p === '' },
  { href: '/about/',    label: '회사 소개',    short: '소개',   match: (p) => p.startsWith('/about') },
  { href: '/services/', label: '서비스',       short: '서비스', match: (p) => p.startsWith('/services') },
  { href: '/global/',   label: '글로벌 마케팅', short: '글로벌', match: (p) => p.startsWith('/global') },
  { href: '/contact/',  label: '문의하기',     short: '문의',   match: (p) => p.startsWith('/contact') },
];

export const Nav = () => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  const brandName = t.brandName || 'WIBE';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (item) => item.match(path);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'background 200ms, border 200ms',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '14px clamp(20px, 5vw, 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          color: COLORS.textBase, fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em',
          textDecoration: 'none',
        }}>
          <BrandMark size={26}/>
          <span>{brandName.includes('.') ? (<>{brandName.split('.')[0]}<span style={{ color: accent }}>.</span>{brandName.split('.').slice(1).join('.')}</>) : brandName}</span>
        </a>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV.slice(0, -1).map((n) => {
            const active = isActive(n);
            return (
              <a key={n.href} href={n.href} style={{
                padding: '8px 12px',
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? COLORS.textBase : COLORS.textMuted,
                transition: 'color 150ms',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = COLORS.textBase}
              onMouseLeave={(e) => e.currentTarget.style.color = active ? COLORS.textBase : COLORS.textMuted}
              >{n.label}</a>
            );
          })}
          <div style={{ marginLeft: 8 }}>
            <PrimaryButton href="/contact/">문의하기</PrimaryButton>
          </div>
        </nav>

        <button className="mobile-burger" onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'transparent', border: 0, color: COLORS.textBase, cursor: 'pointer',
            padding: 8,
          }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></>
                  : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{
          background: 'rgba(10,10,10,0.96)',
          backdropFilter: 'blur(18px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '8px clamp(20px, 5vw, 64px) 24px',
        }}>
          {NAV.map((n) => {
            const active = isActive(n);
            return (
              <a key={n.href} href={n.href} style={{
                display: 'block', padding: '14px 4px',
                fontSize: 16, fontWeight: 600,
                color: active ? accent : COLORS.textBase,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              }}>{n.short}</a>
            );
          })}
          <div style={{ marginTop: 16 }}>
            <PrimaryButton href="/contact/">상담 문의하기</PrimaryButton>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </header>
  );
};

// ─── HERO ────────────────────────────────────────────

// Background floating orbs — soft glowing color blobs that drift independently
// across the hero. Mobile-friendly (no fine details) and GPU-accelerated via
// CSS transforms. Color palette stays warm so it complements the orange brand
// instead of competing with the foreground.
export const FloatingOrbs = ({ accent }) => (
  <div style={{
    position: 'absolute', inset: 0,
    overflow: 'hidden', pointerEvents: 'none', zIndex: 1,
  }}>
    <div className="wibe-orb wibe-orb-1"/>
    <div className="wibe-orb wibe-orb-2"/>
    <div className="wibe-orb wibe-orb-3"/>
    <div className="wibe-orb wibe-orb-4"/>
    <div className="wibe-orb wibe-orb-5"/>
    <style>{`
      .wibe-orb {
        position: absolute;
        border-radius: 50%;
        will-change: transform;
      }
      .wibe-orb-1 {
        width: 60vw; height: 60vw; max-width: 720px; max-height: 720px;
        top: -22%; left: -18%;
        background: radial-gradient(circle, ${accent}55 0%, ${accent}1a 35%, transparent 65%);
        animation: wibe-orb-drift-1 22s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }
      .wibe-orb-2 {
        width: 52vw; height: 52vw; max-width: 620px; max-height: 620px;
        top: 30%; right: -18%;
        background: radial-gradient(circle, rgba(64,196,216,0.42) 0%, rgba(64,196,216,0.12) 35%, transparent 65%);
        animation: wibe-orb-drift-2 26s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        animation-delay: -4s;
      }
      .wibe-orb-3 {
        width: 46vw; height: 46vw; max-width: 560px; max-height: 560px;
        bottom: -22%; left: 22%;
        background: radial-gradient(circle, rgba(180,200,220,0.30) 0%, rgba(180,200,220,0.08) 35%, transparent 65%);
        animation: wibe-orb-drift-3 30s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        animation-delay: -9s;
      }
      .wibe-orb-4 {
        width: 42vw; height: 42vw; max-width: 520px; max-height: 520px;
        top: -8%; right: 18%;
        background: radial-gradient(circle, rgba(45,100,145,0.36) 0%, rgba(45,100,145,0.10) 35%, transparent 65%);
        animation: wibe-orb-drift-4 18s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        animation-delay: -6s;
      }
      .wibe-orb-5 {
        width: 38vw; height: 38vw; max-width: 460px; max-height: 460px;
        bottom: 18%; left: -8%;
        background: radial-gradient(circle, ${accent}3d 0%, ${accent}10 35%, transparent 65%);
        animation: wibe-orb-drift-5 24s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        animation-delay: -12s;
      }
      @keyframes wibe-orb-drift-1 {
        0%, 100% { transform: translate3d(0, 0, 0); }
        25%      { transform: translate3d(12vw, 8vh, 0); }
        50%      { transform: translate3d(22vw, 18vh, 0); }
        75%      { transform: translate3d(8vw, 22vh, 0); }
      }
      @keyframes wibe-orb-drift-2 {
        0%, 100% { transform: translate3d(0, 0, 0); }
        33%      { transform: translate3d(-18vw, -12vh, 0); }
        66%      { transform: translate3d(-8vw, -22vh, 0); }
      }
      @keyframes wibe-orb-drift-3 {
        0%, 100% { transform: translate3d(0, 0, 0); }
        40%      { transform: translate3d(18vw, -18vh, 0); }
        70%      { transform: translate3d(-10vw, -8vh, 0); }
      }
      @keyframes wibe-orb-drift-4 {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50%      { transform: translate3d(-22vw, 28vh, 0); }
      }
      @keyframes wibe-orb-drift-5 {
        0%, 100% { transform: translate3d(0, 0, 0); }
        45%      { transform: translate3d(14vw, -14vh, 0); }
        80%      { transform: translate3d(22vw, 8vh, 0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .wibe-orb { animation: none !important; }
      }
    `}</style>
  </div>
);


// (HeroVisual / 국가별 카드 시각화는 글로벌 전용 페이지에서 사용 예정. 메인은 미니멀.)

export const Hero = () => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  const titleScale = (t.titleScale || 100) / 100;

  return (
    <section id="home" style={{
      position: 'relative',
      // No fixed 100vh anymore — page no longer feels like "slide 1/5".
      // Just enough height to give the hero presence.
      minHeight: 'clamp(560px, 80vh, 760px)',
      padding: '140px clamp(20px, 5vw, 64px) 80px',
      // Transparent: the body's atmospheric canvas (and the page-level
      // FloatingOrbs in Layout) shows through. No internal background means
      // no visible boundary where the hero ends.
      background: 'transparent',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 900, margin: '0 auto', width: '100%',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>
        <SectionLabel accent>Marketing Partner for Korean Brands</SectionLabel>
        <h1 style={{
          fontFamily: 'var(--font-title)',
          fontSize: `clamp(${40 * titleScale}px, ${6 * titleScale}vw, ${74 * titleScale}px)`,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          margin: '0 auto 28px',
          textWrap: 'balance',
          maxWidth: 880,
        }}>
          한국에서 글로벌까지,<br/>
          <span style={{ color: accent }}>데이터로 검증된 마케팅</span>
        </h1>
        <p style={{
          fontSize: 'clamp(15px, 1.5vw, 19px)',
          lineHeight: 1.7,
          color: COLORS.textMutedBright,
          margin: '0 auto 40px',
          maxWidth: 640,
          textWrap: 'pretty',
        }}>
          WIBE는 한국 브랜드의 국내·해외 마케팅을 함께 설계합니다.
          추측이 아닌 실험으로, 작게 시작해 검증된 방향으로 확장합니다.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <PrimaryButton href="#contact" size="lg">{t.ctaPrimary || '상담 문의하기'}</PrimaryButton>
          <SecondaryButton href="#services-preview" size="lg">{t.ctaSecondary || 'WIBE 서비스 소개'}</SecondaryButton>
        </div>
      </div>
    </section>
  );
};

// ─── ABOUT (COMPANY) ───────────────────────────────
// Company-focused intro. Avoids spotlighting a single founder — a one-person
// shop framing can actually erode trust ("who covers if they're sick?") —
// and keeps the page focused on building just enough credibility to earn a
// meeting, not on closing the sale.
export const About = ({ py }) => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  const stats = [
    { num: '200+',   label: '글로벌 브랜드',  sub: '캠페인 운영 경험' },
    { num: '3년',    label: '일본 현지',      sub: '거주 경험' },
    { num: 'Google', label: 'Japan',         sub: '캠페인 전문가 출신' },
  ];
  return (
    <Section id="about" py={py}>
      <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <SectionLabel accent>About WIBE</SectionLabel>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: COLORS.textBase,
          margin: '0 auto 24px',
          textWrap: 'pretty',
        }}>
          데이터와 현지 경험으로<br/>
          <span style={{ color: accent }}>한국 브랜드의 마케팅</span>을 설계합니다
        </h2>

        <p style={{
          fontSize: 'clamp(15px, 1.4vw, 17px)',
          lineHeight: 1.7,
          color: COLORS.textMutedBright,
          margin: '0 auto 16px',
          maxWidth: 720,
          textWrap: 'pretty',
        }}>
          WIBE는 한국 브랜드의 국내·해외 마케팅을 함께 설계하는 마케팅 파트너입니다.
          Google Japan 캠페인 운영 경험과 일본 현지 거주 경험을 바탕으로,
          시장 분석부터 광고 운영, 성과 측정까지 일관된 흐름으로 함께합니다.
        </p>
      </div>

      {/* Stat cards row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
        marginTop: 56,
        maxWidth: 880,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {stats.map((s) => (
          <div key={s.num} style={{
            padding: '28px 24px',
            background: COLORS.surface,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(28px, 3vw, 38px)',
              fontWeight: 800, color: accent,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>{s.num}</div>
            <div style={{
              fontSize: 13, fontWeight: 700,
              color: COLORS.textBase, marginTop: 14,
              letterSpacing: '0.2px',
            }}>{s.label}</div>
            <div style={{
              fontSize: 12, color: COLORS.textMuted,
              marginTop: 4, lineHeight: 1.4,
            }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// ─── PHILOSOPHY (HOME) ─────────────────────────────
// The philosophical heart of the homepage. Single statement, centered, big.
// Full 5-principle breakdown lives in the dedicated Global Marketing page.
export const Philosophy = ({ py }) => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  return (
    <Section id="philosophy" py={py}>
      <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <SectionLabel>Our Philosophy</SectionLabel>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(32px, 5.2vw, 56px)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: COLORS.textBase,
          margin: '0 auto 36px',
          textWrap: 'balance',
        }}>
          추측하지 않고,<br/>
          <span style={{ color: accent }}>데이터로 검증합니다.</span>
        </h2>
        <p style={{
          fontSize: 'clamp(16px, 1.6vw, 20px)',
          lineHeight: 1.75,
          color: COLORS.textMutedBright,
          margin: '0 auto',
          maxWidth: 720,
          textWrap: 'pretty',
        }}>
          모든 마케팅 결정은 데이터로 검증 가능해야 합니다.
          WIBE는 가설을 작게 실험하고, 데이터로 확인된 방향으로만 확장합니다.
          큰 비용으로 한 번에 도박하지 않고, 증명된 다음 단계로만 나아갑니다.
        </p>
      </div>
    </Section>
  );
};

// ─── SERVICES PREVIEW (HOME) ───────────────────────
// Three high-level service buckets, each linking out to its dedicated page.
// Keeps the homepage minimal — detailed service breakdowns live on /services
// and /global rather than being inlined here.
export const ServicesPreview = ({ py }) => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;

  const services = [
    {
      eyebrow: 'Domestic',
      title: '국내 마케팅',
      desc: '한국 시장 광고 운영부터 메시지 설계, 성과 분석까지. 데이터 기반 캠페인 설계와 운영을 함께합니다.',
      href: '/services',
    },
    {
      eyebrow: 'Global',
      title: '글로벌 마케팅',
      desc: '일본을 시작으로 태국·미국 등 한국 브랜드의 해외 진출. 현지화·광고 운영·시장 확장 전 과정.',
      href: '/global',
    },
    {
      eyebrow: 'Integrated',
      title: '통합 캠페인',
      desc: '국내와 해외를 아우르는 통합 마케팅 전략. 일관된 브랜드 메시지를 시장별로 최적화해 실행합니다.',
      href: '/services',
    },
  ];

  return (
    <Section id="services-preview" py={py}>
      <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionLabel>WIBE Services</SectionLabel>
        <SectionHeading>한국 브랜드의 마케팅,<br/>국내부터 글로벌까지</SectionHeading>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {services.map((s) => (
          <a
            key={s.title}
            href={s.href}
            style={{
              display: 'block',
              padding: 32,
              background: COLORS.surface,
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'background 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              textDecoration: 'none',
              color: 'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.elevated;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.surface;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '2px',
              color: accent, textTransform: 'uppercase', marginBottom: 16,
            }}>{s.eyebrow}</div>
            <div style={{
              fontFamily: 'var(--font-title)',
              fontSize: 22, fontWeight: 700,
              color: COLORS.textBase,
              marginBottom: 12,
              letterSpacing: '-0.01em',
            }}>{s.title}</div>
            <div style={{
              fontSize: 14, color: COLORS.textMuted, lineHeight: 1.65,
            }}>{s.desc}</div>
            <div style={{
              marginTop: 24, fontSize: 13, color: accent, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              자세히 보기
              <span style={{ display: 'inline-block', transition: 'transform 200ms' }}>→</span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

// ─── MARKET BACKGROUND ─────────────────────────────
export const MarketBackground = () => {
  const points = [
    { num: '01', title: '내수 시장의 성장 한계', desc: '제한된 인구와 포화된 카테고리' },
    { num: '02', title: '소비 위축과 경쟁 심화', desc: '같은 고객을 두고 더 치열해지는 경쟁' },
    { num: '03', title: '광고비 상승과 효율 저하', desc: '오르는 단가, 떨어지는 ROAS' },
    { num: '04', title: 'K-브랜드에 대한 글로벌 관심', desc: '해외에서 높아지는 한국 제품 수요' },
    { num: '05', title: '새로운 매출 채널 확보 필요', desc: '하나의 시장에 의존하지 않는 구조' },
  ];
  return (
    <Section id="why-overseas">
      <SectionLabel>Market Background</SectionLabel>
      <SectionHeading>왜 지금, 해외 진출이 필요한가</SectionHeading>
      <Lead>
        한국의 내수 시장은 점점 더 치열해지고 있습니다.
        제한된 인구 규모, 소비 위축, 광고 경쟁 심화 속에서
        많은 기업들이 기존 방식만으로는 안정적인 성장을 만들기 어려워지고 있습니다.
      </Lead>
      <Lead>
        하지만 해외에서는 한국 문화와 한국 제품에 대한 관심이 계속 높아지고 있습니다.
        이제 국내 시장 안에서만 경쟁하기보다,
        더 넓은 시장에서 새로운 고객을 만날 준비가 필요합니다.
      </Lead>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginTop: 56,
      }}>
        {points.map((p) => (
          <Card key={p.num} hover padding={24} style={{ minHeight: 160 }}>
            <div style={{ fontFamily: 'var(--font-title)', fontSize: 32, fontWeight: 800, color: COLORS.textSubdued, marginBottom: 16, letterSpacing: '-0.02em' }}>{p.num}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.textBase, marginBottom: 8, lineHeight: 1.35 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.55 }}>{p.desc}</div>
          </Card>
        ))}
      </div>

      <Highlight>
        해외 진출은 더 이상 먼 미래의 선택지가 아니라,<br/>
        <span style={{ color: COLORS.green }}>지금의 한계를 넘어설 수 있는 현실적인 성장 전략</span>입니다.
      </Highlight>
    </Section>
  );
};

// ─── WHY JAPAN ─────────────────────────────────────
export const WhyJapan = () => {
  const reasons = [
    { icon: '01', title: '지리적 근접성', desc: '한국과 가까운 거리와 빠른 물류 접근성' },
    { icon: '02', title: 'K-콘텐츠 친숙도', desc: 'K-콘텐츠와 한국 제품에 대한 높은 관심' },
    { icon: '03', title: '구매력 있는 시장', desc: '안정적인 소비 여력과 성숙한 온라인 시장' },
    { icon: '04', title: '광고 반응 테스트', desc: '온라인 광고로 빠르게 수요 검증 가능' },
    { icon: '05', title: '글로벌 진출 거점', desc: '태국·미국 확장을 위한 첫 번째 발판' },
  ];
  return (
    <Section id="why-japan" bg="alt">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 56, alignItems: 'start' }} className="two-col">
        <div>
          <SectionLabel>Why Japan</SectionLabel>
          <SectionHeading>첫 해외 시장,<br/>일본에서 시작해야 하는 이유</SectionHeading>
          <Lead>
            일본은 한국 기업이 해외 진출을 시작하기에 가장 현실적인 시장 중 하나입니다.
            지리적으로 가깝고, 한국 문화와 제품에 대한 친숙도가 높으며,
            구매력 있는 소비자층이 형성되어 있습니다.
          </Lead>
          <Lead>
            또한 시장 반응을 비교적 빠르게 확인하고,
            그 결과를 바탕으로 다음 국가 확장 전략까지 설계할 수 있습니다.
          </Lead>
          <Highlight>
            일본은 단순한 수출 대상이 아니라,<br/>
            <span style={{ color: COLORS.green }}>한국 기업의 글로벌 확장을 시작할 수 있는 첫 번째 거점</span>입니다.
          </Highlight>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reasons.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 20,
              padding: '20px 22px',
              background: COLORS.surface,
              borderRadius: 12,
              transition: 'background 200ms',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = COLORS.elevated}
            onMouseLeave={(e) => e.currentTarget.style.background = COLORS.surface}>
              <div style={{
                fontFamily: 'var(--font-title)',
                fontSize: 14, fontWeight: 800, color: COLORS.green,
                letterSpacing: '1px', minWidth: 24,
                paddingTop: 4,
              }}>{r.icon}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.textBase, marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.55 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Section>
  );
};

// ─── SERVICES ──────────────────────────────────────
export const Services = () => {
  const services = [
    {
      num: '01',
      title: '해외진출 마케팅 컨설팅',
      lead: '제품과 서비스의 특성을 바탕으로 일본 시장 진입 방향과 타깃 전략을 설계합니다.',
      items: ['시장 진입 방향 설계', '타깃 고객 및 포지셔닝 점검', '제품/서비스별 진출 전략 제안'],
    },
    {
      num: '02',
      title: '일본 온라인 광고 운영 지원',
      lead: '일본 현지 광고대행사와 협업하여 광고 세팅, 운영 방향, 실행 관리를 지원합니다.',
      items: ['광고 전략 수립', '매체 운영 방향 설계', '현지 광고대행사 협업', '광고 집행 및 운영 관리'],
    },
    {
      num: '03',
      title: '현지화 메시지 기획',
      lead: '단순 번역이 아니라 일본 소비자에게 맞는 광고 문안과 랜딩페이지 메시지를 기획합니다.',
      items: ['일본어 광고 문안 방향 제안', '현지 소비자 관점의 메시지 조정', '랜딩페이지 카피 및 구조 기획', '한·일 파트너 간 커뮤니케이션 지원'],
    },
    {
      num: '04',
      title: '랜딩페이지 / 홈페이지 제작 지원',
      lead: '해외 고객이 이해하고 문의할 수 있는 전환 중심의 웹페이지 구조를 설계합니다.',
      items: ['일본 진출용 소개 페이지 제작', '캠페인용 랜딩페이지 제작', '문의·전환 중심 UX 설계', '광고 성과 측정을 고려한 구조'],
    },
    {
      num: '05',
      title: '성과 분석 및 확장 전략',
      lead: '광고 결과와 시장 반응을 분석하고 다음 국가 또는 다음 캠페인 전략을 제안합니다.',
      items: ['광고 성과 리포트', '시장 반응 분석', '추가 예산 집행 여부 검토', '태국·미국 등 후속 국가 확장 검토'],
    },
  ];

  const [expanded, setExpanded] = useState(0);

  return (
    <Section id="service">
      <SectionLabel>Our Service</SectionLabel>
      <SectionHeading>해외 진출에 필요한<br/>온라인 마케팅 실행을 함께합니다</SectionHeading>
      <Lead>
        우리는 단순히 광고만 대신 집행하지 않습니다.
        해외 시장에 맞는 메시지 설계부터 광고 실행, 현지 파트너 커뮤니케이션,
        성과 분석과 다음 단계 제안까지 함께합니다.
      </Lead>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 48 }}>
        {services.map((s, i) => {
          const isOpen = expanded === i;
          return (
            <div key={s.num}
              onClick={() => setExpanded(isOpen ? -1 : i)}
              style={{
                background: isOpen ? COLORS.elevated : COLORS.surface,
                borderRadius: 12,
                padding: '24px 28px',
                cursor: 'pointer',
                transition: 'background 200ms',
                border: isOpen ? `1px solid rgba(29, 140, 198, 0.3)` : '1px solid transparent',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{
                  fontFamily: 'var(--font-title)', fontSize: 18, fontWeight: 800,
                  color: isOpen ? COLORS.green : COLORS.textSubdued,
                  letterSpacing: '1px', minWidth: 36,
                }}>{s.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: COLORS.textBase, lineHeight: 1.3 }}>{s.title}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: isOpen ? COLORS.green : 'rgba(255,255,255,0.06)',
                  color: isOpen ? '#000' : COLORS.textBase,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 200ms',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
              </div>

              {isOpen && (
                <div style={{
                  marginTop: 20, paddingTop: 20, paddingLeft: 60,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 32,
                }} className="service-grid">
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textMutedBright, margin: 0 }}>{s.lead}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {s.items.map((it, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: COLORS.textBase }}>
                        <span style={{ color: COLORS.green, marginTop: 2, flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 700px) {
          .service-grid { grid-template-columns: 1fr !important; padding-left: 0 !important; }
        }
      `}</style>
    </Section>
  );
};

// ─── PROCESS ───────────────────────────────────────
export const Process = () => {
  const steps = [
    { num: '01', title: '상담 및 현황 파악', desc: '기업의 제품, 서비스, 현재 판매 상황, 목표 시장과 예산을 확인합니다.' },
    { num: '02', title: '진출 방향 설계', desc: '일본 시장에서 어떤 타깃에게, 어떤 메시지로 접근할지 전략 방향을 정리합니다.' },
    { num: '03', title: '메시지 및 랜딩 구조 기획', desc: '일본 소비자가 이해하고 반응할 수 있도록 광고 문안, 랜딩페이지, 문의 흐름을 설계합니다.' },
    { num: '04', title: '광고 세팅 및 실행', desc: '일본 현지 광고 파트너와 협업하여 광고 세팅과 운영을 진행합니다. 필요시 직접 지원도 함께합니다.' },
    { num: '05', title: '성과 분석 및 확장 제안', desc: '광고 성과와 시장 반응을 분석하고, 일본 내 추가 집행 또는 다른 국가 확장 가능성을 검토합니다.' },
  ];
  return (
    <Section id="process" bg="alt">
      <SectionLabel>Process</SectionLabel>
      <SectionHeading>상담부터 광고 실행, 다음 확장까지<br/>단계적으로 진행합니다</SectionHeading>
      <Lead>
        처음부터 큰 비용을 들여 무리하게 진출하기보다,
        현재 상황과 목표에 맞춰 시장 반응을 확인하고
        성과를 바탕으로 다음 단계를 설계합니다.
      </Lead>

      <div style={{
        position: 'relative',
        marginTop: 56,
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>
        {steps.map((s, i) => (
          <div key={s.num} style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: 32,
            padding: '32px 0',
            borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
            alignItems: 'flex-start',
          }} className="process-row">
            <div style={{ position: 'relative' }}>
              <div style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 800,
                color: COLORS.green,
                lineHeight: 1, letterSpacing: '-0.04em',
              }}>{s.num}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: COLORS.textSubdued, marginTop: 6, textTransform: 'uppercase' }}>STEP</div>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 700, lineHeight: 1.3,
                color: COLORS.textBase,
                margin: '0 0 12px 0',
              }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, margin: 0, maxWidth: 640 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Highlight>
        무작정 해외로 나가는 것이 아니라,<br/>
        <span style={{ color: COLORS.green }}>반응을 확인하고 확장하는 방식으로 리스크를 줄입니다.</span>
      </Highlight>
      <style>{`
        @media (max-width: 700px) {
          .process-row { grid-template-columns: 80px 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </Section>
  );
};

// ─── WHY US ────────────────────────────────────────
export const WhyUs = () => {
  const cards = [
    { title: '한국 기업의 현실을 이해합니다', desc: '국내 시장에서 마케팅을 진행하는 기업들이 겪는 예산, 속도, 실행 부담을 이해합니다.' },
    { title: '일본 시장 경험을 보유하고 있습니다', desc: '일본 생활 경험과 일본 Google 근무 경험을 바탕으로 일본 시장과 광고 커뮤니케이션을 이해합니다.' },
    { title: '현지 파트너와 협업합니다', desc: '일본 현지 광고대행사와 협업하여 실제 광고 실행과 운영을 현지 기준에 맞춰 진행합니다.' },
    { title: '전략과 실행을 연결합니다', desc: '광고, 랜딩페이지, 메시지, 리포트, 다음 확장 전략까지 하나의 흐름으로 연결합니다.' },
  ];
  const labels = ['KR', 'JP', '↔', '∞'];

  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  return (
    <Section id="why-us">
      <SectionLabel>Why Us</SectionLabel>
      <SectionHeading>한국 기업과 일본 현지 실행 사이의<br/>간극을 줄입니다</SectionHeading>
      <Lead>
        한국 기업이 일본 시장에 진출할 때 가장 어려운 부분은
        단순히 광고를 집행하는 것이 아닙니다.
      </Lead>
      <Lead>
        시장 이해, 언어, 현지 파트너와의 소통, 광고 메시지의 미묘한 차이,
        실행 과정의 관리까지 여러 요소가 함께 맞물려야 합니다.
        우리는 한국 기업의 상황을 이해하면서도 일본 시장과 현지 실행 구조를 이해하는
        <strong style={{ color: COLORS.textBase }}> 브릿지형 해외진출 마케팅 파트너</strong>입니다.
      </Lead>

      {t.showBridge !== false && (
        <div style={{
          marginTop: 48, marginBottom: 48,
          padding: '32px 24px',
          background: `linear-gradient(90deg, rgba(64,196,216,0.06), ${accent}10, rgba(45,100,145,0.06))`,
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          alignItems: 'center', gap: 16,
        }} className="bridge">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: COLORS.textSubdued, marginBottom: 8 }}>한국 기업</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textBase }}>제품 · 예산 · 속도</div>
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))', minWidth: 40 }} className="bridge-line"/>
          <div style={{
            textAlign: 'center', padding: '20px 16px',
            background: COLORS.elevated, borderRadius: 12,
            border: `1px solid ${accent}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: accent, marginBottom: 8 }}>OUR ROLE</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.textBase, lineHeight: 1.4 }}>전략 · 커뮤니케이션 · 실행 관리</div>
          </div>
          <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)', minWidth: 40 }} className="bridge-line"/>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: COLORS.textSubdued, marginBottom: 8 }}>일본 현지 파트너</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textBase }}>광고 운영 · 시장 · 언어</div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
      }}>
        {cards.map((c, i) => (
          <Card key={i} hover padding={28}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'rgba(29, 140, 198, 0.10)',
              border: `1px solid rgba(29, 140, 198, 0.3)`,
              color: COLORS.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 15, letterSpacing: '0.5px',
              marginBottom: 20,
            }}>{labels[i]}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.textBase, marginBottom: 10, lineHeight: 1.35 }}>{c.title}</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>{c.desc}</div>
          </Card>
        ))}
      </div>

      <Highlight>
        국내 대행사와 현지 대행사 사이에서 놓치기 쉬운 부분을 연결하는 것,<br/>
        <span style={{ color: COLORS.green }}>그것이 우리의 역할입니다.</span>
      </Highlight>
      <style>{`
        @media (max-width: 800px) {
          .bridge { grid-template-columns: 1fr !important; }
          .bridge-line { display: none !important; }
        }
      `}</style>
    </Section>
  );
};

// ─── GLOBAL EXPANSION ──────────────────────────────
export const GlobalExpansion = () => {
  const flow = [
    { label: '일본 시장 테스트', sub: 'JAPAN — STEP 1' },
    { label: '광고 반응 및 고객 데이터 확인', sub: 'DATA' },
    { label: '메시지와 제품 포지셔닝 개선', sub: 'OPTIMIZE' },
    { label: '태국 / 미국 / 기타 국가 확장 검토', sub: 'EXPAND' },
    { label: '국가별 맞춤 마케팅 실행', sub: 'GO LIVE' },
  ];
  return (
    <Section id="global" bg="alt">
      <SectionLabel>Global Expansion</SectionLabel>
      <SectionHeading>일본에서 시작해,<br/>더 넓은 시장으로 확장합니다</SectionHeading>
      <Lead>
        이 프로젝트의 시작은 일본 시장이지만, 목표는 일본 한 나라에 머무는 것이 아닙니다.
        일본에서 확인한 시장 반응과 광고 데이터를 바탕으로
        태국, 미국 등 다른 국가로 확장할 수 있는 가능성을 함께 검토합니다.
      </Lead>
      <Lead>
        제품과 업종에 따라 국가별 접근 방식은 달라져야 합니다.
        우리는 각 시장의 특성에 맞춰 단계적인 확장 방향을 제안합니다.
      </Lead>

      <div style={{
        marginTop: 56,
        background: COLORS.surface,
        borderRadius: 16,
        padding: 'clamp(24px, 4vw, 48px)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {flow.map((f, i) => (
            <Fragment key={i}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 24,
                padding: '20px 24px',
                background: i === 0 ? 'rgba(29,140,198,0.08)' : 'rgba(255,255,255,0.02)',
                border: i === 0 ? `1px solid ${COLORS.green}` : '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: i === 0 ? COLORS.green : 'rgba(255,255,255,0.04)',
                  color: i === 0 ? '#000' : COLORS.textBase,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14, flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', fontWeight: 700, color: COLORS.textBase, marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: i === 0 ? COLORS.green : COLORS.textSubdued }}>{f.sub}</div>
                </div>
              </div>
              {i < flow.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <line x1="8" y1="0" x2="8" y2="14" stroke={COLORS.textSubdued} strokeWidth="1.5"/>
                    <polyline points="3,11 8,16 13,11" stroke={COLORS.textSubdued} strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <Highlight>
        일본 진출은 끝이 아니라,<br/>
        <span style={{ color: COLORS.green }}>글로벌 시장으로 나아가기 위한 첫 번째 실행</span>입니다.
      </Highlight>
    </Section>
  );
};

// ─── CONTACT ───────────────────────────────────────
const Field = ({ label, children }) => (
  <label style={{ display: 'block' }}>
    <span style={{
      display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
      color: COLORS.textMuted, textTransform: 'uppercase', marginBottom: 8,
    }}>{label}</span>
    {children}
  </label>
);

export const Contact = ({ py }) => {
  const [form, setForm] = useState({
    company: '', name: '', phone: '', email: '', country: '일본', product: '', message: '',
    consent: false,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const onChangeChecked = (k) => (e) => setForm({ ...form, [k]: e.target.checked });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      setStatus('error');
      setErrorMsg('개인정보 수집·이용에 동의해주세요.');
      return;
    }

    // Google Ads conversion — fired on submit click (after HTML5 validation
    // passes and consent is given) so the count reflects real submission
    // attempts even if the server call later fails. Independent of the
    // backend, so it stays robust under network issues. User explicitly
    // wanted "click-time" tracking; the small over-count is acceptable
    // as audience-optimization signal.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-18157092617/S6huCMHUvKscEIn-_NFD',
        value: 1.0,
        currency: 'KRW',
      });
    }

    setStatus('sending');
    setErrorMsg('');

    // Generate a shared event id so the Pixel (browser) and CAPI (server)
    // events for this submission can be deduplicated by Meta.
    const eventId =
      (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, event_id: eventId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `요청 실패 (${res.status})`);
      }

      // Fire client-side Meta Lead event with the same event_id so it
      // dedupes with the CAPI-side Lead the server is sending in parallel.
      // Stays on the success branch (not the click branch) because the
      // server-side CAPI also only fires on success — moving Pixel earlier
      // would break dedup.
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {}, { eventID: eventId });
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || '전송 중 오류가 발생했습니다.');
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    color: COLORS.textBase,
    border: 0,
    borderRadius: 6,
    padding: '14px 16px',
    fontSize: 14,
    fontFamily: 'inherit',
    boxShadow: 'rgb(18,18,18) 0px 1px 0px, rgb(124,124,124) 0px 0px 0px 1px inset',
    outline: 'none',
    transition: 'box-shadow 150ms',
  };

  return (
    <Section id="contact" py={py}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 56, alignItems: 'start' }} className="two-col">
        <div>
          <SectionLabel accent>Contact</SectionLabel>
          <SectionHeading>해외 진출, 어디서부터<br/>시작해야 할지 고민이라면</SectionHeading>
          <Lead>
            국내 시장만으로 성장의 한계를 느끼고 있다면,
            이제 일본을 시작으로 새로운 기회를 만들어볼 수 있습니다.
          </Lead>
          <Lead>
            현재 제품과 서비스가 일본 시장에 적합한지,
            어떤 방식으로 광고를 시작해야 하는지,
            어느 정도의 예산으로 테스트할 수 있는지 함께 검토해드립니다.
          </Lead>

          <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{
              fontFamily: 'var(--font-title)', fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 700, lineHeight: 1.5, color: COLORS.textBase, margin: 0,
            }}>
              작게 테스트하고, 빠르게 확인하고,<br/>
              <span style={{ color: COLORS.green }}>가능성이 보이면 더 넓은 시장으로 확장하세요.</span>
            </p>
          </div>
        </div>

        <Card padding={36}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: COLORS.green,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: 22, fontWeight: 700, marginBottom: 8, color: COLORS.textBase }}>문의가 접수되었습니다</h3>
              <p style={{ fontSize: 14, color: COLORS.textMuted, margin: 0 }}>영업일 기준 2일 이내 회신드리겠습니다.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Field label="회사명"><input style={inputStyle} value={form.company} onChange={onChange('company')} placeholder="(주)예시" required/></Field>
                <Field label="담당자명"><input style={inputStyle} value={form.name} onChange={onChange('name')} placeholder="홍길동" required/></Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <Field label="연락처"><input style={inputStyle} value={form.phone} onChange={onChange('phone')} placeholder="010-0000-0000"/></Field>
                <Field label="이메일"><input type="email" style={inputStyle} value={form.email} onChange={onChange('email')} placeholder="you@company.com" required/></Field>
              </div>
              <Field label="진출 희망 국가">
                <select style={{ ...inputStyle, appearance: 'none', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1l5 5 5-5' stroke='%23b3b3b3' stroke-width='1.5'/></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }} value={form.country} onChange={onChange('country')}>
                  <option style={{ background: COLORS.elevated }}>일본</option>
                  <option style={{ background: COLORS.elevated }}>일본 + 태국</option>
                  <option style={{ background: COLORS.elevated }}>일본 + 미국</option>
                  <option style={{ background: COLORS.elevated }}>아직 검토 중</option>
                </select>
              </Field>
              <div style={{ height: 12 }}/>
              <Field label="제품/서비스 소개">
                <textarea rows="3" style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} value={form.product} onChange={onChange('product')} placeholder="간단한 제품 또는 서비스 소개를 적어주세요"/>
              </Field>
              <div style={{ height: 12 }}/>
              <Field label="현재 고민 또는 요청사항">
                <textarea rows="4" style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} value={form.message} onChange={onChange('message')} placeholder="해외 진출에 관한 현재 상황과 궁금한 점을 적어주세요"/>
              </Field>

              <label style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                marginTop: 20, padding: '12px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={onChangeChecked('consent')}
                  style={{
                    marginTop: 3, width: 16, height: 16, flexShrink: 0,
                    accentColor: COLORS.green, cursor: 'pointer',
                  }}
                />
                <span style={{ fontSize: 13, lineHeight: 1.55, color: COLORS.textMutedBright }}>
                  <b style={{ color: COLORS.textBase }}>(필수)</b> 개인정보 수집·이용에 동의합니다.
                  {' '}
                  <a href="/privacy/" target="_blank" rel="noopener noreferrer" style={{
                    color: COLORS.green, textDecoration: 'underline', textUnderlineOffset: 2,
                  }}>자세히 보기</a>
                </span>
              </label>

              {status === 'error' && (
                <div style={{
                  marginTop: 16, padding: '12px 14px', borderRadius: 8,
                  background: 'rgba(243, 114, 127, 0.08)',
                  border: '1px solid rgba(243, 114, 127, 0.4)',
                  color: '#f3727f', fontSize: 13,
                }}>{errorMsg}</div>
              )}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
                <button type="submit" disabled={status === 'sending' || !form.consent} style={{
                  background: COLORS.green, color: '#000', border: 0,
                  padding: '14px 32px', borderRadius: 9999,
                  fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.4px',
                  cursor: (status === 'sending' || !form.consent) ? 'not-allowed' : 'pointer',
                  flex: '1 1 auto',
                  opacity: (status === 'sending' || !form.consent) ? 0.5 : 1,
                  transition: 'transform 150ms, opacity 150ms',
                }}
                onMouseEnter={(e) => { if (status !== 'sending' && form.consent) e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >{status === 'sending' ? '전송 중...' : '상담 문의하기'}</button>
              </div>
            </form>
          )}
        </Card>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </Section>
  );
};

// ─── PAGE HERO (sub-pages) ────────────────────────
// Short hero banner used at the top of /about, /services, /global, /contact.
// Smaller than the home Hero — just sets the topic and primes the page.
export const PageHero = ({ eyebrow, title, sub }) => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;
  return (
    <section style={{
      paddingTop: 'clamp(120px, 18vh, 200px)',
      paddingBottom: 'clamp(56px, 10vh, 100px)',
      paddingLeft: 'clamp(20px, 5vw, 64px)',
      paddingRight: 'clamp(20px, 5vw, 64px)',
      background: `
        radial-gradient(circle at 25% 35%, ${accent}1a, transparent 55%),
        radial-gradient(circle at 80% 60%, rgba(64,196,216,0.10), transparent 55%),
        linear-gradient(180deg, #1a1a1a 0%, #121212 80%)
      `,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        position: 'relative', zIndex: 2,
      }}>
        {eyebrow && <SectionLabel accent>{eyebrow}</SectionLabel>}
        <h1 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(34px, 5.5vw, 60px)',
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          color: COLORS.textBase,
          margin: '0 0 20px 0',
          textWrap: 'balance',
          maxWidth: 880,
        }}>{title}</h1>
        {sub && (
          <p style={{
            fontSize: 'clamp(15px, 1.5vw, 19px)',
            lineHeight: 1.7,
            color: COLORS.textMutedBright,
            margin: 0,
            maxWidth: 700,
            textWrap: 'pretty',
          }}>{sub}</p>
        )}
      </div>
    </section>
  );
};

// ─── PAGE CTA (sub-pages) ─────────────────────────
// Closing CTA for sub-pages, links to /contact/.
export const PageCTA = ({ heading, sub }) => (
  <Section bg="alt">
    <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
      <SectionHeading>{heading || '더 자세히 알고 싶으시면'}</SectionHeading>
      {sub && <Lead>{sub}</Lead>}
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <PrimaryButton href="/contact/" size="lg">상담 문의하기</PrimaryButton>
        <SecondaryButton href="/services/" size="lg">서비스 보기</SecondaryButton>
      </div>
    </div>
  </Section>
);

// ─── GLOBAL PHILOSOPHY (5 principles for /global) ─────────
// Full 5-principle breakdown of how WIBE approaches global expansion.
// Lives on /global because the user specifically asked the long-form
// philosophy to be there, with the homepage staying minimal.
export const GlobalPhilosophy = () => {
  const t = useTweak();
  const accent = t.accentColor || COLORS.green;

  const principles = [
    {
      num: '01',
      title: '추측하지 않습니다, 경험합니다',
      desc: '한국에서 일본 시장을 분석하지 않고, 일본 현지의 경험을 통해 접근합니다. 데이터로 보이지 않는 현지의 맥락은 직접 경험에서 옵니다.',
    },
    {
      num: '02',
      title: '작게 시작하고, 확인하고, 확장합니다',
      desc: '처음부터 큰 비용으로 도박하지 않습니다. 시장 반응을 측정하고, 데이터로 검증된 단계에서만 다음 단계로 진행합니다.',
    },
    {
      num: '03',
      title: '번역이 아니라 현지화입니다',
      desc: '같은 메시지를 다른 언어로 옮기는 것이 번역이라면, 현지 소비자에게 통하는 새 메시지를 만드는 것이 현지화입니다. 우리는 현지화를 합니다.',
    },
    {
      num: '04',
      title: '전략과 실행을 분리하지 않습니다',
      desc: '실행 없는 전략은 보고서고, 전략 없는 실행은 광고비 낭비입니다. 설계부터 운영, 분석까지 한 흐름으로 함께합니다.',
    },
    {
      num: '05',
      title: '일본에서 멈추지 않습니다',
      desc: '일본은 첫 번째 시장이지 마지막 시장이 아닙니다. 일본에서 검증한 방법론을 다음 시장(태국·미국·기타)으로 확장합니다.',
    },
  ];

  return (
    <Section id="global-philosophy">
      <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionLabel>Our Approach</SectionLabel>
        <SectionHeading>해외 진출, WIBE의 다섯 가지 원칙</SectionHeading>
        <Lead>
          WIBE는 한국 브랜드의 해외 진출을 다음 다섯 가지 원칙으로 함께합니다.
          모든 결정은 추측이 아닌 데이터와 현지 경험에서 출발합니다.
        </Lead>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {principles.map((p) => (
          <Card key={p.num} hover padding={28}>
            <div style={{
              fontFamily: 'var(--font-title)',
              fontSize: 32, fontWeight: 800,
              color: accent,
              letterSpacing: '-0.02em',
              marginBottom: 16,
              lineHeight: 1,
            }}>{p.num}</div>
            <div style={{
              fontSize: 17, fontWeight: 700,
              color: COLORS.textBase,
              marginBottom: 10,
              lineHeight: 1.35,
            }}>{p.title}</div>
            <div style={{
              fontSize: 14, color: COLORS.textMuted,
              lineHeight: 1.65,
            }}>{p.desc}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

// ─── FOOTER ────────────────────────────────────────
export const Footer = () => (
  <footer style={{
    background: '#000',
    padding: '64px clamp(20px, 5vw, 64px) 48px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <BrandMark size={32}/>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>
          WIBE
        </div>
      </div>
      <p style={{
        fontFamily: 'var(--font-title)', fontSize: 'clamp(22px, 2.4vw, 32px)',
        fontWeight: 700, lineHeight: 1.3, color: COLORS.textBase,
        margin: '0 0 12px 0', letterSpacing: '-0.02em',
      }}>
        Korean Brands, Beyond Korea.
      </p>
      <p style={{ fontSize: 15, color: COLORS.textMuted, margin: '0 0 48px 0' }}>
        일본을 시작으로 한국 기업의 글로벌 확장을 함께합니다.
      </p>
      <div style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)',
        fontSize: 12, color: COLORS.textSubdued,
      }}>
        <div>© 2026 WIBE. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#contact" style={{ color: COLORS.textMuted }}>문의하기</a>
          <a href="#service" style={{ color: COLORS.textMuted }}>서비스</a>
          <a href="#process" style={{ color: COLORS.textMuted }}>진행방식</a>
          <a href="/privacy/" style={{ color: COLORS.textBase, fontWeight: 600 }}>개인정보 처리방침</a>
        </div>
      </div>
    </div>
  </footer>
);
