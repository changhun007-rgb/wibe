import Layout from './Layout.jsx';
import {
  CommerceHero, Problem, Solution, CostCompare,
  ServiceSummary, WhoFor, GrowSmall, GlobalTeaser, FinalCTA,
} from './sections.jsx';

// Home = commerce-agency landing (2026 repositioning). Nine sections flowing as
// one continuous canvas: hero → problem → solution → cost → services → who-for
// → grow → global teaser → final CTA. Deep service/overseas content lives on
// /services and /global. Varied py keeps it from reading as evenly-spaced slides.
export default function App() {
  return (
    <Layout>
      <CommerceHero/>
      <Problem py={96}/>
      <Solution py={100}/>
      <CostCompare py={100}/>
      <ServiceSummary py={100}/>
      <WhoFor py={96}/>
      <GrowSmall py={100}/>
      <GlobalTeaser py={88}/>
      <FinalCTA py={104}/>
    </Layout>
  );
}
