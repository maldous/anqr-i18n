/**
 * Exporter Module
 * Handles PNG, WebP, GIF, and SVG export with full color support
 * Uses gifenc npm package for high-quality GIF encoding
 */

import { GIFEncoder, quantize, applyPalette } from 'gifenc'

// ============================================
// TYPES
// ============================================

export type OutputFormat = 'png' | 'webp' | 'gif' | 'svg' | 'jpeg'

export interface ExportConfig {
  outputFormat: OutputFormat
  outputWidth: number
  outputHeight: number
  outputQuality: number // 0-1
  filename: string
  animationSpeed: number // ms per frame
  loopAnimation: boolean
  transparentBackground: boolean
  dpi: number
  includeMetadata: boolean
  metadata?: {
    title?: string
    author?: string
    copyright?: string
    description?: string
  }
}

export interface ExportResult {
  blob: Blob
  url: string
  filename: string
  format: OutputFormat
  width: number
  height: number
}

// ============================================
// IMAGE EXPORT
// ============================================

/**
 * Export canvas as PNG or WebP image
 */
export async function exportImage(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {}
): Promise<ExportResult> {
  const opts: ExportConfig = {
    outputFormat: config.outputFormat ?? 'png',
    outputWidth: config.outputWidth ?? canvas.width,
    outputHeight: config.outputHeight ?? canvas.height,
    outputQuality: config.outputQuality ?? 0.9,
    filename: config.filename ?? 'anqr-qrcode',
    animationSpeed: config.animationSpeed ?? 100,
    loopAnimation: config.loopAnimation ?? true,
    transparentBackground: config.transparentBackground ?? false,
    dpi: config.dpi ?? 72,
    includeMetadata: config.includeMetadata ?? false,
    metadata: config.metadata,
  }

  const format = opts.outputFormat === 'webp' ? 'image/webp' 
    : opts.outputFormat === 'jpeg' ? 'image/jpeg' 
    : 'image/png'
  
  const quality = opts.outputQuality

  // Scale canvas to output dimensions
  const outputCanvas = document.createElement('canvas')
  outputCanvas.width = opts.outputWidth
  outputCanvas.height = opts.outputHeight
  const ctx = outputCanvas.getContext('2d')!
  
  // Use high quality scaling
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(canvas, 0, 0, opts.outputWidth, opts.outputHeight)

  const blob = await new Promise<Blob>((resolve, reject) => {
    outputCanvas.toBlob(
      (b) => b ? resolve(b) : reject(new Error('Failed to create blob')),
      format,
      quality
    )
  })

  const ext = opts.outputFormat === 'webp' ? 'webp' 
    : opts.outputFormat === 'jpeg' ? 'jpg' 
    : 'png'
  
  const filename = `${opts.filename}.${ext}`
  const url = URL.createObjectURL(blob)

  return {
    blob,
    url,
    filename,
    format: opts.outputFormat,
    width: opts.outputWidth,
    height: opts.outputHeight,
  }
}

/**
 * Download an image from canvas
 */
export async function downloadImage(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {}
): Promise<void> {
  const result = await exportImage(canvas, config)
  downloadUrl(result.url, result.filename)
  URL.revokeObjectURL(result.url)
}

// ============================================
// GIF EXPORT
// ============================================

/**
 * Export animation frames as GIF
 */
export async function exportGif(
  frames: HTMLCanvasElement[],
  config: Partial<ExportConfig> = {}
): Promise<ExportResult> {
  const opts: ExportConfig = {
    outputFormat: 'gif',
    outputWidth: config.outputWidth ?? frames[0]?.width ?? 400,
    outputHeight: config.outputHeight ?? frames[0]?.height ?? 400,
    outputQuality: config.outputQuality ?? 0.9,
    filename: config.filename ?? 'anqr-qrcode',
    animationSpeed: config.animationSpeed ?? 100,
    loopAnimation: config.loopAnimation ?? true,
    transparentBackground: config.transparentBackground ?? false,
    dpi: config.dpi ?? 72,
    includeMetadata: config.includeMetadata ?? false,
    metadata: config.metadata,
  }

  const width = opts.outputWidth
  const height = opts.outputHeight
  const delay = opts.animationSpeed
  const repeat = opts.loopAnimation ? 0 : -1 // 0 = loop forever, -1 = no loop

  // Create GIF encoder
  const gif = GIFEncoder()
  let isFirstFrame = true

  for (const frame of frames) {
    // Scale frame to output dimensions
    const scaled = document.createElement('canvas')
    scaled.width = width
    scaled.height = height
    const ctx = scaled.getContext('2d')!
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(frame, 0, 0, width, height)

    // Get RGBA pixel data
    const imageData = ctx.getImageData(0, 0, width, height)
    const { data } = imageData

    // Quantize to 256 colors using gifenc's built-in quantizer
    const palette = quantize(data, 256)
    
    // Apply palette to get indexed pixel data
    const index = applyPalette(data, palette)

    // Write frame with delay (gifenc uses centiseconds, so divide by 10)
    gif.writeFrame(index, width, height, {
      palette,
      delay: Math.round(delay / 10),
      ...(isFirstFrame && { repeat }),
    })
    isFirstFrame = false
  }

  // Finish encoding
  gif.finish()

  // Get the encoded GIF bytes
  const bytes = gif.bytes()
  const blob = new Blob([bytes], { type: 'image/gif' })
  const filename = `${opts.filename}.gif`
  const url = URL.createObjectURL(blob)

  return {
    blob,
    url,
    filename,
    format: 'gif',
    width,
    height,
  }
}

/**
 * Download animation as GIF
 */
export async function downloadGif(
  frames: HTMLCanvasElement[],
  config: Partial<ExportConfig> = {}
): Promise<void> {
  const result = await exportGif(frames, config)
  downloadUrl(result.url, result.filename)
  URL.revokeObjectURL(result.url)
}

// ============================================
// SVG EXPORT
// ============================================

/**
 * Export canvas as SVG (embedded raster)
 */
export async function exportSvg(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {}
): Promise<ExportResult> {
  const opts: ExportConfig = {
    outputFormat: 'svg',
    outputWidth: config.outputWidth ?? canvas.width,
    outputHeight: config.outputHeight ?? canvas.height,
    outputQuality: config.outputQuality ?? 0.9,
    filename: config.filename ?? 'anqr-qrcode',
    animationSpeed: config.animationSpeed ?? 100,
    loopAnimation: config.loopAnimation ?? true,
    transparentBackground: config.transparentBackground ?? false,
    dpi: config.dpi ?? 72,
    includeMetadata: config.includeMetadata ?? false,
    metadata: config.metadata,
  }

  const dataUrl = canvas.toDataURL('image/png')
  
  let metadata = ''
  if (opts.includeMetadata && opts.metadata) {
    const m = opts.metadata
    if (m.title) metadata += `  <title>${escapeXml(m.title)}</title>\n`
    if (m.description) metadata += `  <desc>${escapeXml(m.description)}</desc>\n`
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${opts.outputWidth}" height="${opts.outputHeight}"
     viewBox="0 0 ${opts.outputWidth} ${opts.outputHeight}">
${metadata}  <image width="${opts.outputWidth}" height="${opts.outputHeight}" xlink:href="${dataUrl}"/>
</svg>`

  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const filename = `${opts.filename}.svg`
  const url = URL.createObjectURL(blob)

  return {
    blob,
    url,
    filename,
    format: 'svg',
    width: opts.outputWidth,
    height: opts.outputHeight,
  }
}

/**
 * Export QR matrix as true vector SVG
 */
export function exportVectorSvg(
  matrix: boolean[][],
  config: {
    moduleSize?: number
    margin?: number
    fgColor?: string
    bgColor?: string
    width?: number
    height?: number
    filename?: string
  } = {}
): ExportResult {
  const moduleCount = matrix.length
  const moduleSize = config.moduleSize ?? 10
  const margin = config.margin ?? 4
  const fgColor = config.fgColor ?? '#000000'
  const bgColor = config.bgColor ?? '#ffffff'
  
  const size = moduleCount * moduleSize + margin * 2 * moduleSize
  const width = config.width ?? size
  const height = config.height ?? size

  let paths = ''
  
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (matrix[row][col]) {
        const x = (col + margin) * moduleSize
        const y = (row + margin) * moduleSize
        paths += `M${x},${y}h${moduleSize}v${moduleSize}h-${moduleSize}z `
      }
    }
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     width="${width}" height="${height}"
     viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <path d="${paths.trim()}" fill="${fgColor}"/>
</svg>`

  const blob = new Blob([svg], { type: 'image/svg+xml' })
  const filename = `${config.filename ?? 'anqr-qrcode'}.svg`
  const url = URL.createObjectURL(blob)

  return {
    blob,
    url,
    filename,
    format: 'svg',
    width,
    height,
  }
}

/**
 * Download canvas as SVG
 */
export async function downloadSvg(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {}
): Promise<void> {
  const result = await exportSvg(canvas, config)
  downloadUrl(result.url, result.filename)
  URL.revokeObjectURL(result.url)
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Download from URL
 */
export function downloadUrl(url: string, filename: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Convert canvas to blob
 */
export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string = 'image/png',
  quality: number = 0.9
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
      format,
      quality
    )
  })
}

// ============================================
// LEGACY CLASS EXPORT (for backwards compatibility)
// ============================================

export class Exporter {
  async downloadImage(canvas: HTMLCanvasElement, config: Partial<ExportConfig>): Promise<void> {
    return downloadImage(canvas, config)
  }

  async downloadGif(frames: HTMLCanvasElement[], config: Partial<ExportConfig>): Promise<void> {
    return downloadGif(frames, config)
  }

  async downloadSvg(canvas: HTMLCanvasElement, config: Partial<ExportConfig>): Promise<void> {
    return downloadSvg(canvas, config)
  }

  downloadUrl(url: string, filename: string): void {
    return downloadUrl(url, filename)
  }
}

// ============================================
// EXPORT
// ============================================

export const ExporterModule = {
  // Image export
  exportImage,
  downloadImage,
  
  // GIF export
  exportGif,
  downloadGif,
  
  // SVG export
  exportSvg,
  exportVectorSvg,
  downloadSvg,
  
  // Utilities
  downloadUrl,
  canvasToBlob,
  
  // Legacy class
  Exporter,
}

export default ExporterModule
