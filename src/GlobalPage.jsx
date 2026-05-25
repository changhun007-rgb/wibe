import Layout from './Layout.jsx';
import {
  PageHero, GlobalPhilosophy, MarketBackground, WhyJapan, GlobalExpansion, PageCTA,
} from './sections.jsx';

export default function GlobalPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Global Marketing"
        title="일본을 시작으로, 더 넓은 시장으로"
        sub="WIBE는 한국 브랜드의 해외 진출을 단계적으로 함께합니다. 첫 시장으로 일본을 검증하고, 그 데이터를 바탕으로 태국·미국 등 다음 시장으로 확장하는 방식입니다."
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
