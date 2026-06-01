import Layout from './Layout.jsx';
import { PageHero, About, PageCTA } from './sections.jsx';

// Concise company-intro page. Gathers the company-focused content (intro + the
// 3 credibility stats) that used to sit on the home, now that the home leads
// with the commerce offering. Kept intentionally short.
export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="About"
        title="WIBE는 어떤 회사인가요"
        sub="제품을 브랜드로 만들고 온라인 판매까지 연결하는 커머스 대행사 — 어떤 사람들이, 어떤 방식으로 일하는지 소개합니다."
      />
      <About/>
      <PageCTA
        heading="제품만 있다면, 지금 시작할 수 있습니다"
        sub="제품의 강점 정리부터 온라인 판매 준비까지 어떻게 함께할 수 있을지 이야기 나눠요."
      />
    </Layout>
  );
}
