/**
 * Static page content loader
 * Returns page content based on current language with English fallback
 * Uses Google Play language codes for compatibility
 * 
 * OPTIMIZATION: Only English is bundled. Other languages are lazy-loaded on demand.
 */

import type { PageDefinition, StaticPageType } from './types'

// Re-export types for convenience
export type { PageDefinition, PageSection, StaticPageType } from './types'
export { LAST_UPDATED, CONTACT_EMAIL } from './types'

// Only import English - other languages are lazy-loaded
import * as enGB from './en-GB'

// Cache for loaded static content
const contentCache = new Map<string, Record<StaticPageType, PageDefinition>>()

// Pre-populate cache with English
contentCache.set('en-GB', enGB as unknown as Record<StaticPageType, PageDefinition>)

// Use import.meta.glob for Vite to properly analyze and code-split
// Each language folder gets its own chunk
const staticModules = import.meta.glob<Record<StaticPageType, PageDefinition>>('./**/index.ts', {
  import: '*',
  eager: false,
})

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
  'es': 'es-ES', 'es-MX': 'es-ES',
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

// List of supported language codes
const supportedLanguages = new Set([
  'en-GB', 'ar', 'bn-BD', 'es-ES', 'gu', 'hi-IN', 'id', 'ja-JP',
  'kn-IN', 'ko-KR', 'ml-IN', 'mr-IN', 'ms', 'pa', 'pt-BR', 'ru-RU',
  'ta-IN', 'te-IN', 'th', 'fil', 'vi', 'zh-CN',
  'af', 'bg', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'fi-FI', 'fr-FR',
  'hr', 'hu-HU', 'it-IT', 'km-KH', 'lo-LA', 'my-MM', 'ne-NP', 'nl-NL',
  'no-NO', 'pl-PL', 'ro', 'sv-SE', 'zu'
])

/**
 * Resolve a language code to a supported language code
 */
function resolveLanguageCode(language: string): string {
  // Direct match
  if (supportedLanguages.has(language)) return language
  
  // Try mapped code
  const mappedCode = browserToGooglePlay[language]
  if (mappedCode && supportedLanguages.has(mappedCode)) return mappedCode
  
  // Try base language mapping
  const baseLanguage = language.split('-')[0]
  const mappedBase = browserToGooglePlay[baseLanguage]
  if (mappedBase && supportedLanguages.has(mappedBase)) return mappedBase
  
  // Try base language direct match
  if (supportedLanguages.has(baseLanguage)) return baseLanguage
  
  // Fallback to English
  return 'en-GB'
}

/**
 * Lazy load static content for a language
 * Vite will code-split these into separate chunks
 */
async function loadLanguageContent(lang: string): Promise<Record<StaticPageType, PageDefinition>> {
  // Check cache first
  if (contentCache.has(lang)) {
    return contentCache.get(lang)!
  }
  
  try {
    // Use the glob-imported modules for proper Vite code-splitting
    const modulePath = `./${lang}/index.ts`
    const loader = staticModules[modulePath]
    
    if (!loader) {
      console.warn(`No static content module found for: ${lang}`)
      return contentCache.get('en-GB')!
    }
    
    const content = await loader()
    contentCache.set(lang, content)
    return content
  } catch (error) {
    console.error(`Failed to load static content for: ${lang}`, error)
    // Fall back to English
    return contentCache.get('en-GB')!
  }
}

/**
 * Get static page content for a given language and page type (async)
 * Falls back to English if translation not available
 */
export async function getStaticContentAsync(
  language: string,
  page: StaticPageType
): Promise<PageDefinition> {
  const resolvedLang = resolveLanguageCode(language)
  const content = await loadLanguageContent(resolvedLang)
  return content[page] || contentCache.get('en-GB')![page]
}

/**
 * Get static page content synchronously (only works for cached/English content)
 * Use getStaticContentAsync for full language support
 * @deprecated Use getStaticContentAsync instead for proper lazy loading
 */
export function getStaticContent(
  language: string,
  page: StaticPageType
): PageDefinition {
  const resolvedLang = resolveLanguageCode(language)
  
  // Return cached content if available
  if (contentCache.has(resolvedLang)) {
    return contentCache.get(resolvedLang)![page]
  }
  
  // Trigger async load for next time (fire and forget)
  loadLanguageContent(resolvedLang)
  
  // Return English as fallback for immediate render
  return contentCache.get('en-GB')![page]
}

/**
 * Preload static content for a language (call this when language changes)
 */
export async function preloadStaticContent(language: string): Promise<void> {
  const resolvedLang = resolveLanguageCode(language)
  if (!contentCache.has(resolvedLang)) {
    await loadLanguageContent(resolvedLang)
  }
}

/**
 * Check if a language has translations available
 */
export function hasStaticTranslation(language: string): boolean {
  const resolvedLang = resolveLanguageCode(language)
  return supportedLanguages.has(resolvedLang)
}
