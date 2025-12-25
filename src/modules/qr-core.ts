/**
 * QR Core Module
 * Provides QR code generation, encoding, and structural element detection
 * Wraps vendor/lib/qrcode-generator with TypeScript types
 */

import qrcode from '../../vendor/lib/qrcode-generator/qrcode.mjs'

// ============================================
// TYPES
// ============================================

export type ECCLevel = 'L' | 'M' | 'Q' | 'H'
export type MaskPattern = 'auto' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
export type EncodingMode = 'auto' | 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji'

export interface QROptions {
  text: string
  ecc: ECCLevel
  version?: number // 0 = auto, 1-40
  mask?: MaskPattern
  scale?: number // subpixel scale (e.g., 3 for 3x3 per module)
}

export interface QRMatrix {
  matrix: boolean[][]
  moduleCount: number
  version: number
}

export interface QRInstance {
  isDark: (row: number, col: number) => boolean
  getModuleCount: () => number
}

// ============================================
// ALIGNMENT PATTERN POSITIONS
// ============================================

const ALIGNMENT_POSITIONS: (number[] | null)[] = [
  null,
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
]

// ECC capacity (bytes) per version
const ECC_CAPACITIES: Record<ECCLevel, number[]> = {
  L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953],
  M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331],
  Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663],
  H: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273],
}

// ============================================
// VERSION CALCULATION
// ============================================

/**
 * Calculate optimal QR version for given content and ECC level
 */
export function calculateOptimalVersion(content: string, ecc: ECCLevel): number {
  const caps = ECC_CAPACITIES[ecc]
  const len = content.length

  for (let v = 0; v < caps.length; v++) {
    if (caps[v] >= len) {
      return v + 1
    }
  }

  return 40
}

/**
 * Get QR version from module count
 */
export function getVersionFromModuleCount(moduleCount: number): number {
  return (moduleCount - 17) / 4
}

/**
 * Get module count for a QR version
 */
export function getModuleCountForVersion(version: number): number {
  return version * 4 + 17
}

// ============================================
// STRUCTURAL ELEMENT DETECTION
// ============================================

/**
 * Get alignment pattern positions for a QR version
 */
export function getAlignmentPositions(version: number): number[] {
  if (version < 2 || version > 40) return []
  return ALIGNMENT_POSITIONS[version] || []
}

/**
 * Check if a position is a finder pattern (7x7 corner patterns)
 */
export function isFinderPattern(row: number, col: number, moduleCount: number): boolean {
  // Top-left
  if (row < 7 && col < 7) return true
  // Top-right
  if (row < 7 && col >= moduleCount - 7) return true
  // Bottom-left
  if (row >= moduleCount - 7 && col < 7) return true
  return false
}

/**
 * Check if a position is a timing pattern (row/col 6)
 */
export function isTimingPattern(row: number, col: number): boolean {
  return row === 6 || col === 6
}

/**
 * Check if a position is an alignment pattern
 */
export function isAlignmentPattern(
  row: number,
  col: number,
  moduleCount: number
): boolean {
  const version = getVersionFromModuleCount(moduleCount)
  const positions = getAlignmentPositions(version)
  
  if (positions.length === 0) return false

  for (const px of positions) {
    for (const py of positions) {
      // Skip alignment patterns that overlap with finder patterns
      if (px < 8 && py < 8) continue
      if (px < 8 && py > moduleCount - 9) continue
      if (px > moduleCount - 9 && py < 8) continue

      if (Math.abs(row - py) <= 2 && Math.abs(col - px) <= 2) {
        return true
      }
    }
  }

  return false
}

/**
 * Check if a position is a locked structural element
 * (finder patterns, timing, alignment - cannot be modified)
 */
export function isLocked(
  moduleCount: number,
  x: number,
  y: number,
  scale: number = 1
): boolean {
  const l = moduleCount / scale
  const sx = Math.floor(x / scale)
  const sy = Math.floor(y / scale)

  // Out of bounds
  if (sx < 0 || sy < 0 || sx >= l || sy >= l) return true

  // Finder patterns (top-left, top-right, bottom-left)
  if (sx < 7 && sy < 7) return true
  if (sx < 7 && sy > l - 8) return true
  if (sx > l - 8 && sy < 7) return true

  // Timing patterns
  if (sx === 6 || sy === 6) return true

  // Alignment patterns
  const version = getVersionFromModuleCount(l)
  const positions = getAlignmentPositions(version)
  
  if (positions.length > 0) {
    for (const px of positions) {
      for (const py of positions) {
        // Skip alignment patterns that overlap with finder patterns
        if (px < 8 && py < 8) continue
        if (px < 8 && py > l - 9) continue
        if (px > l - 9 && py < 8) continue

        if (Math.abs(sx - px) <= 2 && Math.abs(sy - py) <= 2) {
          return true
        }
      }
    }
  }

  return false
}

/**
 * Check if a position is a data point (center of scaled module)
 * Data points must preserve QR values for scannability
 */
export function isData(x: number, y: number, scale: number): boolean {
  const m = Math.floor(scale / 2)
  const xs = x % scale
  const ys = y % scale

  if (xs === m && ys === m) return true
  if (scale % 2 === 1) return false

  // For even scales, data occupies 2x2 center
  if (xs === m && ys === m - 1) return true
  if (xs === m - 1 && ys === m) return true
  if (xs === m - 1 && ys === m - 1) return true

  return false
}

/**
 * Check if a module is a structural element that cannot be modified
 * More comprehensive than isLocked - includes format/version info
 */
export function isStructuralModule(
  row: number,
  col: number,
  moduleCount: number,
  version: number
): boolean {
  // Finder patterns + separators
  if (row < 8 && col < 8) return true
  if (row < 8 && col >= moduleCount - 8) return true
  if (row >= moduleCount - 8 && col < 8) return true
  
  // Timing patterns
  if (row === 6 || col === 6) return true
  
  // Format information
  if (row === 8 && col < 9) return true
  if (col === 8 && row < 9) return true
  if (row === 8 && col >= moduleCount - 8) return true
  if (col === 8 && row >= moduleCount - 8) return true
  
  // Dark module
  if (row === moduleCount - 8 && col === 8) return true
  
  // Version info (version 7+)
  if (version >= 7) {
    if (row >= moduleCount - 11 && row < moduleCount - 8 && col < 6) return true
    if (col >= moduleCount - 11 && col < moduleCount - 8 && row < 6) return true
  }
  
  // Alignment patterns (version 2+)
  if (version >= 2) {
    const positions = getAlignmentPositions(version)
    for (const px of positions) {
      for (const py of positions) {
        if (px < 8 && py < 8) continue
        if (px < 8 && py > moduleCount - 9) continue
        if (px > moduleCount - 9 && py < 8) continue
        if (Math.abs(row - py) <= 2 && Math.abs(col - px) <= 2) return true
      }
    }
  }
  
  return false
}

// ============================================
// QR GENERATION
// ============================================

/**
 * Generate a QR code matrix
 */
export function generateQR(options: QROptions): QRMatrix {
  const { text, ecc, version = 0, scale = 1 } = options

  // Auto-detect version if not specified
  let typeNumber = version
  if (typeNumber === 0) {
    typeNumber = calculateOptimalVersion(text, ecc)
  }

  // Generate QR using vendor library
  const qr = qrcode(typeNumber, ecc)
  qr.addData(text)
  qr.make()

  const moduleCount = qr.getModuleCount()
  const scaledSize = moduleCount * scale

  // Create matrix
  const matrix: boolean[][] = []
  for (let y = 0; y < scaledSize; y++) {
    const row: boolean[] = []
    for (let x = 0; x < scaledSize; x++) {
      const qrX = Math.floor(x / scale)
      const qrY = Math.floor(y / scale)
      row.push(qr.isDark(qrY, qrX))
    }
    matrix.push(row)
  }

  return {
    matrix,
    moduleCount: scaledSize,
    version: typeNumber,
  }
}

/**
 * Generate a raw QR instance for direct access
 */
export function createQRInstance(
  text: string,
  ecc: ECCLevel,
  version: number = 0
): QRInstance {
  let typeNumber = version
  if (typeNumber === 0) {
    typeNumber = calculateOptimalVersion(text, ecc)
  }

  const qr = qrcode(typeNumber, ecc)
  qr.addData(text)
  qr.make()

  return qr
}

// ============================================
// EXPORT
// ============================================

export const QRCore = {
  // Generation
  generateQR,
  createQRInstance,
  
  // Version
  calculateOptimalVersion,
  getVersionFromModuleCount,
  getModuleCountForVersion,
  
  // Structural detection
  getAlignmentPositions,
  isFinderPattern,
  isTimingPattern,
  isAlignmentPattern,
  isLocked,
  isData,
  isStructuralModule,
  
  // Constants
  ALIGNMENT_POSITIONS,
  ECC_CAPACITIES,
}

export default QRCore
