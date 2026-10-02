import { useEffect } from 'react'

export default function Seo({ title, description, image, schema }) {
  useEffect(() => {
    document.title = title
    const set = (selector, attr, value) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement(selector.startsWith('meta') ? 'meta' : 'link')
        if (selector.includes('name=')) el.setAttribute('name', selector.match(/name="(.+?)"/)?.[1] || '')
        if (selector.includes('property=')) el.setAttribute('property', selector.match(/property="(.+?)"/)?.[1] || '')
        if (selector.includes('canonical')) el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
    if (image) set('meta[property="og:image"]', 'content', image)
    set('link[rel="canonical"]', 'href', window.location.href)
    const old = document.getElementById('structured-data')
    if (old) old.remove()
    if (schema) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'structured-data'
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [title, description, image, schema])
  return null
}
