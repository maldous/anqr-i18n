import { useQRStore } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Link, Code, Check, MessageCircle } from 'lucide-react'
import { HighlightedLabel } from '@/lib/search-context'
import { useState, useMemo } from 'react'
import { 
  copyToClipboard, 
  getShareableUrl, 
  generateImageEmbed, 
  generateMarkdownEmbed,
  getSocialShareUrls 
} from '@/modules/share-utils'

export function ShareSection() {
  const { share, setShare, getPayloadText, qr, render, overlay } = useQRStore()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Build shareable URL from current config
  const shareableUrl = useMemo(() => {
    const config = {
      data: getPayloadText(),
      ec: qr.ecc,
      version: qr.version !== 0 ? qr.version : undefined,
      size: render.modulePx !== 8 ? render.modulePx : undefined,
      margin: qr.quietZoneModules !== 4 ? qr.quietZoneModules : undefined,
      fg: render.fgColor !== '#000000' ? render.fgColor : undefined,
      bg: render.bgColor !== '#ffffff' ? render.bgColor : undefined,
      style: render.moduleStyle !== 'square' ? render.moduleStyle : undefined,
      finder: render.finderStyle !== 'square' ? render.finderStyle : undefined,
      mode: overlay.enabled ? overlay.mode : undefined,
      intensity: overlay.enabled && overlay.intensity !== 50 ? overlay.intensity : undefined,
      // Include overlay URL if overlay is enabled and URL exists
      overlayUrl: overlay.enabled && overlay.url ? overlay.url : undefined,
    }
    return getShareableUrl(config)
  }, [getPayloadText, qr, render, overlay])

  const embedCode = useMemo(() => {
    return generateImageEmbed(shareableUrl, 'QR Code', { width: 200, height: 200 })
  }, [shareableUrl])

  const markdownEmbed = useMemo(() => {
    return generateMarkdownEmbed(shareableUrl, 'QR Code')
  }, [shareableUrl])

  const socialUrls = useMemo(() => {
    return getSocialShareUrls(shareableUrl, 'Check out this QR code!')
  }, [shareableUrl])

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
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
              value={shareableUrl}
              className="flex-1 text-xs"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleCopy(shareableUrl, 'link')}
            >
              {copiedField === 'link' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
              value={embedCode}
              className="flex-1 text-xs font-mono"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleCopy(embedCode, 'embed')}
            >
              {copiedField === 'embed' ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex gap-2">
            <Input 
              readOnly
              value={markdownEmbed}
              className="flex-1 text-xs font-mono"
              placeholder="Markdown"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleCopy(markdownEmbed, 'markdown')}
            >
              {copiedField === 'markdown' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleCopy(shareableUrl, 'quick')}
          >
            {copiedField === 'quick' ? <Check className="h-4 w-4 mr-2" /> : <Link className="h-4 w-4 mr-2" />}
            {copiedField === 'quick' ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(socialUrls.twitter, '_blank')}
          >
            X/Twitter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(socialUrls.whatsapp, '_blank')}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
