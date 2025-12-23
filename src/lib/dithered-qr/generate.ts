// Adapted from https://codeberg.org/andrew-t/dithered-qr-codes

import { diffuseDataPoints, diffuseFreePoints } from "./diffuse.ts";
import { setFormState } from "./form.ts";
import fudgeQrData from "./fudge.ts";
import { loadImageDataFromCanvas } from "./image.ts";
import isLocked, { isData } from "./locked.ts";
import makeQR from "./qr.ts";

export type GenerateDitheredParams = {
  text: string;
  ecc: "L" | "M" | "Q" | "H";
  version?: number;
  scale: number;
  mask?: number;
  overlayCanvas: HTMLCanvasElement;
  overlayIntensity?: number;
};

export default function generateDitheredMatrix(
  params: GenerateDitheredParams,
): boolean[][] {
  setFormState({
    scale: params.scale,
    // Keep the default lock rules and no rotation/reflection for now.
    rotation: 0,
    reflection: false,
    // Use ANQR's intensity slider to control how strongly the picture comes through.
    // We map it to contrast in image.ts.
    includeImage: true,
    diffuseDataPoints: true,
    diffuseFreePoints: true,
    fudgePixels: 0,
    inverted: false,
    hideFreePoints: false,
  });

  const qr = makeQR({
    text: params.text,
    ecc: params.ecc,
    version: params.version,
    mask: params.mask,
    scale: params.scale,
  });

  const imageData = loadImageDataFromCanvas(params.overlayCanvas, qr.length, {
    intensity: params.overlayIntensity,
    opacity: 1,
  });

  // Keep the upstream step order.
  fudgeQrData(imageData, qr);
  diffuseDataPoints(imageData, qr);
  diffuseFreePoints(imageData);

  // Apply image to free points.
  for (let y = 0; y < qr.length; ++y) {
    for (let x = 0; x < qr.length; ++x) {
      if (isLocked(qr.length, x, y)) continue;
      if (isData(x, y)) continue;
      qr[y][x] = imageData[y][x] > 0.5;
    }
  }

  return qr;
}
