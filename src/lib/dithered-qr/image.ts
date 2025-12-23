// Adapted from https://codeberg.org/andrew-t/dithered-qr-codes

export type ImageTransform = {
  // 0..100 from ANQR slider, mapped into contrast
  intensity?: number;
  // 0..1 alpha applied when sampling
  opacity?: number;
};

export function loadImageDataFromCanvas(
  sourceCanvas: HTMLCanvasElement,
  size: number,
  opts: ImageTransform = {},
): number[][] {
  const opacity = typeof opts.opacity === "number" ? opts.opacity : 1;
  const intensity = typeof opts.intensity === "number" ? opts.intensity : 100;
  // 50 => baseline (1.0). Lower reduces contrast, higher boosts it.
  const contrast = Math.max(0, intensity / 50);

  const tmp = document.createElement("canvas");
  tmp.width = size;
  tmp.height = size;
  const ctx = tmp.getContext("2d");
  if (!ctx) throw new Error("canvas 2d context unavailable");

  // Fit source into square (stretch). For now keep it simple; we can add
  // cover/contain later.
  ctx.clearRect(0, 0, size, size);
  if (opacity < 1) {
    ctx.globalAlpha = opacity;
  }
  ctx.drawImage(sourceCanvas, 0, 0, size, size);
  ctx.globalAlpha = 1;

  const data = ctx.getImageData(0, 0, size, size).data;
  const out: number[][] = [];

  // Replicates the upstream behavior: sample green channel and normalize.
  let min = 1;
  let max = 0;
  for (let y = 0; y < size; ++y) {
    const row: number[] = [];
    for (let x = 0; x < size; ++x) {
      const i = 4 * (x + y * size);
      const v = data[i + 1] / 255;
      row.push(v);
      if (v < min) min = v;
      if (v > max) max = v;
    }
    out.push(row);
  }

  // Normalize + apply contrast around midpoint.
  const span = Math.max(1e-9, max - min);
  for (let y = 0; y < size; ++y) {
    for (let x = 0; x < size; ++x) {
      let v = (out[y][x] - min) / span;
      v -= 0.5;
      v *= contrast;
      v += 0.5;
      if (v < 0) v = 0;
      if (v > 1) v = 1;
      out[y][x] = v;
    }
  }

  return out;
}
