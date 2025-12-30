/**
 * StaticPage
 * About, Privacy, Terms, Contact, and Docs pages.
 */

import { type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdUnit } from '@/components/AdUnit'
import { Capacitor } from '@capacitor/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ChevronDown, ChevronUp, List, X, Menu } from 'lucide-react'

import { useTranslation } from 'react-i18next'
import type { PageDefinition, PageSection } from '@/i18n/static'
import { getStaticContent, LAST_UPDATED, CONTACT_EMAIL } from '@/i18n/static'

export type StaticPageType = 'about' | 'docs' | 'privacy' | 'terms' | 'contact'

interface StaticPageProps {
  page: StaticPageType
}
// Helper to generate URL-friendly slug from heading
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Helper to render text with clickable URLs
function renderTextWithLinks(text: string): React.ReactNode {
  // Match URLs starting with http:// or https://
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = text.split(urlRegex)
  
  if (parts.length === 1) {
    return text
  }
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline break-all"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

// ToC group structure for docs
type TocGroup = {
  title: string
  items: { id: string; title: string }[]
}

// Group docs sections into logical categories
// titleKey is used for i18n translation lookup
function buildDocsToc(sections: PageSection[], t: (key: string) => string): TocGroup[] {
  const groups: TocGroup[] = [
    { title: t('nav.guide'), items: [] },
    { title: t('tiers.basic'), items: [] },
    { title: t('tiers.advanced'), items: [] },
    { title: t('tiers.professional'), items: [] },
    { title: t('payload.other'), items: [] },
  ]
  
  // Map section indices to groups (stable across languages)
  // Based on the consistent section order in all translations
  const getGroupIndex = (sectionIndex: number): number => {
    if (sectionIndex <= 1) return 0   // Getting Started: sections 0-1
    if (sectionIndex <= 4) return 1   // Basic Features: sections 2-4
    if (sectionIndex <= 35) return 2  // Advanced Features: sections 5-35
    if (sectionIndex <= 47) return 3  // Pro Features: sections 36-47
    return 4                          // Other: sections 48+
  }
  
  sections.forEach((section, index) => {
    if (!section.heading) return
    // Use index-based ID for stable linking across languages
    const id = `section-${index}`
    const groupIndex = getGroupIndex(index)
    groups[groupIndex].items.push({ id, title: section.heading })
  })
  
  return groups.filter(g => g.items.length > 0)
}

function usePageTitle(page: StaticPageType, title: string) {
  useEffect(() => {
    document.title = `${title} | ANQR`
  }, [page, title])
}

// Table of Contents component for docs page
function DocsTableOfContents({ 
  groups, 
  activeSlug, 
  onNavigate,
  onClose,
  isOpen,
  t
}: { 
  groups: TocGroup[]
  activeSlug: string
  onNavigate: (slug: string) => void
  onClose: () => void
  isOpen: boolean
  t: (key: string) => string
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // On desktop, respect isOpen prop. On mobile, always render (has its own mobileOpen state)
  // We check window width via CSS classes, so we render both but hide with lg:hidden / hidden lg:block
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set(groups.map(g => g.title)))

  // Reset expanded groups when groups change (e.g., language change)
  useEffect(() => {
    setExpandedGroups(new Set(groups.map(g => g.title)))
  }, [groups])

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(title)) {
        next.delete(title)
      } else {
        next.add(title)
      }
      return next
    })
  }

  const handleItemClick = (slug: string) => {
    onNavigate(slug)
    setMobileOpen(false)
  }

  // Find active group for mobile display
  const activeGroup = groups.find(g => g.items.some(item => item.id === activeSlug))
  const activeItem = activeGroup?.items.find(item => item.id === activeSlug)

  const tocContent = (
    <nav className="text-sm">
      {groups.map((group) => (
        <div key={group.title} className="mb-3">
          <button
            onClick={() => toggleGroup(group.title)}
            className="flex items-center justify-between w-full text-left font-semibold text-foreground hover:text-primary py-1.5 px-2 rounded transition-colors"
          >
            <span>{group.title}</span>
            {expandedGroups.has(group.title) ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedGroups.has(group.title) && (
            <ul className="mt-1 space-y-0.5 border-l-2 border-muted ml-2">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className={`block w-full text-left py-1 pl-3 pr-2 text-xs leading-snug transition-colors rounded-r ${
                      activeSlug === item.id
                        ? 'text-primary font-medium bg-primary/10 border-l-2 border-primary -ml-[2px]'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      {/* Mobile ToC - slide-out drawer */}
      <div className="lg:hidden">
        {/* Toggle button fixed at top */}
        {!mobileOpen && (
          <button
            onClick={() => setMobileOpen(true)}
            className="fixed z-50 p-2.5 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            style={{
              top: 'calc(60px + env(safe-area-inset-top, 0px) + 12px)',
              left: '12px'
            }}
            title="Open documentation sidebar"
          >
            <List className="h-5 w-5" />
          </button>
        )}
        
        {/* Backdrop */}
        {mobileOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50" 
            onClick={() => setMobileOpen(false)}
          />
        )}
        
        {/* Sidebar drawer */}
        <div className={`fixed top-0 left-0 z-50 h-full w-64 bg-background border-r shadow-xl transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <List className="h-4 w-4" />
              ANQR
            </h3>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)] scrollbar-hide">
            {tocContent}
          </div>
        </div>
      </div>

      {/* Desktop ToC - sticky sidebar with slide animation */}
      <aside className={`hidden lg:block flex-shrink-0 border-r bg-background docs-sidebar transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-64' : 'w-0 border-r-0'
      }`}>
        <div className="sticky top-0 h-screen overflow-y-auto py-6 px-4 scrollbar-hide">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <List className="h-4 w-4" />
              ANQR
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              title="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {tocContent}
        </div>
      </aside>
    </>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [botField, setBotField] = useState('')

  const encodedBody = useMemo(() => {
    const data: Record<string, string> = {
      'form-name': 'contact',
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      'bot-field': botField,
    }
    return new URLSearchParams(data).toString()
  }, [form, botField])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedBody,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setBotField('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h3 className="text-base font-semibold text-foreground">Message sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks - we received your message. If you do not hear back, email us at{' '}
          <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="rounded-xl border bg-card p-6"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value="contact" />
      <div className="hidden">
        <label>
          Do not fill this out if you are human: <input name="bot-field" value={botField} onChange={(e) => setBotField(e.target.value)} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contact-name">
            Name
          </label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="contact-email">
            Email
          </label>
          <Input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            placeholder="you@anqr.link"
            required
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-subject">
          Subject
        </label>
        <Input
          id="contact-subject"
          name="subject"
          value={form.subject}
          onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
          placeholder="What can we help with?"
          required
        />
      </div>

      <div className="mt-4 space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="contact-message">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          placeholder="Tell us what you are trying to do, and include any error messages if relevant."
          rows={6}
          required
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600">
          We could not submit the form. Please email{' '}
          <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          By sending a message, you agree that we can use your details to respond. See the Privacy Policy.
        </p>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}

export function StaticPage({ page }: StaticPageProps) {
  const { t, i18n } = useTranslation()
  const def = getStaticContent(i18n.language, page)
  usePageTitle(page, def.title)
  
  const isDocsPage = page === 'docs'
  const tocGroups = useMemo(() => isDocsPage ? buildDocsToc(def.sections, t) : [], [isDocsPage, def.sections, t])
  const [activeSlug, setActiveSlug] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())

  // Clear section refs when language/content changes to prevent stale refs accumulating
  useEffect(() => {
    sectionRefs.current.clear()
  }, [i18n.language, def.sections])

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (!isDocsPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section
        const visibleEntries = entries.filter(e => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by position in viewport (topmost first)
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          const topEntry = visibleEntries[0]
          const slug = topEntry.target.getAttribute('data-slug')
          if (slug) setActiveSlug(slug)
        }
      },
      {
        root: contentRef.current,
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    )

    // Observe all section headings
    sectionRefs.current.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isDocsPage, tocGroups])

  // Navigate to section with smooth scroll
  const navigateToSection = useCallback((slug: string) => {
    const el = sectionRefs.current.get(slug)
    if (el && contentRef.current) {
      const container = contentRef.current
      const elementTop = el.offsetTop - 80 // Account for sticky header
      container.scrollTo({ top: elementTop, behavior: 'smooth' })
      setActiveSlug(slug)
      // Update URL hash without triggering scroll
      window.history.replaceState(null, '', `#${slug}`)
    }
  }, [])

  // Handle initial hash on mount
  useEffect(() => {
    if (!isDocsPage) return
    const hash = window.location.hash.slice(1)
    if (hash) {
      // Delay to ensure refs are populated
      setTimeout(() => navigateToSection(hash), 100)
    } else if (tocGroups.length > 0 && tocGroups[0].items.length > 0) {
      setActiveSlug(tocGroups[0].items[0].id)
    }
  }, [isDocsPage, tocGroups, navigateToSection])

  // Register section ref
  const registerSectionRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) {
      sectionRefs.current.set(slug, el)
    } else {
      sectionRefs.current.delete(slug)
    }
  }, [])

  // State for docs sidebar visibility - starts collapsed
  const [isDocsSidebarOpen, setIsDocsSidebarOpen] = useState(false)

  // Note: Click outside to close is disabled - user must click X button to close sidebar

  // For docs page, use a different layout with ToC
  if (isDocsPage) {
    return (
      <main className="min-h-[200px] flex-1 flex bg-background overflow-hidden transition-all duration-300">
        {/* Left ad column - hidden on docs to make room for ToC */}
        <div className="hidden xl:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-3 pr-2">
          <AdUnit slot="static-left" width={160} height={600} format="vertical" />
        </div>

        {/* Toggle button when sidebar is closed - positioned in main content area */}
        {!isDocsSidebarOpen && (
          <div className="hidden lg:block relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDocsSidebarOpen(true)
              }}
              className="docs-sidebar-toggle absolute left-4 top-4 z-40 p-2 rounded-lg bg-card border shadow-md hover:bg-muted transition-colors"
              title="Open documentation sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Table of Contents */}
        <DocsTableOfContents 
          groups={tocGroups} 
          activeSlug={activeSlug} 
          onNavigate={navigateToSection}
          onClose={() => setIsDocsSidebarOpen(false)}
          isOpen={isDocsSidebarOpen}
          t={t}
        />

        {/* Main content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-background scrollbar-hide">
          {/* Centered header section like Gallery */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2 tracking-tight text-foreground">{def.title}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">{def.description}</p>
            </div>
          </div>
          
          {/* Horizontal ad below header */}
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-center">
              <AdUnit slot="docs-top" width={728} height={90} format="horizontal" />
            </div>
          </div>

          <article className="max-w-3xl mx-auto px-4 sm:px-6 py-4">

            <div className="space-y-8 sm:space-y-10">
              {def.sections.map((section, i) => {
                const slug = `section-${i}`
                return (
                  <section 
                    key={section.heading} 
                    id={slug}
                    data-slug={slug}
                    ref={(el) => registerSectionRef(slug, el)}
                    className="space-y-3 sm:space-y-4 scroll-mt-20"
                  >
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                      <a 
                        href={`#${slug}`} 
                        className="hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          navigateToSection(slug)
                        }}
                      >
                        {section.heading}
                      </a>
                    </h2>

                    {section.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {renderTextWithLinks(p)}
                      </p>
                    ))}

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                        {section.bullets.map((b) => (
                          <li key={b} className="leading-relaxed">{renderTextWithLinks(b)}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                )
              })}
            </div>

            {/* Bottom horizontal ad */}
            <div className="mt-8 flex justify-center">
              <AdUnit slot="docs-bottom" width={728} height={90} format="horizontal" />
            </div>

            <div className="mt-8 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">Last Updated: {LAST_UPDATED}</p>
            </div>
          </article>
        </div>

        {/* Right ad column */}
        <div className="hidden xl:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-2 pr-3">
          <AdUnit slot="static-right" width={160} height={600} format="vertical" />
        </div>
      </main>
    )
  }

  // Standard layout for non-docs pages
  return (
    <main className="min-h-[200px] flex-1 flex bg-background overflow-hidden transition-all duration-300">
      {/* Left ad column */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-3 pr-2">
        <AdUnit slot="static-left" width={160} height={600} format="vertical" />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-background scrollbar-hide">
        {/* Centered header section like Gallery */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 tracking-tight text-foreground">{def.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">{def.description}</p>
          </div>
        </div>
        
        {/* Horizontal ad below header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <AdUnit slot={`${page}-top`} width={728} height={90} format="horizontal" />
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-6 py-4">
          <div className="space-y-10">
            {def.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>

                {section.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-base text-muted-foreground leading-relaxed">
                    {renderTextWithLinks(p)}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="list-disc pl-5 space-y-2 text-base text-muted-foreground">
                    {section.bullets.map((b) => (
                      <li key={b}>{renderTextWithLinks(b)}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {page === 'contact' && <ContactForm />}
          </div>

          {/* Bottom horizontal ad */}
          <div className="mt-8 flex justify-center">
            <AdUnit slot={`${page}-bottom`} width={728} height={90} format="horizontal" />
          </div>

          <div className="mt-8 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">Last Updated: {LAST_UPDATED}</p>
          </div>
        </article>
      </div>

      {/* Right ad column */}
      <div className="hidden lg:flex flex-col items-center justify-center w-[180px] min-h-[600px] bg-background flex-shrink-0 pl-2 pr-3">
        <AdUnit slot="static-right" width={160} height={600} format="vertical" />
      </div>
    </main>
  )
}

export default StaticPage
