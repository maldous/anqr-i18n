import { useQRStore, OverlayMode, ColorMode, FitMode, DitherKind, DiffusionKernel, OrderedMatrix } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Upload, X, Move, Link, Loader2 } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { HighlightedLabel } from '@/lib/search-context'

const BASIC_OVERLAY_MODES: { value: OverlayMode; label: string }[] = [
  { value: 'center', label: 'Center Logo' },
  { value: 'blend', label: 'Blend' },
  { value: 'halftone', label: 'Halftone' },
  { value: 'dithered', label: 'Dithered' },
]

const ADVANCED_OVERLAY_MODES: { value: OverlayMode; label: string }[] = [
  { value: 'subpixel', label: 'Subpixel' },
  { value: 'blue-noise', label: 'Blue Noise' },
  { value: 'mosaic', label: 'Mosaic' },
  { value: 'gapfill', label: 'Gap Fill' },
  { value: 'brightness', label: 'Brightness' },
  { value: 'duotone', label: 'Duotone' },
]

const PRO_OVERLAY_MODES: { value: OverlayMode; label: string }[] = [
  { value: 'pixelate', label: 'Pixelate' },
  { value: 'outline', label: 'Outline' },
  { value: 'wave', label: 'Wave' },
  { value: 'subpixel-size', label: 'Subpixel Size' },
  { value: 'dither', label: 'True Dither' },
  { value: 'extreme', label: 'Extreme' },
]

export function OverlaySection() {
  const { 
    tier, overlay,
    setOverlayEnabled, setOverlayFile, setOverlayUrl, setOverlayMode, setOverlayIntensity,
    setOverlayColorMode, setOverlayPreserveFinders, setOverlayInvert,
    setOverlayBrightness, setOverlayContrast, setOverlayGamma,
    setOverlayFit, setOverlayRotate, setOverlayFlip,
    setOverlayDitherKind, setOverlayDiffusionKernel,
    setOverlayPreserveTiming, setOverlayPreserveAlignment,
    setOverlayCrop
  } = useQRStore()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const [urlInput, setUrlInput] = useState(overlay.url || '')
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [showUrlInput, setShowUrlInput] = useState(false)

  // Create image preview URL when file or URL changes
  useEffect(() => {
    if (overlay.file) {
      const url = URL.createObjectURL(overlay.file)
      setImagePreview(url)
      return () => URL.revokeObjectURL(url)
    } else if (overlay.url) {
      setImagePreview(overlay.url)
    } else {
      setImagePreview(null)
    }
  }, [overlay.file, overlay.url])

  // Load image from URL
  const loadFromUrl = useCallback(async () => {
    if (!urlInput.trim()) {
      setUrlError('Please enter a URL')
      return
    }
    
    setIsLoadingUrl(true)
    setUrlError(null)
    
    try {
      // Fetch the image (requires CORS or same-origin)
      const response = await fetch(urlInput, { mode: 'cors' })
      if (!response.ok) {
        throw new Error(`Failed to load: ${response.status}`)
      }
      
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.startsWith('image/')) {
        throw new Error('URL does not point to an image')
      }
      
      const blob = await response.blob()
      
      // Extract filename from URL
      const urlParts = urlInput.split('/')
      const filename = urlParts[urlParts.length - 1].split('?')[0] || 'image'
      
      // Create a File object from the blob
      const file = new File([blob], filename, { type: blob.type })
      
      // Store the URL for sharing purposes
      setOverlayUrl(urlInput)
      setOverlayFile(file)
      setOverlayEnabled(true)  // Explicitly enable overlay
      setShowUrlInput(false)
    } catch (err) {
      console.error('Failed to load image from URL:', err)
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
        setUrlError('Cannot load: CORS blocked or invalid URL')
      } else {
        setUrlError(err instanceof Error ? err.message : 'Failed to load image')
      }
    } finally {
      setIsLoadingUrl(false)
    }
  }, [urlInput, setOverlayFile, setOverlayUrl, setOverlayEnabled])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOverlayUrl('') // Clear URL when file is selected
      setOverlayFile(file)
    }
  }

  const clearOverlay = () => {
    setOverlayFile(null)
    setOverlayUrl('')
    setUrlInput('')
    setUrlError(null)
  }

  // Handle crop region drag (mouse)
  const handleCropDrag = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !previewContainerRef.current) return
    e.preventDefault()
    
    const rect = previewContainerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    
    // Keep crop region centered on cursor, clamped to bounds
    const halfSize = overlay.cropRegion.size / 2
    const clampedX = Math.max(halfSize, Math.min(1 - halfSize, x))
    const clampedY = Math.max(halfSize, Math.min(1 - halfSize, y))
    
    setOverlayCrop({ region: { ...overlay.cropRegion, x: clampedX, y: clampedY } })
  }, [isDragging, overlay.cropRegion, setOverlayCrop])
  
  // Handle crop region drag (touch for mobile)
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!overlay.cropEnabled) return
    e.preventDefault()
    setIsDragging(true)
  }, [overlay.cropEnabled])
  
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !previewContainerRef.current || e.touches.length === 0) return
    e.preventDefault()
    
    const touch = e.touches[0]
    const rect = previewContainerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height))
    
    // Keep crop region centered on touch point, clamped to bounds
    const halfSize = overlay.cropRegion.size / 2
    const clampedX = Math.max(halfSize, Math.min(1 - halfSize, x))
    const clampedY = Math.max(halfSize, Math.min(1 - halfSize, y))
    
    setOverlayCrop({ region: { ...overlay.cropRegion, x: clampedX, y: clampedY } })
  }, [isDragging, overlay.cropRegion, setOverlayCrop])
  
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const availableModes = [
    ...BASIC_OVERLAY_MODES,
    ...(tier === 'advanced' || tier === 'professional' ? ADVANCED_OVERLAY_MODES : []),
    ...(tier === 'professional' ? PRO_OVERLAY_MODES : []),
  ]

  return (
    <div className="space-y-4">
      {/* File Upload */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Image / GIF / WebP</HighlightedLabel></Label>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*,.gif,.webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        {(overlay.file || overlay.url) ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
              <span className="flex-1 text-sm truncate">
                {overlay.file?.name || (overlay.url ? 'Loaded from URL' : 'No file')}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={clearOverlay}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Show source URL if loaded from URL */}
            {overlay.url && !overlay.file?.name && (
              <div className="text-xs text-muted-foreground truncate px-2">
                {overlay.url}
              </div>
            )}
            
            {/* Image Preview with Square Crop Selector */}
            {imagePreview && (
              <div 
                ref={previewContainerRef}
                className="relative w-full aspect-square bg-muted/30 rounded-lg overflow-hidden border cursor-crosshair touch-none"
                onMouseDown={() => overlay.cropEnabled && setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleCropDrag}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-contain"
                  draggable={false}
                />
                
                {/* Square Crop Overlay */}
                {overlay.cropEnabled && (
                  <>
                    {/* Darkened area outside crop region */}
                    <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                    
                    {/* Clear crop region */}
                    <div 
                      className="absolute border-2 border-white shadow-lg pointer-events-none"
                      style={{
                        left: `${(overlay.cropRegion.x - overlay.cropRegion.size / 2) * 100}%`,
                        top: `${(overlay.cropRegion.y - overlay.cropRegion.size / 2) * 100}%`,
                        width: `${overlay.cropRegion.size * 100}%`,
                        height: `${overlay.cropRegion.size * 100}%`,
                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* Corner handles */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-400 rounded-sm" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm" />
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-400 rounded-sm" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-400 rounded-sm" />
                      
                      {/* Center drag indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Move className="h-6 w-6 text-white/70" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* Crop Controls */}
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>Enable Crop</HighlightedLabel></Label>
              <Switch 
                checked={overlay.cropEnabled}
                onCheckedChange={(checked) => setOverlayCrop({ enabled: checked })}
              />
            </div>
            
            {overlay.cropEnabled && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Crop Size</Label>
                  <span className="text-sm text-muted-foreground">{Math.round(overlay.cropRegion.size * 100)}%</span>
                </div>
                <Slider
                  value={[overlay.cropRegion.size]}
                  onValueChange={([v]) => setOverlayCrop({ region: { ...overlay.cropRegion, size: v } })}
                  min={0.1}
                  max={1}
                  step={0.05}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowUrlInput(!showUrlInput)}
              >
                <Link className="h-4 w-4 mr-2" />
                From URL
              </Button>
            </div>
            
            {/* URL Input */}
            {showUrlInput && (
              <div className="space-y-2 p-3 border rounded-md bg-muted/30">
                <Label className="text-sm">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/image.gif"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value)
                      setUrlError(null)
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && loadFromUrl()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={loadFromUrl}
                    disabled={isLoadingUrl || !urlInput.trim()}
                    size="sm"
                  >
                    {isLoadingUrl ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Load'
                    )}
                  </Button>
                </div>
                {urlError && (
                  <p className="text-xs text-destructive">{urlError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Note: Image must allow cross-origin requests (CORS)
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enable Toggle */}
      <div className="flex items-center justify-between">
        <Label><HighlightedLabel>Enable Overlay</HighlightedLabel></Label>
        <Switch 
          checked={overlay.enabled}
          onCheckedChange={setOverlayEnabled}
          disabled={!overlay.file}
        />
      </div>

      {overlay.enabled && (
        <>
          {/* Overlay Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Blend Mode</HighlightedLabel></Label>
            <Select value={overlay.mode} onValueChange={(v) => setOverlayMode(v as OverlayMode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableModes.map(m => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Intensity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Intensity</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{overlay.intensity}%</span>
            </div>
            <Slider
              value={[overlay.intensity]}
              onValueChange={([v]) => setOverlayIntensity(v)}
              min={0}
              max={100}
              step={1}
            />
          </div>

          {/* Color Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Color Mode</HighlightedLabel></Label>
            <Select value={overlay.colorMode} onValueChange={(v) => setOverlayColorMode(v as ColorMode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Full Color</SelectItem>
                <SelectItem value="grayscale">Grayscale</SelectItem>
                <SelectItem value="bw">Black & White</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preserve Finders */}
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>Preserve Finder Patterns</HighlightedLabel></Label>
            <Switch 
              checked={overlay.preserveFinders}
              onCheckedChange={setOverlayPreserveFinders}
            />
          </div>

          {/* Advanced Options */}
          {(tier === 'advanced' || tier === 'professional') && (
            <>
              {/* Invert */}
              <div className="flex items-center justify-between">
                <Label><HighlightedLabel>Invert Image</HighlightedLabel></Label>
                <Switch 
                  checked={overlay.invert}
                  onCheckedChange={setOverlayInvert}
                />
              </div>

              {/* Fit Mode */}
              <div className="space-y-2">
                <Label><HighlightedLabel>Fit Mode</HighlightedLabel></Label>
                <Select value={overlay.fit} onValueChange={(v) => setOverlayFit(v as FitMode)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cover</SelectItem>
                    <SelectItem value="contain">Contain</SelectItem>
                    <SelectItem value="stretch">Stretch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rotation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Rotation</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.rotateDeg}°</span>
                </div>
                <Slider
                  value={[overlay.rotateDeg]}
                  onValueChange={([v]) => setOverlayRotate(v)}
                  min={0}
                  max={360}
                  step={90}
                />
              </div>

              {/* Flip */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={overlay.flipX}
                    onCheckedChange={(checked) => setOverlayFlip({ x: checked })}
                  />
                  <Label className="text-sm"><HighlightedLabel>Flip X</HighlightedLabel></Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={overlay.flipY}
                    onCheckedChange={(checked) => setOverlayFlip({ y: checked })}
                  />
                  <Label className="text-sm"><HighlightedLabel>Flip Y</HighlightedLabel></Label>
                </div>
              </div>

              {/* Brightness */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Brightness</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.brightness}</span>
                </div>
                <Slider
                  value={[overlay.brightness]}
                  onValueChange={([v]) => setOverlayBrightness(v)}
                  min={-100}
                  max={100}
                  step={5}
                />
              </div>

              {/* Contrast */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Contrast</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.contrast}</span>
                </div>
                <Slider
                  value={[overlay.contrast]}
                  onValueChange={([v]) => setOverlayContrast(v)}
                  min={-100}
                  max={100}
                  step={5}
                />
              </div>

              {/* Gamma */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Gamma</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.gamma.toFixed(1)}</span>
                </div>
                <Slider
                  value={[overlay.gamma]}
                  onValueChange={([v]) => setOverlayGamma(v)}
                  min={0.2}
                  max={3}
                  step={0.1}
                />
              </div>

              {/* Saturation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Saturation</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.saturation}</span>
                </div>
                <Slider
                  value={[overlay.saturation]}
                  onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, saturation: v } }))}
                  min={-100}
                  max={100}
                  step={5}
                />
              </div>

              {/* Hue Rotate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Hue Rotate</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.hueRotateDeg}°</span>
                </div>
                <Slider
                  value={[overlay.hueRotateDeg]}
                  onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, hueRotateDeg: v } }))}
                  min={0}
                  max={360}
                  step={15}
                />
              </div>

              {/* Blur */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Blur</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.blurPx}px</span>
                </div>
                <Slider
                  value={[overlay.blurPx]}
                  onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, blurPx: v } }))}
                  min={0}
                  max={20}
                  step={1}
                />
              </div>

              {/* Sharpen */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Sharpen</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.sharpen}</span>
                </div>
                <Slider
                  value={[overlay.sharpen]}
                  onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, sharpen: v } }))}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>

              {/* Posterize */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Posterize Levels</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.posterizeLevels || 'Off'}</span>
                </div>
                <Slider
                  value={[overlay.posterizeLevels]}
                  onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, posterizeLevels: v } }))}
                  min={0}
                  max={16}
                  step={1}
                />
              </div>

              {/* Threshold */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label><HighlightedLabel>Threshold</HighlightedLabel></Label>
                  <span className="text-sm text-muted-foreground">{overlay.threshold}</span>
                </div>
                <Slider
                  value={[overlay.threshold]}
                  onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, threshold: v } }))}
                  min={0}
                  max={255}
                  step={1}
                />
              </div>

              {/* Edge Detect */}
              <div className="space-y-2">
                <Label><HighlightedLabel>Edge Detection</HighlightedLabel></Label>
                <Select 
                  value={overlay.edgeDetect} 
                  onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, edgeDetect: v as typeof overlay.edgeDetect } }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="off">Off</SelectItem>
                    <SelectItem value="sobel">Sobel</SelectItem>
                    <SelectItem value="canny">Canny</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dither Options */}
              {['dithered', 'blue-noise', 'dither'].includes(overlay.mode) && (
                <>
                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-muted-foreground"><HighlightedLabel>Dither Settings</HighlightedLabel></Label>
                    <Select value={overlay.ditherKind} onValueChange={(v) => setOverlayDitherKind(v as DitherKind)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error_diffusion">Error Diffusion</SelectItem>
                        <SelectItem value="ordered_bayer">Ordered (Bayer)</SelectItem>
                        <SelectItem value="ordered_clustered">Clustered Dot</SelectItem>
                        <SelectItem value="ordered_void_cluster">Void & Cluster</SelectItem>
                        <SelectItem value="blue_noise">Blue Noise</SelectItem>
                        <SelectItem value="blue_noise_threshold">Blue Noise Threshold</SelectItem>
                        <SelectItem value="white_noise">White Noise</SelectItem>
                        <SelectItem value="gaussian_noise">Gaussian Noise</SelectItem>
                        <SelectItem value="triangular_noise">Triangular Noise</SelectItem>
                        <SelectItem value="true_dither">True Dither</SelectItem>
                        <SelectItem value="blue_noise_error_diffusion">Blue Noise + Error Diffusion</SelectItem>
                        <SelectItem value="screened_blue_noise">Screened Blue Noise</SelectItem>
                        <SelectItem value="perceptual">Perceptual (Luminance)</SelectItem>
                        <SelectItem value="edge_aware">Edge-Aware</SelectItem>
                        <SelectItem value="adaptive_threshold">Adaptive Threshold</SelectItem>
                        <SelectItem value="temporal_blue_noise">Temporal Blue Noise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {overlay.ditherKind === 'error_diffusion' && (
                  <div className="space-y-2">
                    <Label><HighlightedLabel>Diffusion Kernel</HighlightedLabel></Label>
                      <Select value={overlay.diffusionKernel} onValueChange={(v) => setOverlayDiffusionKernel(v as DiffusionKernel)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="floyd_steinberg">Floyd-Steinberg</SelectItem>
                          <SelectItem value="jarvis_judice_ninke">Jarvis-Judice-Ninke</SelectItem>
                          <SelectItem value="stucki">Stucki</SelectItem>
                          <SelectItem value="burkes">Burkes</SelectItem>
                          <SelectItem value="sierra">Sierra</SelectItem>
                          <SelectItem value="sierra_2">Sierra-2</SelectItem>
                          <SelectItem value="sierra_lite">Sierra-Lite</SelectItem>
                          <SelectItem value="atkinson">Atkinson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Dither Strength */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Dither Strength</Label>
                      <span className="text-sm text-muted-foreground">{overlay.ditherStrength}%</span>
                    </div>
                    <Slider
                      value={[overlay.ditherStrength]}
                      onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, ditherStrength: v } }))}
                      min={0}
                      max={100}
                      step={5}
                    />
                  </div>

                  {/* Serpentine */}
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Serpentine Scanning</Label>
                    <Switch 
                      checked={overlay.ditherSerpentine}
                      onCheckedChange={(checked) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, ditherSerpentine: checked } }))}
                    />
                  </div>

                  {/* Ordered Matrix */}
                  {overlay.ditherKind === 'true_dither' && (
                    <div className="space-y-2">
                      <Label className="text-sm">Ordered Matrix</Label>
                      <Select 
                        value={overlay.orderedMatrix} 
                        onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, orderedMatrix: v as OrderedMatrix } }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bayer2">Bayer 2×2</SelectItem>
                          <SelectItem value="bayer4">Bayer 4×4</SelectItem>
                          <SelectItem value="bayer8">Bayer 8×8</SelectItem>
                          <SelectItem value="clustered_dot">Clustered Dot</SelectItem>
                          <SelectItem value="void_cluster">Void & Cluster</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Blue Noise Settings */}
                  {overlay.ditherKind === 'blue_noise_threshold' && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Tile Size</Label>
                          <span className="text-sm text-muted-foreground">{overlay.blueNoiseTileSize}</span>
                        </div>
                        <Slider
                          value={[overlay.blueNoiseTileSize]}
                          onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, blueNoiseTileSize: v } }))}
                          min={16}
                          max={256}
                          step={16}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Seed</Label>
                        <Input 
                          type="number"
                          value={overlay.blueNoiseSeed}
                          onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, blueNoiseSeed: parseInt(e.target.value) || 0 } }))}
                        />
                      </div>
                    </>
                  )}

                  {/* Color Dither */}
                  <div className="space-y-2">
                    <Label className="text-sm">Color Dither</Label>
                    <Select 
                      value={overlay.colorDither} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, colorDither: v as typeof overlay.colorDither } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="per_channel">Per Channel</SelectItem>
                        <SelectItem value="perceptual">Perceptual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Subpixel Settings */}
              {overlay.mode === 'subpixel' && (
                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-muted-foreground">Subpixel Settings</Label>
                  <div className="space-y-2">
                    <Label className="text-sm">Grid Size</Label>
                    <Select 
                      value={overlay.subpixelGridSize} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelGridSize: v as typeof overlay.subpixelGridSize } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2x2">2×2</SelectItem>
                        <SelectItem value="3x3">3×3</SelectItem>
                        <SelectItem value="4x4">4×4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Center Rule</Label>
                    <Select 
                      value={overlay.subpixelCenterRule} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelCenterRule: v as typeof overlay.subpixelCenterRule } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">Strict</SelectItem>
                        <SelectItem value="halftone_center">Halftone Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Neutral Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={overlay.subpixelNeutralColor}
                        onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelNeutralColor: e.target.value } }))}
                        className="w-10 h-8 p-1"
                      />
                      <Input
                        type="text"
                        value={overlay.subpixelNeutralColor}
                        onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelNeutralColor: e.target.value } }))}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Finder Override</Label>
                    <Select 
                      value={overlay.subpixelFinderOverride} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, subpixelFinderOverride: v as typeof overlay.subpixelFinderOverride } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid</SelectItem>
                        <SelectItem value="stylized">Stylized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Halftone Settings */}
              {overlay.mode === 'halftone' && (
                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-muted-foreground">Halftone Settings</Label>
                  <div className="space-y-2">
                    <Label className="text-sm">Cell Size</Label>
                    <Select 
                      value={overlay.halftoneCell} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, halftoneCell: v as typeof overlay.halftoneCell } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="per_module">Per Module</SelectItem>
                        <SelectItem value="n×n">N×N Grid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Dot Shape</Label>
                    <Select 
                      value={overlay.halftoneDotShape} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, halftoneDotShape: v as typeof overlay.halftoneDotShape } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="line">Line</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Brightness Curve</Label>
                    <Select 
                      value={overlay.brightnessCurve} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, brightnessCurve: v as typeof overlay.brightnessCurve } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="s-curve">S-Curve</SelectItem>
                        <SelectItem value="gamma">Gamma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Duotone Settings */}
              {overlay.mode === 'duotone' && (
                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-muted-foreground">Duotone Colors</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Shadow</Label>
                      <div className="flex gap-1">
                        <Input
                          type="color"
                          value={overlay.duotoneColors[0]}
                          onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, duotoneColors: [e.target.value, s.overlay.duotoneColors[1]] } }))}
                          className="w-8 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={overlay.duotoneColors[0]}
                          onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, duotoneColors: [e.target.value, s.overlay.duotoneColors[1]] } }))}
                          className="flex-1 text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Highlight</Label>
                      <div className="flex gap-1">
                        <Input
                          type="color"
                          value={overlay.duotoneColors[1]}
                          onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, duotoneColors: [s.overlay.duotoneColors[0], e.target.value] } }))}
                          className="w-8 h-8 p-1"
                        />
                        <Input
                          type="text"
                          value={overlay.duotoneColors[1]}
                          onChange={(e) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, duotoneColors: [s.overlay.duotoneColors[0], e.target.value] } }))}
                          className="flex-1 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* GIF Settings */}
              {overlay.type === 'gif' && (
                <div className="space-y-2 pt-2 border-t">
                  <Label className="text-muted-foreground">GIF Settings</Label>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Use Frame Delays</Label>
                    <Switch 
                      checked={overlay.gifUseFrameDelays}
                      onCheckedChange={(checked) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, gifUseFrameDelays: checked } }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Max FPS</Label>
                      <span className="text-sm text-muted-foreground">{overlay.gifMaxFps}</span>
                    </div>
                    <Slider
                      value={[overlay.gifMaxFps]}
                      onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, gifMaxFps: v } }))}
                      min={1}
                      max={60}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Disposal Handling</Label>
                    <Select 
                      value={overlay.gifDisposalHandling} 
                      onValueChange={(v) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, gifDisposalHandling: v as typeof overlay.gifDisposalHandling } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="respect">Respect</SelectItem>
                        <SelectItem value="simplify">Simplify</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Professional Options */}
          {tier === 'professional' && (
            <>
              {/* Preserve Timing & Alignment */}
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-muted-foreground">Protection</Label>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Preserve Timing</Label>
                  <Switch 
                    checked={overlay.preserveTiming}
                    onCheckedChange={setOverlayPreserveTiming}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Preserve Alignment</Label>
                  <Switch 
                    checked={overlay.preserveAlignment}
                    onCheckedChange={setOverlayPreserveAlignment}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Protect Format Info</Label>
                  <Switch 
                    checked={overlay.protectFormatInfo}
                    onCheckedChange={(checked) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, protectFormatInfo: checked } }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Protect Version Info</Label>
                  <Switch 
                    checked={overlay.protectVersionInfo}
                    onCheckedChange={(checked) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, protectVersionInfo: checked } }))}
                  />
                </div>
              </div>

              {/* ECC Aware */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>ECC-Aware Mode</Label>
                  <Switch 
                    checked={overlay.eccAwareEnabled}
                    onCheckedChange={(checked) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, eccAwareEnabled: checked } }))}
                  />
                </div>
                {overlay.eccAwareEnabled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Risk Budget</Label>
                      <span className="text-sm text-muted-foreground">{overlay.eccAwareRiskBudget}%</span>
                    </div>
                    <Slider
                      value={[overlay.eccAwareRiskBudget]}
                      onValueChange={([v]) => useQRStore.setState((s) => ({ overlay: { ...s.overlay, eccAwareRiskBudget: v } }))}
                      min={0}
                      max={100}
                      step={5}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
