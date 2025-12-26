/**
 * Gallery Component
 * Hero-style gallery showcasing ANQR features organized by category
 */

import { useState, useMemo } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
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
        relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 
        border border-zinc-200 dark:border-zinc-700 shadow-md
        transition-all duration-200 ease-out origin-center
        ${isHovered ? 'scale-[1.8] z-50 shadow-2xl border-blue-500 dark:border-blue-400' : 'z-0'}
      `}>
        {/* Image */}
        <div className="aspect-square w-full bg-zinc-100 dark:bg-zinc-800 p-1">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
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
        <h4 className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400 truncate">{item.title}</h4>
      </div>
    </a>
  )
}

// Section component
function GallerySection({ section, isExpanded, onToggle }: { 
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
          <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            <DynamicIcon name={section.icon} className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {section.title}
              <span className="ml-2 text-sm font-normal text-zinc-500">({section.items.length})</span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{section.description}</p>
          </div>
        </div>
        <div className="p-2">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-zinc-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-zinc-400" />
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

// Main Gallery component
export function Gallery() {
  const [expandedSections, setExpandedSections] = useState<Set<GalleryCategory>>(
    new Set(gallerySections.map(s => s.id))
  )
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')
  
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
  
  const expandAll = () => {
    setExpandedSections(new Set(gallerySections.map(s => s.id)))
  }
  
  const collapseAll = () => {
    setExpandedSections(new Set())
  }
  
  return (
    <div className="flex-1 flex min-h-0">
      {/* Left ad column */}
      <div className="hidden xl:flex flex-col w-40 flex-shrink-0 p-2 gap-2 items-center justify-center">
        <AdPlaceholder slot="gallery-left" width={160} height={600} />
      </div>
      
      {/* Main gallery content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        {/* Hero section */}

<div className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-700">
  <div className="max-w-7xl mx-auto px-4 py-3">
    <div className="flex flex-col items-center gap-3">

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          All ({totalItems})
        </button>

        {gallerySections.map(section => (
          <button
            key={section.id}
            onClick={() => setFilter(section.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {section.title.split(' ')[0]} ({section.items.length})
          </button>
        ))}
      </div>

      {/* Expand / collapse */}
      <div className="flex items-center gap-2">
        <button onClick={expandAll} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Expand all
        </button>
        <span className="text-zinc-300 dark:text-zinc-600">|</span>
        <button onClick={collapseAll} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Collapse all
        </button>
      </div>

    </div>
  </div>
</div>

        {/* Gallery content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredSections.map(section => (
            <GallerySection
              key={section.id}
              section={section}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>
        
        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              All QR codes link to <a href="https://aldous.info" className="text-blue-600 dark:text-blue-400 hover:underline">aldous.info</a>.
              Click any QR code to open it in the editor with those exact settings.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right ad column */}
      <div className="hidden xl:flex flex-col w-40 flex-shrink-0 p-2 gap-2 items-center justify-center">
        <AdPlaceholder slot="gallery-right" width={160} height={600} />
      </div>
    </div>
  )
}

export default Gallery
