/**
 * Share Utilities Module
 * Handles URL parameter encoding/decoding, sharing, and embed code generation
 */

// ============================================
// TYPES
// ============================================

export interface ShareConfig {
  // Content
  data: string
  
  // QR settings
  ec?: string
  version?: number
  size?: number
  margin?: number
  
  // Colors
  fg?: string
  bg?: string
  transparent?: boolean
  
  // Styles
  style?: string
  finder?: string
  
  // Overlay
  mode?: string
  intensity?: number
  logoSize?: number
  
  // Animation
  speed?: number
  loop?: boolean
  reverse?: boolean
  
  // Output
  width?: number
  height?: number
  format?: string
  quality?: number
  
  // Flag to auto-render
  render?: boolean
}

export interface EmbedOptions {
  width: number
  height: number
  responsive: boolean
  showBorder: boolean
  includeLink: boolean
}

// ============================================
// URL PARAMETER PARSING
// ============================================

/**
 * Parse URL parameters into a config object
 */
export function parseUrlParams(): Partial<ShareConfig> {
  const params = new URLSearchParams(window.location.search)

  return {
    data: params.get('data') || undefined,
    ec: params.get('ec') || undefined,
    version: params.get('v') ? parseInt(params.get('v')!, 10) : undefined,
    size: params.get('size') ? parseInt(params.get('size')!, 10) : undefined,
    margin: params.get('margin') ? parseInt(params.get('margin')!, 10) : undefined,
    fg: params.get('fg') ? `#${params.get('fg')}` : undefined,
    bg: params.get('bg') ? `#${params.get('bg')}` : undefined,
    transparent: params.get('transparent') === '1',
    style: params.get('style') || undefined,
    finder: params.get('finder') || undefined,
    mode: params.get('mode') || undefined,
    intensity: params.get('intensity') ? parseInt(params.get('intensity')!, 10) : undefined,
    logoSize: params.get('logoSize') ? parseInt(params.get('logoSize')!, 10) : undefined,
    speed: params.get('speed') ? parseInt(params.get('speed')!, 10) : undefined,
    loop: params.get('loop') !== '0',
    reverse: params.get('reverse') === '1',
    width: params.get('w') ? parseInt(params.get('w')!, 10) : undefined,
    height: params.get('h') ? parseInt(params.get('h')!, 10) : undefined,
    format: params.get('format') || undefined,
    quality: params.get('quality') ? parseFloat(params.get('quality')!) : undefined,
    render: params.get('render') === '1',
  }
}

/**
 * Build URL parameters from a config object
 */
export function buildUrlParams(config: Partial<ShareConfig>): string {
  const params = new URLSearchParams()

  // Required
  if (config.data) {
    params.set('data', config.data)
  }

  // Basic settings
  if (config.ec && config.ec !== 'Q') {
    params.set('ec', config.ec)
  }
  if (config.version && config.version !== 0) {
    params.set('v', config.version.toString())
  }
  if (config.size && config.size !== 8) {
    params.set('size', config.size.toString())
  }
  if (config.margin !== undefined && config.margin !== 4) {
    params.set('margin', config.margin.toString())
  }

  // Colors
  if (config.fg && config.fg !== '#000000') {
    params.set('fg', config.fg.replace('#', ''))
  }
  if (config.bg && config.bg !== '#ffffff') {
    params.set('bg', config.bg.replace('#', ''))
  }
  if (config.transparent) {
    params.set('transparent', '1')
  }

  // Styles
  if (config.style && config.style !== 'square') {
    params.set('style', config.style)
  }
  if (config.finder && config.finder !== 'square') {
    params.set('finder', config.finder)
  }

  // Overlay
  if (config.mode && config.mode !== 'halftone') {
    params.set('mode', config.mode)
  }
  if (config.intensity !== undefined && config.intensity !== 50) {
    params.set('intensity', config.intensity.toString())
  }
  if (config.logoSize !== undefined && config.logoSize !== 25) {
    params.set('logoSize', config.logoSize.toString())
  }

  // Animation
  if (config.speed !== undefined && config.speed !== 100) {
    params.set('speed', config.speed.toString())
  }
  if (config.loop === false) {
    params.set('loop', '0')
  }
  if (config.reverse) {
    params.set('reverse', '1')
  }

  // Output
  if (config.width && config.width !== 400) {
    params.set('w', config.width.toString())
  }
  if (config.height && config.height !== 400) {
    params.set('h', config.height.toString())
  }
  if (config.format && config.format !== 'png') {
    params.set('format', config.format)
  }
  if (config.quality !== undefined && config.quality !== 0.9) {
    params.set('quality', config.quality.toString())
  }

  // Auto-render flag
  if (config.render) {
    params.set('render', '1')
  }

  return params.toString()
}

/**
 * Update the browser URL without reloading
 */
export function updateBrowserUrl(config: Partial<ShareConfig>): void {
  const params = buildUrlParams(config)
  const newUrl = window.location.pathname + (params ? '?' + params : '')
  window.history.replaceState({}, '', newUrl)
}

/**
 * Get the full shareable URL
 */
export function getShareableUrl(config: Partial<ShareConfig>, baseUrl?: string): string {
  const base = baseUrl || window.location.origin + window.location.pathname
  const params = buildUrlParams(config)
  return params ? `${base}?${params}` : base
}

// ============================================
// EMBED CODE GENERATION
// ============================================

/**
 * Generate HTML embed code for an image
 */
export function generateImageEmbed(
  imageUrl: string,
  alt: string = 'QR Code',
  options: Partial<EmbedOptions> = {}
): string {
  const opts: EmbedOptions = {
    width: options.width ?? 200,
    height: options.height ?? 200,
    responsive: options.responsive ?? false,
    showBorder: options.showBorder ?? false,
    includeLink: options.includeLink ?? false,
  }

  const style = opts.responsive
    ? 'max-width: 100%; height: auto;'
    : `width: ${opts.width}px; height: ${opts.height}px;`
  
  const border = opts.showBorder ? ' border: 1px solid #ccc;' : ''

  const imgTag = `<img src="${imageUrl}" alt="${alt}" style="${style}${border}" />`

  if (opts.includeLink) {
    return `<a href="${imageUrl}" target="_blank">${imgTag}</a>`
  }

  return imgTag
}

/**
 * Generate iframe embed code
 */
export function generateIframeEmbed(
  url: string,
  options: Partial<EmbedOptions> = {}
): string {
  const opts: EmbedOptions = {
    width: options.width ?? 300,
    height: options.height ?? 300,
    responsive: options.responsive ?? false,
    showBorder: options.showBorder ?? false,
    includeLink: options.includeLink ?? false,
  }

  const style = opts.responsive
    ? 'width: 100%; aspect-ratio: 1;'
    : `width: ${opts.width}px; height: ${opts.height}px;`
  
  const border = opts.showBorder ? ' border: 1px solid #ccc;' : ' border: none;'

  return `<iframe src="${url}" style="${style}${border}" loading="lazy" title="QR Code"></iframe>`
}

/**
 * Generate markdown embed
 */
export function generateMarkdownEmbed(
  imageUrl: string,
  alt: string = 'QR Code'
): string {
  return `![${alt}](${imageUrl})`
}

/**
 * Generate BBCode embed
 */
export function generateBBCodeEmbed(
  imageUrl: string,
  linkUrl?: string
): string {
  if (linkUrl) {
    return `[url=${linkUrl}][img]${imageUrl}[/img][/url]`
  }
  return `[img]${imageUrl}[/img]`
}

// ============================================
// SOCIAL SHARING
// ============================================

/**
 * Generate social share URLs
 */
export function getSocialShareUrls(
  url: string,
  title: string = 'Check out this QR code!'
): Record<string, string> {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      document.execCommand('copy')
      return true
    } catch (e) {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * Copy image to clipboard (if supported)
 */
export async function copyImageToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png')
    })

    if (!blob) return false

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    return true
  } catch (err) {
    return false
  }
}

// ============================================
// DATA URL HELPERS
// ============================================

/**
 * Convert canvas to data URL
 */
export function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.9
): string {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
  return canvas.toDataURL(mimeType, quality)
}

/**
 * Convert canvas to Blob
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.9
): Promise<Blob | null> {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
  return new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality))
}

/**
 * Create a download link for a blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ============================================
// QR CODE URL SHORTENING
// ============================================

/**
 * Shorten a URL for smaller QR codes (using common short URL services)
 * Note: This is a client-side helper - actual shortening requires an API
 */
export function estimateQRSize(text: string, ecc: 'L' | 'M' | 'Q' | 'H' = 'Q'): number {
  const capacities: Record<string, number[]> = {
    L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520],
    M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412],
    Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292],
    H: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220],
  }

  const caps = capacities[ecc]
  const len = text.length

  for (let v = 0; v < caps.length; v++) {
    if (caps[v] >= len) {
      return v + 1
    }
  }

  return 40 // Maximum version
}

// ============================================
// EXPORT
// ============================================

export const ShareUtils = {
  // URL params
  parseUrlParams,
  buildUrlParams,
  updateBrowserUrl,
  getShareableUrl,
  
  // Embed codes
  generateImageEmbed,
  generateIframeEmbed,
  generateMarkdownEmbed,
  generateBBCodeEmbed,
  
  // Social
  getSocialShareUrls,
  copyToClipboard,
  copyImageToClipboard,
  
  // Data
  canvasToDataUrl,
  canvasToBlob,
  downloadBlob,
  estimateQRSize,
}

export default ShareUtils
