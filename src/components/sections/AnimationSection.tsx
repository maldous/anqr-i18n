import { useQRStore } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'

export function AnimationSection() {
  const { 
    tier, animation,
    setAnimationSpeedMs, setAnimationLoop, setAnimationBounce,
    setAnimationStartFrame, setAnimationMaxFrames, setAnimationFrameStep
  } = useQRStore()

  return (
    <div className="space-y-4">
      {/* Speed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label><HighlightedLabel>Frame Speed</HighlightedLabel></Label>
          <span className="text-sm text-muted-foreground">{animation.speedMs}ms</span>
        </div>
        <Slider
          value={[animation.speedMs]}
          onValueChange={([v]) => setAnimationSpeedMs(v)}
          min={20}
          max={500}
          step={10}
        />
      </div>

      {/* Loop */}
      <div className="flex items-center justify-between">
        <Label><HighlightedLabel>Loop Animation</HighlightedLabel></Label>
        <Switch 
          checked={animation.loop}
          onCheckedChange={setAnimationLoop}
        />
      </div>

      {/* Bounce / Ping-Pong */}
      <div className="flex items-center justify-between">
        <Label><HighlightedLabel>Bounce (Ping-Pong)</HighlightedLabel></Label>
        <Switch 
          checked={animation.bounce}
          onCheckedChange={setAnimationBounce}
        />
      </div>

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Start Frame */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Start Frame</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{animation.startFrame}</span>
            </div>
            <Slider
              value={[animation.startFrame]}
              onValueChange={([v]) => setAnimationStartFrame(v)}
              min={0}
              max={100}
              step={1}
            />
          </div>

          {/* Max Frames */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Max Frames</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{animation.maxFrames}</span>
            </div>
            <Slider
              value={[animation.maxFrames]}
              onValueChange={([v]) => setAnimationMaxFrames(v)}
              min={1}
              max={200}
              step={1}
            />
          </div>

          {/* Frame Step */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Frame Step</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">Every {animation.frameStep} frame(s)</span>
            </div>
            <Slider
              value={[animation.frameStep]}
              onValueChange={([v]) => setAnimationFrameStep(v)}
              min={1}
              max={10}
              step={1}
            />
          </div>

          {/* Interpolation */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Interpolation</HighlightedLabel></Label>
            <Select 
              value={animation.interpolate} 
              onValueChange={(v) => useQRStore.setState((s) => ({ animation: { ...s.animation, interpolate: v as typeof animation.interpolate } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="crossfade">Crossfade</SelectItem>
                <SelectItem value="morph">Morph</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* Temporal Dither */}
          <div className="space-y-2 pt-2 border-t">
            <Label><HighlightedLabel>Temporal Dither</HighlightedLabel></Label>
            <Select 
              value={animation.temporalDither} 
              onValueChange={(v) => useQRStore.setState((s) => ({ animation: { ...s.animation, temporalDither: v as typeof animation.temporalDither } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="blue_noise">Blue Noise</SelectItem>
                <SelectItem value="flicker_safe">Flicker Safe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Animation Pattern */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Generated Pattern</HighlightedLabel></Label>
            <Select 
              value={animation.pattern} 
              onValueChange={(v) => useQRStore.setState((s) => ({ animation: { ...s.animation, pattern: v as typeof animation.pattern } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="pulse">Pulse</SelectItem>
                <SelectItem value="wave">Wave</SelectItem>
                <SelectItem value="scanline">Scanline</SelectItem>
                <SelectItem value="shimmer">Shimmer</SelectItem>
                <SelectItem value="drift">Drift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Module Jitter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Module Jitter</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{animation.moduleJitterPx}px</span>
            </div>
            <Slider
              value={[animation.moduleJitterPx]}
              onValueChange={([v]) => useQRStore.setState((s) => ({ animation: { ...s.animation, moduleJitterPx: v } }))}
              min={0}
              max={5}
              step={0.5}
            />
            <p className="text-xs text-muted-foreground">
              ⚠️ May affect scannability
            </p>
          </div>

          {/* Color Cycle */}
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>Color Cycle</HighlightedLabel></Label>
            <Switch 
              checked={animation.colorCycle}
              onCheckedChange={(checked) => useQRStore.setState((s) => ({ animation: { ...s.animation, colorCycle: checked } }))}
            />
          </div>

          {/* Seed */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Random Seed</HighlightedLabel></Label>
            <Input 
              type="number"
              value={animation.seed}
              onChange={(e) => useQRStore.setState((s) => ({ animation: { ...s.animation, seed: parseInt(e.target.value) || 0 } }))}
            />
          </div>
        </>
      )}
    </div>
  )
}
