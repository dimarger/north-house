import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Scale, X } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import ViewingForm from '../components/ViewingForm.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { formatPrice, properties } from '../data/properties.js'
import { useApp } from '../context/AppContext.jsx'

export default function PropertyDetail() {
  const { slug } = useParams()
  const { t, isFavorite, toggleFavorite, isCompared, toggleCompare } = useApp()
  const property = properties.find((p) => p.slug === slug)
  const [active, setActive] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const related = useMemo(() => properties.filter((p) => p.city === property?.city && p.id !== property.id).slice(0, 2), [property])
  if (!property) return <section className="page-hero"><h1>Property not found</h1><Link to="/properties">Back to properties</Link></section>
  const schema = { '@context': 'https://schema.org', '@type': 'Residence', name: property.title, address: { '@type': 'PostalAddress', addressLocality: property.city, addressRegion: property.district, addressCountry: 'PL' }, floorSize: `${property.area} m2`, numberOfRooms: property.rooms, image: property.images, offers: { '@type': 'Offer', price: property.price, priceCurrency: property.currency, availability: 'https://schema.org/InStock' } }
  return (
    <>
      <Seo title={`${property.title} | NORTH & HOUSE`} description={property.description.slice(0, 155)} image={property.images[0]} schema={schema} />
      <section className="detail-hero section">
        <div><p className="eyebrow">{property.status} · {property.id}</p><h1>{property.title}</h1><p>{property.city} · {property.district}</p></div>
        <div className="detail-price"><strong>{formatPrice(property)}</strong><span>{property.area} m2 · {property.rooms} rooms · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms</span></div>
      </section>
      <section className="gallery section"><button className="main-photo" onClick={() => setFullscreen(true)}><img src={property.images[active]} alt={`${property.title} gallery image ${active + 1}`} /></button><div className="thumbs">{property.images.map((image, i) => <button key={image} className={i === active ? 'active' : ''} onClick={() => setActive(i)}><img src={image} alt={`${property.title} thumbnail ${i + 1}`} /></button>)}</div></section>
      {fullscreen && <div className="fullscreen" role="dialog" aria-modal="true"><button onClick={() => setFullscreen(false)} aria-label="Close gallery"><X /></button><img src={property.images[active]} alt={`${property.title} fullscreen`} /></div>}
      <section className="detail-layout section"><article><p className="eyebrow">Description</p><h2>{t.pages.description}</h2><p className="long-copy">{property.description}</p><h2>{t.pages.features}</h2><div className="feature-grid">{property.features.map((f) => <span key={f}>{f}</span>)}</div><h2>{t.pages.amenities}</h2><div className="amenities">{property.amenities.map((a) => <span key={a}>{a}</span>)}</div><h2>{t.pages.neighbourhood}</h2><div className="map-card"><div><strong>{property.city} / {property.district}</strong><p>Restaurants · Schools · Transport · Parks · Shopping</p></div></div></article><aside><div className="agent-card"><img src={property.agent.image} alt={property.agent.name} /><h3>{property.agent.name}</h3><p>{property.agent.role}</p><a href={`tel:${property.agent.phone}`}>{property.agent.phone}</a><a href={`mailto:${property.agent.email}`}>{property.agent.email}</a><a href={`https://wa.me/${property.agent.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a><button className="btn dark">{t.common.schedule}</button><div className="inline-actions"><button onClick={() => toggleFavorite(property.id)} className={isFavorite(property.id) ? 'active' : ''}><Heart /> Favorite</button><button onClick={() => toggleCompare(property.id)} className={isCompared(property.id) ? 'active' : ''}><Scale /> Compare</button></div></div><ViewingForm /></aside></section>
      <section className="section"><div className="section-head"><h2>Related in {property.city}</h2></div><div className="properties-grid small">{related.map((p) => <PropertyCard key={p.id} property={p} />)}</div></section>
    </>
  )
}
