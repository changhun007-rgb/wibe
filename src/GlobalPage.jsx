import Layout from './Layout.jsx';
import {
  PageHero, GlobalPhilosophy, MarketBackground, WhyJapan, GlobalExpansion, Contact,
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
      <Contact variant="overseas" py={100}/>
    </Layout>
  );
}
