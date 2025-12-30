import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'ANQR User Guide',
  description: 'Complete guide to using ANQR for creating QR codes.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'Getting Started',
      paragraphs: [
        'ANQR is a client-first QR code generator that primarily runs on your device - your computer, phone, or tablet. No account is required, and your data stays on your device by default. For professional use cases, an optional server-side API is available for automated generation and embedding.',
        'The interface has three interface levels: Basic, Advanced, and Professional. Select your level using the tabs in the header. Each level unlocks additional features while keeping the interface focused on what you need.',
      ],
      bullets: [
        'Basic: Simple QR code creation with plain text/URL content and image overlay.',
        'Advanced: QR encoding options, rendering styles, animation, output formats, extended content types, and overlay customization.',
        'Professional: Watermarks, metadata, sharing, safety analysis, payment QR codes, and enterprise features.',
      ],
    },
    {
      heading: 'Quick Start',
      paragraphs: [
        'To create your first QR code:',
      ],
      bullets: [
        '1. Select a content type (URL, text, WiFi, etc.) from the Content Type dropdown.',
        '2. Enter your data in the provided fields.',
        '3. Optionally customize colors, styles, and add an overlay image.',
        '4. Click Export to download your QR code as PNG, GIF, WebP, or SVG.',
      ],
    },
    {
      heading: 'Basic Features',
      paragraphs: [
        'The Basic level provides a streamlined interface for creating QR codes with payload content and image overlays. This is the simplest way to get started.',
      ],
    },
    {
      heading: 'Content Types (Basic)',
      paragraphs: [
        'Plain Text: Encode any text up to the QR code capacity limit. Ideal for short messages, codes, or identifiers.',
        'URL: Encode web addresses. The QR code will open the URL when scanned. Supports http:// and https:// protocols.',
      ],
    },
    {
      heading: 'Image Overlay (Basic)',
      paragraphs: [
        'Upload an image (JPG, PNG, GIF, WebP) to blend with your QR code. Basic overlay features include:',
      ],
      bullets: [
        'Upload from file: Select an image from your device.',
        'Load from URL: Enter an image URL (must allow CORS).',
        'Center Logo: Places image in the center, relying on error correction.',
        'Blend: Simple alpha blending of image with QR pattern.',
        'Intensity: Controls how strongly the overlay affects the QR code (0-100%).',
        'Color Mode: Full Color, Grayscale, or Black & White.',
        'Preserve Finder Patterns: Keeps corner patterns unmodified for reliable scanning.',
      ],
    },
    {
      heading: 'Advanced Features',
      paragraphs: [
        'The Advanced level unlocks QR encoding options, rendering styles, animation, output formats, extended content types, and advanced overlay customization.',
      ],
    },
    {
      heading: 'QR Encoding Settings',
      paragraphs: [
        'Version: QR codes come in versions 1-40, with higher versions holding more data but being larger. Set to 0 (Auto) to let ANQR choose the smallest version that fits your content.',
        'Error Correction: Determines how much damage a QR code can sustain while remaining scannable.',
      ],
      bullets: [
        'L (Low): 7% error correction - smallest size, least redundancy.',
        'M (Medium): 15% error correction - balanced option.',
        'Q (Quartile): 25% error correction - good for printed codes.',
        'H (High): 30% error correction - best for codes with overlays or in harsh conditions.',
      ],
    },
    {
      heading: 'Quiet Zone (Margin)',
      paragraphs: [
        'The quiet zone is the white space around the QR code. Scanners need this margin to detect where the code starts. The standard recommends at least 4 modules. Reducing below 4 may cause scanning issues.',
      ],
    },
    {
      heading: 'Module Style',
      paragraphs: [
        'Modules are the individual squares that make up a QR code. ANQR offers five styles:',
      ],
      bullets: [
        'Square: Classic QR appearance with sharp corners.',
        'Rounded: Softened corners for a friendlier look.',
        'Dots: Circular modules for a modern aesthetic.',
        'Diamond: 45° rotated squares for a distinctive pattern.',
        'Connected: Modules merge when adjacent, creating organic shapes.',
      ],
    },
    {
      heading: 'Finder Pattern Style',
      paragraphs: [
        'Finder patterns are the three large squares in QR corners that help scanners orient the code. Available styles:',
      ],
      bullets: [
        'Square: Standard square corners.',
        'Rounded: Softened corners matching rounded module style.',
        'Circle: Circular finder patterns for dot-style codes.',
      ],
    },
    {
      heading: 'Alignment & Timing Patterns',
      paragraphs: [
        'Alignment patterns appear in larger QR codes (version 2+) to help correct distortion. Timing patterns are the alternating lines connecting finder patterns.',
      ],
      bullets: [
        'Alignment Style: Match Finder, Square, Rounded, or Circle.',
        'Timing Style: Match Module, Solid, or Dashed.',
      ],
    },
    {
      heading: 'Colors',
      paragraphs: [
        'Foreground: The color of the QR modules. Black (#000000) is standard but any dark color works.',
        'Background: The background color. White (#ffffff) is standard. Ensure sufficient contrast with the foreground.',
        'Transparent Background: Remove the background entirely for use on colored surfaces. Ensure the surface provides adequate contrast.',
      ],
    },
    {
      heading: 'Module Size & Gap',
      paragraphs: [
        'Module Size: Controls how large each module is rendered in pixels. Larger values create bigger, easier-to-scan codes.',
        'Module Gap: Adds space between modules as a percentage. Small gaps (5-15%) can improve scannability in some conditions but excessive gaps reduce reliability.',
      ],
    },
    {
      heading: 'Output Settings',
      paragraphs: [
        'Format: Choose your export format based on use case.',
      ],
      bullets: [
        'PNG: Lossless raster format, ideal for most uses. Best for print and digital.',
        'WebP: Modern format with smaller file sizes. Good for web use.',
        'GIF: Required for animated QR codes. Supports transparency.',
        'SVG: Vector format that scales infinitely. Best for large print or when you need to edit the code.',
      ],
    },
    {
      heading: 'Output Dimensions',
      paragraphs: [
        'Width/Height: Set the output size in pixels. For print, calculate based on DPI (e.g., 300 DPI at 1 inch = 300px). Larger sizes scan more reliably at distance.',
      ],
    },
    {
      heading: 'Animation Settings (Advanced)',
      paragraphs: [
        'Control animated QR code behavior:',
      ],
      bullets: [
        'Speed: Animation frame rate in milliseconds.',
        'Loop: Continuous or single-play animation.',
        'Bounce: Ping-pong animation direction.',
        'Start Frame: Begin animation from specific frame.',
        'Max Frames: Limit total frames in animation.',
        'Frame Step: Skip frames for faster animation.',
        'Interpolation: None, Crossfade, or Morph between frames.',
      ],
    },
    {
      heading: 'Content Types (Advanced)',
      paragraphs: [
        'Advanced level unlocks additional payload formats:',
      ],
      bullets: [
        'Phone Number (tel:): Creates a callable phone link.',
        'Email (mailto:): Opens email client with optional subject and body.',
        'SMS: Pre-filled text message to a phone number.',
        'vCard: Full contact card with name, organization, phone, email, address.',
        'MeCard: Compact contact format popular in Japan.',
        'BizCard: Legacy business card format.',
        'Geo Location: GPS coordinates that open in maps.',
        'WiFi: Network credentials for automatic connection (SSID, password, security type).',
        'Calendar Event: iCalendar format with title, location, date/time.',
        'Event RSVP: Link to event registration page.',
        'Calendar Subscribe: Subscribe to an ICS/WebCal feed.',
        'File/Document URL: Direct link to downloadable files.',
        'Cloud Storage Link: Links to Google Drive, Dropbox, OneDrive, etc.',
        'Social Profile: Links to LinkedIn, Twitter, Instagram, etc.',
        'Messaging Link: WhatsApp, Telegram, Signal deep links.',
      ],
    },
    {
      heading: 'Advanced Overlay Features',
      paragraphs: [
        'Additional overlay capabilities:',
      ],
      bullets: [
        'Crop: Enable cropping to select a square region of your image.',
        'Halftone: Classic print-style dot pattern based on image brightness.',
        'Dithered: Error-diffusion dithering for detailed reproduction.',
      ],
    },
    {
      heading: 'Overlay Blend Modes (Advanced)',
      paragraphs: [
        'Additional blend modes in Advanced level:',
      ],
      bullets: [
        'Subpixel: Divides each module into subpixels for higher detail.',
        'Blue Noise: Uses blue noise dithering for artifact-free patterns.',
        'Mosaic: Tile-based effect preserving image structure.',
        'Gap Fill: Places image in gaps between modules.',
        'Brightness: Varies module size based on image brightness.',
        'Duotone: Maps image to two colors for striking contrast.',
      ],
    },
    {
      heading: 'Overlay Intensity',
      paragraphs: [
        'Controls how strongly the overlay affects the QR code (0-100%). Higher values show more image detail but may reduce scannability. Start around 70% and adjust based on testing.',
      ],
    },
    {
      heading: 'Color Mode',
      paragraphs: [
        'How the overlay image is processed:',
      ],
      bullets: [
        'Full Color: Preserves original image colors.',
        'Grayscale: Converts to black and white tones.',
        'Black & White: High contrast binary conversion.',
      ],
    },
    {
      heading: 'Preserve Finder Patterns',
      paragraphs: [
        'When enabled, keeps the three corner finder patterns unmodified by the overlay. Strongly recommended for reliable scanning.',
      ],
    },
    {
      heading: 'Image Preprocessing',
      paragraphs: [
        'Apply filters to your overlay image before blending. These adjustments can improve how the image appears in the final QR code.',
      ],
      bullets: [
        'Brightness (-100 to +100): Lighten or darken the image.',
        'Contrast (-100 to +100): Increase or decrease tonal range.',
        'Gamma (0.2 to 3.0): Non-linear brightness adjustment. Values below 1 lighten midtones, above 1 darken them.',
        'Saturation (-100 to +100): Color intensity. -100 is grayscale, +100 is oversaturated.',
        'Hue Rotate (0-360°): Shift all colors around the color wheel.',
        'Blur (0-20px): Soften image details.',
        'Sharpen (0-100%): Enhance edges and details.',
        'Posterize (0-16 levels): Reduce color levels for a poster effect.',
        'Threshold (0-255): Convert to binary black/white at cutoff point.',
        'Edge Detection: Sobel or Canny algorithms to show only edges.',
        'Invert: Reverse all colors.',
      ],
    },
    {
      heading: 'Fit Mode',
      paragraphs: [
        'How the overlay image fits the QR code area:',
      ],
      bullets: [
        'Cover: Image fills entire area, cropping if needed.',
        'Contain: Entire image visible, may have margins.',
        'Stretch: Image distorts to fill exactly.',
      ],
    },
    {
      heading: 'Transform Options',
      paragraphs: [
        'Rotation: Rotate overlay in 90° increments.',
        'Flip X/Y: Mirror the image horizontally or vertically.',
      ],
    },
    {
      heading: 'Dithering Algorithms',
      paragraphs: [
        'Dithering converts continuous-tone images to patterns that QR codes can represent. Available when using Dithered, Blue Noise, or True Dither blend modes.',
      ],
      bullets: [
        'Error Diffusion: Classic Floyd-Steinberg style. Spreads quantization error to neighboring pixels.',
        'Ordered (Bayer): Uses a threshold matrix for regular patterns.',
        'Clustered Dot: Simulates halftone printing.',
        'Void & Cluster: Optimized ordered dithering.',
        'Blue Noise: Visually pleasant random-looking pattern.',
        'Blue Noise Threshold: Threshold dithering with blue noise texture.',
        'White Noise: Random threshold dithering.',
        'Gaussian/Triangular Noise: Noise with different distributions.',
        'Blue Noise + Error Diffusion: Hybrid combining both techniques.',
        'Screened Blue Noise: Screen-like blue noise pattern.',
        'Perceptual: Luminance-weighted for better visual results.',
        'Edge-Aware: Preserves image edges during dithering.',
        'Adaptive Threshold: Locally-adaptive thresholding.',
        'Temporal Blue Noise: For animated GIFs, varies pattern per frame.',
      ],
    },
    {
      heading: 'Diffusion Kernels',
      paragraphs: [
        'When using Error Diffusion dithering, choose how error is distributed:',
      ],
      bullets: [
        'Floyd-Steinberg: Classic 4-neighbor diffusion. Good general choice.',
        'Jarvis-Judice-Ninke: 12-neighbor, smoother but slower.',
        'Stucki: Similar to JJN with different weights.',
        'Burkes: Simplified JJN, faster.',
        'Sierra: Family of kernels balancing quality and speed.',
        'Atkinson: Light diffusion, preserves detail but can be grainy.',
      ],
    },
    {
      heading: 'Dither Strength',
      paragraphs: [
        'Controls how much dithering is applied (0-100%). Lower values preserve more of the original pattern, higher values show more image detail.',
      ],
    },
    {
      heading: 'Subpixel Settings',
      paragraphs: [
        'When using Subpixel blend mode:',
      ],
      bullets: [
        'Grid Size: 2×2, 3×3, or 4×4 subpixels per module. Higher = more detail.',
        'Center Rule: Strict requires center subpixel to match module. Halftone Center allows variation.',
        'Neutral Color: Color used for undetermined subpixels.',
        'Finder Override: How finder patterns are rendered (Solid or Stylized).',
      ],
    },
    {
      heading: 'Halftone Settings',
      paragraphs: [
        'When using Halftone blend mode:',
      ],
      bullets: [
        'Cell Size: Per Module or N×N grid.',
        'Dot Shape: Circle, Square, or Line.',
        'Brightness Curve: Linear, S-Curve, or Gamma.',
      ],
    },
    {
      heading: 'Duotone Colors',
      paragraphs: [
        'When using Duotone blend mode, set the Shadow color (dark areas) and Highlight color (bright areas).',
      ],
    },
    {
      heading: 'GIF Animation Settings',
      paragraphs: [
        'When using animated GIF overlays:',
      ],
      bullets: [
        'Use Frame Delays: Respect original GIF timing.',
        'Max FPS: Limit frame rate (1-60 fps).',
        'Disposal Handling: Respect or Simplify frame disposal methods.',
      ],
    },
    {
      heading: 'Advanced Rendering Options',
      paragraphs: [
        'Additional rendering controls:',
      ],
      bullets: [
        'Gap Mode: None, Inset, Stroke, or Negative Space gap styling.',
        'Corner Radius: Rounded corners percentage for modules.',
        'Gradient: None, Linear, Radial, or Conic gradient on modules.',
        'Eye Outer/Inner Style: Independent styling for finder pattern rings.',
        'Dot Rotation: Rotate diamond/dot modules.',
        'Eye Scale: Size adjustment for finder patterns.',
        'Frame Style: Add decorative frames (Rounded Frame, Sticker, Tag).',
        'Frame Text: Add text like "Scan Me!" to frames.',
      ],
    },
    {
      heading: 'Advanced QR Encoding',
      paragraphs: [
        'Fine-tune QR encoding:',
      ],
      bullets: [
        'Encoding Mode: Auto, Numeric, Alphanumeric, Byte/UTF-8, or Kanji.',
        'Enforce Min Quiet Zone: Ensure at least 4 module margin.',
      ],
    },
    {
      heading: 'Advanced Output Options',
      paragraphs: [
        'Additional export settings:',
      ],
      bullets: [
        'Filename: Custom filename for downloads.',
        'GIF Palette Size: 2-256 colors in GIF output.',
        'GIF Quantizer: Median Cut, NeuQuant, or Octree color reduction.',
        'GIF Dithering: Off, Floyd-Steinberg, or Ordered.',
        'GIF Transparent Color: Set a color to be transparent.',
        'SVG True Vector: Use paths instead of embedded raster.',
        'SVG Shape Precision: Pixel or Precise path rendering.',
        'SVG Embed Raster Overlay: Include overlay as embedded image.',
        'Background Override: Force a specific background color in output.',
      ],
    },
    {
      heading: 'Validation Options',
      paragraphs: [
        'Input processing settings:',
      ],
      bullets: [
        'Validate Input: Check content format before encoding.',
        'Trim Whitespace: Remove leading/trailing spaces.',
        'Normalize Newlines: Convert all line endings to LF.',
        'Max Length Guard: Warn if content exceeds QR capacity.',
      ],
    },
    {
      heading: 'Professional Features',
      paragraphs: [
        'The Professional level adds watermarks, metadata, sharing options, safety analysis, payment QR codes, and enterprise features.',
      ],
    },
    {
      heading: 'Watermark',
      paragraphs: [
        'Add watermarks to your QR codes:',
      ],
      bullets: [
        'Kind: Text, Image, or Pattern watermark.',
        'Position: Center, Corners, Edges, Behind, or Quiet Zone.',
        'Opacity: Watermark transparency (0-100%).',
        'Blend Mode: Normal, Multiply, Screen, or Overlay blending.',
      ],
    },
    {
      heading: 'Metadata',
      paragraphs: [
        'Embed metadata in exported files:',
      ],
      bullets: [
        'Title, Author, Copyright, License, Description fields.',
        'Creation Time: Embed generation timestamp.',
        'Custom Key-Value: Add arbitrary metadata pairs.',
      ],
    },
    {
      heading: 'Sharing',
      paragraphs: [
        'Share your QR code configurations:',
      ],
      bullets: [
        'Direct Link: Generate a shareable URL with your current settings.',
        'Embed HTML: Get embed code for websites.',
        'Encode Parameters: Include all settings in the share URL.',
        'Note: Overlay images from local files cannot be shared via URL.',
      ],
    },
    {
      heading: 'Safety Analysis',
      paragraphs: [
        'Ensure QR codes remain scannable:',
      ],
      bullets: [
        'Safety Mode: Off, Balanced, or Strict scanning requirements.',
        'Min Module Size: Minimum pixel size per module.',
        'Min Quiet Zone: Minimum margin modules.',
        'Lock Finders/Timing/Align/Format/Version: Protect specific elements.',
        'Max Overlay Intensity by ECC: Automatic intensity limits based on error correction level.',
      ],
    },
    {
      heading: 'Content Types (Professional)',
      paragraphs: [
        'Professional level adds payment and enterprise content types:',
      ],
      bullets: [
        'EPC/SEPA (EU): European bank transfer QR codes with IBAN, BIC, amount, reference.',
        'UPI (India): Unified Payments Interface with VPA, payee name, amount.',
        'PayNow (Singapore): Singapore fast payment with UEN or mobile number.',
        'PromptPay (Thailand): Thai national payment system.',
        'PIX (Brazil): Brazilian instant payment with PIX key.',
        'Crypto: Bitcoin, Ethereum, Litecoin payment addresses with optional amount.',
        'Marketing Campaign Link: URLs with full UTM parameter (Marketing Tags) tracking.',
        'Short Link: For use with URL shorteners for dynamic/trackable QR codes.',
        'GS1 Digital Link: Product identification with GTIN, serial, batch, expiry.',
        'App Deep Link: iOS/Android app deep links with custom schemes.',
        'Custom Format: Raw data with no formatting or validation.',
      ],
    },
    {
      heading: 'Overlay Blend Modes (Professional)',
      paragraphs: [
        'Additional blend modes in Professional level:',
      ],
      bullets: [
        'Pixelate: Pixelated overlay effect.',
        'Outline: Edge detection overlay showing only contours.',
        'Wave: Wavy distortion effect.',
        'Subpixel Size: Variable subpixel sizing based on image.',
        'True Dither: Advanced dithering with ordered matrix selection.',
        'Extreme: Maximum image visibility, may affect scannability.',
      ],
    },
    {
      heading: 'Protection Settings',
      paragraphs: [
        'Fine-grained control over which QR elements are protected from overlay modification:',
      ],
      bullets: [
        'Preserve Timing: Keep timing patterns unmodified.',
        'Preserve Alignment: Keep alignment patterns unmodified.',
        'Protect Format Info: Shield format information modules.',
        'Protect Version Info: Shield version information modules.',
      ],
    },
    {
      heading: 'ECC-Aware Mode',
      paragraphs: [
        'Intelligently distributes overlay intensity based on error correction capacity. The system analyzes which modules can be modified while maintaining scannability.',
      ],
      bullets: [
        'Risk Budget: Percentage of error correction capacity to use (0-100%).',
        'Higher budget = more visible overlay but riskier scannability.',
        'Lower budget = safer scanning but less visible overlay.',
      ],
    },
    {
      heading: 'Professional Rendering Options',
      paragraphs: [
        'Advanced rendering controls:',
      ],
      bullets: [
        'Crisp Edges: Use pixelated image rendering for sharp module edges.',
        'Pixel Snap: Floor, Round, or Ceil pixel alignment.',
        'Per-Module Color Mode: Solid, By Brightness, By Position, By Overlay, By Cluster.',
        'Color Palette: Define custom color palette for per-module coloring.',
        'Contrast Guard: Ensure minimum contrast ratio between colors.',
        'Min Contrast Ratio: WCAG-style contrast requirement (1:1 to 21:1).',
        'Extra Border Modules: Additional border beyond quiet zone.',
      ],
    },
    {
      heading: 'Professional Output Options',
      paragraphs: [
        'Enterprise export settings:',
      ],
      bullets: [
        'DPI: Set print resolution (72-600 DPI). 300 DPI recommended for print.',
        'Include Quiet Zone: Toggle quiet zone in output dimensions.',
        'Export As Additional: Generate PDF alongside primary format.',
      ],
    },
    {
      heading: 'Animation Settings (Professional)',
      paragraphs: [
        'Additional professional animation features:',
      ],
      bullets: [
        'Temporal Dither: Off, Blue Noise, or Flicker Safe per-frame dithering.',
        'Pattern: None, Pulse, Wave, Scanline, Shimmer, or Drift effects.',
      ],
    },
    {
      heading: 'API Reference',
      paragraphs: [
        'ANQR provides a server-side API for automated QR code generation. This is useful for embedding QR codes in websites, generating codes programmatically, or integrating with other services.',
        'Base URL: https://anqr.link/api/qr',
        'All parameters are passed as URL query parameters. The API returns the generated QR code image directly.',
      ],
    },
    {
      heading: 'Basic Parameters',
      paragraphs: [
        'Core parameters for QR code generation:',
      ],
      bullets: [
        'data (required): The content to encode in the QR code. URL-encode special characters.',
        'size: Output size in pixels (default: 400, max: 2000).',
        'w: Output width in pixels (overrides size).',
        'h: Output height in pixels (overrides size).',
        'ec: Error correction level - L, M, Q, or H (default: H).',
        'v: QR version 1-40, or 0 for auto (default: 0).',
        'enc: Encoding mode - auto, numeric, alphanumeric, byte, kanji (default: auto).',
        'format: Output format - png, gif, webp, svg (default: png).',
        'fg: Foreground color as hex without # (default: 000000).',
        'bg: Background color as hex without # (default: ffffff).',
        'transparent: Set to 1 for transparent background.',
        'margin: Quiet zone modules 0-20 (default: 4).',
        'border: Extra border modules 0-10 (default: 0).',
      ],
    },
    {
      heading: 'Style Parameters',
      paragraphs: [
        'Customize the visual appearance:',
      ],
      bullets: [
        'style: Module style - square, rounded, dots, diamond, connected (default: square).',
        'finder: Finder pattern style - square, rounded, circle (default: square).',
        'align: Alignment pattern style - match_finder, square, rounded, circle.',
        'timing: Timing pattern style - match_module, solid, dashed.',
        'eyeOuter: Eye outer ring style - square, rounded, circle.',
        'eyeInner: Eye inner style - square, rounded, circle.',
        'eyeScale: Eye scale percentage 50-150 (default: 100).',
        'radius: Corner radius percentage 0-100 (default: 0).',
        'gap: Module gap percentage 0-50 (default: 0).',
        'gapMode: Gap rendering - none, inset, stroke, negative_space.',
        'dotRot: Dot/diamond rotation in degrees.',
        'frame: Frame style - none, rounded_frame, sticker, tag.',
        'frameText: Text to show in frame (URL encoded).',
        'crisp: Crisp edges 0/1 (default: 1).',
        'snap: Pixel snap - floor, round, ceil (default: floor).',
      ],
    },
    {
      heading: 'Color and Gradient Parameters',
      paragraphs: [
        'Advanced color options:',
      ],
      bullets: [
        'grad: Gradient type - none, linear, radial, conic.',
        'gradAngle: Gradient angle in degrees for linear (default: 0).',
        'gradStops: Gradient color stops as hex,pos,hex,pos (e.g., ff0000,0,0000ff,1).',
        'modColor: Per-module color mode - solid, by_brightness, by_position, by_overlay, by_cluster.',
        'palette: Custom color palette as comma-separated hex colors.',
        'paletteMode: Palette assignment mode - position, brightness, diagonal, radial, random, row, column.',
        'cGuard: Contrast guard 0/1 (default: 0).',
        'minContrast: Minimum contrast ratio (default: 4.5).',
      ],
    },
    {
      heading: 'Overlay Parameters',
      paragraphs: [
        'Add image overlays to QR codes:',
      ],
      bullets: [
        'img: URL of overlay image (must be publicly accessible).',
        'mode: Overlay blend mode - center_logo, blend, halftone, dithered, mosaic, gap_fill, brightness, duotone, subpixel, blue_noise.',
        'intensity: Overlay intensity 0-100 (default: 100).',
        'logoSize: Center logo size percentage 5-50 (default: 25).',
        'colorMode: Image processing - color, grayscale, bw.',
        'fit: Image fit mode - cover, contain, stretch (default: cover).',
        'rot: Rotation in degrees (default: 0).',
        'flipX: Flip horizontally 0/1 (default: 0).',
        'flipY: Flip vertically 0/1 (default: 0).',
      ],
    },
    {
      heading: 'Overlay Preprocessing Parameters',
      paragraphs: [
        'Adjust the overlay image before blending:',
      ],
      bullets: [
        'brightness: Brightness adjustment -100 to 100 (default: 0).',
        'contrast: Contrast adjustment -100 to 100 (default: 0).',
        'gamma: Gamma adjustment 0.1-3 (default: 1).',
        'saturation: Saturation adjustment -100 to 100 (default: 0).',
        'hue: Hue rotation in degrees 0-360 (default: 0).',
        'blur: Blur in pixels 0-20 (default: 0).',
        'sharpen: Sharpen amount 0-100 (default: 0).',
        'posterize: Posterize levels 0-16 (default: 0).',
        'threshold: Binary threshold 0-255 (default: 128).',
        'edge: Edge detection - off, sobel, canny (default: off).',
        'invert: Invert colors 0/1 (default: 0).',
      ],
    },
    {
      heading: 'Protection Parameters',
      paragraphs: [
        'Control which QR elements are protected:',
      ],
      bullets: [
        'keepFinders: Preserve finder patterns 0/1 (default: 1).',
        'keepTiming: Preserve timing patterns 0/1 (default: 0).',
        'keepAlign: Preserve alignment patterns 0/1 (default: 0).',
        'protectFmt: Protect format info 0/1 (default: 0).',
        'protectVer: Protect version info 0/1 (default: 0).',
        'eccAware: ECC-aware mode 0/1 (default: 0).',
        'eccRisk: ECC risk budget 0-100 (default: 50).',
        'eccMap: ECC weight map - distance_to_finders, block_heatmap, empirical_scan_heatmap.',
        'maxIntL: Max overlay intensity for ECC L (default: 100).',
        'maxIntM: Max overlay intensity for ECC M (default: 100).',
        'maxIntQ: Max overlay intensity for ECC Q (default: 100).',
        'maxIntH: Max overlay intensity for ECC H (default: 100).',
      ],
    },
    {
      heading: 'Dithering Parameters',
      paragraphs: [
        'Control dithering when using dithered blend modes:',
      ],
      bullets: [
        'ditherKind: Dither algorithm - error_diffusion, ordered, clustered_dot, void_cluster, blue_noise, etc.',
        'diffusionKernel: Error diffusion kernel - floyd_steinberg, jarvis_judice_ninke, stucki, burkes, sierra, atkinson.',
        'ditherStrength: Dither strength 0-100 (default: 50).',
        'serpentine: Serpentine scanning 0/1 (default: 0).',
        'matrix: Ordered matrix - bayer2, bayer4, bayer8, etc.',
        'bnTile: Blue noise tile size (default: 64).',
        'bnSeed: Blue noise seed (default: 0).',
        'colorDither: Color dithering - none, per_channel, perceptual.',
      ],
    },
    {
      heading: 'Subpixel Parameters',
      paragraphs: [
        'Control subpixel blend mode:',
      ],
      bullets: [
        'spGrid: Subpixel grid - 2x2, 3x3, 4x4 (default: 3x3).',
        'spCenter: Center rule - strict, halftone_center (default: strict).',
        'spNeutral: Neutral color hex without # (default: 808080).',
        'spFinder: Finder override - solid, stylized (default: solid).',
      ],
    },
    {
      heading: 'Halftone and Duotone Parameters',
      paragraphs: [
        'Control halftone and duotone blend modes:',
      ],
      bullets: [
        'htCell: Halftone cell size - per_module or NxN.',
        'htDot: Halftone dot shape - circle, square, line.',
        'htCurve: Brightness curve - linear, s-curve, gamma.',
        'duo1: Duotone shadow color hex without # (default: 000000).',
        'duo2: Duotone highlight color hex without # (default: ffffff).',
      ],
    },
    {
      heading: 'Watermark Parameters',
      paragraphs: [
        'Add watermarks to generated codes:',
      ],
      bullets: [
        'wmEn: Enable watermark 0/1 (default: 0).',
        'wmKind: Watermark type - text, image, pattern (default: text).',
        'wmText: Watermark text (URL encoded).',
        'wmImg: URL of watermark image (for image/pattern types).',
        'wmPos: Position - center, corners, edges, behind, quiet_zone (default: center).',
        'wmOpacity: Opacity 0-100 (default: 50).',
        'wmBlend: Blend mode - normal, multiply, screen, overlay (default: normal).',
      ],
    },
    {
      heading: 'Animation Parameters',
      paragraphs: [
        'Create animated GIF output (requires format=gif):',
      ],
      bullets: [
        'animPattern: Animation effect - none, pulse, wave, scanline, shimmer, drift, color_cycle.',
        'animFrames: Number of frames 1-60 (default: 24).',
        'animSpeed: Frame delay in milliseconds 10-1000 (default: 100).',
        'animSeed: Random seed for reproducible animations.',
        'easing: Animation easing - linear, ease_in, ease_out, ease_in_out, bounce.',
      ],
    },
    {
      heading: 'Output Quality Parameters',
      paragraphs: [
        'Control output format and quality:',
      ],
      bullets: [
        'quality: General quality 0-1 for lossy formats (default: 0.9).',
        'webpQ: WebP quality 0-100 (default: 90).',
        'gifColors: GIF palette size 2-256 (default: 256).',
        'dpi: DPI metadata for PNG 1-1200 (default: 72).',
      ],
    },
    {
      heading: 'Metadata Parameters',
      paragraphs: [
        'Embed metadata in PNG output:',
      ],
      bullets: [
        'metaTitle: Image title (URL encoded).',
        'metaAuthor: Author name (URL encoded).',
        'metaCopy: Copyright notice (URL encoded).',
        'metaDesc: Image description (URL encoded).',
      ],
    },
    {
      heading: 'API Examples',
      paragraphs: [
        'Basic QR code:',
        'https://anqr.link/api/qr?data=https://example.com&size=300',
        'Styled QR code with rounded modules:',
        'https://anqr.link/api/qr?data=Hello&style=rounded&fg=336699&radius=30',
        'QR code with image overlay:',
        'https://anqr.link/api/qr?data=https://example.com&img=https://example.com/logo.png&mode=center_logo&ec=H',
        'Animated QR code:',
        'https://anqr.link/api/qr?data=Scan%20Me&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out',
        'QR code with watermark:',
        'https://anqr.link/api/qr?data=https://example.com&wmEn=1&wmText=SAMPLE&wmPos=center&wmOpacity=30',
      ],
    },
    {
      heading: 'Embedding QR Codes',
      paragraphs: [
        'In Professional mode, the Share feature generates embed code for websites. You can embed QR codes using either the API URL directly or the generated HTML.',
        'Direct image embedding:',
        '<img src="https://anqr.link/api/qr?data=YOUR_DATA" alt="QR Code" />',
        'The embed HTML includes responsive sizing and accessibility attributes. All your current settings are encoded in the URL, so recipients see the exact same QR code.',
        'Note: When using local file overlays, the image cannot be embedded via URL. Use a publicly accessible image URL instead.',
      ],
    },
    {
      heading: 'Best Practices',
      paragraphs: [
        'Follow these guidelines for reliable QR codes:',
      ],
      bullets: [
        'Always test your QR codes with multiple scanner apps before printing.',
        'Use Error Correction H (High) when adding overlays.',
        'Keep at least 4 modules of quiet zone (margin).',
        'Ensure high contrast between foreground and background.',
        'For print, use at least 300 DPI and test at actual print size.',
        'Enable Preserve Finder Patterns when using overlays.',
        'Start with lower overlay intensity and increase gradually.',
        'For outdoor use, consider larger module sizes and higher error correction.',
      ],
    },
    {
      heading: 'Troubleshooting',
      paragraphs: [
        'Common issues and solutions:',
      ],
      bullets: [
        'QR won\'t scan: Reduce overlay intensity, increase error correction, check contrast.',
        'Code too large: Reduce content length, use URL shortener, lower version.',
        'Blurry output: Increase module size, use PNG instead of compressed formats.',
        'Colors look wrong: Check color contrast, try grayscale overlay mode.',
        'GIF not animating: Ensure using GIF format output, check frame count.',
        'Image overlay not loading: Check CORS permissions on remote images.',
      ],
    },
    {
      heading: 'Keyboard Shortcuts',
      paragraphs: [
        'ANQR supports standard keyboard shortcuts. Use Ctrl/Cmd+S to trigger export (when focused on the preview).',
      ],
    },
  ],
};

export default docs;
