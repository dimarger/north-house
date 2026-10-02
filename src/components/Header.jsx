import { Heart, Menu, Scale, X } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

const links = [
  ['properties', '/properties'],
  ['services', '/services'],
  ['locations', '/locations'],
  ['journal', '/journal'],
  ['about', '/about'],
]

export default function Header() {
  const { lang, setLang, t, favorites, compare } = useApp()
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${compact ? 'is-compact' : ''}`}>
      <a className="skip" href="#main-content">Skip to content</a>
      <nav className="header-inner" aria-label="Primary navigation">
        <Link className="brand" to="/" aria-label="North and House home">
          <span>NORTH</span><span>&amp;</span><span>HOUSE</span>
        </Link>
        <div className="nav-links">
          {links.map(([key, path]) => <NavLink key={key} to={path}>{t.nav[key]}</NavLink>)}
        </div>
        <div className="header-actions">
          <button className="language" onClick={() => setLang(lang === 'en' ? 'pl' : 'en')} aria-label="Switch language">{lang.toUpperCase()} / {lang === 'en' ? 'PL' : 'EN'}</button>
          <Link className="icon-link" to="/saved" aria-label="Saved properties"><Heart size={18} />{favorites.length > 0 && <span>{favorites.length}</span>}</Link>
          <Link className="icon-link" to="/compare" aria-label="Compare properties"><Scale size={18} />{compare.length > 0 && <span>{compare.length}</span>}</Link>
          <Link className="text-link" to="/sell">{t.nav.contact}</Link>
          <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </nav>
      <div className={`mobile-panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile menu">
        <button className="close" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
        <Link className="brand mobile-brand" to="/" onClick={() => setOpen(false)}><span>NORTH</span><span>&amp;</span><span>HOUSE</span></Link>
        {links.map(([key, path]) => <NavLink key={key} to={path} onClick={() => setOpen(false)}>{t.nav[key]}</NavLink>)}
        <NavLink to="/saved" onClick={() => setOpen(false)}>{t.nav.saved}</NavLink>
        <NavLink to="/compare" onClick={() => setOpen(false)}>Compare</NavLink>
        <button className="language mobile-lang" onClick={() => setLang(lang === 'en' ? 'pl' : 'en')}>{lang.toUpperCase()} / {lang === 'en' ? 'PL' : 'EN'}</button>
      </div>
    </header>
  )
}
