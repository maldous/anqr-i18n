/**
 * Gallery Component
 * Hero-style gallery showcasing ANQR features organized by category
 */

import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { AdPlaceholder } from '@/components/AdPlaceholder'
import { 
  gallerySections, 
  buildGalleryUrl, 
  getGalleryImagePath,
  type GalleryItem,
  type GallerySection,
  type GalleryCategory
} from '@/data/gallery-items'

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return Icon ? <Icon className={className} /> : null
}

// Gallery card component with hover-to-enlarge
function GalleryCard({ item }: { item: GalleryItem }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const imagePath = getGalleryImagePath(item)
  const shareUrl = buildGalleryUrl(item)
  
  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative overflow-hidden rounded-lg bg-card
        border border-border shadow-md
        transition-all duration-200 ease-out origin-center
        ${isHovered ? 'scale-[1.8] z-50 shadow-2xl border-blue-500 dark:border-blue-400' : 'z-0'}
      `}>
        {/* Image */}
        <div className="aspect-square w-full bg-muted p-1">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <span className="text-xs">Image unavailable</span>
            </div>
          ) : (
            <img
              src={imagePath}
              alt={item.title}
              className="w-full h-full object-contain"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        
        {/* Animated badge */}
        {item.isAnimated && (
          <div className="absolute top-1 right-1 px-1 py-0.5 rounded text-[8px] font-bold bg-purple-500 text-white">
            GIF
          </div>
        )}
      </div>
      
      {/* Title below card (hidden when hovered/enlarged) */}
      <div className={`mt-1 px-0.5 transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h4 className="text-[10px] font-medium text-muted-foreground truncate">{item.title}</h4>
      </div>
    </a>
  )
}

// Section component
function GallerySectionComponent({ section, isExpanded, onToggle }: { 
  section: GallerySection
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="mb-8">
      {/* Section header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 mb-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            <DynamicIcon name={section.icon} className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {section.title}
              <span className="ml-2 text-sm font-normal text-muted-foreground">({section.items.length})</span>
            </h3>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </div>
        </div>
        <div className="p-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>
      
      {/* Items grid - consistent 6 columns with hover space */}
      {isExpanded && (
        <div className="grid grid-cols-6 gap-4 py-4">
          {section.items.map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}  
        </div>
      )}
    </div>
  )
}

// Props for Gallery component
interface GalleryProps {
  filter: GalleryCategory | 'all'
}

// Main Gallery component
export function Gallery({ filter }: GalleryProps) {
  const [expandedSections, setExpandedSections] = useState<Set<GalleryCategory>>(
    new Set(gallerySections.map(s => s.id))
  )
  
  const filteredSections = useMemo(() => {
    if (filter === 'all') return gallerySections
    return gallerySections.filter(s => s.id === filter)
  }, [filter])
  
  const totalItems = useMemo(() => 
    gallerySections.reduce((acc, s) => acc + s.items.length, 0)
  , [])
  
  const toggleSection = (id: GalleryCategory) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }
  
  return (
    <main className="min-h-[200px] flex-1 flex bg-muted/30 overflow-hidden transition-all duration-300">
      {/* Left ad column - matches Preview exactly */}
      <div className="hidden lg:flex flex-col items-end justify-center w-[160px] border-r bg-muted/10 flex-shrink-0">
        <AdPlaceholder slot="gallery-left" width={160} height={600} format="vertical" />
      </div>
      
      {/* Main gallery content */}
      <div className="flex-1 overflow-y-auto bg-background">
        {/* Hero section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 tracking-tight text-foreground">
              ANQR Gallery
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Explore {totalItems} QR code variations. Click any QR code to open it in the editor.
            </p>
          </div>
        </div>

        {/* Gallery content */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          {filteredSections.map(section => (
            <GallerySectionComponent
              key={section.id}
              section={section}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
        
        {/* Footer */}
        <div className="border-t border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center">
            <p className="text-xs text-muted-foreground">
              All QR codes link to <a href="https://aldous.info" className="text-primary hover:underline">aldous.info</a>.
              Click any to open in editor.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right ad column - matches Preview exactly */}
      <div className="hidden lg:flex flex-col items-start justify-center w-[160px] border-l bg-muted/10 flex-shrink-0">
        <AdPlaceholder slot="gallery-right" width={160} height={600} format="vertical" />
      </div>
    </main>
  )
}

export default Gallery
