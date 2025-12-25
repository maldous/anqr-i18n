import { Loader2, AlertTriangle, Eye, Thermometer, RotateCw, Sparkles } from 'lucide-react'
import { useQRGenerator } from '@/hooks/useQRGenerator'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { useQRStore } from '@/store/qr-store'
import { analyzeContrast } from '@/modules/safety-analyzer'
import { getContrastRatio, parseColor } from '@/modules/color-utils'

interface PreviewProps {
  sidebarOpen?: boolean
}

export function Preview({ sidebarOpen = true }: PreviewProps) {
  const { 
    canvasRef, isLoading, error, 
    safetyWarnings,
    canvas 
  } = useQRGenerator()
  const [showWarnings, setShowWarnings] = useState(true)
  const [heatmapActive, setHeatmapActive] = useState(false)
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const { render, safety, qa } = useQRStore()
  
  // Reset showWarnings when safetyWarnings change
  useEffect(() => {
    if (safetyWarnings.length > 0) {
      setShowWarnings(true)
    }
  }, [safetyWarnings])
  
  // Calculate contrast ratio between foreground and background colors
  const contrastAnalysis = useMemo(() => {
    if (safety.mode === 'off') return null
    const report = analyzeContrast(render.fgColor, render.bgColor)
    return {
      ratio: report.overallRatio,
      meetsAA: report.meetsWCAG_AA,
      meetsAAA: report.meetsWCAG_AAA
    }
  }, [render.fgColor, render.bgColor, safety.mode])
  
  // Determine badge color based on contrast ratio
  const getContrastBadgeColor = (ratio: number) => {
    if (ratio >= 7) return 'bg-green-500' // AAA level
    if (ratio >= 4.5) return 'bg-green-400' // AA level
    if (ratio >= 3) return 'bg-yellow-500' // AA Large
    return 'bg-red-500' // Poor contrast
  }
  
  const getContrastLabel = (ratio: number) => {
    if (ratio >= 7) return 'AAA'
    if (ratio >= 4.5) return 'AA'
    if (ratio >= 3) return 'AA-L'
    return 'Poor'
  }
  
  // Generate heatmap from the QR canvas
  const generateHeatmap = useCallback(() => {
    if (!canvas || !heatmapCanvasRef.current) return
    
    const heatmapCanvas = heatmapCanvasRef.current
    const ctx = heatmapCanvas.getContext('2d')
    if (!ctx) return
    
    // Match heatmap canvas size to QR canvas
    heatmapCanvas.width = canvas.width
    heatmapCanvas.height = canvas.height
    
    // Get QR canvas pixel data
    const qrCtx = canvas.getContext('2d')
    if (!qrCtx) return
    
    const imageData = qrCtx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    // Parse background color for contrast calculation
    const bg = parseColor(render.bgColor)
    
    // Sample at a lower resolution for performance (every 4th pixel)
    const sampleSize = 4
    
    for (let y = 0; y < canvas.height; y += sampleSize) {
      for (let x = 0; x < canvas.width; x += sampleSize) {
        const i = (y * canvas.width + x) * 4
        const pixelColor = { r: data[i], g: data[i + 1], b: data[i + 2] }
        
        // Calculate contrast ratio with background
        const ratio = getContrastRatio(pixelColor, bg)
        
        // Map contrast ratio to heatmap color
        // 7:1 = AAA (green), 4.5:1 = AA (yellow-green), 3:1 = AA-L (yellow), <3 = poor (red)
        let r: number, g: number, b: number
        
        if (ratio >= 7) {
          // Green - excellent contrast
          r = 34; g = 197; b = 94
        } else if (ratio >= 4.5) {
          // Light green - good contrast
          r = 132; g = 204; b = 22
        } else if (ratio >= 3) {
          // Yellow - acceptable for large text
          r = 234; g = 179; b = 8
        } else if (ratio >= 2) {
          // Orange - poor contrast
          r = 249; g = 115; b = 22
        } else {
          // Red - very poor contrast
          r = 239; g = 68; b = 68
        }
        
        ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
        ctx.fillRect(x, y, sampleSize, sampleSize)
      }
    }
  }, [canvas, render.bgColor])
  
  // Regenerate heatmap when canvas changes and heatmap is active
  useEffect(() => {
    if (heatmapActive && qa.showHeatmap && canvas) {
      generateHeatmap()
    }
  }, [heatmapActive, qa.showHeatmap, canvas, generateHeatmap])
  
  // Generate noise pattern for noise simulation
  const generateNoisePattern = useCallback(() => {
    if (!noiseCanvasRef.current || !canvas) return
    
    const noiseCanvas = noiseCanvasRef.current
    noiseCanvas.width = canvas.width
    noiseCanvas.height = canvas.height
    const ctx = noiseCanvas.getContext('2d')
    if (!ctx) return
    
    const imageData = ctx.createImageData(canvas.width, canvas.height)
    const data = imageData.data
    
    // Generate random noise
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255
      data[i] = noise     // R
      data[i + 1] = noise // G
      data[i + 2] = noise // B
      data[i + 3] = 255   // A (controlled by CSS opacity)
    }
    
    ctx.putImageData(imageData, 0, 0)
  }, [canvas])
  
  // Generate noise when noise level changes or canvas updates
  useEffect(() => {
    if (qa.simulateNoise > 0 && canvas) {
      generateNoisePattern()
    }
  }, [qa.simulateNoise, canvas, generateNoisePattern])
  
  // Calculate simulation styles for the QR canvas
  const simulationStyles = useMemo(() => {
    const styles: React.CSSProperties = {
      imageRendering: 'pixelated' as const,
    }
    
    const filters: string[] = []
    const transforms: string[] = []
    
    // Apply blur simulation
    if (qa.simulateBlurPx > 0) {
      filters.push(`blur(${qa.simulateBlurPx}px)`)
    }
    
    // Apply rotation simulation
    if (qa.simulateRotationDeg > 0) {
      transforms.push(`rotate(${qa.simulateRotationDeg}deg)`)
    }
    
    if (filters.length > 0) {
      styles.filter = filters.join(' ')
    }
    
    if (transforms.length > 0) {
      styles.transform = transforms.join(' ')
    }
    
    return styles
  }, [qa.simulateBlurPx, qa.simulateRotationDeg])
  
  // Check if any simulation is active
  const hasActiveSimulation = qa.simulateBlurPx > 0 || qa.simulateNoise > 0 || qa.simulateRotationDeg > 0

  return (
    <main className={`min-h-[200px] md:flex-1 flex flex-col lg:flex-row bg-muted/30 overflow-hidden transition-all duration-300 ${sidebarOpen ? 'lg:ml-96' : ''}`}>
      {/* Desktop Left Column Ad - Skyscraper 160x600, always visible */}
      <div className="hidden lg:flex flex-col items-end justify-center w-[160px] border-r bg-muted/10 flex-shrink-0">
        <AdPlaceholder slot="left-skyscraper" width={160} height={600} format="vertical" />
      </div>
      
      {/* Main content area with QR */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Ad above QR - only when settings is hidden */}
        {!sidebarOpen && (
          <div className="lg:hidden p-4 flex justify-center flex-shrink-0">
            <AdPlaceholder slot="mobile-above-qr" width={320} height={50} format="horizontal" />
          </div>
        )}
        
        {/* Preview Area */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div 
          className="qr-preview-container transition-all duration-300 max-w-md md:max-w-xl lg:max-w-2xl"
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
            {/* Contrast ratio badge and heatmap toggle */}
            {contrastAnalysis && (
              <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1">
                <div className={`${getContrastBadgeColor(contrastAnalysis.ratio)} text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm flex items-center gap-1`}>
                  <Eye className="h-3 w-3" />
                  <span>{contrastAnalysis.ratio.toFixed(1)}:1</span>
                  <span className="opacity-75">({getContrastLabel(contrastAnalysis.ratio)})</span>
                </div>
                {qa.showHeatmap && (
                  <button
                    onClick={() => setHeatmapActive(!heatmapActive)}
                    className={`text-xs font-medium px-2 py-1 rounded-md shadow-sm flex items-center gap-1 transition-colors ${
                      heatmapActive 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    title="Toggle readability heatmap"
                  >
                    <Thermometer className="h-3 w-3" />
                    <span>Heatmap</span>
                  </button>
                )}
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
<div className="relative inline-block">
              {/* Simulation indicator badge */}
              {hasActiveSimulation && (
                <div className="absolute -top-2 -right-2 z-20 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  <span>Simulating</span>
                </div>
              )}
              <canvas 
                ref={canvasRef}
                className="max-w-full max-h-full transition-all duration-200"
                style={simulationStyles}
              />
              {/* Noise overlay canvas - positioned over the QR canvas */}
              {qa.simulateNoise > 0 && (
                <canvas
                  ref={noiseCanvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ 
                    imageRendering: 'pixelated',
                    mixBlendMode: 'overlay',
                    opacity: qa.simulateNoise / 100,
                    ...simulationStyles // Apply same rotation/transforms
                  }}
                />
              )}
              {/* Heatmap overlay canvas - positioned over the QR canvas */}
              {qa.showHeatmap && heatmapActive && (
                <canvas
                  ref={heatmapCanvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ 
                    imageRendering: 'pixelated',
                    mixBlendMode: 'multiply',
                    ...simulationStyles // Apply same rotation/transforms
                  }}
                />
              )}
            </div>
          </div>
        </div>
        </div>
        
        {/* Mobile Ad - below QR code, only when settings is hidden */}
        {!sidebarOpen && (
          <div className="lg:hidden p-4 flex justify-center flex-shrink-0">
            <AdPlaceholder slot="mobile-below-qr" width={320} height={50} format="horizontal" />
          </div>
        )}
      </div>
      
      {/* Desktop Right Column Ad - Skyscraper 160x600, left-aligned with Share button */}
      <div className="hidden lg:flex flex-col items-start justify-center w-[160px] border-l bg-muted/10 flex-shrink-0">
        <AdPlaceholder slot="right-skyscraper" width={160} height={600} format="vertical" />
      </div>
    </main>
  )
}
