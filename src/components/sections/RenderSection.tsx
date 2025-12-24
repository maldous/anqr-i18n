import { useQRStore, ModuleStyle, FinderStyle, GapMode, GradientType, FrameStyle, AlignmentStyle, TimingStyle } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { HighlightedLabel } from '@/lib/search-context'

export function RenderSection() {
  const { 
    tier, render, 
    setRenderModulePx, setRenderModuleGap, setRenderModuleStyle, setRenderFinderStyle,
    setRenderFgColor, setRenderBgColor, setRenderBgTransparent, setRenderGapMode,
    setRenderCornerRadius, setRenderFrameStyle, setRenderFrameText, setRenderGradient,
    setRenderAlignmentStyle, setRenderTimingStyle
  } = useQRStore()
  
  const [newPaletteColor, setNewPaletteColor] = useState('#000000')

  return (
    <div className="space-y-4">
      {/* Module Size */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label><HighlightedLabel>Module Size</HighlightedLabel></Label>
          <span className="text-sm text-muted-foreground">{render.modulePx}px</span>
        </div>
        <Slider
          value={[render.modulePx]}
          onValueChange={([v]) => setRenderModulePx(v)}
          min={2}
          max={20}
          step={1}
        />
      </div>

      {/* Module Gap */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label><HighlightedLabel>Module Gap</HighlightedLabel></Label>
          <span className="text-sm text-muted-foreground">{render.moduleGapPercent}%</span>
        </div>
        <Slider
          value={[render.moduleGapPercent]}
          onValueChange={([v]) => setRenderModuleGap(v)}
          min={0}
          max={30}
          step={1}
        />
      </div>

      {/* Module Style */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Module Style</HighlightedLabel></Label>
        <Select value={render.moduleStyle} onValueChange={(v) => setRenderModuleStyle(v as ModuleStyle)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="dots">Dots</SelectItem>
            <SelectItem value="diamond">Diamond</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Finder Style */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Finder Pattern Style</HighlightedLabel></Label>
        <Select value={render.finderStyle} onValueChange={(v) => setRenderFinderStyle(v as FinderStyle)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alignment Pattern Style */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Alignment Pattern Style</HighlightedLabel></Label>
        <Select value={render.alignmentStyle} onValueChange={(v) => setRenderAlignmentStyle(v as AlignmentStyle)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match_finder">Match Finder</SelectItem>
            <SelectItem value="square">Square</SelectItem>
            <SelectItem value="rounded">Rounded</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timing Pattern Style */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Timing Pattern Style</HighlightedLabel></Label>
        <Select value={render.timingStyle} onValueChange={(v) => setRenderTimingStyle(v as TimingStyle)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match_module">Match Module</SelectItem>
            <SelectItem value="solid">Solid</SelectItem>
            <SelectItem value="dashed">Dashed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Colors</HighlightedLabel></Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground"><HighlightedLabel>Foreground</HighlightedLabel></Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={render.fgColor}
                onChange={(e) => setRenderFgColor(e.target.value)}
                className="w-10 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={render.fgColor}
                onChange={(e) => setRenderFgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground"><HighlightedLabel>Background</HighlightedLabel></Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={render.bgColor}
                onChange={(e) => setRenderBgColor(e.target.value)}
                className="w-10 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={render.bgColor}
                onChange={(e) => setRenderBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Background */}
      <div className="flex items-center justify-between">
        <Label><HighlightedLabel>Transparent Background</HighlightedLabel></Label>
        <Switch 
          checked={render.bgTransparent}
          onCheckedChange={setRenderBgTransparent}
        />
      </div>

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Gap Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Gap Mode</HighlightedLabel></Label>
            <Select value={render.gapMode} onValueChange={(v) => setRenderGapMode(v as GapMode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="inset">Inset</SelectItem>
                <SelectItem value="stroke">Stroke</SelectItem>
                <SelectItem value="negative_space">Negative Space</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Corner Radius */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Corner Radius</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{render.cornerRadius}%</span>
            </div>
            <Slider
              value={[render.cornerRadius]}
              onValueChange={([v]) => setRenderCornerRadius(v)}
              min={0}
              max={100}
              step={5}
            />
          </div>

          {/* Gradient */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Gradient</HighlightedLabel></Label>
            <Select value={render.gradient.type} onValueChange={(v) => setRenderGradient({ type: v as GradientType })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
                <SelectItem value="conic">Conic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Eye Styles */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Eye Outer Style</HighlightedLabel></Label>
            <Select 
              value={render.eyeOuterStyle} 
              onValueChange={(v) => useQRStore.setState((s) => ({ render: { ...s.render, eyeOuterStyle: v as FinderStyle } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label><HighlightedLabel>Eye Inner Style</HighlightedLabel></Label>
            <Select 
              value={render.eyeInnerStyle} 
              onValueChange={(v) => useQRStore.setState((s) => ({ render: { ...s.render, eyeInnerStyle: v as FinderStyle } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Frame */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Frame Style</HighlightedLabel></Label>
            <Select value={render.frameStyle} onValueChange={(v) => setRenderFrameStyle(v as FrameStyle)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="rounded_frame">Rounded Frame</SelectItem>
                <SelectItem value="sticker">Sticker</SelectItem>
                <SelectItem value="tag">Tag</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {render.frameStyle !== 'none' && (
            <div className="space-y-2">
              <Label><HighlightedLabel>Frame Text</HighlightedLabel></Label>
              <Input 
                value={render.frameText}
                onChange={(e) => setRenderFrameText(e.target.value)}
                placeholder="Scan Me!"
              />
            </div>
          )}

          {/* Dot Rotation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Dot Rotation</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{render.dotRotationDeg}°</span>
            </div>
            <Slider
              value={[render.dotRotationDeg]}
              onValueChange={([v]) => useQRStore.setState((s) => ({ render: { ...s.render, dotRotationDeg: v } }))}
              min={0}
              max={360}
              step={15}
            />
          </div>

          {/* Eye Scale */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Eye Scale</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{render.eyeScale}%</span>
            </div>
            <Slider
              value={[render.eyeScale]}
              onValueChange={([v]) => useQRStore.setState((s) => ({ render: { ...s.render, eyeScale: v } }))}
              min={50}
              max={150}
              step={5}
            />
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* Crisp Edges */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Crisp Edges</HighlightedLabel></Label>
              <Switch 
                checked={render.crispEdges}
                onCheckedChange={(checked) => useQRStore.setState((s) => ({ render: { ...s.render, crispEdges: checked } }))}
              />
            </div>
            <p className="text-xs text-muted-foreground">Use image-rendering: pixelated for sharp edges</p>
          </div>

          {/* Pixel Snap */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Pixel Snap</HighlightedLabel></Label>
            <Select 
              value={render.pixelSnap} 
              onValueChange={(v) => useQRStore.setState((s) => ({ render: { ...s.render, pixelSnap: v as 'floor' | 'round' | 'ceil' } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="floor">Floor</SelectItem>
                <SelectItem value="round">Round</SelectItem>
                <SelectItem value="ceil">Ceil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Per-Module Color Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Per-Module Color Mode</HighlightedLabel></Label>
            <Select 
              value={render.perModuleColorMode} 
              onValueChange={(v) => useQRStore.setState((s) => ({ render: { ...s.render, perModuleColorMode: v as typeof render.perModuleColorMode } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="by_brightness">By Brightness</SelectItem>
                <SelectItem value="by_position">By Position</SelectItem>
                <SelectItem value="by_overlay">By Overlay</SelectItem>
                <SelectItem value="by_cluster">By Cluster</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Color Palette */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Color Palette</HighlightedLabel></Label>
            <div className="flex flex-wrap gap-2">
              {render.palette.map((color, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div 
                    className="w-6 h-6 rounded border cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'color'
                      input.value = color
                      input.onchange = (e) => {
                        const newPalette = [...render.palette]
                        newPalette[index] = (e.target as HTMLInputElement).value
                        useQRStore.setState((s) => ({ render: { ...s.render, palette: newPalette } }))
                      }
                      input.click()
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      const newPalette = render.palette.filter((_, i) => i !== index)
                      useQRStore.setState((s) => ({ render: { ...s.render, palette: newPalette } }))
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                type="color"
                value={newPaletteColor}
                onChange={(e) => setNewPaletteColor(e.target.value)}
                className="w-10 h-8 p-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  useQRStore.setState((s) => ({ render: { ...s.render, palette: [...s.render.palette, newPaletteColor] } }))
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Color
              </Button>
            </div>
          </div>

          {/* Contrast Guard */}
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>Contrast Guard</HighlightedLabel></Label>
            <Switch 
              checked={render.contrastGuard}
              onCheckedChange={(checked) => useQRStore.setState((s) => ({ render: { ...s.render, contrastGuard: checked } }))}
            />
          </div>

          {render.contrastGuard && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label><HighlightedLabel>Min Contrast Ratio</HighlightedLabel></Label>
                <span className="text-sm text-muted-foreground">{render.minContrastRatio}:1</span>
              </div>
              <Slider
                value={[render.minContrastRatio]}
                onValueChange={([v]) => useQRStore.setState((s) => ({ render: { ...s.render, minContrastRatio: v } }))}
                min={1}
                max={21}
                step={0.5}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
