import Layout from './Layout.jsx';
import { PageHero, CommerceServices, CommerceProcess, PageCTA } from './sections.jsx';

// 커머스 대행 (service intro) page. Section 1: what we do (10-item grid).
// Section 2: how it works (6-step process). Content per the client's
// 서비스 소개 guide. Replaces the old overseas-marketing Services/Process.
export default function ServicesPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Commerce"
        title="제품만 있다면, 온라인 판매까지"
        sub="브랜드 방향성 정리부터 촬영·상세페이지·판매 채널·광고 콘텐츠까지, 온라인 판매에 필요한 실무를 하나의 흐름으로 함께 실행합니다."
      />
      <CommerceServices/>
      <CommerceProcess/>
      <PageCTA
        heading="제품만 준비해주세요"
        sub="브랜드 구축부터 온라인 판매 준비까지 WIBE가 함께합니다. 어떤 단계부터 시작할지 함께 검토해드려요."
      />
    </Layout>
  );
}
