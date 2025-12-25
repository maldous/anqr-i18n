/**
 * Payload Generators Module
 * Generates properly formatted strings for all QR payload types
 * Uses vcard-creator and ics npm packages for RFC-compliant output
 */

import type {
  VCardHelper,
  MeCardHelper,
  EventHelper,
  WifiHelper,
  EmailHelper,
  SmsHelper,
  GeoHelper,
  CryptoHelper,
  UrlHelper,
  TelHelper,
  VCardVersion,
  WifiAuth,
} from '../store/qr-store'

// ============================================
// INTERFACES
// ============================================

export interface EPCSepaParams {
  name: string
  iban: string
  bic?: string
  amount?: number
  reference?: string
  text?: string
}

export interface UPIParams {
  pa: string // payee VPA
  pn?: string // payee name
  am?: number // amount
  cu?: string // currency (default INR)
  tn?: string // transaction note
}

export interface PayNowParams {
  type: 'mobile' | 'uen'
  value: string
  amount?: number
  reference?: string
  editable: boolean
}

export interface PromptPayParams {
  type: 'mobile' | 'id' | 'ewallet'
  value: string
  amount?: number
}

export interface PIXParams {
  key: string
  name?: string
  city?: string
  amount?: number
  txid?: string
}

export interface GS1DigitalLinkParams {
  gtin: string
  baseUrl?: string
  lot?: string
  ser?: string
  expiry?: string
}

export interface BizCardParams {
  firstName?: string
  lastName?: string
  title?: string
  company?: string
  phone?: string
  email?: string
  address?: string
}

export interface OTPAuthParams {
  type: 'totp' | 'hotp'
  issuer?: string
  account?: string
  secret: string
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512'
  digits?: number
  period?: number
  counter?: number
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/** Escape special characters for vCard/iCal format */
function escapeValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

/** Format date for iCalendar (YYYYMMDD or YYYYMMDDTHHmmss) */
function formatICalDate(dateStr: string, includeTime = true): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  if (!includeTime) return `${year}${month}${day}`
  
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`
}

/** Calculate CRC16-CCITT for PIX */
function crc16CCITT(str: string): string {
  let crc = 0xFFFF
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021
      } else {
        crc <<= 1
      }
    }
    crc &= 0xFFFF
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

// ============================================
// CORE PAYLOAD GENERATORS
// ============================================

/** Generate URL payload with optional UTM parameters */
export function generateUrl(params: UrlHelper): string {
  let url = params.href
  
  if (params.forceHttps && url.startsWith('http://')) {
    url = url.replace('http://', 'https://')
  }
  
  const utmParams = new URLSearchParams()
  if (params.utmSource) utmParams.set('utm_source', params.utmSource)
  if (params.utmMedium) utmParams.set('utm_medium', params.utmMedium)
  if (params.utmCampaign) utmParams.set('utm_campaign', params.utmCampaign)
  if (params.utmTerm) utmParams.set('utm_term', params.utmTerm)
  if (params.utmContent) utmParams.set('utm_content', params.utmContent)
  
  const paramStr = utmParams.toString()
  if (paramStr) {
    url += url.includes('?') ? '&' : '?'
    url += paramStr
  }
  
  return url
}

/** Generate telephone URI */
export function generateTel(params: TelHelper): string {
  return `tel:${params.number.replace(/\s+/g, '')}`
}

/** Generate email (mailto) URI */
export function generateEmail(params: EmailHelper): string {
  let mailto = `mailto:${params.to}`
  const queryParams = new URLSearchParams()
  
  if (params.subject) queryParams.set('subject', params.subject)
  if (params.body) queryParams.set('body', params.body)
  
  const paramStr = queryParams.toString()
  if (paramStr) mailto += `?${paramStr}`
  
  return mailto
}

/** Generate SMS URI */
export function generateSms(params: SmsHelper): string {
  let sms = `sms:${params.number}`
  if (params.body) {
    sms += `?body=${encodeURIComponent(params.body)}`
  }
  return sms
}

/** Generate Geo URI */
export function generateGeo(params: GeoHelper): string {
  let geo = `geo:${params.lat},${params.lon}`
  if (params.query) {
    geo += `?q=${encodeURIComponent(params.query)}`
  }
  return geo
}

// ============================================
// WIFI GENERATOR
// ============================================

/** Generate WiFi configuration string */
export function generateWifi(params: WifiHelper): string {
  const escape = (s: string) => s.replace(/[\\";,:]/g, '\\$&')
  
  let wifi = 'WIFI:'
  wifi += `T:${params.auth};`
  wifi += `S:${escape(params.ssid)};`
  
  if (params.password && params.auth !== 'nopass') {
    wifi += `P:${escape(params.password)};`
  }
  
  if (params.hidden) {
    wifi += 'H:true;'
  }
  
  // EAP parameters for enterprise WiFi
  if (params.eapIdentity) wifi += `I:${escape(params.eapIdentity)};`
  if (params.eapAnonymous) wifi += `A:${escape(params.eapAnonymous)};`
  if (params.eapPhase2) wifi += `PH2:${params.eapPhase2};`
  
  wifi += ';'
  return wifi
}

// ============================================
// VCARD GENERATOR
// ============================================

/** Generate vCard string (2.1, 3.0, or 4.0) */
export function generateVCard(params: VCardHelper): string {
  const lines: string[] = []
  
  lines.push('BEGIN:VCARD')
  lines.push(`VERSION:${params.version}`)
  
  // Full name (required)
  if (params.fn) {
    lines.push(`FN:${escapeValue(params.fn)}`)
  }
  
  // Structured name
  if (params.n) {
    lines.push(`N:${escapeValue(params.n)}`)
  } else if (params.fn) {
    // Generate N from FN if not provided
    const parts = params.fn.split(' ')
    if (parts.length >= 2) {
      const lastName = parts.pop() || ''
      const firstName = parts.join(' ')
      lines.push(`N:${escapeValue(lastName)};${escapeValue(firstName)};;;`)
    } else {
      lines.push(`N:${escapeValue(params.fn)};;;;`)
    }
  }
  
  // Organization
  if (params.org) {
    lines.push(`ORG:${escapeValue(params.org)}`)
  }
  
  // Title
  if (params.title) {
    lines.push(`TITLE:${escapeValue(params.title)}`)
  }
  
  // Role
  if (params.role) {
    lines.push(`ROLE:${escapeValue(params.role)}`)
  }
  
  // Phone numbers
  if (params.tel) {
    for (const tel of params.tel) {
      if (params.version === '4.0') {
        lines.push(`TEL;TYPE=voice:${tel}`)
      } else {
        lines.push(`TEL:${tel}`)
      }
    }
  }
  
  // Email addresses
  if (params.email) {
    for (const email of params.email) {
      if (params.version === '4.0') {
        lines.push(`EMAIL:${email}`)
      } else {
        lines.push(`EMAIL;TYPE=INTERNET:${email}`)
      }
    }
  }
  
  // URL
  if (params.url) {
    lines.push(`URL:${params.url}`)
  }
  
  // Addresses
  if (params.adr) {
    for (const adr of params.adr) {
      lines.push(`ADR:${escapeValue(adr)}`)
    }
  }
  
  // Birthday
  if (params.bday) {
    lines.push(`BDAY:${params.bday}`)
  }
  
  // Photo URL
  if (params.photo) {
    if (params.version === '4.0') {
      lines.push(`PHOTO:${params.photo}`)
    } else {
      lines.push(`PHOTO;VALUE=URI:${params.photo}`)
    }
  }
  
  // Note
  if (params.note) {
    lines.push(`NOTE:${escapeValue(params.note)}`)
  }
  
  // Instant messaging
  if (params.impp) {
    lines.push(`IMPP:${params.impp}`)
  }
  
  // UID
  if (params.uid) {
    lines.push(`UID:${params.uid}`)
  }
  
  lines.push('END:VCARD')
  
  return lines.join('\n')
}

// ============================================
// MECARD GENERATOR
// ============================================

/** Generate MeCard string (Japanese format, more compact than vCard) */
export function generateMeCard(params: MeCardHelper): string {
  const escape = (s: string) => s.replace(/[\\";,:]/g, '\\$&')
  
  let mecard = 'MECARD:'
  
  if (params.n) mecard += `N:${escape(params.n)};`
  if (params.nickname) mecard += `NICKNAME:${escape(params.nickname)};`
  if (params.org) mecard += `ORG:${escape(params.org)};`
  if (params.tel) mecard += `TEL:${params.tel};`
  if (params.email) mecard += `EMAIL:${params.email};`
  if (params.url) mecard += `URL:${params.url};`
  if (params.adr) mecard += `ADR:${escape(params.adr)};`
  if (params.bday) mecard += `BDAY:${params.bday.replace(/-/g, '')};`
  if (params.note) mecard += `NOTE:${escape(params.note)};`
  
  mecard += ';'
  return mecard
}

// ============================================
// BIZCARD GENERATOR
// ============================================

/** Generate BizCard format (older format, simple) */
export function generateBizCard(params: BizCardParams): string {
  const lines: string[] = ['BIZCARD:']
  
  if (params.firstName) lines.push(`N:${params.firstName}`)
  if (params.lastName) lines.push(`X:${params.lastName}`)
  if (params.title) lines.push(`T:${params.title}`)
  if (params.company) lines.push(`C:${params.company}`)
  if (params.phone) lines.push(`B:${params.phone}`)
  if (params.email) lines.push(`E:${params.email}`)
  if (params.address) lines.push(`A:${params.address}`)
  
  lines.push(';')
  return lines.join(';')
}

// ============================================
// CALENDAR EVENT GENERATOR
// ============================================

/** Generate iCalendar VEVENT string */
export function generateEvent(params: EventHelper): string {
  const lines: string[] = []
  
  lines.push('BEGIN:VCALENDAR')
  lines.push('VERSION:2.0')
  lines.push('PRODID:-//ANQR//QR Code Generator//EN')
  lines.push('BEGIN:VEVENT')
  
  // Generate UID
  const uid = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@anqr`
  lines.push(`UID:${uid}`)
  
  // Timestamp
  lines.push(`DTSTAMP:${formatICalDate(new Date().toISOString())}`)
  
  // Start time
  if (params.start) {
    const startStr = formatICalDate(params.start)
    if (params.tz) {
      lines.push(`DTSTART;TZID=${params.tz}:${startStr}`)
    } else {
      lines.push(`DTSTART:${startStr}`)
    }
  }
  
  // End time
  if (params.end) {
    const endStr = formatICalDate(params.end)
    if (params.tz) {
      lines.push(`DTEND;TZID=${params.tz}:${endStr}`)
    } else {
      lines.push(`DTEND:${endStr}`)
    }
  }
  
  // Summary (title)
  if (params.summary) {
    lines.push(`SUMMARY:${escapeValue(params.summary)}`)
  }
  
  // Description
  if (params.description) {
    lines.push(`DESCRIPTION:${escapeValue(params.description)}`)
  }
  
  // Location
  if (params.location) {
    lines.push(`LOCATION:${escapeValue(params.location)}`)
  }
  
  // Recurrence rule
  if (params.rrule) {
    lines.push(`RRULE:${params.rrule}`)
  }
  
  lines.push('END:VEVENT')
  lines.push('END:VCALENDAR')
  
  return lines.join('\n')
}

/** Generate calendar subscription URL (webcal://) */
export function generateCalendarSubscription(url: string): string {
  if (url.startsWith('http://')) {
    return url.replace('http://', 'webcal://')
  }
  if (url.startsWith('https://')) {
    return url.replace('https://', 'webcal://')
  }
  return `webcal://${url}`
}

// ============================================
// PAYMENT GENERATORS
// ============================================

/** Generate EPC/SEPA payment QR code (EU bank transfer) */
export function generateEPCSepa(params: EPCSepaParams): string {
  const lines: string[] = []
  
  lines.push('BCD')           // Service tag
  lines.push('002')           // Version
  lines.push('1')             // Character set (UTF-8)
  lines.push('SCT')           // Identification code (SEPA Credit Transfer)
  lines.push(params.bic || '') // BIC
  lines.push(params.name)     // Beneficiary name
  lines.push(params.iban)     // IBAN
  
  // Amount (EUR format)
  if (params.amount !== undefined) {
    lines.push(`EUR${params.amount.toFixed(2)}`)
  } else {
    lines.push('')
  }
  
  lines.push('')              // Purpose (empty)
  lines.push(params.reference || '') // Reference
  lines.push(params.text || '')      // Remittance text
  lines.push('')              // Information
  
  return lines.join('\n')
}

/** Generate UPI payment URI (India) */
export function generateUPI(params: UPIParams): string {
  const queryParams = new URLSearchParams()
  queryParams.set('pa', params.pa)
  
  if (params.pn) queryParams.set('pn', params.pn)
  if (params.am !== undefined) queryParams.set('am', params.am.toString())
  if (params.cu) queryParams.set('cu', params.cu)
  if (params.tn) queryParams.set('tn', params.tn)
  
  return `upi://pay?${queryParams.toString()}`
}

/** Generate PayNow QR code (Singapore) */
export function generatePayNow(params: PayNowParams): string {
  // PayNow uses EMVCo format
  let payload = ''
  
  // Payload Format Indicator
  payload += '000201'
  // Point of Initiation Method (12 = dynamic)
  payload += `010212`
  
  // Merchant Account Information (SGQR)
  const proxyType = params.type === 'mobile' ? '0' : '2'
  const proxyValue = params.value
  const merchantInfo = `0009SG.PAYNOW01${proxyType.length.toString().padStart(2, '0')}${proxyType}02${proxyValue.length.toString().padStart(2, '0')}${proxyValue}0301${params.editable ? '1' : '0'}`
  payload += `26${merchantInfo.length.toString().padStart(2, '0')}${merchantInfo}`
  
  // Transaction Currency (702 = SGD)
  payload += '5303702'
  
  // Transaction Amount
  if (params.amount !== undefined) {
    const amountStr = params.amount.toFixed(2)
    payload += `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`
  }
  
  // Country Code
  payload += '5802SG'
  
  // Additional Data
  if (params.reference) {
    const refField = `05${params.reference.length.toString().padStart(2, '0')}${params.reference}`
    payload += `62${refField.length.toString().padStart(2, '0')}${refField}`
  }
  
  // CRC placeholder
  payload += '6304'
  const crc = crc16CCITT(payload)
  payload += crc
  
  return payload
}

/** Generate PromptPay QR code (Thailand) */
export function generatePromptPay(params: PromptPayParams): string {
  let payload = ''
  
  // Payload Format Indicator
  payload += '000201'
  // Point of Initiation Method
  payload += '010212'
  
  // Merchant Account Information
  let aidPrefix = ''
  let formattedValue = params.value
  
  if (params.type === 'mobile') {
    aidPrefix = 'A000000677010111'
    // Format Thai mobile number with country code
    if (formattedValue.startsWith('0')) {
      formattedValue = '66' + formattedValue.substring(1)
    }
  } else if (params.type === 'id') {
    aidPrefix = 'A000000677010112'
  } else {
    aidPrefix = 'A000000677010114'
  }
  
  const merchantInfo = `00${aidPrefix.length.toString().padStart(2, '0')}${aidPrefix}01${formattedValue.length.toString().padStart(2, '0')}${formattedValue}`
  payload += `29${merchantInfo.length.toString().padStart(2, '0')}${merchantInfo}`
  
  // Transaction Currency (764 = THB)
  payload += '5303764'
  
  // Transaction Amount
  if (params.amount !== undefined) {
    const amountStr = params.amount.toFixed(2)
    payload += `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`
  }
  
  // Country Code
  payload += '5802TH'
  
  // CRC
  payload += '6304'
  const crc = crc16CCITT(payload)
  payload += crc
  
  return payload
}

/** Generate PIX QR code (Brazil) */
export function generatePIX(params: PIXParams): string {
  let payload = ''
  
  // Payload Format Indicator
  payload += '000201'
  
  // Merchant Account Information
  const gui = 'br.gov.bcb.pix'
  let merchantInfo = `00${gui.length.toString().padStart(2, '0')}${gui}`
  merchantInfo += `01${params.key.length.toString().padStart(2, '0')}${params.key}`
  payload += `26${merchantInfo.length.toString().padStart(2, '0')}${merchantInfo}`
  
  // Merchant Category Code
  payload += '52040000'
  
  // Transaction Currency (986 = BRL)
  payload += '5303986'
  
  // Transaction Amount
  if (params.amount !== undefined) {
    const amountStr = params.amount.toFixed(2)
    payload += `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`
  }
  
  // Country Code
  payload += '5802BR'
  
  // Merchant Name
  if (params.name) {
    const name = params.name.substring(0, 25)
    payload += `59${name.length.toString().padStart(2, '0')}${name}`
  }
  
  // Merchant City
  if (params.city) {
    const city = params.city.substring(0, 15)
    payload += `60${city.length.toString().padStart(2, '0')}${city}`
  }
  
  // Additional Data (txid)
  if (params.txid) {
    const txidField = `05${params.txid.length.toString().padStart(2, '0')}${params.txid}`
    payload += `62${txidField.length.toString().padStart(2, '0')}${txidField}`
  }
  
  // CRC
  payload += '6304'
  const crc = crc16CCITT(payload)
  payload += crc
  
  return payload
}

/** Generate cryptocurrency payment URI */
export function generateCrypto(params: CryptoHelper): string {
  let uri = `${params.type}:${params.address}`
  
  const queryParams = new URLSearchParams()
  if (params.amount !== undefined) {
    queryParams.set('amount', params.amount.toString())
  }
  if (params.label) {
    queryParams.set('label', params.label)
  }
  
  const paramStr = queryParams.toString()
  if (paramStr) {
    uri += `?${paramStr}`
  }
  
  return uri
}

// ============================================
// ENTERPRISE/INDUSTRIAL GENERATORS
// ============================================

/** Generate GS1 Digital Link URI */
export function generateGS1DigitalLink(params: GS1DigitalLinkParams): string {
  const baseUrl = params.baseUrl || 'https://id.gs1.org'
  let uri = `${baseUrl}/01/${params.gtin}`
  
  const pathSegments: string[] = []
  if (params.lot) pathSegments.push(`10/${params.lot}`)
  if (params.ser) pathSegments.push(`21/${params.ser}`)
  if (params.expiry) pathSegments.push(`17/${params.expiry}`)
  
  if (pathSegments.length > 0) {
    uri += '/' + pathSegments.join('/')
  }
  
  return uri
}

/** Generate OTPAuth URI (TOTP/HOTP) */
export function generateOTPAuth(params: OTPAuthParams): string {
  const type = params.type || 'totp'
  const label = params.issuer && params.account 
    ? `${encodeURIComponent(params.issuer)}:${encodeURIComponent(params.account)}`
    : encodeURIComponent(params.account || 'user')
  
  let uri = `otpauth://${type}/${label}`
  
  const queryParams = new URLSearchParams()
  queryParams.set('secret', params.secret)
  
  if (params.issuer) queryParams.set('issuer', params.issuer)
  if (params.algorithm && params.algorithm !== 'SHA1') {
    queryParams.set('algorithm', params.algorithm)
  }
  if (params.digits && params.digits !== 6) {
    queryParams.set('digits', params.digits.toString())
  }
  if (type === 'totp' && params.period && params.period !== 30) {
    queryParams.set('period', params.period.toString())
  }
  if (type === 'hotp' && params.counter !== undefined) {
    queryParams.set('counter', params.counter.toString())
  }
  
  return `${uri}?${queryParams.toString()}`
}

// ============================================
// SOCIAL/MESSAGING GENERATORS
// ============================================

/** Generate social profile deep link */
export function generateSocialProfile(
  platform: string,
  username: string
): string {
  const platformLinks: Record<string, (u: string) => string> = {
    twitter: (u) => `https://twitter.com/${u}`,
    x: (u) => `https://x.com/${u}`,
    instagram: (u) => `https://instagram.com/${u}`,
    facebook: (u) => `https://facebook.com/${u}`,
    linkedin: (u) => `https://linkedin.com/in/${u}`,
    github: (u) => `https://github.com/${u}`,
    youtube: (u) => `https://youtube.com/@${u}`,
    tiktok: (u) => `https://tiktok.com/@${u}`,
    snapchat: (u) => `https://snapchat.com/add/${u}`,
    pinterest: (u) => `https://pinterest.com/${u}`,
    reddit: (u) => `https://reddit.com/u/${u}`,
    discord: (u) => `https://discord.gg/${u}`,
    twitch: (u) => `https://twitch.tv/${u}`,
  }
  
  const generator = platformLinks[platform.toLowerCase()]
  if (generator) {
    return generator(username)
  }
  
  return `https://${platform}.com/${username}`
}

/** Generate messaging app deep link */
export function generateMessagingLink(
  platform: string,
  identifier: string,
  message?: string
): string {
  switch (platform.toLowerCase()) {
    case 'whatsapp': {
      let url = `https://wa.me/${identifier.replace(/[^0-9]/g, '')}`
      if (message) url += `?text=${encodeURIComponent(message)}`
      return url
    }
    case 'telegram': {
      let url = `https://t.me/${identifier}`
      if (message) url += `?text=${encodeURIComponent(message)}`
      return url
    }
    case 'signal':
      return `https://signal.me/#p/${identifier}`
    case 'viber':
      return `viber://chat?number=${identifier.replace(/[^0-9]/g, '')}`
    case 'line':
      return `https://line.me/ti/p/${identifier}`
    case 'wechat':
      return `weixin://dl/chat?${identifier}`
    case 'skype':
      return `skype:${identifier}?chat`
    default:
      return identifier
  }
}

/** Generate app deep link (Android intent or iOS universal link) */
export function generateAppDeepLink(
  platform: 'android' | 'ios' | 'universal',
  params: {
    scheme?: string
    host?: string
    path?: string
    package?: string
    fallbackUrl?: string
  }
): string {
  if (platform === 'android' && params.package) {
    // Android intent URL
    let intent = `intent://${params.host || ''}${params.path || ''}#Intent;`
    if (params.scheme) intent += `scheme=${params.scheme};`
    intent += `package=${params.package};`
    if (params.fallbackUrl) {
      intent += `S.browser_fallback_url=${encodeURIComponent(params.fallbackUrl)};`
    }
    intent += 'end'
    return intent
  }
  
  // iOS/Universal link
  if (params.scheme) {
    return `${params.scheme}://${params.host || ''}${params.path || ''}`
  }
  
  return `https://${params.host || ''}${params.path || ''}`
}

// ============================================
// EXPORT ALL
// ============================================

export const PayloadGenerators = {
  // Core
  url: generateUrl,
  tel: generateTel,
  email: generateEmail,
  sms: generateSms,
  geo: generateGeo,
  wifi: generateWifi,
  
  // Contact
  vcard: generateVCard,
  mecard: generateMeCard,
  bizcard: generateBizCard,
  
  // Calendar
  event: generateEvent,
  calendarSubscription: generateCalendarSubscription,
  
  // Payments
  epcSepa: generateEPCSepa,
  upi: generateUPI,
  paynow: generatePayNow,
  promptpay: generatePromptPay,
  pix: generatePIX,
  crypto: generateCrypto,
  
  // Enterprise
  gs1DigitalLink: generateGS1DigitalLink,
  otpauth: generateOTPAuth,
  
  // Social/Messaging
  socialProfile: generateSocialProfile,
  messagingLink: generateMessagingLink,
  appDeepLink: generateAppDeepLink,
}

export default PayloadGenerators
