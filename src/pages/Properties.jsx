import { useState } from 'react'
import { LayoutGrid, List } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Filters, { defaultFilters, filterProperties } from '../components/Filters.jsx'
import { properties } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

export default function Properties() {
  const { t } = useApp()
  const [filters, setFilters] = useState(defaultFilters)
  const [view, setView] = useState('grid')
  const [mobileOpen, setMobileOpen] = useState(false)
  const filtered = filterProperties(properties, filters)
  return (
    <>
      <Seo title="Properties | NORTH & HOUSE" description="Search premium properties across Warsaw, Krakow and Gdansk." />
      <section className="page-hero slim"><p className="eyebrow">Portfolio</p><h1>{t.pages.properties}</h1><p>Homes, investments and architectural spaces selected for serious buyers and private owners.</p></section>
      <section className="catalog section">
        <Filters filters={filters} setFilters={setFilters} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="catalog-results">
          <div className="catalog-toolbar"><span>{filtered.length} properties</span><label>{t.filters.sort}<select value={filters.sort} onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}><option value="newest">{t.filters.newest}</option><option value="low">{t.filters.low}</option><option value="high">{t.filters.high}</option></select></label><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><LayoutGrid /></button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><List /></button></div>
          <div className={`properties-${view}`}>{filtered.map((p) => <PropertyCard key={p.id} property={p} variant={view} />)}</div>
        </div>
      </section>
    </>
  )
}
