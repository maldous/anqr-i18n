// Adapted from https://codeberg.org/andrew-t/dithered-qr-codes

import { encodeQR } from "qr";

export type MakeQRParams = {
  text: string;
  ecc: "L" | "M" | "Q" | "H";
  // 0 or undefined lets the encoder choose
  version?: number;
  mask?: number;
  scale: number;
};

export default function makeQR(params: MakeQRParams): boolean[][] {
  const text = params.text ?? "";
  const ECC_MAP = {
    L: "low",
    M: "medium",
    Q: "quartile",
    H: "high",
  } as const;
  const ecc = ECC_MAP[params.ecc];
  const scale = params.scale;

  // NOTE: the upstream project requests `raw` output with a `scale` option.
  // That yields a boolean matrix at (modules * scale) resolution.
  try {
    return encodeQR(text, "raw", {
      border: 0,
      ecc,
      version: params.version && params.version > 0 ? params.version : undefined,
      mask: typeof params.mask === "number" ? params.mask : undefined,
      scale,
    });
  } catch (_e) {
    // If the supplied version was too small, retry letting the encoder choose.
    return encodeQR(text, "raw", {
      border: 0,
      ecc,
      version: undefined,
      mask: typeof params.mask === "number" ? params.mask : undefined,
      scale,
    });
  }
}
