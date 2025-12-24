import { useQRStore, PayloadKind } from '@/store/qr-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'
import { useState, useEffect } from 'react'

// Payload kinds organized by category and tier
// basic = Core only
// advanced = Core + Contact + Location & Network + Calendar + Documents & Media + Social & Messaging
// professional = Everything (adds Payments, Marketing, Enterprise)
const PAYLOAD_CATEGORIES = [
  {
    group: 'Core',
    tier: 'basic' as const,
    items: [
      { value: 'plain_text' as PayloadKind, label: 'Plain Text' },
      { value: 'url' as PayloadKind, label: 'URL' },
    ]
  },
  {
    group: 'Contact',
    tier: 'advanced' as const,
    items: [
      { value: 'tel' as PayloadKind, label: 'Phone Number' },
      { value: 'email' as PayloadKind, label: 'Email' },
      { value: 'sms' as PayloadKind, label: 'SMS / MMS' },
      { value: 'vcard' as PayloadKind, label: 'vCard Contact' },
      { value: 'mecard' as PayloadKind, label: 'MeCard Contact' },
      { value: 'bizcard' as PayloadKind, label: 'BizCard (Legacy)' },
    ]
  },
  {
    group: 'Location & Network',
    tier: 'advanced' as const,
    items: [
      { value: 'geo' as PayloadKind, label: 'Geo Location' },
      { value: 'wifi' as PayloadKind, label: 'WiFi Network' },
    ]
  },
  {
    group: 'Calendar',
    tier: 'advanced' as const,
    items: [
      { value: 'event' as PayloadKind, label: 'iCalendar Event' },
      { value: 'event_rsvp' as PayloadKind, label: 'Event RSVP Link' },
      { value: 'calendar_subscription' as PayloadKind, label: 'Calendar Subscribe' },
    ]
  },
  {
    group: 'Documents & Media',
    tier: 'advanced' as const,
    items: [
      { value: 'file_url' as PayloadKind, label: 'File / Document URL' },
      { value: 'cloud_link' as PayloadKind, label: 'Cloud Storage Link' },
    ]
  },
  {
    group: 'Social & Messaging',
    tier: 'advanced' as const,
    items: [
      { value: 'social_profile' as PayloadKind, label: 'Social Profile' },
      { value: 'messaging_link' as PayloadKind, label: 'WhatsApp / Telegram / Signal' },
    ]
  },
  {
    group: 'Payments (Open Specs)',
    tier: 'professional' as const,
    items: [
      { value: 'epc_sepa' as PayloadKind, label: 'EPC / SEPA (EU)' },
      { value: 'upi' as PayloadKind, label: 'UPI (India)' },
      { value: 'paynow' as PayloadKind, label: 'PayNow (Singapore)' },
      { value: 'promptpay' as PayloadKind, label: 'PromptPay (Thailand)' },
      { value: 'pix' as PayloadKind, label: 'PIX (Brazil)' },
      { value: 'crypto' as PayloadKind, label: 'Crypto (BTC, ETH, etc.)' },
    ]
  },
  {
    group: 'Marketing',
    tier: 'professional' as const,
    items: [
      { value: 'utm_link' as PayloadKind, label: 'UTM Campaign Link' },
      { value: 'short_link' as PayloadKind, label: 'Short Link Redirect' },
    ]
  },
  {
    group: 'Enterprise',
    tier: 'professional' as const,
    items: [
      { value: 'gs1_digital_link' as PayloadKind, label: 'GS1 Digital Link' },
      { value: 'app_link' as PayloadKind, label: 'App Deep Link (Android/iOS)' },
      { value: 'custom' as PayloadKind, label: 'Custom Format' },
    ]
  },
]

// Legacy flat list for backward compatibility
const PAYLOAD_KINDS: { value: PayloadKind; label: string; tier: 'basic' | 'advanced' | 'professional' }[] = 
  PAYLOAD_CATEGORIES.flatMap(cat => 
    cat.items.map(item => ({ value: item.value, label: item.label, tier: cat.tier }))
  )

export function PayloadSection() {
  const { tier, payload, setPayloadKind, setPayloadText, setPayloadUrl, setPayloadTel, setPayloadEmail, setPayloadSms, setPayloadGeo, setPayloadWifi, setPayloadVCard, setPayloadMeCard, setPayloadEvent, setPayloadCrypto, setPayloadOtpAuth, setPayloadValidation } = useQRStore()
  const [showStartupHighlight, setShowStartupHighlight] = useState(false)

  // Show startup highlight only once on initial mount
  useEffect(() => {
    const hasSeenHighlight = sessionStorage.getItem('anqr-seen-highlight')
    if (!hasSeenHighlight) {
      setShowStartupHighlight(true)
      sessionStorage.setItem('anqr-seen-highlight', 'true')
      // Remove highlight after 3 seconds
      const timer = setTimeout(() => setShowStartupHighlight(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const availableKinds = PAYLOAD_KINDS.filter(k => {
    if (k.tier === 'basic') return true
    if (k.tier === 'advanced') return tier === 'advanced' || tier === 'professional'
    if (k.tier === 'professional') return tier === 'professional'
    return false
  })

  return (
    <div className="space-y-4">
      {/* Payload Type Selector */}
      <div className="space-y-2">
        <Label><HighlightedLabel>Content Type</HighlightedLabel></Label>
        <Select value={payload.kind} onValueChange={(v) => setPayloadKind(v as PayloadKind)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {PAYLOAD_CATEGORIES.filter(cat => {
              if (cat.tier === 'basic') return true
              if (cat.tier === 'advanced') return tier === 'advanced' || tier === 'professional'
              if (cat.tier === 'professional') return tier === 'professional'
              return false
            }).map(cat => (
              <SelectGroup key={cat.group}>
                <SelectLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 bg-muted/50">{cat.group}</SelectLabel>
                {cat.items.map(item => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plain Text Input */}
      {payload.kind === 'plain_text' && (
        <div className={`space-y-2 ${showStartupHighlight ? 'p-1 -m-1' : ''}`}>
          <Label><HighlightedLabel>Text Content</HighlightedLabel></Label>
          <Textarea 
            value={payload.text} 
            onChange={(e) => {
              setPayloadText(e.target.value)
              setShowStartupHighlight(false)
            }}
            onFocus={() => setShowStartupHighlight(false)}
            placeholder="Enter text to encode..."
            rows={4}
            className={showStartupHighlight ? 'ring-4 ring-primary/50 ring-offset-2 ring-offset-background animate-pulse' : ''}
            autoFocus={showStartupHighlight}
          />
        </div>
      )}

      {/* URL Input */}
      {payload.kind === 'url' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>URL</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.url.href} 
              onChange={(e) => setPayloadUrl({ href: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
          {(tier === 'advanced' || tier === 'professional') && (
            <>
              <div className="flex items-center justify-between">
                <Label><HighlightedLabel>Force HTTPS</HighlightedLabel></Label>
                <Switch 
                  checked={payload.url.forceHttps}
                  onCheckedChange={(checked) => setPayloadUrl({ forceHttps: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs"><HighlightedLabel>UTM Parameters</HighlightedLabel></Label>
                <Input 
                  placeholder="utm_source"
                  value={payload.url.utmSource || ''}
                  onChange={(e) => setPayloadUrl({ utmSource: e.target.value })}
                />
                <Input 
                  placeholder="utm_medium"
                  value={payload.url.utmMedium || ''}
                  onChange={(e) => setPayloadUrl({ utmMedium: e.target.value })}
                />
                <Input 
                  placeholder="utm_campaign"
                  value={payload.url.utmCampaign || ''}
                  onChange={(e) => setPayloadUrl({ utmCampaign: e.target.value })}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Phone Number */}
      {payload.kind === 'tel' && (
        <div className="space-y-2">
          <Label><HighlightedLabel>Phone Number</HighlightedLabel></Label>
          <Input 
            type="tel"
            value={payload.tel.number} 
            onChange={(e) => setPayloadTel({ number: e.target.value })}
            placeholder="+1234567890"
          />
        </div>
      )}

      {/* Email */}
      {payload.kind === 'email' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Email Address</HighlightedLabel></Label>
            <Input 
              type="email"
              value={payload.email.to} 
              onChange={(e) => setPayloadEmail({ to: e.target.value })}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Subject (optional)</HighlightedLabel></Label>
            <Input 
              value={payload.email.subject || ''} 
              onChange={(e) => setPayloadEmail({ subject: e.target.value })}
              placeholder="Email subject"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Body (optional)</HighlightedLabel></Label>
            <Textarea 
              value={payload.email.body || ''} 
              onChange={(e) => setPayloadEmail({ body: e.target.value })}
              placeholder="Email body"
              rows={3}
            />
          </div>
        </div>
      )}

      {/* SMS */}
      {payload.kind === 'sms' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Phone Number</HighlightedLabel></Label>
            <Input 
              type="tel"
              value={payload.sms.number} 
              onChange={(e) => setPayloadSms({ number: e.target.value })}
              placeholder="+1234567890"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Message (optional)</HighlightedLabel></Label>
            <Textarea 
              value={payload.sms.body || ''} 
              onChange={(e) => setPayloadSms({ body: e.target.value })}
              placeholder="Pre-filled message"
              rows={3}
            />
          </div>
        </div>
      )}

      {/* Geo Location */}
      {payload.kind === 'geo' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label><HighlightedLabel>Latitude</HighlightedLabel></Label>
              <Input 
                type="number"
                step="any"
                value={payload.geo.lat} 
                onChange={(e) => setPayloadGeo({ lat: parseFloat(e.target.value) || 0 })}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>Longitude</HighlightedLabel></Label>
              <Input 
                type="number"
                step="any"
                value={payload.geo.lon} 
                onChange={(e) => setPayloadGeo({ lon: parseFloat(e.target.value) || 0 })}
                placeholder="0.0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Search Query (optional)</HighlightedLabel></Label>
            <Input 
              value={payload.geo.query || ''} 
              onChange={(e) => setPayloadGeo({ query: e.target.value })}
              placeholder="Place name or address"
            />
          </div>
        </div>
      )}

      {/* WiFi */}
      {payload.kind === 'wifi' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Network Name (SSID)</HighlightedLabel></Label>
            <Input 
              value={payload.wifi.ssid} 
              onChange={(e) => setPayloadWifi({ ssid: e.target.value })}
              placeholder="MyWiFiNetwork"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Security Type</HighlightedLabel></Label>
            <Select value={payload.wifi.auth} onValueChange={(v) => setPayloadWifi({ auth: v as typeof payload.wifi.auth })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WPA2">WPA2</SelectItem>
                <SelectItem value="WPA3">WPA3</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">Open (No Password)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {payload.wifi.auth !== 'nopass' && (
            <div className="space-y-2">
              <Label><HighlightedLabel>Password</HighlightedLabel></Label>
              <Input 
                type="password"
                value={payload.wifi.password || ''} 
                onChange={(e) => setPayloadWifi({ password: e.target.value })}
                placeholder="Network password"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>Hidden Network</HighlightedLabel></Label>
            <Switch 
              checked={payload.wifi.hidden}
              onCheckedChange={(checked) => setPayloadWifi({ hidden: checked })}
            />
          </div>
        </div>
      )}

      {/* vCard */}
      {payload.kind === 'vcard' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Full Name</HighlightedLabel></Label>
            <Input 
              value={payload.vcard.fn || ''} 
              onChange={(e) => setPayloadVCard({ fn: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Organization</HighlightedLabel></Label>
            <Input 
              value={payload.vcard.org || ''} 
              onChange={(e) => setPayloadVCard({ org: e.target.value })}
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Title</HighlightedLabel></Label>
            <Input 
              value={payload.vcard.title || ''} 
              onChange={(e) => setPayloadVCard({ title: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Phone</HighlightedLabel></Label>
            <Input 
              type="tel"
              value={payload.vcard.tel?.[0] || ''} 
              onChange={(e) => setPayloadVCard({ tel: [e.target.value] })}
              placeholder="+1234567890"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Email</HighlightedLabel></Label>
            <Input 
              type="email"
              value={payload.vcard.email?.[0] || ''} 
              onChange={(e) => setPayloadVCard({ email: [e.target.value] })}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Website</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.vcard.url || ''} 
              onChange={(e) => setPayloadVCard({ url: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        </div>
      )}

      {/* MeCard */}
      {payload.kind === 'mecard' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Name</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.n || ''} 
              onChange={(e) => setPayloadMeCard({ n: e.target.value })}
              placeholder="Doe,John"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Nickname</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.nickname || ''} 
              onChange={(e) => setPayloadMeCard({ nickname: e.target.value })}
              placeholder="Johnny"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Phone</HighlightedLabel></Label>
            <Input 
              type="tel"
              value={payload.mecard.tel || ''} 
              onChange={(e) => setPayloadMeCard({ tel: e.target.value })}
              placeholder="+1234567890"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Email</HighlightedLabel></Label>
            <Input 
              type="email"
              value={payload.mecard.email || ''} 
              onChange={(e) => setPayloadMeCard({ email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Organization</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.org || ''} 
              onChange={(e) => setPayloadMeCard({ org: e.target.value })}
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Address</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.adr || ''} 
              onChange={(e) => setPayloadMeCard({ adr: e.target.value })}
              placeholder="123 Main St, City"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Birthday</HighlightedLabel></Label>
            <Input 
              type="date"
              value={payload.mecard.bday || ''} 
              onChange={(e) => setPayloadMeCard({ bday: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* BizCard */}
      {payload.kind === 'bizcard' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>First Name</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Last Name</HighlightedLabel></Label>
            <Input 
              placeholder="Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Company</HighlightedLabel></Label>
            <Input 
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Title</HighlightedLabel></Label>
            <Input 
              placeholder="Manager"
            />
          </div>
          <p className="text-xs text-muted-foreground">Legacy format - consider using vCard instead</p>
        </div>
      )}

      {/* Bluetooth */}
      {(payload.kind as string) === 'bluetooth' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Device Address (MAC)</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="00:11:22:33:44:55"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Device Name (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="My Bluetooth Device"
            />
          </div>
          <p className="text-xs text-muted-foreground">Note: Bluetooth pairing via QR is vendor-specific and may not work on all devices</p>
        </div>
      )}

      {/* Calendar Event */}
      {payload.kind === 'event' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Event Title</HighlightedLabel></Label>
            <Input 
              value={payload.event.summary || ''} 
              onChange={(e) => setPayloadEvent({ summary: e.target.value })}
              placeholder="Meeting"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Location</HighlightedLabel></Label>
            <Input 
              value={payload.event.location || ''} 
              onChange={(e) => setPayloadEvent({ location: e.target.value })}
              placeholder="Conference Room A"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Description</HighlightedLabel></Label>
            <Textarea 
              value={payload.event.description || ''} 
              onChange={(e) => setPayloadEvent({ description: e.target.value })}
              placeholder="Event details..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label><HighlightedLabel>Start</HighlightedLabel></Label>
              <Input 
                type="datetime-local"
                value={payload.event.start || ''} 
                onChange={(e) => setPayloadEvent({ start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>End</HighlightedLabel></Label>
              <Input 
                type="datetime-local"
                value={payload.event.end || ''} 
                onChange={(e) => setPayloadEvent({ end: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Event RSVP */}
      {payload.kind === 'event_rsvp' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>RSVP URL</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://example.com/rsvp/event123"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Event Name</HighlightedLabel></Label>
            <Input 
              placeholder="Annual Conference 2024"
            />
          </div>
          <p className="text-xs text-muted-foreground">Link to an online RSVP form or event registration page</p>
        </div>
      )}

      {/* Calendar Subscription */}
      {payload.kind === 'calendar_subscription' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Calendar URL (ICS/WebCal)</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="webcal://example.com/calendar.ics"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Calendar Name</HighlightedLabel></Label>
            <Input 
              placeholder="Team Schedule"
            />
          </div>
          <p className="text-xs text-muted-foreground">Subscribe to a shared calendar feed</p>
        </div>
      )}

      {/* File/Document URL */}
      {payload.kind === 'file_url' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>File URL</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://example.com/document.pdf"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>File Type</HighlightedLabel></Label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="doc">Word Document</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Cloud Storage Link */}
      {payload.kind === 'cloud_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Cloud Link</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://drive.google.com/file/..."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Service</HighlightedLabel></Label>
            <Select defaultValue="gdrive">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gdrive">Google Drive</SelectItem>
                <SelectItem value="dropbox">Dropbox</SelectItem>
                <SelectItem value="onedrive">OneDrive</SelectItem>
                <SelectItem value="icloud">iCloud</SelectItem>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Social Profile */}
      {payload.kind === 'social_profile' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Platform</HighlightedLabel></Label>
            <Select defaultValue="linkedin">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">X (Twitter)</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Profile URL</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
      )}

      {/* Messaging Link */}
      {payload.kind === 'messaging_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Platform</HighlightedLabel></Label>
            <Select defaultValue="whatsapp">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="signal">Signal</SelectItem>
                <SelectItem value="messenger">Messenger</SelectItem>
                <SelectItem value="wechat">WeChat</SelectItem>
                <SelectItem value="line">LINE</SelectItem>
                <SelectItem value="viber">Viber</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Phone/Username</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="+1234567890 or @username"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Pre-filled Message (optional)</HighlightedLabel></Label>
            <Textarea 
              placeholder="Hello! I scanned your QR code..."
              rows={2}
            />
          </div>
        </div>
      )}

      {/* Crypto Payment */}
      {payload.kind === 'crypto' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Cryptocurrency</HighlightedLabel></Label>
            <Select value={payload.crypto.type} onValueChange={(v) => setPayloadCrypto({ type: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="litecoin">Litecoin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Address</HighlightedLabel></Label>
            <Input 
              value={payload.crypto.address} 
              onChange={(e) => setPayloadCrypto({ address: e.target.value })}
              placeholder="Wallet address"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="any"
              value={payload.crypto.amount || ''} 
              onChange={(e) => setPayloadCrypto({ amount: parseFloat(e.target.value) || undefined })}
              placeholder="0.001"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Label (optional)</HighlightedLabel></Label>
            <Input 
              value={payload.crypto.label || ''} 
              onChange={(e) => setPayloadCrypto({ label: e.target.value })}
              placeholder="Payment for..."
            />
          </div>
        </div>
      )}

      {/* EPC/SEPA (EU Bank Transfer) */}
      {payload.kind === 'epc_sepa' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Beneficiary Name</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="Company Ltd."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>IBAN</HighlightedLabel></Label>
            <Input 
              placeholder="DE89370400440532013000"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>BIC/SWIFT (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="COBADEFFXXX"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (EUR)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="100.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Reference</HighlightedLabel></Label>
            <Input 
              placeholder="Invoice 12345"
            />
          </div>
          <p className="text-xs text-muted-foreground">European Payment Council QR code for SEPA credit transfers</p>
        </div>
      )}

      {/* UPI (India) */}
      {payload.kind === 'upi' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>UPI ID (VPA)</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="name@upi"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Payee Name</HighlightedLabel></Label>
            <Input 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (INR, optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="500.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Transaction Note (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="Payment for order"
            />
          </div>
          <p className="text-xs text-muted-foreground">Unified Payments Interface for India</p>
        </div>
      )}

      {/* PayNow (Singapore) */}
      {payload.kind === 'paynow' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Proxy Type</HighlightedLabel></Label>
            <Select defaultValue="uen">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uen">UEN (Business)</SelectItem>
                <SelectItem value="mobile">Mobile Number</SelectItem>
                <SelectItem value="nric">NRIC/FIN</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>UEN/Mobile/NRIC</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="201234567X or +65..."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (SGD, optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="50.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Reference (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="Invoice 123"
            />
          </div>
          <p className="text-xs text-muted-foreground">Singapore fast payment system</p>
        </div>
      )}

      {/* PromptPay (Thailand) */}
      {payload.kind === 'promptpay' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>ID Type</HighlightedLabel></Label>
            <Select defaultValue="mobile">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Mobile Number</SelectItem>
                <SelectItem value="natid">National ID</SelectItem>
                <SelectItem value="ewallet">E-Wallet ID</SelectItem>
                <SelectItem value="taxid">Tax ID (Business)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>PromptPay ID</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="0812345678"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (THB, optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="100.00"
            />
          </div>
          <p className="text-xs text-muted-foreground">Thailand national e-payment system</p>
        </div>
      )}

      {/* PIX (Brazil) */}
      {payload.kind === 'pix' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Key Type</HighlightedLabel></Label>
            <Select defaultValue="cpf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="cnpj">CNPJ</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="evp">Random Key (EVP)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>PIX Key</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="123.456.789-00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Merchant Name</HighlightedLabel></Label>
            <Input 
              placeholder="João Silva"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>City</HighlightedLabel></Label>
            <Input 
              placeholder="São Paulo"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (BRL, optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="100.00"
            />
          </div>
          <p className="text-xs text-muted-foreground">Brazilian instant payment system</p>
        </div>
      )}

      {/* Alipay */}
      {(payload.kind as string) === '_removed_alipay' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Alipay User ID</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="2088..."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (CNY, optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="100.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Memo (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="Payment note"
            />
          </div>
          <p className="text-xs text-muted-foreground">Alipay payment QR code</p>
        </div>
      )}

      {/* WeChat Pay */}
      {(payload.kind as string) === '_removed_wechat' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>WeChat ID</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="wxid_..."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Amount (CNY, optional)</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              placeholder="100.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Memo (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="Payment note"
            />
          </div>
          <p className="text-xs text-muted-foreground">WeChat Pay payment QR code</p>
        </div>
      )}

      {/* OTP Authenticator */}
      {(payload.kind as string) === '_removed_otpauth' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Type</HighlightedLabel></Label>
            <Select value={payload.otpauth.type || 'totp'} onValueChange={(v) => setPayloadOtpAuth({ type: v as 'totp' | 'hotp' })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="totp">TOTP (Time-based)</SelectItem>
                <SelectItem value="hotp">HOTP (Counter-based)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Issuer</HighlightedLabel></Label>
            <Input 
              value={payload.otpauth.issuer || ''} 
              onChange={(e) => setPayloadOtpAuth({ issuer: e.target.value })}
              placeholder="MyApp"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Account Name</HighlightedLabel></Label>
            <Input 
              value={payload.otpauth.account || ''} 
              onChange={(e) => setPayloadOtpAuth({ account: e.target.value })}
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Secret (Base32)</HighlightedLabel></Label>
            <Input 
              value={payload.otpauth.secret || ''} 
              onChange={(e) => setPayloadOtpAuth({ secret: e.target.value })}
              placeholder="JBSWY3DPEHPK3PXP"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Algorithm</HighlightedLabel></Label>
            <Select value={payload.otpauth.algorithm || 'SHA1'} onValueChange={(v) => setPayloadOtpAuth({ algorithm: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SHA1">SHA1</SelectItem>
                <SelectItem value="SHA256">SHA256</SelectItem>
                <SelectItem value="SHA512">SHA512</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label><HighlightedLabel>Digits</HighlightedLabel></Label>
              <Input 
                type="number"
                value={payload.otpauth.digits || 6} 
                onChange={(e) => setPayloadOtpAuth({ digits: parseInt(e.target.value) || 6 })}
                min={6}
                max={8}
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>{payload.otpauth.type === 'hotp' ? 'Counter' : 'Period (sec)'}</HighlightedLabel></Label>
              <Input 
                type="number"
                value={payload.otpauth.type === 'hotp' ? (payload.otpauth.counter || 0) : (payload.otpauth.period || 30)} 
                onChange={(e) => {
                  if (payload.otpauth.type === 'hotp') {
                    setPayloadOtpAuth({ counter: parseInt(e.target.value) || 0 })
                  } else {
                    setPayloadOtpAuth({ period: parseInt(e.target.value) || 30 })
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Short Link */}
      {payload.kind === 'short_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Short URL</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://bit.ly/xxxxx"
            />
          </div>
          <p className="text-xs text-muted-foreground">Use a URL shortener service for dynamic/trackable QR codes</p>
        </div>
      )}

      {/* UTM Campaign Link */}
      {payload.kind === 'utm_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Base URL</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.url.href} 
              onChange={(e) => setPayloadUrl({ href: e.target.value })}
              placeholder="https://example.com/landing"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Campaign Source</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmSource || ''} 
              onChange={(e) => setPayloadUrl({ utmSource: e.target.value })}
              placeholder="qr_code"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Campaign Medium</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmMedium || ''} 
              onChange={(e) => setPayloadUrl({ utmMedium: e.target.value })}
              placeholder="print"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Campaign Name</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmCampaign || ''} 
              onChange={(e) => setPayloadUrl({ utmCampaign: e.target.value })}
              placeholder="summer_sale_2024"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Campaign Term (optional)</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmTerm || ''} 
              onChange={(e) => setPayloadUrl({ utmTerm: e.target.value })}
              placeholder="keyword"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Campaign Content (optional)</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmContent || ''} 
              onChange={(e) => setPayloadUrl({ utmContent: e.target.value })}
              placeholder="banner_ad"
            />
          </div>
        </div>
      )}

      {/* App Deep Link */}
      {payload.kind === 'app_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Platform</HighlightedLabel></Label>
            <Select defaultValue="universal">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="universal">Universal Link</SelectItem>
                <SelectItem value="android">Android Intent</SelectItem>
                <SelectItem value="ios">iOS URL Scheme</SelectItem>
                <SelectItem value="custom">Custom Scheme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Deep Link URL</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="myapp://path/to/content"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Fallback URL (optional)</HighlightedLabel></Label>
            <Input 
              type="url"
              placeholder="https://example.com/app"
            />
          </div>
          <p className="text-xs text-muted-foreground">Opens specific content within a mobile app</p>
        </div>
      )}

      {/* GS1 Digital Link */}
      {payload.kind === 'gs1_digital_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>GTIN (Global Trade Item Number)</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="01234567890128"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Serial Number (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="ABC123"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Batch/Lot (optional)</HighlightedLabel></Label>
            <Input 
              placeholder="LOT123"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Expiry Date (optional)</HighlightedLabel></Label>
            <Input 
              type="date"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Resolver Domain</HighlightedLabel></Label>
            <Input 
              placeholder="id.gs1.org"
              defaultValue="id.gs1.org"
            />
          </div>
          <p className="text-xs text-muted-foreground">GS1 Digital Link for product identification and traceability</p>
        </div>
      )}

      {/* Inventory/Asset Tag */}
      {(payload.kind as string) === '_removed_inventory' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Asset/Item ID</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="ASSET-001234"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Asset Type</HighlightedLabel></Label>
            <Select defaultValue="equipment">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="it">IT Asset</SelectItem>
                <SelectItem value="vehicle">Vehicle</SelectItem>
                <SelectItem value="inventory">Inventory Item</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Location</HighlightedLabel></Label>
            <Input 
              placeholder="Building A, Room 101"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Description</HighlightedLabel></Label>
            <Input 
              placeholder="Dell Laptop 15-inch"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Lookup URL (optional)</HighlightedLabel></Label>
            <Input 
              type="url"
              placeholder="https://inventory.example.com/asset/"
            />
          </div>
        </div>
      )}

      {/* Ticketing */}
      {(payload.kind as string) === '_removed_ticketing' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Ticket ID</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="TKT-2024-001234"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Event Name</HighlightedLabel></Label>
            <Input 
              placeholder="Concert 2024"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Venue</HighlightedLabel></Label>
            <Input 
              placeholder="Stadium Arena"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Date & Time</HighlightedLabel></Label>
            <Input 
              type="datetime-local"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label><HighlightedLabel>Section/Zone</HighlightedLabel></Label>
              <Input 
                placeholder="Section A"
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>Seat</HighlightedLabel></Label>
              <Input 
                placeholder="Row 5, Seat 12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Attendee Name</HighlightedLabel></Label>
            <Input 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>Validation URL (optional)</HighlightedLabel></Label>
            <Input 
              type="url"
              placeholder="https://tickets.example.com/validate/"
            />
          </div>
        </div>
      )}

      {/* Custom Format */}
      {payload.kind === 'custom' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>Raw Data</HighlightedLabel></Label>
            <Textarea 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="Enter raw QR code data..."
              rows={6}
              className="font-mono text-sm"
            />
          </div>
          <p className="text-xs text-muted-foreground">Enter raw data in any format. No validation or formatting will be applied.</p>
        </div>
      )}

      {/* Validation Options (Advanced+) */}
      {(tier === 'advanced' || tier === 'professional') && (
        <div className="space-y-2 pt-4 border-t">
          <Label className="text-muted-foreground text-xs"><HighlightedLabel>Validation Options</HighlightedLabel></Label>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Validate Input</HighlightedLabel></Label>
            <Switch 
              checked={payload.validate}
              onCheckedChange={(checked) => setPayloadValidation({ validate: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Trim Whitespace</HighlightedLabel></Label>
            <Switch 
              checked={payload.trim}
              onCheckedChange={(checked) => setPayloadValidation({ trim: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Normalize Newlines</HighlightedLabel></Label>
            <Switch 
              checked={payload.normalizeNewlines}
              onCheckedChange={(checked) => setPayloadValidation({ normalizeNewlines: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>Max Length Guard</HighlightedLabel></Label>
            <Switch 
              checked={payload.maxLenGuard}
              onCheckedChange={(checked) => setPayloadValidation({ maxLenGuard: checked })}
            />
          </div>
        </div>
      )}
    </div>
  )
}
