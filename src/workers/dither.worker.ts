/**
 * Dither Web Worker
 * 
 * Offloads CPU-heavy dithering operations to a background thread.
 * Uses Comlink for seamless async communication with the main thread.
 * 
 * Note: This worker includes inline implementations of core dithering algorithms
 * since Web Workers cannot easily import from the main bundle in Vite.
 */

import * as Comlink from 'comlink'

// ============================================
// INLINE TYPES (matching store types)
// ============================================

type DitherKind = 
  | 'error_diffusion' 
  | 'ordered_bayer' | 'ordered_clustered' | 'ordered_void_cluster'
  | 'blue_noise_threshold' | 'true_dither'
  | 'blue_noise' | 'white_noise' | 'gaussian_noise' | 'triangular_noise'
  | 'blue_noise_error_diffusion' | 'screened_blue_noise' | 'perceptual' | 'edge_aware' | 'adaptive_threshold' | 'temporal_blue_noise'
type DiffusionKernel = 'floyd_steinberg' | 'jarvis_judice_ninke' | 'stucki' | 'burkes' | 'sierra' | 'sierra_2' | 'sierra_lite' | 'atkinson'
type OrderedMatrix = 'bayer2' | 'bayer4' | 'bayer8' | 'clustered_dot' | 'void_cluster'
type ColorMode = 'bw' | 'grayscale' | 'color'

interface RGB {
  r: number
  g: number
  b: number
}

interface DitherOptions {
  kind: DitherKind
  strength: number
  serpentine: boolean
  diffusionKernel: DiffusionKernel
  orderedMatrix: OrderedMatrix
  colorMode: ColorMode
  levels: number
  blueNoiseSeed: number
  blueNoiseTileSize: number
}

interface DitherResult {
  matrix: boolean[][]
  colors: RGB[][]
}

// ============================================
// WORKER API TYPES
// ============================================

export interface DitherWorkerInput {
  imageData: {
    data: Uint8ClampedArray
    width: number
    height: number
  }
  options: DitherOptions
}

export interface DitherWorkerResult {
  matrix: boolean[][]
  colors: RGB[][]
  processingTimeMs: number
}

// ============================================
// INLINE DITHERING IMPLEMENTATIONS
// ============================================

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
]

const DIFFUSION_KERNELS: Record<DiffusionKernel, { matrix: number[][]; divisor: number; offset: number }> = {
  floyd_steinberg: { matrix: [[0, 0, 7], [3, 5, 1]], divisor: 16, offset: 1 },
  jarvis_judice_ninke: { matrix: [[0, 0, 0, 7, 5], [3, 5, 7, 5, 3], [1, 3, 5, 3, 1]], divisor: 48, offset: 2 },
  stucki: { matrix: [[0, 0, 0, 8, 4], [2, 4, 8, 4, 2], [1, 2, 4, 2, 1]], divisor: 42, offset: 2 },
  burkes: { matrix: [[0, 0, 0, 8, 4], [2, 4, 8, 4, 2]], divisor: 32, offset: 2 },
  sierra: { matrix: [[0, 0, 0, 5, 3], [2, 4, 5, 4, 2], [0, 2, 3, 2, 0]], divisor: 32, offset: 2 },
  sierra_2: { matrix: [[0, 0, 0, 4, 3], [1, 2, 3, 2, 1]], divisor: 16, offset: 2 },
  sierra_lite: { matrix: [[0, 0, 2], [1, 1, 0]], divisor: 4, offset: 1 },
  atkinson: { matrix: [[0, 0, 1, 1], [1, 1, 1, 0], [0, 1, 0, 0]], divisor: 8, offset: 1 },
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

function rgbToGray(r: number, g: number, b: number): number {
  return r * 0.299 + g * 0.587 + b * 0.114
}

function imageDataToFloat(data: Uint8ClampedArray, width: number, height: number): Float32Array[] {
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

function errorDiffusionWorker(
  floatData: Float32Array[],
  width: number,
  height: number,
  kernelName: DiffusionKernel,
  serpentine: boolean,
  levels: number,
  strength: number,
  colorMode: ColorMode
): DitherResult {
  const kernel = DIFFUSION_KERNELS[kernelName]
  const strengthFactor = strength / 100
  const step = 1 / (levels - 1)

  const pixels: { r: number; g: number; b: number }[][] = []
  for (let y = 0; y < height; y++) {
    const row: { r: number; g: number; b: number }[] = []
    for (let x = 0; x < width; x++) {
      const idx = x * 3
      row.push({ r: floatData[y][idx], g: floatData[y][idx + 1], b: floatData[y][idx + 2] })
    }
    pixels.push(row)
  }

  const resultMatrix: boolean[][] = []
  const resultColors: RGB[][] = []

  for (let y = 0; y < height; y++) {
    resultMatrix.push(new Array(width).fill(false))
    resultColors.push(new Array(width).fill({ r: 255, g: 255, b: 255 }))
  }

  for (let y = 0; y < height; y++) {
    const leftToRight = serpentine ? y % 2 === 0 : true
    const startX = leftToRight ? 0 : width - 1
    const endX = leftToRight ? width : -1
    const deltaX = leftToRight ? 1 : -1

    for (let x = startX; x !== endX; x += deltaX) {
      const pixel = pixels[y][x]

      if (colorMode === 'bw') {
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b)
        const newVal = gray > 0.5 ? 1 : 0
        const error = (gray - newVal) * strengthFactor

        resultMatrix[y][x] = newVal === 0
        resultColors[y][x] = { r: newVal * 255, g: newVal * 255, b: newVal * 255 }

        distributeErrorWorker(pixels, x, y, width, height, error, error, error, kernel, leftToRight)
      } else {
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

        distributeErrorWorker(pixels, x, y, width, height, errorR, errorG, errorB, kernel, leftToRight)
      }
    }
  }

  return { matrix: resultMatrix, colors: resultColors }
}

function distributeErrorWorker(
  pixels: { r: number; g: number; b: number }[][],
  x: number, y: number, width: number, height: number,
  errorR: number, errorG: number, errorB: number,
  kernel: { matrix: number[][]; divisor: number; offset: number },
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

function bayerDitherWorker(
  floatData: Float32Array[],
  width: number,
  height: number,
  strength: number
): DitherResult {
  const matrix = BAYER_4
  const matrixSize = 4
  const maxVal = 16
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
      const r = floatData[y][idx]
      const g = floatData[y][idx + 1]
      const b = floatData[y][idx + 2]
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

function applyDitherWorker(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  options: DitherOptions
): DitherResult {
  const floatData = imageDataToFloat(data, width, height)

  switch (options.kind) {
    case 'ordered_bayer':
      return bayerDitherWorker(floatData, width, height, options.strength)
    case 'error_diffusion':
    case 'true_dither':
    default:
      return errorDiffusionWorker(
        floatData, width, height,
        options.diffusionKernel,
        options.serpentine,
        options.levels,
        options.strength,
        options.colorMode
      )
  }
}

// ============================================
// WORKER API
// ============================================

const ditherWorkerApi = {
  async ditherImage(input: DitherWorkerInput): Promise<DitherWorkerResult> {
    const startTime = performance.now()
    
    const result = applyDitherWorker(
      input.imageData.data,
      input.imageData.width,
      input.imageData.height,
      input.options
    )
    
    return {
      matrix: result.matrix,
      colors: result.colors,
      processingTimeMs: performance.now() - startTime,
    }
  },

  async ping(): Promise<string> {
    return 'pong'
  },
}

Comlink.expose(ditherWorkerApi)

export type DitherWorkerApi = typeof ditherWorkerApi
