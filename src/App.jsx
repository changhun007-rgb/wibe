import Layout from './Layout.jsx';
import {
  Hero, Philosophy, About, ServicesPreview, Contact,
} from './sections.jsx';

// Tighter, varied padding so the home reads as one continuous scroll rather
// than five evenly-spaced slides. Hero already has its own padding above;
// these py values control the vertical space owned by each following section.
export default function App() {
  return (
    <Layout>
      <Hero/>
      <Philosophy py={100}/>
      <About py={80}/>
      <ServicesPreview py={80}/>
      <Contact py={110}/>
    </Layout>
  );
}
