import { useQRStore } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Link, Code } from 'lucide-react'
import { HighlightedLabel } from '@/lib/search-context'

export function ShareSection() {
  const { share, setShare } = useQRStore()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-4">
      {/* Direct Link */}
      <div className="flex items-center justify-between">
        <div>
          <Label><HighlightedLabel>Direct Link</HighlightedLabel></Label>
          <p className="text-xs text-muted-foreground">Generate shareable URL</p>
        </div>
        <Switch 
          checked={share.directLink}
          onCheckedChange={(checked) => setShare({ directLink: checked })}
        />
      </div>

      {share.directLink && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input 
              readOnly
              value={window.location.href}
              className="flex-1 text-xs"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => copyToClipboard(window.location.href)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Embed HTML */}
      <div className="flex items-center justify-between">
        <div>
          <Label><HighlightedLabel>Embed HTML</HighlightedLabel></Label>
          <p className="text-xs text-muted-foreground">Generate embed code</p>
        </div>
        <Switch 
          checked={share.embedHtml}
          onCheckedChange={(checked) => setShare({ embedHtml: checked })}
        />
      </div>

      {share.embedHtml && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input 
              readOnly
              value={`<img src="${window.location.href}" alt="QR Code" />`}
              className="flex-1 text-xs font-mono"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => copyToClipboard(`<img src="${window.location.href}" alt="QR Code" />`)}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Encode More Params */}
      <div className="flex items-center justify-between">
        <div>
          <Label><HighlightedLabel>Encode All Parameters</HighlightedLabel></Label>
          <p className="text-xs text-muted-foreground">Include all settings in URL</p>
        </div>
        <Switch 
          checked={share.encodeMoreParams}
          onCheckedChange={(checked) => setShare({ encodeMoreParams: checked })}
        />
      </div>

      {/* Quick Share Buttons */}
      <div className="pt-2 border-t space-y-2">
        <Label className="text-muted-foreground"><HighlightedLabel>Quick Share</HighlightedLabel></Label>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Link className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  )
}
