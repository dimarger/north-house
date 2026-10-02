import Seo from '../components/Seo.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Journal() {
  const { t } = useApp()
  const posts = ['Where to live in Warsaw in 2026', 'Buying property in Poland as a foreigner', "Five neighbourhoods changing Warsaw's skyline", 'How to prepare a premium property for sale']
  return <><Seo title="Journal | NORTH & HOUSE" description="Editorial insight on premium property, Polish cities and real estate ownership." /><section className="page-hero slim"><p className="eyebrow">Editorial</p><h1>{t.pages.journal}</h1><p>Notes on market shifts, neighbourhoods, ownership and presentation.</p></section><section className="section journal-grid">{posts.map((p, i) => <article key={p}><img src={`https://images.unsplash.com/${['photo-1518005020951-eccb494ad742','photo-1524230572899-a752b3835840','photo-1494526585095-c41746248156','photo-1600566752355-35792bedcfea'][i]}?auto=format&fit=crop&w=1000&q=85`} alt={p} /><span>Insight 0{i + 1}</span><h2>{p}</h2><p>Measured perspective for buyers, owners and international clients making property decisions in Poland.</p></article>)}</section></>
}
