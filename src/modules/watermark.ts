/**
 * Watermark Module
 * Handles text and image watermarks with positioning and blending
 */

// ============================================
// TYPES
// ============================================

export type WatermarkKind = 'text' | 'image' | 'pattern';
export type WatermarkPosition = 'center' | 'corners' | 'edges' | 'behind' | 'quiet_zone';
export type WatermarkBlend = 'normal' | 'multiply' | 'screen' | 'overlay';

export interface WatermarkOptions {
  enabled: boolean;
  kind: WatermarkKind;
  text: string;
  image: HTMLImageElement | HTMLCanvasElement | null;
  position: WatermarkPosition;
  opacity: number; // 0-100
  blend: WatermarkBlend;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  scale?: number;
  rotation?: number;
  repeat?: boolean;
  margin?: number;
}

export interface WatermarkResult {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

// ============================================
// TEXT WATERMARK
// ============================================

/**
 * Create a text watermark canvas
 */
export function createTextWatermark(
  text: string,
  fontSize: number = 14,
  fontFamily: string = 'sans-serif',
  color: string = '#000000'
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  const textHeight = fontSize * 1.2;

  canvas.width = Math.ceil(metrics.width) + 10;
  canvas.height = Math.ceil(textHeight) + 10;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 5, canvas.height / 2);

  return canvas;
}

// ============================================
// PATTERN WATERMARK
// ============================================

/**
 * Create a repeating pattern watermark
 */
export function createPatternWatermark(
  source: HTMLCanvasElement | HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  scale: number = 1,
  rotation: number = 0,
  spacing: number = 20
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  const sourceWidth = source instanceof HTMLImageElement ? source.naturalWidth : source.width;
  const sourceHeight = source instanceof HTMLImageElement ? source.naturalHeight : source.height;
  const scaledWidth = sourceWidth * scale;
  const scaledHeight = sourceHeight * scale;

  const angleRad = (rotation * Math.PI) / 180;

  for (let y = -scaledHeight; y < targetHeight + scaledHeight; y += scaledHeight + spacing) {
    for (let x = -scaledWidth; x < targetWidth + scaledWidth; x += scaledWidth + spacing) {
      ctx.save();
      ctx.translate(x + scaledWidth / 2, y + scaledHeight / 2);
      ctx.rotate(angleRad);
      ctx.drawImage(source, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
      ctx.restore();
    }
  }

  return canvas;
}

// ============================================
// POSITIONING
// ============================================

/**
 * Calculate watermark position(s) based on position type
 */
export function getWatermarkPositions(
  position: WatermarkPosition,
  canvasWidth: number,
  canvasHeight: number,
  watermarkWidth: number,
  watermarkHeight: number,
  margin: number = 10
): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];

  switch (position) {
    case 'corners':
      positions.push(
        { x: margin, y: margin },
        { x: canvasWidth - watermarkWidth - margin, y: margin },
        { x: margin, y: canvasHeight - watermarkHeight - margin },
        { x: canvasWidth - watermarkWidth - margin, y: canvasHeight - watermarkHeight - margin }
      );
      break;

    case 'edges':
      positions.push(
        { x: (canvasWidth - watermarkWidth) / 2, y: margin },
        { x: (canvasWidth - watermarkWidth) / 2, y: canvasHeight - watermarkHeight - margin },
        { x: margin, y: (canvasHeight - watermarkHeight) / 2 },
        { x: canvasWidth - watermarkWidth - margin, y: (canvasHeight - watermarkHeight) / 2 }
      );
      break;

    case 'quiet_zone': {
      // Quiet zone uses margin/2 offset
      positions.push({
        x: margin / 2,
        y: canvasHeight - watermarkHeight - margin / 2,
      });
      break;
    }

    case 'center':
    case 'behind':
    default:
      // For center, behind, and default: return center position
      // (behind mode layering is handled by applyWatermark)
      positions.push({
        x: (canvasWidth - watermarkWidth) / 2,
        y: (canvasHeight - watermarkHeight) / 2,
      });
  }

  return positions;
}

// ============================================
// BLEND MODES
// ============================================

/**
 * Apply blend mode to context
 */
export function applyBlendMode(ctx: CanvasRenderingContext2D, blend: WatermarkBlend): void {
  switch (blend) {
    case 'multiply':
      ctx.globalCompositeOperation = 'multiply';
      break;
    case 'screen':
      ctx.globalCompositeOperation = 'screen';
      break;
    case 'overlay':
      ctx.globalCompositeOperation = 'overlay';
      break;
    default:
      ctx.globalCompositeOperation = 'source-over';
      break;
  }
}

// ============================================
// MAIN WATERMARK FUNCTION
// ============================================

/**
 * Apply watermark to a canvas
 */
export function applyWatermark(
  source: HTMLCanvasElement,
  options: Partial<WatermarkOptions> = {}
): WatermarkResult {
  const opts: WatermarkOptions = {
    enabled: options.enabled ?? true,
    kind: options.kind ?? 'text',
    text: options.text ?? '',
    image: options.image ?? null,
    position: options.position ?? 'center',
    opacity: options.opacity ?? 50,
    blend: options.blend ?? 'normal',
    fontSize: options.fontSize ?? 14,
    fontFamily: options.fontFamily ?? 'sans-serif',
    color: options.color ?? '#000000',
    scale: options.scale ?? 1,
    rotation: options.rotation ?? 0,
    repeat: options.repeat ?? false,
    margin: options.margin ?? 10,
  };

  if (!opts.enabled) {
    return { canvas: source, width: source.width, height: source.height };
  }

  const result = document.createElement('canvas');
  result.width = source.width;
  result.height = source.height;
  const ctx = result.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // For 'behind' position, draw watermark first
  if (opts.position === 'behind') {
    drawWatermarkLayer(ctx, opts, source.width, source.height);
    ctx.drawImage(source, 0, 0);
  } else {
    // Draw source first, then watermark on top
    ctx.drawImage(source, 0, 0);
    drawWatermarkLayer(ctx, opts, source.width, source.height);
  }

  return { canvas: result, width: result.width, height: result.height };
}

/**
 * Draw the watermark layer
 */
function drawWatermarkLayer(
  ctx: CanvasRenderingContext2D,
  options: WatermarkOptions,
  canvasWidth: number,
  canvasHeight: number
): void {
  let watermarkCanvas: HTMLCanvasElement | null = null;

  switch (options.kind) {
    case 'text':
      if (options.text) {
        watermarkCanvas = createTextWatermark(
          options.text,
          options.fontSize,
          options.fontFamily,
          options.color
        );
      }
      break;

    case 'image':
      if (options.image) {
        watermarkCanvas = document.createElement('canvas');
        const sourceWidth =
          options.image instanceof HTMLImageElement
            ? options.image.naturalWidth
            : options.image.width;
        const sourceHeight =
          options.image instanceof HTMLImageElement
            ? options.image.naturalHeight
            : options.image.height;

        watermarkCanvas.width = sourceWidth * (options.scale || 1);
        watermarkCanvas.height = sourceHeight * (options.scale || 1);
        const wCtx = watermarkCanvas.getContext('2d');
        if (!wCtx) throw new Error('Could not get canvas context');
        wCtx.drawImage(options.image, 0, 0, watermarkCanvas.width, watermarkCanvas.height);
      }
      break;

    case 'pattern':
      if (options.image) {
        watermarkCanvas = createPatternWatermark(
          options.image,
          canvasWidth,
          canvasHeight,
          options.scale,
          options.rotation,
          options.margin
        );
      }
      break;
  }

  if (!watermarkCanvas) return;

  // Apply blend mode and opacity
  ctx.save();
  applyBlendMode(ctx, options.blend);
  ctx.globalAlpha = options.opacity / 100;

  if (options.kind === 'pattern') {
    // Pattern covers the entire canvas
    ctx.drawImage(watermarkCanvas, 0, 0);
  } else if (options.repeat) {
    // Repeat watermark across canvas
    const pattern = createPatternWatermark(
      watermarkCanvas,
      canvasWidth,
      canvasHeight,
      1,
      options.rotation || -30,
      50
    );
    ctx.drawImage(pattern, 0, 0);
  } else {
    // Draw at calculated positions
    const positions = getWatermarkPositions(
      options.position,
      canvasWidth,
      canvasHeight,
      watermarkCanvas.width,
      watermarkCanvas.height,
      options.margin
    );

    for (const pos of positions) {
      if (options.rotation) {
        ctx.save();
        ctx.translate(pos.x + watermarkCanvas.width / 2, pos.y + watermarkCanvas.height / 2);
        ctx.rotate((options.rotation * Math.PI) / 180);
        ctx.drawImage(watermarkCanvas, -watermarkCanvas.width / 2, -watermarkCanvas.height / 2);
        ctx.restore();
      } else {
        ctx.drawImage(watermarkCanvas, pos.x, pos.y);
      }
    }
  }

  ctx.restore();
}

// ============================================
// LOGO WATERMARK (CENTER)
// ============================================

/**
 * Apply a center logo watermark (common for QR codes)
 */
export function applyCenterLogo(
  source: HTMLCanvasElement,
  logo: HTMLImageElement | HTMLCanvasElement,
  sizePercent: number = 25,
  padding: number = 4,
  backgroundColor: string = '#ffffff'
): WatermarkResult {
  const result = document.createElement('canvas');
  result.width = source.width;
  result.height = source.height;
  const ctx = result.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(source, 0, 0);

  const logoSize = source.width * (sizePercent / 100);
  const x = (source.width - logoSize) / 2;
  const y = (source.height - logoSize) / 2;

  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2);

  // Draw logo
  ctx.drawImage(logo, x, y, logoSize, logoSize);

  return { canvas: result, width: result.width, height: result.height };
}

// ============================================
// EXPORT
// ============================================

export const Watermark = {
  createTextWatermark,
  createPatternWatermark,
  getWatermarkPositions,
  applyBlendMode,
  applyWatermark,
  applyCenterLogo,
};

export default Watermark;
