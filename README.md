# ANQR - Animated QR Code Generator

A professional, modern web application for creating animated QR codes with image and GIF overlays. Built as a static SPA that can be hosted for free on any CDN.

![ANQR Preview](https://via.placeholder.com/800x400?text=ANQR+Preview)

## Features

- 🎨 **Multiple Overlay Modes**
  - Halftone (size modulation) - Like [nicopr.fr/qrmove](https://nicopr.fr/qrmove/)
  - Color blend
  - Center logo
  - Background image

- 🎬 **GIF Animation Support**
  - Upload animated GIFs
  - Each frame renders in the QR code
  - Customizable animation speed
  - Loop and ping-pong options

- 🎯 **Full QR Configuration**
  - Error correction levels (L, M, Q, H)
  - QR versions 1-40 or auto
  - Module size and margin control
  - Custom foreground/background colors
  - Transparent background support

- 🖌️ **Module Styling**
  - Square, rounded, dots, diamond shapes
  - Custom finder pattern styles
  - Preserve finder patterns option

- 📤 **Export Options**
  - PNG, WebP, SVG, Animated GIF
  - Custom output dimensions
  - Quality control
  - Copy to clipboard

- 🔗 **Sharing & Embedding**
  - URL parameter encoding for all settings
  - Embeddable iframe code
  - Direct share links
  - Social media sharing

- 🌓 **Modern UI**
  - Dark/light theme
  - Mobile-first responsive design
  - Keyboard shortcuts
  - Toast notifications

## Quick Start

```bash
# Clone or download the project
cd anqr

# Install dependencies
make install
# or: npm install

# Start development server
make dev
# or: npm run dev

# Build for production
make build
# or: npm run build
```

## Deployment

This site is deployed on Netlify.

```bash
make deploy
```

Netlify must be linked (creates `.netlify/state.json`) or set `NETLIFY_SITE_ID`.


## URL Parameters API

Generate QR codes programmatically using URL parameters:

```
https://your-domain.com/?data=Hello&ec=H&fg=ff0000&render=1
```

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `data` | string | Content to encode | - |
| `ec` | L\|M\|Q\|H | Error correction level | Q |
| `v` | 0-40 | QR version (0=auto) | 0 |
| `size` | number | Module size (px) | 8 |
| `margin` | number | Quiet zone modules | 4 |
| `fg` | hex | Foreground color (no #) | 000000 |
| `bg` | hex | Background color (no #) | ffffff |
| `style` | string | square\|rounded\|dots\|diamond | square |
| `finder` | string | square\|rounded\|circle | square |
| `img` | url | Overlay image URL (encoded) | - |
| `mode` | string | halftone\|blend\|center\|background | halftone |
| `intensity` | 0-100 | Overlay intensity % | 50 |
| `logoSize` | 10-40 | Logo size % (center mode) | 25 |
| `speed` | number | Animation frame delay (ms) | 100 |
| `loop` | 0\|1 | Loop animation | 1 |
| `w` | number | Output width (px) | 400 |
| `h` | number | Output height (px) | 400 |
| `render` | 0\|1 | Auto-render on load | 0 |

## Embedding

```html
<iframe 
  src="https://your-domain.com/?data=https://example.com&render=1" 
  width="400" 
  height="400" 
  frameborder="0">
</iframe>
```

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Generate QR code
- `Ctrl/Cmd + S` - Download
- `Escape` - Close modals

## Pages

- **Generator** - Main QR code creation tool
- **About** - Information about ANQR and its features
- **Privacy Policy** - Privacy policy for AdSense compliance
- **Contact** - Contact form and support information

## Project Structure

```
anqr/
├── index.html          # Main SPA with all pages
├── package.json        # Dependencies
├── vite.config.js      # Build configuration
├── Makefile           # Build commands
├── src/
│   ├── main.js        # Application entry + SPA router
│   ├── lib/
│   │   └── qrcode.js  # QR code library (local)
│   ├── modules/
│   │   ├── qr-generator.js   # QR generation logic
│   │   ├── gif-parser.js     # GIF frame extraction
│   │   ├── url-params.js     # URL encoding/decoding
│   │   ├── exporter.js       # Download functionality
│   │   ├── toast.js          # Notifications
│   │   └── ui-controller.js  # UI utilities
│   └── styles/
│       └── main.css   # All styles
└── dist/              # Production build
```

## Monetization & AdSense

The application is designed for Google AdSense approval with:

**Required Pages:**
- About page with detailed information
- Privacy Policy (GDPR-compliant)
- Contact page with form

**Ad Placements:**
- Top banner (728x90 leaderboard) - visible on desktop
- Sidebar (160x600 skyscraper) - visible on large screens
- Mobile inline (320x100) - visible on mobile only
- In-content ads on About, Privacy, and Contact pages

**To integrate AdSense:**
1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Get approved (requires the pages above)
3. Replace `<div class="ad-placeholder">` elements with your AdSense code
4. Use responsive ad units for best results

## Technologies

- **Vite** - Fast build tool
- **qrcode-generator** - QR code generation
- **gifuct-js** - GIF parsing
- **Pure CSS** - No framework dependencies
- **Vanilla JavaScript** - ES modules

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License - Feel free to use for personal or commercial projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Credits

- QR Code library: [kazuhikoarase/qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)
- Inspired by: [nicopr.fr/qrmove](https://nicopr.fr/qrmove/)
