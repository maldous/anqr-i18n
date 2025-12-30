/**
 * Shared Utilities Module
 * 
 * Pure functions that can be used by both client (browser) and server (Netlify functions).
 * These have NO DOM dependencies and work with raw data arrays.
 * 
 * This eliminates code duplication between:
 * - src/modules/color-utils.ts (client)
 * - src/modules/animation-patterns.ts (client)
 * - netlify/functions/qr.ts (server)
 */

// ============================================
// TYPES
// ============================================

export type AnimationPattern = 'none' | 'pulse' | 'wave' | 'scanline' | 'shimmer' | 'drift' | 'color_cycle'
export type AnimationEasing = 'linear' | 'ease_in' | 'ease_out' | 'ease_in_out' | 'bounce'

// ============================================
// COLOR CONVERSION (Tuple format for patterns)
// ============================================

/**
 * Convert HSL to RGB - returns tuple [r, g, b] (0-255)
 * This is the canonical implementation used by both client and server.
 */
export function hslToRgbTuple(h: number, s: number, l: number): [number, number, number] {
  s /= 100
  l /= 100
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (h < 60) {
    r = c; g = x; b = 0
  } else if (h < 120) {
    r = x; g = c; b = 0
  } else if (h < 180) {
    r = 0; g = c; b = x
  } else if (h < 240) {
    r = 0; g = x; b = c
  } else if (h < 300) {
    r = x; g = 0; b = c
  } else {
    r = c; g = 0; b = x
  }
  
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ]
}

/**
 * Convert RGB to HSL - returns tuple [h, s, l] (h: 0-360, s: 0-100, l: 0-100)
 */
export function rgbToHslTuple(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60
        break
      case g:
        h = ((b - r) / d + 2) * 60
        break
      case b:
        h = ((r - g) / d + 4) * 60
        break
    }
  }
  
  return [h, s * 100, l * 100]
}

/**
 * Convert RGB to grayscale using luminance formula
 */
export function rgbToGray(r: number, g: number, b: number): number {
  return r * 0.299 + g * 0.587 + b * 0.114
}

// ============================================
// RANDOM NUMBER GENERATION
// ============================================

/**
 * Create a seeded pseudo-random number generator
 * Returns a function that produces deterministic random values 0-1
 */
export function createSeededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = Math.sin(s * 9999) * 10000
    return s - Math.floor(s)
  }
}

// ============================================
// ANIMATION EASING
// ============================================

/**
 * Apply easing function to progress value (0-1)
 */
export function applyEasing(progress: number, easing: AnimationEasing): number {
  switch (easing) {
    case 'ease_in':
      return progress * progress
    case 'ease_out':
      return 1 - (1 - progress) * (1 - progress)
    case 'ease_in_out':
      return progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
    case 'bounce':
      if (progress < 0.5) {
        return 8 * progress * progress * progress * progress
      } else {
        return 1 - Math.pow(-2 * progress + 2, 4) / 2
      }
    case 'linear':
    default:
      return progress
  }
}

// ============================================
// ANIMATION PATTERN FUNCTIONS
// These operate on raw Uint8ClampedArray data
// ============================================

/**
 * Apply pulse pattern effect to image data
 * Tints dark pixels with a pulsing color based on progress
 */
export function applyPulsePattern(
  data: Uint8ClampedArray,
  progress: number,
  seed: number
): void {
  const pulsePhase = Math.sin(progress * Math.PI * 2)
  const intensity = 0.3 + 0.2 * Math.abs(pulsePhase)
  const hue = (seed * 31) % 360
  const pulseColor = hslToRgbTuple(hue, 70, 50)
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const brightness = (r + g + b) / 3
    const isDark = brightness < 128
    
    if (isDark) {
      const tintAmount = intensity * (0.5 + pulsePhase * 0.5)
      data[i] = Math.min(255, r + pulseColor[0] * tintAmount)
      data[i + 1] = Math.min(255, g + pulseColor[1] * tintAmount)
      data[i + 2] = Math.min(255, b + pulseColor[2] * tintAmount)
    } else {
      const bf = 1 - intensity * 0.1 * (1 + pulsePhase)
      data[i] = Math.max(0, Math.round(r * bf))
      data[i + 1] = Math.max(0, Math.round(g * bf))
      data[i + 2] = Math.max(0, Math.round(b * bf))
    }
  }
}

/**
 * Apply wave pattern effect to image data
 * Creates horizontal color waves across the image
 */
export function applyWavePattern(
  data: Uint8ClampedArray,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const waveFrequency = 3 + (seed % 5)
  const baseHue = (seed * 23) % 360

  for (let y = 0; y < height; y++) {
    const wavePhase = Math.sin((y / height) * waveFrequency * Math.PI * 2 + progress * Math.PI * 2)
    const waveIntensity = (wavePhase + 1) / 2
    const rowHue = ((baseHue + wavePhase * 30) % 360 + 360) % 360
    const waveColor = hslToRgbTuple(rowHue, 70, 50)

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const brightness = (r + g + b) / 3
      const isDark = brightness < 128
      
      if (isDark) {
        const tintAmount = waveIntensity * 0.6
        data[i] = Math.min(255, r + waveColor[0] * tintAmount)
        data[i + 1] = Math.min(255, g + waveColor[1] * tintAmount)
        data[i + 2] = Math.min(255, b + waveColor[2] * tintAmount)
      } else {
        const darkenAmount = waveIntensity * 0.15
        data[i] = Math.round(r * (1 - darkenAmount))
        data[i + 1] = Math.round(g * (1 - darkenAmount))
        data[i + 2] = Math.round(b * (1 - darkenAmount))
      }
    }
  }
}

/**
 * Apply scanline pattern effect to image data
 * Creates a moving scan line across the image
 */
export function applyScanlinePattern(
  data: Uint8ClampedArray,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const lineWidth = Math.max(4, height * 0.08)
  const lineY = progress * (height + lineWidth * 2) - lineWidth
  const horizontal = seed % 2 === 0
  const baseHue = (seed * 17) % 360
  const scanColor = hslToRgbTuple(baseHue, 80, 50)
  const trailColor = hslToRgbTuple((baseHue + 180) % 360, 60, 60)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const pos = horizontal ? y : x
      const linePos = horizontal ? lineY : progress * (width + lineWidth * 2) - lineWidth
      const distance = Math.abs(pos - linePos)
      
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const brightness = (r + g + b) / 3
      const isDark = brightness < 128
      
      if (distance < lineWidth) {
        const intensity = 1 - distance / lineWidth
        if (isDark) {
          data[i] = Math.min(255, r + scanColor[0] * intensity * 0.8)
          data[i + 1] = Math.min(255, g + scanColor[1] * intensity * 0.8)
          data[i + 2] = Math.min(255, b + scanColor[2] * intensity * 0.8)
        } else {
          data[i] = Math.max(0, r - trailColor[0] * intensity * 0.3)
          data[i + 1] = Math.max(0, g - trailColor[1] * intensity * 0.3)
          data[i + 2] = Math.max(0, b - trailColor[2] * intensity * 0.3)
        }
      }
    }
  }
}

/**
 * Apply shimmer pattern effect to image data
 * Creates random sparkle effects
 */
export function applyShimmerPattern(
  data: Uint8ClampedArray,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const random = createSeededRandom(seed + Math.floor(progress * 1000))
  const spotCount = Math.floor(width * height * 0.02)
  const baseHue = (seed * 13 + progress * 100) % 360
  
  for (let s = 0; s < spotCount; s++) {
    const x = Math.floor(random() * width)
    const y = Math.floor(random() * height)
    const i = (y * width + x) * 4
    
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const brightness = (r + g + b) / 3
    const isDark = brightness < 128
    
    const spotHue = (baseHue + random() * 60) % 360
    const sparkleColor = hslToRgbTuple(spotHue, 90, isDark ? 60 : 40)
    const intensity = 0.5 + random() * 0.5
    
    if (isDark) {
      data[i] = Math.min(255, r + sparkleColor[0] * intensity)
      data[i + 1] = Math.min(255, g + sparkleColor[1] * intensity)
      data[i + 2] = Math.min(255, b + sparkleColor[2] * intensity)
    } else {
      data[i] = Math.max(0, r - (255 - sparkleColor[0]) * intensity * 0.3)
      data[i + 1] = Math.max(0, g - (255 - sparkleColor[1]) * intensity * 0.3)
      data[i + 2] = Math.max(0, b - (255 - sparkleColor[2]) * intensity * 0.3)
    }
  }
}

/**
 * Apply drift pattern effect to image data
 * Creates flowing color gradients
 */
export function applyDriftPattern(
  data: Uint8ClampedArray,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const scale = 0.015 + (seed % 10) * 0.003
  const timeOffset = progress * Math.PI * 2
  const baseHue = (seed * 41 + progress * 60) % 360
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const brightness = (r + g + b) / 3
      const isDark = brightness < 128
      
      const drift = Math.sin(x * scale + timeOffset) * Math.cos(y * scale + timeOffset)
      const driftIntensity = (drift + 1) / 2
      const driftHue = ((baseHue + drift * 40) % 360 + 360) % 360
      const driftColor = hslToRgbTuple(driftHue, 60, 50)
      
      if (isDark) {
        const tintAmount = driftIntensity * 0.5
        data[i] = Math.min(255, r + driftColor[0] * tintAmount)
        data[i + 1] = Math.min(255, g + driftColor[1] * tintAmount)
        data[i + 2] = Math.min(255, b + driftColor[2] * tintAmount)
      } else {
        const darkenAmount = driftIntensity * 0.1
        data[i] = Math.round(r * (1 - darkenAmount))
        data[i + 1] = Math.round(g * (1 - darkenAmount))
        data[i + 2] = Math.round(b * (1 - darkenAmount))
      }
    }
  }
}

/**
 * Apply color cycle pattern effect to image data
 * Cycles hue across the animation
 */
export function applyColorCyclePattern(
  data: Uint8ClampedArray,
  progress: number,
  seed: number
): void {
  const baseHue = (progress * 360 + seed) % 360
  const tintColor = hslToRgbTuple(baseHue, 80, 50)
  const complementHue = (baseHue + 180) % 360
  const complementColor = hslToRgbTuple(complementHue, 30, 70)
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const brightness = (r + g + b) / 3
    const isDark = brightness < 128
    
    if (isDark) {
      const tintAmount = 0.7
      data[i] = Math.min(255, r + tintColor[0] * tintAmount)
      data[i + 1] = Math.min(255, g + tintColor[1] * tintAmount)
      data[i + 2] = Math.min(255, b + tintColor[2] * tintAmount)
    } else {
      const tintAmount = 0.15
      data[i] = Math.max(0, Math.round(r - (255 - complementColor[0]) * tintAmount))
      data[i + 1] = Math.max(0, Math.round(g - (255 - complementColor[1]) * tintAmount))
      data[i + 2] = Math.max(0, Math.round(b - (255 - complementColor[2]) * tintAmount))
    }
  }
}

// ============================================
// EXPORT ALL
// ============================================

export const SharedUtils = {
  // Color conversion
  hslToRgbTuple,
  rgbToHslTuple,
  rgbToGray,
  
  // Random
  createSeededRandom,
  
  // Easing
  applyEasing,
  
  // Animation patterns
  applyPulsePattern,
  applyWavePattern,
  applyScanlinePattern,
  applyShimmerPattern,
  applyDriftPattern,
  applyColorCyclePattern,
}

export default SharedUtils
