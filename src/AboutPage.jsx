import Layout from './Layout.jsx';
import { PageHero, About, WhyUs, PageCTA } from './sections.jsx';

export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="About"
        title="WIBE는 어떤 회사인가요"
        sub="한국 브랜드의 국내·해외 마케팅을 함께 설계하는 마케팅 파트너 — 어떤 사람들이, 어떤 방식으로 일하는지 소개합니다."
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
