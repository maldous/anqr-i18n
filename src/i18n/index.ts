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
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
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
