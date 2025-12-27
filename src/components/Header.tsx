import { useQRStore, Tier } from '@/store/qr-store'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, Share2, Moon, Sun, Menu, PanelLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { copyToClipboard, getShareableUrl } from '@/modules/share-utils'
import { AdUnit } from '@/components/AdUnit'
import { gallerySections, type GalleryCategory } from '@/data/gallery-items'
import type { StaticPageType } from '@/components/StaticPage'

type HeaderPage = 'editor' | 'gallery' | StaticPageType

const NAV_LINKS: Array<{ href: string; label: string; page: HeaderPage }> = [
  { href: '/', label: 'Generator', page: 'editor' },
  { href: '/gallery', label: 'Gallery', page: 'gallery' },
  { href: '/about', label: 'About', page: 'about' },
  { href: '/docs', label: 'Docs', page: 'docs' },
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
  const { tier, setTier, getPayloadText, qr, render, overlay } = useQRStore()
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

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
    <header className={`border-b bg-card shadow-md sticky top-0 z-50 transition-all duration-300 ${sidebarOpen && isEditor ? 'lg:ml-96' : ''}`}>
      <div className="px-4 flex items-center justify-between h-[52px]">
        <div className="flex items-center gap-6">
          {/* Settings toggle - only in editor mode */}
          {isEditor && (
            <button
              onClick={onToggleSidebar}
              className="flex items-center justify-center w-8 h-8 hover:opacity-80 cursor-pointer"
              title="Toggle settings panel"
            >
              <PanelLeft className="h-6 w-6 text-muted-foreground" />
            </button>
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
                >
                  {link.label}
                </a>
              )
            })}
            
            {/* Gallery Filter - shown after Gallery nav link */}
            {isGallery && (
              <>
                <span className="text-muted-foreground mx-1">|</span>
                <button
                  onClick={() => onGalleryFilterChange?.('all')}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    galleryFilter === 'all'
                      ? 'text-foreground bg-muted font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  All
                </button>
                {gallerySections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => onGalleryFilterChange?.(section.id)}
                    className={`px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                      galleryFilter === section.id
                        ? 'text-foreground bg-muted font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {section.title.split(' ')[0]}
                  </button>
                ))}
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Tier Toggle */}
          {isEditor && (
            <>
              <div className="hidden sm:block">
                <Tabs value={tier} onValueChange={(v) => {
                  setTier(v as Tier)
                }}>
                  <TabsList className="shadow-sm">
                    <TabsTrigger value="basic" className="text-xs px-3">
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-xs px-3">
                      Advanced
                    </TabsTrigger>
                    <TabsTrigger value="professional" className="text-xs px-3">
                      Professional
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="sm:hidden">
                <Select value={tier} onValueChange={(v) => {
                  setTier(v as Tier)
                }}>
                  <SelectTrigger className="w-[100px] h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Actions */}
          {isEditor && (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="sm" className="shadow-sm" onClick={handleShare}>
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Share'}
              </Button>
              <Button size="sm" className="shadow-sm" onClick={onExport}>
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
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Dark Mode Toggle - always on far right */}
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-9 w-9">
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
      {isEditor && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
              {copied ? 'Copied!' : 'Share'}
            </Button>
            <Button size="sm" className="flex-1" onClick={onExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
