/**
 * i18n Configuration
 * 
 * Internationalization setup using react-i18next
 * Supports: English, Hindi, Chinese, Malay, Tamil, Thai, Portuguese, Indonesian, Vietnamese, Tagalog, Japanese, Korean, Spanish, Arabic, Russian, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi
 * 
 * OPTIMIZATION: Only English is bundled. Other locales are lazy-loaded on demand.
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Only import English - other locales are lazy-loaded
import en from './locales/en.json'

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

// Initial resources - only English bundled, others lazy-loaded
const resources: Record<string, { translation: Record<string, unknown> }> = {
  en: { translation: en },
}

// List of supported language codes for detection
const supportedLngs = languages.map(l => l.code)

// Track which locales have been loaded
const loadedLocales = new Set<string>(['en'])

/**
 * Lazy load a locale on demand
 * This significantly reduces initial bundle size by ~1.5MB
 */
export async function loadLocale(lang: string): Promise<void> {
  if (loadedLocales.has(lang)) return
  
  try {
    // Dynamic import - Vite will code-split these
    const localeModule = await import(`./locales/${lang}.json`)
    i18n.addResourceBundle(lang, 'translation', localeModule.default, true, true)
    loadedLocales.add(lang)
  } catch (error) {
    console.error(`Failed to load locale: ${lang}`, error)
    // Fall back to English if locale fails to load
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs,
    // Allow loading of base language (e.g., 'zh' for 'zh-CN')
    load: 'languageOnly',
    debug: false, // Disable debug logging in all environments
    
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

// Listen for language changes and lazy-load locales
i18n.on('languageChanged', async (lng) => {
  const baseLang = lng.split('-')[0]
  if (!loadedLocales.has(baseLang)) {
    await loadLocale(baseLang)
  }
})

// Pre-load detected language if not English
const detectedLang = i18n.language?.split('-')[0]
if (detectedLang && detectedLang !== 'en') {
  loadLocale(detectedLang)
}

export default i18n
