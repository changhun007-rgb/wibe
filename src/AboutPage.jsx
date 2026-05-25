import Layout from './Layout.jsx';
import { PageHero, About, WhyUs, PageCTA } from './sections.jsx';

export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="About"
        title="데이터와 현지 경험으로 마케팅을 설계합니다"
        sub="WIBE는 한국 브랜드의 국내·해외 마케팅을 함께 설계하는 마케팅 파트너입니다. Google Japan 캠페인 운영 경험과 일본 현지 거주 경험을 바탕으로, 시장 분석부터 광고 운영, 성과 측정까지 일관된 흐름으로 함께합니다."
      />
      <About/>
      <WhyUs/>
      <PageCTA
        heading="WIBE와 함께할 준비가 되셨다면"
        sub="작은 미팅부터 시작해 어떤 방식으로 함께할 수 있을지 이야기 나눠요."
      />
    </Layout>
  );
}
