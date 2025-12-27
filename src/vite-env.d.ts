/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_ENABLED: string
  readonly VITE_ADSENSE_SLOT_LEFT_SKYSCRAPER: string
  readonly VITE_ADSENSE_SLOT_RIGHT_SKYSCRAPER: string
  readonly VITE_ADSENSE_SLOT_SIDEBAR_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_HEADER_MOBILE: string
  readonly VITE_ADSENSE_SLOT_MOBILE_ABOVE_QR: string
  readonly VITE_ADSENSE_SLOT_MOBILE_BELOW_QR: string
  readonly VITE_ADSENSE_SLOT_GALLERY_LEFT: string
  readonly VITE_ADSENSE_SLOT_GALLERY_RIGHT: string
  readonly VITE_ADSENSE_SLOT_GALLERY_TOP: string
  readonly VITE_ADSENSE_SLOT_GALLERY_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_STATIC_LEFT: string
  readonly VITE_ADSENSE_SLOT_STATIC_RIGHT: string
  readonly VITE_ADSENSE_SLOT_STATIC_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_PREVIEW_MOBILE_TOP: string
  readonly VITE_ADSENSE_SLOT_PREVIEW_MOBILE_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_DOCS_TOP: string
  readonly VITE_ADSENSE_SLOT_DOCS_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_ABOUT_TOP: string
  readonly VITE_ADSENSE_SLOT_ABOUT_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_PRIVACY_TOP: string
  readonly VITE_ADSENSE_SLOT_PRIVACY_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_TERMS_TOP: string
  readonly VITE_ADSENSE_SLOT_TERMS_BOTTOM: string
  readonly VITE_ADSENSE_SLOT_CONTACT_TOP: string
  readonly VITE_ADSENSE_SLOT_CONTACT_BOTTOM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
