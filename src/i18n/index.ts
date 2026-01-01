/**
 * i18n Configuration
 * 
 * Internationalization setup using react-i18next
 * Uses Google Play language codes for compatibility
 * 
 * OPTIMIZATION: Only English is bundled. Other locales are lazy-loaded on demand.
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Only import English - other locales are lazy-loaded
import en from './locales/en-GB.json'

// Language metadata for the selector - using Google Play language codes
// Authoritative list from src/i18n/locales/txt/play.txt
export const languages = [
  // Google Play required languages
  { code: 'en-GB', name: 'English', nativeName: 'English', flag: '🇬🇧', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'bn-BD', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', rtl: false },
  { code: 'es-ES', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', rtl: false },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', rtl: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', rtl: false },
  { code: 'ja-JP', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', rtl: false },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', rtl: false },
  { code: 'ko-KR', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', rtl: false },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', rtl: false },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', rtl: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', rtl: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', rtl: false },
  { code: 'pt-BR', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', rtl: false },
  { code: 'ru-RU', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', rtl: false },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', rtl: false },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', rtl: false },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', rtl: false },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', rtl: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', rtl: false },
  // Additional languages (with Google Play regional codes)
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', rtl: false },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', rtl: false },
  { code: 'cs-CZ', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', rtl: false },
  { code: 'da-DK', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', rtl: false },
  { code: 'de-DE', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', rtl: false },
  { code: 'el-GR', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', rtl: false },
  { code: 'fi-FI', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', rtl: false },
  { code: 'fr-FR', name: 'French', nativeName: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', rtl: false },
  { code: 'hu-HU', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', rtl: false },
  { code: 'it-IT', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', rtl: false },
  { code: 'km-KH', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭', rtl: false },
  { code: 'lo-LA', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', rtl: false },
  { code: 'my-MM', name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲', rtl: false },
  { code: 'ne-NP', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', rtl: false },
  { code: 'nl-NL', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', rtl: false },
  { code: 'no-NO', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', rtl: false },
  { code: 'pl-PL', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', rtl: false },
  { code: 'rm', name: 'Romansh', nativeName: 'Rumantsch', flag: '🇨🇭', rtl: false },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', rtl: false },
  { code: 'sv-SE', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', rtl: false },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', rtl: false },
] as const

/**
 * Check if a language code is RTL
 */
export function isRtlLanguage(langCode: string): boolean {
  // Check exact match first, then base language
  const lang = languages.find(l => l.code === langCode) || 
               languages.find(l => l.code === langCode.split('-')[0])
  return lang?.rtl ?? false
}

export type LanguageCode = typeof languages[number]['code']

// Initial resources - only English bundled, others lazy-loaded
const resources: Record<string, { translation: Record<string, unknown> }> = {
  'en-GB': { translation: en },
}

// List of supported language codes for detection
const supportedLngs: string[] = languages.map(l => l.code)

// Track which locales have been loaded
const loadedLocales = new Set<string>(['en-GB'])

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
    fallbackLng: 'en-GB',
    supportedLngs,
    // Don't strip region codes - we need them for Google Play compatibility
    load: 'currentOnly',
    debug: false, // Disable debug logging in all environments
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      // Check localStorage first (user's previous choice), then browser language
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'anqr-language',
      // Map browser language codes to our supported codes
      convertDetectedLanguage: (lng: string) => {
        // Direct match
        if (supportedLngs.includes(lng)) return lng
        
        // Map common browser codes to our Google Play codes
        const browserToGooglePlay: Record<string, string> = {
          'en': 'en-GB', 'en-US': 'en-GB', 'en-AU': 'en-GB',
          'hi': 'hi-IN',
          'zh': 'zh-CN', 'zh-TW': 'zh-CN', 'zh-HK': 'zh-CN',
          'ta': 'ta-IN',
          'pt': 'pt-BR', 'pt-PT': 'pt-BR',
          'tl': 'fil',
          'ja': 'ja-JP',
          'ko': 'ko-KR',
          'es': 'es-ES', 'es-MX': 'es-ES', 'es-AR': 'es-ES',
          'ru': 'ru-RU',
          'te': 'te-IN',
          'mr': 'mr-IN',
          'bn': 'bn-BD', 'bn-IN': 'bn-BD',
          'kn': 'kn-IN',
          'ml': 'ml-IN',
          // Regional mappings
          'cs': 'cs-CZ',
          'da': 'da-DK',
          'de': 'de-DE',
          'el': 'el-GR',
          'fi': 'fi-FI',
          'fr': 'fr-FR',
          'hu': 'hu-HU',
          'it': 'it-IT',
          'km': 'km-KH',
          'lo': 'lo-LA',
          'my': 'my-MM',
          'ne': 'ne-NP',
          'nl': 'nl-NL',
          'no': 'no-NO', 'nb': 'no-NO', 'nn': 'no-NO',
          'pl': 'pl-PL',
          'sv': 'sv-SE',
        }
        
        if (browserToGooglePlay[lng]) return browserToGooglePlay[lng]
        
        // Try base language match
        const baseLang = lng.split('-')[0]
        if (browserToGooglePlay[baseLang]) return browserToGooglePlay[baseLang]
        
        // Check if base language is directly supported
        if (supportedLngs.includes(baseLang)) return baseLang
        
        return 'en-GB'
      },
    },
  })

// Listen for language changes and lazy-load locales
i18n.on('languageChanged', async (lng) => {
  if (!loadedLocales.has(lng)) {
    await loadLocale(lng)
  }
})

// Pre-load detected language if not English
const detectedLang = i18n.language
if (detectedLang && detectedLang !== 'en-GB' && !loadedLocales.has(detectedLang)) {
  loadLocale(detectedLang)
}

export default i18n
