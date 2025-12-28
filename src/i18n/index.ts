/**
 * i18n Configuration
 * 
 * Internationalization setup using react-i18next
 * Supports: English, Hindi, Chinese, Malay, Tamil, Thai, Portuguese, Indonesian, Vietnamese, Tagalog, Japanese, Korean, Spanish, Arabic, Russian, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi
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
import id from './locales/id.json'
import vi from './locales/vi.json'
import tl from './locales/tl.json'
import ja from './locales/ja.json'
import ko from './locales/ko.json'
import es from './locales/es.json'
import ar from './locales/ar.json'
import ru from './locales/ru.json'
import te from './locales/te.json'
import mr from './locales/mr.json'
import bn from './locales/bn.json'
import gu from './locales/gu.json'
import kn from './locales/kn.json'
import ml from './locales/ml.json'
import pa from './locales/pa.json'

// Language metadata for the selector
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', rtl: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', rtl: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', rtl: false },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', rtl: false },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', rtl: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', rtl: false },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', rtl: false },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', rtl: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', rtl: false },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', rtl: false },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', rtl: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', rtl: false },
] as const

/**
 * Check if a language code is RTL
 */
export function isRtlLanguage(langCode: string): boolean {
  const baseLang = langCode.split('-')[0]
  const lang = languages.find(l => l.code === baseLang)
  return lang?.rtl ?? false
}

export type LanguageCode = typeof languages[number]['code']

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  zh: { translation: zh },
  ms: { translation: ms },
  ta: { translation: ta },
  th: { translation: th },
  pt: { translation: pt },
  id: { translation: id },
  vi: { translation: vi },
  tl: { translation: tl },
  ja: { translation: ja },
  ko: { translation: ko },
  es: { translation: es },
  ar: { translation: ar },
  ru: { translation: ru },
  te: { translation: te },
  mr: { translation: mr },
  bn: { translation: bn },
  gu: { translation: gu },
  kn: { translation: kn },
  ml: { translation: ml },
  pa: { translation: pa },
}

// List of supported language codes for detection
const supportedLngs = languages.map(l => l.code)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs,
    // Allow loading of base language (e.g., 'zh' for 'zh-CN')
    load: 'languageOnly',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      // Check localStorage first (user's previous choice), then browser language
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'anqr-language',
      // Convert language codes like 'zh-CN' to 'zh' for matching
      convertDetectedLanguage: (lng: string) => lng.split('-')[0],
    },
  })

export default i18n
