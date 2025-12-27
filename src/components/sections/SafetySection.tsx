import { useQRStore, SafetyMode } from '@/store/qr-store'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'

export function SafetySection() {
  const { safety, qa, auto, setSafetyMode, setSafetyMinModulePx, setSafetyLocks, setQaContrastCheck, setQaSimulateBlur, setQaShowHeatmap, setAutoPickVersion, setAutoPickEcc } = useQRStore()
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      {/* Safety Mode */}
      <div className="space-y-2">
        <Label><HighlightedLabel>{t('safety.safetyMode')}</HighlightedLabel></Label>
        <Select value={safety.mode} onValueChange={(v) => setSafetyMode(v as SafetyMode)}>
          <SelectTrigger title={t('hints.safetyMode')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="off">{t('safety.off')}</SelectItem>
            <SelectItem value="balanced">{t('safety.balanced')}</SelectItem>
            <SelectItem value="strict">{t('safety.strict')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {safety.mode !== 'off' && (
        <>
          {/* Min Module Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>{t('safety.minModuleSize')}</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{t('qr.nPx', { count: safety.minModulePx })}</span>
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
              <Label><HighlightedLabel>{t('safety.minQuietZone')}</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{t('qr.nModules', { count: safety.minQuietZoneModules })}</span>
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
            <Label className="text-muted-foreground"><HighlightedLabel>{t('safety.protectionLocks')}</HighlightedLabel></Label>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>{t('safety.lockFinders')}</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockFinders}
                onCheckedChange={(checked) => setSafetyLocks({ lockFinders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>{t('safety.lockTiming')}</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockTiming}
                onCheckedChange={(checked) => setSafetyLocks({ lockTiming: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>{t('safety.lockAlignment')}</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockAlign}
                onCheckedChange={(checked) => setSafetyLocks({ lockAlign: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>{t('safety.lockFormat')}</HighlightedLabel></Label>
              <Switch 
                checked={safety.lockFormat}
                onCheckedChange={(checked) => setSafetyLocks({ lockFormat: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm"><HighlightedLabel>{t('safety.lockVersion')}</HighlightedLabel></Label>
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
        <Label className="text-muted-foreground"><HighlightedLabel>{t('safety.qualityAnalysis')}</HighlightedLabel></Label>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>{t('safety.contrastCheck')}</HighlightedLabel></Label>
          <Switch 
            checked={qa.contrastCheck}
            onCheckedChange={setQaContrastCheck}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>{t('safety.showHeatmap')}</HighlightedLabel></Label>
          <Switch 
            checked={qa.showHeatmap}
            onCheckedChange={setQaShowHeatmap}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>{t('safety.simulateBlur')}</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{t('qr.nPx', { count: qa.simulateBlurPx })}</span>
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
            <Label className="text-sm"><HighlightedLabel>{t('safety.simulateNoise')}</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{t('qr.nPercent', { count: qa.simulateNoise })}</span>
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
            <Label className="text-sm"><HighlightedLabel>{t('safety.simulateRotation')}</HighlightedLabel></Label>
            <span className="text-sm text-muted-foreground">{t('qr.nDegrees', { count: qa.simulateRotationDeg })}</span>
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
        <Label className="text-muted-foreground"><HighlightedLabel>{t('safety.autoTuning')}</HighlightedLabel></Label>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>{t('safety.autoPickVersion')}</HighlightedLabel></Label>
          <Switch 
            checked={auto.pickVersion}
            onCheckedChange={setAutoPickVersion}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm"><HighlightedLabel>{t('safety.autoPickEcc')}</HighlightedLabel></Label>
          <Switch 
            checked={auto.pickEcc}
            onCheckedChange={setAutoPickEcc}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm"><HighlightedLabel>{t('safety.autoReduceIntensity')}</HighlightedLabel></Label>
            <p className="text-xs text-muted-foreground">{t('safety.untilScannable')}</p>
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
