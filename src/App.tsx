import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/Sidebar'
import { Preview } from '@/components/Preview'
import { Header } from '@/components/Header'
import { Gallery } from '@/components/Gallery'
import { StaticPage, type StaticPageType } from '@/components/StaticPage'
import { useState, useEffect, useCallback } from 'react'
import { Capacitor } from '@capacitor/core'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { useQRStore, type Tier } from '@/store/qr-store'
import { parseUrlParams } from '@/modules/share-utils'
import type { GalleryCategory } from '@/data/gallery-items'

type PageView = 'editor' | 'gallery' | StaticPageType

function getPageFromLocation(): PageView {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const hash = window.location.hash.replace(/^#/, '')

  // Prefer clean paths when present.
  if (path === '/gallery') return 'gallery'
  if (path === '/about') return 'about'
  if (path === '/privacy') return 'privacy'
  if (path === '/terms') return 'terms'
  if (path === '/contact') return 'contact'
  if (path === '/docs') return 'docs'

  // Backward-compatible hash routes.
  if (hash === 'gallery') return 'gallery'
  if (hash === 'about' || hash === 'privacy' || hash === 'terms' || hash === 'contact' || hash === 'docs') return hash as StaticPageType

  return 'editor'
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState<PageView>('editor')
  const [galleryFilter, setGalleryFilter] = useState<GalleryCategory | 'all'>('all')
  const { download } = useQRGenerator()
  const { setOverlayUrl, setOverlayFile, setOverlayEnabled, setOverlayMode, setOverlayIntensity,
          setPayloadText, setPayloadKind, setPayloadUrl, setTier, setQrEcc, setQrVersion, setRenderModulePx, setQrQuietZone,
          setRenderFgColor, setRenderBgColor, setRenderModuleStyle, setRenderFinderStyle,
          setOverlayColorMode, setOverlayBrightness, setOverlayContrast, setOverlayGamma,
          setOverlayInvert, setOverlayDitherKind, setOverlayDiffusionKernel, setOverlayDitherStrength,
          setOverlaySaturation, setOverlayHueRotate, setOverlayBlur, setOverlaySharpen,
          setOverlayPosterize, setOverlayThreshold, setOverlayEdgeDetect } = useQRStore()

  const navigateTo = useCallback((page: PageView) => {
    const nextPath = page === 'editor' ? '/' : `/${page}`
    const nextSearch = page === 'editor' ? window.location.search : ''

    // Avoid unnecessary history entries.
    const current = window.location.pathname.replace(/\/+$/, '') || '/'
    if (current === nextPath && window.location.search === nextSearch) {
      setCurrentPage(page)
      return
    }

    window.history.pushState({}, '', `${nextPath}${nextSearch}`)
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Handle location changes for routing (paths + legacy hash)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPage(getPageFromLocation())
    }

    handleLocationChange()

    window.addEventListener('popstate', handleLocationChange)
    window.addEventListener('hashchange', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      window.removeEventListener('hashchange', handleLocationChange)
    }
  }, [])
  
  // Convenience booleans for view states
  const showGallery = currentPage === 'gallery'
  const showStaticPage = ['about', 'privacy', 'terms', 'contact', 'docs'].includes(currentPage)
  const showEditor = currentPage === 'editor'

  // Load settings from URL parameters on mount (editor share links)
  useEffect(() => {
    if (getPageFromLocation() !== 'editor') return
    const params = parseUrlParams()
    
    // Determine required tier based on params used
    let requiredTier: Tier = 'basic'
    
    // Check for advanced features
    if (params.mode || params.overlayUrl || params.intensity !== undefined) {
      requiredTier = 'advanced'
    }
    if (params.style && params.style !== 'square') {
      requiredTier = 'advanced'
    }
    if (params.finder && params.finder !== 'square') {
      requiredTier = 'advanced'
    }
    if (params.fg && params.fg !== '#000000') {
      requiredTier = 'advanced'
    }
    if (params.bg && params.bg !== '#ffffff') {
      requiredTier = 'advanced'
    }
    
    // Set the tier first so UI shows correct options
    if (requiredTier !== 'basic') {
      setTier(requiredTier)
    }
    
    // Apply URL parameters to store
    if (params.data) {
      const data = params.data
      
      // Detect payload type from data and set appropriate kind
      if (data.startsWith('mailto:')) {
        setPayloadKind('email')
        setPayloadText(data)
      } else if (data.startsWith('tel:')) {
        setPayloadKind('tel')
        setPayloadText(data)
      } else if (data.startsWith('sms:')) {
        setPayloadKind('sms')
        setPayloadText(data)
      } else if (data.startsWith('geo:')) {
        setPayloadKind('geo')
        setPayloadText(data)
      } else if (data.startsWith('WIFI:')) {
        setPayloadKind('wifi')
        setPayloadText(data)
      } else if (data.startsWith('BEGIN:VCARD')) {
        setPayloadKind('vcard')
        setPayloadText(data)
      } else if (data.startsWith('BEGIN:VEVENT')) {
        setPayloadKind('event')
        setPayloadText(data)
      } else if (data.startsWith('MECARD:')) {
        setPayloadKind('mecard')
        setPayloadText(data)
      } else if (data.startsWith('http://') || data.startsWith('https://')) {
        setPayloadKind('url')
        setPayloadUrl({ href: data })
        setPayloadText(data)
      } else {
        // Plain text or custom format
        setPayloadKind('plain_text')
        setPayloadText(data)
      }
    }
    
    if (params.ec) setQrEcc(params.ec as 'L' | 'M' | 'Q' | 'H')
    if (params.version) setQrVersion(params.version)
    if (params.size) setRenderModulePx(params.size)
    if (params.margin !== undefined) setQrQuietZone(params.margin)
    if (params.fg) setRenderFgColor(params.fg)
    if (params.bg) setRenderBgColor(params.bg)
    if (params.style) setRenderModuleStyle(params.style as 'square' | 'rounded' | 'dots' | 'diamond' | 'connected')
    if (params.finder) setRenderFinderStyle(params.finder as 'square' | 'rounded' | 'circle')
    if (params.mode) setOverlayMode(params.mode as any)
    if (params.intensity !== undefined) setOverlayIntensity(params.intensity)
    
    // Apply preprocessing params
    if (params.colorMode) setOverlayColorMode(params.colorMode as 'color' | 'grayscale' | 'bw')
    if (params.brightness !== undefined) setOverlayBrightness(params.brightness)
    if (params.contrast !== undefined) setOverlayContrast(params.contrast)
    if (params.gamma !== undefined) setOverlayGamma(params.gamma)
    if (params.saturation !== undefined) setOverlaySaturation(params.saturation)
    if (params.hue !== undefined) setOverlayHueRotate(params.hue)
    if (params.blur !== undefined) setOverlayBlur(params.blur)
    if (params.sharpen !== undefined) setOverlaySharpen(params.sharpen)
    if (params.posterize !== undefined) setOverlayPosterize(params.posterize)
    if (params.threshold !== undefined) setOverlayThreshold(params.threshold)
    if (params.edge) setOverlayEdgeDetect(params.edge as 'off' | 'sobel' | 'canny')
    if (params.invert) setOverlayInvert(params.invert)
    
    // Apply dithering params
    if (params.ditherKind) setOverlayDitherKind(params.ditherKind as any)
    if (params.diffusionKernel) setOverlayDiffusionKernel(params.diffusionKernel as any)
    if (params.ditherStrength !== undefined) setOverlayDitherStrength(params.ditherStrength)
    
    // Load overlay from URL if provided
    if (params.overlayUrl) {
      loadOverlayFromUrl(params.overlayUrl)
    }
  }, [])

  // Load overlay image from URL
  const loadOverlayFromUrl = async (url: string) => {
    // Validate that it's a proper URL
    try {
      const parsed = new URL(url)
      if (!parsed.protocol.startsWith('http')) {
        console.error('Invalid overlay URL - must be http/https:', url)
        return
      }
    } catch {
      console.error('Invalid overlay URL format:', url)
      return
    }
    
    try {
      console.log('Loading overlay from URL:', url)
      const response = await fetch(url, { mode: 'cors' })
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`)
      
      const blob = await response.blob()
      const filename = url.split('/').pop()?.split('?')[0] || 'image'
      const file = new File([blob], filename, { type: blob.type })
      
      setOverlayUrl(url)
      setOverlayFile(file)
      setOverlayEnabled(true)
      console.log('Overlay loaded successfully from URL')
    } catch (err) {
      console.error('Failed to load overlay from URL:', err)
    }
  }

  return (
    <TooltipProvider>
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={showEditor ? sidebarOpen : false} 
          onExport={download}
          showGallery={showGallery}
          activePage={currentPage}
          galleryFilter={galleryFilter}
          onGalleryFilterChange={setGalleryFilter}
          onNavigate={navigateTo}
        />
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Mobile layout: Sidebar and Preview in column, both visible */}
          {/* Desktop/Tablet: Sidebar is fixed, Preview takes remaining space */}
          
          {/* Sidebar - only shown in editor mode */}
          {showEditor && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
          
          {/* Main content area - conditionally render active page */}
          {/* On native editor: pb-44 for Footer + Share/Export + AdMob. On native non-editor: pb-40 for Footer + AdMob */}
          {/* On web: pb-12 for footer */}
          <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${Capacitor.isNativePlatform() ? (showEditor ? 'pb-36' : 'pb-40') : 'pb-12'}`}>
            {showEditor && <Preview sidebarOpen={sidebarOpen} />}
            {showGallery && <Gallery filter={galleryFilter} />}
            {showStaticPage && <StaticPage page={currentPage as StaticPageType} />}
          </div>
        </div>
        {/* Fixed Footer - visible on all platforms */}
        {/* On native: always positioned just above AdMob banner (~70px). Same position on all pages. */}
        <footer 
          className={`border-t bg-background py-2 fixed left-0 right-0 z-40 transition-all duration-300 ${sidebarOpen && showEditor ? 'lg:ml-96' : ''}`}
          style={{ bottom: Capacitor.isNativePlatform() ? '50px' : '0' }}
        >
          {/* Inner wrapper with margins to center over QR area (between ad columns) */}
          <div className="px-4 lg:mx-[160px] text-center flex items-center justify-center min-h-[24px]">
            <p className="text-xs text-muted-foreground">
              <a
                href="/docs"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('docs')
                }}
              >
                Guide
              </a>
              {' · '}
              <a
                href="/about"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('about')
                }}
              >
                About
              </a>
              {' · '}
              <a
                href="/privacy"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('privacy')
                }}
              >
                Privacy
              </a>
              {' · '}
              <a
                href="/terms"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('terms')
                }}
              >
                Terms
              </a>
              {' · '}
              <a
                href="/contact"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('contact')
                }}
              >
                Contact
              </a>
              {' · '}
              © ANQR {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default App
