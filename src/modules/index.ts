/**
 * ANQR Modules Index
 * 
 * Consolidated exports for all QR code generation functionality
 * organized by feature section from anqr-features.txt
 */

// ============================================
// QR ENCODING (QREncodingSection)
// ============================================
export { QRCore, default as QRCoreDefault } from './qr-core'
export type { ECCLevel, MaskPattern, EncodingMode, QROptions, QRMatrix, QRInstance } from './qr-core'
export { 
  generateQR, createQRInstance, calculateOptimalVersion, 
  getVersionFromModuleCount, getModuleCountForVersion,
  getAlignmentPositions, isFinderPattern, isTimingPattern, 
  isAlignmentPattern, isLocked, isData, isStructuralModule 
} from './qr-core'

// ============================================
// RENDERING (RenderSection)
// ============================================
// NOTE: renderer.ts was removed as dead code - QRGenerator in qr-generator.js handles all rendering
// For QR rendering, use: import { QRGenerator } from './qr-generator'

// Color utilities (canonical source for color types)
export { ColorUtils, default as ColorUtilsDefault } from './color-utils'
export type { RGB, RGBA, HSL, HSLA, GradientConfig } from './color-utils'
export {
  parseHex, parseHexAlpha, parseRgbString, parseHslString, parseColor,
  rgbToHex, rgbaToHex, rgbToString, rgbaToString, rgbToHsl, hslToRgb, rgbToGray,
  blendColors, blendRgb, alphaBlend, multiplyBlend, screenBlend, overlayBlend,
  getGradientColor, createCssGradient, getGradientColorAt,
  getRelativeLuminance, getContrastRatio, meetsContrastAA, meetsContrastAAA,
  adjustForContrast, isDark, getTextColor,
  getComplementary, getAnalogous, getTriadic
} from './color-utils'

// ============================================
// OVERLAY & DITHERING (OverlaySection)
// ============================================
export { OverlayProcessor, default as OverlayProcessorDefault } from './overlay-processor'
export type { OverlayOptions, ProcessedOverlay } from './overlay-processor'
export {
  loadImageFromFile, loadImageFromUrl, loadImageFromDataUrl,
  cropImage, fitImage, rotateCanvas, flipCanvas,
  processOverlay, getOverlayData, getOverlayRGBData, applyOverlayMode
} from './overlay-processor'

export { ImageFilters, default as ImageFiltersDefault } from './image-filters'
export type { FilterOptions } from './image-filters'
export {
  brightness, contrast, gamma, saturation, hueRotate, invert, grayscale, threshold, posterize,
  convolve, blur, sharpen, gaussianBlur, emboss,
  sobelEdge, cannyEdge, applyColorMode, duotone,
  applyFilters, copyImageData, getBrightnessMap, getRGBMap,
  clamp, clamp01
} from './image-filters'

export { DitherAlgorithms, default as DitherAlgorithmsDefault } from './dither-algorithms'
export type { DitherOptions, DitherResult } from './dither-algorithms'
export {
  orderedDither, bayerDither, errorDiffusion,
  blueNoiseDither, temporalBlueNoiseDither,
  whiteNoiseDither, gaussianNoiseDither, triangularNoiseDither,
  applyDither, imageDataToFloat
} from './dither-algorithms'

export { generateBlueNoiseDithered } from './blue-noise-dither'
export type { BlueNoiseOptions, BlueNoiseResult, ColorMode as BlueNoiseColorMode } from './blue-noise-dither'

// ============================================
// ANIMATION (AnimationSection)
// ============================================
export { Animation, default as AnimationDefault } from './animation'
export type {
  AnimationFrame, AnimationOptions, AnimationPattern, AnimationState, GifCompositor
} from './animation'
export {
  parseGifFrames, getGifDelays,
  // GIF compositor (optimal patch-only decode)
  createGifCompositor, calculateCompositorFps, decimateCompositorFrames,
  // Legacy utilities
  calculateSourceFps, decimateFramesToFps,
  createAnimationState, getNextFrame, advanceAnimation,
  applyAnimationPattern, applyTemporalDither,
  interpolateFrames, applyColorCycle, createAnimationLoop
} from './animation'

// ============================================
// OUTPUT & EXPORT (OutputSection)
// ============================================
export { Exporter, ExporterModule, default as ExporterDefault } from './exporter'
export type { OutputFormat, ExportConfig, ExportResult } from './exporter'
export {
  exportImage, downloadImage,
  exportGif, downloadGif,
  exportSvg, exportVectorSvg, downloadSvg,
  downloadUrl, canvasToBlob as exporterCanvasToBlob
} from './exporter'

// ============================================
// PAYLOAD GENERATION (PayloadSection)
// ============================================
export { PayloadGenerators, default as PayloadGeneratorsDefault } from './payload-generators'
export type {
  EPCSepaParams, UPIParams, PayNowParams, PromptPayParams, PIXParams,
  GS1DigitalLinkParams, BizCardParams, OTPAuthParams
} from './payload-generators'
export {
  generateUrl, generateTel, generateEmail, generateSms, generateGeo, generateWifi,
  generateVCard, generateMeCard, generateBizCard,
  generateEvent, generateCalendarSubscription,
  generateEPCSepa, generateUPI, generatePayNow, generatePromptPay, generatePIX, generateCrypto,
  generateGS1DigitalLink, generateOTPAuth,
  generateSocialProfile, generateMessagingLink, generateAppDeepLink
} from './payload-generators'

// ============================================
// WATERMARK (WatermarkSection)
// ============================================
export { Watermark, default as WatermarkDefault } from './watermark'
export type {
  WatermarkKind, WatermarkPosition, WatermarkBlend, WatermarkOptions, WatermarkResult
} from './watermark'
export {
  createTextWatermark, createPatternWatermark,
  getWatermarkPositions, applyBlendMode,
  applyWatermark, applyCenterLogo
} from './watermark'

// ============================================
// QR SCANNER / VALIDATOR
// ============================================
export { QRScanner, default as QRScannerDefault } from './qr-scanner'
export type { ScanResult, QRLocation, ValidationResult } from './qr-scanner'
export {
  scanCanvas, scanImageData, scanFile,
  validateQRCode, validateQRCodeRobust, validateFrames
} from './qr-scanner'

// ============================================
// SAFETY & QA (SafetySection)
// ============================================
export { SafetyAnalyzer, default as SafetyAnalyzerDefault } from './safety-analyzer'
export type {
  SafetyMode, SafetyOptions, AnalysisResult, AnalysisIssue, AnalysisWarning,
  ContrastReport, ScanSimulationResult
} from './safety-analyzer'
export {
  analyzeContrast, analyzeMatrixContrast,
  validateModuleSize, validateQuietZone, validateOverlayIntensity, calculateSafeIntensity,
  simulateScan, applyBlurSimulation, applyNoiseSimulation,
  analyzeQR, generateReadabilityHeatmap
} from './safety-analyzer'

// ============================================
// SHARE & EMBED (ShareSection)
// ============================================
export { ShareUtils, default as ShareUtilsDefault } from './share-utils'
export type { ShareConfig, EmbedOptions } from './share-utils'
export {
  parseUrlParams, buildUrlParams, updateBrowserUrl, getShareableUrl,
  generateImageEmbed, generateIframeEmbed, generateMarkdownEmbed, generateBBCodeEmbed,
  getSocialShareUrls, copyToClipboard, copyImageToClipboard,
  canvasToDataUrl, canvasToBlob, downloadBlob, estimateQRSize
} from './share-utils'

// ============================================
// MAIN QR GENERATOR (Orchestrator)
// ============================================
export { QRGenerator } from './qr-generator'

// ============================================
// UI HELPERS
// ============================================
export { CropHandler } from './crop-handler'
