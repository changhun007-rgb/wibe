import Layout from './Layout.jsx';
import {
  Hero, Philosophy, About, ServicesPreview, Contact,
} from './sections.jsx';

// Sections receive different `py` so the home page has its own vertical
// rhythm rather than five evenly-spaced blocks. Philosophy is the manifesto
// moment — it gets the most room. ServicesPreview is tighter — it's a
// teaser, not a deep dive.
export default function App() {
  return (
    <Layout>
      <Hero/>
      <Philosophy py={160}/>
      <About py={100}/>
      <ServicesPreview py={100}/>
      <Contact py={140}/>
    </Layout>
  );
}
