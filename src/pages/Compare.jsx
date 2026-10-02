import Seo from '../components/Seo.jsx'
import { formatPrice, properties } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

export default function Compare() {
  const { compare, clearCompare, toggleCompare } = useApp()
  const selected = properties.filter((p) => compare.includes(p.id))
  const rows = ['Price', 'Area', 'Rooms', 'Bedrooms', 'Bathrooms', 'Floor', 'Year', 'Amenities']
  const val = (p, row) => row === 'Price' ? formatPrice(p) : row === 'Area' ? `${p.area} m2` : row === 'Amenities' ? p.amenities.slice(0, 5).join(', ') : p[row.toLowerCase()]
  return <><Seo title="Compare Properties | NORTH & HOUSE" description="Compare selected premium properties." /><section className="page-hero slim"><h1>Compare properties</h1><p>Select up to 3 properties from the catalog.</p><button className="btn light" onClick={clearCompare}>Clear compare</button></section><section className="section compare-table">{selected.length ? <table><thead><tr><th>Feature</th>{selected.map((p) => <th key={p.id}><img src={p.images[0]} alt={p.title} /><span>{p.title}</span><button onClick={() => toggleCompare(p.id)}>Remove</button></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row}><td>{row}</td>{selected.map((p) => <td key={p.id + row}>{val(p, row)}</td>)}</tr>)}</tbody></table> : <p>No properties selected for comparison.</p>}</section></>
}
