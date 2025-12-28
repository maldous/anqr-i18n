import { useQRStore, Tier } from '@/store/qr-store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Share2, Moon, Sun, Menu, PanelLeft, Check, Grid3x3, Play, Globe } from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import { useTranslation } from 'react-i18next'
import { languages } from '@/i18n'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { copyToClipboard, getShareableUrl } from '@/modules/share-utils'
import { showRewardedAd, prepareRewardedAd } from '@/modules/admob-service'
import { gallerySections, type GalleryCategory } from '@/data/gallery-items'
import type { StaticPageType } from '@/components/StaticPage'

// Dynamic icon component for gallery filters
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return Icon ? <Icon className={className} /> : null
}

type HeaderPage = 'editor' | 'gallery' | StaticPageType

const NAV_LINKS: Array<{ href: string; labelKey: string; page: HeaderPage }> = [
  { href: '/', labelKey: 'nav.generator', page: 'editor' },
  { href: '/gallery', labelKey: 'nav.gallery', page: 'gallery' },
  { href: '/docs', labelKey: 'nav.guide', page: 'docs' },
  { href: '/about', labelKey: 'nav.about', page: 'about' },
  { href: '/privacy', labelKey: 'nav.privacy', page: 'privacy' },
  { href: '/terms', labelKey: 'nav.terms', page: 'terms' },
  { href: '/contact', labelKey: 'nav.contact', page: 'contact' },
]

interface HeaderProps {
  onToggleSidebar?: () => void
  onExport?: () => void
  sidebarOpen?: boolean
  showGallery?: boolean
  activePage?: HeaderPage
  galleryFilter?: GalleryCategory | 'all'
  onGalleryFilterChange?: (filter: GalleryCategory | 'all') => void
  onNavigate?: (page: HeaderPage) => void
}

export function Header({ onToggleSidebar, onExport, sidebarOpen = false, showGallery = false, activePage, galleryFilter = 'all', onGalleryFilterChange, onNavigate }: HeaderProps) {
  const { tier, setTier, getPayloadText, qr, render, overlay, animation, output, safety, qa, auto, watermark, metadata, activatePremiumAccess, checkPremiumAccess } = useQRStore()
  const { t, i18n } = useTranslation()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loadingAd, setLoadingAd] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setLangMenuOpen(false)
  }

  const resolvedPage: HeaderPage = activePage ?? (showGallery ? 'gallery' : 'editor')
  const isEditor = resolvedPage === 'editor'
  const isGallery = resolvedPage === 'gallery'
  const isStatic = !isEditor && !isGallery

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  // Prepare premium rewarded ad on mount (for native platforms)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      prepareRewardedAd('premium')
    }
  }, [])

  // Handle tier change - Professional requires watching ad on native
  const handleTierChange = async (newTier: Tier) => {
    // If selecting Professional on native platform, require watching ad
    if (newTier === 'professional' && Capacitor.isNativePlatform()) {
      // If already has premium access, allow direct selection
      if (checkPremiumAccess()) {
        setTier(newTier)
        return
      }
      
      // Show rewarded ad
      setLoadingAd(true)
      try {
        const reward = await showRewardedAd('premium')
        if (reward) {
          // User watched the ad, grant premium access
          activatePremiumAccess()
          setTier('professional')
        }
        // If reward is null, user didn't complete the ad - don't change tier
      } catch (error) {
        console.error('Failed to show rewarded ad:', error)
      } finally {
        setLoadingAd(false)
        // Prepare next ad
        prepareRewardedAd('premium')
      }
    } else {
      // Web or non-professional tier - allow direct change
      setTier(newTier)
    }
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
    document.documentElement.classList.toggle('dark', newMode)
  }

  const handleShare = async () => {
    const shareConfig = {
      data: getPayloadText(),
      lang: i18n.language,
      // QR settings
      ec: qr.ecc,
      version: qr.version !== 0 ? qr.version : undefined,
      size: render.modulePx !== 20 ? render.modulePx : undefined,
      margin: qr.quietZoneModules !== 4 ? qr.quietZoneModules : undefined,
      encodingMode: qr.encodingMode !== 'auto' ? qr.encodingMode : undefined,
      borderModulesExtra: qr.borderModulesExtra !== 0 ? qr.borderModulesExtra : undefined,
      quietZoneMinEnforce: qr.quietZoneMinEnforce === false ? false : undefined,
      // Colors
      fg: render.fgColor !== '#000000' ? render.fgColor : undefined,
      bg: render.bgColor !== '#ffffff' ? render.bgColor : undefined,
      transparent: render.bgTransparent || undefined,
      // Styles
      style: render.moduleStyle !== 'square' ? render.moduleStyle : undefined,
      finder: render.finderStyle !== 'square' ? render.finderStyle : undefined,
      alignmentStyle: render.alignmentStyle !== 'match_finder' ? render.alignmentStyle : undefined,
      timingStyle: render.timingStyle !== 'match_module' ? render.timingStyle : undefined,
      // Render settings
      moduleGap: render.moduleGapPercent !== 0 ? render.moduleGapPercent : undefined,
      gapMode: render.gapMode !== 'none' ? render.gapMode : undefined,
      cornerRadius: render.cornerRadius !== 0 ? render.cornerRadius : undefined,
      gradientType: render.gradient.type !== 'none' ? render.gradient.type : undefined,
      eyeOuterStyle: render.eyeOuterStyle !== 'square' ? render.eyeOuterStyle : undefined,
      eyeInnerStyle: render.eyeInnerStyle !== 'square' ? render.eyeInnerStyle : undefined,
      eyeScale: render.eyeScale !== 100 ? render.eyeScale : undefined,
      frameStyle: render.frameStyle !== 'none' ? render.frameStyle : undefined,
      frameText: render.frameText || undefined,
      dotRotation: render.dotRotationDeg !== 0 ? render.dotRotationDeg : undefined,
      crispEdges: render.crispEdges === false ? false : undefined,
      pixelSnap: render.pixelSnap !== 'floor' ? render.pixelSnap : undefined,
      perModuleColorMode: render.perModuleColorMode !== 'solid' ? render.perModuleColorMode : undefined,
      contrastGuard: render.contrastGuard ? true : undefined,
      minContrastRatio: render.contrastGuard && render.minContrastRatio !== 4.5 ? render.minContrastRatio : undefined,
      // Overlay
      mode: overlay.enabled ? overlay.mode : undefined,
      intensity: overlay.enabled && overlay.intensity !== 100 ? overlay.intensity : undefined,
      overlayUrl: overlay.enabled && overlay.url ? overlay.url : undefined,
      fit: overlay.enabled && overlay.fit !== 'cover' ? overlay.fit : undefined,
      rotate: overlay.enabled && overlay.rotateDeg !== 0 ? overlay.rotateDeg : undefined,
      flipX: overlay.enabled && overlay.flipX ? true : undefined,
      flipY: overlay.enabled && overlay.flipY ? true : undefined,
      preserveFinders: overlay.enabled && !overlay.preserveFinders ? false : undefined,
      preserveTiming: overlay.enabled && overlay.preserveTiming ? true : undefined,
      preserveAlignment: overlay.enabled && overlay.preserveAlignment ? true : undefined,
      protectFormatInfo: overlay.enabled && overlay.protectFormatInfo ? true : undefined,
      protectVersionInfo: overlay.enabled && overlay.protectVersionInfo ? true : undefined,
      eccAwareEnabled: overlay.enabled && overlay.eccAwareEnabled ? true : undefined,
      eccAwareRiskBudget: overlay.enabled && overlay.eccAwareEnabled && overlay.eccAwareRiskBudget !== 50 ? overlay.eccAwareRiskBudget : undefined,
      eccAwareWeightMap: overlay.enabled && overlay.eccAwareEnabled && overlay.eccAwareWeightMap !== 'distance_to_finders' ? overlay.eccAwareWeightMap : undefined,
      // Overlay preprocessing (only if overlay enabled)
      colorMode: overlay.enabled && overlay.colorMode !== 'color' ? overlay.colorMode : undefined,
      brightness: overlay.enabled && overlay.brightness !== 0 ? overlay.brightness : undefined,
      contrast: overlay.enabled && overlay.contrast !== 0 ? overlay.contrast : undefined,
      gamma: overlay.enabled && overlay.gamma !== 1 ? overlay.gamma : undefined,
      saturation: overlay.enabled && overlay.saturation !== 0 ? overlay.saturation : undefined,
      hue: overlay.enabled && overlay.hueRotateDeg !== 0 ? overlay.hueRotateDeg : undefined,
      blur: overlay.enabled && overlay.blurPx !== 0 ? overlay.blurPx : undefined,
      sharpen: overlay.enabled && overlay.sharpen !== 0 ? overlay.sharpen : undefined,
      posterize: overlay.enabled && overlay.posterizeLevels !== 0 ? overlay.posterizeLevels : undefined,
      threshold: overlay.enabled && overlay.threshold !== 128 ? overlay.threshold : undefined,
      edge: overlay.enabled && overlay.edgeDetect !== 'off' ? overlay.edgeDetect : undefined,
      invert: overlay.enabled && overlay.invert ? overlay.invert : undefined,
      // Dithering (only if overlay enabled)
      ditherKind: overlay.enabled && overlay.ditherKind !== 'error_diffusion' ? overlay.ditherKind : undefined,
      diffusionKernel: overlay.enabled && overlay.diffusionKernel !== 'floyd_steinberg' ? overlay.diffusionKernel : undefined,
      ditherStrength: overlay.enabled && overlay.ditherStrength !== 50 ? overlay.ditherStrength : undefined,
      ditherSerpentine: overlay.enabled && overlay.ditherSerpentine ? true : undefined,
      orderedMatrix: overlay.enabled && overlay.orderedMatrix !== 'bayer4' ? overlay.orderedMatrix : undefined,
      blueNoiseTileSize: overlay.enabled && overlay.blueNoiseTileSize !== 64 ? overlay.blueNoiseTileSize : undefined,
      blueNoiseSeed: overlay.enabled && overlay.blueNoiseSeed !== 0 ? overlay.blueNoiseSeed : undefined,
      colorDither: overlay.enabled && overlay.colorDither !== 'none' ? overlay.colorDither : undefined,
      // Subpixel
      subpixelGridSize: overlay.enabled && overlay.mode === 'subpixel' && overlay.subpixelGridSize !== '3x3' ? overlay.subpixelGridSize : undefined,
      subpixelCenterRule: overlay.enabled && overlay.mode === 'subpixel' && overlay.subpixelCenterRule !== 'strict' ? overlay.subpixelCenterRule : undefined,
      subpixelNeutralColor: overlay.enabled && overlay.mode === 'subpixel' && overlay.subpixelNeutralColor !== '#808080' ? overlay.subpixelNeutralColor : undefined,
      subpixelFinderOverride: overlay.enabled && overlay.mode === 'subpixel' && overlay.subpixelFinderOverride !== 'solid' ? overlay.subpixelFinderOverride : undefined,
      // Halftone
      halftoneCell: overlay.enabled && overlay.mode === 'halftone' && overlay.halftoneCell !== 'per_module' ? overlay.halftoneCell : undefined,
      halftoneDotShape: overlay.enabled && overlay.mode === 'halftone' && overlay.halftoneDotShape !== 'circle' ? overlay.halftoneDotShape : undefined,
      brightnessCurve: overlay.enabled && overlay.mode === 'halftone' && overlay.brightnessCurve !== 'linear' ? overlay.brightnessCurve : undefined,
      duotoneColor1: overlay.enabled && overlay.mode === 'duotone' && overlay.duotoneColors[0] !== '#000000' ? overlay.duotoneColors[0] : undefined,
      duotoneColor2: overlay.enabled && overlay.mode === 'duotone' && overlay.duotoneColors[1] !== '#ffffff' ? overlay.duotoneColors[1] : undefined,
      // Animation
      speed: animation.speedMs !== 100 ? animation.speedMs : undefined,
      loop: animation.loop === false ? false : undefined,
      reverse: animation.bounce ? true : undefined,
      startFrame: animation.startFrame !== 0 ? animation.startFrame : undefined,
      maxFrames: animation.maxFrames !== 100 ? animation.maxFrames : undefined,
      frameStep: animation.frameStep !== 1 ? animation.frameStep : undefined,
      interpolate: animation.interpolate !== 'none' ? animation.interpolate : undefined,
      temporalDither: animation.temporalDither !== 'off' ? animation.temporalDither : undefined,
      pattern: animation.pattern !== 'none' ? animation.pattern : undefined,
      moduleJitter: animation.moduleJitterPx !== 0 ? animation.moduleJitterPx : undefined,
      colorCycle: animation.colorCycle ? true : undefined,
      seed: animation.seed !== 0 ? animation.seed : undefined,
      // Output
      width: output.widthPx !== 400 ? output.widthPx : undefined,
      height: output.heightPx !== 400 ? output.heightPx : undefined,
      format: output.format !== 'gif' ? output.format : undefined,
      quality: output.quality !== 0.9 ? output.quality : undefined,
      filename: output.filename !== 'anqr-qrcode' ? output.filename : undefined,
      gifPaletteSize: output.format === 'gif' && output.gifPaletteSize !== 256 ? output.gifPaletteSize : undefined,
      gifQuantizer: output.format === 'gif' && output.gifQuantizer !== 'median_cut' ? output.gifQuantizer : undefined,
      gifDither: output.format === 'gif' && output.gifDither !== 'floyd' ? output.gifDither : undefined,
      svgTrueVector: output.format === 'svg' && output.svgTrueVector ? true : undefined,
      dpi: output.dpi !== 72 ? output.dpi : undefined,
      includeQuietZone: output.includeQuietZone === false ? false : undefined,
      bgOverride: output.bgOverride ? output.bgOverride : undefined,
      gifTransparentColor: output.format === 'gif' && output.gifTransparentColor ? output.gifTransparentColor : undefined,
      svgShapePrecision: output.format === 'svg' && output.svgShapePrecision !== 'pixel' ? output.svgShapePrecision : undefined,
      svgEmbedRasterOverlay: output.format === 'svg' && output.svgEmbedRasterOverlay === false ? false : undefined,
      formatExtra: output.formatExtra !== 'none' ? output.formatExtra : undefined,
      // Safety
      safetyMode: safety.mode !== 'off' ? safety.mode : undefined,
      safetyMinModulePx: safety.mode !== 'off' && safety.minModulePx !== 2 ? safety.minModulePx : undefined,
      safetyMinQuietZone: safety.mode !== 'off' && safety.minQuietZoneModules !== 4 ? safety.minQuietZoneModules : undefined,
      lockFinders: safety.mode !== 'off' && !safety.lockFinders ? false : undefined,
      lockTiming: safety.mode !== 'off' && !safety.lockTiming ? false : undefined,
      lockAlign: safety.mode !== 'off' && !safety.lockAlign ? false : undefined,
      lockFormat: safety.mode !== 'off' && !safety.lockFormat ? false : undefined,
      lockVersion: safety.mode !== 'off' && !safety.lockVersion ? false : undefined,
      // QA
      qaContrastCheck: qa.contrastCheck ? true : undefined,
      qaSimulateBlur: qa.simulateBlurPx !== 0 ? qa.simulateBlurPx : undefined,
      qaSimulateNoise: qa.simulateNoise !== 0 ? qa.simulateNoise : undefined,
      qaSimulateRotation: qa.simulateRotationDeg !== 0 ? qa.simulateRotationDeg : undefined,
      qaShowHeatmap: qa.showHeatmap ? true : undefined,
      // Auto-tuning
      autoPickVersion: auto.pickVersion === false ? false : undefined,
      autoPickEcc: auto.pickEcc ? true : undefined,
      autoReduceIntensity: auto.reduceIntensityUntilSafe ? true : undefined,
      // Watermark
      watermarkEnabled: watermark.enabled ? true : undefined,
      watermarkKind: watermark.enabled && watermark.kind !== 'text' ? watermark.kind : undefined,
      watermarkText: watermark.enabled && watermark.kind === 'text' && watermark.text ? watermark.text : undefined,
      watermarkPosition: watermark.enabled && watermark.position !== 'center' ? watermark.position : undefined,
      watermarkOpacity: watermark.enabled && watermark.opacity !== 50 ? watermark.opacity : undefined,
      watermarkBlend: watermark.enabled && watermark.blend !== 'normal' ? watermark.blend : undefined,
      // Metadata
      metaTitle: metadata.title || undefined,
      metaAuthor: metadata.author || undefined,
      metaCopyright: metadata.copyright || undefined,
      metaLicense: metadata.license || undefined,
      metaDescription: metadata.description || undefined,
      metaCreationTime: metadata.creationTime ? true : undefined,
      metaCustomKv: metadata.customKv.length > 0 ? JSON.stringify(metadata.customKv) : undefined,
    }
    const url = getShareableUrl(shareConfig)
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
    <header className={`border-b bg-card shadow-md sticky top-0 z-50 transition-all duration-300 ${sidebarOpen && isEditor ? 'lg:ml-96' : ''}`} style={{ paddingTop: 'max(var(--sat, 0px), env(safe-area-inset-top, 0px))' }}>
      <div className="px-4 flex items-center justify-between h-[52px]">
        <div className="flex items-center gap-6">
          {/* Settings toggle - only in editor mode, placeholder space on other pages */}
          {isEditor ? (
            <button
              onClick={onToggleSidebar}
              className="flex items-center justify-center w-8 h-8 hover:opacity-80 cursor-pointer"
              title="Toggle settings panel"
            >
              <PanelLeft className="h-6 w-6 text-muted-foreground" />
            </button>
          ) : (
            /* Placeholder space to keep layout consistent with Generator */
            <div className="hidden lg:block w-8 h-8" />
          )}
          
          {/* ANQR logo/title - always navigates to generator */}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onNavigate?.('editor')
            }}
            className="flex items-center gap-2 transition-opacity hover:opacity-80 cursor-pointer"
            title="ANQR - QR Code Generator"
          >
            <span className="text-xl font-bold leading-6">ANQR</span>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = link.page === resolvedPage
              return (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive 
                      ? 'text-foreground bg-muted font-medium' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    if (!onNavigate) return
                    e.preventDefault()
                    onNavigate(link.page)
                  }}
                  title={`Go to ${t(link.labelKey)}`}
                >
                  {t(link.labelKey)}
                </a>
              )
            })}
            
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Gallery Filter - icon buttons right-justified next to dark mode toggle */}
          {isGallery && (
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => onGalleryFilterChange?.('all')}
                className={`p-2 rounded-md transition-colors ${
                  galleryFilter === 'all'
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title="All Categories"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              {gallerySections.map(section => (
                <button
                  key={section.id}
                  onClick={() => onGalleryFilterChange?.(section.id)}
                  className={`p-2 rounded-md transition-colors ${
                    galleryFilter === section.id
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={section.title}
                >
                  <DynamicIcon name={section.icon} className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}
          
          {/* Tier Toggle */}
          {isEditor && (
            <>
              <div className="hidden sm:block">
                <Tabs value={tier} onValueChange={(v) => handleTierChange(v as Tier)}>
                  <TabsList className="shadow-sm">
                    <TabsTrigger value="basic" className="text-xs px-3" title={t('tiers.basic')} disabled={loadingAd}>
                      {t('tiers.basic')}
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-xs px-3" title={t('tiers.advanced')} disabled={loadingAd}>
                      {t('tiers.advanced')}
                    </TabsTrigger>
                    <TabsTrigger value="professional" className="text-xs px-3 gap-1" title={Capacitor.isNativePlatform() && !checkPremiumAccess() ? t('tiers.watchAdForPro') : t('tiers.professional')} disabled={loadingAd}>
                      {Capacitor.isNativePlatform() && !checkPremiumAccess() && <Play className="w-3 h-3" />}
                      {t('tiers.professional')}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="sm:hidden">
                <Select value={tier} onValueChange={(v) => handleTierChange(v as Tier)} disabled={loadingAd}>
                  <SelectTrigger className="w-[100px] h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">{t('tiers.basic')}</SelectItem>
                    <SelectItem value="advanced">{t('tiers.advanced')}</SelectItem>
                    <SelectItem value="professional">
                      <span className="flex items-center gap-1">
                        {Capacitor.isNativePlatform() && !checkPremiumAccess() && <Play className="w-3 h-3" />}
                        {t('tiers.professional')}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Actions */}
          {isEditor && (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm" className="shadow-sm" onClick={handleShare} title="Copy shareable link to clipboard">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Share'}
              </Button>
              <Button size="sm" className="shadow-sm" onClick={onExport} title="Export QR code to file">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Language Selector */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setLangMenuOpen(!langMenuOpen)} 
              className="h-9 w-9" 
              title={t('language.select')}
            >
              <Globe className="h-4 w-4" />
            </Button>
            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-72 bg-card border rounded-lg shadow-lg z-50 py-1 max-h-[50vh] overflow-y-auto">
                  {/* Sort languages: current language first, then alphabetically by translated name */}
                  {[...languages]
                    .sort((a, b) => {
                      const currentCode = i18n.language.split('-')[0]
                      const aIsCurrent = a.code === currentCode || a.code === i18n.language
                      const bIsCurrent = b.code === currentCode || b.code === i18n.language
                      // Current language always first
                      if (aIsCurrent && !bIsCurrent) return -1
                      if (bIsCurrent && !aIsCurrent) return 1
                      // Sort by translated name in current language
                      const aName = t(`languages.${a.code}`)
                      const bName = t(`languages.${b.code}`)
                      return aName.localeCompare(bName, i18n.language)
                    })
                    .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 ${i18n.language === lang.code || i18n.language.startsWith(lang.code) ? 'bg-muted' : ''}`}
                      title={`${lang.nativeName} - ${t(`languages.${lang.code}`)}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}{lang.code !== i18n.language && !i18n.language.startsWith(lang.code) ? ` (${t(`languages.${lang.code}`)})` : ''}</span>
                      {(i18n.language === lang.code || i18n.language.startsWith(lang.code)) && <Check className="h-4 w-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Dark Mode Toggle - always on far right */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-9 w-9" title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card p-3 space-y-2">
          {/* Nav links as full-width vertical buttons */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(link => {
              const isActive = link.page === resolvedPage
              return (
                <a
                  key={link.labelKey}
                  href={link.href}
                  className={`w-full px-4 py-3 text-sm rounded-md text-center transition-colors ${
                    isActive 
                      ? 'text-foreground bg-muted font-medium' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault()
                      onNavigate(link.page)
                    }
                    setMobileMenuOpen(false)
                  }}
                  title={`Go to ${t(link.labelKey)}`}
                >
                  {t(link.labelKey)}
                </a>
              )
            })}
          </nav>


        </div>
      )}

    </header>

      {/* Mobile Footer Bar - Share/Export buttons fixed at bottom (only in editor mode on mobile) */}
      {/* On native platforms (Android/iOS), position above footer (~110px: 70px ad + ~40px footer) */}
      {isEditor && (
        <div 
          className="md:hidden fixed left-0 right-0 z-50 border-t bg-card p-2" 
          style={{ 
            bottom: Capacitor.isNativePlatform() ? '90px' : '48px',
            paddingBottom: Capacitor.isNativePlatform() ? '0.25rem' : 'calc(0.5rem + var(--sab, 0px))' 
          }}
        >
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare} title="Copy shareable link to clipboard">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
              {copied ? 'Copied!' : 'Share'}
            </Button>
            <Button size="sm" className="flex-1" onClick={onExport} title="Export QR code to file">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
