import { useQRStore } from '@/store/qr-store'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Link, Code, Check, MessageCircle } from 'lucide-react'
import { HighlightedLabel } from '@/lib/search-context'
import { useState, useMemo } from 'react'
import { 
  copyToClipboard, 
  getShareableUrl, 
  generateImageEmbed, 
  generateMarkdownEmbed,
  getSocialShareUrls 
} from '@/modules/share-utils'

export function ShareSection() {
  const { share, setShare, getPayloadText, qr, render, overlay, animation, output, safety, qa, auto, watermark, metadata } = useQRStore()
  const { t, i18n } = useTranslation()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Build shareable URL from current config
  const shareableUrl = useMemo(() => {
    const config = {
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
    return getShareableUrl(config)
  }, [getPayloadText, qr, render, overlay, animation, output, safety, qa, auto, watermark, metadata, i18n.language])

  const embedCode = useMemo(() => {
    return generateImageEmbed(shareableUrl, 'QR Code', { width: 200, height: 200 })
  }, [shareableUrl])

  const markdownEmbed = useMemo(() => {
    return generateMarkdownEmbed(shareableUrl, 'QR Code')
  }, [shareableUrl])

  const socialUrls = useMemo(() => {
    return getSocialShareUrls(shareableUrl, 'Check out this QR code!')
  }, [shareableUrl])

  // Count the number of URL parameters being shared
  const paramCount = useMemo(() => {
    try {
      const url = new URL(shareableUrl)
      return url.searchParams.size
    } catch {
      return 0
    }
  }, [shareableUrl])

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
  }

  return (
    <div className="space-y-4">
      {/* Direct Link */}
      <div className="flex items-center justify-between">
        <div>
          <Label><HighlightedLabel>{t('share.directLink')}</HighlightedLabel></Label>
          <p className="text-xs text-muted-foreground">{t('share.directLinkDesc')}</p>
        </div>
        <Switch 
          checked={share.directLink}
          onCheckedChange={(checked) => setShare({ directLink: checked })}
        />
      </div>

      {share.directLink && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input 
              readOnly
              value={shareableUrl}
              className="flex-1 text-xs"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleCopy(shareableUrl, 'link')}
            >
              {copiedField === 'link' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Embed HTML */}
      <div className="flex items-center justify-between">
        <div>
          <Label><HighlightedLabel>{t('share.embedHtml')}</HighlightedLabel></Label>
          <p className="text-xs text-muted-foreground">{t('share.embedHtmlDesc')}</p>
        </div>
        <Switch 
          checked={share.embedHtml}
          onCheckedChange={(checked) => setShare({ embedHtml: checked })}
        />
      </div>

      {share.embedHtml && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input 
              readOnly
              value={embedCode}
              className="flex-1 text-xs font-mono"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleCopy(embedCode, 'embed')}
            >
              {copiedField === 'embed' ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Input 
              readOnly
              value={markdownEmbed}
              className="flex-1 text-xs font-mono"
              placeholder={t('share.markdown')}
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleCopy(markdownEmbed, 'markdown')}
            >
              {copiedField === 'markdown' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Encode More Params */}
      <div className="flex items-center justify-between">
        <div>
          <Label><HighlightedLabel>{t('share.encodeAllParams')}</HighlightedLabel></Label>
          <p className="text-xs text-muted-foreground">{t('share.encodeAllParamsDesc')}</p>
        </div>
        <Switch 
          checked={share.encodeMoreParams}
          onCheckedChange={(checked) => setShare({ encodeMoreParams: checked })}
        />
      </div>

      {/* Quick Share Buttons */}
      <div className="pt-2 border-t space-y-2">
        <Label className="text-muted-foreground"><HighlightedLabel>{t('share.quickShare')}</HighlightedLabel></Label>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleCopy(shareableUrl, 'quick')}
          >
            {copiedField === 'quick' ? <Check className="h-4 w-4 mr-2" /> : <Link className="h-4 w-4 mr-2" />}
            {copiedField === 'quick' ? t('share.copied') : t('share.copyLink')}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(socialUrls.twitter, '_blank')}
          >
            {t('share.twitter')}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(socialUrls.whatsapp, '_blank')}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            {t('share.whatsapp')}
          </Button>
        </div>
      </div>
    </div>
  )
}
