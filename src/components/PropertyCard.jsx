import { Heart, Scale } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { formatPrice } from '../data/properties.js'

export default function PropertyCard({ property, variant = 'grid' }) {
  const { t, isFavorite, toggleFavorite, isCompared, toggleCompare } = useApp()
  return (
    <article className={`property-card ${variant}`}>
      <Link to={`/properties/${property.slug}`} className="card-image" aria-label={`${t.common.view}: ${property.title}`}>
        <img src={property.images[0]} alt={`${property.title} in ${property.city}`} loading="lazy" />
        <span>{property.status}</span>
      </Link>
      <div className="card-body">
        <div className="card-topline"><span>{property.type}</span><span>{property.city} · {property.district}</span></div>
        <h3><Link to={`/properties/${property.slug}`}>{property.title}</Link></h3>
        <p className="price">{formatPrice(property)}</p>
        <div className="card-facts"><span>{property.area} m2</span><span>{property.rooms} rooms</span><span>{property.bedrooms} bed</span><span>{property.bathrooms} bath</span></div>
        <div className="card-actions">
          <Link to={`/properties/${property.slug}`}>{t.common.view}</Link>
          <button onClick={() => toggleFavorite(property.id)} aria-label="Toggle favorite" className={isFavorite(property.id) ? 'active' : ''}><Heart size={17} /></button>
          <button onClick={() => toggleCompare(property.id)} aria-label="Toggle compare" className={isCompared(property.id) ? 'active' : ''}><Scale size={17} /></button>
        </div>
      </div>
    </article>
  )
}
