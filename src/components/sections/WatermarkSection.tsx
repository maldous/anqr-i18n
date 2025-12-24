import { useQRStore } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'
import { useRef } from 'react'
import { HighlightedLabel } from '@/lib/search-context'

export function WatermarkSection() {
  const { watermark, setWatermarkEnabled, setWatermarkKind, setWatermarkText, setWatermarkPosition, setWatermarkOpacity } = useQRStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      useQRStore.setState((s) => ({ watermark: { ...s.watermark, image: file } }))
    }
  }

  return (
    <div className="space-y-4">
      {/* Enable */}
      <div className="flex items-center justify-between">
        <Label><HighlightedLabel>Enable Watermark</HighlightedLabel></Label>
        <Switch 
          checked={watermark.enabled}
          onCheckedChange={setWatermarkEnabled}
        />
      </div>

      {watermark.enabled && (
        <>
          {/* Kind */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Type</HighlightedLabel></Label>
            <Select value={watermark.kind} onValueChange={(v) => setWatermarkKind(v as typeof watermark.kind)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="pattern">Pattern</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text */}
          {watermark.kind === 'text' && (
            <div className="space-y-2">
              <Label><HighlightedLabel>Text</HighlightedLabel></Label>
              <Input 
                value={watermark.text}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="© Company Name"
              />
            </div>
          )}

          {/* Image Upload */}
          {watermark.kind === 'image' && (
            <div className="space-y-2">
              <Label><HighlightedLabel>Image</HighlightedLabel></Label>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {watermark.image ? (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/50">
                  <span className="flex-1 text-sm truncate">{watermark.image.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => useQRStore.setState((s) => ({ watermark: { ...s.watermark, image: null } }))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              )}
            </div>
          )}

          {/* Position */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Position</HighlightedLabel></Label>
            <Select value={watermark.position} onValueChange={(v) => setWatermarkPosition(v as typeof watermark.position)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="corners">Corners</SelectItem>
                <SelectItem value="edges">Edges</SelectItem>
                <SelectItem value="behind">Behind QR</SelectItem>
                <SelectItem value="quiet_zone">Quiet Zone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label><HighlightedLabel>Opacity</HighlightedLabel></Label>
              <span className="text-sm text-muted-foreground">{watermark.opacity}%</span>
            </div>
            <Slider
              value={[watermark.opacity]}
              onValueChange={([v]) => setWatermarkOpacity(v)}
              min={0}
              max={100}
              step={5}
            />
          </div>

          {/* Blend Mode */}
          <div className="space-y-2">
            <Label><HighlightedLabel>Blend Mode</HighlightedLabel></Label>
            <Select 
              value={watermark.blend} 
              onValueChange={(v) => useQRStore.setState((s) => ({ watermark: { ...s.watermark, blend: v as typeof watermark.blend } }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="multiply">Multiply</SelectItem>
                <SelectItem value="screen">Screen</SelectItem>
                <SelectItem value="overlay">Overlay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </div>
  )
}
