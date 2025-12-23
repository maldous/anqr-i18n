/**
 * QR Code generation module using vendor/lib/qrcode-generator
 * 
 * This module wraps the vendor QR code generator library and provides
 * dithered matrix generation for image overlay effects.
 */

import qrcode from "../../vendor/lib/qrcode-generator/qrcode.mjs";

// Error correction level mapping
const ECC_MAP: Record<string, "L" | "M" | "Q" | "H"> = {
  L: "L",
  M: "M",
  Q: "Q",
  H: "H",
  low: "L",
  medium: "M",
  quartile: "Q",
  high: "H",
};

// Alignment pattern positions by version
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
];

export interface GenerateOptions {
  text: string;
  ecc: string;
  version?: number;
  scale: number;
  overlayCanvas?: HTMLCanvasElement;
  overlayIntensity?: number;
}

/**
 * Check if a position is a locked structural element (finder patterns, timing, alignment)
 */
function isLocked(
  moduleCount: number,
  x: number,
  y: number,
  scale: number
): boolean {
  const l = moduleCount / scale;
  const sx = Math.floor(x / scale);
  const sy = Math.floor(y / scale);

  // Out of bounds
  if (sx < 0 || sy < 0 || sx >= l || sy >= l) return true;

  // Finder patterns (top-left, top-right, bottom-left)
  if (sx < 7 && sy < 7) return true;
  if (sx < 7 && sy > l - 8) return true;
  if (sx > l - 8 && sy < 7) return true;

  // Timing patterns
  if (sx === 6 || sy === 6) return true;

  // Alignment patterns
  const version = (l - 17) / 4;
  const positions = ALIGNMENT_POSITIONS[version];
  if (positions && positions.length > 0) {
    for (const px of positions) {
      for (const py of positions) {
        // Skip alignment patterns that overlap with finder patterns
        if (px < 8 && py < 8) continue;
        if (px < 8 && py > l - 9) continue;
        if (px > l - 9 && py < 8) continue;

        if (Math.abs(sx - px) <= 2 && Math.abs(sy - py) <= 2) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Check if a position is a data point (center of scaled module)
 */
function isData(x: number, y: number, scale: number): boolean {
  const m = Math.floor(scale / 2);
  const xs = x % scale;
  const ys = y % scale;

  if (xs === m && ys === m) return true;
  if (scale % 2 === 1) return false;

  // For even scales, data occupies 2x2 center
  if (xs === m && ys === m - 1) return true;
  if (xs === m - 1 && ys === m) return true;
  if (xs === m - 1 && ys === m - 1) return true;

  return false;
}

/**
 * Load image data from canvas and convert to brightness values
 */
function loadImageData(
  canvas: HTMLCanvasElement,
  size: number
): number[][] {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = size;
  tempCanvas.height = size;
  const ctx = tempCanvas.getContext("2d")!;

  ctx.drawImage(canvas, 0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);

  const output: number[][] = [];
  for (let y = 0; y < size; y++) {
    const row: number[] = [];
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      // Use green channel for brightness (most perceptually accurate)
      const value = imgData.data[i + 1] / 255;
      row.push(value);
    }
    output.push(row);
  }

  return output;
}

/**
 * Apply Floyd-Steinberg error diffusion to free points
 */
function diffuseFreePoints(
  imageData: number[][],
  moduleCount: number,
  scale: number
): void {
  const size = imageData.length;

  function canChange(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= size || y >= size) return false;
    return !isLocked(moduleCount, x, y, scale) && !isData(x, y, scale);
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!canChange(x, y)) continue;

      const oldVal = imageData[y][x];
      const newVal = Math.round(oldVal);
      const error = oldVal - newVal;
      imageData[y][x] = newVal;

      // Distribute error to neighbors
      const a = canChange(x + 1, y);
      const b = canChange(x - 1, y + 1);
      const c = canChange(x, y + 1);
      const d = canChange(x + 1, y + 1);

      const total = (a ? 7 : 0) + (b ? 3 : 0) + (c ? 5 : 0) + (d ? 1 : 0);
      if (total === 0) continue;

      if (a) imageData[y][x + 1] += (error * 7) / total;
      if (b) imageData[y + 1][x - 1] += (error * 3) / total;
      if (c) imageData[y + 1][x] += (error * 5) / total;
      if (d) imageData[y + 1][x + 1] += error / total;
    }
  }
}

/**
 * Generate a dithered QR code matrix
 * 
 * @param options - Generation options
 * @returns 2D boolean array representing the QR code (true = dark module)
 */
export default function generateDitheredMatrix(
  options: GenerateOptions
): boolean[][] {
  const { text, ecc, version = 0, scale, overlayCanvas, overlayIntensity = 50 } = options;

  // Map error correction level
  const eccLevel = ECC_MAP[ecc] || "Q";

  // Generate base QR code using vendor library
  // Type 0 = auto-detect version
  const typeNumber = version || 0;
  const qr = qrcode(typeNumber, eccLevel);
  qr.addData(text);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const scaledSize = moduleCount * scale;

  // Create scaled QR matrix
  const matrix: boolean[][] = [];
  for (let y = 0; y < scaledSize; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < scaledSize; x++) {
      const qrX = Math.floor(x / scale);
      const qrY = Math.floor(y / scale);
      row.push(qr.isDark(qrY, qrX));
    }
    matrix.push(row);
  }

  // If no overlay, return the scaled QR as-is
  if (!overlayCanvas) {
    return matrix;
  }

  // Load and process overlay image
  const imageData = loadImageData(overlayCanvas, scaledSize);
  const intensity = overlayIntensity / 100;

  // Apply dithering to free points (non-data, non-locked)
  diffuseFreePoints(imageData, scaledSize, scale);

  // Merge image data with QR matrix for free points
  for (let y = 0; y < scaledSize; y++) {
    for (let x = 0; x < scaledSize; x++) {
      // Skip locked areas (finder patterns, timing, alignment)
      if (isLocked(scaledSize, x, y, scale)) continue;

      // Skip data points (must preserve QR data)
      if (isData(x, y, scale)) continue;

      // Free point: use image brightness to determine black/white
      const brightness = imageData[y][x];
      const useImage = Math.random() < intensity;
      
      if (useImage) {
        // Dark if brightness < 0.5 (inverted for QR display)
        matrix[y][x] = brightness < 0.5;
      }
    }
  }

  return matrix;
}
