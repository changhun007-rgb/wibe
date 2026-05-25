import Layout from './Layout.jsx';
import { PageHero, Contact } from './sections.jsx';

export default function ContactPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Contact"
        title="해외 진출, 어디서부터 시작해야 할지 고민이라면"
        sub="현재 제품과 서비스 상황, 목표 시장, 예산 등을 함께 짚어드립니다. 영업일 기준 2일 이내 회신드리겠습니다."
      />
      <Contact/>
    </Layout>
  );
}
