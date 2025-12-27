/**
 * Ad Unit
 *
 * Renders an AdSense <ins> tag when a valid ad slot ID is available.
 * Falls back to a lightweight placeholder during development, preview
 * builds, or when slot IDs have not been configured yet.
 */

import { AdSense, AdPlaceholder } from '@/components/AdPlaceholder'

type SlotName =
  | 'header-mobile'
  | 'mobile-above-qr'
  | 'mobile-below-qr'
  | 'left-skyscraper'
  | 'right-skyscraper'
  | 'sidebar-bottom'
  | 'gallery-left'
  | 'gallery-right'
  | 'gallery-top'
  | 'gallery-bottom'
  | 'static-left'
  | 'static-right'
  | 'preview-mobile-top'
  | 'preview-mobile-bottom'
  | 'docs-top'
  | 'docs-bottom'
  | 'about-top'
  | 'about-bottom'
  | 'privacy-top'
  | 'privacy-bottom'
  | 'terms-top'
  | 'terms-bottom'
  | 'contact-top'
  | 'contact-bottom'

/**
 * Optional environment-driven slot configuration.
 *
 * Set these in your hosting environment (Netlify/Vercel/etc) to enable
 * manual units. If you use AdSense Auto Ads, you can leave these empty.
 */
const SLOT_IDS: Partial<Record<SlotName, string>> = {
  'header-mobile': import.meta.env.VITE_ADSENSE_SLOT_HEADER_MOBILE,
  'mobile-above-qr': import.meta.env.VITE_ADSENSE_SLOT_MOBILE_ABOVE_QR,
  'mobile-below-qr': import.meta.env.VITE_ADSENSE_SLOT_MOBILE_BELOW_QR,
  'left-skyscraper': import.meta.env.VITE_ADSENSE_SLOT_LEFT_SKYSCRAPER,
  'right-skyscraper': import.meta.env.VITE_ADSENSE_SLOT_RIGHT_SKYSCRAPER,
  'sidebar-bottom': import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR_BOTTOM,
  'gallery-left': import.meta.env.VITE_ADSENSE_SLOT_GALLERY_LEFT,
  'gallery-right': import.meta.env.VITE_ADSENSE_SLOT_GALLERY_RIGHT,
  'gallery-top': import.meta.env.VITE_ADSENSE_SLOT_GALLERY_TOP,
  'gallery-bottom': import.meta.env.VITE_ADSENSE_SLOT_GALLERY_BOTTOM,
  'static-left': import.meta.env.VITE_ADSENSE_SLOT_STATIC_LEFT,
  'static-right': import.meta.env.VITE_ADSENSE_SLOT_STATIC_RIGHT,
  'preview-mobile-top': import.meta.env.VITE_ADSENSE_SLOT_PREVIEW_MOBILE_TOP,
  'preview-mobile-bottom': import.meta.env.VITE_ADSENSE_SLOT_PREVIEW_MOBILE_BOTTOM,
  'docs-top': import.meta.env.VITE_ADSENSE_SLOT_DOCS_TOP,
  'docs-bottom': import.meta.env.VITE_ADSENSE_SLOT_DOCS_BOTTOM,
  'about-top': import.meta.env.VITE_ADSENSE_SLOT_ABOUT_TOP,
  'about-bottom': import.meta.env.VITE_ADSENSE_SLOT_ABOUT_BOTTOM,
  'privacy-top': import.meta.env.VITE_ADSENSE_SLOT_PRIVACY_TOP,
  'privacy-bottom': import.meta.env.VITE_ADSENSE_SLOT_PRIVACY_BOTTOM,
  'terms-top': import.meta.env.VITE_ADSENSE_SLOT_TERMS_TOP,
  'terms-bottom': import.meta.env.VITE_ADSENSE_SLOT_TERMS_BOTTOM,
  'contact-top': import.meta.env.VITE_ADSENSE_SLOT_CONTACT_TOP,
  'contact-bottom': import.meta.env.VITE_ADSENSE_SLOT_CONTACT_BOTTOM,
}

function isNumericSlot(value: string | undefined | null): value is string {
  return !!value && /^\d+$/.test(value)
}

function resolveSlotId(slot: string): string | null {
  // Allow callers to pass numeric ad-unit IDs directly.
  if (isNumericSlot(slot)) return slot

  // Otherwise, map known slot names to configured IDs.
  const mapped = SLOT_IDS[slot as SlotName]
  return isNumericSlot(mapped) ? mapped : null
}

export interface AdUnitProps {
  slot: string
  width?: number | string
  height?: number
  className?: string
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'auto'
  responsive?: boolean
}

export function AdUnit({
  slot,
  width = '100%',
  height = 90,
  className = '',
  format = 'auto',
  responsive = true,
}: AdUnitProps) {
  const slotId = resolveSlotId(slot)
  const enabled = import.meta.env.PROD && import.meta.env.VITE_ADSENSE_ENABLED !== 'false' && !!slotId

  // If you rely on AdSense Auto Ads only, keeping placeholders here is fine.
  if (!enabled) {
    return <AdPlaceholder slot={slot} width={width} height={height} className={className} format={format} />
  }

  // When rendering a fixed-size unit, pass width/height via inline style.
  const w = typeof width === 'number' ? width : undefined
  return <AdSense slot={slotId} format={format} responsive={responsive} className={className} width={w} height={height} />
}

export default AdUnit
