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

export type ColorMode = "color" | "grayscale" | "bw";

export interface GenerateOptions {
  text: string;
  ecc: string;
  version?: number;
  scale: number;
  overlayCanvas?: HTMLCanvasElement;
  overlayIntensity?: number;
  colorMode?: ColorMode;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface DitheredResult {
  matrix: boolean[][];
  colors: RGB[][];
}

/**
 * Check if a position is a locked structural element (finder patterns, timing, alignment)
 */
function isLocked(
  moduleCount: number,
  x: number,
  y: number,
  scale: number,
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
 * Load image data from canvas as RGB values (0-1 range)
 */
function loadImageDataRGB(
  canvas: HTMLCanvasElement,
  size: number,
): { r: number; g: number; b: number }[][] {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = size;
  tempCanvas.height = size;
  const ctx = tempCanvas.getContext("2d")!;

  ctx.drawImage(canvas, 0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);

  const output: { r: number; g: number; b: number }[][] = [];
  for (let y = 0; y < size; y++) {
    const row: { r: number; g: number; b: number }[] = [];
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      row.push({
        r: imgData.data[i] / 255,
        g: imgData.data[i + 1] / 255,
        b: imgData.data[i + 2] / 255,
      });
    }
    output.push(row);
  }

  return output;
}

/**
 * Convert RGB to grayscale using luminance formula
 */
function rgbToGray(r: number, g: number, b: number): number {
  return r * 0.299 + g * 0.587 + b * 0.114;
}

/**
 * Convert RGB image data to grayscale
 */
function convertToGrayscale(
  imageData: { r: number; g: number; b: number }[][],
): void {
  for (let y = 0; y < imageData.length; y++) {
    for (let x = 0; x < imageData[y].length; x++) {
      const { r, g, b } = imageData[y][x];
      const gray = rgbToGray(r, g, b);
      imageData[y][x] = { r: gray, g: gray, b: gray };
    }
  }
}

/**
 * Apply Floyd-Steinberg error diffusion to free points (RGB version)
 * This applies dithering to each RGB channel independently for color preservation
 */
function diffuseFreePointsRGB(
  imageData: { r: number; g: number; b: number }[][],
  moduleCount: number,
  scale: number,
  colorMode: ColorMode,
): void {
  const size = imageData.length;

  function canChange(x: number, y: number): boolean {
    if (x < 0 || y < 0 || x >= size || y >= size) return false;
    return !isLocked(moduleCount, x, y, scale) && !isData(x, y, scale);
  }

  function distributeError(
    x: number,
    y: number,
    errorR: number,
    errorG: number,
    errorB: number,
  ): void {
    const a = canChange(x + 1, y);
    const b = canChange(x - 1, y + 1);
    const c = canChange(x, y + 1);
    const d = canChange(x + 1, y + 1);

    const total = (a ? 7 : 0) + (b ? 3 : 0) + (c ? 5 : 0) + (d ? 1 : 0);
    if (total === 0) return;

    if (a) {
      imageData[y][x + 1].r += (errorR * 7) / total;
      imageData[y][x + 1].g += (errorG * 7) / total;
      imageData[y][x + 1].b += (errorB * 7) / total;
    }
    if (b) {
      imageData[y + 1][x - 1].r += (errorR * 3) / total;
      imageData[y + 1][x - 1].g += (errorG * 3) / total;
      imageData[y + 1][x - 1].b += (errorB * 3) / total;
    }
    if (c) {
      imageData[y + 1][x].r += (errorR * 5) / total;
      imageData[y + 1][x].g += (errorG * 5) / total;
      imageData[y + 1][x].b += (errorB * 5) / total;
    }
    if (d) {
      imageData[y + 1][x + 1].r += errorR / total;
      imageData[y + 1][x + 1].g += errorG / total;
      imageData[y + 1][x + 1].b += errorB / total;
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!canChange(x, y)) continue;

      const pixel = imageData[y][x];

      if (colorMode === "bw") {
        // Black & white: quantize to 0 or 1 based on luminance
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b);
        const newVal = gray > 0.5 ? 1 : 0;
        const error = gray - newVal;

        imageData[y][x] = { r: newVal, g: newVal, b: newVal };
        distributeError(x, y, error, error, error);
      } else if (colorMode === "grayscale") {
        // Grayscale: quantize gray levels (4-level quantization for smoother gradients)
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b);
        // Quantize to 4 levels: 0, 0.33, 0.67, 1
        const levels = 4;
        const newVal = Math.round(gray * (levels - 1)) / (levels - 1);
        const error = gray - newVal;

        imageData[y][x] = { r: newVal, g: newVal, b: newVal };
        distributeError(x, y, error, error, error);
      } else {
        // Color mode: quantize each channel to multiple levels for color preservation
        // Use 4 levels per channel (64 colors total) for good color fidelity
        const levels = 4;
        const newR = Math.round(pixel.r * (levels - 1)) / (levels - 1);
        const newG = Math.round(pixel.g * (levels - 1)) / (levels - 1);
        const newB = Math.round(pixel.b * (levels - 1)) / (levels - 1);

        const errorR = pixel.r - newR;
        const errorG = pixel.g - newG;
        const errorB = pixel.b - newB;

        imageData[y][x] = { r: newR, g: newG, b: newB };
        distributeError(x, y, errorR, errorG, errorB);
      }
    }
  }
}

/**
 * Generate a dithered QR code matrix with color support
 *
 * @param options - Generation options
 * @returns Object containing boolean matrix and RGB color data for each pixel
 */
export default function generateDitheredMatrix(
  options: GenerateOptions,
): DitheredResult {
  const {
    text,
    ecc,
    version = 0,
    scale,
    overlayCanvas,
    overlayIntensity = 50,
    colorMode = "color",
  } = options;

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

  // Create scaled QR matrix and initialize colors
  const matrix: boolean[][] = [];
  const colors: RGB[][] = [];

  for (let y = 0; y < scaledSize; y++) {
    const matrixRow: boolean[] = [];
    const colorRow: RGB[] = [];
    for (let x = 0; x < scaledSize; x++) {
      const qrX = Math.floor(x / scale);
      const qrY = Math.floor(y / scale);
      const isDark = qr.isDark(qrY, qrX);
      matrixRow.push(isDark);
      // Default color: black for dark, white for light
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
    }
    matrix.push(matrixRow);
    colors.push(colorRow);
  }

  // If no overlay, return the scaled QR with default colors
  if (!overlayCanvas) {
    return { matrix, colors };
  }

  // Load and process overlay image as RGB
  const imageData = loadImageDataRGB(overlayCanvas, scaledSize);
  const intensity = overlayIntensity / 100;

  // Convert to grayscale first if needed (affects the source data for dithering)
  if (colorMode === "grayscale" || colorMode === "bw") {
    convertToGrayscale(imageData);
  }

  // Apply Floyd-Steinberg error diffusion to free points
  diffuseFreePointsRGB(imageData, scaledSize, scale, colorMode);

  // Merge image data with QR matrix for free points
  for (let y = 0; y < scaledSize; y++) {
    for (let x = 0; x < scaledSize; x++) {
      // Skip locked areas (finder patterns, timing, alignment)
      if (isLocked(scaledSize, x, y, scale)) continue;

      // Skip data points (must preserve QR data)
      if (isData(x, y, scale)) continue;

      // Free point: use dithered image data
      const pixel = imageData[y][x];
      const brightness = rgbToGray(pixel.r, pixel.g, pixel.b);
      const useImage = Math.random() < intensity;

      if (useImage) {
        // For the boolean matrix: dark if brightness < 0.5
        matrix[y][x] = brightness < 0.5;

        // For the color matrix: use the dithered RGB values (convert from 0-1 to 0-255)
        colors[y][x] = {
          r: Math.round(Math.max(0, Math.min(1, pixel.r)) * 255),
          g: Math.round(Math.max(0, Math.min(1, pixel.g)) * 255),
          b: Math.round(Math.max(0, Math.min(1, pixel.b)) * 255),
        };
      }
    }
  }

  return { matrix, colors };
}
