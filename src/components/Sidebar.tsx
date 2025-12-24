import { useQRStore } from '@/store/qr-store'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { PayloadSection } from '@/components/sections/PayloadSection'
import { QREncodingSection } from '@/components/sections/QREncodingSection'
import { RenderSection } from '@/components/sections/RenderSection'
import { OverlaySection } from '@/components/sections/OverlaySection'
import { AnimationSection } from '@/components/sections/AnimationSection'
import { OutputSection } from '@/components/sections/OutputSection'
import { SafetySection } from '@/components/sections/SafetySection'
import { WatermarkSection } from '@/components/sections/WatermarkSection'
import { MetadataSection } from '@/components/sections/MetadataSection'
import { ShareSection } from '@/components/sections/ShareSection'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Type, 
  QrCode, 
  Palette, 
  Image, 
  Play, 
  Download,
  Shield,
  Droplets,
  FileText,
  Share2,
  Search,
  RotateCcw,
  X,
  PanelLeftClose
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { SearchProvider } from '@/lib/search-context'

const SECTIONS = [
  { id: 'payload', label: 'Payload / Data', icon: Type, tier: 'basic' as const },
  { id: 'qr', label: 'QR Encoding', icon: QrCode, tier: 'basic' as const },
  { id: 'render', label: 'Rendering / Style', icon: Palette, tier: 'basic' as const },
  { id: 'overlay', label: 'Overlay / Image', icon: Image, tier: 'basic' as const },
  { id: 'animation', label: 'Animation', icon: Play, tier: 'basic' as const },
  { id: 'output', label: 'Output / Export', icon: Download, tier: 'basic' as const },
  { id: 'watermark', label: 'Watermark', icon: Droplets, tier: 'advanced' as const },
  { id: 'metadata', label: 'Metadata', icon: FileText, tier: 'advanced' as const },
  { id: 'share', label: 'Share', icon: Share2, tier: 'advanced' as const },
  { id: 'safety', label: 'Safety / QA', icon: Shield, tier: 'professional' as const },
]

// Comprehensive keywords for deep search within each section, organized by tier
// Includes all field labels, select options, and common synonyms
const SECTION_KEYWORDS: Record<string, { basic: string[], advanced: string[], professional: string[] }> = {
  payload: {
    basic: [
      // Field labels
      'text', 'content', 'type', 'plain text', 'url', 'link', 'website', 'https', 'http',
      // Content type dropdown options
      'plain', 'input'
    ],
    advanced: [
      // Phone
      'phone', 'telephone', 'tel', 'number', 'call',
      // Email
      'email', 'mailto', 'subject', 'body', 'address',
      // SMS
      'sms', 'mms', 'message', 'smsto',
      // WiFi
      'wifi', 'wi-fi', 'network', 'ssid', 'password', 'security', 'wpa', 'wpa2', 'wpa3', 'wep', 'hidden', 'open',
      // vCard
      'vcard', 'contact', 'name', 'full name', 'organization', 'org', 'title', 'role', 'address', 'birthday', 'bday', 'note', 'photo', 'version',
      // MeCard
      'mecard', 'nickname',
      // Event
      'event', 'calendar', 'vevent', 'icalendar', 'summary', 'location', 'description', 'start', 'end', 'timezone', 'tz', 'rrule', 'recurrence', 'rsvp',
      // Geo
      'geo', 'location', 'latitude', 'lat', 'longitude', 'lon', 'query', 'coordinates', 'gps',
      // Payment
      'payment', 'crypto', 'bitcoin', 'ethereum', 'litecoin', 'amount', 'label', 'wallet',
      // OTP
      'otpauth', 'totp', 'hotp', '2fa', 'authenticator', 'otp', 'issuer', 'account', 'secret', 'algorithm', 'sha1', 'sha256', 'sha512', 'digits', 'period', 'counter',
      // Social
      'social', 'facebook', 'instagram', 'twitter', 'linkedin', 'whatsapp', 'telegram', 'signal',
      // Documents
      'pdf', 'file', 'document', 'image', 'video', 'cloud', 'drive', 'dropbox',
      // EPC/SEPA/Payment rails
      'epc', 'sepa', 'bank', 'transfer', 'iban', 'bic', 'upi', 'paynow', 'promptpay', 'pix', 'alipay', 'wechat',
      // Validation options
      'validate', 'validation', 'input', 'trim', 'whitespace', 'normalize', 'newlines', 'max length', 'guard',
      // UTM
      'utm', 'source', 'medium', 'campaign', 'term', 'tracking', 'force https',
      // Bizcard
      'bizcard'
    ],
    professional: [
      // App links
      'app', 'deep link', 'intent', 'universal link', 'scheme', 'android', 'ios',
      // Custom
      'custom', 'format', 'raw', 'data',
      // GS1/Industrial
      'gs1', 'digital link', 'inventory', 'asset', 'tag', 'ticketing'
    ]
  },
  qr: {
    basic: [
      // Version
      'version', 'auto', 'size', 'capacity',
      // ECC
      'ecc', 'error correction', 'level', 'low', 'medium', 'quartile', 'high', 'l', 'm', 'q', 'h', 'reed solomon',
      // Quiet zone
      'quiet zone', 'margin', 'border', 'modules'
    ],
    advanced: [
      // Mask
      'mask', 'pattern', 'optimal', 'auto',
      // Encoding mode
      'encoding', 'mode', 'numeric', 'alphanumeric', 'byte', 'kanji', 'utf-8', 'binary', 'data mode',
      // Min enforce
      'enforce', 'minimum'
    ],
    professional: [
      // Structured append
      'structured append', 'multi-qr', 'split', 'index', 'count', 'parity', 'symbols',
      // FNC1/GS1
      'fnc1', 'gs1', 'first position', 'second position', 'ai', 'application identifier',
      // ECI
      'eci', 'extended channel interpretation', 'character set', 'charset',
      // Segment
      'segment', 'optimize', 'optimization',
      // Model
      'model', 'model1', 'model2', 'legacy', 'standard',
      // Micro/rMQR
      'micro qr', 'micro', 'rmqr', 'rectangular',
      // Structure
      'finder', 'separator', 'timing', 'alignment', 'dark module', 'format info', 'version info'
    ]
  },
  render: {
    basic: [
      // Module
      'module', 'size', 'pixel', 'px', 'scale',
      // Gap
      'gap', 'spacing', 'percent',
      // Module style dropdown
      'style', 'square', 'rounded', 'dots', 'dot', 'diamond', 'connected',
      // Finder style dropdown
      'finder', 'pattern',
      // Alignment style dropdown  
      'alignment', 'match finder',
      // Timing style dropdown
      'timing', 'match module', 'solid', 'dashed',
      // Colors
      'color', 'foreground', 'fg', 'background', 'bg', 'transparent'
    ],
    advanced: [
      // Gap mode dropdown
      'gap mode', 'inset', 'stroke', 'negative space', 'none',
      // Corner radius
      'corner', 'radius', 'round',
      // Gradient dropdown
      'gradient', 'linear', 'radial', 'conic', 'stops',
      // Eye styles
      'eye', 'outer', 'inner', 'outer style', 'inner style',
      // Eye scale
      'eye scale',
      // Frame dropdown
      'frame', 'frame style', 'rounded frame', 'sticker', 'tag', 'frame text',
      // Dot rotation
      'dot rotation', 'rotation', 'degree', 'rotate'
    ],
    professional: [
      // Crisp edges
      'crisp', 'crisp edges', 'pixelated', 'sharp',
      // Pixel snap dropdown
      'pixel snap', 'floor', 'round', 'ceil',
      // Per-module color mode dropdown
      'per-module', 'color mode', 'by brightness', 'by position', 'by overlay', 'by cluster',
      // Palette
      'palette', 'add color',
      // Contrast guard
      'contrast', 'guard', 'ratio', 'min contrast', 'wcag'
    ]
  },
  overlay: {
    basic: [
      // Upload
      'image', 'gif', 'upload', 'file', 'enable',
      // Mode dropdown
      'blend', 'blend mode', 'mode', 'center', 'logo',
      // Intensity
      'intensity',
      // Color mode dropdown
      'color mode', 'full color', 'grayscale', 'black white', 'bw',
      // Preserve
      'preserve', 'finder', 'finder patterns'
    ],
    advanced: [
      // Blend modes dropdown
      'halftone', 'subpixel', 'dithered', 'blue noise', 'mosaic', 'gapfill', 'brightness', 'duotone',
      // Invert
      'invert',
      // Fit mode dropdown
      'fit', 'fit mode', 'cover', 'contain', 'stretch',
      // Rotation
      'rotation', 'rotate', 'degree',
      // Flip
      'flip', 'flip x', 'flip y', 'horizontal', 'vertical',
      // Image adjustments
      'brightness', 'contrast', 'gamma', 'saturation', 'hue', 'hue rotate',
      // Blur/sharpen
      'blur', 'sharpen',
      // Posterize
      'posterize', 'levels',
      // Threshold
      'threshold',
      // Edge detect dropdown
      'edge', 'edge detection', 'detect', 'sobel', 'canny',
      // Preserve timing/alignment
      'timing', 'alignment', 'preserve timing', 'preserve alignment',
      // Dither kind dropdown
      'dither', 'dither kind', 'error diffusion', 'blue noise threshold', 'true dither',
      // Diffusion kernel dropdown
      'diffusion', 'kernel', 'floyd steinberg', 'floyd-steinberg', 'jarvis', 'judice', 'ninke', 'jjn', 'stucki', 'burkes', 'sierra', 'atkinson',
      // Dither strength
      'dither strength', 'strength',
      // Serpentine
      'serpentine', 'scanning',
      // Ordered matrix dropdown
      'ordered', 'matrix', 'bayer', '2x2', '4x4', '8x8', 'clustered dot', 'void cluster',
      // Blue noise settings
      'tile', 'tile size', 'seed',
      // Color dither dropdown
      'color dither', 'per channel', 'perceptual',
      // Subpixel settings
      'subpixel', 'grid size', '2x2', '3x3', '4x4', 'center rule', 'strict', 'halftone center', 'neutral color', 'finder override', 'stylized',
      // Halftone settings
      'halftone', 'cell', 'cell size', 'per module', 'n×n', 'dot shape', 'circle', 'square', 'line', 'brightness curve', 's-curve',
      // Duotone
      'duotone', 'colors', 'shadow', 'highlight',
      // GIF settings
      'frame', 'frame delays', 'use frame delays', 'fps', 'max fps', 'disposal', 'disposal handling', 'respect', 'simplify',
      // Crop
      'crop', 'region'
    ],
    professional: [
      // More blend modes
      'pixelate', 'outline', 'wave', 'subpixel-size', 'extreme',
      // ECC aware
      'ecc aware', 'ecc-aware', 'risk', 'risk budget', 'budget', 'weight', 'weight map', 'heatmap', 'distance to finders', 'block heatmap', 'empirical',
      // Protect
      'protect', 'format info', 'version info', 'protect format', 'protect version',
      // Advanced dithering
      'white noise', 'gaussian', 'triangular', 'screened', 'edge-aware', 'adaptive', 'temporal'
    ]
  },
  animation: {
    basic: [
      // Speed
      'speed', 'frame speed', 'ms', 'milliseconds',
      // Loop
      'loop', 'loop animation',
      // Bounce
      'bounce', 'ping-pong', 'ping pong'
    ],
    advanced: [
      // Start frame
      'start', 'start frame',
      // Max frames
      'max', 'max frames',
      // Frame step
      'step', 'frame step', 'every',
      // Interpolation dropdown
      'interpolate', 'interpolation', 'crossfade', 'morph', 'none'
    ],
    professional: [
      // Temporal dither dropdown
      'temporal', 'temporal dither', 'blue noise', 'flicker', 'flicker safe',
      // Pattern dropdown
      'pattern', 'generated pattern', 'pulse', 'wave', 'scanline', 'shimmer', 'drift',
      // Module jitter
      'jitter', 'module jitter',
      // Color cycle
      'color', 'color cycle', 'cycle',
      // Seed
      'seed', 'random seed',
      // Play/pause
      'play', 'pause', 'playing',
      // Delay
      'delay', 'per frame delay'
    ]
  },
  output: {
    basic: [
      // Format dropdown
      'format', 'png', 'webp', 'gif', 'svg',
      // Dimensions
      'width', 'height', 'dimension', 'size', 'output size',
      // Quality
      'quality'
    ],
    advanced: [
      // Filename
      'filename', 'name',
      // GIF settings
      'palette', 'palette size',
      // Quantizer dropdown
      'quantizer', 'median cut', 'median-cut', 'neuquant', 'octree',
      // GIF dither dropdown
      'dither', 'dithering', 'floyd', 'ordered', 'off',
      // Transparent
      'transparent', 'transparent color',
      // SVG settings
      'vector', 'true vector', 'raster',
      // Shape precision dropdown
      'shape', 'precision', 'shape precision', 'pixel', 'precise',
      // Embed
      'embed', 'embed raster', 'overlay',
      // Background override
      'background', 'bg', 'override', 'background override'
    ],
    professional: [
      // Extra formats dropdown
      'pdf', 'eps', 'apng', 'animated png', 'animated webp',
      // DPI
      'dpi', 'print', 'resolution', 'ppi',
      // Include quiet zone
      'include', 'quiet zone', 'include quiet zone',
      // Metadata
      'metadata', 'svg metadata'
    ]
  },
  watermark: {
    basic: [],
    advanced: [
      // Enable
      'enable', 'watermark',
      // Type dropdown
      'type', 'text', 'image', 'pattern',
      // Text
      'text',
      // Image upload
      'image', 'upload', 'logo',
      // Position dropdown
      'position', 'center', 'corners', 'edges', 'behind', 'quiet zone',
      // Opacity
      'opacity', 'alpha',
      // Blend dropdown
      'blend', 'blend mode', 'normal', 'multiply', 'screen', 'overlay'
    ],
    professional: []
  },
  metadata: {
    basic: [],
    advanced: [
      // Fields
      'title', 'author', 'copyright', 'license', 'description',
      // Creation time
      'creation', 'creation time', 'time', 'date', 'include creation',
      // Custom KV
      'custom', 'custom metadata', 'key', 'value', 'field', 'add custom'
    ],
    professional: []
  },
  share: {
    basic: [],
    advanced: [
      // Direct link
      'direct', 'direct link', 'link', 'url', 'shareable',
      // Embed
      'embed', 'embed html', 'html', 'code',
      // Encode params
      'encode', 'parameters', 'all parameters', 'settings',
      // Copy
      'copy', 'clipboard', 'quick share'
    ],
    professional: []
  },
  safety: {
    basic: [],
    advanced: [],
    professional: [
      // Safety mode dropdown
      'safety', 'mode', 'strict', 'balanced', 'off',
      // Min module
      'min', 'minimum', 'module', 'module size', 'min module',
      // Min quiet zone
      'quiet zone', 'min quiet zone',
      // Locks
      'lock', 'protection', 'lock finders', 'lock timing', 'lock alignment', 'lock format', 'lock version',
      // QA
      'qa', 'quality', 'analysis', 'quality analysis',
      // Contrast check
      'contrast', 'contrast check',
      // Show heatmap
      'heatmap', 'show heatmap',
      // Simulate
      'simulate', 'blur', 'simulate blur', 'noise', 'simulate noise', 'rotation', 'simulate rotation',
      // Readability
      'readability', 'score', 'score readability',
      // Auto-tuning
      'auto', 'auto-tuning', 'tuning',
      // Auto pick
      'pick', 'auto-pick', 'pick version', 'pick mask', 'pick ecc',
      // Reduce intensity
      'reduce', 'intensity', 'reduce intensity', 'until safe', 'scannable'
    ]
  }
}

// Get keywords available for a section at the current tier
function getAvailableKeywords(sectionId: string, currentTier: 'basic' | 'advanced' | 'professional'): string[] {
  const keywords = SECTION_KEYWORDS[sectionId]
  if (!keywords) return []
  
  let available = [...keywords.basic]
  if (currentTier === 'advanced' || currentTier === 'professional') {
    available = [...available, ...keywords.advanced]
  }
  if (currentTier === 'professional') {
    available = [...available, ...keywords.professional]
  }
  return available
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { tier } = useQRStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [openSections, setOpenSections] = useState<string[]>(['payload'])
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Click outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        if (window.innerWidth < 1024) {
          onClose()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  // Reset all settings
  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      window.location.reload()
    }
  }

  // Filter sections by tier and search
  const visibleSections = SECTIONS.filter(section => {
    // Tier filter
    if (section.tier === 'advanced' && tier === 'basic') return false
    if (section.tier === 'professional' && tier !== 'professional') return false
    
    // Search filter - check section label AND keywords available at current tier
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const labelMatch = section.label.toLowerCase().includes(query)
      const keywords = getAvailableKeywords(section.id, tier)
      const keywordMatch = keywords.some(keyword => keyword.toLowerCase().includes(query))
      return labelMatch || keywordMatch
    }
    return true
  })

  // Auto-expand sections that match the search
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchingSections = SECTIONS.filter(section => {
        // Check tier first
        if (section.tier === 'advanced' && tier === 'basic') return false
        if (section.tier === 'professional' && tier !== 'professional') return false
        
        const labelMatch = section.label.toLowerCase().includes(query)
        const keywords = getAvailableKeywords(section.id, tier)
        const keywordMatch = keywords.some(keyword => keyword.toLowerCase().includes(query))
        return labelMatch || keywordMatch
      }).map(s => s.id)
      
      if (matchingSections.length > 0) {
        setOpenSections(matchingSections)
      }
    }
    // Note: Don't reset when search is cleared - let user keep their open sections
  }, [searchQuery, tier])

  // When tier changes, keep currently open sections that are still visible,
  // and add any newly available sections if user upgraded
  useEffect(() => {
    setOpenSections(prev => {
      // Keep sections that are still visible at the new tier
      const stillVisible = prev.filter(sectionId => {
        const section = SECTIONS.find(s => s.id === sectionId)
        if (!section) return false
        if (section.tier === 'basic') return true
        if (section.tier === 'advanced') return tier === 'advanced' || tier === 'professional'
        if (section.tier === 'professional') return tier === 'professional'
        return false
      })
      
      // If nothing is open after filtering, default to payload
      return stillVisible.length > 0 ? stillVisible : ['payload']
    })
  }, [tier])

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'payload': return <PayloadSection />
      case 'qr': return <QREncodingSection />
      case 'render': return <RenderSection />
      case 'overlay': return <OverlaySection />
      case 'animation': return <AnimationSection />
      case 'output': return <OutputSection />
      case 'watermark': return <WatermarkSection />
      case 'metadata': return <MetadataSection />
      case 'share': return <ShareSection />
      case 'safety': return <SafetySection />
      default: return null
    }
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50
          w-80 lg:w-96 bg-card border-r shadow-xl
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
          flex flex-col overflow-hidden
        `}
      >
        {/* Header */}
        <div className="p-4 border-b bg-muted/30 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Settings</h2>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={handleReset}
                title="Reset all settings"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={onClose}
                title="Hide panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search settings..."
              className="pl-9 h-9 bg-background"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto">
          <div className="h-3" /> {/* Space before first section */}
          <Accordion 
            type="multiple" 
            value={openSections}
            onValueChange={setOpenSections}
            className="px-4"
          >
            {visibleSections.map(section => {
              const Icon = section.icon
              return (
                <AccordionItem key={section.id} value={section.id} className="border-none mb-1">
                  <AccordionTrigger className="hover:no-underline py-0 px-3 -mx-3 bg-muted/50 rounded-md shadow-sm [&>svg]:ml-auto">
                    <div className="flex items-center gap-2 py-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{section.label}</span>
                      {section.tier !== 'basic' && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          section.tier === 'advanced' 
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                            : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                        }`}>
                          {section.tier === 'advanced' ? 'ADV' : 'PRO'}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pt-3 px-4 mt-1 bg-card rounded-md shadow-sm border">
                    <SearchProvider searchQuery={searchQuery}>
                      {renderSection(section.id)}
                    </SearchProvider>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground">© ANQR 2025. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-1">
            <a href="#privacy" className="hover:underline">Privacy</a>
            {' · '}
            <a href="#terms" className="hover:underline">Terms</a>
            {' · '}
            <a href="#contact" className="hover:underline">Contact</a>
          </p>
        </div>
      </aside>
    </>
  )
}
