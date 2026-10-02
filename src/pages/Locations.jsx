import PropertyCard from '../components/PropertyCard.jsx'
import Seo from '../components/Seo.jsx'
import { properties } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

const data = { Warsaw: ['Powisle', 'Mokotow', 'Srodmiescie', 'Zoliborz', 'Wilanow'], Krakow: ['Stare Miasto', 'Kazimierz', 'Debniki', 'Zwierzyniec'], Gdansk: ['Oliwa', 'Wrzeszcz', 'Jelitkowo', 'Sopot fringe'] }
const images = { Warsaw: 'photo-1519197924294-4ba991a11128', Krakow: 'photo-1543783207-ec64e4d95325', Gdansk: 'photo-1558442074-3c19857bc1dc' }

export default function Locations() {
  const { t } = useApp()
  return <><Seo title="Locations | NORTH & HOUSE" description="Premium property advisory in Warsaw, Krakow and Gdansk." /><section className="page-hero slim"><p className="eyebrow">Cities</p><h1>{t.pages.locations}</h1><p>Local knowledge across Poland's most relevant urban property markets.</p></section><section className="section location-stack">{Object.entries(data).map(([city, areas]) => <article key={city} className="location-card"><img src={`https://images.unsplash.com/${images[city]}?auto=format&fit=crop&w=1300&q=85`} alt={`${city} architecture`} /><div><h2>{city}</h2><p>A precise read on neighbourhood quality, buyer behaviour and long-term ownership value.</p><div className="amenities">{areas.map((a) => <span key={a}>{a}</span>)}</div><div className="properties-grid small">{properties.filter((p) => p.city === city).slice(0, 2).map((p) => <PropertyCard key={p.id} property={p} />)}</div></div></article>)}</section></>
}
