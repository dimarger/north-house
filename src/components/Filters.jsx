import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cities, propertyTypes, statuses } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

export const defaultFilters = { query: '', mode: 'buy', city: '', type: '', maxPrice: '', bedrooms: '', area: '', status: '', sort: 'newest' }

export function filterProperties(properties, filters) {
  return properties
    .filter((p) => !filters.query || `${p.title} ${p.city} ${p.district} ${p.type}`.toLowerCase().includes(filters.query.toLowerCase()))
    .filter((p) => filters.mode === 'rent' ? p.status === 'For rent' : p.status !== 'For rent')
    .filter((p) => !filters.city || p.city === filters.city)
    .filter((p) => !filters.type || p.type === filters.type)
    .filter((p) => !filters.maxPrice || p.price <= Number(filters.maxPrice))
    .filter((p) => !filters.bedrooms || p.bedrooms >= Number(filters.bedrooms))
    .filter((p) => !filters.area || p.area >= Number(filters.area))
    .filter((p) => !filters.status || p.status === filters.status)
    .sort((a, b) => filters.sort === 'low' ? a.price - b.price : filters.sort === 'high' ? b.price - a.price : b.year - a.year)
}

export default function Filters({ filters, setFilters, mobileOpen, setMobileOpen }) {
  const { t } = useApp()
  const set = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))
  const body = (
    <>
      <div className="mode-toggle"><button className={filters.mode === 'buy' ? 'active' : ''} onClick={() => set('mode', 'buy')}>{t.filters.buy}</button><button className={filters.mode === 'rent' ? 'active' : ''} onClick={() => set('mode', 'rent')}>{t.filters.rent}</button></div>
      <label className="search-label"><Search size={16} /> <input value={filters.query} onChange={(e) => set('query', e.target.value)} placeholder={t.filters.search} /></label>
      <label>{t.filters.location}<select value={filters.city} onChange={(e) => set('city', e.target.value)}><option value="">All</option>{cities.map((c) => <option key={c}>{c}</option>)}</select></label>
      <label>{t.filters.type}<select value={filters.type} onChange={(e) => set('type', e.target.value)}><option value="">All</option>{propertyTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label>{t.filters.maxPrice}<input type="number" value={filters.maxPrice} onChange={(e) => set('maxPrice', e.target.value)} placeholder="1000000" /></label>
      <label>{t.filters.bedrooms}<input type="number" value={filters.bedrooms} onChange={(e) => set('bedrooms', e.target.value)} /></label>
      <label>{t.filters.area}<input type="number" value={filters.area} onChange={(e) => set('area', e.target.value)} /></label>
      <label>{t.filters.status}<select value={filters.status} onChange={(e) => set('status', e.target.value)}><option value="">All</option>{statuses.map((s) => <option key={s}>{s}</option>)}</select></label>
      <button className="clear" onClick={() => setFilters(defaultFilters)}>{t.filters.clear}</button>
    </>
  )
  return (
    <>
      <button className="mobile-filter-button" onClick={() => setMobileOpen(true)}><SlidersHorizontal size={17} /> {t.filters.filters}</button>
      <aside className="filters desktop-filters">{body}</aside>
      <div className={`filter-sheet ${mobileOpen ? 'open' : ''}`}>
        <div className="sheet-head"><strong>{t.filters.filters}</strong><button onClick={() => setMobileOpen(false)} aria-label="Close filters"><X /></button></div>
        <div className="filters">{body}</div>
      </div>
    </>
  )
}
