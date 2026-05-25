import Layout from './Layout.jsx';
import {
  PageHero, GlobalPhilosophy, MarketBackground, WhyJapan, GlobalExpansion, PageCTA,
} from './sections.jsx';

export default function GlobalPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Global Marketing"
        title="한국 브랜드의 해외 진출 파트너"
        sub="WIBE의 해외 진출 방식과 우리가 따르는 다섯 가지 원칙, 그리고 첫 시장을 일본으로 시작하는 이유."
      />
      <GlobalPhilosophy/>
      <MarketBackground/>
      <WhyJapan/>
      <GlobalExpansion/>
      <PageCTA
        heading="우리 제품이 일본에 맞을지 함께 검토해드립니다"
        sub="제품·서비스의 일본 시장 적합도와 예상 진출 방향을 함께 짚어드려요."
      />
    </Layout>
  );
}
