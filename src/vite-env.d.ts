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
  readonly VITE_ADSENSE_SLOT_STATIC_BOTTOM: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
