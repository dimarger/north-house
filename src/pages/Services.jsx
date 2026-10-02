import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Services() {
  const { t } = useApp()
  const services = ['Buying', 'Selling', 'Investment', 'Relocation', 'Property management']
  return <><Seo title="Services | NORTH & HOUSE" description="Buying, selling, investment and relocation advisory for premium real estate clients." /><section className="page-hero slim"><p className="eyebrow">Advisory</p><h1>{t.pages.services}</h1><p>Structured support for private clients, investors and owners who need judgement rather than volume.</p></section><section className="section service-list">{services.map((s) => <article key={s}><h2>{s}</h2><p>Discreet advisory, market context and execution designed around your property goals in Poland.</p><Link to={s === 'Selling' ? '/sell' : '/properties'}>Start conversation</Link></article>)}</section></>
}
