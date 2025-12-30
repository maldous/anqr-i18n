/**
 * Dithering Algorithms Module
 * Comprehensive implementation of all dithering algorithms
 * Supports error diffusion, ordered dithering, and noise-based methods
 */

import type { DitherKind, DiffusionKernel, OrderedMatrix, ColorMode } from '../store/qr-store'
import { createSeededRandom } from './color-utils'

// ============================================
// TYPES
// ============================================

export interface RGB {
  r: number
  g: number
  b: number
}

export interface DitherOptions {
  kind: DitherKind
  strength: number           // 0-100
  serpentine: boolean
  diffusionKernel: DiffusionKernel
  orderedMatrix: OrderedMatrix
  colorMode: ColorMode
  levels: number             // Output color levels (2 for B&W, more for grayscale)
  blueNoiseSeed: number
  blueNoiseTileSize: number
}

export interface DitherResult {
  matrix: boolean[][]
  colors: RGB[][]
}

// ============================================
// ORDERED DITHERING MATRICES
// ============================================

/** Bayer 2x2 matrix */
const BAYER_2 = [
  [0, 2],
  [3, 1],
]

/** Bayer 4x4 matrix */
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

/** Bayer 8x8 matrix */
const BAYER_8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

/** Clustered-dot matrix (halftone-like) */
const CLUSTERED_DOT = [
  [24, 10, 12, 26, 35, 47, 49, 37],
  [8, 0, 2, 14, 45, 59, 61, 51],
  [22, 6, 4, 16, 43, 57, 63, 53],
  [30, 20, 18, 28, 33, 41, 55, 39],
  [34, 46, 48, 36, 25, 11, 13, 27],
  [44, 58, 60, 50, 9, 1, 3, 15],
  [42, 56, 62, 52, 23, 7, 5, 17],
  [32, 40, 54, 38, 31, 21, 19, 29],
]

/** Void and cluster matrix (8x8) */
const VOID_CLUSTER = [
  [13, 9, 5, 12, 18, 22, 26, 19],
  [6, 1, 0, 8, 25, 30, 31, 23],
  [10, 2, 3, 4, 21, 29, 28, 27],
  [14, 7, 11, 15, 17, 24, 20, 16],
  [18, 22, 26, 19, 13, 9, 5, 12],
  [25, 30, 31, 23, 6, 1, 0, 8],
  [21, 29, 28, 27, 10, 2, 3, 4],
  [17, 24, 20, 16, 14, 7, 11, 15],
]

// ============================================
// ERROR DIFFUSION KERNELS
// ============================================

interface DiffusionKernelDef {
  matrix: number[][]
  divisor: number
  offset: number
}

const DIFFUSION_KERNELS: Record<DiffusionKernel, DiffusionKernelDef> = {
  floyd_steinberg: {
    matrix: [
      [0, 0, 7],
      [3, 5, 1],
    ],
    divisor: 16,
    offset: 1,
  },
  jarvis_judice_ninke: {
    matrix: [
      [0, 0, 0, 7, 5],
      [3, 5, 7, 5, 3],
      [1, 3, 5, 3, 1],
    ],
    divisor: 48,
    offset: 2,
  },
  stucki: {
    matrix: [
      [0, 0, 0, 8, 4],
      [2, 4, 8, 4, 2],
      [1, 2, 4, 2, 1],
    ],
    divisor: 42,
    offset: 2,
  },
  burkes: {
    matrix: [
      [0, 0, 0, 8, 4],
      [2, 4, 8, 4, 2],
    ],
    divisor: 32,
    offset: 2,
  },
  sierra: {
    matrix: [
      [0, 0, 0, 5, 3],
      [2, 4, 5, 4, 2],
      [0, 2, 3, 2, 0],
    ],
    divisor: 32,
    offset: 2,
  },
  sierra_2: {
    matrix: [
      [0, 0, 0, 4, 3],
      [1, 2, 3, 2, 1],
    ],
    divisor: 16,
    offset: 2,
  },
  sierra_lite: {
    matrix: [
      [0, 0, 2],
      [1, 1, 0],
    ],
    divisor: 4,
    offset: 1,
  },
  atkinson: {
    matrix: [
      [0, 0, 1, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
    ],
    divisor: 8,
    offset: 1,
  },
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/** Clamp value to 0-1 range */
function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

/** Convert RGB to grayscale (0-1) */
function rgbToGray(r: number, g: number, b: number): number {
  return r * 0.299 + g * 0.587 + b * 0.114
}

/** Create seeded random number generator - uses linear congruential for better distribution */
function createRNG(seed: number): () => number {
  // Use the shared seeded random but with a different algorithm for better spectral properties
  let state = seed || Date.now()
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff
    return state / 0x7fffffff
  }
}

/** Get ordered dithering matrix by name */
function getOrderedMatrix(name: OrderedMatrix): number[][] {
  switch (name) {
    case 'bayer2':
      return BAYER_2
    case 'bayer4':
      return BAYER_4
    case 'bayer8':
      return BAYER_8
    case 'clustered_dot':
      return CLUSTERED_DOT
    case 'void_cluster':
      return VOID_CLUSTER
    default:
      return BAYER_4
  }
}

// ============================================
// BLUE NOISE GENERATION
// ============================================

/** Generate blue noise tile using interleaved gradient noise */
function generateBlueNoiseTile(size: number, seed: number): number[] {
  const tile: number[] = new Array(size * size)
  const phi = 1.618033988749895 // Golden ratio
  const rng = createRNG(seed)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Interleaved gradient noise formula
      const ign = (52.9829189 * ((0.06711056 * x + 0.00583715 * y) % 1)) % 1
      // Add golden ratio based offset for better distribution
      const offset = ((x * phi + y * phi * phi) % 1) + rng() * 0.1
      // Combine and normalize
      tile[y * size + x] = (ign + offset * 0.5) % 1
    }
  }

  return tile
}

/** Sample blue noise at position */
function sampleBlueNoise(
  x: number,
  y: number,
  tile: number[],
  tileSize: number
): number {
  const tx = ((x % tileSize) + tileSize) % tileSize
  const ty = ((y % tileSize) + tileSize) % tileSize
  return tile[ty * tileSize + tx]
}

// ============================================
// ORDERED DITHERING
// ============================================

/** Apply ordered (threshold) dithering */
export function orderedDither(
  imageData: Float32Array[], // Array of rows, each containing RGB values 0-1
  width: number,
  height: number,
  matrix: number[][],
  levels: number = 2,
  strength: number = 100
): DitherResult {
  const matrixSize = matrix.length
  const maxVal = matrixSize * matrixSize
  const strengthFactor = strength / 100

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    const matrixRow: boolean[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const mx = x % matrixSize
      const my = y % matrixSize
      const threshold = (matrix[my][mx] + 0.5) / maxVal

      const idx = x * 3
      const r = imageData[y][idx]
      const g = imageData[y][idx + 1]
      const b = imageData[y][idx + 2]
      const gray = rgbToGray(r, g, b)

      // Apply threshold with strength blending
      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor
      const isDark = gray < adjustedThreshold

      matrixRow.push(isDark)

      // Quantize color
      const step = 1 / (levels - 1)
      const newR = Math.round(r / step) * step
      const newG = Math.round(g / step) * step
      const newB = Math.round(b / step) * step

      colorRow.push({
        r: Math.round(clamp01(newR) * 255),
        g: Math.round(clamp01(newG) * 255),
        b: Math.round(clamp01(newB) * 255),
      })
    }

    resultMatrix.push(matrixRow)
    resultColors.push(colorRow)
  }

  return { matrix: resultMatrix, colors: resultColors }
}

/** Apply Bayer ordered dithering */
export function bayerDither(
  imageData: Float32Array[],
  width: number,
  height: number,
  size: 2 | 4 | 8 = 4,
  levels: number = 2,
  strength: number = 100
): DitherResult {
  const matrix =
    size === 2 ? BAYER_2 : size === 4 ? BAYER_4 : BAYER_8
  return orderedDither(imageData, width, height, matrix, levels, strength)
}

// ============================================
// ERROR DIFFUSION DITHERING
// ============================================

/** Apply error diffusion dithering */
export function errorDiffusion(
  imageData: Float32Array[], // Array of rows, each containing RGB values 0-1
  width: number,
  height: number,
  kernelName: DiffusionKernel = 'floyd_steinberg',
  serpentine: boolean = true,
  levels: number = 2,
  strength: number = 100,
  colorMode: ColorMode = 'bw'
): DitherResult {
  const kernel = DIFFUSION_KERNELS[kernelName]
  const strengthFactor = strength / 100
  const step = 1 / (levels - 1)

  // Make a copy of image data as floating point for error accumulation
  const pixels: { r: number; g: number; b: number }[][] = []
  for (let y = 0; y < height; y++) {
    const row: { r: number; g: number; b: number }[] = []
    for (let x = 0; x < width; x++) {
      const idx = x * 3
      row.push({
        r: imageData[y][idx],
        g: imageData[y][idx + 1],
        b: imageData[y][idx + 2],
      })
    }
    pixels.push(row)
  }

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  // Initialize result arrays
  for (let y = 0; y < height; y++) {
    resultMatrix.push(new Array(width).fill(false))
    resultColors.push(new Array(width).fill({ r: 255, g: 255, b: 255 }))
  }

  // Process each pixel
  for (let y = 0; y < height; y++) {
    const leftToRight = serpentine ? y % 2 === 0 : true
    const startX = leftToRight ? 0 : width - 1
    const endX = leftToRight ? width : -1
    const deltaX = leftToRight ? 1 : -1

    for (let x = startX; x !== endX; x += deltaX) {
      const pixel = pixels[y][x]

      if (colorMode === 'bw') {
        // Black & white
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b)
        const newVal = gray > 0.5 ? 1 : 0
        const error = (gray - newVal) * strengthFactor

        resultMatrix[y][x] = newVal === 0
        resultColors[y][x] = {
          r: newVal * 255,
          g: newVal * 255,
          b: newVal * 255,
        }

        // Distribute error
        distributeError(pixels, x, y, width, height, error, error, error, kernel, leftToRight)
      } else if (colorMode === 'grayscale') {
        // Grayscale with multiple levels
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b)
        const newVal = Math.round(gray / step) * step
        const error = (gray - newVal) * strengthFactor

        resultMatrix[y][x] = newVal < 0.5
        const grayByte = Math.round(clamp01(newVal) * 255)
        resultColors[y][x] = { r: grayByte, g: grayByte, b: grayByte }

        distributeError(pixels, x, y, width, height, error, error, error, kernel, leftToRight)
      } else {
        // Color mode - process each channel
        const newR = Math.round(pixel.r / step) * step
        const newG = Math.round(pixel.g / step) * step
        const newB = Math.round(pixel.b / step) * step

        const errorR = (pixel.r - newR) * strengthFactor
        const errorG = (pixel.g - newG) * strengthFactor
        const errorB = (pixel.b - newB) * strengthFactor

        const brightness = rgbToGray(newR, newG, newB)
        resultMatrix[y][x] = brightness < 0.5

        resultColors[y][x] = {
          r: Math.round(clamp01(newR) * 255),
          g: Math.round(clamp01(newG) * 255),
          b: Math.round(clamp01(newB) * 255),
        }

        distributeError(pixels, x, y, width, height, errorR, errorG, errorB, kernel, leftToRight)
      }
    }
  }

  return { matrix: resultMatrix, colors: resultColors }
}

/** Distribute error to neighboring pixels */
function distributeError(
  pixels: { r: number; g: number; b: number }[][],
  x: number,
  y: number,
  width: number,
  height: number,
  errorR: number,
  errorG: number,
  errorB: number,
  kernel: DiffusionKernelDef,
  leftToRight: boolean
): void {
  for (let ky = 0; ky < kernel.matrix.length; ky++) {
    for (let kx = 0; kx < kernel.matrix[ky].length; kx++) {
      const weight = kernel.matrix[ky][kx]
      if (weight === 0) continue

      let offsetX = kx - kernel.offset
      if (!leftToRight) offsetX = -offsetX

      const nx = x + offsetX
      const ny = y + ky

      if (nx >= 0 && nx < width && ny < height) {
        const factor = weight / kernel.divisor
        pixels[ny][nx].r += errorR * factor
        pixels[ny][nx].g += errorG * factor
        pixels[ny][nx].b += errorB * factor
      }
    }
  }
}

// ============================================
// BLUE NOISE DITHERING
// ============================================

/** Apply blue noise threshold dithering */
export function blueNoiseDither(
  imageData: Float32Array[],
  width: number,
  height: number,
  tileSize: number = 64,
  seed: number = 0,
  levels: number = 2,
  strength: number = 100,
  colorMode: ColorMode = 'bw'
): DitherResult {
  const tile = generateBlueNoiseTile(tileSize, seed)
  const strengthFactor = strength / 100
  const step = 1 / (levels - 1)

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    const matrixRow: boolean[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const threshold = sampleBlueNoise(x, y, tile, tileSize)
      const idx = x * 3
      const r = imageData[y][idx]
      const g = imageData[y][idx + 1]
      const b = imageData[y][idx + 2]

      if (colorMode === 'bw') {
        const gray = rgbToGray(r, g, b)
        const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor
        const isDark = gray < adjustedThreshold

        matrixRow.push(isDark)
        colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 })
      } else if (colorMode === 'grayscale') {
        const gray = rgbToGray(r, g, b)
        const scaled = gray * (levels - 1)
        const low = Math.floor(scaled)
        const high = Math.min(low + 1, levels - 1)
        const frac = scaled - low
        const t = 0.5 + (threshold - 0.5) * strengthFactor
        const newVal = (frac > t ? high : low) / (levels - 1)

        matrixRow.push(newVal < 0.5)
        const grayByte = Math.round(newVal * 255)
        colorRow.push({ r: grayByte, g: grayByte, b: grayByte })
      } else {
        // Color mode
        const quantize = (val: number, noiseOffset: number): number => {
          const t = ((threshold + noiseOffset) % 1)
          const adjustedT = 0.5 + (t - 0.5) * strengthFactor
          const scaled = val * (levels - 1)
          const low = Math.floor(scaled)
          const high = Math.min(low + 1, levels - 1)
          const frac = scaled - low
          return (frac > adjustedT ? high : low) / (levels - 1)
        }

        const newR = quantize(r, 0)
        const newG = quantize(g, 0.33)
        const newB = quantize(b, 0.67)
        const brightness = rgbToGray(newR, newG, newB)

        matrixRow.push(brightness < 0.5)
        colorRow.push({
          r: Math.round(newR * 255),
          g: Math.round(newG * 255),
          b: Math.round(newB * 255),
        })
      }
    }

    resultMatrix.push(matrixRow)
    resultColors.push(colorRow)
  }

  return { matrix: resultMatrix, colors: resultColors }
}

// ============================================
// NOISE-BASED DITHERING
// ============================================

/** Apply white noise dithering */
export function whiteNoiseDither(
  imageData: Float32Array[],
  width: number,
  height: number,
  seed: number = 0,
  strength: number = 100,
  colorMode: ColorMode = 'bw'
): DitherResult {
  const rng = createRNG(seed)
  const strengthFactor = strength / 100

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    const matrixRow: boolean[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const threshold = rng()
      const idx = x * 3
      const r = imageData[y][idx]
      const g = imageData[y][idx + 1]
      const b = imageData[y][idx + 2]
      const gray = rgbToGray(r, g, b)

      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor
      const isDark = gray < adjustedThreshold

      matrixRow.push(isDark)
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 })
    }

    resultMatrix.push(matrixRow)
    resultColors.push(colorRow)
  }

  return { matrix: resultMatrix, colors: resultColors }
}

/** Apply Gaussian noise dithering */
export function gaussianNoiseDither(
  imageData: Float32Array[],
  width: number,
  height: number,
  seed: number = 0,
  strength: number = 100,
  colorMode: ColorMode = 'bw'
): DitherResult {
  const rng = createRNG(seed)
  const strengthFactor = strength / 100

  // Box-Muller transform for Gaussian distribution
  const gaussianRandom = (): number => {
    const u1 = rng() || 0.0001
    const u2 = rng()
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.2 + 0.5
  }

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    const matrixRow: boolean[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const threshold = clamp01(gaussianRandom())
      const idx = x * 3
      const r = imageData[y][idx]
      const g = imageData[y][idx + 1]
      const b = imageData[y][idx + 2]
      const gray = rgbToGray(r, g, b)

      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor
      const isDark = gray < adjustedThreshold

      matrixRow.push(isDark)
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 })
    }

    resultMatrix.push(matrixRow)
    resultColors.push(colorRow)
  }

  return { matrix: resultMatrix, colors: resultColors }
}

/** Apply triangular noise dithering (TPDF) */
export function triangularNoiseDither(
  imageData: Float32Array[],
  width: number,
  height: number,
  seed: number = 0,
  strength: number = 100,
  colorMode: ColorMode = 'bw'
): DitherResult {
  const rng = createRNG(seed)
  const strengthFactor = strength / 100

  // Triangular distribution (sum of two uniform)
  const triangularRandom = (): number => {
    return (rng() + rng()) / 2
  }

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    const matrixRow: boolean[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const threshold = triangularRandom()
      const idx = x * 3
      const r = imageData[y][idx]
      const g = imageData[y][idx + 1]
      const b = imageData[y][idx + 2]
      const gray = rgbToGray(r, g, b)

      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor
      const isDark = gray < adjustedThreshold

      matrixRow.push(isDark)
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 })
    }

    resultMatrix.push(matrixRow)
    resultColors.push(colorRow)
  }

  return { matrix: resultMatrix, colors: resultColors }
}

// ============================================
// TEMPORAL DITHERING (FOR ANIMATION)
// ============================================

/** Apply temporal blue noise dithering for animation frames */
export function temporalBlueNoiseDither(
  imageData: Float32Array[],
  width: number,
  height: number,
  frameIndex: number,
  tileSize: number = 64,
  seed: number = 0,
  colorMode: ColorMode = 'bw'
): DitherResult {
  const tile = generateBlueNoiseTile(tileSize, seed)
  // Use frame index to offset into noise texture for temporal variation
  const offset = (frameIndex * 17) % (tileSize * tileSize)

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    const matrixRow: boolean[] = []
    const colorRow: RGB[] = []

    for (let x = 0; x < width; x++) {
      const idx = x * 3
      const r = imageData[y][idx]
      const g = imageData[y][idx + 1]
      const b = imageData[y][idx + 2]
      const gray = rgbToGray(r, g, b)

      const nx = x % tileSize
      const ny = y % tileSize
      const noiseIdx = (ny * tileSize + nx + offset) % (tileSize * tileSize)
      const threshold = tile[noiseIdx]

      const isDark = gray < threshold

      matrixRow.push(isDark)
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 })
    }

    resultMatrix.push(matrixRow)
    resultColors.push(colorRow)
  }

  return { matrix: resultMatrix, colors: resultColors }
}

// ============================================
// MAIN DITHER FUNCTION
// ============================================

/** Convert ImageData to float array format */
export function imageDataToFloat(imageData: ImageData): Float32Array[] {
  const { data, width, height } = imageData
  const result: Float32Array[] = []

  for (let y = 0; y < height; y++) {
    const row = new Float32Array(width * 3)
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4
      const dstIdx = x * 3
      row[dstIdx] = data[srcIdx] / 255
      row[dstIdx + 1] = data[srcIdx + 1] / 255
      row[dstIdx + 2] = data[srcIdx + 2] / 255
    }
    result.push(row)
  }

  return result
}

/** Apply dithering based on kind */
export function applyDither(
  imageData: ImageData,
  options: DitherOptions
): DitherResult {
  const floatData = imageDataToFloat(imageData)
  const { width, height } = imageData

  switch (options.kind) {
    case 'ordered_bayer':
      return bayerDither(
        floatData,
        width,
        height,
        options.orderedMatrix === 'bayer2' ? 2 :
        options.orderedMatrix === 'bayer8' ? 8 : 4,
        options.levels,
        options.strength
      )

    case 'ordered_clustered':
      return orderedDither(
        floatData,
        width,
        height,
        CLUSTERED_DOT,
        options.levels,
        options.strength
      )

    case 'ordered_void_cluster':
      return orderedDither(
        floatData,
        width,
        height,
        VOID_CLUSTER,
        options.levels,
        options.strength
      )

    case 'blue_noise':
    case 'blue_noise_threshold':
      return blueNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseTileSize,
        options.blueNoiseSeed,
        options.levels,
        options.strength,
        options.colorMode
      )

    case 'white_noise':
      return whiteNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseSeed,
        options.strength,
        options.colorMode
      )

    case 'gaussian_noise':
      return gaussianNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseSeed,
        options.strength,
        options.colorMode
      )

    case 'triangular_noise':
      return triangularNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseSeed,
        options.strength,
        options.colorMode
      )

    case 'error_diffusion':
    case 'true_dither':
    default:
      return errorDiffusion(
        floatData,
        width,
        height,
        options.diffusionKernel,
        options.serpentine,
        options.levels,
        options.strength,
        options.colorMode
      )
  }
}

// ============================================
// EXPORT
// ============================================

export const DitherAlgorithms = {
  // Ordered dithering
  orderedDither,
  bayerDither,

  // Error diffusion
  errorDiffusion,

  // Blue noise
  blueNoiseDither,
  temporalBlueNoiseDither,

  // Random noise
  whiteNoiseDither,
  gaussianNoiseDither,
  triangularNoiseDither,

  // Main function
  applyDither,
  imageDataToFloat,

  // Matrices
  BAYER_2,
  BAYER_4,
  BAYER_8,
  CLUSTERED_DOT,
  VOID_CLUSTER,

  // Kernels
  DIFFUSION_KERNELS,
}

export default DitherAlgorithms
