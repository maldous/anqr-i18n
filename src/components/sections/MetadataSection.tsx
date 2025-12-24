import { useQRStore } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { HighlightedLabel } from '@/lib/search-context'

export function MetadataSection() {
  const { metadata, setMetadata } = useQRStore()

  const addCustomKv = () => {
    setMetadata({ customKv: [...metadata.customKv, { k: '', v: '' }] })
  }

  const updateCustomKv = (index: number, field: 'k' | 'v', value: string) => {
    const newKv = [...metadata.customKv]
    newKv[index] = { ...newKv[index], [field]: value }
    setMetadata({ customKv: newKv })
  }

  const removeCustomKv = (index: number) => {
    setMetadata({ customKv: metadata.customKv.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Title</HighlightedLabel></Label>
        <Input 
          value={metadata.title}
          onChange={(e) => setMetadata({ title: e.target.value })}
          placeholder="QR Code Title"
        />
      </div>

      {/* Author */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Author</HighlightedLabel></Label>
        <Input 
          value={metadata.author}
          onChange={(e) => setMetadata({ author: e.target.value })}
          placeholder="Author name"
        />
      </div>

      {/* Copyright */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Copyright</HighlightedLabel></Label>
        <Input 
          value={metadata.copyright}
          onChange={(e) => setMetadata({ copyright: e.target.value })}
          placeholder="© 2024 Company Name"
        />
      </div>

      {/* License */}
      <div className="space-y-2">
        <Label><HighlightedLabel>License</HighlightedLabel></Label>
        <Input 
          value={metadata.license}
          onChange={(e) => setMetadata({ license: e.target.value })}
          placeholder="CC-BY-4.0"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Description</HighlightedLabel></Label>
        <Textarea 
          value={metadata.description}
          onChange={(e) => setMetadata({ description: e.target.value })}
          placeholder="Description of this QR code..."
          rows={3}
        />
      </div>

      {/* Creation Time */}
      <div className="flex items-center justify-between">
        <Label><HighlightedLabel>Include Creation Time</HighlightedLabel></Label>
        <Switch 
          checked={metadata.creationTime}
          onCheckedChange={(checked) => setMetadata({ creationTime: checked })}
        />
      </div>

      {/* Custom Key-Value Pairs */}
      <div className="space-y-2 pt-2 border-t">
        <Label className="text-muted-foreground"><HighlightedLabel>Custom Metadata</HighlightedLabel></Label>
        {metadata.customKv.map((kv, index) => (
          <div key={index} className="flex gap-2">
            <Input 
              value={kv.k}
              onChange={(e) => updateCustomKv(index, 'k', e.target.value)}
              placeholder="Key"
              className="flex-1"
            />
            <Input 
              value={kv.v}
              onChange={(e) => updateCustomKv(index, 'v', e.target.value)}
              placeholder="Value"
              className="flex-1"
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10"
              onClick={() => removeCustomKv(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button 
          variant="outline" 
          size="sm"
          onClick={addCustomKv}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Custom Field
        </Button>
      </div>
    </div>
  )
}
