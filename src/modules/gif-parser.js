/**
 * GIF Parser Module
 * Extracts frames from animated GIFs using gifuct-js
 */

import { parseGIF, decompressFrames } from "gifuct-js";

export class GifParser {
  /**
   * Parse a GIF and return an array of canvas frames
   */
  async parse(dataUrl) {
    // Convert data URL to ArrayBuffer
    const response = await fetch(dataUrl);
    const arrayBuffer = await response.arrayBuffer();

    // Parse GIF
    const gif = parseGIF(arrayBuffer);
    const frames = decompressFrames(gif, true);

    if (frames.length === 0) {
      throw new Error("No frames found in GIF");
    }

    // Get dimensions from first frame
    const { width, height } = gif.lsd;

    // Create a persistent canvas for compositing frames
    const compositeCanvas = document.createElement("canvas");
    compositeCanvas.width = width;
    compositeCanvas.height = height;
    const compositeCtx = compositeCanvas.getContext("2d");

    // Extract each frame as a canvas
    const canvasFrames = [];

    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      const { dims, patch, disposalType } = frame;

      // Create ImageData from patch
      const imageData = new ImageData(
        new Uint8ClampedArray(patch),
        dims.width,
        dims.height,
      );

      // Create temporary canvas for this frame's patch
      const patchCanvas = document.createElement("canvas");
      patchCanvas.width = dims.width;
      patchCanvas.height = dims.height;
      const patchCtx = patchCanvas.getContext("2d");
      patchCtx.putImageData(imageData, 0, 0);

      // Draw patch onto composite canvas
      compositeCtx.drawImage(patchCanvas, dims.left, dims.top);

      // Create output canvas for this frame
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = width;
      outputCanvas.height = height;
      const outputCtx = outputCanvas.getContext("2d");
      outputCtx.drawImage(compositeCanvas, 0, 0);

      canvasFrames.push(outputCanvas);

      // Handle disposal
      if (disposalType === 2) {
        // Restore to background
        compositeCtx.clearRect(dims.left, dims.top, dims.width, dims.height);
      } else if (disposalType === 3) {
        // Restore to previous - would need to save state before drawing
        // For simplicity, we'll treat it like disposal type 1 (leave in place)
      }
      // disposalType 0 or 1: leave frame in place (no action needed)
    }

    return canvasFrames;
  }

  /**
   * Get frame delays from a GIF
   */
  async getDelays(dataUrl) {
    const response = await fetch(dataUrl);
    const arrayBuffer = await response.arrayBuffer();

    const gif = parseGIF(arrayBuffer);
    const frames = decompressFrames(gif, true);

    return frames.map((frame) => frame.delay * 10); // delay is in centiseconds
  }
}
