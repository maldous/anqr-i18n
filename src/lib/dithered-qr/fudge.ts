// Copied from https://codeberg.org/andrew-t/dithered-qr-codes

import { getFudgePixels } from "./form.ts";
import isLocked, { isData } from "./locked.ts";

export default function fudgeQrData(imageData: number[][], qr: boolean[][]) {
  // Update qr data points to match image if error is too large
  const scale = imageData.length / qr.length;
  const m = ~~(scale / 2);
  const threshold = getFudgePixels() / 100;
  for (let y = m; y < imageData.length; y += scale) {
    for (let x = m; x < imageData.length; x += scale) {
      const error = Math.abs(imageData[y][x] - +qr[y][x]);
      if (error > threshold) {
        const l = imageData.length;
        if (!isLocked(l, y, x) && isData(y, x)) {
          qr[y][x] = imageData[y][x] > 0.5;
        }
      }
    }
  }
}
