import Layout from './Layout.jsx';
import {
  Hero, Philosophy, About, ServicesPreview, Contact,
} from './sections.jsx';

export default function App() {
  return (
    <Layout>
      <Hero/>
      <Philosophy/>
      <About/>
      <ServicesPreview/>
      <Contact/>
    </Layout>
  );
}
