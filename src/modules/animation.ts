/**
 * Animation Module
 * Handles GIF and WebP animation parsing, frame management, animation patterns, and temporal effects
 *
 * Performance optimizations:
 * - Canvas pooling to reduce GC pressure
 * - Frame decimation based on target FPS
 * - Reusable composite canvas for GIF parsing
 */

/// <reference path="../types/image-decoder.d.ts" />

import { decompressFrames, parseGIF } from 'gifuct-js';

// ============================================
// GIF COMPOSITOR (optimal patch-only decode)
// ============================================

/**
 * GIF Compositor - uses patch-only decode with a single reusable canvas.
 * This is the optimal approach for GIF rendering:
 * - No per-frame canvas allocation
 * - Near-zero memory allocations during playback
 * - Proper disposal handling (types 0-3)
 *
 * Usage:
 *   const compositor = createGifCompositor(arrayBuffer)
 *   for (let i = 0; i < compositor.frameCount; i++) {
 *     compositor.apply(i)          // Draw patch to canvas
 *     // use compositor.canvas
 *     compositor.dispose(i)        // Handle disposal for next frame
 *   }
 */
export interface GifCompositor {
  /** The single reusable canvas - always reflects the current composed frame */
  canvas: HTMLCanvasElement;
  /** Total number of frames */
  frameCount: number;
  /** Width of the GIF */
  width: number;
  /** Height of the GIF */
  height: number;
  /** Get delay for frame i in milliseconds */
  delayMs: (i: number) => number;
  /** Apply frame i's patch to the canvas */
  apply: (i: number) => void;
  /** Handle disposal after frame i (call before applying next frame) */
  dispose: (i: number) => void;
  /** Reset compositor to initial state */
  reset: () => void;
}

/**
 * Create a GIF compositor from an ArrayBuffer.
 * Uses patch-only decode (decompressFrames with false) for minimal memory usage.
 */
export function createGifCompositor(arrayBuffer: ArrayBuffer): GifCompositor {
  const gif = parseGIF(arrayBuffer);
  // Use true to get full RGBA patch data (false returns indexed colors which don't work with putImageData)
  const frames = decompressFrames(gif, true);
  const { width, height } = gif.lsd;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2D context for GIF compositor canvas');
  }

  // Reusable patch canvas for compositing (avoids per-frame allocation)
  // We size it to the max patch dimensions across all frames
  let maxPatchW = 0;
  let maxPatchH = 0;
  for (const f of frames) {
    maxPatchW = Math.max(maxPatchW, f.dims.width);
    maxPatchH = Math.max(maxPatchH, f.dims.height);
  }
  const patchCanvas = document.createElement('canvas');
  patchCanvas.width = maxPatchW;
  patchCanvas.height = maxPatchH;
  const patchCtx = patchCanvas.getContext('2d');

  // For disposalType=3, we need to restore the previous state
  let restoreData: { x: number; y: number; w: number; h: number; data: ImageData } | null = null;

  function apply(i: number): void {
    if (i < 0 || i >= frames.length) return;

    const f = frames[i];
    const { left, top, width: w, height: h } = f.dims;

    // For disposal=3, snapshot the area before drawing patch
    if (f.disposalType === 3) {
      restoreData = {
        x: left,
        y: top,
        w,
        h,
        data: ctx.getImageData(left, top, w, h),
      };
    } else {
      restoreData = null;
    }

    // IMPORTANT: We must use drawImage for proper alpha compositing!
    // putImageData replaces pixels directly (transparent pixels become black)
    // drawImage properly composites with alpha blending
    if (patchCtx) {
      patchCtx.clearRect(0, 0, w, h);
      const imageData = new ImageData(new Uint8ClampedArray(f.patch), w, h);
      patchCtx.putImageData(imageData, 0, 0);
      ctx.drawImage(patchCanvas, 0, 0, w, h, left, top, w, h);
    }
  }

  function dispose(i: number): void {
    if (i < 0 || i >= frames.length) return;

    const f = frames[i];
    const { left, top, width: w, height: h } = f.dims;

    switch (f.disposalType) {
      case 2:
        // Restore to background (clear the patch area)
        ctx.clearRect(left, top, w, h);
        break;
      case 3:
        // Restore to previous state
        if (restoreData) {
          ctx.putImageData(restoreData.data, restoreData.x, restoreData.y);
        }
        break;
      // disposalType 0, 1: leave frame in place (do nothing)
    }
  }

  function reset(): void {
    ctx.clearRect(0, 0, width, height);
    restoreData = null;
  }

  return {
    canvas,
    frameCount: frames.length,
    width,
    height,
    delayMs: (i: number) => Math.max(frames[i]?.delay || 10, 1) * 10,
    apply,
    dispose,
    reset,
  };
}

// ============================================
// FRAME DECIMATION UTILITIES
// ============================================

/**
 * Calculate effective FPS from frame delays
 */
export function calculateSourceFps(frames: AnimationFrame[]): number {
  if (frames.length === 0) return 10;
  const totalDelay = frames.reduce((sum, f) => sum + (f.delay || 100), 0);
  const avgDelay = totalDelay / frames.length;
  return 1000 / avgDelay;
}

/**
 * Calculate FPS from a GIF compositor
 */
export function calculateCompositorFps(compositor: GifCompositor): number {
  if (compositor.frameCount === 0) return 10;
  let totalDelay = 0;
  for (let i = 0; i < compositor.frameCount; i++) {
    totalDelay += compositor.delayMs(i);
  }
  const avgDelay = totalDelay / compositor.frameCount;
  return 1000 / avgDelay;
}

/**
 * Calculate which frame indices to keep for target FPS
 * Works with a GIF compositor
 */
export function decimateCompositorFrames(compositor: GifCompositor, targetFps: number): number[] {
  if (compositor.frameCount <= 1 || targetFps <= 0) {
    return Array.from({ length: compositor.frameCount }, (_, i) => i);
  }

  const sourceFps = calculateCompositorFps(compositor);

  // If source FPS is already at or below target, keep all frames
  if (sourceFps <= targetFps) {
    return Array.from({ length: compositor.frameCount }, (_, i) => i);
  }

  // Calculate frame step to achieve target FPS
  const ratio = sourceFps / targetFps;
  const keepIndices: number[] = [];

  // Use accumulator-based selection for smooth distribution
  let accumulator = 0;
  for (let i = 0; i < compositor.frameCount; i++) {
    accumulator += 1;
    if (accumulator >= ratio) {
      keepIndices.push(i);
      accumulator -= ratio;
    }
  }

  // Always include first and last frame for complete animation
  const lastIdx = compositor.frameCount - 1;
  if (keepIndices.length > 0) {
    if (keepIndices[0] !== 0) {
      keepIndices.unshift(0);
    }
    if (keepIndices[keepIndices.length - 1] !== lastIdx) {
      keepIndices.push(lastIdx);
    }
  }

  return keepIndices;
}

/**
 * Decimate frames to target FPS by skipping frames
 * Returns indices of frames to keep
 * @deprecated Use decimateCompositorFrames with GifCompositor instead
 */
export function decimateFramesToFps(frames: AnimationFrame[], targetFps: number): number[] {
  if (frames.length <= 1 || targetFps <= 0) {
    return frames.map((_, i) => i);
  }

  const sourceFps = calculateSourceFps(frames);

  // If source FPS is already at or below target, keep all frames
  if (sourceFps <= targetFps) {
    return frames.map((_, i) => i);
  }

  // Calculate frame step to achieve target FPS
  const ratio = sourceFps / targetFps;
  const keepIndices: number[] = [];

  // Use accumulator-based selection for smooth distribution
  let accumulator = 0;
  for (let i = 0; i < frames.length; i++) {
    accumulator += 1;
    if (accumulator >= ratio) {
      keepIndices.push(i);
      accumulator -= ratio;
    }
  }

  // Always include first and last frame for complete animation
  if (keepIndices.length > 0 && keepIndices[0] !== 0) {
    keepIndices.unshift(0);
  }
  if (keepIndices.length > 0 && keepIndices[keepIndices.length - 1] !== frames.length - 1) {
    keepIndices.push(frames.length - 1);
  }

  return keepIndices;
}

// ============================================
// FORMAT DETECTION
// ============================================

/**
 * Detect if an ArrayBuffer contains an animated WebP
 * Checks for RIFF/WEBP container with ANIM chunk
 */
export function isAnimatedWebP(buffer: ArrayBuffer): boolean {
  const view = new DataView(buffer);

  // Check RIFF header
  if (view.byteLength < 12) return false;
  const riff = String.fromCodePoint(
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2),
    view.getUint8(3)
  );
  if (riff !== 'RIFF') return false;

  // Check WEBP signature
  const webp = String.fromCodePoint(
    view.getUint8(8),
    view.getUint8(9),
    view.getUint8(10),
    view.getUint8(11)
  );
  if (webp !== 'WEBP') return false;

  // Search for ANIM chunk (indicates animation)
  let offset = 12;
  while (offset < view.byteLength - 8) {
    const chunkId = String.fromCodePoint(
      view.getUint8(offset),
      view.getUint8(offset + 1),
      view.getUint8(offset + 2),
      view.getUint8(offset + 3)
    );

    if (chunkId === 'ANIM') return true;
    if (chunkId === 'ANMF') return true; // Animation frame chunk

    // Get chunk size (little-endian)
    const chunkSize = view.getUint32(offset + 4, true);
    offset += 8 + chunkSize + (chunkSize % 2); // Chunks are padded to even size
  }

  return false;
}

/**
 * Detect image format from ArrayBuffer
 */
export function detectImageFormat(buffer: ArrayBuffer): 'gif' | 'webp' | 'unknown' {
  const view = new DataView(buffer);
  if (view.byteLength < 12) return 'unknown';

  // Check GIF signature (GIF87a or GIF89a)
  const gif = String.fromCodePoint(view.getUint8(0), view.getUint8(1), view.getUint8(2));
  if (gif === 'GIF') return 'gif';

  // Check RIFF/WEBP signature
  const riff = String.fromCodePoint(
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2),
    view.getUint8(3)
  );
  const webp = String.fromCodePoint(
    view.getUint8(8),
    view.getUint8(9),
    view.getUint8(10),
    view.getUint8(11)
  );
  if (riff === 'RIFF' && webp === 'WEBP') return 'webp';

  return 'unknown';
}

// ============================================
// TYPES
// ============================================

export interface AnimationFrame {
  canvas: HTMLCanvasElement;
  delay: number; // milliseconds
  disposalType: number;
}

export interface AnimationOptions {
  speedMs: number;
  loop: boolean;
  bounce: boolean;
  startFrame: number;
  maxFrames: number;
  frameStep: number;
  interpolate: 'none' | 'crossfade' | 'morph';
  pattern: AnimationPattern;
  moduleJitterPx: number;
  colorCycle: boolean;
  temporalDither: 'off' | 'blue_noise' | 'flicker_safe';
  seed: number;
}

export type AnimationPattern = 'none' | 'pulse' | 'wave' | 'scanline' | 'shimmer' | 'drift';

export interface AnimationState {
  frames: AnimationFrame[];
  currentFrame: number;
  playing: boolean;
  direction: 1 | -1;
  lastFrameTime: number;
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
    return parseWebPAsSingleFrame(source);
  }

  try {
    const decoder = new ImageDecoder({
      type: 'image/webp',
      data: source,
    });

    await decoder.completed;

    const frameCount = decoder.tracks.selectedTrack?.frameCount || 1;
    const frames: AnimationFrame[] = [];

    for (let i = 0; i < frameCount; i++) {
      const result = await decoder.decode({ frameIndex: i });
      const { image, duration } = result;

      // Convert VideoFrame to canvas
      const canvas = document.createElement('canvas');
      canvas.width = image.displayWidth;
      canvas.height = image.displayHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
      }
      image.close();

      frames.push({
        canvas,
        delay: duration ? duration / 1000 : 100, // Convert microseconds to ms, default 100ms
        disposalType: 0,
      });
    }

    decoder.close();
    return frames;
  } catch (err) {
    console.warn('ImageDecoder failed, falling back to single frame:', err);
    return parseWebPAsSingleFrame(source);
  }
}

/**
 * Parse WebP as a single frame (fallback for non-animated or unsupported)
 */
async function parseWebPAsSingleFrame(source: ArrayBuffer): Promise<AnimationFrame[]> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([source], { type: 'image/webp' });
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      URL.revokeObjectURL(url);

      resolve([
        {
          canvas,
          delay: 100,
          disposalType: 0,
        },
      ]);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load WebP image'));
    };

    img.src = url;
  });
}

/**
 * Parse any animated image (GIF or WebP) and extract frames
 * Automatically detects format and uses appropriate parser
 */
export async function parseAnimatedImage(source: string | ArrayBuffer): Promise<AnimationFrame[]> {
  let arrayBuffer: ArrayBuffer;

  if (typeof source === 'string') {
    const response = await fetch(source);
    arrayBuffer = await response.arrayBuffer();
  } else {
    arrayBuffer = source;
  }

  const format = detectImageFormat(arrayBuffer);

  if (format === 'gif') {
    // Use compositor for optimal performance, then convert to AnimationFrame[]
    const compositor = createGifCompositor(arrayBuffer);
    const animationFrames: AnimationFrame[] = [];
    for (let i = 0; i < compositor.frameCount; i++) {
      compositor.apply(i);
      // Create a copy of the current frame
      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = compositor.width;
      frameCanvas.height = compositor.height;
      const frameCtx = frameCanvas.getContext('2d');
      if (frameCtx) {
        frameCtx.drawImage(compositor.canvas, 0, 0);
      }
      animationFrames.push({
        canvas: frameCanvas,
        delay: compositor.delayMs(i),
        disposalType: 0,
      });
      compositor.dispose(i);
    }
    return animationFrames;
  }

  if (format === 'webp') {
    // Check if it's animated
    if (isAnimatedWebP(arrayBuffer)) {
      return parseWebPFrames(arrayBuffer);
    }
    // Non-animated WebP - load as single frame
    return parseWebPAsSingleFrame(arrayBuffer);
  }

  // Unknown format - try to load as regular image
  return parseStaticImageAsFrame(arrayBuffer);
}

/**
 * Parse any static image as a single animation frame
 */
async function parseStaticImageAsFrame(source: ArrayBuffer): Promise<AnimationFrame[]> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([source]);
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      URL.revokeObjectURL(url);

      resolve([
        {
          canvas,
          delay: 100,
          disposalType: 0,
        },
      ]);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Parse a GIF file and extract frames as canvas elements
 * @deprecated Use createGifCompositor for optimal performance
 * This function creates a canvas per frame - use compositor pattern instead
 */
export async function parseGifFrames(source: string | ArrayBuffer): Promise<AnimationFrame[]> {
  let arrayBuffer: ArrayBuffer;

  if (typeof source === 'string') {
    // Data URL or URL
    const response = await fetch(source);
    arrayBuffer = await response.arrayBuffer();
  } else {
    arrayBuffer = source;
  }

  const gif = parseGIF(arrayBuffer);
  const frames = decompressFrames(gif, true); // Use true for full frame data

  if (frames.length === 0) {
    throw new Error('No frames found in GIF');
  }
    const { width, height } = gif.lsd;

  // Reuse a single composite canvas for building frames
  const compositeCanvas = document.createElement('canvas');
  compositeCanvas.width = width;
  compositeCanvas.height = height;
  const compositeCtx = compositeCanvas.getContext('2d');
  if (!compositeCtx) {
    throw new Error('Failed to get 2D context for GIF composite canvas');
  }

  const animationFrames: AnimationFrame[] = [];

  for (const frame of frames) {
    const { dims, patch, disposalType, delay } = frame;

    // Create ImageData from patch
    const imageData = new ImageData(new Uint8ClampedArray(patch), dims.width, dims.height);

    // Draw patch onto composite canvas using putImageData directly
    // Create a temp canvas just for this patch
    const patchCanvas = document.createElement('canvas');
    patchCanvas.width = dims.width;
    patchCanvas.height = dims.height;
    const patchCtx = patchCanvas.getContext('2d');
    if (patchCtx) {
      patchCtx.putImageData(imageData, 0, 0);
    }

    // Draw patch onto composite
    compositeCtx.drawImage(patchCanvas, dims.left, dims.top);

    // Create output canvas for this frame
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outputCtx = outputCanvas.getContext('2d');
    if (outputCtx) {
      outputCtx.drawImage(compositeCanvas, 0, 0);
    }

    animationFrames.push({
      canvas: outputCanvas,
      delay: delay * 10, // GIF delay is in centiseconds
      disposalType,
    });

    // Handle disposal
    if (disposalType === 2) {
      // Restore to background
      compositeCtx.clearRect(dims.left, dims.top, dims.width, dims.height);
    }
    // disposalType 0, 1, or 3: leave frame in place
  }

  return animationFrames;
}

/**
 * Get frame delays from a GIF
 */
export async function getGifDelays(source: string | ArrayBuffer): Promise<number[]> {
  let arrayBuffer: ArrayBuffer;

  if (typeof source === 'string') {
    const response = await fetch(source);
    arrayBuffer = await response.arrayBuffer();
  } else {
    arrayBuffer = source;
  }

  const gif = parseGIF(arrayBuffer);
  const frames = decompressFrames(gif, true);

  return frames.map((frame) => frame.delay * 10);
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
  };
}

/**
 * Get the next frame index based on animation options
 */
export function getNextFrame(
  state: AnimationState,
  options: AnimationOptions
): { frameIndex: number; direction: 1 | -1 } {
  const { frames, currentFrame, direction } = state;
  const { loop, bounce, frameStep } = options;

  let nextFrame = currentFrame + direction * frameStep;
  let nextDirection = direction;

  if (nextFrame >= frames.length) {
    if (bounce) {
      nextDirection = -1;
      nextFrame = frames.length - 2;
    } else if (loop) {
      nextFrame = 0;
    } else {
      nextFrame = frames.length - 1;
    }
  } else if (nextFrame < 0) {
    if (bounce) {
      nextDirection = 1;
      nextFrame = 1;
    } else if (loop) {
      nextFrame = frames.length - 1;
    } else {
      nextFrame = 0;
    }
  }

  return {
    frameIndex: Math.max(0, Math.min(frames.length - 1, nextFrame)),
    direction: nextDirection,
  };
}

/**
 * Update animation state for the next frame
 */
export function advanceAnimation(state: AnimationState, options: AnimationOptions): AnimationState {
  const { frameIndex, direction } = getNextFrame(state, options);

  return {
    ...state,
    currentFrame: frameIndex,
    direction,
    lastFrameTime: performance.now(),
  };
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
  if (pattern === 'none') return canvas;

  const result = document.createElement('canvas');
  result.width = canvas.width;
  result.height = canvas.height;
  const ctx = result.getContext('2d');
  if (!ctx) return canvas;

  const progress = frameIndex / Math.max(1, totalFrames - 1);
  const seed = options.seed ?? 0;

  switch (pattern) {
    case 'pulse': {
      const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.05;
      const offset = ((1 - scale) * canvas.width) / 2;
      ctx.drawImage(canvas, offset, offset, canvas.width * scale, canvas.height * scale);
      break;
    }

    case 'wave': {
      ctx.drawImage(canvas, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let y = 0; y < canvas.height; y++) {
        const waveOffset = Math.sin((y + progress * canvas.height) * 0.1) * 2;
        for (let x = 0; x < canvas.width; x++) {
          const srcX = Math.round(x + waveOffset);
          if (srcX >= 0 && srcX < canvas.width) {
            const srcIdx = (y * canvas.width + srcX) * 4;
            const dstIdx = (y * canvas.width + x) * 4;
            data[dstIdx] = data[srcIdx];
            data[dstIdx + 1] = data[srcIdx + 1];
            data[dstIdx + 2] = data[srcIdx + 2];
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
      break;
    }

    case 'scanline': {
      ctx.drawImage(canvas, 0, 0);
      const scanY = Math.floor(progress * canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(0, scanY - 2, canvas.width, 4);
      break;
    }

    case 'shimmer': {
      ctx.drawImage(canvas, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const x = (i / 4) % canvas.width;
        const shimmer = Math.sin((x + progress * 100 + seed) * 0.1) * 20;
        data[i] = Math.min(255, Math.max(0, data[i] + shimmer));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + shimmer));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + shimmer));
      }
      ctx.putImageData(imageData, 0, 0);
      break;
    }

    case 'drift': {
      const driftX = Math.sin(progress * Math.PI * 2) * 3;
      const driftY = Math.cos(progress * Math.PI * 2) * 3;
      ctx.drawImage(canvas, driftX, driftY);
      break;
    }

    default:
      ctx.drawImage(canvas, 0, 0);
  }

  return result;
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
  if (mode === 'off') return canvas;

  const result = document.createElement('canvas');
  result.width = canvas.width;
  result.height = canvas.height;
  const ctx = result.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(canvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const phi = 1.618033988749895;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;

      let noiseValue: number;

      if (mode === 'blue_noise') {
        // Blue noise with temporal offset
        const ign = (52.9829189 * ((0.06711056 * x + 0.00583715 * y) % 1)) % 1;
        const offset = (x * phi + y * phi * phi + frameIndex * 0.1 + seed) % 1;
        noiseValue = (ign + offset * 0.5) % 1;
      } else {
        // Flicker-safe: slower temporal variation
        noiseValue = (x * phi + y * phi * phi + frameIndex * 0.02 + seed) % 1;
      }

      const threshold = (noiseValue - 0.5) * 10;

      data[i] = Math.min(255, Math.max(0, data[i] + threshold));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + threshold));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + threshold));
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return result;
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
  if (mode === 'none' || t === 0) return frame1;
  if (t === 1) return frame2;

  const result = document.createElement('canvas');
  result.width = frame1.width;
  result.height = frame1.height;
  const ctx = result.getContext('2d');
  if (!ctx) return frame1;

  switch (mode) {
    case 'crossfade': {
      ctx.globalAlpha = 1 - t;
      ctx.drawImage(frame1, 0, 0);
      ctx.globalAlpha = t;
      ctx.drawImage(frame2, 0, 0);
      ctx.globalAlpha = 1;
      break;
    }

    case 'morph': {
      const ctx1 = frame1.getContext('2d');
      const ctx2 = frame2.getContext('2d');
      if (!ctx1 || !ctx2) {
        ctx.drawImage(frame1, 0, 0);
        break;
      }
      const data1 = ctx1.getImageData(0, 0, frame1.width, frame1.height);
      const data2 = ctx2.getImageData(0, 0, frame2.width, frame2.height);
      const resultData = ctx.createImageData(result.width, result.height);

      for (let i = 0; i < data1.data.length; i++) {
        resultData.data[i] = Math.round(data1.data[i] * (1 - t) + data2.data[i] * t);
      }

      ctx.putImageData(resultData, 0, 0);
      break;
    }

    default:
      ctx.drawImage(frame1, 0, 0);
  }

  return result;
}

// ============================================
// COLOR CYCLING
// ============================================

// hslToRgb is imported from color-utils.ts - single source of truth for color conversions
import { hslToRgb } from './color-utils';

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
  const result = document.createElement('canvas');
  result.width = canvas.width;
  result.height = canvas.height;
  const ctx = result.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(canvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate hue for this frame (full rainbow cycle)
  const progress = frameIndex / Math.max(1, totalFrames);
  const baseHue = progress * 360;

  // Generate tint colors using shared color-utils
  const tintColor = hslToRgb(baseHue, 80, 50);
  const complementHue = (baseHue + 180) % 360;
  const complementColor = hslToRgb(complementHue, 30, 70);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;
    const isDark = brightness < 128;

    if (isDark) {
      // Tint dark pixels with cycling color
      const tintAmount = 0.7;
      data[i] = Math.min(255, r + tintColor.r * tintAmount);
      data[i + 1] = Math.min(255, g + tintColor.g * tintAmount);
      data[i + 2] = Math.min(255, b + tintColor.b * tintAmount);
    } else {
      // Add subtle complementary tint to light pixels
      const tintAmount = 0.15;
      data[i] = Math.max(0, Math.round(r - (255 - complementColor.r) * tintAmount));
      data[i + 1] = Math.max(0, Math.round(g - (255 - complementColor.g) * tintAmount));
      data[i + 2] = Math.max(0, Math.round(b - (255 - complementColor.b) * tintAmount));
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return result;
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
  let state: AnimationState | null = null;
  let animationId: number | null = null;

  const tick = () => {
    if (!state?.playing) return;

    const now = performance.now();
    const frameDelay = state.frames[state.currentFrame]?.delay || options.speedMs;

    if (now - state.lastFrameTime >= frameDelay) {
      onFrame(state.currentFrame, state.frames[state.currentFrame].canvas);
      state = advanceAnimation(state, options);
    }

    animationId = requestAnimationFrame(tick);
  };

  return {
    start: () => {
      if (state) {
        state.playing = true;
        state.lastFrameTime = performance.now();
        tick();
      }
    },
    stop: () => {
      if (state) {
        state.playing = false;
      }
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
    setFrames: (frames: AnimationFrame[]) => {
      state = createAnimationState(frames);
    },
  };
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

  // Performance utilities - GIF compositor (optimal)
  createGifCompositor,
  calculateCompositorFps,
  decimateCompositorFrames,
  // Legacy utilities
  calculateSourceFps,
  decimateFramesToFps,
};

export default Animation;
