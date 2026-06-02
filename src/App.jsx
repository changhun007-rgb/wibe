import Layout from './Layout.jsx';
import {
  CommerceHero, Problem, Solution, CostCompare, ServiceSummary,
  WhoFor, StrategySetup, GrowSmall, GlobalTeaser, FinalCTA,
} from './sections.jsx';

// Home = commerce-OPERATIONS-agency landing (2026-06 revision). Message: WIBE
// runs ongoing e-commerce operations like an outsourced commerce team — NOT a
// brand-launch shop. Ten sections flowing as one canvas: hero → problem →
// solution → cost → services → who-for → strategy setup → grow → global teaser
// → final CTA. Deep service detail on /services, overseas on /global.
export default function App() {
  return (
    <Layout>
      <CommerceHero/>
      <Problem py={96}/>
      <Solution py={100}/>
      <CostCompare py={100}/>
      <ServiceSummary py={100}/>
      <WhoFor py={96}/>
      <StrategySetup py={100}/>
      <GrowSmall py={100}/>
      <GlobalTeaser py={88}/>
      <FinalCTA py={104}/>
    </Layout>
  );
}
