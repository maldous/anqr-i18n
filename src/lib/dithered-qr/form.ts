// Adapted from https://codeberg.org/andrew-t/dithered-qr-codes
// This project originally reads options from DOM inputs. In ANQR we keep the
// same getter surface but back it with an in-memory config.

export type DitheredFormState = {
  // Core rendering
  scale: number;
  rotation: number;
  reflection: boolean;

  // Locks
  lockPositioningBlocks: boolean;
  lockTimingLines: boolean;
  lockAlignmentPatterns: boolean;

  // Image adjustment
  gamma: number;
  contrast: number;
  brightness: number;
  minBrightness: number;
  maxBrightness: number;

  // Algorithm toggles
  includeImage: boolean;
  diffuseDataPoints: boolean;
  diffuseFreePoints: boolean;
  fudgePixels: number;

  // Misc
  inverted: boolean;
  hideFreePoints: boolean;
};

let state: DitheredFormState = {
  scale: 3,
  rotation: 0,
  reflection: false,

  lockPositioningBlocks: true,
  lockTimingLines: true,
  lockAlignmentPatterns: true,

  gamma: 1,
  contrast: 1,
  brightness: 0,
  minBrightness: 0,
  maxBrightness: 1,

  includeImage: true,
  diffuseDataPoints: true,
  diffuseFreePoints: true,
  fudgePixels: 0,

  inverted: false,
  hideFreePoints: false,
};

export function setFormState(next: Partial<DitheredFormState>) {
  state = { ...state, ...next };
}

export function getScale() {
  return state.scale;
}

export function getRotation() {
  return state.rotation;
}

export function getReflection() {
  return state.reflection;
}

export function getLockPositioningBlocks() {
  return state.lockPositioningBlocks;
}

export function getLockTimingLines() {
  return state.lockTimingLines;
}

export function getLockAlignmentPatterns() {
  return state.lockAlignmentPatterns;
}

export function getGamma() {
  return state.gamma;
}

export function getContrast() {
  return state.contrast;
}

export function getBrightness() {
  return state.brightness;
}

export function getMinBrightness() {
  return state.minBrightness;
}

export function getMaxBrightness() {
  return state.maxBrightness;
}

export function getIncludeImage() {
  return state.includeImage;
}

export function getDiffuseDataPoints() {
  return state.diffuseDataPoints;
}

export function getDiffuseFreePoints() {
  return state.diffuseFreePoints;
}

export function getFudgePixels() {
  return state.fudgePixels;
}

export function getInverted() {
  return state.inverted;
}

export function getHideFreePoints() {
  return state.hideFreePoints;
}
