import { useEffect } from 'react';
import { TweakContext, COLORS, BrandMark } from './components.jsx';

const DEFAULTS = {
  accentColor: '#1d8cc6',
  brandName: 'WIBE',
  _tone: { base: '#121212', alt: '#0e0e0e', surface: '#181818', text: '#ffffff' },
};

const Section = ({ title, children }) => (
  <section style={{ marginTop: 40 }}>
    <h2 style={{
      fontFamily: 'var(--font-title)',
      fontSize: 'clamp(18px, 2vw, 22px)',
      fontWeight: 700,
      color: COLORS.textBase,
      margin: '0 0 14px 0',
      letterSpacing: '-0.01em',
    }}>{title}</h2>
    <div style={{
      fontSize: 14, lineHeight: 1.75, color: COLORS.textMutedBright,
    }}>{children}</div>
  </section>
);

const P = ({ children }) => (
  <p style={{ margin: '0 0 12px 0' }}>{children}</p>
);

const OL = ({ children }) => (
  <ol style={{ margin: '0 0 12px 0', paddingLeft: 24 }}>{children}</ol>
);

function PrivacyPolicyBody() {
  useEffect(() => {
    document.title = '개인정보 처리방침 — WIBE';
    const root = document.documentElement;
    root.style.setProperty('--accent', DEFAULTS.accentColor);
    document.body.style.background = DEFAULTS._tone.base;
    document.body.style.color = DEFAULTS._tone.text;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: COLORS.base, minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '18px clamp(20px, 5vw, 64px)',
      }}>
        <div style={{
          maxWidth: 880, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <a href="/" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            color: COLORS.textBase, fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em',
          }}>
            <BrandMark size={26}/>
            <span>WIBE</span>
          </a>
          <a href="/" style={{
            fontSize: 13, color: COLORS.textMuted, fontWeight: 500,
          }}>← 홈으로</a>
        </div>
      </header>

      {/* Body */}
      <main style={{
        maxWidth: 880, margin: '0 auto',
        padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 64px)',
      }}>
        <div style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '2px',
          color: COLORS.green, textTransform: 'uppercase', marginBottom: 16,
        }}>Privacy Policy</div>
        <h1 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 800, lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: COLORS.textBase,
          margin: '0 0 20px 0',
        }}>개인정보 처리방침</h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textMuted, margin: 0 }}>
          WIBE(이하 "회사")는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
          이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
          개인정보 처리방침을 수립·공개합니다.
        </p>

        <Section title="제1조 (개인정보의 처리 목적)">
          <P>회사는 다음의 목적을 위하여 개인정보를 처리하며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다.</P>
          <OL>
            <li>상담 문의 접수 및 회신</li>
            <li>해외진출 마케팅 컨설팅 서비스 제공을 위한 사전 검토</li>
            <li>서비스 안내 및 견적 제공</li>
          </OL>
        </Section>

        <Section title="제2조 (수집하는 개인정보 항목)">
          <P>회사는 문의하기 양식을 통해 다음과 같이 개인정보를 수집합니다.</P>
          <OL>
            <li><b style={{ color: COLORS.textBase }}>필수 항목</b>: 회사명, 담당자명, 이메일, 진출 희망 국가</li>
            <li><b style={{ color: COLORS.textBase }}>선택 항목</b>: 연락처(전화번호), 제품/서비스 소개, 요청사항</li>
            <li><b style={{ color: COLORS.textBase }}>자동 수집 항목</b>: 접수 일시 (IP 주소·접속 로그는 별도 저장하지 않음)</li>
          </OL>
        </Section>

        <Section title="제3조 (개인정보의 처리 및 보유 기간)">
          <P>회사는 정보주체의 개인정보를 <b style={{ color: COLORS.textBase }}>수집·이용 동의일로부터 1년간</b> 보유 및 이용합니다. 보유기간이 경과하거나 처리목적이 달성된 개인정보는 지체 없이 파기합니다.</P>
          <P>다만, 관계 법령에서 별도의 보존 기간을 규정한 경우에는 해당 기간 동안 보관합니다.</P>
        </Section>

        <Section title="제4조 (개인정보의 제3자 제공)">
          <P>회사는 정보주체의 개인정보를 제1조에서 명시한 목적의 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 제3자에게 제공합니다. 현재 회사는 제3자에게 개인정보를 제공하지 않습니다.</P>
        </Section>

        <Section title="제5조 (개인정보 처리의 위탁)">
          <P>회사는 원활한 서비스 제공 및 개인정보의 안정적 처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</P>
          <div style={{ overflowX: 'auto', margin: '8px 0 12px' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse', fontSize: 13,
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <thead>
                <tr style={{ background: COLORS.surface }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: COLORS.textBase, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>수탁업체</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: COLORS.textBase, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>위탁 업무</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: COLORS.textBase, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>보관 위치</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Cloudflare, Inc.</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>웹사이트 호스팅, 데이터베이스(D1) 저장</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>아시아·태평양(APAC) 리전</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 12px' }}>Resend, Inc.</td>
                  <td style={{ padding: '10px 12px' }}>이메일 알림 발송</td>
                  <td style={{ padding: '10px 12px' }}>도쿄(ap-northeast-1) 리전</td>
                </tr>
              </tbody>
            </table>
          </div>
          <P>위탁업체가 해외 사업자인 경우에도 정보주체의 개인정보는 「개인정보 보호법」에 따라 안전하게 처리됩니다. 위탁계약이 종료되거나 처리 목적이 달성되면 즉시 파기됩니다.</P>
        </Section>

        <Section title="제6조 (정보주체의 권리·의무 및 행사방법)">
          <P>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</P>
          <OL>
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </OL>
          <P>권리 행사는 제9조의 개인정보 보호책임자 연락처로 서면, 이메일 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체 없이 조치합니다.</P>
        </Section>

        <Section title="제7조 (개인정보의 파기)">
          <P>회사는 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 영구 삭제합니다.</P>
        </Section>

        <Section title="제8조 (개인정보의 안전성 확보 조치)">
          <P>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</P>
          <OL>
            <li>관리적 조치: 내부 관리 책임자 지정, 정기적 자체 점검</li>
            <li>기술적 조치: HTTPS 통신, 데이터베이스 접근 권한 관리, 환경변수 분리</li>
            <li>물리적 조치: 클라우드 데이터 저장소(Cloudflare)의 물리적 접근 통제</li>
          </OL>
        </Section>

        <Section title="제9조 (개인정보 보호책임자)">
          <P>회사는 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</P>
          <div style={{
            background: COLORS.surface,
            borderRadius: 8,
            padding: '14px 18px',
            marginTop: 8,
            fontSize: 14, lineHeight: 1.9,
          }}>
            <div><b style={{ color: COLORS.textBase }}>성명</b>: 전창현</div>
            <div><b style={{ color: COLORS.textBase }}>직책</b>: 대표</div>
            <div><b style={{ color: COLORS.textBase }}>이메일</b>: <a href="mailto:jay73hun@gmail.com" style={{ color: COLORS.green }}>jay73hun@gmail.com</a></div>
          </div>
        </Section>

        <Section title="제10조 (권익침해 구제방법)">
          <P>정보주체는 개인정보침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.</P>
          <OL>
            <li>개인정보분쟁조정위원회: 1833-6972 (<a href="https://www.kopico.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green }}>www.kopico.go.kr</a>)</li>
            <li>개인정보침해신고센터: 118 (<a href="https://privacy.kisa.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green }}>privacy.kisa.or.kr</a>)</li>
            <li>대검찰청: 1301 (<a href="https://www.spo.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green }}>www.spo.go.kr</a>)</li>
            <li>경찰청: 182 (<a href="https://cyberbureau.police.go.kr" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.green }}>cyberbureau.police.go.kr</a>)</li>
          </OL>
        </Section>

        <Section title="제11조 (개인정보 처리방침의 변경)">
          <P>이 개인정보 처리방침은 2026년 4월 28일부터 적용됩니다. 변경 내용이 있는 경우 변경 사항의 시행 7일 전부터 본 페이지를 통하여 고지합니다.</P>
        </Section>

        {/* Business info footer */}
        <div style={{
          marginTop: 56, paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontSize: 13, color: COLORS.textMuted, lineHeight: 1.8,
        }}>
          <div><b style={{ color: COLORS.textBase }}>상호</b>: WIBE</div>
          <div><b style={{ color: COLORS.textBase }}>대표자</b>: 전창현</div>
          <div><b style={{ color: COLORS.textBase }}>주소</b>: 경기 부천시 중동로161번길 40 4층</div>
          <div style={{ marginTop: 12, fontSize: 12, color: COLORS.textSubdued }}>
            시행일자: 2026년 4월 28일
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#000',
        padding: '40px clamp(20px, 5vw, 64px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: 880, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          fontSize: 12, color: COLORS.textSubdued,
        }}>
          <div>© 2026 WIBE. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="/" style={{ color: COLORS.textMuted }}>홈</a>
            <a href="/#contact" style={{ color: COLORS.textMuted }}>문의하기</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <TweakContext.Provider value={DEFAULTS}>
      <PrivacyPolicyBody/>
    </TweakContext.Provider>
  );
}
