/**
 * Overlay Processor Module
 * Handles image loading, cropping, filter application, and blend modes
 * 
 * Optimizations:
 * - Uses Web Worker for CPU-heavy dithering on large images (>256x256)
 * - Caches processed overlay data for repeated access
 */

import type { ColorMode, FitMode, OverlayMode, CropRegion, DitherKind, DiffusionKernel, OrderedMatrix } from '../store/qr-store'
import { applyFilters, copyImageData, getBrightnessMap, getRGBMap, type FilterOptions, type RGB } from './image-filters'
import { applyDither, type DitherOptions, type DitherResult } from './dither-algorithms'

// ============================================
// MOBILE DETECTION
// ============================================

let _isMobile: boolean | null = null

/**
 * Detect if running on a mobile device
 * Caches result for performance
 */
function isMobile(): boolean {
  if (_isMobile !== null) return _isMobile
  
  if (typeof navigator === 'undefined') {
    _isMobile = false
    return false
  }
  
  // Check user agent for mobile indicators
  const ua = navigator.userAgent || ''
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  
  // Also check for touch capability as a secondary signal
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Consider mobile if user agent matches OR if it's a touch device with small screen
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768
  
  _isMobile = isMobileUA || (hasTouch && isSmallScreen)
  return _isMobile
}

// ============================================
// TYPES
// ============================================

export interface OverlayOptions {
  // Source
  file?: File | null
  url?: string
  canvas?: HTMLCanvasElement
  
  // Transform
  cropRegion?: CropRegion
  fit: FitMode
  rotateDeg: number
  flipX: boolean
  flipY: boolean
  
  // Preprocessing
  colorMode: ColorMode
  invert: boolean
  brightness: number
  contrast: number
  gamma: number
  saturation: number
  hueRotateDeg: number
  blurPx: number
  sharpen: number
  posterizeLevels: number
  threshold?: number
  edgeDetect: 'off' | 'sobel' | 'canny'
  
  // Blend
  mode: OverlayMode
  intensity: number
  preserveFinders: boolean
  preserveTiming: boolean
  preserveAlignment: boolean
}

export interface ProcessedOverlay {
  canvas: HTMLCanvasElement
  brightness: number[][]
  colors: RGB[][]
  width: number
  height: number
}

// ============================================
// IMAGE LOADING
// ============================================

/**
 * Load an image from a File object
 */
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Load an image from a URL
 */
export function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * Load an image from a data URL
 */
export function loadImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = dataUrl
  })
}

// ============================================
// CROPPING
// ============================================

/**
 * Apply crop region to an image
 */
export function cropImage(
  source: HTMLImageElement | HTMLCanvasElement,
  cropRegion: CropRegion,
  outputSize: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = outputSize
  canvas.height = outputSize
  const ctx = canvas.getContext('2d')!

  const sourceWidth = source instanceof HTMLImageElement ? source.naturalWidth : source.width
  const sourceHeight = source instanceof HTMLImageElement ? source.naturalHeight : source.height

  // Calculate crop dimensions
  const cropSize = Math.min(sourceWidth, sourceHeight) * cropRegion.size
  const cropX = cropRegion.x * sourceWidth - cropSize / 2
  const cropY = cropRegion.y * sourceHeight - cropSize / 2

  ctx.drawImage(
    source,
    Math.max(0, cropX),
    Math.max(0, cropY),
    cropSize,
    cropSize,
    0,
    0,
    outputSize,
    outputSize
  )

  return canvas
}

/**
 * Apply fit mode to resize an image
 */
export function fitImage(
  source: HTMLImageElement | HTMLCanvasElement,
  targetSize: number,
  fit: FitMode
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = targetSize
  canvas.height = targetSize
  const ctx = canvas.getContext('2d')!

  const sourceWidth = source instanceof HTMLImageElement ? source.naturalWidth : source.width
  const sourceHeight = source instanceof HTMLImageElement ? source.naturalHeight : source.height

  let sx = 0, sy = 0, sw = sourceWidth, sh = sourceHeight
  let dx = 0, dy = 0, dw = targetSize, dh = targetSize

  switch (fit) {
    case 'cover': {
      const scale = Math.max(targetSize / sourceWidth, targetSize / sourceHeight)
      sw = targetSize / scale
      sh = targetSize / scale
      sx = (sourceWidth - sw) / 2
      sy = (sourceHeight - sh) / 2
      break
    }
    case 'contain': {
      const scale = Math.min(targetSize / sourceWidth, targetSize / sourceHeight)
      dw = sourceWidth * scale
      dh = sourceHeight * scale
      dx = (targetSize - dw) / 2
      dy = (targetSize - dh) / 2
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, targetSize, targetSize)
      break
    }
    case 'stretch':
    default:
      break
  }

  ctx.drawImage(source, sx, sy, sw, sh, dx, dy, dw, dh)
  return canvas
}

// ============================================
// TRANSFORMS
// ============================================

/**
 * Apply rotation to a canvas
 */
export function rotateCanvas(
  source: HTMLCanvasElement,
  degrees: number
): HTMLCanvasElement {
  if (degrees === 0) return source

  const canvas = document.createElement('canvas')
  canvas.width = source.width
  canvas.height = source.height
  const ctx = canvas.getContext('2d')!

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((degrees * Math.PI) / 180)
  ctx.drawImage(source, -source.width / 2, -source.height / 2)

  return canvas
}

/**
 * Apply flip to a canvas
 */
export function flipCanvas(
  source: HTMLCanvasElement,
  flipX: boolean,
  flipY: boolean
): HTMLCanvasElement {
  if (!flipX && !flipY) return source

  const canvas = document.createElement('canvas')
  canvas.width = source.width
  canvas.height = source.height
  const ctx = canvas.getContext('2d')!

  ctx.translate(flipX ? source.width : 0, flipY ? source.height : 0)
  ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1)
  ctx.drawImage(source, 0, 0)

  return canvas
}

// ============================================
// PROCESSING PIPELINE
// ============================================

/**
 * Process an overlay image through the full pipeline
 */
export async function processOverlay(
  source: HTMLImageElement | HTMLCanvasElement,
  targetSize: number,
  options: Partial<OverlayOptions> = {}
): Promise<ProcessedOverlay> {
  const opts: OverlayOptions = {
    fit: options.fit ?? 'cover',
    rotateDeg: options.rotateDeg ?? 0,
    flipX: options.flipX ?? false,
    flipY: options.flipY ?? false,
    colorMode: options.colorMode ?? 'color',
    invert: options.invert ?? false,
    brightness: options.brightness ?? 0,
    contrast: options.contrast ?? 0,
    gamma: options.gamma ?? 1,
    saturation: options.saturation ?? 0,
    hueRotateDeg: options.hueRotateDeg ?? 0,
    blurPx: options.blurPx ?? 0,
    sharpen: options.sharpen ?? 0,
    posterizeLevels: options.posterizeLevels ?? 0,
    threshold: options.threshold,
    edgeDetect: options.edgeDetect ?? 'off',
    mode: options.mode ?? 'halftone',
    intensity: options.intensity ?? 50,
    preserveFinders: options.preserveFinders ?? true,
    preserveTiming: options.preserveTiming ?? false,
    preserveAlignment: options.preserveAlignment ?? false,
    ...options,
  }

  // Step 1: Apply crop if specified
  let canvas: HTMLCanvasElement
  if (opts.cropRegion) {
    canvas = cropImage(source, opts.cropRegion, targetSize)
  } else {
    canvas = fitImage(source, targetSize, opts.fit)
  }

  // Step 2: Apply transforms
  canvas = rotateCanvas(canvas, opts.rotateDeg)
  canvas = flipCanvas(canvas, opts.flipX, opts.flipY)

  // Step 3: Apply filters
  const ctx = canvas.getContext('2d')!
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const filterOpts: FilterOptions = {
    brightness: opts.brightness,
    contrast: opts.contrast,
    gamma: opts.gamma,
    saturation: opts.saturation,
    hueRotate: opts.hueRotateDeg,
    invert: opts.invert,
    blur: opts.blurPx,
    sharpen: opts.sharpen,
    posterize: opts.posterizeLevels,
    threshold: opts.threshold,
    edgeDetect: opts.edgeDetect,
    colorMode: opts.colorMode,
  }

  applyFilters(imageData, filterOpts)
  ctx.putImageData(imageData, 0, 0)

  // Step 4: Extract brightness and color data
  const finalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const brightnessMap = getBrightnessMap(finalImageData)
  const colorMap = getRGBMap(finalImageData)

  return {
    canvas,
    brightness: brightnessMap,
    colors: colorMap,
    width: canvas.width,
    height: canvas.height,
  }
}

// ============================================
// OVERLAY DATA EXTRACTION
// ============================================

/**
 * Get overlay data at a specific resolution (for QR module mapping)
 */
export function getOverlayData(
  overlayCanvas: HTMLCanvasElement,
  moduleCount: number,
  colorMode: ColorMode = 'color'
): { brightness: number[][]; colors: string[][] } {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = moduleCount
  tempCanvas.height = moduleCount
  const ctx = tempCanvas.getContext('2d')!

  ctx.drawImage(overlayCanvas, 0, 0, moduleCount, moduleCount)

  const imageData = ctx.getImageData(0, 0, moduleCount, moduleCount)
  const data = imageData.data

  const brightness: number[][] = []
  const colors: string[][] = []

  for (let row = 0; row < moduleCount; row++) {
    brightness[row] = []
    colors[row] = []

    for (let col = 0; col < moduleCount; col++) {
      const i = (row * moduleCount + col) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114)
      brightness[row][col] = gray / 255

      if (colorMode === 'bw') {
        const bw = gray > 127 ? 255 : 0
        colors[row][col] = `rgb(${bw},${bw},${bw})`
      } else if (colorMode === 'grayscale') {
        colors[row][col] = `rgb(${gray},${gray},${gray})`
      } else {
        colors[row][col] = `rgb(${r},${g},${b})`
      }
    }
  }

  return { brightness, colors }
}

/**
 * Get overlay data as RGB arrays
 */
export function getOverlayRGBData(
  overlayCanvas: HTMLCanvasElement,
  moduleCount: number
): { brightness: number[][]; colors: RGB[][] } {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = moduleCount
  tempCanvas.height = moduleCount
  const ctx = tempCanvas.getContext('2d')!

  ctx.drawImage(overlayCanvas, 0, 0, moduleCount, moduleCount)

  const imageData = ctx.getImageData(0, 0, moduleCount, moduleCount)
  const data = imageData.data

  const brightness: number[][] = []
  const colors: RGB[][] = []

  for (let row = 0; row < moduleCount; row++) {
    brightness[row] = []
    colors[row] = []

    for (let col = 0; col < moduleCount; col++) {
      const i = (row * moduleCount + col) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      brightness[row][col] = (r * 0.299 + g * 0.587 + b * 0.114) / 255
      colors[row][col] = { r, g, b }
    }
  }

  return { brightness, colors }
}

// ============================================
// BLEND MODE HELPERS
// ============================================

/**
 * Apply an overlay mode to blend image with QR data
 */
export function applyOverlayMode(
  qrMatrix: boolean[][],
  overlayBrightness: number[][],
  overlayColors: RGB[][],
  mode: OverlayMode,
  intensity: number,
  fgColor: string,
  bgColor: string
): { matrix: boolean[][]; colors: RGB[][] } {
  const moduleCount = qrMatrix.length
  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []
  const intensityFactor = intensity / 100

  for (let row = 0; row < moduleCount; row++) {
    resultMatrix[row] = []
    resultColors[row] = []

    for (let col = 0; col < moduleCount; col++) {
      const isDark = qrMatrix[row][col]
      const brightness = overlayBrightness[row]?.[col] ?? 0.5
      const color = overlayColors[row]?.[col] ?? { r: 0, g: 0, b: 0 }

      switch (mode) {
        case 'halftone': {
          resultMatrix[row][col] = isDark
          if (isDark) {
            const shade = Math.round(brightness * 255 * intensityFactor)
            resultColors[row][col] = { r: shade, g: shade, b: shade }
          } else {
            resultColors[row][col] = { r: 255, g: 255, b: 255 }
          }
          break
        }

        case 'blend': {
          resultMatrix[row][col] = isDark
          if (isDark) {
            resultColors[row][col] = {
              r: Math.round(color.r * intensityFactor),
              g: Math.round(color.g * intensityFactor),
              b: Math.round(color.b * intensityFactor),
            }
          } else {
            resultColors[row][col] = { r: 255, g: 255, b: 255 }
          }
          break
        }

        case 'mosaic': {
          resultMatrix[row][col] = isDark
          if (isDark) {
            resultColors[row][col] = {
              r: Math.round(color.r * 0.7),
              g: Math.round(color.g * 0.7),
              b: Math.round(color.b * 0.7),
            }
          } else {
            const lightFactor = 0.4 + (1 - intensityFactor) * 0.4
            resultColors[row][col] = {
              r: Math.round(255 - (255 - color.r) * lightFactor),
              g: Math.round(255 - (255 - color.g) * lightFactor),
              b: Math.round(255 - (255 - color.b) * lightFactor),
            }
          }
          break
        }

        case 'brightness': {
          const threshold = (100 - intensity) / 100
          if (isDark && brightness > threshold) {
            resultMatrix[row][col] = false
            resultColors[row][col] = { r: 255, g: 255, b: 255 }
          } else {
            resultMatrix[row][col] = isDark
            resultColors[row][col] = isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }
          }
          break
        }

        case 'duotone': {
          resultMatrix[row][col] = isDark
          if (isDark) {
            if (brightness > 0.5) {
              resultColors[row][col] = { r: 80, g: 80, b: 80 }
            } else {
              resultColors[row][col] = { r: 0, g: 0, b: 0 }
            }
          } else {
            resultColors[row][col] = { r: 255, g: 255, b: 255 }
          }
          break
        }

        default: {
          resultMatrix[row][col] = isDark
          resultColors[row][col] = isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }
        }
      }
    }
  }

  return { matrix: resultMatrix, colors: resultColors }
}

// ============================================
// DITHERING WITH WORKER SUPPORT
// ============================================

/**
 * Options for dithering an overlay image
 */
export interface OverlayDitherOptions {
  kind: DitherKind
  strength: number
  serpentine: boolean
  diffusionKernel: DiffusionKernel
  orderedMatrix: OrderedMatrix
  colorMode: ColorMode
  levels?: number
  blueNoiseSeed?: number
  blueNoiseTileSize?: number

}

// Default cheap dither for mobile when user hasn't explicitly selected one
export const DEFAULT_MOBILE_DITHER: DitherKind = 'ordered_bayer'

// Default dither in the store (used to detect if user changed it)
export const STORE_DEFAULT_DITHER: DitherKind = 'error_diffusion'

/**
 * Get effective dither kind for current device
 * On mobile, if the dither is still at the store default (error_diffusion),
 * use the cheap mobile default instead. If user explicitly changed it, honor their choice.
 * 
 * @param kind - The current dither kind from settings
 * @param isStoreDefault - Whether this is still the store's default value (user hasn't changed it)
 */
export function getEffectiveDitherKind(kind: DitherKind, isStoreDefault: boolean = false): DitherKind {
  // If on mobile and user hasn't changed from store default, use cheap mobile default
  if (isMobile() && isStoreDefault && kind === STORE_DEFAULT_DITHER) {
    return DEFAULT_MOBILE_DITHER
  }
  // Otherwise honor user's choice
  return kind
}

/**
 * Apply dithering to an overlay canvas
 * Automatically uses Web Worker for large images (>256x256)
 * On mobile, expensive algorithms are auto-switched to faster alternatives
 * @param canvas - Source canvas to dither
 * @param options - Dithering options
 * @returns Promise<DitherResult> with matrix and colors
 */
export async function ditherOverlay(
  canvas: HTMLCanvasElement,
  options: OverlayDitherOptions
): Promise<DitherResult> {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas context')
  }
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  
  // Use the kind as-is - mobile optimization should be applied at config level
  // via getEffectiveDitherKind() before calling this function
  const effectiveKind = options.kind
  
  // Build full dither options
  const ditherOpts: DitherOptions = {
    kind: effectiveKind,
    strength: options.strength,
    serpentine: options.serpentine,
    diffusionKernel: options.diffusionKernel,
    orderedMatrix: options.orderedMatrix,
    colorMode: options.colorMode === 'color' ? 'color' : options.colorMode === 'grayscale' ? 'grayscale' : 'bw',
    levels: options.levels ?? 2,
    blueNoiseSeed: options.blueNoiseSeed ?? 0,
    blueNoiseTileSize: options.blueNoiseTileSize ?? 64,
  }
  
  // Always use direct dithering on main thread (workers degraded performance)
  return applyDither(imageData, ditherOpts)
}

/**
 * Apply dithering to overlay at module resolution (for QR code integration)
 * @param overlayCanvas - Source overlay image
 * @param moduleCount - Number of QR modules (determines output resolution)
 * @param options - Dithering options
 * @returns Promise<DitherResult> at module resolution
 */
export async function ditherOverlayForQR(
  overlayCanvas: HTMLCanvasElement,
  moduleCount: number,
  options: OverlayDitherOptions
): Promise<DitherResult> {
  // First resize to module resolution
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = moduleCount
  tempCanvas.height = moduleCount
  const ctx = tempCanvas.getContext('2d')!
  ctx.drawImage(overlayCanvas, 0, 0, moduleCount, moduleCount)
  
  // Then apply dithering
  return ditherOverlay(tempCanvas, options)
}

// ============================================
// EXPORT
// ============================================

export const OverlayProcessor = {
  // Loading
  loadImageFromFile,
  loadImageFromUrl,
  loadImageFromDataUrl,
  
  // Transforms
  cropImage,
  fitImage,
  rotateCanvas,
  flipCanvas,
  
  // Processing
  processOverlay,
  getOverlayData,
  getOverlayRGBData,
  
  // Blending
  applyOverlayMode,
  
  // Dithering (with worker support)
  ditherOverlay,
  ditherOverlayForQR,
}

export default OverlayProcessor
