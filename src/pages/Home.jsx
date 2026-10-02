import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import ViewingForm from '../components/ViewingForm.jsx'
import { properties } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

export default function Home() {
  const { t } = useApp()
  return (
    <>
      <Seo title="NORTH & HOUSE | Premium Real Estate Poland" description="A private approach to exceptional property across Warsaw, Krakow and Gdansk." image={properties[0].images[0]} />
      <section className="hero">
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=88" alt="Contemporary premium apartment with architectural windows" /></div>
        <div className="hero-copy reveal"><p className="eyebrow">{t.home.eyebrow}</p><h1>{t.home.heroTitle}</h1><p>{t.home.heroSub}</p><div className="hero-actions"><Link className="btn dark" to="/properties">{t.home.explore}</Link><Link className="btn light" to="/sell">{t.home.sell}</Link></div></div>
        <form className="hero-search" onSubmit={(e) => e.preventDefault()}>
          <div><span>Buy / Rent</span><select><option>Buy</option><option>Rent</option></select></div><div><span>Location</span><select><option>Warsaw</option><option>Krakow</option><option>Gdansk</option></select></div><div><span>Property type</span><select><option>Apartment</option><option>Penthouse</option><option>House</option></select></div><div><span>Price</span><input placeholder="€1,000,000" /></div><Link className="btn dark" to="/properties">Search</Link>
        </form>
      </section>
      <section className="section intro-grid reveal"><div><p className="eyebrow">NORTH & HOUSE</p><h2>{t.home.approach}</h2></div><p>We work with homes that require careful positioning: riverfront apartments, quiet townhouses, family villas, commercial ateliers and investment properties where privacy, timing and presentation matter.</p></section>
      <section className="section"><div className="section-head"><div><p className="eyebrow">Portfolio</p><h2>{t.home.selected}</h2><p>{t.home.selectedSub}</p></div><Link to="/properties">View all</Link></div><div className="featured-grid">{properties.slice(0, 4).map((p, i) => <PropertyCard key={p.id} property={p} variant={i === 0 ? 'large' : ''} />)}</div></section>
      <section className="section numbers"><div><strong>12+</strong><span>years in the market</span></div><div><strong>€180M+</strong><span>property value represented</span></div><div><strong>420+</strong><span>completed transactions</span></div><div><strong>3</strong><span>Polish cities</span></div></section>
      <section className="section editorial-split"><img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85" alt="Elegant interior material detail" /><div><p className="eyebrow">Private Advisory</p><h2>For buyers who value context, not volume.</h2><p>We reduce noise before it reaches you. Every recommendation is shaped by ownership goals, neighbourhood rhythm, resale logic and how a space will actually live over time.</p><ViewingForm compact /></div></section>
    </>
  )
}
