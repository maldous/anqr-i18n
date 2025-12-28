/**
 * Share Utilities Module
 * Handles URL parameter encoding/decoding, sharing, and embed code generation
 */

// ============================================
// TYPES
// ============================================

export interface ShareConfig {
  // Content
  data: string
  
  // Language
  lang?: string
  
  // QR settings
  ec?: string
  version?: number
  size?: number
  margin?: number
  encodingMode?: string
  borderModulesExtra?: number
  quietZoneMinEnforce?: boolean
  
  // Colors
  fg?: string
  bg?: string
  transparent?: boolean
  
  // Styles
  style?: string
  finder?: string
  alignmentStyle?: string
  timingStyle?: string
  
  // Render settings
  moduleGap?: number
  gapMode?: string
  cornerRadius?: number
  gradientType?: string
  eyeOuterStyle?: string
  eyeInnerStyle?: string
  eyeScale?: number
  frameStyle?: string
  frameText?: string
  dotRotation?: number
  crispEdges?: boolean
  pixelSnap?: string
  perModuleColorMode?: string
  contrastGuard?: boolean
  minContrastRatio?: number
  
  // Overlay
  mode?: string
  intensity?: number
  logoSize?: number
  overlayUrl?: string  // URL source for overlay image
  fit?: string
  rotate?: number
  flipX?: boolean
  flipY?: boolean
  preserveFinders?: boolean
  preserveTiming?: boolean
  preserveAlignment?: boolean
  protectFormatInfo?: boolean
  protectVersionInfo?: boolean
  eccAwareEnabled?: boolean
  eccAwareRiskBudget?: number
  eccAwareWeightMap?: string
  
  // Overlay preprocessing
  colorMode?: string
  brightness?: number
  contrast?: number
  gamma?: number
  saturation?: number
  blur?: number
  sharpen?: number
  posterize?: number
  threshold?: number
  edge?: string
  invert?: boolean
  hue?: number
  
  // Dithering
  ditherKind?: string
  diffusionKernel?: string
  ditherStrength?: number
  ditherSerpentine?: boolean
  orderedMatrix?: string
  blueNoiseTileSize?: number
  blueNoiseSeed?: number
  colorDither?: string
  
  // Subpixel
  subpixelGridSize?: string
  subpixelCenterRule?: string
  subpixelNeutralColor?: string
  subpixelFinderOverride?: string
  
  // Halftone
  halftoneCell?: string
  halftoneDotShape?: string
  brightnessCurve?: string
  duotoneColor1?: string
  duotoneColor2?: string
  
  // Animation
  speed?: number
  loop?: boolean
  reverse?: boolean
  startFrame?: number
  maxFrames?: number
  frameStep?: number
  interpolate?: string
  temporalDither?: string
  pattern?: string
  moduleJitter?: number
  colorCycle?: boolean
  seed?: number
  
  // Output
  width?: number
  height?: number
  format?: string
  quality?: number
  filename?: string
  gifPaletteSize?: number
  gifQuantizer?: string
  gifDither?: string
  gifTransparentColor?: string
  svgTrueVector?: boolean
  svgShapePrecision?: string
  svgEmbedRasterOverlay?: boolean
  dpi?: number
  includeQuietZone?: boolean
  bgOverride?: string
  formatExtra?: string

  // Safety
  safetyMode?: string
  safetyMinModulePx?: number
  safetyMinQuietZone?: number
  lockFinders?: boolean
  lockTiming?: boolean
  lockAlign?: boolean
  lockFormat?: boolean
  lockVersion?: boolean

  // QA
  qaContrastCheck?: boolean
  qaSimulateBlur?: number
  qaSimulateNoise?: number
  qaSimulateRotation?: number
  qaShowHeatmap?: boolean

  // Auto-tuning
  autoPickVersion?: boolean
  autoPickEcc?: boolean
  autoReduceIntensity?: boolean

  // Watermark
  watermarkEnabled?: boolean
  watermarkKind?: string
  watermarkText?: string
  watermarkPosition?: string
  watermarkOpacity?: number
  watermarkBlend?: string

  // Metadata
  metaTitle?: string
  metaAuthor?: string
  metaCopyright?: string
  metaLicense?: string
  metaDescription?: string
  metaCreationTime?: boolean
  metaCustomKv?: string  // JSON encoded
}

export interface EmbedOptions {
  width: number
  height: number
  responsive: boolean
  showBorder: boolean
  includeLink: boolean
}

// ============================================
// URL PARAMETER PARSING
// ============================================

/**
 * Parse URL parameters into a config object
 */
export function parseUrlParams(): Partial<ShareConfig> {
  const params = new URLSearchParams(window.location.search)

  return {
    data: params.get('data') || undefined,
    lang: params.get('lang') || undefined,
    // QR settings
    ec: params.get('ec') || undefined,
    version: params.get('v') ? parseInt(params.get('v')!, 10) : undefined,
    size: params.get('size') ? parseInt(params.get('size')!, 10) : undefined,
    margin: params.get('margin') ? parseInt(params.get('margin')!, 10) : undefined,
    encodingMode: params.get('enc') || undefined,
    borderModulesExtra: params.get('border') ? parseInt(params.get('border')!, 10) : undefined,
    quietZoneMinEnforce: params.has('qzEnforce') ? params.get('qzEnforce') === '1' : undefined,
    // Colors
    fg: params.get('fg') ? `#${params.get('fg')}` : undefined,
    bg: params.get('bg') ? `#${params.get('bg')}` : undefined,
    transparent: params.get('transparent') === '1',
    // Styles
    style: params.get('style') || undefined,
    finder: params.get('finder') || undefined,
    alignmentStyle: params.get('align') || undefined,
    timingStyle: params.get('timing') || undefined,
    // Render settings
    moduleGap: params.get('gap') ? parseInt(params.get('gap')!, 10) : undefined,
    gapMode: params.get('gapMode') || undefined,
    cornerRadius: params.get('radius') ? parseInt(params.get('radius')!, 10) : undefined,
    gradientType: params.get('grad') || undefined,
    eyeOuterStyle: params.get('eyeOuter') || undefined,
    eyeInnerStyle: params.get('eyeInner') || undefined,
    eyeScale: params.get('eyeScale') ? parseInt(params.get('eyeScale')!, 10) : undefined,
    frameStyle: params.get('frame') || undefined,
    frameText: params.get('frameText') ? decodeURIComponent(params.get('frameText')!) : undefined,
    dotRotation: params.get('dotRot') ? parseInt(params.get('dotRot')!, 10) : undefined,
    crispEdges: params.get('crisp') === '1',
    pixelSnap: params.get('snap') || undefined,
    perModuleColorMode: params.get('modColor') || undefined,
    contrastGuard: params.get('cGuard') === '1',
    minContrastRatio: params.get('minContrast') ? parseFloat(params.get('minContrast')!) : undefined,
    // Overlay
    mode: params.get('mode') || undefined,
    intensity: params.get('intensity') ? parseInt(params.get('intensity')!, 10) : undefined,
    logoSize: params.get('logoSize') ? parseInt(params.get('logoSize')!, 10) : undefined,
    overlayUrl: params.get('img') || undefined,
    fit: params.get('fit') || undefined,
    rotate: params.get('rot') ? parseInt(params.get('rot')!, 10) : undefined,
    flipX: params.get('flipX') === '1',
    flipY: params.get('flipY') === '1',
    preserveFinders: params.get('keepFinders') !== '0',
    preserveTiming: params.get('keepTiming') === '1',
    preserveAlignment: params.get('keepAlign') === '1',
    protectFormatInfo: params.get('protectFmt') === '1',
    protectVersionInfo: params.get('protectVer') === '1',
    eccAwareEnabled: params.get('eccAware') === '1',
    eccAwareRiskBudget: params.get('eccRisk') ? parseInt(params.get('eccRisk')!, 10) : undefined,
    eccAwareWeightMap: params.get('eccMap') || undefined,
    // Overlay preprocessing
    colorMode: params.get('colorMode') || undefined,
    brightness: params.get('brightness') ? parseInt(params.get('brightness')!, 10) : undefined,
    contrast: params.get('contrast') ? parseInt(params.get('contrast')!, 10) : undefined,
    gamma: params.get('gamma') ? parseFloat(params.get('gamma')!) : undefined,
    saturation: params.get('saturation') ? parseInt(params.get('saturation')!, 10) : undefined,
    blur: params.get('blur') ? parseInt(params.get('blur')!, 10) : undefined,
    sharpen: params.get('sharpen') ? parseInt(params.get('sharpen')!, 10) : undefined,
    posterize: params.get('posterize') ? parseInt(params.get('posterize')!, 10) : undefined,
    threshold: params.get('threshold') ? parseInt(params.get('threshold')!, 10) : undefined,
    edge: params.get('edge') || undefined,
    invert: params.get('invert') === '1',
    hue: params.get('hue') ? parseInt(params.get('hue')!, 10) : undefined,
    // Dithering
    ditherKind: params.get('ditherKind') || undefined,
    diffusionKernel: params.get('diffusionKernel') || undefined,
    ditherStrength: params.get('ditherStrength') ? parseInt(params.get('ditherStrength')!, 10) : undefined,
    ditherSerpentine: params.get('serpentine') === '1',
    orderedMatrix: params.get('matrix') || undefined,
    blueNoiseTileSize: params.get('bnTile') ? parseInt(params.get('bnTile')!, 10) : undefined,
    blueNoiseSeed: params.get('bnSeed') ? parseInt(params.get('bnSeed')!, 10) : undefined,
    colorDither: params.get('colorDither') || undefined,
    // Subpixel
    subpixelGridSize: params.get('spGrid') || undefined,
    subpixelCenterRule: params.get('spCenter') || undefined,
    subpixelNeutralColor: params.get('spNeutral') ? `#${params.get('spNeutral')}` : undefined,
    subpixelFinderOverride: params.get('spFinder') || undefined,
    // Halftone
    halftoneCell: params.get('htCell') || undefined,
    halftoneDotShape: params.get('htDot') || undefined,
    brightnessCurve: params.get('htCurve') || undefined,
    duotoneColor1: params.get('duo1') ? `#${params.get('duo1')}` : undefined,
    duotoneColor2: params.get('duo2') ? `#${params.get('duo2')}` : undefined,
    // Animation
    speed: params.get('speed') ? parseInt(params.get('speed')!, 10) : undefined,
    loop: params.has('loop') ? params.get('loop') !== '0' : undefined,
    reverse: params.get('reverse') === '1',
    startFrame: params.get('startF') ? parseInt(params.get('startF')!, 10) : undefined,
    maxFrames: params.get('maxF') ? parseInt(params.get('maxF')!, 10) : undefined,
    frameStep: params.get('stepF') ? parseInt(params.get('stepF')!, 10) : undefined,
    interpolate: params.get('interp') || undefined,
    temporalDither: params.get('tempDither') || undefined,
    pattern: params.get('animPattern') || undefined,
    moduleJitter: params.get('jitter') ? parseFloat(params.get('jitter')!) : undefined,
    colorCycle: params.get('colorCycle') === '1',
    seed: params.get('seed') ? parseInt(params.get('seed')!, 10) : undefined,
    // Output
    width: params.get('w') ? parseInt(params.get('w')!, 10) : undefined,
    height: params.get('h') ? parseInt(params.get('h')!, 10) : undefined,
    format: params.get('format') || undefined,
    quality: params.get('quality') ? parseFloat(params.get('quality')!) : undefined,
    filename: params.get('fname') ? decodeURIComponent(params.get('fname')!) : undefined,
    gifPaletteSize: params.get('gifPal') ? parseInt(params.get('gifPal')!, 10) : undefined,
    gifQuantizer: params.get('gifQuant') || undefined,
    gifDither: params.get('gifDith') || undefined,
    gifTransparentColor: params.get('gifTrans') ? `#${params.get('gifTrans')}` : undefined,
    svgTrueVector: params.get('svgVec') === '1',
    svgShapePrecision: params.get('svgPrec') || undefined,
    svgEmbedRasterOverlay: params.has('svgEmbed') ? params.get('svgEmbed') === '1' : undefined,
    dpi: params.get('dpi') ? parseInt(params.get('dpi')!, 10) : undefined,
    includeQuietZone: params.has('inclQz') ? params.get('inclQz') === '1' : undefined,
    bgOverride: params.get('bgOver') ? `#${params.get('bgOver')}` : undefined,
    formatExtra: params.get('fmtExtra') || undefined,
    // Safety
    safetyMode: params.get('safeMode') || undefined,
    safetyMinModulePx: params.get('safeMinPx') ? parseInt(params.get('safeMinPx')!, 10) : undefined,
    safetyMinQuietZone: params.get('safeMinQz') ? parseInt(params.get('safeMinQz')!, 10) : undefined,
    lockFinders: params.has('lockF') ? params.get('lockF') === '1' : undefined,
    lockTiming: params.has('lockT') ? params.get('lockT') === '1' : undefined,
    lockAlign: params.has('lockA') ? params.get('lockA') === '1' : undefined,
    lockFormat: params.has('lockFmt') ? params.get('lockFmt') === '1' : undefined,
    lockVersion: params.has('lockV') ? params.get('lockV') === '1' : undefined,

    // QA
    qaContrastCheck: params.get('qaContrast') === '1',
    qaSimulateBlur: params.get('qaBlur') ? parseFloat(params.get('qaBlur')!) : undefined,
    qaSimulateNoise: params.get('qaNoise') ? parseInt(params.get('qaNoise')!, 10) : undefined,
    qaSimulateRotation: params.get('qaRot') ? parseInt(params.get('qaRot')!, 10) : undefined,
    qaShowHeatmap: params.get('qaHeatmap') === '1',

    // Auto-tuning
    autoPickVersion: params.has('autoVer') ? params.get('autoVer') === '1' : undefined,
    autoPickEcc: params.get('autoEcc') === '1',
    autoReduceIntensity: params.get('autoReduce') === '1',

    // Watermark
    watermarkEnabled: params.get('wmEn') === '1',
    watermarkKind: params.get('wmKind') || undefined,
    watermarkText: params.get('wmText') ? decodeURIComponent(params.get('wmText')!) : undefined,
    watermarkPosition: params.get('wmPos') || undefined,
    watermarkOpacity: params.get('wmOpacity') ? parseInt(params.get('wmOpacity')!, 10) : undefined,
    watermarkBlend: params.get('wmBlend') || undefined,

    // Metadata
    metaTitle: params.get('metaTitle') ? decodeURIComponent(params.get('metaTitle')!) : undefined,
    metaAuthor: params.get('metaAuthor') ? decodeURIComponent(params.get('metaAuthor')!) : undefined,
    metaCopyright: params.get('metaCopy') ? decodeURIComponent(params.get('metaCopy')!) : undefined,
    metaLicense: params.get('metaLic') ? decodeURIComponent(params.get('metaLic')!) : undefined,
    metaDescription: params.get('metaDesc') ? decodeURIComponent(params.get('metaDesc')!) : undefined,
    metaCreationTime: params.get('metaTime') === '1',
    metaCustomKv: params.get('metaKv') ? decodeURIComponent(params.get('metaKv')!) : undefined,
  }
}

/**
 * Build URL parameters from a config object
 */
export function buildUrlParams(config: Partial<ShareConfig>): string {
  const params = new URLSearchParams()

  // Required
  if (config.data) {
    params.set('data', config.data)
  }

  // Language
  if (config.lang && config.lang !== 'en') {
    params.set('lang', config.lang)
  }

  // QR settings
  if (config.ec && config.ec !== 'H') {
    params.set('ec', config.ec)
  }
  if (config.version && config.version !== 0) {
    params.set('v', config.version.toString())
  }
  if (config.size && config.size !== 20) {
    params.set('size', config.size.toString())
  }
  if (config.margin !== undefined && config.margin !== 4) {
    params.set('margin', config.margin.toString())
  }
  if (config.encodingMode && config.encodingMode !== 'auto') {
    params.set('enc', config.encodingMode)
  }
  if (config.borderModulesExtra && config.borderModulesExtra !== 0) {
    params.set('border', config.borderModulesExtra.toString())
  }
  if (config.quietZoneMinEnforce === false) {
    params.set('qzEnforce', '0')
  }

  // Colors
  if (config.fg && config.fg !== '#000000') {
    params.set('fg', config.fg.replace('#', ''))
  }
  if (config.bg && config.bg !== '#ffffff') {
    params.set('bg', config.bg.replace('#', ''))
  }
  if (config.transparent) {
    params.set('transparent', '1')
  }

  // Styles
  if (config.style && config.style !== 'square') {
    params.set('style', config.style)
  }
  if (config.finder && config.finder !== 'square') {
    params.set('finder', config.finder)
  }
  if (config.alignmentStyle && config.alignmentStyle !== 'match_finder') {
    params.set('align', config.alignmentStyle)
  }
  if (config.timingStyle && config.timingStyle !== 'match_module') {
    params.set('timing', config.timingStyle)
  }

  // Render settings
  if (config.moduleGap !== undefined && config.moduleGap !== 0) {
    params.set('gap', config.moduleGap.toString())
  }
  if (config.gapMode && config.gapMode !== 'none') {
    params.set('gapMode', config.gapMode)
  }
  if (config.cornerRadius !== undefined && config.cornerRadius !== 0) {
    params.set('radius', config.cornerRadius.toString())
  }
  if (config.gradientType && config.gradientType !== 'none') {
    params.set('grad', config.gradientType)
  }
  if (config.eyeOuterStyle && config.eyeOuterStyle !== 'square') {
    params.set('eyeOuter', config.eyeOuterStyle)
  }
  if (config.eyeInnerStyle && config.eyeInnerStyle !== 'square') {
    params.set('eyeInner', config.eyeInnerStyle)
  }
  if (config.eyeScale !== undefined && config.eyeScale !== 100) {
    params.set('eyeScale', config.eyeScale.toString())
  }
  if (config.frameStyle && config.frameStyle !== 'none') {
    params.set('frame', config.frameStyle)
  }
  if (config.frameText) {
    params.set('frameText', encodeURIComponent(config.frameText))
  }
  if (config.dotRotation !== undefined && config.dotRotation !== 0) {
    params.set('dotRot', config.dotRotation.toString())
  }
  if (config.crispEdges === false) {
    params.set('crisp', '0')
  }
  if (config.pixelSnap && config.pixelSnap !== 'floor') {
    params.set('snap', config.pixelSnap)
  }
  if (config.perModuleColorMode && config.perModuleColorMode !== 'solid') {
    params.set('modColor', config.perModuleColorMode)
  }
  if (config.contrastGuard) {
    params.set('cGuard', '1')
  }
  if (config.minContrastRatio !== undefined && config.minContrastRatio !== 4.5) {
    params.set('minContrast', config.minContrastRatio.toString())
  }

  // Overlay
  if (config.mode && config.mode !== 'dithered') {
    params.set('mode', config.mode)
  }
  if (config.intensity !== undefined && config.intensity !== 100) {
    params.set('intensity', config.intensity.toString())
  }
  if (config.logoSize !== undefined && config.logoSize !== 25) {
    params.set('logoSize', config.logoSize.toString())
  }
  if (config.overlayUrl) {
    params.set('img', config.overlayUrl)
  }
  if (config.fit && config.fit !== 'cover') {
    params.set('fit', config.fit)
  }
  if (config.rotate !== undefined && config.rotate !== 0) {
    params.set('rot', config.rotate.toString())
  }
  if (config.flipX) {
    params.set('flipX', '1')
  }
  if (config.flipY) {
    params.set('flipY', '1')
  }
  if (config.preserveFinders === false) {
    params.set('keepFinders', '0')
  }
  if (config.preserveTiming) {
    params.set('keepTiming', '1')
  }
  if (config.preserveAlignment) {
    params.set('keepAlign', '1')
  }
  if (config.protectFormatInfo) {
    params.set('protectFmt', '1')
  }
  if (config.protectVersionInfo) {
    params.set('protectVer', '1')
  }
  if (config.eccAwareEnabled) {
    params.set('eccAware', '1')
  }
  if (config.eccAwareRiskBudget !== undefined && config.eccAwareRiskBudget !== 50) {
    params.set('eccRisk', config.eccAwareRiskBudget.toString())
  }
  if (config.eccAwareWeightMap && config.eccAwareWeightMap !== 'distance_to_finders') {
    params.set('eccMap', config.eccAwareWeightMap)
  }

  // Overlay preprocessing
  if (config.colorMode && config.colorMode !== 'color') {
    params.set('colorMode', config.colorMode)
  }
  if (config.brightness !== undefined && config.brightness !== 0) {
    params.set('brightness', config.brightness.toString())
  }
  if (config.contrast !== undefined && config.contrast !== 0) {
    params.set('contrast', config.contrast.toString())
  }
  if (config.gamma !== undefined && config.gamma !== 1) {
    params.set('gamma', config.gamma.toString())
  }
  if (config.saturation !== undefined && config.saturation !== 0) {
    params.set('saturation', config.saturation.toString())
  }
  if (config.hue !== undefined && config.hue !== 0) {
    params.set('hue', config.hue.toString())
  }
  if (config.blur !== undefined && config.blur !== 0) {
    params.set('blur', config.blur.toString())
  }
  if (config.sharpen !== undefined && config.sharpen !== 0) {
    params.set('sharpen', config.sharpen.toString())
  }
  if (config.posterize !== undefined && config.posterize !== 0) {
    params.set('posterize', config.posterize.toString())
  }
  if (config.threshold !== undefined && config.threshold !== 128) {
    params.set('threshold', config.threshold.toString())
  }
  if (config.edge && config.edge !== 'off') {
    params.set('edge', config.edge)
  }
  if (config.invert) {
    params.set('invert', '1')
  }

  // Dithering
  if (config.ditherKind && config.ditherKind !== 'error_diffusion') {
    params.set('ditherKind', config.ditherKind)
  }
  if (config.diffusionKernel && config.diffusionKernel !== 'floyd_steinberg') {
    params.set('diffusionKernel', config.diffusionKernel)
  }
  if (config.ditherStrength !== undefined && config.ditherStrength !== 50) {
    params.set('ditherStrength', config.ditherStrength.toString())
  }
  if (config.ditherSerpentine) {
    params.set('serpentine', '1')
  }
  if (config.orderedMatrix && config.orderedMatrix !== 'bayer4') {
    params.set('matrix', config.orderedMatrix)
  }
  if (config.blueNoiseTileSize !== undefined && config.blueNoiseTileSize !== 64) {
    params.set('bnTile', config.blueNoiseTileSize.toString())
  }
  if (config.blueNoiseSeed !== undefined && config.blueNoiseSeed !== 0) {
    params.set('bnSeed', config.blueNoiseSeed.toString())
  }
  if (config.colorDither && config.colorDither !== 'none') {
    params.set('colorDither', config.colorDither)
  }

  // Subpixel
  if (config.subpixelGridSize && config.subpixelGridSize !== '3x3') {
    params.set('spGrid', config.subpixelGridSize)
  }
  if (config.subpixelCenterRule && config.subpixelCenterRule !== 'strict') {
    params.set('spCenter', config.subpixelCenterRule)
  }
  if (config.subpixelNeutralColor && config.subpixelNeutralColor !== '#808080') {
    params.set('spNeutral', config.subpixelNeutralColor.replace('#', ''))
  }
  if (config.subpixelFinderOverride && config.subpixelFinderOverride !== 'solid') {
    params.set('spFinder', config.subpixelFinderOverride)
  }

  // Halftone
  if (config.halftoneCell && config.halftoneCell !== 'per_module') {
    params.set('htCell', config.halftoneCell)
  }
  if (config.halftoneDotShape && config.halftoneDotShape !== 'circle') {
    params.set('htDot', config.halftoneDotShape)
  }
  if (config.brightnessCurve && config.brightnessCurve !== 'linear') {
    params.set('htCurve', config.brightnessCurve)
  }
  if (config.duotoneColor1 && config.duotoneColor1 !== '#000000') {
    params.set('duo1', config.duotoneColor1.replace('#', ''))
  }
  if (config.duotoneColor2 && config.duotoneColor2 !== '#ffffff') {
    params.set('duo2', config.duotoneColor2.replace('#', ''))
  }

  // Animation
  if (config.speed !== undefined && config.speed !== 100) {
    params.set('speed', config.speed.toString())
  }
  if (config.loop === false) {
    params.set('loop', '0')
  }
  if (config.reverse) {
    params.set('reverse', '1')
  }
  if (config.startFrame !== undefined && config.startFrame !== 0) {
    params.set('startF', config.startFrame.toString())
  }
  if (config.maxFrames !== undefined && config.maxFrames !== 100) {
    params.set('maxF', config.maxFrames.toString())
  }
  if (config.frameStep !== undefined && config.frameStep !== 1) {
    params.set('stepF', config.frameStep.toString())
  }
  if (config.interpolate && config.interpolate !== 'none') {
    params.set('interp', config.interpolate)
  }
  if (config.temporalDither && config.temporalDither !== 'off') {
    params.set('tempDither', config.temporalDither)
  }
  if (config.pattern && config.pattern !== 'none') {
    params.set('animPattern', config.pattern)
  }
  if (config.moduleJitter !== undefined && config.moduleJitter !== 0) {
    params.set('jitter', config.moduleJitter.toString())
  }
  if (config.colorCycle) {
    params.set('colorCycle', '1')
  }
  if (config.seed !== undefined && config.seed !== 0) {
    params.set('seed', config.seed.toString())
  }

  // Output
  if (config.width && config.width !== 400) {
    params.set('w', config.width.toString())
  }
  if (config.height && config.height !== 400) {
    params.set('h', config.height.toString())
  }
  if (config.format && config.format !== 'gif') {
    params.set('format', config.format)
  }
  if (config.quality !== undefined && config.quality !== 0.9) {
    params.set('quality', config.quality.toString())
  }
  if (config.filename && config.filename !== 'anqr-qrcode') {
    params.set('fname', encodeURIComponent(config.filename))
  }
  if (config.gifPaletteSize !== undefined && config.gifPaletteSize !== 256) {
    params.set('gifPal', config.gifPaletteSize.toString())
  }
  if (config.gifQuantizer && config.gifQuantizer !== 'median_cut') {
    params.set('gifQuant', config.gifQuantizer)
  }
  if (config.gifDither && config.gifDither !== 'floyd') {
    params.set('gifDith', config.gifDither)
  }
  if (config.svgTrueVector) {
    params.set('svgVec', '1')
  }
  if (config.dpi !== undefined && config.dpi !== 72) {
    params.set('dpi', config.dpi.toString())
  }
  if (config.includeQuietZone === false) {
    params.set('inclQz', '0')
  }
  if (config.bgOverride && config.bgOverride !== '') {
    params.set('bgOver', config.bgOverride.replace('#', ''))
  }
  if (config.gifTransparentColor && config.gifTransparentColor !== '') {
    params.set('gifTrans', config.gifTransparentColor.replace('#', ''))
  }
  if (config.svgShapePrecision && config.svgShapePrecision !== 'pixel') {
    params.set('svgPrec', config.svgShapePrecision)
  }
  if (config.svgEmbedRasterOverlay === false) {
    params.set('svgEmbed', '0')
  }
  if (config.formatExtra && config.formatExtra !== 'none') {
    params.set('fmtExtra', config.formatExtra)
  }

  // Auto-render flag
  // Safety
  if (config.safetyMode && config.safetyMode !== 'off') {
    params.set('safeMode', config.safetyMode)
  }
  if (config.safetyMinModulePx !== undefined && config.safetyMinModulePx !== 2) {
    params.set('safeMinPx', config.safetyMinModulePx.toString())
  }
  if (config.safetyMinQuietZone !== undefined && config.safetyMinQuietZone !== 4) {
    params.set('safeMinQz', config.safetyMinQuietZone.toString())
  }
  if (config.lockFinders === false) {
    params.set('lockF', '0')
  }
  if (config.lockTiming === false) {
    params.set('lockT', '0')
  }
  if (config.lockAlign === false) {
    params.set('lockA', '0')
  }
  if (config.lockFormat === false) {
    params.set('lockFmt', '0')
  }
  if (config.lockVersion === false) {
    params.set('lockV', '0')
  }

  // QA
  if (config.qaContrastCheck) {
    params.set('qaContrast', '1')
  }
  if (config.qaSimulateBlur && config.qaSimulateBlur !== 0) {
    params.set('qaBlur', config.qaSimulateBlur.toString())
  }
  if (config.qaSimulateNoise && config.qaSimulateNoise !== 0) {
    params.set('qaNoise', config.qaSimulateNoise.toString())
  }
  if (config.qaSimulateRotation && config.qaSimulateRotation !== 0) {
    params.set('qaRot', config.qaSimulateRotation.toString())
  }
  if (config.qaShowHeatmap) {
    params.set('qaHeatmap', '1')
  }

  // Auto-tuning
  if (config.autoPickVersion === false) {
    params.set('autoVer', '0')
  }
  if (config.autoPickEcc) {
    params.set('autoEcc', '1')
  }
  if (config.autoReduceIntensity) {
    params.set('autoReduce', '1')
  }

  // Watermark
  if (config.watermarkEnabled) {
    params.set('wmEn', '1')
  }
  if (config.watermarkKind && config.watermarkKind !== 'text') {
    params.set('wmKind', config.watermarkKind)
  }
  if (config.watermarkText) {
    params.set('wmText', encodeURIComponent(config.watermarkText))
  }
  if (config.watermarkPosition && config.watermarkPosition !== 'center') {
    params.set('wmPos', config.watermarkPosition)
  }
  if (config.watermarkOpacity !== undefined && config.watermarkOpacity !== 50) {
    params.set('wmOpacity', config.watermarkOpacity.toString())
  }
  if (config.watermarkBlend && config.watermarkBlend !== 'normal') {
    params.set('wmBlend', config.watermarkBlend)
  }

  // Metadata
  if (config.metaTitle) {
    params.set('metaTitle', encodeURIComponent(config.metaTitle))
  }
  if (config.metaAuthor) {
    params.set('metaAuthor', encodeURIComponent(config.metaAuthor))
  }
  if (config.metaCopyright) {
    params.set('metaCopy', encodeURIComponent(config.metaCopyright))
  }
  if (config.metaLicense) {
    params.set('metaLic', encodeURIComponent(config.metaLicense))
  }
  if (config.metaDescription) {
    params.set('metaDesc', encodeURIComponent(config.metaDescription))
  }
  if (config.metaCreationTime) {
    params.set('metaTime', '1')
  }
  if (config.metaCustomKv) {
    params.set('metaKv', encodeURIComponent(config.metaCustomKv))
  }

  return params.toString()
}

/**
 * Update the browser URL without reloading
 */
export function updateBrowserUrl(config: Partial<ShareConfig>): void {
  const params = buildUrlParams(config)
  const newUrl = window.location.pathname + (params ? '?' + params : '')
  window.history.replaceState({}, '', newUrl)
}

/**
 * Get the full shareable URL
 */
export function getShareableUrl(config: Partial<ShareConfig>, baseUrl?: string): string {
  const base = baseUrl || window.location.origin + window.location.pathname
  const params = buildUrlParams(config)
  return params ? `${base}?${params}` : base
}

// ============================================
// EMBED CODE GENERATION
// ============================================

/**
 * Generate HTML embed code for an image
 */
export function generateImageEmbed(
  imageUrl: string,
  alt: string = 'QR Code',
  options: Partial<EmbedOptions> = {}
): string {
  const opts: EmbedOptions = {
    width: options.width ?? 200,
    height: options.height ?? 200,
    responsive: options.responsive ?? false,
    showBorder: options.showBorder ?? false,
    includeLink: options.includeLink ?? false,
  }

  const style = opts.responsive
    ? 'max-width: 100%; height: auto;'
    : `width: ${opts.width}px; height: ${opts.height}px;`
  
  const border = opts.showBorder ? ' border: 1px solid #ccc;' : ''

  const imgTag = `<img src="${imageUrl}" alt="${alt}" style="${style}${border}" />`

  if (opts.includeLink) {
    return `<a href="${imageUrl}" target="_blank">${imgTag}</a>`
  }

  return imgTag
}

/**
 * Generate iframe embed code
 */
export function generateIframeEmbed(
  url: string,
  options: Partial<EmbedOptions> = {}
): string {
  const opts: EmbedOptions = {
    width: options.width ?? 300,
    height: options.height ?? 300,
    responsive: options.responsive ?? false,
    showBorder: options.showBorder ?? false,
    includeLink: options.includeLink ?? false,
  }

  const style = opts.responsive
    ? 'width: 100%; aspect-ratio: 1;'
    : `width: ${opts.width}px; height: ${opts.height}px;`
  
  const border = opts.showBorder ? ' border: 1px solid #ccc;' : ' border: none;'

  return `<iframe src="${url}" style="${style}${border}" loading="lazy" title="QR Code"></iframe>`
}

/**
 * Generate markdown embed
 */
export function generateMarkdownEmbed(
  imageUrl: string,
  alt: string = 'QR Code'
): string {
  return `![${alt}](${imageUrl})`
}

/**
 * Generate BBCode embed
 */
export function generateBBCodeEmbed(
  imageUrl: string,
  linkUrl?: string
): string {
  if (linkUrl) {
    return `[url=${linkUrl}][img]${imageUrl}[/img][/url]`
  }
  return `[img]${imageUrl}[/img]`
}

// ============================================
// SOCIAL SHARING
// ============================================

/**
 * Generate social share URLs
 */
export function getSocialShareUrls(
  url: string,
  title: string = 'Check out this QR code!'
): Record<string, string> {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    
    try {
      document.execCommand('copy')
      return true
    } catch (e) {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * Copy image to clipboard (if supported)
 */
export async function copyImageToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png')
    })

    if (!blob) return false

    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    return true
  } catch (err) {
    return false
  }
}

// ============================================
// DATA URL HELPERS
// ============================================

/**
 * Convert canvas to data URL
 */
export function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.9
): string {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
  return canvas.toDataURL(mimeType, quality)
}

/**
 * Convert canvas to Blob
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  quality: number = 0.9
): Promise<Blob | null> {
  const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
  return new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality))
}

/**
 * Create a download link for a blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ============================================
// QR CODE URL SHORTENING
// ============================================

/**
 * Shorten a URL for smaller QR codes (using common short URL services)
 * Note: This is a client-side helper - actual shortening requires an API
 */
export function estimateQRSize(text: string, ecc: 'L' | 'M' | 'Q' | 'H' = 'Q'): number {
  const capacities: Record<string, number[]> = {
    L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520],
    M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412],
    Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292],
    H: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220],
  }

  const caps = capacities[ecc]
  const len = text.length

  for (let v = 0; v < caps.length; v++) {
    if (caps[v] >= len) {
      return v + 1
    }
  }

  return 40 // Maximum version
}

// ============================================
// EXPORT
// ============================================

export const ShareUtils = {
  // URL params
  parseUrlParams,
  buildUrlParams,
  updateBrowserUrl,
  getShareableUrl,
  
  // Embed codes
  generateImageEmbed,
  generateIframeEmbed,
  generateMarkdownEmbed,
  generateBBCodeEmbed,
  
  // Social
  getSocialShareUrls,
  copyToClipboard,
  copyImageToClipboard,
  
  // Data
  canvasToDataUrl,
  canvasToBlob,
  downloadBlob,
  estimateQRSize,
}

export default ShareUtils
