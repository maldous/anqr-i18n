/**
 * useQRGenerator Hook
 * Wires the QR store state to the QRGenerator module for live rendering
 * Supports animated GIF overlays
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useQRStore } from '@/store/qr-store'
import { QRGenerator } from '@/modules/qr-generator'
import { applyWatermark } from '@/modules/watermark'
import { downloadImage, downloadSvg, downloadGif } from '@/modules/exporter'
import { parseGifFrames, type AnimationFrame } from '@/modules/animation'
import { applyFilters, type FilterOptions } from '@/modules/image-filters'
import { validateQRCodeRobust, type ValidationResult } from '@/modules/qr-scanner'

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
  
  // Store generated frames for GIF export
  const [animationFrames, setAnimationFrames] = useState<HTMLCanvasElement[]>([])

  // Get all relevant state from store
  const payload = useQRStore((s) => s.payload)
  const qr = useQRStore((s) => s.qr)
  const render = useQRStore((s) => s.render)
  const overlay = useQRStore((s) => s.overlay)
  const watermark = useQRStore((s) => s.watermark)
  const output = useQRStore((s) => s.output)
  const animation = useQRStore((s) => s.animation)
  const safety = useQRStore((s) => s.safety)
  const getPayloadText = useQRStore((s) => s.getPayloadText)

  // Apply safety constraints and generate warnings
  const { safetyAdjustedConfig, safetyWarnings } = useMemo(() => {
    const warnings: string[] = []
    let adjustedModulePx = render.modulePx
    let adjustedQuietZone = qr.quietZoneModules
    let adjustedIntensity = overlay.intensity
    
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
      const maxSafeIntensity = maxIntensityByEcc[qr.ecc] || 50
      
      if (safety.mode === 'strict' && overlay.enabled && overlay.intensity > maxSafeIntensity) {
        adjustedIntensity = maxSafeIntensity
        warnings.push(`Overlay intensity reduced to ${maxSafeIntensity}% for ECC level ${qr.ecc}`)
      } else if (safety.mode === 'balanced' && overlay.enabled && overlay.intensity > maxSafeIntensity) {
        warnings.push(`Overlay intensity (${overlay.intensity}%) may reduce scannability with ECC ${qr.ecc}`)
      }
      
      // Warn about risky style combinations
      if (render.moduleGapPercent > 20) {
        warnings.push('Large module gaps may affect QR readability')
      }
      
      if (render.moduleStyle === 'dots' && render.moduleGapPercent > 10) {
        warnings.push('Dots with large gaps may be hard to scan')
      }
    }
    
    return {
      safetyAdjustedConfig: {
        modulePx: adjustedModulePx,
        quietZone: adjustedQuietZone,
        intensity: adjustedIntensity,
      },
      safetyWarnings: warnings,
    }
  }, [
    safety.mode, safety.minModulePx, safety.minQuietZoneModules,
    render.modulePx, render.moduleGapPercent, render.moduleStyle,
    qr.quietZoneModules, qr.ecc,
    overlay.enabled, overlay.intensity,
  ])

  // Build comprehensive config object for QRGenerator
  // Note: We depend on `payload` to trigger re-renders when payload changes
  const config = useMemo(() => {
    const content = getPayloadText()
    
    return {
      content,
      // === QR ENCODING OPTIONS ===
      typeNumber: qr.version,
      errorCorrection: qr.ecc,
      mask: qr.mask,
      encodingMode: qr.encodingMode,
      eci: qr.eci,
      segmentOptimize: qr.segmentOptimize,
      structuredAppend: qr.structuredAppend,
      fnc1: qr.fnc1,
      model: qr.model,
      microQr: qr.microQr,
      rmQr: qr.rmQr,
      
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
      preserveFinders: overlay.preserveFinders,
      preserveTiming: overlay.preserveTiming,
      preserveAlignment: overlay.preserveAlignment,
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
    qr.version, qr.ecc, qr.mask, qr.encodingMode, qr.eci, qr.segmentOptimize,
    qr.structuredAppend, qr.fnc1, qr.model, qr.microQr, qr.rmQr,
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
      overlay.colorMode !== 'color'

    if (!needsProcessing) {
      return sourceCanvas
    }

    // Create a new canvas for the processed image
    const processedCanvas = document.createElement('canvas')
    const ctx = processedCanvas.getContext('2d')!

    // Handle rotation - swap dimensions if needed
    const angle = overlay.rotateDeg * Math.PI / 180
    const isRightAngle = overlay.rotateDeg === 90 || overlay.rotateDeg === 270
    
    if (isRightAngle) {
      processedCanvas.width = sourceCanvas.height
      processedCanvas.height = sourceCanvas.width
    } else {
      processedCanvas.width = sourceCanvas.width
      processedCanvas.height = sourceCanvas.height
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
      sourceCanvas,
      -sourceCanvas.width / 2,
      -sourceCanvas.height / 2
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
    overlay.colorMode
  ])

  // Load overlay image when file changes (store raw canvas)
  // For GIFs, parse frames; for static images, load as single canvas
  useEffect(() => {
    if (!overlay.file) {
      setRawOverlayCanvas(null)
      setOverlayCanvas(null)
      setGifFrames([])
      setCurrentFrame(0)
      return
    }

    const isGif = overlay.file.type === 'image/gif' || overlay.file.name.toLowerCase().endsWith('.gif')
    
    if (isGif) {
      // Parse GIF frames
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer
          const frames = await parseGifFrames(arrayBuffer)
          setGifFrames(frames)
          setCurrentFrame(0)
          if (frames.length > 0) {
            setRawOverlayCanvas(frames[0].canvas)
          }
        } catch (err) {
          console.error('Failed to parse GIF:', err)
          // Fall back to static image loading
          loadFileAsCanvas(overlay.file!)
            .then((canvas) => setRawOverlayCanvas(canvas))
            .catch(() => setRawOverlayCanvas(null))
        }
      }
      reader.readAsArrayBuffer(overlay.file)
    } else {
      // Static image
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
  useEffect(() => {
    generate()
  }, [generate])

  // Animation loop for GIF overlays
  useEffect(() => {
    // Only animate if we have multiple frames and animation is playing
    if (gifFrames.length <= 1 || !animation.playing) {
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

          // Handle bounds
          if (next >= gifFrames.length) {
            if (animation.bounce) {
              animationDirection.current = -1
              next = gifFrames.length - 2
            } else if (animation.loop) {
              next = 0
            } else {
              next = gifFrames.length - 1
            }
          } else if (next < 0) {
            if (animation.bounce) {
              animationDirection.current = 1
              next = 1
            } else if (animation.loop) {
              next = gifFrames.length - 1
            } else {
              next = 0
            }
          }

          return Math.max(0, Math.min(gifFrames.length - 1, next))
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
  }, [gifFrames.length, animation.playing, animation.speedMs, animation.loop, animation.bounce])

  // Update raw overlay canvas when current frame changes (for animation)
  useEffect(() => {
    if (gifFrames.length > 0 && gifFrames[currentFrame]) {
      setRawOverlayCanvas(gifFrames[currentFrame].canvas)
    }
  }, [currentFrame, gifFrames])

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
  }, [canvas, output, render.crispEdges, animationFrames, animation.speedMs, animation.loop])

  // Generate all animation frames for GIF export when we have a GIF overlay
  useEffect(() => {
    if (gifFrames.length <= 1 || !overlay.enabled) {
      setAnimationFrames(canvas ? [canvas] : [])
      return
    }
    // Note: canvas is intentionally not in deps - we only want to regenerate frames when gifFrames changes

    // Generate QR for each frame
    const generateAllFrames = async () => {
      const frames: HTMLCanvasElement[] = []
      
      for (const frame of gifFrames) {
        try {
          const processedOverlay = applyPreprocessing(frame.canvas)
          const result = await qrGenerator.generate(debouncedConfig, processedOverlay)
          
          if (result) {
            // Apply watermark if enabled
            if (watermark.enabled) {
              let watermarkImage: HTMLImageElement | HTMLCanvasElement | null = null
              if (watermark.kind === 'image' && watermark.image) {
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
              frames.push(watermarked.canvas)
            } else {
              frames.push(result)
            }
          }
        } catch (err) {
          console.error('Error generating frame:', err)
        }
      }
      
      setAnimationFrames(frames)
    }

    generateAllFrames()
  }, [gifFrames, overlay.enabled, debouncedConfig, applyPreprocessing, watermark])

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
    totalFrames: gifFrames.length,
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
