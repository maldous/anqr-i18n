/**
 * Animation Patterns Module
 * Generates animated QR code effects from static images
 */

export type AnimationPattern = 'none' | 'pulse' | 'wave' | 'scanline' | 'shimmer' | 'drift' | 'jitter' | 'color_cycle'
export type InterpolationMode = 'none' | 'crossfade' | 'morph'

/**
 * Generate animation frames using a pattern effect on a static image
 */
export function generatePatternFrames(
  sourceCanvas: HTMLCanvasElement,
  pattern: AnimationPattern,
  frameCount: number = 24,
  seed: number = 0
): HTMLCanvasElement[] {
  if (pattern === 'none') {
    return [sourceCanvas]
  }

  const frames: HTMLCanvasElement[] = []
  const width = sourceCanvas.width
  const height = sourceCanvas.height

  // Get source image data
  const sourceCtx = sourceCanvas.getContext('2d')!
  const sourceData = sourceCtx.getImageData(0, 0, width, height)

  for (let i = 0; i < frameCount; i++) {
    const progress = i / frameCount // 0 to 1
    const frame = document.createElement('canvas')
    frame.width = width
    frame.height = height
    const ctx = frame.getContext('2d')!

    // Copy source data
    const frameData = ctx.createImageData(width, height)
    frameData.data.set(sourceData.data)

    // Apply pattern effect
    switch (pattern) {
      case 'pulse':
        applyPulsePattern(frameData, progress, seed)
        break
      case 'wave':
        applyWavePattern(frameData, progress, width, height, seed)
        break
      case 'scanline':
        applyScanlinePattern(frameData, progress, width, height, seed)
        break
      case 'shimmer':
        applyShimmerPattern(frameData, progress, width, height, seed)
        break
      case 'drift':
        applyDriftPattern(frameData, progress, width, height, seed)
        break
      case 'jitter':
        applyJitterPattern(frameData, progress, width, height, seed)
        break
      case 'color_cycle':
        applyColorCyclePattern(frameData, progress, width, height, seed)
        break
    }

    ctx.putImageData(frameData, 0, 0)
    frames.push(frame)
  }

  return frames
}

/**
 * Pulse pattern - brightness oscillates
 */
function applyPulsePattern(
  imageData: ImageData,
  progress: number,
  seed: number
): void {
  const data = imageData.data
  // Sine wave oscillation for smooth pulsing
  const intensity = 0.15 + 0.1 * Math.sin(seed * 0.1)
  const factor = 1 + Math.sin(progress * Math.PI * 2) * intensity

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * factor)     // R
    data[i + 1] = Math.min(255, data[i + 1] * factor) // G
    data[i + 2] = Math.min(255, data[i + 2] * factor) // B
  }
}

/**
 * Wave pattern - horizontal wave distortion effect via brightness
 */
function applyWavePattern(
  imageData: ImageData,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const data = imageData.data
  const waveFrequency = 3 + (seed % 5)
  const waveAmplitude = 0.2

  for (let y = 0; y < height; y++) {
    // Calculate wave offset for this row
    const waveOffset = Math.sin((y / height) * waveFrequency * Math.PI * 2 + progress * Math.PI * 2) * waveAmplitude
    const factor = 1 + waveOffset

    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      data[i] = Math.min(255, Math.max(0, data[i] * factor))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor))
    }
  }
}

/**
 * Scanline pattern - moving bright line across image
 */
function applyScanlinePattern(
  imageData: ImageData,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const data = imageData.data
  const lineWidth = Math.max(2, height * 0.05) // 5% of height
  const lineY = progress * (height + lineWidth * 2) - lineWidth
  const horizontal = seed % 2 === 0

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      
      // Calculate distance from scanline
      const pos = horizontal ? y : x
      const linePos = horizontal ? lineY : progress * (width + lineWidth * 2) - lineWidth
      const distance = Math.abs(pos - linePos)
      
      if (distance < lineWidth) {
        // Brighten pixels near the scanline
        const brightness = 1 + (1 - distance / lineWidth) * 0.5
        data[i] = Math.min(255, data[i] * brightness)
        data[i + 1] = Math.min(255, data[i + 1] * brightness)
        data[i + 2] = Math.min(255, data[i + 2] * brightness)
      }
    }
  }
}

/**
 * Shimmer pattern - random sparkle effect
 */
function applyShimmerPattern(
  imageData: ImageData,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const data = imageData.data
  
  // Use seeded random for consistency
  const random = seededRandom(seed + Math.floor(progress * 1000))
  
  // Add random bright spots
  const spotCount = Math.floor(width * height * 0.001) // 0.1% of pixels
  
  for (let s = 0; s < spotCount; s++) {
    const x = Math.floor(random() * width)
    const y = Math.floor(random() * height)
    const i = (y * width + x) * 4
    
    // Brighten this pixel
    const brightness = 1.3 + random() * 0.4
    data[i] = Math.min(255, data[i] * brightness)
    data[i + 1] = Math.min(255, data[i + 1] * brightness)
    data[i + 2] = Math.min(255, data[i + 2] * brightness)
  }
}

/**
 * Drift pattern - subtle color/brightness drift
 */
function applyDriftPattern(
  imageData: ImageData,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const data = imageData.data
  
  // Create a drifting pattern using perlin-like noise
  const scale = 0.02 + (seed % 10) * 0.005
  const timeOffset = progress * Math.PI * 2
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      
      // Simple drift using sine waves
      const drift = Math.sin(x * scale + timeOffset) * Math.cos(y * scale + timeOffset) * 0.15
      const factor = 1 + drift
      
      data[i] = Math.min(255, Math.max(0, data[i] * factor))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor))
    }
  }
}

/**
 * Module Jitter pattern - random position offset per module
 */
function applyJitterPattern(
  imageData: ImageData,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const data = imageData.data
  const tempData = new Uint8ClampedArray(data)
  
  // Jitter amount varies with animation progress
  const jitterAmount = Math.sin(progress * Math.PI * 2) * 2 + 2 // 0-4 pixels
  const random = seededRandom(seed + Math.floor(progress * 100))
  
  // Process in blocks (simulate QR modules)
  const moduleSize = Math.max(4, Math.floor(width / 40)) // Approximate module size
  
  for (let my = 0; my < height; my += moduleSize) {
    for (let mx = 0; mx < width; mx += moduleSize) {
      // Random offset for this module
      const offsetX = Math.floor((random() - 0.5) * jitterAmount)
      const offsetY = Math.floor((random() - 0.5) * jitterAmount)
      
      // Move pixels in this module
      for (let dy = 0; dy < moduleSize && my + dy < height; dy++) {
        for (let dx = 0; dx < moduleSize && mx + dx < width; dx++) {
          const srcX = mx + dx
          const srcY = my + dy
          const dstX = Math.max(0, Math.min(width - 1, srcX + offsetX))
          const dstY = Math.max(0, Math.min(height - 1, srcY + offsetY))
          
          const srcI = (srcY * width + srcX) * 4
          const dstI = (dstY * width + dstX) * 4
          
          // Copy from temp to destination
          data[dstI] = tempData[srcI]
          data[dstI + 1] = tempData[srcI + 1]
          data[dstI + 2] = tempData[srcI + 2]
          data[dstI + 3] = tempData[srcI + 3]
        }
      }
    }
  }
}

/**
 * Color Cycle pattern - hue rotation over time
 */
function applyColorCyclePattern(
  imageData: ImageData,
  progress: number,
  width: number,
  height: number,
  seed: number
): void {
  const data = imageData.data
  const hueShift = (progress * 360 + seed) % 360 // Full hue rotation per cycle
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Convert RGB to HSL
    const [h, s, l] = rgbToHsl(r, g, b)
    
    // Shift hue
    const newH = (h + hueShift) % 360
    
    // Convert back to RGB
    const [newR, newG, newB] = hslToRgb(newH, s, l)
    
    data[i] = newR
    data[i + 1] = newG
    data[i + 2] = newB
  }
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
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
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
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
 * Seeded random number generator
 */
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = Math.sin(s * 9999) * 10000
    return s - Math.floor(s)
  }
}

/**
 * Interpolate between frames for smoother animation
 */
export function interpolateFrames(
  frames: HTMLCanvasElement[],
  mode: InterpolationMode,
  insertCount: number = 1
): HTMLCanvasElement[] {
  if (mode === 'none' || frames.length < 2 || insertCount < 1) {
    return frames
  }

  const result: HTMLCanvasElement[] = []
  const width = frames[0].width
  const height = frames[0].height

  for (let i = 0; i < frames.length; i++) {
    result.push(frames[i])
    
    // Don't interpolate after last frame
    if (i < frames.length - 1) {
      const frameA = frames[i]
      const frameB = frames[i + 1]
      
      // Insert interpolated frames
      for (let j = 1; j <= insertCount; j++) {
        const t = j / (insertCount + 1) // 0 < t < 1
        const interpolated = document.createElement('canvas')
        interpolated.width = width
        interpolated.height = height
        const ctx = interpolated.getContext('2d')!
        
        if (mode === 'crossfade') {
          // Simple crossfade - draw both frames with opacity
          ctx.globalAlpha = 1 - t
          ctx.drawImage(frameA, 0, 0)
          ctx.globalAlpha = t
          ctx.drawImage(frameB, 0, 0)
          ctx.globalAlpha = 1
        } else if (mode === 'morph') {
          // Pixel-level blending for smoother morph
          const ctxA = frameA.getContext('2d')!
          const ctxB = frameB.getContext('2d')!
          const dataA = ctxA.getImageData(0, 0, width, height)
          const dataB = ctxB.getImageData(0, 0, width, height)
          const result = ctx.createImageData(width, height)
          
          for (let p = 0; p < dataA.data.length; p += 4) {
            result.data[p] = Math.round(dataA.data[p] * (1 - t) + dataB.data[p] * t)
            result.data[p + 1] = Math.round(dataA.data[p + 1] * (1 - t) + dataB.data[p + 1] * t)
            result.data[p + 2] = Math.round(dataA.data[p + 2] * (1 - t) + dataB.data[p + 2] * t)
            result.data[p + 3] = Math.round(dataA.data[p + 3] * (1 - t) + dataB.data[p + 3] * t)
          }
          
          ctx.putImageData(result, 0, 0)
        }
        
        result.push(interpolated)
      }
    }
  }

  return result
}

export default {
  generatePatternFrames,
  interpolateFrames,
}
