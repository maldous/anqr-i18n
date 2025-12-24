import { useQRStore } from '@/store/qr-store'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

interface PreviewProps {
  sidebarOpen?: boolean
}

export function Preview({ sidebarOpen = true }: PreviewProps) {
  const { animation, setAnimationPlaying, overlay } = useQRStore()

  return (
    <main className={`flex-1 flex flex-col bg-muted/30 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-96' : ''}`}>
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className={`qr-preview-container aspect-square transition-all duration-300 ${sidebarOpen ? 'w-full max-w-md lg:max-w-lg' : 'w-full max-w-xl lg:max-w-3xl'}`}>
          {/* Placeholder QR Code */}
          <div className="w-64 h-64 bg-white rounded-lg shadow-xl flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full p-4">
              {/* Simple QR placeholder pattern */}
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {/* Top-left finder */}
              <rect x="5" y="5" width="25" height="25" fill="black" />
              <rect x="10" y="10" width="15" height="15" fill="white" />
              <rect x="13" y="13" width="9" height="9" fill="black" />
              {/* Top-right finder */}
              <rect x="70" y="5" width="25" height="25" fill="black" />
              <rect x="75" y="10" width="15" height="15" fill="white" />
              <rect x="78" y="13" width="9" height="9" fill="black" />
              {/* Bottom-left finder */}
              <rect x="5" y="70" width="25" height="25" fill="black" />
              <rect x="10" y="75" width="15" height="15" fill="white" />
              <rect x="13" y="78" width="9" height="9" fill="black" />
              {/* Data modules (simplified) */}
              <rect x="35" y="5" width="5" height="5" fill="black" />
              <rect x="45" y="5" width="5" height="5" fill="black" />
              <rect x="55" y="5" width="5" height="5" fill="black" />
              <rect x="35" y="15" width="5" height="5" fill="black" />
              <rect x="50" y="15" width="5" height="5" fill="black" />
              <rect x="35" y="35" width="5" height="5" fill="black" />
              <rect x="45" y="35" width="5" height="5" fill="black" />
              <rect x="55" y="35" width="5" height="5" fill="black" />
              <rect x="65" y="35" width="5" height="5" fill="black" />
              <rect x="35" y="45" width="5" height="5" fill="black" />
              <rect x="55" y="45" width="5" height="5" fill="black" />
              <rect x="75" y="45" width="5" height="5" fill="black" />
              <rect x="85" y="45" width="5" height="5" fill="black" />
              <rect x="35" y="55" width="5" height="5" fill="black" />
              <rect x="45" y="55" width="5" height="5" fill="black" />
              <rect x="65" y="55" width="5" height="5" fill="black" />
              <rect x="85" y="55" width="5" height="5" fill="black" />
              <rect x="35" y="65" width="5" height="5" fill="black" />
              <rect x="55" y="65" width="5" height="5" fill="black" />
              <rect x="75" y="65" width="5" height="5" fill="black" />
              <rect x="35" y="75" width="5" height="5" fill="black" />
              <rect x="45" y="75" width="5" height="5" fill="black" />
              <rect x="55" y="75" width="5" height="5" fill="black" />
              <rect x="65" y="75" width="5" height="5" fill="black" />
              <rect x="75" y="75" width="5" height="5" fill="black" />
              <rect x="85" y="75" width="5" height="5" fill="black" />
              <rect x="35" y="85" width="5" height="5" fill="black" />
              <rect x="55" y="85" width="5" height="5" fill="black" />
              <rect x="65" y="85" width="5" height="5" fill="black" />
              <rect x="85" y="85" width="5" height="5" fill="black" />
            </svg>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="border-t bg-card px-4 py-3 flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">100%</span>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {overlay.enabled && overlay.type === 'gif' && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setAnimationPlaying(!animation.playing)}
            >
              {animation.playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {animation.speedMs}ms
            </span>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <span className="hidden sm:inline">Output: </span>
          400 × 400 px
        </div>
      </div>
    </main>
  )
}
