import Seo from '../components/Seo.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

export default function Saved() {
  const { t, favorites } = useApp()
  const saved = properties.filter((p) => favorites.includes(p.id))
  return <><Seo title="Saved Properties | NORTH & HOUSE" description="Your saved premium properties." /><section className="page-hero slim"><h1>{t.common.saved}</h1><p>{saved.length} properties</p></section><section className="section properties-grid">{saved.length ? saved.map((p) => <PropertyCard key={p.id} property={p} />) : <p>{t.common.noSaved}</p>}</section></>
}
