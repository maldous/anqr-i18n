/**
 * useQRGenerator Hook
 * Wires the QR store state to the QRGenerator module for live rendering
 * Supports animated GIF overlays
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useQRStore } from '@/store/qr-store'
import { showInterstitial, prepareInterstitial, trackGenerationAndShowAd } from '@/modules/admob-service'
import { QRGenerator } from '@/modules/qr-generator'
import { applyWatermark } from '@/modules/watermark'
import { downloadImage, downloadSvg, downloadGif } from '@/modules/exporter'
import { parseAnimatedImage, type AnimationFrame } from '@/modules/animation'
import { applyFilters, type FilterOptions } from '@/modules/image-filters'
import { validateQRCodeRobust, type ValidationResult } from '@/modules/qr-scanner'
import { calculateTemporalOffset, applyTemporalNoiseToCanvas, isTemporalDitherActive, type TemporalDitherMode } from '@/modules/temporal-dither'
import { generatePatternFrames, interpolateFrames, type AnimationPattern } from '@/modules/animation-patterns'

// Singleton QR generator instance
const qrGenerator = new QRGenerator()

interface UseQRGeneratorResult {
  canvasRef: React.RefObject<HTMLCanvasElement>
  canvas: HTMLCanvasElement | null
  isLoading: boolean
  error: string | null
  regenerate: () => void
  download: () => Promise<void>
  // Animation state
  isAnimating: boolean
  currentFrame: number
  totalFrames: number
  // Safety warnings
  safetyWarnings: string[]
  // Validation
  validation: ValidationResult | null
  isValidating: boolean
  // Animation frames for GIF export
  animationFrames: HTMLCanvasElement[]
}

/**
 * Debounce helper
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Load a File as a canvas element
 */
async function loadFileAsCanvas(file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        resolve(canvas)
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

// Expose animation state globally for external tools (e.g., gallery generator)
declare global {
  interface Window {
    __ANQR_STATE__?: {
      isLoading: boolean
      isAnimationReady: boolean
      animationFrameCount: number
      currentFrame: number
      animationFrames: HTMLCanvasElement[]
      animationSpeedMs: number
      frameDelays: number[] // Original frame delays from source GIF in ms
    }
  }
}

export function useQRGenerator(): UseQRGeneratorResult {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [overlayCanvas, setOverlayCanvas] = useState<HTMLCanvasElement | null>(null)
  
  // Animation state
  const [gifFrames, setGifFrames] = useState<AnimationFrame[]>([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const animationDirection = useRef<1 | -1>(1)
  const lastFrameTime = useRef(0)
  const animationRef = useRef<number | null>(null)
  
  // Store raw overlay canvas before preprocessing
  const [rawOverlayCanvas, setRawOverlayCanvas] = useState<HTMLCanvasElement | null>(null)
  
  // Validation state
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  
  // Store generated frames for GIF export and playback cache
  const [animationFrames, setAnimationFrames] = useState<HTMLCanvasElement[]>([])
  const [isAnimationCacheReady, setIsAnimationCacheReady] = useState(false)

  // Get all relevant state from store
  const payload = useQRStore((s) => s.payload)
  const qr = useQRStore((s) => s.qr)
  const render = useQRStore((s) => s.render)
  const overlay = useQRStore((s) => s.overlay)
  const watermark = useQRStore((s) => s.watermark)
  const output = useQRStore((s) => s.output)
  const animation = useQRStore((s) => s.animation)
  const setAnimationPlaying = useQRStore((s) => s.setAnimationPlaying)
  const safety = useQRStore((s) => s.safety)
  const metadata = useQRStore((s) => s.metadata)
  const auto = useQRStore((s) => s.auto)
  const getPayloadText = useQRStore((s) => s.getPayloadText)
  const setOverlayIntensity = useQRStore((s) => s.setOverlayIntensity)

  // Auto-pick ECC based on content length and overlay usage
  const autoPickedEcc = useMemo(() => {
    if (!auto.pickEcc) return qr.ecc
    
    const content = getPayloadText()
    const contentLength = content.length
    
    // If overlay is enabled with high intensity, prefer higher ECC
    if (overlay.enabled && overlay.intensity > 50) {
      return 'H' // Maximum error correction for heavy overlays
    }
    
    if (overlay.enabled && overlay.intensity > 25) {
      return 'Q' // High error correction for moderate overlays
    }
    
    // For longer content, use lower ECC to fit more data
    if (contentLength > 500) {
      return 'L' // Low ECC for very long content
    }
    
    if (contentLength > 200) {
      return 'M' // Medium ECC for long content
    }
    
    // Default to Q for good balance
    return 'Q'
  }, [auto.pickEcc, qr.ecc, overlay.enabled, overlay.intensity, getPayloadText])

  // Apply safety constraints and generate warnings
  const { safetyAdjustedConfig, safetyWarnings } = useMemo(() => {
    const warnings: string[] = []
    let adjustedModulePx = render.modulePx
    let adjustedQuietZone = qr.quietZoneModules
    let adjustedIntensity = overlay.intensity
    const effectiveEcc = auto.pickEcc ? autoPickedEcc : qr.ecc
    
    // Apply safety mode constraints
    if (safety.mode !== 'off') {
      // Enforce minimum module size
      if (render.modulePx < safety.minModulePx) {
        adjustedModulePx = safety.minModulePx
        warnings.push(`Module size increased to ${safety.minModulePx}px for scannability`)
      }
      
      // Enforce minimum quiet zone
      if (qr.quietZoneModules < safety.minQuietZoneModules) {
        adjustedQuietZone = safety.minQuietZoneModules
        warnings.push(`Quiet zone increased to ${safety.minQuietZoneModules} modules`)
      }
      
      // Check overlay intensity against ECC capacity
      const maxIntensityByEcc: Record<string, number> = { L: 30, M: 50, Q: 70, H: 85 }
      const maxSafeIntensity = maxIntensityByEcc[effectiveEcc] || 50
      
      if (safety.mode === 'strict' && overlay.enabled && overlay.intensity > maxSafeIntensity) {
        adjustedIntensity = maxSafeIntensity
        warnings.push(`Overlay intensity reduced to ${maxSafeIntensity}% for ECC level ${effectiveEcc}`)
      } else if (safety.mode === 'balanced' && overlay.enabled && overlay.intensity > maxSafeIntensity) {
        warnings.push(`Overlay intensity (${overlay.intensity}%) may reduce scannability with ECC ${effectiveEcc}`)
      }
      
      // Auto-reduce intensity if enabled
      if (auto.reduceIntensityUntilSafe && overlay.enabled && overlay.intensity > maxSafeIntensity) {
        adjustedIntensity = maxSafeIntensity
        warnings.push(`Auto-reduced overlay intensity to ${maxSafeIntensity}% for safe scanning`)
      }
      
      // Warn about risky style combinations
      if (render.moduleGapPercent > 20) {
        warnings.push('Large module gaps may affect QR readability')
      }
      
      if (render.moduleStyle === 'dots' && render.moduleGapPercent > 10) {
        warnings.push('Dots with large gaps may be hard to scan')
      }
    }
    
    // Show auto-pick ECC info
    if (auto.pickEcc && autoPickedEcc !== qr.ecc) {
      warnings.push(`Auto-selected ECC level ${autoPickedEcc} for optimal balance`)
    }
    
    return {
      safetyAdjustedConfig: {
        modulePx: adjustedModulePx,
        quietZone: adjustedQuietZone,
        intensity: adjustedIntensity,
        ecc: effectiveEcc,
      },
      safetyWarnings: warnings,
    }
  }, [
    safety.mode, safety.minModulePx, safety.minQuietZoneModules,
    render.modulePx, render.moduleGapPercent, render.moduleStyle,
    qr.quietZoneModules, qr.ecc,
    overlay.enabled, overlay.intensity,
    auto.pickEcc, auto.reduceIntensityUntilSafe, autoPickedEcc,
  ])

  // Build comprehensive config object for QRGenerator
  // Note: We depend on `payload` to trigger re-renders when payload changes
  const config = useMemo(() => {
    const content = getPayloadText()
    
    return {
      content,
      // === QR ENCODING OPTIONS ===
      typeNumber: qr.version,
      errorCorrection: safetyAdjustedConfig.ecc,
      encodingMode: qr.encodingMode,

      
      // === RENDER OPTIONS (with safety adjustments) ===
      moduleSize: safetyAdjustedConfig.modulePx,
      margin: safetyAdjustedConfig.quietZone + qr.borderModulesExtra,
      moduleGap: render.moduleGapPercent,
      gapMode: render.gapMode,
      moduleStyle: render.moduleStyle,
      finderStyle: render.finderStyle,
      alignmentStyle: render.alignmentStyle,
      timingStyle: render.timingStyle,
      cornerRadius: render.cornerRadius,
      dotRotationDeg: render.dotRotationDeg,
      eyeOuterStyle: render.eyeOuterStyle,
      eyeInnerStyle: render.eyeInnerStyle,
      eyeScale: render.eyeScale,
      frameStyle: render.frameStyle,
      frameText: render.frameText,
      crispEdges: render.crispEdges,
      pixelSnap: render.pixelSnap,
      
      // Colors
      fgColor: render.fgColor,
      bgColor: render.bgColor,
      transparentBg: render.bgTransparent,
      gradient: render.gradient,
      palette: render.palette,
      perModuleColorMode: render.perModuleColorMode,
      contrastGuard: render.contrastGuard,
      minContrastRatio: render.minContrastRatio,
      
      // === OVERLAY SETTINGS (with safety adjustments) ===
      overlayMode: overlay.enabled ? overlay.mode : undefined,
      overlayIntensity: safetyAdjustedConfig.intensity,
      colorMode: overlay.colorMode,
      invertImage: overlay.invert,
      preserveFinders: overlay.preserveFinders || safety.lockFinders,
      preserveTiming: overlay.preserveTiming || safety.lockTiming,
      preserveAlignment: overlay.preserveAlignment || safety.lockAlign,
      protectFormatInfo: overlay.protectFormatInfo || safety.lockFormat,
      protectVersionInfo: overlay.protectVersionInfo || safety.lockVersion,
      logoSize: 25, // For center mode
      
      // Overlay preprocessing
      overlayBrightness: overlay.brightness,
      overlayContrast: overlay.contrast,
      overlayGamma: overlay.gamma,
      overlaySaturation: overlay.saturation,
      overlayHueRotate: overlay.hueRotateDeg,
      overlayBlur: overlay.blurPx,
      overlaySharpen: overlay.sharpen,
      overlayPosterize: overlay.posterizeLevels,
      overlayThreshold: overlay.threshold,
      overlayEdgeDetect: overlay.edgeDetect,
      overlayRotate: overlay.rotateDeg,
      overlayFlipX: overlay.flipX,
      overlayFlipY: overlay.flipY,
      overlayCrop: overlay.cropEnabled ? overlay.cropRegion : undefined,
      overlayFit: overlay.fit,
      
      // Dither options
      ditherKind: overlay.ditherKind,
      ditherStrength: overlay.ditherStrength,
      ditherSerpentine: overlay.ditherSerpentine,
      diffusionKernel: overlay.diffusionKernel,
      orderedMatrix: overlay.orderedMatrix,
      blueNoiseTileSize: overlay.blueNoiseTileSize,
      blueNoiseSeed: overlay.blueNoiseSeed,
      colorDither: overlay.colorDither,
      
      // Subpixel options
      subpixelGridSize: overlay.subpixelGridSize,
      subpixelCenterRule: overlay.subpixelCenterRule,
      subpixelNeutralColor: overlay.subpixelNeutralColor,
      
      // Halftone options
      halftoneCell: overlay.halftoneCell,
      halftoneDotShape: overlay.halftoneDotShape,
      duotoneColors: overlay.duotoneColors,
      brightnessCurve: overlay.brightnessCurve,
      
      // ECC aware
      eccAwareEnabled: overlay.eccAwareEnabled,
      eccAwareRiskBudget: overlay.eccAwareRiskBudget,
      eccAwareWeightMap: overlay.eccAwareWeightMap,
      
      // === ANIMATION / TEMPORAL DITHERING ===
      temporalDither: animation.temporalDither,
      frameIndex: 0, // Default for static images, will be overridden per-frame for animations
      animationSeed: animation.seed,
      
      // === SAFETY CONSTRAINTS ===
      safetyMode: safety.mode,
      safetyLockFinders: safety.lockFinders,
      safetyLockTiming: safety.lockTiming,
      safetyLockAlign: safety.lockAlign,
      safetyLockFormat: safety.lockFormat,
      safetyLockVersion: safety.lockVersion,
      safetyMinModulePx: safety.minModulePx,
      safetyMinQuietZone: safety.minQuietZoneModules,
    }
  }, [
    payload, // Subscribe to payload changes to trigger re-generation
    getPayloadText,
    safetyAdjustedConfig, // Include safety-adjusted values
    // QR encoding
    qr.version, qr.ecc, qr.encodingMode,

    qr.quietZoneModules, qr.borderModulesExtra,
    // Render
    render.modulePx, render.moduleGapPercent, render.gapMode,
    render.moduleStyle, render.finderStyle, render.alignmentStyle, render.timingStyle,
    render.cornerRadius, render.dotRotationDeg,
    render.eyeOuterStyle, render.eyeInnerStyle, render.eyeScale,
    render.frameStyle, render.frameText,
    render.crispEdges, render.pixelSnap,
    render.fgColor, render.bgColor, render.bgTransparent,
    render.gradient, render.palette, render.perModuleColorMode,
    render.contrastGuard, render.minContrastRatio,
    // Overlay
    overlay.enabled, overlay.mode, overlay.intensity,
    overlay.colorMode, overlay.invert,
    overlay.preserveFinders, overlay.preserveTiming, overlay.preserveAlignment,
    overlay.brightness, overlay.contrast, overlay.gamma, overlay.saturation,
    overlay.hueRotateDeg, overlay.blurPx, overlay.sharpen,
    overlay.posterizeLevels, overlay.threshold, overlay.edgeDetect,
    overlay.rotateDeg, overlay.flipX, overlay.flipY,
    overlay.cropEnabled, overlay.cropRegion, overlay.fit,
    overlay.ditherKind, overlay.ditherStrength, overlay.ditherSerpentine,
    overlay.diffusionKernel, overlay.orderedMatrix,
    overlay.blueNoiseTileSize, overlay.blueNoiseSeed, overlay.colorDither,
    overlay.subpixelGridSize, overlay.subpixelCenterRule, overlay.subpixelNeutralColor,
    overlay.halftoneCell, overlay.halftoneDotShape, overlay.duotoneColors, overlay.brightnessCurve,
    overlay.eccAwareEnabled, overlay.eccAwareRiskBudget, overlay.eccAwareWeightMap,
    // Animation
    animation.temporalDither, animation.seed,
    // Safety
    safety.mode, safety.lockFinders, safety.lockTiming, safety.lockAlign,
    safety.lockFormat, safety.lockVersion, safety.minModulePx, safety.minQuietZoneModules,
  ])

  // Debounce config changes to prevent excessive regeneration
  const debouncedConfig = useDebounce(config, 150)

  // Apply preprocessing filters to a canvas
  const applyPreprocessing = useCallback((sourceCanvas: HTMLCanvasElement): HTMLCanvasElement => {
    // Check if any preprocessing is needed
    const needsProcessing = 
      overlay.brightness !== 0 ||
      overlay.contrast !== 0 ||
      overlay.gamma !== 1 ||
      overlay.saturation !== 0 ||
      overlay.hueRotateDeg !== 0 ||
      overlay.blurPx > 0 ||
      overlay.sharpen > 0 ||
      overlay.posterizeLevels > 0 ||
      overlay.edgeDetect !== 'off' ||
      overlay.invert ||
      overlay.rotateDeg !== 0 ||
      overlay.flipX ||
      overlay.flipY ||
      overlay.colorMode !== 'color' ||
      overlay.cropEnabled ||
      !!overlay.fit ||
      overlay.threshold !== 128

    if (!needsProcessing) {
      return sourceCanvas
    }
    
    // First apply crop if enabled
    let workingCanvas = sourceCanvas
    if (overlay.cropEnabled && overlay.cropRegion) {
      const { x, y, size } = overlay.cropRegion
      const cropCanvas = document.createElement('canvas')
      const cropCtx = cropCanvas.getContext('2d')!
      
      // Calculate crop region in pixels - use the image dimensions
      const srcWidth = sourceCanvas.width
      const srcHeight = sourceCanvas.height
      const cropW = srcWidth * size
      const cropH = srcHeight * size
      const cropX = Math.max(0, (x - size / 2) * srcWidth)
      const cropY = Math.max(0, (y - size / 2) * srcHeight)
      
      // Set output as square based on crop size
      const outputSize = Math.min(cropW, cropH)
      cropCanvas.width = outputSize
      cropCanvas.height = outputSize
      
      cropCtx.drawImage(
        sourceCanvas,
        cropX, cropY, cropW, cropH,
        0, 0, outputSize, outputSize
      )
      workingCanvas = cropCanvas
    }
    
    // Apply fit mode if specified (cover, contain, or stretch)
    if (overlay.fit) {
      const fitCanvas = document.createElement('canvas')
      const fitCtx = fitCanvas.getContext('2d')!
      const srcW = workingCanvas.width
      const srcH = workingCanvas.height
      const targetSize = Math.max(srcW, srcH)
      
      fitCanvas.width = targetSize
      fitCanvas.height = targetSize
      
      let drawX = 0, drawY = 0, drawW = srcW, drawH = srcH
      
      if (overlay.fit === 'cover') {
        // Scale to cover the entire target area (may crop)
        const scale = Math.max(targetSize / srcW, targetSize / srcH)
        drawW = srcW * scale
        drawH = srcH * scale
        drawX = (targetSize - drawW) / 2
        drawY = (targetSize - drawH) / 2
      } else if (overlay.fit === 'contain') {
        // Scale to fit within target area (may have letterbox)
        const scale = Math.min(targetSize / srcW, targetSize / srcH)
        drawW = srcW * scale
        drawH = srcH * scale
        drawX = (targetSize - drawW) / 2
        drawY = (targetSize - drawH) / 2
        // Fill background for letterboxing
        fitCtx.fillStyle = 'transparent'
        fitCtx.fillRect(0, 0, targetSize, targetSize)
      } else if (overlay.fit === 'stretch') {
        // Stretch to fill exactly
        drawW = targetSize
        drawH = targetSize
        drawX = 0
        drawY = 0
      }
      
      fitCtx.drawImage(workingCanvas, drawX, drawY, drawW, drawH)
      workingCanvas = fitCanvas
    }

    // Create a new canvas for the processed image
    const processedCanvas = document.createElement('canvas')
    const ctx = processedCanvas.getContext('2d')!

    // Handle rotation - swap dimensions if needed
    const angle = overlay.rotateDeg * Math.PI / 180
    const isRightAngle = overlay.rotateDeg === 90 || overlay.rotateDeg === 270
    
    if (isRightAngle) {
      processedCanvas.width = workingCanvas.height
      processedCanvas.height = workingCanvas.width
    } else {
      processedCanvas.width = workingCanvas.width
      processedCanvas.height = workingCanvas.height
    }

    // Apply geometric transforms (rotate, flip)
    ctx.save()
    ctx.translate(processedCanvas.width / 2, processedCanvas.height / 2)
    
    if (overlay.rotateDeg !== 0) {
      ctx.rotate(angle)
    }
    
    if (overlay.flipX) {
      ctx.scale(-1, 1)
    }
    if (overlay.flipY) {
      ctx.scale(1, -1)
    }
    
    ctx.drawImage(
      workingCanvas,
      -workingCanvas.width / 2,
      -workingCanvas.height / 2
    )
    ctx.restore()

    // Apply color filters
    const filterOptions: FilterOptions = {
      brightness: overlay.brightness,
      contrast: overlay.contrast,
      gamma: overlay.gamma,
      saturation: overlay.saturation,
      hueRotate: overlay.hueRotateDeg,
      invert: overlay.invert,
      blur: overlay.blurPx,
      sharpen: overlay.sharpen,
      posterize: overlay.posterizeLevels > 0 ? overlay.posterizeLevels : undefined,
      edgeDetect: overlay.edgeDetect,
      colorMode: overlay.colorMode,
    }

    // Get image data, apply filters, put it back
    const imageData = ctx.getImageData(0, 0, processedCanvas.width, processedCanvas.height)
    applyFilters(imageData, filterOptions)
    ctx.putImageData(imageData, 0, 0)

    return processedCanvas
  }, [
    overlay.brightness, overlay.contrast, overlay.gamma, overlay.saturation,
    overlay.hueRotateDeg, overlay.blurPx, overlay.sharpen, overlay.posterizeLevels,
    overlay.edgeDetect, overlay.invert, overlay.rotateDeg, overlay.flipX, overlay.flipY,
    overlay.colorMode, overlay.cropEnabled, overlay.cropRegion, overlay.fit, overlay.threshold
  ])

  // Load overlay image when file changes (store raw canvas)
  // Supports GIF and animated WebP - automatically detects and parses animation frames
  useEffect(() => {
    if (!overlay.file) {
      setRawOverlayCanvas(null)
      setOverlayCanvas(null)
      setGifFrames([])
      setCurrentFrame(0)
      return
    }

    // Check for animated formats (GIF or WebP)
    const isAnimatedFormat = 
      overlay.file.type === 'image/gif' || 
      overlay.file.type === 'image/webp' ||
      overlay.file.name.toLowerCase().endsWith('.gif') ||
      overlay.file.name.toLowerCase().endsWith('.webp')
    
    if (isAnimatedFormat) {
      // Parse as potentially animated image (works for both GIF and WebP)
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer
          // parseAnimatedImage handles both GIF and animated WebP
          const frames = await parseAnimatedImage(arrayBuffer)
          setGifFrames(frames)
          setCurrentFrame(0)
          if (frames.length > 0) {
            setRawOverlayCanvas(frames[0].canvas)
          }
        } catch (err) {
          console.error('Failed to parse animated image:', err)
          // Fall back to static image loading
          loadFileAsCanvas(overlay.file!)
            .then((canvas) => {
              setRawOverlayCanvas(canvas)
              setGifFrames([{ canvas, delay: 100, disposalType: 0 }])
            })
            .catch(() => setRawOverlayCanvas(null))
        }
      }
      reader.readAsArrayBuffer(overlay.file)
    } else {
      // Static image (PNG, JPG, etc.)
      setGifFrames([])
      loadFileAsCanvas(overlay.file)
        .then((canvas) => setRawOverlayCanvas(canvas))
        .catch((err) => {
          console.error('Failed to load overlay:', err)
          setRawOverlayCanvas(null)
        })
    }
  }, [overlay.file])

  // Apply preprocessing when raw canvas or filter settings change
  useEffect(() => {
    if (rawOverlayCanvas) {
      const processed = applyPreprocessing(rawOverlayCanvas)
      setOverlayCanvas(processed)
    } else {
      setOverlayCanvas(null)
    }
  }, [rawOverlayCanvas, applyPreprocessing])

  // Generate QR code
  const generate = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Generate QR code
      let result = await qrGenerator.generate(
        debouncedConfig,
        overlay.enabled ? overlayCanvas : null
      )

      // Apply watermark if enabled
      if (watermark.enabled && result) {
        let watermarkImage: HTMLImageElement | HTMLCanvasElement | null = null

        if (watermark.kind === 'image' && watermark.image) {
          // Load watermark image
          watermarkImage = await loadFileAsCanvas(watermark.image)
        }

        const watermarked = applyWatermark(result, {
          enabled: watermark.enabled,
          kind: watermark.kind,
          text: watermark.text,
          image: watermarkImage,
          position: watermark.position,
          opacity: watermark.opacity,
          blend: watermark.blend,
        })
        
        result = watermarked.canvas
      }

      setCanvas(result)

      // Copy to display canvas if ref exists
      if (canvasRef.current && result) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          canvasRef.current.width = result.width
          canvasRef.current.height = result.height
          ctx.drawImage(result, 0, 0)
        }
      }
      
      // Validate the generated QR code
      if (result && debouncedConfig.content) {
        setIsValidating(true)
        // Use setTimeout to not block the main thread
        setTimeout(() => {
          try {
            const validationResult = validateQRCodeRobust(result, debouncedConfig.content)
            setValidation(validationResult)
          } catch (err) {
            console.error('Validation error:', err)
            setValidation(null)
          } finally {
            setIsValidating(false)
          }
        }, 50)
      }
    } catch (err) {
      console.error('QR generation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate QR code')
    } finally {
      setIsLoading(false)
    }
  }, [debouncedConfig, overlay.enabled, overlayCanvas, watermark.enabled, watermark.kind, watermark.text, watermark.image, watermark.position, watermark.opacity, watermark.blend])

  // Regenerate when config changes
  // Skip if we're playing from cached animation frames
  useEffect(() => {
    // If we have cached animation frames and animation is playing, don't regenerate
    // The cached frames will be displayed by the animation playback effect
    if (isAnimationCacheReady && animationFrames.length > 1 && animation.playing) {
      return
    }
    generate()
  }, [generate, isAnimationCacheReady, animationFrames.length, animation.playing])

  // Calculate effective frames based on startFrame, maxFrames, frameStep
  const effectiveFrames = useMemo(() => {
    if (gifFrames.length === 0) return []
    
    const startIdx = Math.min(animation.startFrame, gifFrames.length - 1)
    const maxCount = animation.maxFrames > 0 ? animation.maxFrames : gifFrames.length
    const step = Math.max(1, animation.frameStep)
    
    const frames: AnimationFrame[] = []
    for (let i = startIdx; i < gifFrames.length && frames.length < maxCount; i += step) {
      frames.push(gifFrames[i])
    }
    
    return frames
  }, [gifFrames, animation.startFrame, animation.maxFrames, animation.frameStep])

  // Expose state to window for external tools (gallery generator)
  useEffect(() => {
    // Get original frame delays from parsed GIF frames
    const frameDelays = effectiveFrames.map(f => f.delay || 100)
    
    window.__ANQR_STATE__ = {
      isLoading,
      isAnimationReady: isAnimationCacheReady && animationFrames.length > 1,
      animationFrameCount: animationFrames.length,
      currentFrame,
      animationFrames,
      animationSpeedMs: animation.speedMs,
      frameDelays, // Original delays from source GIF
    }
  }, [isLoading, isAnimationCacheReady, animationFrames, currentFrame, animation.speedMs, effectiveFrames])

  // Animation loop for GIF overlays
  useEffect(() => {
    // Only animate if we have multiple frames and animation is playing
    if (effectiveFrames.length <= 1 || !animation.playing) {
      setIsAnimating(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    setIsAnimating(true)
    lastFrameTime.current = performance.now()
    // Reset direction when animation settings change
    animationDirection.current = 1

    const tick = (now: number) => {
      const elapsed = now - lastFrameTime.current
      // Use configured speed (frames have their own delays but we use speedMs for consistency)
      const frameDelay = animation.speedMs

      if (elapsed >= frameDelay) {
        lastFrameTime.current = now

        setCurrentFrame((prev) => {
          // Get frame delay from current frame if available
          let next = prev + animationDirection.current

          // Handle bounds based on effective frames
          if (next >= effectiveFrames.length) {
            if (animation.bounce) {
              animationDirection.current = -1
              next = effectiveFrames.length - 2
            } else if (animation.loop) {
              next = 0
            } else {
              next = effectiveFrames.length - 1
            }
          } else if (next < 0) {
            if (animation.bounce) {
              animationDirection.current = 1
              next = 1
            } else if (animation.loop) {
              next = effectiveFrames.length - 1
            } else {
              next = 0
            }
          }

          return Math.max(0, Math.min(effectiveFrames.length - 1, next))
        })
      }

      animationRef.current = requestAnimationFrame(tick)
    }

    animationRef.current = requestAnimationFrame(tick)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [effectiveFrames.length, animation.playing, animation.speedMs, animation.loop, animation.bounce])

  // Update raw overlay canvas when current frame changes (for animation)
  // BUT only if we don't have cached animation frames yet
  useEffect(() => {
    if (effectiveFrames.length > 0 && effectiveFrames[currentFrame]) {
      // If we have cached frames, don't update rawOverlayCanvas - we'll draw from cache instead
      if (!isAnimationCacheReady || animationFrames.length === 0) {
        setRawOverlayCanvas(effectiveFrames[currentFrame].canvas)
      }
    }
  }, [currentFrame, effectiveFrames, isAnimationCacheReady, animationFrames.length])

  // Display cached animation frames during playback (fast path - no re-encoding)
  useEffect(() => {
    if (isAnimationCacheReady && animationFrames.length > 1 && animationFrames[currentFrame]) {
      const cachedFrame = animationFrames[currentFrame]
      
      // Draw directly to display canvas (skip setCanvas during playback to avoid re-renders)
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          canvasRef.current.width = cachedFrame.width
          canvasRef.current.height = cachedFrame.height
          ctx.drawImage(cachedFrame, 0, 0)
        }
      }
    }
  }, [currentFrame, isAnimationCacheReady, animationFrames])

  // Prepare interstitial ad on mount (so it's ready when user downloads)
  useEffect(() => {
    prepareInterstitial('export')
  }, [])

  // Download function with output scaling
  const download = useCallback(async () => {
    if (!canvas) return

    // Scale canvas to output dimensions if different
    let exportCanvas = canvas
    if (output.widthPx !== canvas.width || output.heightPx !== canvas.height) {
      exportCanvas = document.createElement('canvas')
      exportCanvas.width = output.widthPx
      exportCanvas.height = output.heightPx
      const ctx = exportCanvas.getContext('2d')
      if (ctx) {
        // Use high-quality scaling
        ctx.imageSmoothingEnabled = !render.crispEdges
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(canvas, 0, 0, output.widthPx, output.heightPx)
      }
    }

    const exportConfig = {
      outputFormat: output.format,
      outputWidth: output.widthPx,
      outputHeight: output.heightPx,
      outputQuality: output.quality,
      filename: output.filename,
      dpi: output.dpi,
      includeQuietZone: output.includeQuietZone,
      bgOverride: output.bgOverride,
      // GIF options
      gifPaletteSize: output.gifPaletteSize,
      gifQuantizer: output.gifQuantizer,
      gifDither: output.gifDither,
      gifTransparentColor: output.gifTransparentColor,
      // SVG options
      svgTrueVector: output.svgTrueVector,
      svgShapePrecision: output.svgShapePrecision,
      svgEmbedRasterOverlay: output.svgEmbedRasterOverlay,
    }

    try {
      if (output.format === 'svg') {
        await downloadSvg(exportCanvas, exportConfig)
      } else if (output.format === 'gif' && animationFrames.length > 1) {
        // Scale animation frames to output dimensions
        const scaledFrames = animationFrames.map(frame => {
          if (frame.width === output.widthPx && frame.height === output.heightPx) {
            return frame
          }
          const scaledCanvas = document.createElement('canvas')
          scaledCanvas.width = output.widthPx
          scaledCanvas.height = output.heightPx
          const ctx = scaledCanvas.getContext('2d')
          if (ctx) {
            ctx.imageSmoothingEnabled = !render.crispEdges
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(frame, 0, 0, output.widthPx, output.heightPx)
          }
          return scaledCanvas
        })
        // Export animated GIF with all frames
        await downloadGif(scaledFrames, {
          ...exportConfig,
          animationSpeed: animation.speedMs,
          loopAnimation: animation.loop,
        })
      } else if (output.format === 'gif') {
        // Single frame GIF
        await downloadGif([exportCanvas], exportConfig)
      } else {
        await downloadImage(exportCanvas, exportConfig)
      }
    } catch (err) {
      console.error('Download error:', err)
    }

    // Show interstitial ad AFTER download completes (non-blocking)
    showInterstitial('export')
  }, [canvas, output, render.crispEdges, animationFrames, animation.speedMs, animation.loop])

  // Generate all animation frames for GIF export and playback cache
  // This runs once when config changes, then frames are cached for fast playback
  useEffect(() => {
    // Track if this effect is still current (for cleanup/cancellation)
    let isCancelled = false
    
    // Check if we should generate pattern-based animation from static image
    const shouldGeneratePatternAnimation = 
      animation.pattern !== 'none' && 
      overlay.enabled && 
      effectiveFrames.length === 1
    
    if (effectiveFrames.length <= 1 && !shouldGeneratePatternAnimation && !overlay.enabled) {
      setAnimationFrames([])
      setIsAnimationCacheReady(false)
      return
    }

    // Mark cache as not ready while generating
    setIsAnimationCacheReady(false)
    setIsLoading(true)

    // Generate QR for each frame (batch generation)
    const generateAllFrames = async () => {
      let frames: HTMLCanvasElement[] = []
      
      // Load watermark image once if needed
      let watermarkImage: HTMLImageElement | HTMLCanvasElement | null = null
      if (watermark.enabled && watermark.kind === 'image' && watermark.image) {
        try {
          watermarkImage = await loadFileAsCanvas(watermark.image)
        } catch (err) {
          console.error('Error loading watermark:', err)
        }
      }
      
      // Calculate temporal dither mode
      const temporalMode = animation.temporalDither as TemporalDitherMode
      const useTemporalDither = isTemporalDitherActive(temporalMode)
      
      // Determine frames to process
      let framesToProcess = effectiveFrames
      
      // Generate pattern animation frames if applicable
      if (shouldGeneratePatternAnimation && effectiveFrames.length === 1) {
        // Generate 24 frames of pattern animation from single frame
        const patternFrameCount = 24
        const baseCanvas = applyPreprocessing(effectiveFrames[0].canvas)
        const patternFrames = generatePatternFrames(
          baseCanvas,
          animation.pattern as AnimationPattern,
          patternFrameCount,
          animation.seed
        )
        // Convert to AnimationFrame format
        framesToProcess = patternFrames.map(canvas => ({
          canvas,
          delay: animation.speedMs,
          disposalType: 0
        }))
      }
      
      for (let frameIdx = 0; frameIdx < framesToProcess.length; frameIdx++) {
        const frame = framesToProcess[frameIdx]
        // Check if cancelled before each expensive operation
        if (isCancelled) return
        
        try {
          let processedOverlay = shouldGeneratePatternAnimation 
            ? frame.canvas // Already processed for pattern animation
            : applyPreprocessing(frame.canvas)
          
          // Apply temporal dithering offset to the overlay image
          // This varies the input slightly per frame for smoother perceived quality
          if (useTemporalDither) {
            const temporalOffset = calculateTemporalOffset(frameIdx, temporalMode, animation.seed)
            processedOverlay = applyTemporalNoiseToCanvas(processedOverlay, temporalOffset, 0.015)
          }
          
          // Pass frame index for temporal dithering (also used in qr-generator for dither pattern offset)
          const frameConfig = { 
            ...debouncedConfig, 
            frameIndex: frameIdx,
            temporalOffset: useTemporalDither ? calculateTemporalOffset(frameIdx, temporalMode, animation.seed) : 0
          }
          const result = await qrGenerator.generate(frameConfig, processedOverlay)
          
          if (isCancelled) return
          
          if (result) {
            // Apply watermark if enabled
            if (watermark.enabled) {
              const watermarked = applyWatermark(result, {
                enabled: watermark.enabled,
                kind: watermark.kind,
                text: watermark.text,
                image: watermarkImage,
                position: watermark.position,
                opacity: watermark.opacity,
                blend: watermark.blend,
              })
              frames.push(watermarked.canvas)
            } else {
              frames.push(result)
            }
          }
        } catch (err) {
          console.error('Error generating frame:', err)
        }
      }
      
      // Apply interpolation if enabled
      if (animation.interpolate !== 'none' && frames.length > 1) {
        frames = interpolateFrames(frames, animation.interpolate, 2)
      }
      
      // Only update state if not cancelled
      if (isCancelled) return
      
      setAnimationFrames(frames)
      setIsAnimationCacheReady(true)
      setIsLoading(false)
      
      // Set the first frame as current canvas
      if (frames.length > 0) {
        setCanvas(frames[0])
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          if (ctx) {
            canvasRef.current.width = frames[0].width
            canvasRef.current.height = frames[0].height
            ctx.drawImage(frames[0], 0, 0)
          }
        }
      }
    }

    generateAllFrames()
    
    // Cleanup: cancel in-flight generation if deps change
    return () => {
      isCancelled = true
    }
  }, [effectiveFrames, overlay.enabled, debouncedConfig, applyPreprocessing, watermark, animation.temporalDither, animation.seed, animation.pattern, animation.interpolate, animation.speedMs])

  return {
    canvasRef,
    canvas,
    isLoading,
    error,
    regenerate: generate,
    download,
    // Animation state
    isAnimating,
    currentFrame,
    totalFrames: effectiveFrames.length,
    // Safety warnings
    safetyWarnings,
    // Validation
    validation,
    isValidating,
    // Animation frames for GIF export
    animationFrames,
  }
}

export default useQRGenerator
