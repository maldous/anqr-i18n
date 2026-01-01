/**
 * Static page content loader
 * Returns page content based on current language with English fallback
 * Uses Google Play language codes for compatibility
 */

import type { PageDefinition, StaticPageType } from './types'

// Google Play required languages
import * as enGB from './en-GB'
import * as hiIN from './hi-IN'
import * as zhCN from './zh-CN'
import * as ms from './ms'
import * as taIN from './ta-IN'
import * as th from './th'
import * as ptBR from './pt-BR'
import * as id from './id'
import * as vi from './vi'
import * as fil from './fil'
import * as jaJP from './ja-JP'
import * as koKR from './ko-KR'
import * as esES from './es-ES'
import * as ar from './ar'
import * as ruRU from './ru-RU'
import * as teIN from './te-IN'
import * as mrIN from './mr-IN'
import * as bnBD from './bn-BD'
import * as gu from './gu'
import * as knIN from './kn-IN'
import * as mlIN from './ml-IN'
import * as pa from './pa'

// Additional languages (with Google Play regional codes)
import * as af from './af'
import * as as_ from './as'  // 'as' is reserved keyword
import * as bg from './bg'
import * as cs from './cs'
import * as da from './da'
import * as de from './de'
import * as elGR from './el-GR'
import * as fiFI from './fi-FI'
import * as frFR from './fr-FR'
import * as hr from './hr'
import * as huHU from './hu-HU'
import * as itIT from './it-IT'
import * as kmKH from './km-KH'
import * as loLA from './lo-LA'
import * as myMM from './my-MM'
import * as neNP from './ne-NP'
import * as nlNL from './nl-NL'
import * as noNO from './no-NO'
import * as plPL from './pl-PL'
import * as rm from './rm'
import * as ro from './ro'
import * as svSE from './sv-SE'
import * as tn from './tn'
import * as zu from './zu'

// Re-export types for convenience
export type { PageDefinition, PageSection, StaticPageType } from './types'
export { LAST_UPDATED, CONTACT_EMAIL } from './types'

const contentByLanguage: Record<string, Record<StaticPageType, PageDefinition>> = {
  // Google Play required languages
  'en-GB': enGB,
  'hi-IN': hiIN,
  'zh-CN': zhCN,
  ms,
  'ta-IN': taIN,
  th,
  'pt-BR': ptBR,
  id,
  vi,
  fil,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'es-ES': esES,
  ar,
  'ru-RU': ruRU,
  'te-IN': teIN,
  'mr-IN': mrIN,
  'bn-BD': bnBD,
  gu,
  'kn-IN': knIN,
  'ml-IN': mlIN,
  pa,
  // Additional languages (with Google Play regional codes)
  af,
  as: as_,
  bg,
  cs,
  da,
  de,
  'el-GR': elGR,
  'fi-FI': fiFI,
  'fr-FR': frFR,
  hr,
  'hu-HU': huHU,
  'it-IT': itIT,
  'km-KH': kmKH,
  'lo-LA': loLA,
  'my-MM': myMM,
  'ne-NP': neNP,
  'nl-NL': nlNL,
  'no-NO': noNO,
  'pl-PL': plPL,
  rm,
  ro,
  'sv-SE': svSE,
  tn,
  zu,
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
  
  // Try mapped code
  const mappedCode = browserToGooglePlay[language]
  if (mappedCode && contentByLanguage[mappedCode]?.[page]) {
    return contentByLanguage[mappedCode][page]
  }

  // Try base language mapping
  const baseLanguage = language.split('-')[0]
  const mappedBase = browserToGooglePlay[baseLanguage]
  if (mappedBase && contentByLanguage[mappedBase]?.[page]) {
    return contentByLanguage[mappedBase][page]
  }
  
  // Try base language direct match
  if (contentByLanguage[baseLanguage]?.[page]) {
    return contentByLanguage[baseLanguage][page]
  }

  // Fallback to English
  return contentByLanguage['en-GB'][page]
}

/**
 * Check if a language has translations available
 */
export function hasStaticTranslation(language: string): boolean {
  if (language in contentByLanguage) return true
  
  const baseLanguage = language.split('-')[0]
  
  // Check mapped codes
  const browserToGooglePlay: Record<string, string> = {
    'en': 'en-GB', 'hi': 'hi-IN', 'zh': 'zh-CN', 'ta': 'ta-IN',
    'pt': 'pt-BR', 'tl': 'fil', 'ja': 'ja-JP', 'ko': 'ko-KR',
    'es': 'es-ES', 'ru': 'ru-RU', 'te': 'te-IN', 'mr': 'mr-IN',
    'bn': 'bn-BD', 'kn': 'kn-IN', 'ml': 'ml-IN',
    'el': 'el-GR', 'fi': 'fi-FI', 'fr': 'fr-FR', 'hu': 'hu-HU',
    'it': 'it-IT', 'km': 'km-KH', 'lo': 'lo-LA', 'my': 'my-MM',
    'ne': 'ne-NP', 'nl': 'nl-NL', 'no': 'no-NO', 'pl': 'pl-PL',
    'sv': 'sv-SE',
  }
  
  if (browserToGooglePlay[language] && browserToGooglePlay[language] in contentByLanguage) return true
  if (browserToGooglePlay[baseLanguage] && browserToGooglePlay[baseLanguage] in contentByLanguage) return true
  
  return baseLanguage in contentByLanguage
}
