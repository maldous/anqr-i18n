/**
 * Static page content loader
 * Returns page content based on current language with English fallback
 */

import type { PageDefinition, StaticPageType } from './types'
import * as en from './en'
import * as zh from './zh'
import * as hi from './hi'
import * as ms from './ms'
import * as pt from './pt'
import * as ta from './ta'
import * as th from './th'

// Re-export types for convenience
export type { PageDefinition, PageSection, StaticPageType } from './types'
export { LAST_UPDATED, CONTACT_EMAIL } from './types'

const contentByLanguage: Record<string, Record<StaticPageType, PageDefinition>> = {
  en,
  zh,
  hi,
  ms,
  pt,
  ta,
  th,
}

/**
 * Get static page content for a given language and page type
 * Falls back to English if translation not available
 */
export function getStaticContent(
  language: string,
  page: StaticPageType
): PageDefinition {
  // Try exact language match first
  if (contentByLanguage[language]?.[page]) {
    return contentByLanguage[language][page]
  }

  // Try language without region (e.g., 'zh-CN' -> 'zh')
  const baseLanguage = language.split('-')[0]
  if (contentByLanguage[baseLanguage]?.[page]) {
    return contentByLanguage[baseLanguage][page]
  }

  // Fallback to English
  return contentByLanguage.en[page]
}

/**
 * Check if a language has translations available
 */
export function hasStaticTranslation(language: string): boolean {
  const baseLanguage = language.split('-')[0]
  return language in contentByLanguage || baseLanguage in contentByLanguage
}
