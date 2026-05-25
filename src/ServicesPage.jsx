import Layout from './Layout.jsx';
import { PageHero, Services, Process, PageCTA } from './sections.jsx';

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Services"
        title="어떤 마케팅을 함께하나요"
        sub="WIBE가 제공하는 서비스 영역과, 실제로 어떻게 협업이 진행되는지 단계별로 소개합니다."
      />
      <Services/>
      <Process/>
      <PageCTA
        heading="우리 회사에 어떤 서비스가 맞을지 궁금하시면"
        sub="현재 상황과 목표에 맞춰 시작 단계를 함께 검토해드립니다."
      />
    </Layout>
  );
}
