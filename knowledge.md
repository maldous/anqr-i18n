# ANQR - Advanced QR Code Generator

## Project Overview

ANQR is a sophisticated QR code generator with image overlay and dithering capabilities. It provides a modern React-based UI with comprehensive configuration options organized into three tiers: Basic, Advanced, and Professional.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui components (Radix primitives)
- **State Management**: Zustand
- **Icons**: Lucide React

## Project Structure

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Root component with layout
├── index.css             # Tailwind + theme CSS variables
├── store/
│   └── qr-store.ts       # Zustand store with all QR configuration state
├── lib/
│   ├── utils.ts          # Tailwind merge utility
│   └── search-context.tsx # Search highlighting context
├── components/
│   ├── Header.tsx        # Top nav with tier toggle, dark mode, actions
│   ├── Sidebar.tsx       # Settings panel with accordion sections
│   ├── Preview.tsx       # QR code preview area
│   ├── ui/               # shadcn/ui components (Button, Input, Select, etc.)
│   └── sections/         # Setting section components
│       ├── PayloadSection.tsx    # Content type & payload helpers
│       ├── QREncodingSection.tsx # QR version, ECC, mask, etc.
│       ├── RenderSection.tsx     # Module styles, colors, gradients
│       ├── OverlaySection.tsx    # Image overlay & dithering
│       ├── AnimationSection.tsx  # GIF animation controls
│       ├── OutputSection.tsx     # Export format & settings
│       ├── WatermarkSection.tsx  # Watermark options
│       ├── MetadataSection.tsx   # File metadata
│       ├── ShareSection.tsx      # Share/embed options
│       └── SafetySection.tsx     # QA & safety checks
vendor/
└── lib/
    ├── dithered-qr/      # QR generation with dithering
    └── qrcode-generator/ # Base QR code library
```

## Tier System

Options are organized by complexity:

- **Basic**: Core functionality (Plain Text, URL, basic QR settings, simple styles)
- **Advanced**: Contact, Location, Calendar, Social, Documents, enhanced styling
- **Professional**: Payments, Marketing, Enterprise, safety/QA tools

## Payload Types (Kept - Open Specs)

### Core
- Plain text, URL, Tel, Email, SMS/MMS, Geo location

### Contact
- vCard (2.1/3.0/4.0), MeCard, BizCard

### Network
- WiFi (WPA/WPA2/WPA3)

### Calendar
- iCalendar/VEVENT, Calendar subscription (webcal://), RSVP links

### Documents & Media
- File/document URLs, Cloud storage links

### Social & Messaging
- Social profiles, WhatsApp/Telegram/Signal links

### Payments (Open Specs Only)
- EPC/SEPA (EU), UPI (India), PayNow (SG), PromptPay (TH), PIX (Brazil)
- Crypto URIs (bitcoin:, ethereum:, etc.)

### Marketing
- UTM campaign links, Short link redirects

### Enterprise
- GS1 Digital Link, App deep links (Android intent/iOS universal), Custom format

## Removed Payload Types

- **Alipay, WeChat Pay**: Require closed merchant backend
- **Bluetooth pairing**: Vendor-specific, inconsistent support
- **OTPAuth**: De-prioritized (complex, niche)

## Dithering Algorithms

### Ordered Dithering
- Bayer (2×2, 4×4, 8×8)
- Clustered-dot
- Void-and-cluster

### Error Diffusion
- Floyd–Steinberg
- Jarvis–Judice–Ninke
- Stucki, Atkinson, Burkes
- Sierra / Sierra-2 / Sierra-Lite

### Noise-Based
- Blue noise (static)
- White noise, Gaussian, Triangular

### Advanced/Hybrid
- Blue-noise error diffusion
- Screened blue noise
- Perceptual (luminance-weighted)
- Edge-aware, Adaptive threshold
- Temporal blue noise (animated)

## Key UI Features

- **Dark mode**: Toggle in header, persisted to localStorage
- **Sidebar toggle**: Click logo/icon to show/hide settings
- **Search**: Deep search across all settings with highlighting
- **Tier toggle**: Tabs on desktop, dropdown on mobile
- **Image preview**: With square crop selector overlay
- **Responsive**: Mobile-first with adaptive layout

## QR Encoding Options

- Versions 1–40 (auto-detect supported)
- Error correction: L (7%), M (15%), Q (25%), H (30%)
- Mask patterns: Auto or manual (0-7)
- Encoding modes: Numeric, Alphanumeric, Byte (UTF-8), Kanji
- Quiet zone: Configurable margin

## Build Commands

```bash
make dev    # Start dev server
make build  # Production build
```

## Design Decisions

1. **Fixed sidebar overlay**: Sidebar is always fixed/overlay position so hiding it doesn't leave gaps
2. **Grouped payload categories**: Content types organized into logical groups with tier-based visibility
3. **Search keywords by tier**: Search only matches options visible at current tier
4. **Shadow-based styling**: Drop shadows on sections and headers for visual hierarchy
5. **Tailwind v4**: Using @theme directive for CSS variables instead of @layer
