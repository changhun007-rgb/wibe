import Layout from './Layout.jsx';
import {
  CommerceHero, Problem, Solution, CostCompare, ServiceSummary,
  WhoFor, StrategySetup, GrowSmall, GlobalTeaser, Contact,
} from './sections.jsx';

// Home = commerce-OPERATIONS landing. Ends with its own contextual consultation
// form (variant="commerce") instead of routing to a shared /contact page —
// overseas inquiries live on the /global page's own form.
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
      <Contact variant="commerce" py={104}/>
    </Layout>
  );
}
