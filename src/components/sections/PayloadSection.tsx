import { useQRStore, PayloadKind } from '@/store/qr-store'
import { useTranslation } from 'react-i18next'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { HighlightedLabel } from '@/lib/search-context'
import { useState, useEffect } from 'react'
import { generateEPCSepa, generateUPI, generatePayNow, generatePromptPay, generatePIX } from '@/modules/payload-generators'

// Payload category/item keys for translation
const PAYLOAD_CATEGORY_KEYS = [
  {
    groupKey: 'payload.core',
    tier: 'basic' as const,
    items: [
      { value: 'plain_text' as PayloadKind, labelKey: 'payload.plainText' },
      { value: 'url' as PayloadKind, labelKey: 'payload.url' },
    ]
  },
  {
    groupKey: 'payload.contact',
    tier: 'advanced' as const,
    items: [
      { value: 'tel' as PayloadKind, labelKey: 'payload.tel' },
      { value: 'email' as PayloadKind, labelKey: 'payload.email' },
      { value: 'sms' as PayloadKind, labelKey: 'payload.smsMms' },
      { value: 'vcard' as PayloadKind, labelKey: 'payload.vcard' },
      { value: 'mecard' as PayloadKind, labelKey: 'payload.mecard' },
      { value: 'bizcard' as PayloadKind, labelKey: 'payload.bizcard' },
    ]
  },
  {
    groupKey: 'payload.locationNetwork',
    tier: 'advanced' as const,
    items: [
      { value: 'geo' as PayloadKind, labelKey: 'payload.geo' },
      { value: 'wifi' as PayloadKind, labelKey: 'payload.wifiNetwork' },
    ]
  },
  {
    groupKey: 'payload.calendar',
    tier: 'advanced' as const,
    items: [
      { value: 'event' as PayloadKind, labelKey: 'payload.event' },
      { value: 'event_rsvp' as PayloadKind, labelKey: 'payload.eventRsvp' },
      { value: 'calendar_subscription' as PayloadKind, labelKey: 'payload.calendarSubscription' },
    ]
  },
  {
    groupKey: 'payload.documentsMedia',
    tier: 'advanced' as const,
    items: [
      { value: 'file_url' as PayloadKind, labelKey: 'payload.fileUrl' },
      { value: 'cloud_link' as PayloadKind, labelKey: 'payload.cloudLink' },
    ]
  },
  {
    groupKey: 'payload.socialMessaging',
    tier: 'advanced' as const,
    items: [
      { value: 'social_profile' as PayloadKind, labelKey: 'payload.socialProfile' },
      { value: 'messaging_link' as PayloadKind, labelKey: 'payload.messagingLink' },
    ]
  },
  {
    groupKey: 'payload.payments',
    tier: 'professional' as const,
    items: [
      { value: 'epc_sepa' as PayloadKind, labelKey: 'payload.epcSepa' },
      { value: 'upi' as PayloadKind, labelKey: 'payload.upi' },
      { value: 'paynow' as PayloadKind, labelKey: 'payload.paynow' },
      { value: 'promptpay' as PayloadKind, labelKey: 'payload.promptpay' },
      { value: 'pix' as PayloadKind, labelKey: 'payload.pix' },
      { value: 'crypto' as PayloadKind, labelKey: 'payload.crypto' },
    ]
  },
  {
    groupKey: 'payload.marketing',
    tier: 'professional' as const,
    items: [
      { value: 'utm_link' as PayloadKind, labelKey: 'payload.utmLink' },
      { value: 'short_link' as PayloadKind, labelKey: 'payload.shortLink' },
    ]
  },
  {
    groupKey: 'payload.enterprise',
    tier: 'professional' as const,
    items: [
      { value: 'gs1_digital_link' as PayloadKind, labelKey: 'payload.gs1DigitalLink' },
      { value: 'app_link' as PayloadKind, labelKey: 'payload.appLink' },
      { value: 'custom' as PayloadKind, labelKey: 'payload.custom' },
    ]
  },
]

// Payment form state types
interface EPCSepaForm {
  name: string
  iban: string
  bic: string
  amount: string
  reference: string
}

interface UPIForm {
  vpa: string
  payeeName: string
  amount: string
  transactionNote: string
}

interface PayNowForm {
  type: 'mobile' | 'uen'
  value: string
  amount: string
  reference: string
}

interface PromptPayForm {
  type: 'mobile' | 'id' | 'ewallet'
  value: string
  amount: string
}

interface PIXForm {
  key: string
  name: string
  city: string
  amount: string
}

export function PayloadSection() {
  const { tier, payload, setPayloadKind, setPayloadText, setPayloadUrl, setPayloadTel, setPayloadEmail, setPayloadSms, setPayloadGeo, setPayloadWifi, setPayloadVCard, setPayloadMeCard, setPayloadEvent, setPayloadCrypto, setPayloadOtpAuth, setPayloadValidation } = useQRStore()
  const { t } = useTranslation()
  const [showStartupHighlight, setShowStartupHighlight] = useState(false)

  // Payment form states
  const [epcSepaForm, setEpcSepaForm] = useState<EPCSepaForm>({
    name: '',
    iban: '',
    bic: '',
    amount: '',
    reference: ''
  })

  const [upiForm, setUpiForm] = useState<UPIForm>({
    vpa: '',
    payeeName: '',
    amount: '',
    transactionNote: ''
  })

  const [payNowForm, setPayNowForm] = useState<PayNowForm>({
    type: 'uen',
    value: '',
    amount: '',
    reference: ''
  })

  const [promptPayForm, setPromptPayForm] = useState<PromptPayForm>({
    type: 'mobile',
    value: '',
    amount: ''
  })

  const [pixForm, setPixForm] = useState<PIXForm>({
    key: '',
    name: '',
    city: '',
    amount: ''
  })

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

  // Generate EPC/SEPA payload when form changes
  useEffect(() => {
    if (payload.kind === 'epc_sepa' && epcSepaForm.name && epcSepaForm.iban) {
      const generated = generateEPCSepa({
        name: epcSepaForm.name,
        iban: epcSepaForm.iban,
        bic: epcSepaForm.bic || undefined,
        amount: epcSepaForm.amount ? parseFloat(epcSepaForm.amount) : undefined,
        reference: epcSepaForm.reference || undefined
      })
      setPayloadText(generated)
    }
  }, [payload.kind, epcSepaForm, setPayloadText])

  // Generate UPI payload when form changes
  useEffect(() => {
    if (payload.kind === 'upi' && upiForm.vpa) {
      const generated = generateUPI({
        pa: upiForm.vpa,
        pn: upiForm.payeeName || undefined,
        am: upiForm.amount ? parseFloat(upiForm.amount) : undefined,
        tn: upiForm.transactionNote || undefined
      })
      setPayloadText(generated)
    }
  }, [payload.kind, upiForm, setPayloadText])

  // Generate PayNow payload when form changes
  useEffect(() => {
    if (payload.kind === 'paynow' && payNowForm.value) {
      const generated = generatePayNow({
        type: payNowForm.type,
        value: payNowForm.value,
        amount: payNowForm.amount ? parseFloat(payNowForm.amount) : undefined,
        reference: payNowForm.reference || undefined,
        editable: true
      })
      setPayloadText(generated)
    }
  }, [payload.kind, payNowForm, setPayloadText])

  // Generate PromptPay payload when form changes
  useEffect(() => {
    if (payload.kind === 'promptpay' && promptPayForm.value) {
      const generated = generatePromptPay({
        type: promptPayForm.type,
        value: promptPayForm.value,
        amount: promptPayForm.amount ? parseFloat(promptPayForm.amount) : undefined
      })
      setPayloadText(generated)
    }
  }, [payload.kind, promptPayForm, setPayloadText])

  // Generate PIX payload when form changes
  useEffect(() => {
    if (payload.kind === 'pix' && pixForm.key) {
      const generated = generatePIX({
        key: pixForm.key,
        name: pixForm.name || undefined,
        city: pixForm.city || undefined,
        amount: pixForm.amount ? parseFloat(pixForm.amount) : undefined
      })
      setPayloadText(generated)
    }
  }, [payload.kind, pixForm, setPayloadText])



  return (
    <div className="space-y-4">
      {/* Payload Type Selector */}
      <div className="space-y-2">
        <Label><HighlightedLabel>{t('payload.contentType')}</HighlightedLabel></Label>
        <Select value={payload.kind} onValueChange={(v) => setPayloadKind(v as PayloadKind)}>
          <SelectTrigger className="w-full" title={t('hints.selectContentType')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {PAYLOAD_CATEGORY_KEYS.filter(cat => {
              if (cat.tier === 'basic') return true
              if (cat.tier === 'advanced') return tier === 'advanced' || tier === 'professional'
              if (cat.tier === 'professional') return tier === 'professional'
              return false
            }).map(cat => (
              <SelectGroup key={cat.groupKey}>
                <SelectLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5 bg-muted/50">{t(cat.groupKey)}</SelectLabel>
                {cat.items.map(item => (
                  <SelectItem key={item.value} value={item.value}>{t(item.labelKey)}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Plain Text Input */}
      {payload.kind === 'plain_text' && (
        <div className={`space-y-2 ${showStartupHighlight ? 'p-1 -m-1' : ''}`}>
          <Label><HighlightedLabel>{t('payload.text')}</HighlightedLabel></Label>
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
            title={t('hints.enterTextContent')}
          />
        </div>
      )}

      {/* URL Input */}
      {payload.kind === 'url' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.url')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.url.href} 
              onChange={(e) => setPayloadUrl({ href: e.target.value })}
              placeholder="https://anqr.link"
              title={t('hints.enterUrlContent')}
            />
          </div>
          {(tier === 'advanced' || tier === 'professional') && (
            <>
              <div className="flex items-center justify-between">
                <Label><HighlightedLabel>{t('payload.forceHttps')}</HighlightedLabel></Label>
                <Switch 
                  checked={payload.url.forceHttps}
                  onCheckedChange={(checked) => setPayloadUrl({ forceHttps: checked })}
                  title={t('hints.forceHttps')}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground text-xs"><HighlightedLabel>{t('payload.marketingTags')}</HighlightedLabel></Label>
                <Input 
                  placeholder="utm_source"
                  value={payload.url.utmSource || ''}
                  onChange={(e) => setPayloadUrl({ utmSource: e.target.value })}
                  title={t('hints.utmSource')}
                />
                <Input 
                  placeholder="utm_medium"
                  value={payload.url.utmMedium || ''}
                  onChange={(e) => setPayloadUrl({ utmMedium: e.target.value })}
                  title={t('hints.utmMedium')}
                />
                <Input 
                  placeholder="utm_campaign"
                  value={payload.url.utmCampaign || ''}
                  onChange={(e) => setPayloadUrl({ utmCampaign: e.target.value })}
                  title={t('hints.utmCampaign')}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Phone Number */}
      {payload.kind === 'tel' && (
        <div className="space-y-2">
          <Label><HighlightedLabel>{t('payload.phone')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.email')}</HighlightedLabel></Label>
            <Input 
              type="email"
              value={payload.email.to} 
              onChange={(e) => setPayloadEmail({ to: e.target.value })}
              placeholder="name@anqr.link"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.subject')}</HighlightedLabel></Label>
            <Input 
              value={payload.email.subject || ''} 
              onChange={(e) => setPayloadEmail({ subject: e.target.value })}
              placeholder="Email subject"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.body')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.tel')}</HighlightedLabel></Label>
            <Input 
              type="tel"
              value={payload.sms.number} 
              onChange={(e) => setPayloadSms({ number: e.target.value })}
              placeholder="+1234567890"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.messageOptional')}</HighlightedLabel></Label>
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
              <Label><HighlightedLabel>{t('payload.latitude')}</HighlightedLabel></Label>
              <Input 
                type="number"
                step="any"
                value={payload.geo.lat} 
                onChange={(e) => setPayloadGeo({ lat: parseFloat(e.target.value) || 0 })}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>{t('payload.longitude')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.searchQuery')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.ssid')}</HighlightedLabel></Label>
            <Input 
              value={payload.wifi.ssid} 
              onChange={(e) => setPayloadWifi({ ssid: e.target.value })}
              placeholder="MyWiFiNetwork"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.securityType')}</HighlightedLabel></Label>
            <Select value={payload.wifi.auth} onValueChange={(v) => setPayloadWifi({ auth: v as typeof payload.wifi.auth })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WPA2">WPA2</SelectItem>
                <SelectItem value="WPA3">WPA3</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">{t('payload.openNoPassword')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {payload.wifi.auth !== 'nopass' && (
            <div className="space-y-2">
              <Label><HighlightedLabel>{t('payload.password')}</HighlightedLabel></Label>
              <Input 
                type="password"
                value={payload.wifi.password || ''} 
                onChange={(e) => setPayloadWifi({ password: e.target.value })}
                placeholder="Network password"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label><HighlightedLabel>{t('payload.hidden')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.fullName')}</HighlightedLabel></Label>
            <Input 
              value={payload.vcard.fn || ''} 
              onChange={(e) => setPayloadVCard({ fn: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.organization')}</HighlightedLabel></Label>
            <Input 
              value={payload.vcard.org || ''} 
              onChange={(e) => setPayloadVCard({ org: e.target.value })}
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.title')}</HighlightedLabel></Label>
            <Input 
              value={payload.vcard.title || ''} 
              onChange={(e) => setPayloadVCard({ title: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.phone')}</HighlightedLabel></Label>
            <Input 
              type="tel"
              value={payload.vcard.tel?.[0] || ''} 
              onChange={(e) => setPayloadVCard({ tel: [e.target.value] })}
              placeholder="+1234567890"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.email')}</HighlightedLabel></Label>
            <Input 
              type="email"
              value={payload.vcard.email?.[0] || ''} 
              onChange={(e) => setPayloadVCard({ email: [e.target.value] })}
              placeholder="name@anqr.link"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.website')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.vcard.url || ''} 
              onChange={(e) => setPayloadVCard({ url: e.target.value })}
              placeholder="https://anqr.link"
            />
          </div>
        </div>
      )}

      {/* MeCard */}
      {payload.kind === 'mecard' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.name')}</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.n || ''} 
              onChange={(e) => setPayloadMeCard({ n: e.target.value })}
              placeholder="Doe,John"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.nickname')}</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.nickname || ''} 
              onChange={(e) => setPayloadMeCard({ nickname: e.target.value })}
              placeholder="Johnny"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.phone')}</HighlightedLabel></Label>
            <Input 
              type="tel"
              value={payload.mecard.tel || ''} 
              onChange={(e) => setPayloadMeCard({ tel: e.target.value })}
              placeholder="+1234567890"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.email')}</HighlightedLabel></Label>
            <Input 
              type="email"
              value={payload.mecard.email || ''} 
              onChange={(e) => setPayloadMeCard({ email: e.target.value })}
              placeholder="name@anqr.link"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.organization')}</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.org || ''} 
              onChange={(e) => setPayloadMeCard({ org: e.target.value })}
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.address')}</HighlightedLabel></Label>
            <Input 
              value={payload.mecard.adr || ''} 
              onChange={(e) => setPayloadMeCard({ adr: e.target.value })}
              placeholder="123 Main St, City"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.birthday')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.firstName')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.lastName')}</HighlightedLabel></Label>
            <Input 
              placeholder="Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.company')}</HighlightedLabel></Label>
            <Input 
              placeholder="Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.title')}</HighlightedLabel></Label>
            <Input 
              placeholder="Manager"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.bizcardLegacy')}</p>
        </div>
      )}

      {/* Bluetooth */}
      {(payload.kind as string) === 'bluetooth' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.deviceAddress')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="00:11:22:33:44:55"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.deviceName')}</HighlightedLabel></Label>
            <Input 
              placeholder="My Bluetooth Device"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.bluetoothNote')}</p>
        </div>
      )}

      {/* Calendar Event */}
      {payload.kind === 'event' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.summary')}</HighlightedLabel></Label>
            <Input 
              value={payload.event.summary || ''} 
              onChange={(e) => setPayloadEvent({ summary: e.target.value })}
              placeholder="Meeting"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.location')}</HighlightedLabel></Label>
            <Input 
              value={payload.event.location || ''} 
              onChange={(e) => setPayloadEvent({ location: e.target.value })}
              placeholder="Conference Room A"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.description')}</HighlightedLabel></Label>
            <Textarea 
              value={payload.event.description || ''} 
              onChange={(e) => setPayloadEvent({ description: e.target.value })}
              placeholder="Event details..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label><HighlightedLabel>{t('payload.start')}</HighlightedLabel></Label>
              <Input 
                type="datetime-local"
                value={payload.event.start || ''} 
                onChange={(e) => setPayloadEvent({ start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>{t('payload.end')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.rsvpUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://anqr.link/rsvp/event123"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.eventName')}</HighlightedLabel></Label>
            <Input 
              placeholder="Annual Conference 2024"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.rsvpNote')}</p>
        </div>
      )}

      {/* Calendar Subscription */}
      {payload.kind === 'calendar_subscription' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.calendarUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="webcal://anqr.link/calendar.ics"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.calendarName')}</HighlightedLabel></Label>
            <Input 
              placeholder="Team Schedule"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.calendarNote')}</p>
        </div>
      )}

      {/* File/Document URL */}
      {payload.kind === 'file_url' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.url')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://anqr.link/document.pdf"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.fileType')}</HighlightedLabel></Label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="doc">{t('payload.wordDocument')}</SelectItem>
                <SelectItem value="image">{t('payload.image')}</SelectItem>
                <SelectItem value="video">{t('payload.video')}</SelectItem>
                <SelectItem value="audio">{t('payload.audio')}</SelectItem>
                <SelectItem value="other">{t('payload.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Cloud Storage Link */}
      {payload.kind === 'cloud_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.url')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://drive.google.com/file/..."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.service')}</HighlightedLabel></Label>
            <Select defaultValue="gdrive">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gdrive">{t('payload.googleDrive')}</SelectItem>
                <SelectItem value="dropbox">{t('payload.dropbox')}</SelectItem>
                <SelectItem value="onedrive">{t('payload.oneDrive')}</SelectItem>
                <SelectItem value="icloud">iCloud</SelectItem>
                <SelectItem value="box">{t('payload.box')}</SelectItem>
                <SelectItem value="other">{t('payload.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Social Profile */}
      {payload.kind === 'social_profile' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.platform')}</HighlightedLabel></Label>
            <Select defaultValue="linkedin">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">{t('payload.linkedin')}</SelectItem>
                <SelectItem value="twitter">X (Twitter)</SelectItem>
                <SelectItem value="instagram">{t('payload.instagram')}</SelectItem>
                <SelectItem value="facebook">{t('payload.facebook')}</SelectItem>
                <SelectItem value="tiktok">{t('payload.tiktok')}</SelectItem>
                <SelectItem value="youtube">{t('payload.youtube')}</SelectItem>
                <SelectItem value="github">{t('payload.github')}</SelectItem>
                <SelectItem value="other">{t('payload.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.profileUrl')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.platform')}</HighlightedLabel></Label>
            <Select defaultValue="whatsapp">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">{t('payload.whatsapp')}</SelectItem>
                <SelectItem value="telegram">{t('payload.telegram')}</SelectItem>
                <SelectItem value="signal">{t('payload.signal')}</SelectItem>
                <SelectItem value="messenger">{t('payload.messenger')}</SelectItem>

                <SelectItem value="line">LINE</SelectItem>
                <SelectItem value="viber">{t('payload.viber')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.phoneUsername')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="+1234567890 or @username"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.prefilledMessage')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.cryptocurrency')}</HighlightedLabel></Label>
            <Select value={payload.crypto.type} onValueChange={(v) => setPayloadCrypto({ type: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bitcoin">{t('payload.bitcoin')}</SelectItem>
                <SelectItem value="ethereum">{t('payload.ethereum')}</SelectItem>
                <SelectItem value="litecoin">{t('payload.litecoin')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.walletAddress')}</HighlightedLabel></Label>
            <Input 
              value={payload.crypto.address} 
              onChange={(e) => setPayloadCrypto({ address: e.target.value })}
              placeholder="Wallet address"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.amount')}</HighlightedLabel></Label>
            <Input 
              type="number"
              step="any"
              value={payload.crypto.amount || ''} 
              onChange={(e) => setPayloadCrypto({ amount: parseFloat(e.target.value) || undefined })}
              placeholder="0.001"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.label')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.beneficiaryName')}</HighlightedLabel></Label>
            <Input 
              value={epcSepaForm.name} 
              onChange={(e) => setEpcSepaForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Company Ltd."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.iban')}</HighlightedLabel></Label>
            <Input 
              value={epcSepaForm.iban}
              onChange={(e) => setEpcSepaForm(prev => ({ ...prev, iban: e.target.value }))}
              placeholder="DE89370400440532013000"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.bicSwift')}</HighlightedLabel></Label>
            <Input 
              value={epcSepaForm.bic}
              onChange={(e) => setEpcSepaForm(prev => ({ ...prev, bic: e.target.value }))}
              placeholder="COBADEFFXXX"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.amountEur')}</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              value={epcSepaForm.amount}
              onChange={(e) => setEpcSepaForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="100.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.reference')}</HighlightedLabel></Label>
            <Input 
              value={epcSepaForm.reference}
              onChange={(e) => setEpcSepaForm(prev => ({ ...prev, reference: e.target.value }))}
              placeholder="Invoice 12345"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.epcSepaNote')}</p>
        </div>
      )}

      {/* UPI (India) */}
      {payload.kind === 'upi' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.upiId')}</HighlightedLabel></Label>
            <Input 
              value={upiForm.vpa} 
              onChange={(e) => setUpiForm(prev => ({ ...prev, vpa: e.target.value }))}
              placeholder="name@upi"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.payeeName')}</HighlightedLabel></Label>
            <Input 
              value={upiForm.payeeName}
              onChange={(e) => setUpiForm(prev => ({ ...prev, payeeName: e.target.value }))}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.amountInr')}</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              value={upiForm.amount}
              onChange={(e) => setUpiForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="500.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.transactionNote')}</HighlightedLabel></Label>
            <Input 
              value={upiForm.transactionNote}
              onChange={(e) => setUpiForm(prev => ({ ...prev, transactionNote: e.target.value }))}
              placeholder="Payment for order"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.upiNote')}</p>
        </div>
      )}

      {/* PayNow (Singapore) */}
      {payload.kind === 'paynow' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.proxyType')}</HighlightedLabel></Label>
            <Select 
              value={payNowForm.type} 
              onValueChange={(v) => setPayNowForm(prev => ({ ...prev, type: v as 'mobile' | 'uen' }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uen">UEN (Business)</SelectItem>
                <SelectItem value="mobile">{t('payload.mobileNumber')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.uenMobile')}</HighlightedLabel></Label>
            <Input 
              value={payNowForm.value} 
              onChange={(e) => setPayNowForm(prev => ({ ...prev, value: e.target.value }))}
              placeholder="201234567X or +65..."
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.amountSgd')}</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              value={payNowForm.amount}
              onChange={(e) => setPayNowForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="50.00"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.referenceOptional')}</HighlightedLabel></Label>
            <Input 
              value={payNowForm.reference}
              onChange={(e) => setPayNowForm(prev => ({ ...prev, reference: e.target.value }))}
              placeholder="Invoice 123"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.paynowNote')}</p>
        </div>
      )}

      {/* PromptPay (Thailand) */}
      {payload.kind === 'promptpay' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.idType')}</HighlightedLabel></Label>
            <Select 
              value={promptPayForm.type} 
              onValueChange={(v) => setPromptPayForm(prev => ({ ...prev, type: v as 'mobile' | 'id' | 'ewallet' }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">{t('payload.mobileNumber')}</SelectItem>
                <SelectItem value="id">{t('payload.nationalIdTaxId')}</SelectItem>
                <SelectItem value="ewallet">E-Wallet ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.promptPayId')}</HighlightedLabel></Label>
            <Input 
              value={promptPayForm.value} 
              onChange={(e) => setPromptPayForm(prev => ({ ...prev, value: e.target.value }))}
              placeholder="0812345678"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.amountThb')}</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              value={promptPayForm.amount}
              onChange={(e) => setPromptPayForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="100.00"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.promptpayNote')}</p>
        </div>
      )}

      {/* PIX (Brazil) */}
      {payload.kind === 'pix' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.pixKey')}</HighlightedLabel></Label>
            <Input 
              value={pixForm.key} 
              onChange={(e) => setPixForm(prev => ({ ...prev, key: e.target.value }))}
              placeholder="CPF, CNPJ, Email, Phone, or Random Key"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.merchantName')}</HighlightedLabel></Label>
            <Input 
              value={pixForm.name}
              onChange={(e) => setPixForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="João Silva"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.cityOptional')}</HighlightedLabel></Label>
            <Input 
              value={pixForm.city}
              onChange={(e) => setPixForm(prev => ({ ...prev, city: e.target.value }))}
              placeholder="São Paulo"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.amountBrl')}</HighlightedLabel></Label>
            <Input 
              type="number"
              step="0.01"
              value={pixForm.amount}
              onChange={(e) => setPixForm(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="100.00"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.pixNote')}</p>
        </div>
      )}



      {/* OTP Authenticator */}
      {(payload.kind as string) === '_removed_otpauth' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.otpType')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.issuer')}</HighlightedLabel></Label>
            <Input 
              value={payload.otpauth.issuer || ''} 
              onChange={(e) => setPayloadOtpAuth({ issuer: e.target.value })}
              placeholder="MyApp"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.accountName')}</HighlightedLabel></Label>
            <Input 
              value={payload.otpauth.account || ''} 
              onChange={(e) => setPayloadOtpAuth({ account: e.target.value })}
              placeholder="user@anqr.link"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.secretBase32')}</HighlightedLabel></Label>
            <Input 
              value={payload.otpauth.secret || ''} 
              onChange={(e) => setPayloadOtpAuth({ secret: e.target.value })}
              placeholder="JBSWY3DPEHPK3PXP"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.algorithm')}</HighlightedLabel></Label>
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
              <Label><HighlightedLabel>{t('payload.digits')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.shortUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="https://bit.ly/xxxxx"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.shortLinkNote')}</p>
        </div>
      )}

      {/* UTM Campaign Link */}
      {payload.kind === 'utm_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.baseUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              value={payload.url.href} 
              onChange={(e) => setPayloadUrl({ href: e.target.value })}
              placeholder="https://anqr.link/landing"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.campaignSource')}</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmSource || ''} 
              onChange={(e) => setPayloadUrl({ utmSource: e.target.value })}
              placeholder="qr_code"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.campaignMedium')}</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmMedium || ''} 
              onChange={(e) => setPayloadUrl({ utmMedium: e.target.value })}
              placeholder="print"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.campaignName')}</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmCampaign || ''} 
              onChange={(e) => setPayloadUrl({ utmCampaign: e.target.value })}
              placeholder="summer_sale_2024"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.campaignTerm')}</HighlightedLabel></Label>
            <Input 
              value={payload.url.utmTerm || ''} 
              onChange={(e) => setPayloadUrl({ utmTerm: e.target.value })}
              placeholder="keyword"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.campaignContent')}</HighlightedLabel></Label>
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
            <Label><HighlightedLabel>{t('payload.platform')}</HighlightedLabel></Label>
            <Select defaultValue="universal">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="universal">{t('payload.universalLink')}</SelectItem>
                <SelectItem value="android">{t('payload.androidIntent')}</SelectItem>
                <SelectItem value="ios">iOS URL Scheme</SelectItem>
                <SelectItem value="custom">{t('payload.customScheme')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.deepLinkUrl')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="myapp://path/to/content"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.fallbackUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              placeholder="https://anqr.link/app"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.appLinkNote')}</p>
        </div>
      )}

      {/* GS1 Digital Link */}
      {payload.kind === 'gs1_digital_link' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.gtin')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="01234567890128"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.serialNumber')}</HighlightedLabel></Label>
            <Input 
              placeholder="ABC123"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.batchLot')}</HighlightedLabel></Label>
            <Input 
              placeholder="LOT123"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.expiryDate')}</HighlightedLabel></Label>
            <Input 
              type="date"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.resolverDomain')}</HighlightedLabel></Label>
            <Input 
              placeholder="id.gs1.org"
              defaultValue="id.gs1.org"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.gs1Note')}</p>
        </div>
      )}

      {/* Inventory/Asset Tag */}
      {(payload.kind as string) === '_removed_inventory' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.assetItemId')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="ASSET-001234"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.assetType')}</HighlightedLabel></Label>
            <Select defaultValue="equipment">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipment">{t('payload.equipment')}</SelectItem>
                <SelectItem value="furniture">{t('payload.furniture')}</SelectItem>
                <SelectItem value="it">IT Asset</SelectItem>
                <SelectItem value="vehicle">{t('payload.vehicle')}</SelectItem>
                <SelectItem value="inventory">{t('payload.inventoryItem')}</SelectItem>
                <SelectItem value="other">{t('payload.other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.location')}</HighlightedLabel></Label>
            <Input 
              placeholder="Building A, Room 101"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.description')}</HighlightedLabel></Label>
            <Input 
              placeholder="Dell Laptop 15-inch"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.lookupUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              placeholder="https://inventory.anqr.link/asset/"
            />
          </div>
        </div>
      )}

      {/* Ticketing */}
      {(payload.kind as string) === '_removed_ticketing' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.ticketId')}</HighlightedLabel></Label>
            <Input 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="TKT-2024-001234"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.eventName')}</HighlightedLabel></Label>
            <Input 
              placeholder="Concert 2024"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.venue')}</HighlightedLabel></Label>
            <Input 
              placeholder="Stadium Arena"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.dateTime')}</HighlightedLabel></Label>
            <Input 
              type="datetime-local"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label><HighlightedLabel>{t('payload.sectionZone')}</HighlightedLabel></Label>
              <Input 
                placeholder="Section A"
              />
            </div>
            <div className="space-y-2">
              <Label><HighlightedLabel>{t('payload.seat')}</HighlightedLabel></Label>
              <Input 
                placeholder="Row 5, Seat 12"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.attendeeName')}</HighlightedLabel></Label>
            <Input 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.validationUrl')}</HighlightedLabel></Label>
            <Input 
              type="url"
              placeholder="https://tickets.anqr.link/validate/"
            />
          </div>
        </div>
      )}

      {/* Custom Format */}
      {payload.kind === 'custom' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label><HighlightedLabel>{t('payload.rawData')}</HighlightedLabel></Label>
            <Textarea 
              value={payload.text} 
              onChange={(e) => setPayloadText(e.target.value)}
              placeholder="Enter raw QR code data..."
              rows={6}
              className="font-mono text-sm"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('hints.customNote')}</p>
        </div>
      )}

      {/* Validation Options (Advanced+) */}
      {(tier === 'advanced' || tier === 'professional') && (
        <div className="space-y-2 pt-4 border-t">
          <Label className="text-muted-foreground text-xs"><HighlightedLabel>{t('payload.validationOptions')}</HighlightedLabel></Label>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>{t('payload.validateInput')}</HighlightedLabel></Label>
            <Switch 
              checked={payload.validate}
              onCheckedChange={(checked) => setPayloadValidation({ validate: checked })}
              title={t('hints.validateInput')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>{t('payload.trimWhitespace')}</HighlightedLabel></Label>
            <Switch 
              checked={payload.trim}
              onCheckedChange={(checked) => setPayloadValidation({ trim: checked })}
              title={t('hints.trimWhitespace')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>{t('payload.normalizeNewlines')}</HighlightedLabel></Label>
            <Switch 
              checked={payload.normalizeNewlines}
              onCheckedChange={(checked) => setPayloadValidation({ normalizeNewlines: checked })}
              title={t('hints.normalizeNewlines')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm"><HighlightedLabel>{t('payload.maxLengthGuard')}</HighlightedLabel></Label>
            <Switch 
              checked={payload.maxLenGuard}
              onCheckedChange={(checked) => setPayloadValidation({ maxLenGuard: checked })}
              title={t('hints.maxLengthGuard')}
            />
          </div>
        </div>
      )}
    </div>
  )
}
