import { useQRStore, SafetyMode } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'

export function SafetySection() {
  const { safety, qa, auto, setSafetyMode, setSafetyMinModulePx, setSafetyLocks, setQaContrastCheck, setQaSimulateBlur, setQaShowHeatmap, setAutoPickVersion, setAutoPickEcc } = useQRStore()

  return (
    <div className="space-y-4">
      {/* Safety Mode */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Safety Mode</HighlightedLabel></Label>
        <Select value={safety.mode} onValueChange={(v) => setSafetyMode(v as SafetyMode)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="off">Off</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="strict">Strict</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {safety.mode !== 'off' && (
        <>
          {/* Min Module Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Min Module Size</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{safety.minModulePx}px</span>
            </div>
            <Slider
              value={[safety.minModulePx]}
              onValueChange={([v]) => setSafetyMinModulePx(v)}
              min={1}
              max={10}
              step={1}
            />
          </div>

          {/* Min Quiet Zone */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Min Quiet Zone</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{safety.minQuietZoneModules} modules</span>
            </div>
            <Slider
              value={[safety.minQuietZoneModules]}
              onValueChange={([v]) => useQRStore.setState((s) => ({ safety: { ...s.safety, minQuietZoneModules: v } }))}
              min={1}
              max={10}
              step={1}
            />
          </div>

          {/* Locks */}
          <div className="space-y-2 pt-2 border-t">
            <Label className="text-muted-foreground"><HighlightedLabel>Protection Locks</HighlightedLabel></Label>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>Lock Finders</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockFinders}
                onCheckedChange={(checked) => setSafetyLocks({ lockFinders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>Lock Timing</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockTiming}
                onCheckedChange={(checked) => setSafetyLocks({ lockTiming: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>Lock Alignment</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockAlign}
                onCheckedChange={(checked) => setSafetyLocks({ lockAlign: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>Lock Format Info</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockFormat}
                onCheckedChange={(checked) => setSafetyLocks({ lockFormat: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>Lock Version Info</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockVersion}
                onCheckedChange={(checked) => setSafetyLocks({ lockVersion: checked })}
              />
            </div>
          </div>
        </>
      )}

      {/* QA / Analysis */}
      <div className="space-y-2 pt-2 border-t">
        <Label className="text-muted-foreground"><HighlightedLabel>Quality Analysis</HighlightedLabel></Label>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>Contrast Check</HighlightedLabel></Label>
          <Switch 
            checked={qa.contrastCheck}
            onCheckedChange={setQaContrastCheck}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>Show Heatmap</HighlightedLabel></Label>
          <Switch 
            checked={qa.showHeatmap}
            onCheckedChange={setQaShowHeatmap}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Simulate Blur</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{qa.simulateBlurPx}px</span>
          </div>
          <Slider
            value={[qa.simulateBlurPx]}
            onValueChange={([v]) => setQaSimulateBlur(v)}
            min={0}
            max={10}
            step={0.5}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Simulate Noise</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{qa.simulateNoise}%</span>
          </div>
          <Slider
            value={[qa.simulateNoise]}
            onValueChange={([v]) => useQRStore.setState((s) => ({ qa: { ...s.qa, simulateNoise: v } }))}
            min={0}
            max={50}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Simulate Rotation</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{qa.simulateRotationDeg}°</span>
          </div>
          <Slider
            value={[qa.simulateRotationDeg]}
            onValueChange={([v]) => useQRStore.setState((s) => ({ qa: { ...s.qa, simulateRotationDeg: v } }))}
            min={0}
            max={45}
            step={1}
          />
        </div>
      </div>

      {/* Auto-Tuning */}
      <div className="space-y-2 pt-2 border-t">
        <Label className="text-muted-foreground"><HighlightedLabel>Auto-Tuning</HighlightedLabel></Label>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>Auto-Pick Version</HighlightedLabel></Label>
          <Switch 
            checked={auto.pickVersion}
            onCheckedChange={setAutoPickVersion}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>Auto-Pick ECC</HighlightedLabel></Label>
          <Switch 
            checked={auto.pickEcc}
            onCheckedChange={setAutoPickEcc}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm"><HighlightedLabel>Auto-Reduce Intensity</HighlightedLabel></Label>
            <p className="text-xs text-muted-foreground">Until scannable</p>
          </div>
          <Switch 
            checked={auto.reduceIntensityUntilSafe}
            onCheckedChange={(checked) => useQRStore.setState((s) => ({ auto: { ...s.auto, reduceIntensityUntilSafe: checked } }))}
          />
        </div>
      </div>
    </div>
  )
}
