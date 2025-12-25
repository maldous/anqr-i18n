/**
 * QR Renderer Module
 * Handles canvas rendering with module styles, finder styles, colors, and gradients
 */

import type { 
  ModuleStyle, FinderStyle, AlignmentStyle, TimingStyle, 
  GapMode, GradientType, GradientStop, FrameStyle 
} from '../store/qr-store'
import { 
  isFinderPattern, isTimingPattern, isAlignmentPattern, 
  getVersionFromModuleCount 
} from './qr-core'
import { getGradientColorAt, parseColor, rgbToHex } from './color-utils'
import type { RGB } from './color-utils'

// ============================================
// TYPES
// ============================================

export interface RenderOptions {
  // Dimensions
  modulePx: number
  margin: number
  
  // Colors
  fgColor: string
  bgColor: string
  bgTransparent: boolean
  
  // Gradient
  gradient?: {
    type: GradientType
    stops: GradientStop[]
    angle?: number
    centerX?: number
    centerY?: number
  }
  
  // Styles
  moduleStyle: ModuleStyle
  finderStyle: FinderStyle
  alignmentStyle: AlignmentStyle
  timingStyle: TimingStyle
  
  // Module rendering
  moduleGapPercent: number
  gapMode: GapMode
  cornerRadius: number
  dotRotationDeg: number
  
  // Eye customization
  eyeOuterStyle: FinderStyle
  eyeInnerStyle: FinderStyle
  eyeScale: number
  
  // Frame
  frameStyle: FrameStyle
  frameText: string
  
  // Quality
  crispEdges: boolean
  pixelSnap: 'floor' | 'round' | 'ceil'
  
  // Contrast
  contrastGuard: boolean
  minContrastRatio: number
}

export interface RenderResult {
  canvas: HTMLCanvasElement
  width: number
  height: number
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function snapPixel(value: number, mode: 'floor' | 'round' | 'ceil'): number {
  switch (mode) {
    case 'floor': return Math.floor(value)
    case 'ceil': return Math.ceil(value)
    default: return Math.round(value)
  }
}

// ============================================
// MODULE DRAWING
// ============================================

/**
 * Draw a single module with the specified style
 */
export function drawModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  style: ModuleStyle,
  cornerRadius: number = 0,
  rotation: number = 0
): void {
  const padding = size * 0.05
  const innerSize = size - padding * 2

  ctx.save()
  
  if (rotation !== 0) {
    ctx.translate(x + size / 2, y + size / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.translate(-(x + size / 2), -(y + size / 2))
  }

  switch (style) {
    case 'rounded': {
      const radius = Math.min(cornerRadius || size * 0.3, innerSize / 2)
      roundRect(ctx, x + padding, y + padding, innerSize, innerSize, radius)
      ctx.fill()
      break
    }

    case 'dots': {
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, innerSize / 2, 0, Math.PI * 2)
      ctx.fill()
      break
    }

    case 'diamond': {
      ctx.beginPath()
      ctx.moveTo(x + size / 2, y + padding)
      ctx.lineTo(x + size - padding, y + size / 2)
      ctx.lineTo(x + size / 2, y + size - padding)
      ctx.lineTo(x + padding, y + size / 2)
      ctx.closePath()
      ctx.fill()
      break
    }

    case 'connected': {
      ctx.fillRect(x, y, size, size)
      break
    }

    case 'square':
    default: {
      ctx.fillRect(x + padding, y + padding, innerSize, innerSize)
      break
    }
  }

  ctx.restore()
}

/**
 * Draw a finder pattern module (7x7 corner patterns)
 */
export function drawFinderModule(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  style: FinderStyle
): void {
  switch (style) {
    case 'rounded': {
      roundRect(ctx, x, y, size, size, size * 0.2)
      ctx.fill()
      break
    }

    case 'circle': {
      ctx.beginPath()
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
      ctx.fill()
      break
    }

    case 'square':
    default: {
      ctx.fillRect(x, y, size, size)
      break
    }
  }
}

/**
 * Draw a rounded rectangle path
 */
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

// ============================================
// COLOR CALCULATION
// ============================================

/**
 * Get the color for a module based on position and gradient settings
 */
export function getModuleColor(
  row: number,
  col: number,
  totalSize: number,
  options: RenderOptions
): string {
  if (!options.gradient || options.gradient.type === 'none') {
    return options.fgColor
  }

  const color = getGradientColorAt(
    {
      type: options.gradient.type,
      stops: options.gradient.stops,
      angle: options.gradient.angle,
      centerX: options.gradient.centerX,
      centerY: options.gradient.centerY,
    },
    col,
    row,
    totalSize,
    totalSize
  )

  return rgbToHex(color.r, color.g, color.b)
}

// ============================================
// MAIN RENDER FUNCTION
// ============================================

/**
 * Render a QR matrix to canvas
 */
export function renderQR(
  matrix: boolean[][],
  options: Partial<RenderOptions> = {}
): RenderResult {
  const opts: RenderOptions = {
    modulePx: options.modulePx ?? 8,
    margin: options.margin ?? 4,
    fgColor: options.fgColor ?? '#000000',
    bgColor: options.bgColor ?? '#ffffff',
    bgTransparent: options.bgTransparent ?? false,
    gradient: options.gradient,
    moduleStyle: options.moduleStyle ?? 'square',
    finderStyle: options.finderStyle ?? 'square',
    alignmentStyle: options.alignmentStyle ?? 'match_finder',
    timingStyle: options.timingStyle ?? 'match_module',
    moduleGapPercent: options.moduleGapPercent ?? 0,
    gapMode: options.gapMode ?? 'none',
    cornerRadius: options.cornerRadius ?? 0,
    dotRotationDeg: options.dotRotationDeg ?? 0,
    eyeOuterStyle: options.eyeOuterStyle ?? 'square',
    eyeInnerStyle: options.eyeInnerStyle ?? 'square',
    eyeScale: options.eyeScale ?? 100,
    frameStyle: options.frameStyle ?? 'none',
    frameText: options.frameText ?? '',
    crispEdges: options.crispEdges ?? true,
    pixelSnap: options.pixelSnap ?? 'floor',
    contrastGuard: options.contrastGuard ?? false,
    minContrastRatio: options.minContrastRatio ?? 4.5,
  }

  const moduleCount = matrix.length
  const moduleSize = opts.modulePx
  const marginPx = opts.margin * moduleSize
  const size = moduleCount * moduleSize + marginPx * 2

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // Set rendering quality
  ctx.imageSmoothingEnabled = !opts.crispEdges

  // Draw background
  if (!opts.bgTransparent) {
    ctx.fillStyle = opts.bgColor
    ctx.fillRect(0, 0, size, size)
  }

  // Calculate version for structural element detection
  const version = getVersionFromModuleCount(moduleCount)

  // Draw modules
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      const isDark = matrix[row][col]
      if (!isDark && opts.gapMode !== 'negative_space') continue

      const x = snapPixel(marginPx + col * moduleSize, opts.pixelSnap)
      const y = snapPixel(marginPx + row * moduleSize, opts.pixelSnap)

      // Determine module type and style
      const isFinder = isFinderPattern(row, col, moduleCount)
      const isTiming = isTimingPattern(row, col)
      const isAlignment = isAlignmentPattern(row, col, moduleCount)

      // Get color
      ctx.fillStyle = getModuleColor(row, col, moduleCount, opts)

      // Apply gap if needed
      let effectiveSize = moduleSize
      if (opts.moduleGapPercent > 0) {
        const gap = (moduleSize * opts.moduleGapPercent) / 100
        effectiveSize = moduleSize - gap
      }

      // Draw based on module type
      if (isFinder) {
        drawFinderModule(ctx, x, y, effectiveSize, opts.finderStyle)
      } else if (isAlignment) {
        const alignStyle = opts.alignmentStyle === 'match_finder' 
          ? opts.finderStyle 
          : opts.alignmentStyle as FinderStyle
        drawFinderModule(ctx, x, y, effectiveSize, alignStyle)
      } else if (isTiming && opts.timingStyle !== 'match_module') {
        // Special timing pattern rendering
        if (opts.timingStyle === 'dashed') {
          ctx.setLineDash([moduleSize / 2, moduleSize / 4])
        }
        ctx.fillRect(x, y, effectiveSize, effectiveSize)
        ctx.setLineDash([])
      } else {
        drawModule(
          ctx, x, y, effectiveSize, 
          opts.moduleStyle, 
          opts.cornerRadius, 
          opts.dotRotationDeg
        )
      }
    }
  }

  // Draw frame if specified
  if (opts.frameStyle !== 'none') {
    drawFrame(ctx, size, opts)
  }

  return { canvas, width: size, height: size }
}

/**
 * Draw a decorative frame around the QR code
 */
function drawFrame(
  ctx: CanvasRenderingContext2D,
  size: number,
  options: RenderOptions
): void {
  const padding = 10
  const frameWidth = size + padding * 2
  const frameHeight = size + padding * 2 + (options.frameText ? 30 : 0)

  ctx.strokeStyle = options.fgColor
  ctx.lineWidth = 2

  switch (options.frameStyle) {
    case 'rounded_frame':
      roundRect(ctx, padding / 2, padding / 2, size - padding, size - padding, 10)
      ctx.stroke()
      break
    case 'sticker':
      ctx.fillStyle = options.bgColor
      roundRect(ctx, 0, 0, size, size, 15)
      ctx.fill()
      ctx.stroke()
      break
    case 'tag':
      if (options.frameText) {
        ctx.font = '14px sans-serif'
        ctx.fillStyle = options.fgColor
        ctx.textAlign = 'center'
        ctx.fillText(options.frameText, size / 2, size - 10)
      }
      break
  }
}

// ============================================
// COLOR RENDERING HELPERS
// ============================================

/**
 * Render a QR matrix with per-module colors
 */
export function renderQRWithColors(
  matrix: boolean[][],
  colors: RGB[][],
  options: Partial<RenderOptions> = {}
): RenderResult {
  const opts: RenderOptions = {
    modulePx: options.modulePx ?? 8,
    margin: options.margin ?? 4,
    fgColor: options.fgColor ?? '#000000',
    bgColor: options.bgColor ?? '#ffffff',
    bgTransparent: options.bgTransparent ?? false,
    moduleStyle: options.moduleStyle ?? 'square',
    finderStyle: options.finderStyle ?? 'square',
    alignmentStyle: options.alignmentStyle ?? 'match_finder',
    timingStyle: options.timingStyle ?? 'match_module',
    moduleGapPercent: options.moduleGapPercent ?? 0,
    gapMode: options.gapMode ?? 'none',
    cornerRadius: options.cornerRadius ?? 0,
    dotRotationDeg: options.dotRotationDeg ?? 0,
    eyeOuterStyle: options.eyeOuterStyle ?? 'square',
    eyeInnerStyle: options.eyeInnerStyle ?? 'square',
    eyeScale: options.eyeScale ?? 100,
    frameStyle: options.frameStyle ?? 'none',
    frameText: options.frameText ?? '',
    crispEdges: options.crispEdges ?? true,
    pixelSnap: options.pixelSnap ?? 'floor',
    contrastGuard: options.contrastGuard ?? false,
    minContrastRatio: options.minContrastRatio ?? 4.5,
  }

  const moduleCount = matrix.length
  const moduleSize = opts.modulePx
  const marginPx = opts.margin * moduleSize
  const size = moduleCount * moduleSize + marginPx * 2

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.imageSmoothingEnabled = !opts.crispEdges

  // Draw background
  if (!opts.bgTransparent) {
    ctx.fillStyle = opts.bgColor
    ctx.fillRect(0, 0, size, size)
  }

  // Draw modules with individual colors
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      const color = colors[row]?.[col]
      if (!color) continue

      const x = snapPixel(marginPx + col * moduleSize, opts.pixelSnap)
      const y = snapPixel(marginPx + row * moduleSize, opts.pixelSnap)

      ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`

      let effectiveSize = moduleSize
      if (opts.moduleGapPercent > 0) {
        const gap = (moduleSize * opts.moduleGapPercent) / 100
        effectiveSize = moduleSize - gap
      }

      const isFinder = isFinderPattern(row, col, moduleCount)
      if (isFinder) {
        drawFinderModule(ctx, x, y, effectiveSize, opts.finderStyle)
      } else {
        drawModule(ctx, x, y, effectiveSize, opts.moduleStyle, opts.cornerRadius, opts.dotRotationDeg)
      }
    }
  }

  return { canvas, width: size, height: size }
}

// ============================================
// SUBPIXEL RENDERING
// ============================================

/**
 * Render a scaled QR matrix (for dithered/subpixel modes)
 */
export function renderSubpixelQR(
  matrix: boolean[][],
  colors: RGB[][],
  scale: number,
  options: Partial<RenderOptions> = {}
): RenderResult {
  const opts = {
    modulePx: options.modulePx ?? 8,
    margin: options.margin ?? 5,
    bgColor: options.bgColor ?? '#ffffff',
    bgTransparent: options.bgTransparent ?? false,
    crispEdges: options.crispEdges ?? true,
  }

  const scaledCount = matrix.length
  const subPixelSize = Math.max(1, Math.round(opts.modulePx / scale))
  const effectiveModuleSize = subPixelSize * scale
  const marginPx = opts.margin * effectiveModuleSize
  const size = scaledCount * subPixelSize + marginPx * 2

  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.imageSmoothingEnabled = !opts.crispEdges

  // Draw background
  if (!opts.bgTransparent) {
    ctx.fillStyle = opts.bgColor
    ctx.fillRect(0, 0, size, size)
  }

  // Draw each subpixel
  for (let y = 0; y < scaledCount; y++) {
    for (let x = 0; x < scaledCount; x++) {
      const color = colors[y]?.[x]
      if (!color) continue

      const dx = marginPx + x * subPixelSize
      const dy = marginPx + y * subPixelSize

      ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`
      ctx.fillRect(dx, dy, subPixelSize, subPixelSize)
    }
  }

  return { canvas, width: size, height: size }
}

// ============================================
// EXPORT
// ============================================

export const Renderer = {
  renderQR,
  renderQRWithColors,
  renderSubpixelQR,
  drawModule,
  drawFinderModule,
  roundRect,
  getModuleColor,
}

export default Renderer
