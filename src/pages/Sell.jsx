import Seo from '../components/Seo.jsx'
import ViewingForm from '../components/ViewingForm.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Sell() {
  const { t } = useApp()
  const steps = ['Property assessment', 'Market positioning', 'Professional presentation', 'Private viewings', 'Negotiation', 'Closing']
  return <><Seo title="Sell Your Property | NORTH & HOUSE" description="Premium property valuation and discreet sale representation in Poland." /><section className="page-hero sell"><p className="eyebrow">Private Sales</p><h1>{t.pages.sell}</h1><p>{t.pages.sellSub}</p></section><section className="section process">{steps.map((s, i) => <article key={s}><span>{String(i + 1).padStart(2, '0')}</span><h3>{s}</h3><p>Clear positioning, controlled exposure and careful follow-through from first assessment to final signature.</p></article>)}</section><section className="section editorial-split"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85" alt="Prepared premium property interior" /><div><h2>{t.pages.valuation}</h2><p>Tell us about the property. We will respond with a discreet view on value, timing and the right route to market.</p><ViewingForm /></div></section></>
}
