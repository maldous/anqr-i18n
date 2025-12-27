/**
 * i18n Configuration
 * 
 * Internationalization setup using react-i18next
 * Supports: English, Hindi, Chinese, Malay, Tamil, Thai, Portuguese
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import en from './locales/en.json'
import hi from './locales/hi.json'
import zh from './locales/zh.json'
import ms from './locales/ms.json'
import ta from './locales/ta.json'
import th from './locales/th.json'
import pt from './locales/pt.json'

// Language metadata for the selector
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
] as const

export type LanguageCode = typeof languages[number]['code']

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  zh: { translation: zh },
  ms: { translation: ms },
  ta: { translation: ta },
  th: { translation: th },
  pt: { translation: pt },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'anqr-language',
    },
  })

export default i18n
