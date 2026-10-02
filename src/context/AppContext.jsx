import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../data/translations.js'

const AppContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => readStorage('nh-lang', 'en'))
  const [favorites, setFavorites] = useState(() => readStorage('nh-favorites', []))
  const [compare, setCompare] = useState(() => readStorage('nh-compare', []))

  useEffect(() => localStorage.setItem('nh-lang', JSON.stringify(lang)), [lang])
  useEffect(() => localStorage.setItem('nh-favorites', JSON.stringify(favorites)), [favorites])
  useEffect(() => localStorage.setItem('nh-compare', JSON.stringify(compare)), [compare])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const t = translations[lang]
    return {
      lang,
      setLang,
      t,
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
      compare,
      isCompared: (id) => compare.includes(id),
      toggleCompare: (id) => setCompare((items) => items.includes(id) ? items.filter((item) => item !== id) : items.length >= 3 ? items : [...items, id]),
      clearCompare: () => setCompare([]),
    }
  }, [lang, favorites, compare])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
