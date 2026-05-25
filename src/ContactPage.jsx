import Layout from './Layout.jsx';
import { PageHero, Contact } from './sections.jsx';

export default function ContactPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Contact"
        title="함께 시작하시겠어요?"
        sub="간단한 회사·제품 정보와 현재 고민을 적어주시면, 영업일 기준 2일 이내 회신드리겠습니다."
      />
      <Contact py={80}/>
    </Layout>
  );
}
