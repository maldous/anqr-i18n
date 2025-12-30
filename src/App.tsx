import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/Sidebar'
import { Preview } from '@/components/Preview'
import { Header } from '@/components/Header'
import { Gallery } from '@/components/Gallery'
import { StaticPage, type StaticPageType } from '@/components/StaticPage'
import { useState, useEffect, useCallback } from 'react'
import { Capacitor } from '@capacitor/core'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { BusyOverlay } from '@/components/BusyOverlay'
import { useQRStore, type Tier } from '@/store/qr-store'
import { useBannerHeight } from '@/hooks/useBannerHeight'
import { parseUrlParams } from '@/modules/share-utils'
import type { GalleryCategory } from '@/data/gallery-items'
import i18n, { isRtlLanguage } from '@/i18n'
import { useTranslation } from 'react-i18next'

type PageView = 'editor' | 'gallery' | StaticPageType

function getPageFromLocation(): PageView {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const hash = window.location.hash.replace(/^#/, '')

  // Prefer clean paths when present.
  if (path === '/gallery') return 'gallery'
  if (path === '/about') return 'about'
  if (path === '/privacy') return 'privacy'
  if (path === '/terms') return 'terms'
  if (path === '/contact') return 'contact'
  if (path === '/docs') return 'docs'

  // Backward-compatible hash routes.
  if (hash === 'gallery') return 'gallery'
  if (hash === 'about' || hash === 'privacy' || hash === 'terms' || hash === 'contact' || hash === 'docs') return hash as StaticPageType

  return 'editor'
}

function App() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState<PageView>('editor')
  const [galleryFilter, setGalleryFilter] = useState<GalleryCategory | 'all'>('all')
  const bannerHeight = useBannerHeight()
  const { download, isExporting } = useQRGenerator()
  const { setOverlayUrl, setOverlayFile, setOverlayEnabled, setOverlayMode, setOverlayIntensity,
          setPayloadText, setPayloadKind, setPayloadUrl, setTier, setQrEcc, setQrVersion, setRenderModulePx, setQrQuietZone,
          setRenderFgColor, setRenderBgColor, setRenderBgTransparent, setRenderModuleStyle, setRenderFinderStyle,
          setOverlayColorMode, setOverlayBrightness, setOverlayContrast, setOverlayGamma,
          setOverlayInvert, setOverlayDitherKind, setOverlayDiffusionKernel, setOverlayDitherStrength,
          setOverlaySaturation, setOverlayHueRotate, setOverlayBlur, setOverlaySharpen,
          setOverlayPosterize, setOverlayThreshold, setOverlayEdgeDetect,
          setAnimationSpeedMs, setAnimationLoop, setAnimationBounce,
          setQrEncodingMode, setRenderModuleGap, setRenderGapMode, setRenderCornerRadius,
          setRenderFrameStyle, setRenderFrameText, setRenderGradient, setRenderAlignmentStyle, setRenderTimingStyle,
          setOverlayFit, setOverlayRotate, setOverlayFlip, setOverlayPreserveFinders, setOverlayPreserveTiming, setOverlayPreserveAlignment,
          setAnimationStartFrame, setAnimationMaxFrames, setAnimationFrameStep,
          setOutputFormat, setOutputWidth, setOutputHeight, setOutputQuality, setOutputFilename,
          setOutputGifPaletteSize, setOutputGifQuantizer, setOutputSvgTrueVector } = useQRStore()

  const navigateTo = useCallback((page: PageView) => {
    const nextPath = page === 'editor' ? '/' : `/${page}`
    const nextSearch = page === 'editor' ? window.location.search : ''

    // Avoid unnecessary history entries.
    const current = window.location.pathname.replace(/\/+$/, '') || '/'
    if (current === nextPath && window.location.search === nextSearch) {
      setCurrentPage(page)
      return
    }

    window.history.pushState({}, '', `${nextPath}${nextSearch}`)
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Handle location changes for routing (paths + legacy hash)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPage(getPageFromLocation())
    }

    handleLocationChange()

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])
  
  // Convenience booleans for view states
  const showGallery = currentPage === 'gallery'
  const showStaticPage = ['about', 'privacy', 'terms', 'contact', 'docs'].includes(currentPage)
  const showEditor = currentPage === 'editor'

  // Update document title and RTL direction when language changes
  useEffect(() => {
    if (showEditor) {
      document.title = `${t('app.name')} - ${t('app.tagline')}`
    }
    
    // Apply RTL direction based on current language
    const isRtl = isRtlLanguage(i18n.language)
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language.split('-')[0]
  }, [showEditor, i18n.language])

  // Load settings from URL parameters on mount (editor share links)
  useEffect(() => {
    if (getPageFromLocation() !== 'editor') return
    const params = parseUrlParams()
    
    // Apply language from URL params if present
    if (params.lang) {
      i18n.changeLanguage(params.lang)
    }
    
    // Determine required tier based on params used
    let requiredTier: Tier = 'basic'
    
    // Check for advanced features
    if (params.mode || params.overlayUrl || params.intensity !== undefined) {
      requiredTier = 'advanced'
    }
    if (params.style && params.style !== 'square') {
      requiredTier = 'advanced'
    }
    if (params.finder && params.finder !== 'square') {
      requiredTier = 'advanced'
    }
    if (params.fg && params.fg !== '#000000') {
      requiredTier = 'advanced'
    }
    if (params.bg && params.bg !== '#ffffff') {
      requiredTier = 'advanced'
    }
    
    // Set the tier first so UI shows correct options
    if (requiredTier !== 'basic') {
      setTier(requiredTier)
    }
    
    // Apply URL parameters to store
    if (params.data) {
      const data = params.data
      
      // Detect payload type from data and set appropriate kind
      if (data.startsWith('mailto:')) {
        setPayloadKind('email')
        setPayloadText(data)
      } else if (data.startsWith('tel:')) {
        setPayloadKind('tel')
        setPayloadText(data)
      } else if (data.startsWith('sms:')) {
        setPayloadKind('sms')
        setPayloadText(data)
      } else if (data.startsWith('geo:')) {
        setPayloadKind('geo')
        setPayloadText(data)
      } else if (data.startsWith('WIFI:')) {
        setPayloadKind('wifi')
        setPayloadText(data)
      } else if (data.startsWith('BEGIN:VCARD')) {
        setPayloadKind('vcard')
        setPayloadText(data)
      } else if (data.startsWith('BEGIN:VEVENT')) {
        setPayloadKind('event')
        setPayloadText(data)
      } else if (data.startsWith('MECARD:')) {
        setPayloadKind('mecard')
        setPayloadText(data)
      } else if (data.startsWith('http://') || data.startsWith('https://')) {
        setPayloadKind('url')
        setPayloadUrl({ href: data })
        setPayloadText(data)
      } else {
        // Plain text or custom format
        setPayloadKind('plain_text')
        setPayloadText(data)
      }
    }
    
    if (params.ec) setQrEcc(params.ec as 'L' | 'M' | 'Q' | 'H')
    if (params.version) setQrVersion(params.version)
    if (params.size) setRenderModulePx(params.size)
    if (params.margin !== undefined) setQrQuietZone(params.margin)
    if (params.fg) setRenderFgColor(params.fg)
    if (params.bg) setRenderBgColor(params.bg)
    if (params.transparent) setRenderBgTransparent(true)
    if (params.style) setRenderModuleStyle(params.style as 'square' | 'rounded' | 'dots' | 'diamond' | 'connected')
    if (params.finder) setRenderFinderStyle(params.finder as 'square' | 'rounded' | 'circle')
    if (params.alignmentStyle) setRenderAlignmentStyle(params.alignmentStyle as 'match_finder' | 'square' | 'rounded' | 'circle')
    if (params.timingStyle) setRenderTimingStyle(params.timingStyle as 'match_module' | 'solid' | 'dashed')
    // Render settings
    if (params.moduleGap !== undefined) setRenderModuleGap(params.moduleGap)
    if (params.gapMode) setRenderGapMode(params.gapMode as 'none' | 'inset' | 'stroke' | 'negative_space')
    if (params.cornerRadius !== undefined) setRenderCornerRadius(params.cornerRadius)
    if (params.gradientType) setRenderGradient({ type: params.gradientType as 'none' | 'linear' | 'radial' | 'conic' })
    if (params.eyeOuterStyle) useQRStore.setState((s) => ({ render: { ...s.render, eyeOuterStyle: params.eyeOuterStyle as 'square' | 'rounded' | 'circle' } }))
    if (params.eyeInnerStyle) useQRStore.setState((s) => ({ render: { ...s.render, eyeInnerStyle: params.eyeInnerStyle as 'square' | 'rounded' | 'circle' } }))
    if (params.eyeScale !== undefined) useQRStore.setState((s) => ({ render: { ...s.render, eyeScale: params.eyeScale } }))
    if (params.frameStyle) setRenderFrameStyle(params.frameStyle as 'none' | 'rounded_frame' | 'sticker' | 'tag')
    if (params.frameText) setRenderFrameText(params.frameText)
    if (params.dotRotation !== undefined) useQRStore.setState((s) => ({ render: { ...s.render, dotRotationDeg: params.dotRotation } }))
    if (params.crispEdges === false) useQRStore.setState((s) => ({ render: { ...s.render, crispEdges: false } }))
    if (params.pixelSnap) useQRStore.setState((s) => ({ render: { ...s.render, pixelSnap: params.pixelSnap as 'floor' | 'round' | 'ceil' } }))
    if (params.perModuleColorMode) useQRStore.setState((s) => ({ render: { ...s.render, perModuleColorMode: params.perModuleColorMode as 'solid' | 'by_brightness' | 'by_position' | 'by_overlay' | 'by_cluster' } }))
    if (params.contrastGuard) useQRStore.setState((s) => ({ render: { ...s.render, contrastGuard: true } }))
    if (params.minContrastRatio !== undefined) useQRStore.setState((s) => ({ render: { ...s.render, minContrastRatio: params.minContrastRatio } }))
    // Overlay
    if (params.mode) setOverlayMode(params.mode as any)
    if (params.intensity !== undefined) setOverlayIntensity(params.intensity)
    if (params.fit) setOverlayFit(params.fit as 'cover' | 'contain' | 'stretch')
    if (params.rotate !== undefined) setOverlayRotate(params.rotate)
    if (params.flipX) setOverlayFlip({ x: true })
    if (params.flipY) setOverlayFlip({ y: true })
    if (params.preserveFinders === false) setOverlayPreserveFinders(false)
    if (params.preserveTiming) setOverlayPreserveTiming(true)
    if (params.preserveAlignment) setOverlayPreserveAlignment(true)
    if (params.protectFormatInfo) useQRStore.setState((s) => ({ overlay: { ...s.overlay, protectFormatInfo: true } }))
    if (params.protectVersionInfo) useQRStore.setState((s) => ({ overlay: { ...s.overlay, protectVersionInfo: true } }))
    if (params.eccAwareEnabled) useQRStore.setState((s) => ({ overlay: { ...s.overlay, eccAwareEnabled: true } }))
    if (params.eccAwareRiskBudget !== undefined) useQRStore.setState((s) => ({ overlay: { ...s.overlay, eccAwareRiskBudget: params.eccAwareRiskBudget } }))
    if (params.eccAwareWeightMap) useQRStore.setState((s) => ({ overlay: { ...s.overlay, eccAwareWeightMap: params.eccAwareWeightMap as any } }))
    
    // Apply preprocessing params
    if (params.colorMode) setOverlayColorMode(params.colorMode as 'color' | 'grayscale' | 'bw')
    if (params.brightness !== undefined) setOverlayBrightness(params.brightness)
    if (params.contrast !== undefined) setOverlayContrast(params.contrast)
    if (params.gamma !== undefined) setOverlayGamma(params.gamma)
    if (params.saturation !== undefined) setOverlaySaturation(params.saturation)
    if (params.hue !== undefined) setOverlayHueRotate(params.hue)
    if (params.blur !== undefined) setOverlayBlur(params.blur)
    if (params.sharpen !== undefined) setOverlaySharpen(params.sharpen)
    if (params.posterize !== undefined) setOverlayPosterize(params.posterize)
    if (params.threshold !== undefined) setOverlayThreshold(params.threshold)
    if (params.edge) setOverlayEdgeDetect(params.edge as 'off' | 'sobel' | 'canny')
    if (params.invert) setOverlayInvert(params.invert)
    
    // Apply dithering params
    if (params.ditherKind) setOverlayDitherKind(params.ditherKind as any)
    if (params.diffusionKernel) setOverlayDiffusionKernel(params.diffusionKernel as any)
    if (params.ditherStrength !== undefined) setOverlayDitherStrength(params.ditherStrength)
    if (params.ditherSerpentine) useQRStore.setState((s) => ({ overlay: { ...s.overlay, ditherSerpentine: true } }))
    if (params.orderedMatrix) useQRStore.setState((s) => ({ overlay: { ...s.overlay, orderedMatrix: params.orderedMatrix as any } }))
    if (params.blueNoiseTileSize !== undefined) useQRStore.setState((s) => ({ overlay: { ...s.overlay, blueNoiseTileSize: params.blueNoiseTileSize } }))
    if (params.blueNoiseSeed !== undefined) useQRStore.setState((s) => ({ overlay: { ...s.overlay, blueNoiseSeed: params.blueNoiseSeed } }))
    if (params.colorDither) useQRStore.setState((s) => ({ overlay: { ...s.overlay, colorDither: params.colorDither as any } }))
    
    // Subpixel params
    if (params.subpixelGridSize) useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelGridSize: params.subpixelGridSize as any } }))
    if (params.subpixelCenterRule) useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelCenterRule: params.subpixelCenterRule as any } }))
    if (params.subpixelNeutralColor) useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelNeutralColor: params.subpixelNeutralColor } }))
    if (params.subpixelFinderOverride) useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelFinderOverride: params.subpixelFinderOverride as any } }))
    
    // Halftone params
    if (params.halftoneCell) useQRStore.setState((s) => ({ overlay: { ...s.overlay, halftoneCell: params.halftoneCell as any } }))
    if (params.halftoneDotShape) useQRStore.setState((s) => ({ overlay: { ...s.overlay, halftoneDotShape: params.halftoneDotShape as any } }))
    if (params.brightnessCurve) useQRStore.setState((s) => ({ overlay: { ...s.overlay, brightnessCurve: params.brightnessCurve as any } }))
    if (params.duotoneColor1) useQRStore.setState((s) => ({ overlay: { ...s.overlay, duotoneColors: [params.duotoneColor1!, s.overlay.duotoneColors[1]] } }))
    if (params.duotoneColor2) useQRStore.setState((s) => ({ overlay: { ...s.overlay, duotoneColors: [s.overlay.duotoneColors[0], params.duotoneColor2!] } }))
    
    // Animation params
    if (params.speed !== undefined) setAnimationSpeedMs(params.speed)
    if (params.loop === false) setAnimationLoop(false)
    if (params.reverse) setAnimationBounce(true)
    if (params.startFrame !== undefined) setAnimationStartFrame(params.startFrame)
    if (params.maxFrames !== undefined) setAnimationMaxFrames(params.maxFrames)
    if (params.frameStep !== undefined) setAnimationFrameStep(params.frameStep)
    if (params.interpolate) useQRStore.setState((s) => ({ animation: { ...s.animation, interpolate: params.interpolate as any } }))
    if (params.temporalDither) useQRStore.setState((s) => ({ animation: { ...s.animation, temporalDither: params.temporalDither as any } }))
    if (params.pattern) useQRStore.setState((s) => ({ animation: { ...s.animation, pattern: params.pattern as any } }))
    if (params.moduleJitter !== undefined) useQRStore.setState((s) => ({ animation: { ...s.animation, moduleJitterPx: params.moduleJitter } }))
    if (params.colorCycle) useQRStore.setState((s) => ({ animation: { ...s.animation, colorCycle: true } }))
    if (params.seed !== undefined) useQRStore.setState((s) => ({ animation: { ...s.animation, seed: params.seed } }))
    
    // Output params
    if (params.format) setOutputFormat(params.format as 'png' | 'webp' | 'gif' | 'svg')
    if (params.width !== undefined) setOutputWidth(params.width)
    if (params.height !== undefined) setOutputHeight(params.height)
    if (params.quality !== undefined) setOutputQuality(params.quality)
    if (params.filename) setOutputFilename(params.filename)
    if (params.gifPaletteSize !== undefined) setOutputGifPaletteSize(params.gifPaletteSize)
    if (params.gifQuantizer) setOutputGifQuantizer(params.gifQuantizer as 'median_cut' | 'neuquant' | 'octree')
    if (params.gifDither) useQRStore.setState((s) => ({ output: { ...s.output, gifDither: params.gifDither as any } }))
    if (params.svgTrueVector) setOutputSvgTrueVector(true)
    if (params.dpi !== undefined) useQRStore.setState((s) => ({ output: { ...s.output, dpi: params.dpi } }))
    if (params.includeQuietZone === false) useQRStore.setState((s) => ({ output: { ...s.output, includeQuietZone: false } }))
    if (params.bgOverride) useQRStore.setState((s) => ({ output: { ...s.output, bgOverride: params.bgOverride } }))
    if (params.gifTransparentColor) useQRStore.setState((s) => ({ output: { ...s.output, gifTransparentColor: params.gifTransparentColor } }))
    if (params.svgShapePrecision) useQRStore.setState((s) => ({ output: { ...s.output, svgShapePrecision: params.svgShapePrecision as any } }))
    if (params.svgEmbedRasterOverlay === false) useQRStore.setState((s) => ({ output: { ...s.output, svgEmbedRasterOverlay: false } }))
    if (params.formatExtra) useQRStore.setState((s) => ({ output: { ...s.output, formatExtra: params.formatExtra as any } }))
    
    // QR encoding params
    if (params.encodingMode) setQrEncodingMode(params.encodingMode as 'auto' | 'numeric' | 'alphanumeric' | 'byte' | 'kanji')
    if (params.borderModulesExtra !== undefined) useQRStore.setState((s) => ({ qr: { ...s.qr, borderModulesExtra: params.borderModulesExtra } }))
    if (params.quietZoneMinEnforce === false) useQRStore.setState((s) => ({ qr: { ...s.qr, quietZoneMinEnforce: false } }))
    
    // Load overlay from URL if provided
    if (params.overlayUrl) {
      loadOverlayFromUrl(params.overlayUrl)
    }
    
    // Safety params
    if (params.safetyMode) useQRStore.setState((s) => ({ safety: { ...s.safety, mode: params.safetyMode as any } }))
    if (params.safetyMinModulePx !== undefined) useQRStore.setState((s) => ({ safety: { ...s.safety, minModulePx: params.safetyMinModulePx } }))
    if (params.safetyMinQuietZone !== undefined) useQRStore.setState((s) => ({ safety: { ...s.safety, minQuietZoneModules: params.safetyMinQuietZone } }))
    if (params.lockFinders === false) useQRStore.setState((s) => ({ safety: { ...s.safety, lockFinders: false } }))
    if (params.lockTiming === false) useQRStore.setState((s) => ({ safety: { ...s.safety, lockTiming: false } }))
    if (params.lockAlign === false) useQRStore.setState((s) => ({ safety: { ...s.safety, lockAlign: false } }))
    if (params.lockFormat === false) useQRStore.setState((s) => ({ safety: { ...s.safety, lockFormat: false } }))
    if (params.lockVersion === false) useQRStore.setState((s) => ({ safety: { ...s.safety, lockVersion: false } }))
    
    // QA params
    if (params.qaContrastCheck) useQRStore.setState((s) => ({ qa: { ...s.qa, contrastCheck: true } }))
    if (params.qaSimulateBlur !== undefined) useQRStore.setState((s) => ({ qa: { ...s.qa, simulateBlurPx: params.qaSimulateBlur } }))
    if (params.qaSimulateNoise !== undefined) useQRStore.setState((s) => ({ qa: { ...s.qa, simulateNoise: params.qaSimulateNoise } }))
    if (params.qaSimulateRotation !== undefined) useQRStore.setState((s) => ({ qa: { ...s.qa, simulateRotationDeg: params.qaSimulateRotation } }))
    if (params.qaShowHeatmap) useQRStore.setState((s) => ({ qa: { ...s.qa, showHeatmap: true } }))
    
    // Auto-tuning params
    if (params.autoPickVersion === false) useQRStore.setState((s) => ({ auto: { ...s.auto, pickVersion: false } }))
    if (params.autoPickEcc) useQRStore.setState((s) => ({ auto: { ...s.auto, pickEcc: true } }))
    if (params.autoReduceIntensity) useQRStore.setState((s) => ({ auto: { ...s.auto, reduceIntensityUntilSafe: true } }))
    
    // Watermark params
    if (params.watermarkEnabled) useQRStore.setState((s) => ({ watermark: { ...s.watermark, enabled: true } }))
    if (params.watermarkKind) useQRStore.setState((s) => ({ watermark: { ...s.watermark, kind: params.watermarkKind as any } }))
    if (params.watermarkText) useQRStore.setState((s) => ({ watermark: { ...s.watermark, text: params.watermarkText } }))
    if (params.watermarkPosition) useQRStore.setState((s) => ({ watermark: { ...s.watermark, position: params.watermarkPosition as any } }))
    if (params.watermarkOpacity !== undefined) useQRStore.setState((s) => ({ watermark: { ...s.watermark, opacity: params.watermarkOpacity } }))
    if (params.watermarkBlend) useQRStore.setState((s) => ({ watermark: { ...s.watermark, blend: params.watermarkBlend as any } }))
    
    // Metadata params
    if (params.metaTitle) useQRStore.setState((s) => ({ metadata: { ...s.metadata, title: params.metaTitle } }))
    if (params.metaAuthor) useQRStore.setState((s) => ({ metadata: { ...s.metadata, author: params.metaAuthor } }))
    if (params.metaCopyright) useQRStore.setState((s) => ({ metadata: { ...s.metadata, copyright: params.metaCopyright } }))
    if (params.metaLicense) useQRStore.setState((s) => ({ metadata: { ...s.metadata, license: params.metaLicense } }))
    if (params.metaDescription) useQRStore.setState((s) => ({ metadata: { ...s.metadata, description: params.metaDescription } }))
    if (params.metaCreationTime) useQRStore.setState((s) => ({ metadata: { ...s.metadata, creationTime: true } }))
    if (params.metaCustomKv) {
      try {
        const customKv = JSON.parse(params.metaCustomKv)
        if (Array.isArray(customKv)) {
          useQRStore.setState((s) => ({ metadata: { ...s.metadata, customKv } }))
        }
      } catch (e) {
        console.error('Failed to parse custom metadata:', e)
      }
    }
  }, [])

  // Load overlay image from URL
  const loadOverlayFromUrl = async (url: string) => {
    // Validate that it's a proper URL
    try {
      const parsed = new URL(url)
      if (!parsed.protocol.startsWith('http')) {
        console.error('Invalid overlay URL - must be http/https:', url)
        return
      }
    } catch {
      console.error('Invalid overlay URL format:', url)
      return
    }
    
    try {
      console.log('Loading overlay from URL:', url)
      const response = await fetch(url, { mode: 'cors' })
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
      
      const blob = await response.blob()
      const filename = url.split('/').pop()?.split('?')[0] || 'image'
      const file = new File([blob], filename, { type: blob.type })
      
      setOverlayUrl(url)
      setOverlayFile(file)
      setOverlayEnabled(true)
      console.log('Overlay loaded successfully from URL')
    } catch (err) {
      console.error('Failed to load overlay from URL:', err)
    }
  }

  return (
    <TooltipProvider>
      <div className="h-screen bg-background flex flex-col overflow-hidden relative">
        {/* Global busy overlay for export operations */}
        <BusyOverlay visible={isExporting} />
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={showEditor ? sidebarOpen : false} 
          onExport={download}
          showGallery={showGallery}
          activePage={currentPage}
          galleryFilter={galleryFilter}
          onGalleryFilterChange={setGalleryFilter}
          onNavigate={navigateTo}
        />
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Mobile layout: Sidebar and Preview in column, both visible */}
          {/* Desktop/Tablet: Sidebar is fixed, Preview takes remaining space */}
          
          {/* Sidebar - only shown in editor mode */}
          {showEditor && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
          
          {/* Main content area - conditionally render active page */}
          {/* Content is constrained above footer and AdMob banner */}
          {/* On native: account for footer (~40px) + share/export bar (~48px) + AdMob banner (dynamic) */}
          {/* On web: just footer (~48px) */}
          <div 
            className="flex-1 flex flex-col min-h-0"
            style={{ 
              paddingBottom: showEditor 
                ? (Capacitor.isNativePlatform() 
                    ? `${bannerHeight + 88}px`  // banner + footer(40) + share/export bar(48)
                    : '48px')  // just footer
                : (Capacitor.isNativePlatform() 
                    ? `${bannerHeight + 40}px`  // banner + footer on non-editor pages
                    : '48px')
            }}
          >
            {showEditor && <Preview sidebarOpen={sidebarOpen} />}
            {showGallery && <Gallery filter={galleryFilter} />}
            {showStaticPage && <StaticPage page={currentPage as StaticPageType} />}
          </div>
        </div>
        {/* Fixed Footer - visible on all platforms */}
        {/* On native: positioned just above AdMob banner. Ad is pinned to safe area, footer sits above it. */}
        <footer 
          className={`border-t bg-background py-2 fixed left-0 right-0 z-40 transition-all duration-300 ${sidebarOpen && showEditor ? 'lg:ms-96' : ''}`}
          style={{ bottom: Capacitor.isNativePlatform() ? `${bannerHeight}px` : '0' }}
        >
          {/* Inner wrapper with margins to center over QR area (between ad columns) */}
          <div className="px-4 lg:mx-[160px] text-center flex items-center justify-center min-h-[24px]">
            <p className="text-[10px] sm:text-xs text-muted-foreground" dir="auto">
              <a
                href="/docs"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('docs')
                }}
              >
                {t('nav.guide')}
              </a>
              {' · '}
              <a
                href="/about"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('about')
                }}
              >
                {t('nav.about')}
              </a>
              {' · '}
              <a
                href="/privacy"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('privacy')
                }}
              >
                {t('nav.privacy')}
              </a>
              {' · '}
              <a
                href="/terms"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('terms')
                }}
              >
                {t('nav.terms')}
              </a>
              {' · '}
              <a
                href="/contact"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('contact')
                }}
              >
                {t('nav.contact')}
              </a>
              {' · '}
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default App
