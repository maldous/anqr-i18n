import { useQRStore, Tier } from '@/store/qr-store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Share2, Moon, Sun, Menu, PanelLeft, Check, Grid3x3, Play } from 'lucide-react'
import { Capacitor } from '@capacitor/core'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { copyToClipboard, getShareableUrl } from '@/modules/share-utils'
import { showRewardedAd, prepareRewardedAd } from '@/modules/admob-service'
import { gallerySections, type GalleryCategory } from '@/data/gallery-items'
import type { StaticPageType } from '@/components/StaticPage'

// Dynamic icon component for gallery filters
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return Icon ? <Icon className={className} /> : null
}

type HeaderPage = 'editor' | 'gallery' | StaticPageType

const NAV_LINKS: Array<{ href: string; label: string; page: HeaderPage }> = [
  { href: '/', label: 'Generator', page: 'editor' },
  { href: '/gallery', label: 'Gallery', page: 'gallery' },
  { href: '/docs', label: 'Guide', page: 'docs' },
  { href: '/about', label: 'About', page: 'about' },
  { href: '/privacy', label: 'Privacy', page: 'privacy' },
  { href: '/terms', label: 'Terms', page: 'terms' },
  { href: '/contact', label: 'Contact', page: 'contact' },
]

interface HeaderProps {
  onToggleSidebar?: () => void
  onExport?: () => void
  sidebarOpen?: boolean
  showGallery?: boolean
  activePage?: HeaderPage
  galleryFilter?: GalleryCategory | 'all'
  onGalleryFilterChange?: (filter: GalleryCategory | 'all') => void
  onNavigate?: (page: HeaderPage) => void
}

export function Header({ onToggleSidebar, onExport, sidebarOpen = false, showGallery = false, activePage, galleryFilter = 'all', onGalleryFilterChange, onNavigate }: HeaderProps) {
  const { tier, setTier, getPayloadText, qr, render, overlay, activatePremiumAccess, checkPremiumAccess } = useQRStore()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loadingAd, setLoadingAd] = useState(false)

  const resolvedPage: HeaderPage = activePage ?? (showGallery ? 'gallery' : 'editor')
  const isEditor = resolvedPage === 'editor'
  const isGallery = resolvedPage === 'gallery'
  const isStatic = !isEditor && !isGallery

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  // Prepare premium rewarded ad on mount (for native platforms)
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      prepareRewardedAd('premium')
    }
  }, [])

  // Handle tier change - Professional requires watching ad on native
  const handleTierChange = async (newTier: Tier) => {
    // If selecting Professional on native platform, require watching ad
    if (newTier === 'professional' && Capacitor.isNativePlatform()) {
      // If already has premium access, allow direct selection
      if (checkPremiumAccess()) {
        setTier(newTier)
        return
      }
      
      // Show rewarded ad
      setLoadingAd(true)
      try {
        const reward = await showRewardedAd('premium')
        if (reward) {
          // User watched the ad, grant premium access
          activatePremiumAccess()
          setTier('professional')
        }
        // If reward is null, user didn't complete the ad - don't change tier
      } catch (error) {
        console.error('Failed to show rewarded ad:', error)
      } finally {
        setLoadingAd(false)
        // Prepare next ad
        prepareRewardedAd('premium')
      }
    } else {
      // Web or non-professional tier - allow direct change
      setTier(newTier)
    }
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', String(newMode))
    document.documentElement.classList.toggle('dark', newMode)
  }

  const handleShare = async () => {
    const shareConfig = {
      data: getPayloadText(),
      ec: qr.ecc,
      version: qr.version,
      size: render.modulePx,
      margin: qr.quietZoneModules,
      fg: render.fgColor,
      bg: render.bgColor,
      style: render.moduleStyle,
      finder: render.finderStyle,
      mode: overlay.enabled ? overlay.mode : undefined,
      intensity: overlay.enabled ? overlay.intensity : undefined,
      overlayUrl: overlay.enabled && overlay.url ? overlay.url : undefined,
    }
    const url = getShareableUrl(shareConfig)
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
    <header className={`border-b bg-card shadow-md sticky top-0 z-50 transition-all duration-300 ${sidebarOpen && isEditor ? 'lg:ml-96' : ''}`} style={{ paddingTop: 'max(var(--sat, 0px), env(safe-area-inset-top, 0px))' }}>
      <div className="px-4 flex items-center justify-between h-[52px]">
        <div className="flex items-center gap-6">
          {/* Settings toggle - only in editor mode, placeholder space on other pages */}
          {isEditor ? (
            <button
              onClick={onToggleSidebar}
              className="flex items-center justify-center w-8 h-8 hover:opacity-80 cursor-pointer"
              title="Toggle settings panel"
            >
              <PanelLeft className="h-6 w-6 text-muted-foreground" />
            </button>
          ) : (
            /* Placeholder space to keep layout consistent with Generator */
            <div className="hidden lg:block w-8 h-8" />
          )}
          
          {/* ANQR logo/title - always navigates to generator */}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onNavigate?.('editor')
            }}
            className="flex items-center gap-2 transition-opacity hover:opacity-80 cursor-pointer"
            title="ANQR - QR Code Generator"
          >
            <span className="text-xl font-bold leading-6">ANQR</span>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => {
              const isActive = link.page === resolvedPage
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive 
                      ? 'text-foreground bg-muted font-medium' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={(e) => {
                    if (!onNavigate) return
                    e.preventDefault()
                    onNavigate(link.page)
                  }}
                  title={`Go to ${link.label}`}
                >
                  {link.label}
                </a>
              )
            })}
            
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Gallery Filter - icon buttons right-justified next to dark mode toggle */}
          {isGallery && (
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => onGalleryFilterChange?.('all')}
                className={`p-2 rounded-md transition-colors ${
                  galleryFilter === 'all'
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title="All Categories"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              {gallerySections.map(section => (
                <button
                  key={section.id}
                  onClick={() => onGalleryFilterChange?.(section.id)}
                  className={`p-2 rounded-md transition-colors ${
                    galleryFilter === section.id
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={section.title}
                >
                  <DynamicIcon name={section.icon} className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}
          
          {/* Tier Toggle */}
          {isEditor && (
            <>
              <div className="hidden sm:block">
                <Tabs value={tier} onValueChange={(v) => handleTierChange(v as Tier)}>
                  <TabsList className="shadow-sm">
                    <TabsTrigger value="basic" className="text-xs px-3" title="Basic mode - Essential QR code features" disabled={loadingAd}>
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-xs px-3" title="Advanced mode - Additional styling and encoding options" disabled={loadingAd}>
                      Advanced
                    </TabsTrigger>
                    <TabsTrigger value="professional" className="text-xs px-3 gap-1" title={Capacitor.isNativePlatform() && !checkPremiumAccess() ? "Watch ad to unlock Professional features for 24 hours" : "Professional mode - Full feature set"} disabled={loadingAd}>
                      {Capacitor.isNativePlatform() && !checkPremiumAccess() && <Play className="w-3 h-3" />}
                      Pro
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="sm:hidden">
                <Select value={tier} onValueChange={(v) => handleTierChange(v as Tier)} disabled={loadingAd}>
                  <SelectTrigger className="w-[100px] h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">
                      <span className="flex items-center gap-1">
                        {Capacitor.isNativePlatform() && !checkPremiumAccess() && <Play className="w-3 h-3" />}
                        Pro
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Actions */}
          {isEditor && (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm" className="shadow-sm" onClick={handleShare} title="Copy shareable link to clipboard">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Share'}
              </Button>
              <Button size="sm" className="shadow-sm" onClick={onExport} title="Export QR code to file">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Dark Mode Toggle - always on far right */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-9 w-9" title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card p-3 space-y-2">
          {/* Nav links as full-width vertical buttons */}
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(link => {
              const isActive = link.page === resolvedPage
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`w-full px-4 py-3 text-sm rounded-md text-center transition-colors ${
                    isActive 
                      ? 'text-foreground bg-muted font-medium' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault()
                      onNavigate(link.page)
                    }
                    setMobileMenuOpen(false)
                  }}
                  title={`Go to ${link.label}`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>


        </div>
      )}

    </header>

      {/* Mobile Footer Bar - Share/Export buttons fixed at bottom (only in editor mode on mobile) */}
      {/* On native platforms (Android/iOS), position above footer (~110px: 70px ad + ~40px footer) */}
      {isEditor && (
        <div 
          className="md:hidden fixed left-0 right-0 z-50 border-t bg-card p-2" 
          style={{ 
            bottom: Capacitor.isNativePlatform() ? '90px' : '48px',
            paddingBottom: Capacitor.isNativePlatform() ? '0.25rem' : 'calc(0.5rem + var(--sab, 0px))' 
          }}
        >
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare} title="Copy shareable link to clipboard">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
              {copied ? 'Copied!' : 'Share'}
            </Button>
            <Button size="sm" className="flex-1" onClick={onExport} title="Export QR code to file">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
