import { useQRStore, OutputFormat, GifQuantizer, GifDither } from '@/store/qr-store'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'

export function OutputSection() {
  const { 
    tier, output,
    setOutputFormat, setOutputWidth, setOutputHeight, setOutputQuality,
    setOutputFilename, setOutputGifPaletteSize, setOutputGifQuantizer,
    setOutputSvgTrueVector
  } = useQRStore()

  return (
    <div className="space-y-4">
      {/* Format */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Format</HighlightedLabel></Label>
        <Select value={output.format} onValueChange={(v) => setOutputFormat(v as OutputFormat)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="png">PNG</SelectItem>
            <SelectItem value="webp">WebP</SelectItem>
            <SelectItem value="gif">GIF</SelectItem>
            <SelectItem value="svg">SVG</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dimensions */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Output Size</HighlightedLabel></Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground"><HighlightedLabel>Width</HighlightedLabel></Label>
            <Input 
              type="number"
              value={output.widthPx}
              onChange={(e) => setOutputWidth(parseInt(e.target.value) || 400)}
              min={100}
              max={2000}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground"><HighlightedLabel>Height</HighlightedLabel></Label>
            <Input 
              type="number"
              value={output.heightPx}
              onChange={(e) => setOutputHeight(parseInt(e.target.value) || 400)}
              min={100}
              max={2000}
            />
          </div>
        </div>
      </div>

      {/* Quality (for WebP/JPEG) */}
      {(output.format === 'webp') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>Quality</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{Math.round(output.quality * 100)}%</span>
          </div>
          <Slider
            value={[output.quality]}
            onValueChange={([v]) => setOutputQuality(v)}
            min={0.1}
            max={1}
            step={0.05}
          />
        </div>
      )}

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Filename */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Filename</HighlightedLabel></Label>
            <Input 
              value={output.filename}
              onChange={(e) => setOutputFilename(e.target.value)}
              placeholder="anqr-qrcode"
            />
          </div>

          {/* GIF Options */}
          {output.format === 'gif' && (
            <>
              <div className="space-y-2 pt-2 border-t">
                <Label className="text-muted-foreground"><HighlightedLabel>GIF Settings</HighlightedLabel></Label>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm"><HighlightedLabel>Palette Size</HighlightedLabel></Label>
                    <span className="text-sm text-muted-foreground">{output.gifPaletteSize}</span>
                  </div>
                  <Slider
                    value={[output.gifPaletteSize]}
                    onValueChange={([v]) => setOutputGifPaletteSize(v)}
                    min={2}
                    max={256}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm"><HighlightedLabel>Quantizer</HighlightedLabel></Label>
                  <Select value={output.gifQuantizer} onValueChange={(v) => setOutputGifQuantizer(v as GifQuantizer)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="median_cut">Median Cut</SelectItem>
                      <SelectItem value="neuquant">NeuQuant</SelectItem>
                      <SelectItem value="octree">Octree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm"><HighlightedLabel>Dithering</HighlightedLabel></Label>
                  <Select 
                    value={output.gifDither} 
                    onValueChange={(v) => useQRStore.setState((s) => ({ output: { ...s.output, gifDither: v as GifDither } }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                      <SelectItem value="floyd">Floyd-Steinberg</SelectItem>
                      <SelectItem value="ordered">Ordered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {/* SVG Options */}
          {output.format === 'svg' && (
            <div className="space-y-2 pt-2 border-t">
              <Label className="text-muted-foreground"><HighlightedLabel>SVG Settings</HighlightedLabel></Label>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm"><HighlightedLabel>True Vector</HighlightedLabel></Label>
                  <p className="text-xs text-muted-foreground">Use paths instead of embedded raster</p>
                </div>
                <Switch 
                  checked={output.svgTrueVector}
                  onCheckedChange={setOutputSvgTrueVector}
                />
              </div>

              {output.svgTrueVector && (
                <div className="space-y-2">
                  <Label className="text-sm"><HighlightedLabel>Shape Precision</HighlightedLabel></Label>
                  <Select 
                    value={output.svgShapePrecision} 
                    onValueChange={(v) => useQRStore.setState((s) => ({ output: { ...s.output, svgShapePrecision: v as typeof output.svgShapePrecision } }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pixel">Pixel</SelectItem>
                      <SelectItem value="precise">Precise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <Label className="text-sm"><HighlightedLabel>Embed Raster Overlay</HighlightedLabel></Label>
                <Switch 
                  checked={output.svgEmbedRasterOverlay}
                  onCheckedChange={(checked) => useQRStore.setState((s) => ({ output: { ...s.output, svgEmbedRasterOverlay: checked } }))}
                />
              </div>
            </div>
          )}

          {/* GIF Transparent Color */}
          {output.format === 'gif' && (
            <div className="space-y-2">
              <Label className="text-sm"><HighlightedLabel>Transparent Color</HighlightedLabel></Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={output.gifTransparentColor || '#ffffff'}
                  onChange={(e) => useQRStore.setState((s) => ({ output: { ...s.output, gifTransparentColor: e.target.value } }))}
                  className="w-10 h-8 p-1"
                />
                <Input
                  type="text"
                  value={output.gifTransparentColor}
                  onChange={(e) => useQRStore.setState((s) => ({ output: { ...s.output, gifTransparentColor: e.target.value } }))}
                  placeholder="#ffffff or empty"
                  className="flex-1"
                />
              </div>
            </div>
          )}

          {/* Background Override */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Background Override</HighlightedLabel></Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={output.bgOverride || '#ffffff'}
                onChange={(e) => useQRStore.setState((s) => ({ output: { ...s.output, bgOverride: e.target.value } }))}
                className="w-10 h-8 p-1"
              />
              <Input
                type="text"
                value={output.bgOverride}
                onChange={(e) => useQRStore.setState((s) => ({ output: { ...s.output, bgOverride: e.target.value } }))}
                placeholder="Leave empty for default"
                className="flex-1"
              />
            </div>
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* DPI */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>DPI (Print)</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{output.dpi}</span>
            </div>
            <Slider
              value={[output.dpi]}
              onValueChange={([v]) => useQRStore.setState((s) => ({ output: { ...s.output, dpi: v } }))}
              min={72}
              max={600}
              step={1}
            />
          </div>

          {/* Include Quiet Zone */}
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>Include Quiet Zone</HighlightedLabel></Label>
            <Switch 
              checked={output.includeQuietZone}
              onCheckedChange={(checked) => useQRStore.setState((s) => ({ output: { ...s.output, includeQuietZone: checked } }))}
            />
          </div>

          {/* Extra Formats */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Export As (Additional)</HighlightedLabel></Label>
            <Select 
              value={output.formatExtra} 
              onValueChange={(v) => useQRStore.setState((s) => ({ output: { ...s.output, formatExtra: v as typeof output.formatExtra } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="eps">EPS</SelectItem>
                <SelectItem value="apng">Animated PNG</SelectItem>
                <SelectItem value="animated_webp">Animated WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  )
}
