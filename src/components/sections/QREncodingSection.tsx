import { useQRStore, ECCLevel, EncodingMode } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'
import { useMemo } from 'react'
import { calculateOptimalVersion } from '@/modules/qr-core'

export function QREncodingSection() {
  const { tier, qr, setQrVersion, setQrEcc, setQrEncodingMode, setQrQuietZone, setQrQuietZoneMinEnforce, getPayloadText } = useQRStore()
  
  // Calculate minimum required version for current content
  const minRequiredVersion = useMemo(() => {
    const content = getPayloadText()
    if (!content) return 1
    return calculateOptimalVersion(content, qr.ecc)
  }, [getPayloadText, qr.ecc])
  
  // Handle version change - ensure it doesn't go below minimum (unless 0 = auto)
  const handleVersionChange = (value: number) => {
    if (value === 0) {
      // Auto mode is always allowed
      setQrVersion(0)
    } else if (value < minRequiredVersion) {
      // Jump to minimum required version
      setQrVersion(minRequiredVersion)
    } else {
      setQrVersion(value)
    }
  }

  return (
    <div className="space-y-4">
      {/* Version */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label><HighlightedLabel>Version</HighlightedLabel></Label>
          <span className="text-sm text-muted-foreground">
            {qr.version === 0 ? `Auto (min: ${minRequiredVersion})` : qr.version}
          </span>
        </div>
        <Slider
          value={[qr.version]}
          onValueChange={([v]) => handleVersionChange(v)}
          min={0}
          max={40}
          step={1}
          title="QR code version (0=auto, 1-40 increases size and capacity)"
        />
        <p className="text-xs text-muted-foreground">
          {qr.version === 0 
            ? `Auto-detect (requires v${minRequiredVersion}+ for current content)`
            : qr.version < minRequiredVersion
              ? `⚠️ Version too low! Minimum v${minRequiredVersion} required`
              : `0 = Auto, min v${minRequiredVersion} for current content`
          }
        </p>
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Error Correction</HighlightedLabel></Label>
        <Select value={qr.ecc} onValueChange={(v) => setQrEcc(v as ECCLevel)}>
          <SelectTrigger title="Error correction level - higher = more damage resistance but larger QR code">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">L - Low (7%)</SelectItem>
            <SelectItem value="M">M - Medium (15%)</SelectItem>
            <SelectItem value="Q">Q - Quartile (25%)</SelectItem>
            <SelectItem value="H">H - High (30%)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Higher = more damage resistance, larger QR
        </p>
      </div>

      {/* Quiet Zone / Margin */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label><HighlightedLabel>Quiet Zone (Margin)</HighlightedLabel></Label>
          <span className="text-sm text-muted-foreground">{qr.quietZoneModules} modules</span>
        </div>
        <Slider
          value={[qr.quietZoneModules]}
          onValueChange={([v]) => setQrQuietZone(v)}
          min={0}
          max={10}
          step={1}
          title="Quiet zone margin around QR code (0-10 modules, recommended: 4+)"
        />
      </div>

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Encoding Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Encoding Mode</HighlightedLabel></Label>
            <Select value={qr.encodingMode} onValueChange={(v) => setQrEncodingMode(v as EncodingMode)}>
              <SelectTrigger title="Data encoding mode - Auto selects the most efficient mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Optimal)</SelectItem>
                <SelectItem value="numeric">Numeric Only</SelectItem>
                <SelectItem value="alphanumeric">Alphanumeric</SelectItem>
                <SelectItem value="byte">Byte / UTF-8</SelectItem>
                <SelectItem value="kanji">Kanji</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Quiet Zone Enforce */}
          <div className="flex items-center justify-between">
            <div>
              <Label><HighlightedLabel>Enforce Min Quiet Zone</HighlightedLabel></Label>
              <p className="text-xs text-muted-foreground">Ensure ≥4 module margin</p>
            </div>
            <Switch 
              checked={qr.quietZoneMinEnforce}
              onCheckedChange={setQrQuietZoneMinEnforce}
              title="Enforce minimum 4 module quiet zone for better scanning reliability"
            />
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* Border Modules Extra */}
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <Label>Extra Border Modules</Label>
              <span className="text-sm text-muted-foreground">{qr.borderModulesExtra}</span>
            </div>
            <Slider
              value={[qr.borderModulesExtra]}
              onValueChange={([v]) => useQRStore.setState((s) => ({ qr: { ...s.qr, borderModulesExtra: v } }))}
              min={0}
              max={10}
              step={1}
              title="Additional border modules beyond the quiet zone (0-10)"
            />
            <p className="text-xs text-muted-foreground">
              Additional border beyond quiet zone
            </p>
          </div>
        </>
      )}
    </div>
  )
}
