import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
import sn from './sn.json'

i18n.use(LanguageDetector).init({
  resources: { en:{translation:en}, sn:{translation:sn} },
  fallbackLng: 'en',
  interpolation: { escapeValue:false }
})

export default i18n
