/**
 * Animation Module
 * Handles GIF parsing, frame management, animation patterns, and temporal effects
 */

import { parseGIF, decompressFrames } from 'gifuct-js'

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

/**
 * Apply color cycling effect to a frame
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

  const hueShift = (frameIndex / totalFrames) * 360

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Convert RGB to HSL
    const max = Math.max(r, g, b) / 255
    const min = Math.min(r, g, b) / 255
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      let h = 0

      if (max === r / 255) h = ((g / 255 - b / 255) / d + (g < b ? 6 : 0)) * 60
      else if (max === g / 255) h = ((b / 255 - r / 255) / d + 2) * 60
      else h = ((r / 255 - g / 255) / d + 4) * 60

      // Apply hue shift
      h = (h + hueShift) % 360

      // Convert back to RGB
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
      const m = l - c / 2

      let r1 = 0, g1 = 0, b1 = 0

      if (h < 60) { r1 = c; g1 = x }
      else if (h < 120) { r1 = x; g1 = c }
      else if (h < 180) { g1 = c; b1 = x }
      else if (h < 240) { g1 = x; b1 = c }
      else if (h < 300) { r1 = x; b1 = c }
      else { r1 = c; b1 = x }

      data[i] = Math.round((r1 + m) * 255)
      data[i + 1] = Math.round((g1 + m) * 255)
      data[i + 2] = Math.round((b1 + m) * 255)
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
  // GIF parsing
  parseGifFrames,
  getGifDelays,
  
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
