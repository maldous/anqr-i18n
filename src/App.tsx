import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/Sidebar'
import { Preview } from '@/components/Preview'
import { Header } from '@/components/Header'
import { Gallery } from '@/components/Gallery'
import { useState, useEffect } from 'react'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { useQRStore } from '@/store/qr-store'
import { parseUrlParams } from '@/modules/share-utils'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showGallery, setShowGallery] = useState(false)
  const { download } = useQRGenerator()
  const { setOverlayUrl, setOverlayFile, setOverlayEnabled, setOverlayMode, setOverlayIntensity,
          setPayloadText, setQrEcc, setQrVersion, setRenderModulePx, setQrQuietZone,
          setRenderFgColor, setRenderBgColor, setRenderModuleStyle, setRenderFinderStyle } = useQRStore()

  // Handle hash changes for gallery view
  useEffect(() => {
    const handleHashChange = () => {
      setShowGallery(window.location.hash === '#gallery')
    }
    
    // Check initial hash
    handleHashChange()
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Load settings from URL parameters on mount
  useEffect(() => {
    const params = parseUrlParams()
    
    // Apply URL parameters to store
    if (params.data) setPayloadText(params.data)
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
          sidebarOpen={showGallery ? false : sidebarOpen} 
          onExport={download}
          showGallery={showGallery}
        />
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {!showGallery && <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}
          {showGallery ? (
            <Gallery />
          ) : (
            <Preview sidebarOpen={sidebarOpen} />
          )}
        </div>
        {/* Fixed Footer - always visible at bottom */}
        <footer className={`border-t bg-muted/30 py-2 flex-shrink-0 transition-all duration-300 ${sidebarOpen && !showGallery ? 'lg:ml-96' : ''}`}>
          {/* Inner wrapper with margins to center over QR area (between ad columns) */}
          <div className="px-4 lg:mx-[160px] text-center">
            <p className="text-xs text-muted-foreground">
              <a href="#about" className="hover:underline">About</a>
              {' · '}
              <a href="#privacy" className="hover:underline">Privacy</a>
              {' · '}
              <a href="#terms" className="hover:underline">Terms</a>
              {' · '}
              <a href="#contact" className="hover:underline">Contact</a>
              {' · '}
              © ANQR 2025
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}

export default App
