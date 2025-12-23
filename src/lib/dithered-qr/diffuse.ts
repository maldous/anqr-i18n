// Copied from https://codeberg.org/andrew-t/dithered-qr-codes

import { getScale } from "./form.ts";
import isLocked, { isData } from "./locked.ts";

export function diffuseDataPoints(imageData: number[][], qr: boolean[][]) {
  const scale = getScale();
  const m = ~~(scale / 2);
  if (scale & 1) {
    for (let y = m; y < imageData.length; y += scale) {
      for (let x = m; x < imageData.length; x += scale) {
        if (isLocked(imageData.length, x, y)) continue;
        if (!isData(x, y)) continue;
        const error = imageData[y][x] - +qr[y][x];
        for (let dy = -1; dy <= 1; ++dy) {
          for (let dx = -1; dx <= 1; ++dx) {
            if (dx == 0 && dy == 0) continue;
            if (isLocked(imageData.length, x + dx, y + dy)) continue;
            const ny = y + dy;
            const nx = x + dx;
            if (nx < 0 || ny < 0 || nx >= imageData.length || ny >= imageData.length) continue;
            const weight = 1 / 8;
            imageData[ny][nx] += error * weight;
          }
        }
      }
    }
  } else {
    for (let y = m; y < imageData.length; y += scale) {
      for (let x = m; x < imageData.length; x += scale) {
        if (isLocked(imageData.length, x, y)) continue;
        if (!isData(x, y)) continue;
        const error = imageData[y][x] - +qr[y][x];
        for (let dy = -1; dy <= 1; ++dy) {
          for (let dx = -1; dx <= 1; ++dx) {
            if (dx == 0 && dy == 0) continue;
            // Also diffuse to the other center points
            // That gives us (3*2)^2 - 2^2 = 32
            for (let ddx = -0.5; ddx <= 0.5; ddx += 1) {
              for (let ddy = -0.5; ddy <= 0.5; ddy += 1) {
                const sx = x + 0.5 + dx * 0.5 + ddx;
                const sy = y + 0.5 + dy * 0.5 + ddy;
                if (isLocked(imageData.length, sx, sy)) continue;
                const weight = 1 / 32;
                imageData[sy][sx] += error * weight;
              }
            }
          }
        }
      }
    }
  }
}

export function diffuseFreePoints(imageData: number[][]) {
  const scale = getScale();


  const h = imageData.length;
  const w = imageData[0]?.length ?? h;
  function canChange(x: number, y: number) {
    if (x < 0 || y < 0 || x >= w || y >= h) return false;
    return !isLocked(h, x, y) && !isData(x, y);
  }

  for (let y = 0; y + scale <= h; y += scale) {
    for (let x = 0; x + scale <= w; x += scale) {
      for (let dy = 0; dy < scale; ++dy) {
        for (let dx = 0; dx < scale; ++dx) {
          const sx = x + dx;
          const sy = y + dy;
          if (!canChange(sx, sy)) continue;
          const old = imageData[sy][sx];
          const actual = Math.round(old);
          imageData[sy][sx] = actual;
          const error = old - actual;

          // Distribute error to neighbors
          for (let ddy = -1; ddy <= 1; ++ddy) {
            for (let ddx = -1; ddx <= 1; ++ddx) {
              if (ddx == 0 && ddy == 0) continue;
              const nx = sx + ddx;
              const ny = sy + ddy;
              if (!canChange(nx, ny)) continue;
              const weight = 1 / 8;
              imageData[ny][nx] += error * weight;
            }
          }
        }
      }
    }
  }
}
