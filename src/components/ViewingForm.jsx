import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function ViewingForm({ compact = false }) {
  const { t } = useApp()
  const [sent, setSent] = useState(false)
  if (sent) return <div className="success" role="status">{t.forms.success}</div>
  return (
    <form className={`viewing-form ${compact ? 'compact' : ''}`} onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <label>{t.forms.name}<input name="name" required /></label>
      <label>{t.forms.email}<input type="email" name="email" required /></label>
      <label>{t.forms.phone}<input type="tel" name="phone" /></label>
      {!compact && <><label>{t.forms.date}<input type="date" name="date" /></label><label>{t.forms.time}<input type="time" name="time" /></label></>}
      <label className="wide">{t.forms.message}<textarea name="message" rows="4" /></label>
      <button className="btn dark" type="submit">{t.common.request}</button>
    </form>
  )
}
