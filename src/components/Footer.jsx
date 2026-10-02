import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">NORTH &amp; HOUSE</div>
      <div className="footer-grid">
        <div><p>Premium Real Estate</p><p>Warsaw · Krakow · Gdansk</p></div>
        <div><Link to="/properties">Properties</Link><Link to="/services">Services</Link><Link to="/locations">Locations</Link><Link to="/journal">Journal</Link><Link to="/about">About</Link><Link to="/sell">Contact</Link></div>
        <div><span>Warsaw</span><span>Krakow</span><span>Gdansk</span></div>
        <div><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><Link to="/about">Privacy</Link><Link to="/about">Terms</Link></div>
      </div>
    </footer>
  )
}
