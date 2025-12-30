/**
 * Animation Module
 * Handles GIF and WebP animation parsing, frame management, animation patterns, and temporal effects
 */

/// <reference path="../types/image-decoder.d.ts" />

import { parseGIF, decompressFrames } from 'gifuct-js'

// ============================================
// FORMAT DETECTION
// ============================================

/**
 * Detect if an ArrayBuffer contains an animated WebP
 * Checks for RIFF/WEBP container with ANIM chunk
 */
export function isAnimatedWebP(buffer: ArrayBuffer): boolean {
  const view = new DataView(buffer)
  
  // Check RIFF header
  if (view.byteLength < 12) return false
  const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3))
  if (riff !== 'RIFF') return false
  
  // Check WEBP signature
  const webp = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11))
  if (webp !== 'WEBP') return false
  
  // Search for ANIM chunk (indicates animation)
  let offset = 12
  while (offset < view.byteLength - 8) {
    const chunkId = String.fromCharCode(
      view.getUint8(offset),
      view.getUint8(offset + 1),
      view.getUint8(offset + 2),
      view.getUint8(offset + 3)
    )
    
    if (chunkId === 'ANIM') return true
    if (chunkId === 'ANMF') return true // Animation frame chunk
    
    // Get chunk size (little-endian)
    const chunkSize = view.getUint32(offset + 4, true)
    offset += 8 + chunkSize + (chunkSize % 2) // Chunks are padded to even size
  }
  
  return false
}

/**
 * Detect image format from ArrayBuffer
 */
export function detectImageFormat(buffer: ArrayBuffer): 'gif' | 'webp' | 'unknown' {
  const view = new DataView(buffer)
  if (view.byteLength < 12) return 'unknown'
  
  // Check GIF signature (GIF87a or GIF89a)
  const gif = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2))
  if (gif === 'GIF') return 'gif'
  
  // Check RIFF/WEBP signature
  const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3))
  const webp = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11))
  if (riff === 'RIFF' && webp === 'WEBP') return 'webp'
  
  return 'unknown'
}

// ============================================
// TYPES
// ============================================

export interface AnimationFrame {
  canvas: HTMLCanvasElement
  delay: number // milliseconds
  disposalType: number
}

export interface AnimationOptions {
  speedMs: number
  loop: boolean
  bounce: boolean
  startFrame: number
  maxFrames: number
  frameStep: number
  interpolate: 'none' | 'crossfade' | 'morph'
  pattern: AnimationPattern
  moduleJitterPx: number
  colorCycle: boolean
  temporalDither: 'off' | 'blue_noise' | 'flicker_safe'
  seed: number
}

export type AnimationPattern = 
  | 'none' 
  | 'pulse' 
  | 'wave' 
  | 'scanline' 
  | 'shimmer' 
  | 'drift'

export interface AnimationState {
  frames: AnimationFrame[]
  currentFrame: number
  playing: boolean
  direction: 1 | -1
  lastFrameTime: number
}

// ============================================
// GIF PARSING
// ============================================

/**
 * Parse animated WebP using ImageDecoder API (modern browsers)
 * Falls back to single frame if ImageDecoder is not available
 */
export async function parseWebPFrames(source: ArrayBuffer): Promise<AnimationFrame[]> {
  // Check if ImageDecoder API is available
  if (typeof ImageDecoder === 'undefined') {
    // Fallback: load as single frame using canvas
    return parseWebPAsSingleFrame(source)
  }
  
  try {
    const decoder = new ImageDecoder({
      type: 'image/webp',
      data: source,
    })
    
    await decoder.completed
    
    const frameCount = decoder.tracks.selectedTrack?.frameCount || 1
    const frames: AnimationFrame[] = []
    
    for (let i = 0; i < frameCount; i++) {
      const result = await decoder.decode({ frameIndex: i })
      const { image, duration } = result
      
      // Convert VideoFrame to canvas
      const canvas = document.createElement('canvas')
      canvas.width = image.displayWidth
      canvas.height = image.displayHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(image, 0, 0)
      image.close()
      
      frames.push({
        canvas,
        delay: duration ? duration / 1000 : 100, // Convert microseconds to ms, default 100ms
        disposalType: 0,
      })
    }
    
    decoder.close()
    return frames
  } catch (err) {
    console.warn('ImageDecoder failed, falling back to single frame:', err)
    return parseWebPAsSingleFrame(source)
  }
}

/**
 * Parse WebP as a single frame (fallback for non-animated or unsupported)
 */
async function parseWebPAsSingleFrame(source: ArrayBuffer): Promise<AnimationFrame[]> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([source], { type: 'image/webp' })
    const url = URL.createObjectURL(blob)
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      
      resolve([{
        canvas,
        delay: 100,
        disposalType: 0,
      }])
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load WebP image'))
    }
    
    img.src = url
  })
}

/**
 * Parse any animated image (GIF or WebP) and extract frames
 * Automatically detects format and uses appropriate parser
 */
export async function parseAnimatedImage(source: string | ArrayBuffer): Promise<AnimationFrame[]> {
  let arrayBuffer: ArrayBuffer
  
  if (typeof source === 'string') {
    const response = await fetch(source)
    arrayBuffer = await response.arrayBuffer()
  } else {
    arrayBuffer = source
  }
  
  const format = detectImageFormat(arrayBuffer)
  
  if (format === 'gif') {
    return parseGifFrames(arrayBuffer)
  }
  
  if (format === 'webp') {
    // Check if it's animated
    if (isAnimatedWebP(arrayBuffer)) {
      return parseWebPFrames(arrayBuffer)
    }
    // Non-animated WebP - load as single frame
    return parseWebPAsSingleFrame(arrayBuffer)
  }
  
  // Unknown format - try to load as regular image
  return parseStaticImageAsFrame(arrayBuffer)
}

/**
 * Parse any static image as a single animation frame
 */
async function parseStaticImageAsFrame(source: ArrayBuffer): Promise<AnimationFrame[]> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([source])
    const url = URL.createObjectURL(blob)
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)
      
      resolve([{
        canvas,
        delay: 100,
        disposalType: 0,
      }])
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    
    img.src = url
  })
}

/**
 * Parse a GIF file and extract frames as canvas elements
 */
export async function parseGifFrames(source: string | ArrayBuffer): Promise<AnimationFrame[]> {
  let arrayBuffer: ArrayBuffer

  if (typeof source === 'string') {
    // Data URL or URL
    const response = await fetch(source)
    arrayBuffer = await response.arrayBuffer()
  } else {
    arrayBuffer = source
  }

  const gif = parseGIF(arrayBuffer)
  const frames = decompressFrames(gif, true)

  if (frames.length === 0) {
    throw new Error('No frames found in GIF')
  }

  const { width, height } = gif.lsd

  // Create a persistent canvas for compositing frames
  const compositeCanvas = document.createElement('canvas')
  compositeCanvas.width = width
  compositeCanvas.height = height
  const compositeCtx = compositeCanvas.getContext('2d')!

  const animationFrames: AnimationFrame[] = []

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i]
    const { dims, patch, disposalType, delay } = frame

    // Create ImageData from patch
    const imageData = new ImageData(
      new Uint8ClampedArray(patch),
      dims.width,
      dims.height
    )

    // Create temporary canvas for this frame's patch
    const patchCanvas = document.createElement('canvas')
    patchCanvas.width = dims.width
    patchCanvas.height = dims.height
    const patchCtx = patchCanvas.getContext('2d')!
    patchCtx.putImageData(imageData, 0, 0)

    // Draw patch onto composite canvas
    compositeCtx.drawImage(patchCanvas, dims.left, dims.top)

    // Create output canvas for this frame
    const outputCanvas = document.createElement('canvas')
    outputCanvas.width = width
    outputCanvas.height = height
    const outputCtx = outputCanvas.getContext('2d')!
    outputCtx.drawImage(compositeCanvas, 0, 0)

    animationFrames.push({
      canvas: outputCanvas,
      delay: delay * 10, // GIF delay is in centiseconds
      disposalType,
    })

    // Handle disposal
    if (disposalType === 2) {
      // Restore to background
      compositeCtx.clearRect(dims.left, dims.top, dims.width, dims.height)
    }
    // disposalType 0, 1, or 3: leave frame in place
  }

  return animationFrames
}

/**
 * Get frame delays from a GIF
 */
export async function getGifDelays(source: string | ArrayBuffer): Promise<number[]> {
  let arrayBuffer: ArrayBuffer

  if (typeof source === 'string') {
    const response = await fetch(source)
    arrayBuffer = await response.arrayBuffer()
  } else {
    arrayBuffer = source
  }

  const gif = parseGIF(arrayBuffer)
  const frames = decompressFrames(gif, true)

  return frames.map(frame => frame.delay * 10)
}

// ============================================
// ANIMATION STATE MANAGEMENT
// ============================================

/**
 * Create initial animation state
 */
export function createAnimationState(frames: AnimationFrame[]): AnimationState {
  return {
    frames,
    currentFrame: 0,
    playing: true,
    direction: 1,
    lastFrameTime: 0,
  }
}

/**
 * Get the next frame index based on animation options
 */
export function getNextFrame(
  state: AnimationState,
  options: AnimationOptions
): { frameIndex: number; direction: 1 | -1 } {
  const { frames, currentFrame, direction } = state
  const { loop, bounce, frameStep } = options

  let nextFrame = currentFrame + direction * frameStep
  let nextDirection = direction

  if (nextFrame >= frames.length) {
    if (bounce) {
      nextDirection = -1
      nextFrame = frames.length - 2
    } else if (loop) {
      nextFrame = 0
    } else {
      nextFrame = frames.length - 1
    }
  } else if (nextFrame < 0) {
    if (bounce) {
      nextDirection = 1
      nextFrame = 1
    } else if (loop) {
      nextFrame = frames.length - 1
    } else {
      nextFrame = 0
    }
  }

  return { frameIndex: Math.max(0, Math.min(frames.length - 1, nextFrame)), direction: nextDirection }
}

/**
 * Update animation state for the next frame
 */
export function advanceAnimation(
  state: AnimationState,
  options: AnimationOptions
): AnimationState {
  const { frameIndex, direction } = getNextFrame(state, options)

  return {
    ...state,
    currentFrame: frameIndex,
    direction,
    lastFrameTime: performance.now(),
  }
}

// ============================================
// ANIMATION PATTERNS
// ============================================

/**
 * Apply animation pattern to a frame
 */
export function applyAnimationPattern(
  canvas: HTMLCanvasElement,
  frameIndex: number,
  totalFrames: number,
  pattern: AnimationPattern,
  options: Partial<AnimationOptions> = {}
): HTMLCanvasElement {
  if (pattern === 'none') return canvas

  const result = document.createElement('canvas')
  result.width = canvas.width
  result.height = canvas.height
  const ctx = result.getContext('2d')!

  const progress = frameIndex / Math.max(1, totalFrames - 1)
  const seed = options.seed ?? 0

  switch (pattern) {
    case 'pulse': {
      const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.05
      const offset = (1 - scale) * canvas.width / 2
      ctx.drawImage(canvas, offset, offset, canvas.width * scale, canvas.height * scale)
      break
    }

    case 'wave': {
      ctx.drawImage(canvas, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let y = 0; y < canvas.height; y++) {
        const waveOffset = Math.sin((y + progress * canvas.height) * 0.1) * 2
        for (let x = 0; x < canvas.width; x++) {
          const srcX = Math.round(x + waveOffset)
          if (srcX >= 0 && srcX < canvas.width) {
            const srcIdx = (y * canvas.width + srcX) * 4
            const dstIdx = (y * canvas.width + x) * 4
            data[dstIdx] = data[srcIdx]
            data[dstIdx + 1] = data[srcIdx + 1]
            data[dstIdx + 2] = data[srcIdx + 2]
          }
        }
      }
      ctx.putImageData(imageData, 0, 0)
      break
    }

    case 'scanline': {
      ctx.drawImage(canvas, 0, 0)
      const scanY = Math.floor(progress * canvas.height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.fillRect(0, scanY - 2, canvas.width, 4)
      break
    }

    case 'shimmer': {
      ctx.drawImage(canvas, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width
        const shimmer = Math.sin((x + progress * 100 + seed) * 0.1) * 20
        data[i] = Math.min(255, Math.max(0, data[i] + shimmer))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + shimmer))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + shimmer))
      }
      ctx.putImageData(imageData, 0, 0)
      break
    }

    case 'drift': {
      const driftX = Math.sin(progress * Math.PI * 2) * 3
      const driftY = Math.cos(progress * Math.PI * 2) * 3
      ctx.drawImage(canvas, driftX, driftY)
      break
    }

    default:
      ctx.drawImage(canvas, 0, 0)
  }

  return result
}

// ============================================
// TEMPORAL DITHERING
// ============================================

/**
 * Apply temporal dithering for animation frames
 */
export function applyTemporalDither(
  canvas: HTMLCanvasElement,
  frameIndex: number,
  mode: 'off' | 'blue_noise' | 'flicker_safe',
  seed: number = 0
): HTMLCanvasElement {
  if (mode === 'off') return canvas

  const result = document.createElement('canvas')
  result.width = canvas.width
  result.height = canvas.height
  const ctx = result.getContext('2d')!

  ctx.drawImage(canvas, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  const phi = 1.618033988749895

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4

      let noiseValue: number

      if (mode === 'blue_noise') {
        // Blue noise with temporal offset
        const ign = (52.9829189 * ((0.06711056 * x + 0.00583715 * y) % 1)) % 1
        const offset = ((x * phi + y * phi * phi + frameIndex * 0.1 + seed) % 1)
        noiseValue = (ign + offset * 0.5) % 1
      } else {
        // Flicker-safe: slower temporal variation
        noiseValue = ((x * phi + y * phi * phi + frameIndex * 0.02 + seed) % 1)
      }

      const threshold = (noiseValue - 0.5) * 10

      data[i] = Math.min(255, Math.max(0, data[i] + threshold))
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + threshold))
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + threshold))
    }
  }

  ctx.putImageData(imageData, 0, 0)
  return result
}

// ============================================
// FRAME INTERPOLATION
// ============================================

/**
 * Interpolate between two frames
 */
export function interpolateFrames(
  frame1: HTMLCanvasElement,
  frame2: HTMLCanvasElement,
  t: number,
  mode: 'none' | 'crossfade' | 'morph'
): HTMLCanvasElement {
  if (mode === 'none' || t === 0) return frame1
  if (t === 1) return frame2

  const result = document.createElement('canvas')
  result.width = frame1.width
  result.height = frame1.height
  const ctx = result.getContext('2d')!

  switch (mode) {
    case 'crossfade': {
      ctx.globalAlpha = 1 - t
      ctx.drawImage(frame1, 0, 0)
      ctx.globalAlpha = t
      ctx.drawImage(frame2, 0, 0)
      ctx.globalAlpha = 1
      break
    }

    case 'morph': {
      const ctx1 = frame1.getContext('2d')!
      const ctx2 = frame2.getContext('2d')!
      const data1 = ctx1.getImageData(0, 0, frame1.width, frame1.height)
      const data2 = ctx2.getImageData(0, 0, frame2.width, frame2.height)
      const resultData = ctx.createImageData(result.width, result.height)

      for (let i = 0; i < data1.data.length; i++) {
        resultData.data[i] = Math.round(data1.data[i] * (1 - t) + data2.data[i] * t)
      }

      ctx.putImageData(resultData, 0, 0)
      break
    }

    default:
      ctx.drawImage(frame1, 0, 0)
  }

  return result
}

// ============================================
// COLOR CYCLING
// ============================================

// hslToRgb is imported from color-utils.ts - single source of truth for color conversions
import { hslToRgb } from './color-utils'

/**
 * Apply color cycling effect to a frame
 * Optimized for QR codes - tints dark pixels with cycling colors,
 * adds complementary tints to light pixels (works on black/white)
 */
export function applyColorCycle(
  canvas: HTMLCanvasElement,
  frameIndex: number,
  totalFrames: number
): HTMLCanvasElement {
  const result = document.createElement('canvas')
  result.width = canvas.width
  result.height = canvas.height
  const ctx = result.getContext('2d')!

  ctx.drawImage(canvas, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Calculate hue for this frame (full rainbow cycle)
  const progress = frameIndex / Math.max(1, totalFrames)
  const baseHue = progress * 360
  
  // Generate tint colors using shared color-utils
  const tintColor = hslToRgb(baseHue, 80, 50)
  const complementHue = (baseHue + 180) % 360
  const complementColor = hslToRgb(complementHue, 30, 70)

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const brightness = (r + g + b) / 3
    const isDark = brightness < 128
    
    if (isDark) {
      // Tint dark pixels with cycling color
      const tintAmount = 0.7
      data[i] = Math.min(255, r + tintColor.r * tintAmount)
      data[i + 1] = Math.min(255, g + tintColor.g * tintAmount)
      data[i + 2] = Math.min(255, b + tintColor.b * tintAmount)
    } else {
      // Add subtle complementary tint to light pixels
      const tintAmount = 0.15
      data[i] = Math.max(0, Math.round(r - (255 - complementColor.r) * tintAmount))
      data[i + 1] = Math.max(0, Math.round(g - (255 - complementColor.g) * tintAmount))
      data[i + 2] = Math.max(0, Math.round(b - (255 - complementColor.b) * tintAmount))
    }
  }

  ctx.putImageData(imageData, 0, 0)
  return result
}

// ============================================
// ANIMATION LOOP
// ============================================

/**
 * Create an animation loop handler
 */
export function createAnimationLoop(
  onFrame: (frameIndex: number, canvas: HTMLCanvasElement) => void,
  options: AnimationOptions
): { start: () => void; stop: () => void; setFrames: (frames: AnimationFrame[]) => void } {
  let state: AnimationState | null = null
  let animationId: number | null = null

  const tick = () => {
    if (!state || !state.playing) return

    const now = performance.now()
    const frameDelay = state.frames[state.currentFrame]?.delay || options.speedMs

    if (now - state.lastFrameTime >= frameDelay) {
      onFrame(state.currentFrame, state.frames[state.currentFrame].canvas)
      state = advanceAnimation(state, options)
    }

    animationId = requestAnimationFrame(tick)
  }

  return {
    start: () => {
      if (state) {
        state.playing = true
        state.lastFrameTime = performance.now()
        tick()
      }
    },
    stop: () => {
      if (state) {
        state.playing = false
      }
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    },
    setFrames: (frames: AnimationFrame[]) => {
      state = createAnimationState(frames)
    },
  }
}

// ============================================
// EXPORT
// ============================================

export const Animation = {
  // Image parsing
  parseAnimatedImage,
  parseGifFrames,
  parseWebPFrames,
  getGifDelays,
  detectImageFormat,
  isAnimatedWebP,
  
  // State management
  createAnimationState,
  getNextFrame,
  advanceAnimation,
  
  // Patterns
  applyAnimationPattern,
  applyTemporalDither,
  
  // Interpolation
  interpolateFrames,
  applyColorCycle,
  
  // Loop
  createAnimationLoop,
}

export default Animation
