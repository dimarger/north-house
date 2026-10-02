import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="page-hero"><h1>Page not found</h1><Link className="btn dark" to="/">Return home</Link></section>
}
