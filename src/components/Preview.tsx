import { Loader2, AlertTriangle } from 'lucide-react'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { useState, useEffect } from 'react'

interface PreviewProps {
  sidebarOpen?: boolean
}

export function Preview({ sidebarOpen = true }: PreviewProps) {
  const { 
    canvasRef, isLoading, error, 
    safetyWarnings 
  } = useQRGenerator()
  const [showWarnings, setShowWarnings] = useState(true)
  
  // Reset showWarnings when safetyWarnings change
  useEffect(() => {
    if (safetyWarnings.length > 0) {
      setShowWarnings(true)
    }
  }, [safetyWarnings])

  return (
    <main className={`min-h-[200px] md:flex-1 flex flex-col bg-muted/30 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-96' : ''}`}>
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div 
          className={`qr-preview-container transition-all duration-300 ${sidebarOpen ? 'max-w-xs md:max-w-md lg:max-w-lg' : 'max-w-md md:max-w-xl lg:max-w-3xl'}`}
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

    </main>
  )
}
