/**
 * Exporter Module
 * Handles PNG, WebP, GIF, and SVG export with full color support
 * Uses gifenc npm package for high-quality GIF encoding
 * Supports native file saving on Android/iOS via Capacitor
 */

import { Capacitor } from '@capacitor/core';
import { applyPalette, GIFEncoder, quantize } from 'gifenc';
import { saveBase64ToDocuments } from './media-store-writer';

// ============================================
// TYPES
// ============================================

export type OutputFormat = 'png' | 'webp' | 'gif' | 'svg' | 'jpeg';

export interface ExportConfig {
  outputFormat: OutputFormat;
  outputWidth: number;
  outputHeight: number;
  outputQuality: number; // 0-1
  filename: string;
  animationSpeed: number; // ms per frame
  loopAnimation: boolean;
  transparentBackground: boolean;
  dpi: number;
  includeMetadata: boolean;
  includeQuietZone: boolean; // If false, crop quiet zone from output
  bgOverride: string; // Override background color (empty = use original)
  gifDisposal: string; // GIF frame disposal method
  metadata?: {
    title?: string;
    author?: string;
    copyright?: string;
    description?: string;
  };
}

export interface ExportResult {
  blob: Blob;
  url: string;
  filename: string;
  format: OutputFormat;
  width: number;
  height: number;
}

// ============================================
// PNG METADATA EMBEDDING
// ============================================

/**
 * Create PNG pHYs chunk for DPI embedding
 */
function createPngPhysChunk(dpi: number): Uint8Array {
  // Convert DPI to pixels per meter (1 inch = 0.0254 meters)
  const pixelsPerMeter = Math.round(dpi / 0.0254);

  // pHYs chunk: 4 bytes X pixels per unit, 4 bytes Y pixels per unit, 1 byte unit specifier
  const chunkData = new Uint8Array(9);
  const dataView = new DataView(chunkData.buffer);

  // X pixels per unit (big-endian)
  dataView.setUint32(0, pixelsPerMeter, false);
  // Y pixels per unit (big-endian)
  dataView.setUint32(4, pixelsPerMeter, false);
  // Unit specifier: 1 = meter
  chunkData[8] = 1;

  // Create full chunk with length, type, data, CRC
  const chunkType = new TextEncoder().encode('pHYs');
  const chunk = new Uint8Array(4 + 4 + 9 + 4);
  const chunkView = new DataView(chunk.buffer);

  // Length
  chunkView.setUint32(0, 9, false);
  // Type
  chunk.set(chunkType, 4);
  // Data
  chunk.set(chunkData, 8);
  // CRC
  const crcData = new Uint8Array(4 + 9);
  crcData.set(chunkType, 0);
  crcData.set(chunkData, 4);
  const crc = calculateCrc32(crcData);
  chunkView.setUint32(17, crc, false);

  return chunk;
}

/**
 * Embed DPI into PNG blob
 */
async function embedPngDpi(pngBlob: Blob, dpi: number): Promise<Blob> {
  if (!dpi || dpi <= 0) return pngBlob;

  const arrayBuffer = await pngBlob.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);

  // Find IHDR chunk end (it's always first after signature)
  // PNG signature is 8 bytes, IHDR length is 4 bytes, type is 4 bytes, data is 13 bytes, CRC is 4 bytes
  const ihdrEnd = 8 + 4 + 4 + 13 + 4; // = 33

  // Create pHYs chunk
  const physChunk = createPngPhysChunk(dpi);

  // Insert pHYs chunk after IHDR
  const newPng = new Uint8Array(data.length + physChunk.length);
  newPng.set(data.slice(0, ihdrEnd), 0);
  newPng.set(physChunk, ihdrEnd);
  newPng.set(data.slice(ihdrEnd), ihdrEnd + physChunk.length);

  return new Blob([newPng], { type: 'image/png' });
}

export interface PngMetadata {
  title?: string;
  author?: string;
  description?: string;
  copyright?: string;
  creationTime?: string;
  software?: string;
  comment?: string;
  [key: string]: string | undefined;
}

/**
 * Create a PNG iTXt chunk for metadata embedding (UTF-8 safe)
 * Using iTXt instead of tEXt because tEXt requires Latin-1 encoding,
 * while iTXt properly supports UTF-8 for international text.
 */
function createPngTextChunk(keyword: string, text: string): Uint8Array {
  const keywordBytes = new TextEncoder().encode(keyword);
  const textBytes = new TextEncoder().encode(text);

  // iTXt chunk structure:
  // keyword (1-79 bytes) + null + compression flag (1 byte) + compression method (1 byte)
  // + language tag + null + translated keyword + null + text
  // For uncompressed UTF-8: compression=0, method=0, language="", translated=""
  const compressionFlag = 0; // No compression
  const compressionMethod = 0;
  const languageTag = new Uint8Array(0); // Empty language tag
  const translatedKeyword = new Uint8Array(0); // Empty translated keyword

  // Calculate chunk data size
  const chunkDataSize =
    keywordBytes.length +
    1 +
    1 +
    1 +
    languageTag.length +
    1 +
    translatedKeyword.length +
    1 +
    textBytes.length;
  const chunkData = new Uint8Array(chunkDataSize);

  let offset = 0;
  chunkData.set(keywordBytes, offset);
  offset += keywordBytes.length;
  chunkData[offset++] = 0; // Null separator after keyword
  chunkData[offset++] = compressionFlag;
  chunkData[offset++] = compressionMethod;
  // Language tag (empty) + null
  offset += languageTag.length;
  chunkData[offset++] = 0;
  // Translated keyword (empty) + null
  offset += translatedKeyword.length;
  chunkData[offset++] = 0;
  // UTF-8 text (no null terminator needed)
  chunkData.set(textBytes, offset);

  // Create full chunk: length (4 bytes) + type (4 bytes) + data + CRC (4 bytes)
  const chunkType = new TextEncoder().encode('iTXt');
  const chunk = new Uint8Array(4 + 4 + chunkData.length + 4);

  // Length (big-endian)
  const dataView = new DataView(chunk.buffer);
  dataView.setUint32(0, chunkData.length, false);

  // Type
  chunk.set(chunkType, 4);

  // Data
  chunk.set(chunkData, 8);

  // CRC32 over type + data
  const crcData = new Uint8Array(4 + chunkData.length);
  crcData.set(chunkType, 0);
  crcData.set(chunkData, 4);
  const crc = calculateCrc32(crcData);
  dataView.setUint32(8 + chunkData.length, crc, false);

  return chunk;
}

/**
 * CRC32 calculation for PNG chunks
 */
function calculateCrc32(data: Uint8Array): number {
  let crc = 0xffffffff;

  // CRC32 lookup table
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }

  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Embed metadata into PNG blob
 */
async function embedPngMetadata(pngBlob: Blob, metadata: PngMetadata): Promise<Blob> {
  const arrayBuffer = await pngBlob.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);

  // Verify PNG signature
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < 8; i++) {
    if (data[i] !== pngSignature[i]) {
      console.warn('Invalid PNG signature, returning original');
      return pngBlob;
    }
  }

  // Create metadata chunks
  const metadataChunks: Uint8Array[] = [];

  // Standard PNG text keywords
  const keywordMap: Record<string, string> = {
    title: 'Title',
    author: 'Author',
    description: 'Description',
    copyright: 'Copyright',
    creationTime: 'Creation Time',
    software: 'Software',
    comment: 'Comment',
  };

  for (const [key, value] of Object.entries(metadata)) {
    if (value && typeof value === 'string') {
      const keyword = keywordMap[key] || key;
      metadataChunks.push(createPngTextChunk(keyword, value));
    }
  }

  if (metadataChunks.length === 0) {
    return pngBlob;
  }

  // Find IEND chunk position - search for IEND type
  let iendPos = -1;
  for (let i = 8; i < data.length - 8; i++) {
    if (data[i + 4] === 73 && data[i + 5] === 69 && data[i + 6] === 78 && data[i + 7] === 68) {
      // IEND
      iendPos = i;
      break;
    }
  }

  if (iendPos === -1) {
    console.warn('Could not find IEND chunk, returning original');
    return pngBlob;
  }

  // Calculate total size of metadata chunks
  const metadataSize = metadataChunks.reduce((sum, chunk) => sum + chunk.length, 0);

  // Create new PNG with metadata inserted before IEND
  const newPng = new Uint8Array(data.length + metadataSize);

  // Copy everything before IEND
  newPng.set(data.slice(0, iendPos), 0);

  // Insert metadata chunks
  let offset = iendPos;
  for (const chunk of metadataChunks) {
    newPng.set(chunk, offset);
    offset += chunk.length;
  }

  // Copy IEND chunk (and anything after, though there shouldn't be)
  newPng.set(data.slice(iendPos), offset);

  return new Blob([newPng], { type: 'image/png' });
}

// ============================================
// IMAGE EXPORT
// ============================================

/**
 * Export canvas as PNG or WebP image
 */
export async function exportImage(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {},
  pngMetadata?: PngMetadata,
  dpi?: number
): Promise<ExportResult> {
  const opts: ExportConfig = {
    outputFormat: config.outputFormat ?? 'png',
    outputWidth: config.outputWidth ?? canvas.width,
    outputHeight: config.outputHeight ?? canvas.height,
    outputQuality: config.outputQuality ?? 0.9,
    filename: config.filename ?? 'anqr-qrcode',
    animationSpeed: config.animationSpeed ?? 100,
    loopAnimation: config.loopAnimation ?? true,
    transparentBackground: config.transparentBackground ?? false,
    dpi: config.dpi ?? 72,
    includeMetadata: config.includeMetadata ?? false,
    includeQuietZone: config.includeQuietZone ?? true,
    bgOverride: config.bgOverride ?? '',
    gifDisposal: config.gifDisposal ?? 'restore_bg',
    metadata: config.metadata,
  };

  const format =
    opts.outputFormat === 'webp'
      ? 'image/webp'
      : opts.outputFormat === 'jpeg'
        ? 'image/jpeg'
        : 'image/png';

  const quality = opts.outputQuality;

  // Scale canvas to output dimensions
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = opts.outputWidth;
  outputCanvas.height = opts.outputHeight;
  const ctx = outputCanvas.getContext('2d')!;

  // Apply background override if specified
  if (opts.bgOverride?.trim()) {
    ctx.fillStyle = opts.bgOverride;
    ctx.fillRect(0, 0, opts.outputWidth, opts.outputHeight);
  }

  // Use high quality scaling
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, opts.outputWidth, opts.outputHeight);

  let blob = await new Promise<Blob>((resolve, reject) => {
    outputCanvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Failed to create blob'))),
      format,
      quality
    );
  });

  // Embed PNG metadata if provided
  if (pngMetadata && format === 'image/png') {
    try {
      blob = await embedPngMetadata(blob, pngMetadata);
    } catch (err) {
      console.warn('Failed to embed PNG metadata:', err);
    }
  }

  // Embed DPI if provided
  if (dpi && dpi > 0 && format === 'image/png') {
    try {
      blob = await embedPngDpi(blob, dpi);
    } catch (err) {
      console.warn('Failed to embed PNG DPI:', err);
    }
  }

  const ext = opts.outputFormat === 'webp' ? 'webp' : opts.outputFormat === 'jpeg' ? 'jpg' : 'png';

  const filename = `${opts.filename}.${ext}`;
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    filename,
    format: opts.outputFormat,
    width: opts.outputWidth,
    height: opts.outputHeight,
  };
}

/**
 * Download an image from canvas
 */
export async function downloadImage(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {},
  pngMetadata?: PngMetadata,
  dpi?: number
): Promise<void> {
  const result = await exportImage(canvas, config, pngMetadata, dpi);
  downloadUrl(result.url, result.filename, result.blob);
  // Don't revoke URL immediately on native - file save is async
  if (!Capacitor.isNativePlatform()) {
    URL.revokeObjectURL(result.url);
  }
}

// ============================================
// GIF EXPORT
// ============================================

/**
 * Export animation frames as GIF
 */
export async function exportGif(
  frames: HTMLCanvasElement[],
  config: Partial<ExportConfig> = {},
  frameDelays?: number[] // Optional per-frame delays in ms
): Promise<ExportResult> {
  const opts: ExportConfig = {
    outputFormat: 'gif',
    outputWidth: config.outputWidth ?? frames[0]?.width ?? 400,
    outputHeight: config.outputHeight ?? frames[0]?.height ?? 400,
    outputQuality: config.outputQuality ?? 0.9,
    filename: config.filename ?? 'anqr-qrcode',
    animationSpeed: config.animationSpeed ?? 100,
    loopAnimation: config.loopAnimation ?? true,
    transparentBackground: config.transparentBackground ?? false,
    dpi: config.dpi ?? 72,
    includeMetadata: config.includeMetadata ?? false,
    includeQuietZone: config.includeQuietZone ?? true,
    bgOverride: config.bgOverride ?? '',
    gifDisposal: config.gifDisposal ?? 'restore_bg',
    metadata: config.metadata,
  };

  const width = opts.outputWidth;
  const height = opts.outputHeight;
  const defaultDelay = opts.animationSpeed;
  const repeat = opts.loopAnimation ? 0 : -1; // 0 = loop forever, -1 = no loop

  // Create GIF encoder
  const gif = GIFEncoder();
  let isFirstFrame = true;

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    // Use per-frame delay if provided, otherwise use default
    const frameDelay = frameDelays?.[i] ? frameDelays[i] : defaultDelay;

    // Scale frame to output dimensions
    const scaled = document.createElement('canvas');
    scaled.width = width;
    scaled.height = height;
    const ctx = scaled.getContext('2d')!;

    // Apply background override if specified
    if (opts.bgOverride?.trim()) {
      ctx.fillStyle = opts.bgOverride;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(frame, 0, 0, width, height);

    // Get RGBA pixel data
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;

    // Quantize to 256 colors using gifenc's built-in quantizer
    const palette = quantize(data, 256);

    // Apply palette to get indexed pixel data
    const index = applyPalette(data, palette);

    // Convert milliseconds to centiseconds (gifenc uses 1/100th seconds, like the GIF spec)
    // Use a minimum of 2 centiseconds (20ms) - browsers interpret <2cs as 10cs anyway
    const delayCentiseconds = Math.max(2, Math.round(frameDelay / 10));

    // Map disposal string to gifenc disposal code
    const disposalMap: Record<string, number> = {
      none: 0,
      keep: 1,
      restore_bg: 2,
      restore_previous: 3,
    };
    const disposal = disposalMap[opts.gifDisposal] ?? 2;

    gif.writeFrame(index, width, height, {
      palette,
      delay: delayCentiseconds,
      disposal,
      ...(isFirstFrame && { repeat }),
    });
    isFirstFrame = false;
  }

  // Finish encoding
  gif.finish();

  // Get the encoded GIF bytes
  const bytes = gif.bytes();
  const blob = new Blob([bytes], { type: 'image/gif' });
  const filename = `${opts.filename}.gif`;
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    filename,
    format: 'gif',
    width,
    height,
  };
}

/**
 * Download animation as GIF
 */
export async function downloadGif(
  frames: HTMLCanvasElement[],
  config: Partial<ExportConfig> = {},
  frameDelays?: number[]
): Promise<void> {
  const result = await exportGif(frames, config, frameDelays);
  downloadUrl(result.url, result.filename, result.blob);
  // Don't revoke URL immediately on native - file save is async
  if (!Capacitor.isNativePlatform()) {
    URL.revokeObjectURL(result.url);
  }
}

// ============================================
// SVG EXPORT
// ============================================

/**
 * Export canvas as SVG (embedded raster)
 */
export async function exportSvg(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {}
): Promise<ExportResult> {
  const opts: ExportConfig = {
    outputFormat: 'svg',
    outputWidth: config.outputWidth ?? canvas.width,
    outputHeight: config.outputHeight ?? canvas.height,
    outputQuality: config.outputQuality ?? 0.9,
    filename: config.filename ?? 'anqr-qrcode',
    animationSpeed: config.animationSpeed ?? 100,
    loopAnimation: config.loopAnimation ?? true,
    transparentBackground: config.transparentBackground ?? false,
    dpi: config.dpi ?? 72,
    includeMetadata: config.includeMetadata ?? false,
    includeQuietZone: config.includeQuietZone ?? true,
    bgOverride: config.bgOverride ?? '',
    gifDisposal: config.gifDisposal ?? 'restore_bg',
    metadata: config.metadata,
  };

  const dataUrl = canvas.toDataURL('image/png');

  let metadata = '';
  if (opts.includeMetadata && opts.metadata) {
    const m = opts.metadata;
    if (m.title) metadata += `  <title>${escapeXml(m.title)}</title>\n`;
    if (m.description) metadata += `  <desc>${escapeXml(m.description)}</desc>\n`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${opts.outputWidth}" height="${opts.outputHeight}"
     viewBox="0 0 ${opts.outputWidth} ${opts.outputHeight}">
${metadata}  <image width="${opts.outputWidth}" height="${opts.outputHeight}" xlink:href="${dataUrl}"/>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const filename = `${opts.filename}.svg`;
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    filename,
    format: 'svg',
    width: opts.outputWidth,
    height: opts.outputHeight,
  };
}

/**
 * Export QR matrix as true vector SVG
 */
export function exportVectorSvg(
  matrix: boolean[][],
  config: {
    moduleSize?: number;
    margin?: number;
    fgColor?: string;
    bgColor?: string;
    width?: number;
    height?: number;
    filename?: string;
  } = {}
): ExportResult {
  const moduleCount = matrix.length;
  const moduleSize = config.moduleSize ?? 10;
  const margin = config.margin ?? 4;
  const fgColor = config.fgColor ?? '#000000';
  const bgColor = config.bgColor ?? '#ffffff';

  const size = moduleCount * moduleSize + margin * 2 * moduleSize;
  const width = config.width ?? size;
  const height = config.height ?? size;

  let paths = '';

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (matrix[row][col]) {
        const x = (col + margin) * moduleSize;
        const y = (row + margin) * moduleSize;
        paths += `M${x},${y}h${moduleSize}v${moduleSize}h-${moduleSize}z `;
      }
    }
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     width="${width}" height="${height}"
     viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <path d="${paths.trim()}" fill="${fgColor}"/>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const filename = `${config.filename ?? 'anqr-qrcode'}.svg`;
  const url = URL.createObjectURL(blob);

  return {
    blob,
    url,
    filename,
    format: 'svg',
    width,
    height,
  };
}

/**
 * Download canvas as SVG
 */
export async function downloadSvg(
  canvas: HTMLCanvasElement,
  config: Partial<ExportConfig> = {}
): Promise<void> {
  const result = await exportSvg(canvas, config);
  downloadUrl(result.url, result.filename, result.blob);
  // Don't revoke URL immediately on native - file save is async
  if (!Capacitor.isNativePlatform()) {
    URL.revokeObjectURL(result.url);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Save file on native platform (Android/iOS) using MediaStore API
 * This works with Android scoped storage (Android 10+)
 */
async function saveFileNative(filename: string, blob: Blob): Promise<boolean> {
  try {
    // Convert blob to base64 data URL
    const base64DataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    // Determine mime type from blob
    const mimeType = blob.type || 'application/octet-stream';

    // Write to Documents directory via MediaStore
    const result = await saveBase64ToDocuments({
      filename,
      base64: base64DataUrl,
      mimeType,
      subdir: 'ANQR',
    });

    console.log('File saved:', result);

    // Show a simple alert to confirm save
    alert(`Saved to Documents/ANQR: ${filename}`);

    return true;
  } catch (error) {
    console.error('Failed to save file on native platform:', error);
    alert(`Failed to save file: ${error}`);
    return false;
  }
}

/**
 * Download from URL (web) or save file (native)
 */
export function downloadUrl(url: string, filename: string, blob?: Blob): void {
  // On native platforms, use Filesystem API
  if (Capacitor.isNativePlatform() && blob) {
    saveFileNative(filename, blob); // Fire and forget
    return;
  }

  // On web, use standard download approach
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Convert canvas to blob
 */
export async function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string = 'image/png',
  quality: number = 0.9
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob'))),
      format,
      quality
    );
  });
}

// ============================================
// LEGACY CLASS EXPORT (for backwards compatibility)
// ============================================

export class Exporter {
  async downloadImage(canvas: HTMLCanvasElement, config: Partial<ExportConfig>): Promise<void> {
    return downloadImage(canvas, config);
  }

  async downloadGif(frames: HTMLCanvasElement[], config: Partial<ExportConfig>): Promise<void> {
    return downloadGif(frames, config);
  }

  async downloadSvg(canvas: HTMLCanvasElement, config: Partial<ExportConfig>): Promise<void> {
    return downloadSvg(canvas, config);
  }

  downloadUrl(url: string, filename: string): void {
    return downloadUrl(url, filename);
  }
}

// ============================================
// EXPORT
// ============================================

export const ExporterModule = {
  // Image export
  exportImage,
  downloadImage,

  // GIF export
  exportGif,
  downloadGif,

  // SVG export
  exportSvg,
  exportVectorSvg,
  downloadSvg,

  // Utilities
  downloadUrl,
  canvasToBlob,

  // Legacy class
  Exporter,
};

export default ExporterModule;
