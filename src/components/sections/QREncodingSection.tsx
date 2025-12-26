import { useQRStore, ECCLevel, MaskPattern, EncodingMode } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'
import { useMemo } from 'react'
import { calculateOptimalVersion } from '@/modules/qr-core'

export function QREncodingSection() {
  const { tier, qr, setQrVersion, setQrEcc, setQrMask, setQrEncodingMode, setQrQuietZone, setQrQuietZoneMinEnforce, getPayloadText } = useQRStore()
  
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
          <SelectTrigger>
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
        />
      </div>

      {/* Advanced Options */}
      {(tier === 'advanced' || tier === 'professional') && (
        <>
          {/* Mask Pattern */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Mask Pattern</HighlightedLabel></Label>
            <Select 
              value={String(qr.mask)} 
              onValueChange={(v) => setQrMask(v === 'auto' ? 'auto' : parseInt(v) as MaskPattern)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Optimal)</SelectItem>
                <SelectItem value="0">Pattern 0</SelectItem>
                <SelectItem value="1">Pattern 1</SelectItem>
                <SelectItem value="2">Pattern 2</SelectItem>
                <SelectItem value="3">Pattern 3</SelectItem>
                <SelectItem value="4">Pattern 4</SelectItem>
                <SelectItem value="5">Pattern 5</SelectItem>
                <SelectItem value="6">Pattern 6</SelectItem>
                <SelectItem value="7">Pattern 7</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Encoding Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Encoding Mode</HighlightedLabel></Label>
            <Select value={qr.encodingMode} onValueChange={(v) => setQrEncodingMode(v as EncodingMode)}>
              <SelectTrigger>
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

          {/* ECI (Extended Channel Interpretation) */}
          <div className="space-y-2">
            <Label>ECI (Extended Channel Interpretation)</Label>
            <Input 
              type="number"
              min={0}
              max={999999}
              value={qr.eci}
              onChange={(e) => useQRStore.setState((s) => ({ qr: { ...s.qr, eci: parseInt(e.target.value) || 0 } }))}
            />
            <p className="text-xs text-muted-foreground">
              0 = Default, 3 = ISO-8859-1, 26 = UTF-8
            </p>
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
            />
          </div>
        </>
      )}

      {/* Professional Options */}
      {tier === 'professional' && (
        <>
          {/* Structured Append */}
          <div className="space-y-2 pt-2 border-t">
            <Label className="text-muted-foreground"><HighlightedLabel>Structured Append</HighlightedLabel></Label>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Multi-QR</span>
              <Switch 
                checked={qr.structuredAppend.enable}
                onCheckedChange={(checked) => useQRStore.getState().setQrStructuredAppend({ enable: checked })}
              />
            </div>
            {qr.structuredAppend.enable && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="space-y-1">
                  <Label className="text-xs">Index</Label>
                  <Input 
                    type="number"
                    min={0}
                    value={qr.structuredAppend.index}
                    onChange={(e) => useQRStore.getState().setQrStructuredAppend({ index: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Count</Label>
                  <Input 
                    type="number"
                    min={1}
                    max={16}
                    value={qr.structuredAppend.count}
                    onChange={(e) => useQRStore.getState().setQrStructuredAppend({ count: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Parity</Label>
                  <Input 
                    type="number"
                    min={0}
                    max={255}
                    value={qr.structuredAppend.parity}
                    onChange={(e) => useQRStore.getState().setQrStructuredAppend({ parity: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* FNC1 / GS1 */}
          <div className="space-y-2">
            <Label><HighlightedLabel>FNC1 Mode (GS1)</HighlightedLabel></Label>
            <Select value={qr.fnc1} onValueChange={(v) => useQRStore.setState((s) => ({ qr: { ...s.qr, fnc1: v as typeof qr.fnc1 } }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Off</SelectItem>
                <SelectItem value="gs1_first">GS1 First Position</SelectItem>
                <SelectItem value="gs1_second">GS1 Second Position</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Border Modules Extra */}
          <div className="space-y-2">
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
            />
            <p className="text-xs text-muted-foreground">
              Additional border beyond quiet zone
            </p>
          </div>

          {/* Micro QR / rMQR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Micro QR</HighlightedLabel></Label>
              <Switch 
                checked={qr.microQr}
                onCheckedChange={(checked) => useQRStore.setState((s) => ({ qr: { ...s.qr, microQr: checked } }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>rMQR (Rectangular)</HighlightedLabel></Label>
              <Switch 
                checked={qr.rmQr}
                onCheckedChange={(checked) => useQRStore.setState((s) => ({ qr: { ...s.qr, rmQr: checked } }))}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
