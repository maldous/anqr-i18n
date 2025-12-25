import { useQRStore } from '@/store/qr-store'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Download, Loader2, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { useState, useEffect } from 'react'

interface PreviewProps {
  sidebarOpen?: boolean
}

export function Preview({ sidebarOpen = true }: PreviewProps) {
  const { animation, setAnimationPlaying, overlay, output } = useQRStore()
  const { 
    canvasRef, canvas, isLoading, error, download, 
    isAnimating, currentFrame, totalFrames, 
    safetyWarnings, validation, isValidating, animationFrames 
  } = useQRGenerator()
  const [zoom, setZoom] = useState(100)
  const [showWarnings, setShowWarnings] = useState(true)
  
  // Reset showWarnings when safetyWarnings change
  useEffect(() => {
    if (safetyWarnings.length > 0) {
      setShowWarnings(true)
    }
  }, [safetyWarnings])
  
  // Show animation controls if we have a GIF with multiple frames
  const showAnimationControls = totalFrames > 1

  const handleZoomIn = () => setZoom(Math.min(200, zoom + 25))
  const handleZoomOut = () => setZoom(Math.max(25, zoom - 25))

  return (
    <main className={`flex-1 flex flex-col bg-muted/30 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-96' : ''}`}>
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div 
          className={`qr-preview-container transition-all duration-300 ${sidebarOpen ? 'max-w-md lg:max-w-lg' : 'max-w-xl lg:max-w-3xl'}`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        >
          {/* QR Code Canvas */}
          <div className="bg-white rounded-lg shadow-xl flex items-center justify-center p-4 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {error && (
              <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-lg z-10 p-4">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}
            {/* Safety warnings */}
            {safetyWarnings.length > 0 && showWarnings && (
              <div className="absolute top-2 right-2 max-w-xs z-10">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 shadow-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-amber-800">Safety Warnings</p>
                      <ul className="text-xs text-amber-700 mt-1 space-y-0.5">
                        {safetyWarnings.map((warning, i) => (
                          <li key={i}>• {warning}</li>
                        ))}
                      </ul>
                    </div>
                    <button 
                      onClick={() => setShowWarnings(false)}
                      className="text-amber-600 hover:text-amber-800 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
            <canvas 
              ref={canvasRef}
              className="max-w-full max-h-full"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="border-t bg-card px-4 py-3 flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {showAnimationControls && (
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
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setAnimationPlaying(false)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentFrame + 1}/{totalFrames} {isAnimating && '▶'}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Validation Status */}
          <div className="flex items-center gap-1" title={validation?.isValid ? 'QR code is scannable' : validation?.isReadable ? 'QR readable but data mismatch' : 'QR code not scannable'}>
            {isValidating ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : validation?.isValid ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : validation?.isReadable ? (
              <AlertCircle className="h-4 w-4 text-amber-500" />
            ) : validation ? (
              <XCircle className="h-4 w-4 text-red-500" />
            ) : null}
            {validation && (
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {validation.confidence !== 'none' ? validation.confidence : 'unreadable'}
              </span>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span className="hidden sm:inline">Output: </span>
            {canvas ? `${canvas.width} × ${canvas.height}` : `${output.widthPx} × ${output.heightPx}`} px
          </div>
          <Button 
            size="sm" 
            onClick={download}
            disabled={!canvas || isLoading}
            className="shadow-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            {output.format === 'gif' && animationFrames.length > 1 ? 'Export GIF' : 'Download'}
          </Button>
        </div>
      </div>
    </main>
  )
}
