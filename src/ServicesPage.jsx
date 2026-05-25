import Layout from './Layout.jsx';
import { PageHero, Services, Process, PageCTA } from './sections.jsx';

export default function ServicesPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Services"
        title="한국 브랜드의 마케팅, 국내부터 글로벌까지"
        sub="WIBE는 광고만 대신 집행하지 않습니다. 시장 분석과 메시지 설계부터 광고 운영, 현지 파트너 커뮤니케이션, 성과 측정과 다음 단계 제안까지 함께합니다."
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
