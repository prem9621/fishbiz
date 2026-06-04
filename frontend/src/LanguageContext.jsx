import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './siteData'

const STORAGE_KEY = 'godawari-fish-language'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en'
    }

    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored && translations[stored] ? stored : 'en'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language === 'en' ? 'en' : language === 'hi' ? 'hi' : 'mr'
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      copy: translations[language] ?? translations.en,
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }

  return context
}
