/**
 * AdSense Component
 * Displays Google AdSense ads with proper configuration
 */

import { useEffect, useRef } from 'react'

// AdSense Publisher ID
const AD_CLIENT = 'ca-pub-2270701384951162'

interface AdSenseProps {
  /** Ad slot identifier */
  slot: string
  /** Ad format */
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  /** Full width responsive */
  responsive?: boolean
  /** Additional CSS classes */
  className?: string
  /** Fixed width in pixels (optional) */
  width?: number
  /** Fixed height in pixels (optional) */
  height?: number
}

export function AdSense({ 
  slot, 
  format = 'auto',
  responsive = true,
  className = '',
  width,
  height
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)

  useEffect(() => {
    if (isLoaded.current) return
    
    try {
      // Push ad to AdSense
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({})
        isLoaded.current = true
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  const style: React.CSSProperties = {
    display: 'block',
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  )
}

// Placeholder component for development/preview
interface AdPlaceholderProps {
  /** Ad slot identifier for tracking */
  slot: string
  /** Width of the ad - can be number (px) or string (e.g., '100%', 'auto') */
  width?: number | string
  /** Height of the ad in pixels */
  height?: number
  /** Additional CSS classes */
  className?: string
  /** Format type for responsive ads */
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto'
}

export function AdPlaceholder({ 
  slot, 
  width = '100%', 
  height = 90, 
  className = '',
  format = 'auto'
}: AdPlaceholderProps) {
  const widthStyle = typeof width === 'number' ? `${width}px` : width
  
  return (
    <div 
      className={`ad-placeholder bg-muted/20 border border-dashed border-muted-foreground/20 rounded flex items-center justify-center text-xs text-muted-foreground ${className}`}
      style={{ 
        width: widthStyle, 
        height: `${height}px`,
        minHeight: `${height}px`
      }}
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <span className="opacity-50">Ad</span>
    </div>
  )
}

export default AdPlaceholder
