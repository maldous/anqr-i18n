import type { PageDefinition } from '../types'
import { LAST_UPDATED } from '../types'

export const docs: PageDefinition = {
  title: 'คู่มือผู้ใช้ ANQR',
  description: 'คู่มือฉบับสมบูรณ์สำหรับการใช้งาน ANQR เพื่อสร้าง QR โค้ด',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'เริ่มต้น',
      paragraphs: [
        `ANQR เป็นเครื่องสร้าง QR code ที่ทำงานทั้งหมดบนอุปกรณ์ของคุณ — คอมพิวเตอร์, โทรศัพท์หรือแท็บเล็ต ไม่ต้องมีบัญชี, ไม่มีเซิร์ฟเวอร์, ข้อมูลของคุณยังคงส่วนตัว`,
        `อินเตอร์เฟซมีสามระดับ: พื้นฐาน, ขั้นสูง, มืออาชีพ เลือกระดับของคุณด้วยแท็บในหัวข้อ แต่ละระดับปลดล็อกคุณสมบัติเพิ่มเติมขณะรักษาความโฟกัส`
      ],
      bullets: [
        'พื้นฐาน: สร้าง QR code ง่ายๆ ด้วยเนื้อหา plain text/URL และภาพ overlay',
        `Advanced: QR encoding options, rendering styles, animation, output formats, extended content types, and overlay customization.`,
        `Professional: Watermarks, metadata, sharing, safety analysis, payment QR codes, and enterprise features.`
      ]
    },
    {
      heading: 'เริ่มแบบเร็ว',
      paragraphs: [
        'To create your first QR code:'
      ],
      bullets: [
        '1. Select a content type (URL, text, WiFi, etc.) from the Content Type dropdown.',
        '2. Enter your data in the provided fields.',
        '3. Optionally customize colors, styles, and add an overlay image.',
        '4. Click Export to download your QR code as PNG, GIF, WebP, or SVG.'
      ]
    },
    {
      heading: 'ฟีเจอร์พื้นฐาน',
      paragraphs: [
        `The Basic level provides a streamlined interface for creating QR codes with payload content and image overlays. This is the simplest way to get started.`
      ]
    },
    {
      heading: 'ประเภทเนื้อหา (พื้นฐาน)',
      paragraphs: [
        `Plain Text: Encode any text up to the QR code capacity limit. Ideal for short messages, codes, or identifiers.`,
        `URL: Encode web addresses. The QR code will open the URL when scanned. Supports http:// and https:// protocols.`
      ]
    },
    {
      heading: 'ซ้อนทับรูปภาพ (พื้นฐาน)',
      paragraphs: [
        `Upload an image (JPG, PNG, GIF, WebP) to blend with your QR code. Basic overlay features include:`
      ],
      bullets: [
        'Upload from file: Select an image from your device.',
        'Load from URL: Enter an image URL (must allow CORS).',
        'Center Logo: Places image in the center, relying on error correction.',
        'Blend: Simple alpha blending of image with QR pattern.',
        'Intensity: Controls how strongly the overlay affects the QR code (0-100%).',
        'Color Mode: Full Color, Grayscale, or Black & White.',
        'Preserve Finder Patterns: Keeps corner patterns unmodified for reliable scanning.'
      ]
    },
    {
      heading: 'ฟีเจอร์ขั้นสูง',
      paragraphs: [
        `The Advanced level unlocks QR encoding options, rendering styles, animation, output formats, extended content types, and advanced overlay customization.`
      ]
    },
    {
      heading: 'การตั้งค่าการเข้ารหัส QR',
      paragraphs: [
        `Version: QR codes come in versions 1-40, with higher versions holding more data but being larger. Set to 0 (Auto) to let ANQR choose the smallest version that fits your content.`,
        `Error Correction: Determines how much damage a QR code can sustain while remaining scannable.`
      ],
      bullets: [
        'L (Low): 7% error correction - smallest size, least redundancy.',
        'M (Medium): 15% error correction - balanced option.',
        'Q (Quartile): 25% error correction - good for printed codes.',
        'H (High): 30% error correction - best for codes with overlays or in harsh conditions.'
      ]
    },
    {
      heading: 'โซนเงียบ (ระยะขอบ)',
      paragraphs: [
        `The quiet zone is the white space around the QR code. Scanners need this margin to detect where the code starts. The standard recommends at least 4 modules. Reducing below 4 may cause scanning issues.`
      ]
    },
    {
      heading: 'สไตล์โมดูล',
      paragraphs: [
        'Modules are the individual squares that make up a QR code. ANQR offers five styles:'
      ],
      bullets: [
        'Square: Classic QR appearance with sharp corners.',
        'Rounded: Softened corners for a friendlier look.',
        'Dots: Circular modules for a modern aesthetic.',
        'Diamond: 45° rotated squares for a distinctive pattern.',
        'Connected: Modules merge when adjacent, creating organic shapes.'
      ]
    },
    {
      heading: 'สไตล์แพตเทิร์น Finder',
      paragraphs: [
        `Finder patterns are the three large squares in QR corners that help scanners orient the code. Available styles:`
      ],
      bullets: [
        'Square: Standard square corners.',
        'Rounded: Softened corners matching rounded module style.',
        'Circle: Circular finder patterns for dot-style codes.'
      ]
    },
    {
      heading: 'แพตเทิร์นการจัดแนวและเวลา',
      paragraphs: [
        `Alignment patterns appear in larger QR codes (version 2+) to help correct distortion. Timing patterns are the alternating lines connecting finder patterns.`
      ],
      bullets: [
        'Alignment Style: Match Finder, Square, Rounded, or Circle.',
        'Timing Style: Match Module, Solid, or Dashed.'
      ]
    },
    {
      heading: 'สี',
      paragraphs: [
        `Foreground: The color of the QR modules. Black (#000000) is standard but any dark color works.`,
        `Background: The background color. White (#ffffff) is standard. Ensure sufficient contrast with the foreground.`,
        `Transparent Background: Remove the background entirely for use on colored surfaces. Ensure the surface provides adequate contrast.`
      ]
    },
    {
      heading: 'ขนาดและช่องว่างของโมดูล',
      paragraphs: [
        `Module Size: Controls how large each module is rendered in pixels. Larger values create bigger, easier-to-scan codes.`,
        `Module Gap: Adds space between modules as a percentage. Small gaps (5-15%) can improve scannability in some conditions but excessive gaps reduce reliability.`
      ]
    },
    {
      heading: 'การตั้งค่าผลลัพธ์',
      paragraphs: [
        'Format: Choose your export format based on use case.'
      ],
      bullets: [
        'PNG: Lossless raster format, ideal for most uses. Best for print and digital.',
        'WebP: Modern format with smaller file sizes. Good for web use.',
        'GIF: Required for animated QR codes. Supports transparency.',
        `SVG: Vector format that scales infinitely. Best for large print or when you need to edit the code.`
      ]
    },
    {
      heading: 'ขนาดผลลัพธ์',
      paragraphs: [
        `Width/Height: Set the output size in pixels. For print, calculate based on DPI (e.g., 300 DPI at 1 inch = 300px). Larger sizes scan more reliably at distance.`
      ]
    },
    {
      heading: 'การตั้งค่าแอนิเมชัน (ขั้นสูง)',
      paragraphs: [
        'Control animated QR code behavior:'
      ],
      bullets: [
        'Speed: Animation frame rate in milliseconds.',
        'Loop: Continuous or single-play animation.',
        'Bounce: Ping-pong animation direction.',
        'Start Frame: Begin animation from specific frame.',
        'Max Frames: Limit total frames in animation.',
        'Frame Step: Skip frames for faster animation.',
        'Interpolation: None, Crossfade, or Morph between frames.'
      ]
    },
    {
      heading: 'ประเภทเนื้อหา (ขั้นสูง)',
      paragraphs: [
        'Advanced level unlocks additional payload formats:'
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
        'Messaging Link: WhatsApp, Telegram, Signal deep links.'
      ]
    },
    {
      heading: 'ฟีเจอร์ซ้อนทับขั้นสูง',
      paragraphs: [
        'Additional overlay capabilities:'
      ],
      bullets: [
        'Crop: Enable cropping to select a square region of your image.',
        'Halftone: Classic print-style dot pattern based on image brightness.',
        'Dithered: Error-diffusion dithering for detailed reproduction.'
      ]
    },
    {
      heading: 'โหมดผสมซ้อนทับ (ขั้นสูง)',
      paragraphs: [
        'Additional blend modes in Advanced level:'
      ],
      bullets: [
        'Subpixel: Divides each module into subpixels for higher detail.',
        'Blue Noise: Uses blue noise dithering for artifact-free patterns.',
        'Mosaic: Tile-based effect preserving image structure.',
        'Gap Fill: Places image in gaps between modules.',
        'Brightness: Varies module size based on image brightness.',
        'Duotone: Maps image to two colors for striking contrast.'
      ]
    },
    {
      heading: 'ความเข้มของซ้อนทับ',
      paragraphs: [
        `Controls how strongly the overlay affects the QR code (0-100%). Higher values show more image detail but may reduce scannability. Start around 70% and adjust based on testing.`
      ]
    },
    {
      heading: 'โหมดสี',
      paragraphs: [
        'How the overlay image is processed:'
      ],
      bullets: [
        'Full Color: Preserves original image colors.',
        'Grayscale: Converts to black and white tones.',
        'Black & White: High contrast binary conversion.'
      ]
    },
    {
      heading: 'คงแพตเทิร์น Finder',
      paragraphs: [
        `When enabled, keeps the three corner finder patterns unmodified by the overlay. Strongly recommended for reliable scanning.`
      ]
    },
    {
      heading: 'การเตรียมรูปภาพก่อนประมวลผล',
      paragraphs: [
        `Apply filters to your overlay image before blending. These adjustments can improve how the image appears in the final QR code.`
      ],
      bullets: [
        'Brightness (-100 to +100): Lighten or darken the image.',
        'Contrast (-100 to +100): Increase or decrease tonal range.',
        `Gamma (0.2 to 3.0): Non-linear brightness adjustment. Values below 1 lighten midtones, above 1 darken them.`,
        'Saturation (-100 to +100): Color intensity. -100 is grayscale, +100 is oversaturated.',
        'Hue Rotate (0-360°): Shift all colors around the color wheel.',
        'Blur (0-20px): Soften image details.',
        'Sharpen (0-100%): Enhance edges and details.',
        'Posterize (0-16 levels): Reduce color levels for a poster effect.',
        'Threshold (0-255): Convert to binary black/white at cutoff point.',
        'Edge Detection: Sobel or Canny algorithms to show only edges.',
        'Invert: Reverse all colors.'
      ]
    },
    {
      heading: 'โหมดปรับให้พอดี',
      paragraphs: [
        'How the overlay image fits the QR code area:'
      ],
      bullets: [
        'Cover: Image fills entire area, cropping if needed.',
        'Contain: Entire image visible, may have margins.',
        'Stretch: Image distorts to fill exactly.'
      ]
    },
    {
      heading: 'ตัวเลือกการแปลง',
      paragraphs: [
        'Rotation: Rotate overlay in 90° increments.',
        'Flip X/Y: Mirror the image horizontally or vertically.'
      ]
    },
    {
      heading: 'อัลกอริทึม Dithering',
      paragraphs: [
        `Dithering converts continuous-tone images to patterns that QR codes can represent. Available when using Dithered, Blue Noise, or True Dither blend modes.`
      ],
      bullets: [
        `Error Diffusion: Classic Floyd-Steinberg style. Spreads quantization error to neighboring pixels.`,
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
        'Temporal Blue Noise: For animated GIFs, varies pattern per frame.'
      ]
    },
    {
      heading: 'เคอร์เนลการกระจาย',
      paragraphs: [
        'When using Error Diffusion dithering, choose how error is distributed:'
      ],
      bullets: [
        'Floyd-Steinberg: Classic 4-neighbor diffusion. Good general choice.',
        'Jarvis-Judice-Ninke: 12-neighbor, smoother but slower.',
        'Stucki: Similar to JJN with different weights.',
        'Burkes: Simplified JJN, faster.',
        'Sierra: Family of kernels balancing quality and speed.',
        'Atkinson: Light diffusion, preserves detail but can be grainy.'
      ]
    },
    {
      heading: 'ความแรงของ Dither',
      paragraphs: [
        `Controls how much dithering is applied (0-100%). Lower values preserve more of the original pattern, higher values show more image detail.`
      ]
    },
    {
      heading: 'การตั้งค่า Subpixel',
      paragraphs: [
        'When using Subpixel blend mode:'
      ],
      bullets: [
        'Grid Size: 2×2, 3×3, or 4×4 subpixels per module. Higher = more detail.',
        `Center Rule: Strict requires center subpixel to match module. Halftone Center allows variation.`,
        'Neutral Color: Color used for undetermined subpixels.',
        'Finder Override: How finder patterns are rendered (Solid or Stylized).'
      ]
    },
    {
      heading: 'การตั้งค่า Halftone',
      paragraphs: [
        'When using Halftone blend mode:'
      ],
      bullets: [
        'Cell Size: Per Module or N×N grid.',
        'Dot Shape: Circle, Square, or Line.',
        'Brightness Curve: Linear, S-Curve, or Gamma.'
      ]
    },
    {
      heading: 'สี Duotone',
      paragraphs: [
        `When using Duotone blend mode, set the Shadow color (dark areas) and Highlight color (bright areas).`
      ]
    },
    {
      heading: 'การตั้งค่าแอนิเมชัน GIF',
      paragraphs: [
        'When using animated GIF overlays:'
      ],
      bullets: [
        'Use Frame Delays: Respect original GIF timing.',
        'Max FPS: Limit frame rate (1-60 fps).',
        'Disposal Handling: Respect or Simplify frame disposal methods.'
      ]
    },
    {
      heading: 'ตัวเลือกการเรนเดอร์ขั้นสูง',
      paragraphs: [
        'Additional rendering controls:'
      ],
      bullets: [
        'Gap Mode: None, Inset, Stroke, or Negative Space gap styling.',
        'Corner Radius: Rounded corners percentage for modules.',
        'Gradient: None, Linear, Radial, or Conic gradient on modules.',
        'Eye Outer/Inner Style: Independent styling for finder pattern rings.',
        'Dot Rotation: Rotate diamond/dot modules.',
        'Eye Scale: Size adjustment for finder patterns.',
        'Frame Style: Add decorative frames (Rounded Frame, Sticker, Tag).',
        'Frame Text: Add text like "Scan Me!" to frames.'
      ]
    },
    {
      heading: 'การเข้ารหัส QR ขั้นสูง',
      paragraphs: [
        'Fine-tune QR encoding:'
      ],
      bullets: [
        'Encoding Mode: Auto, Numeric, Alphanumeric, Byte/UTF-8, or Kanji.',
        'Enforce Min Quiet Zone: Ensure at least 4 module margin.'
      ]
    },
    {
      heading: 'ตัวเลือกเอาต์พุตขั้นสูง',
      paragraphs: [
        'Additional export settings:'
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
        'Background Override: Force a specific background color in output.'
      ]
    },
    {
      heading: 'ตัวเลือกการตรวจสอบ',
      paragraphs: [
        'Input processing settings:'
      ],
      bullets: [
        'Validate Input: Check content format before encoding.',
        'Trim Whitespace: Remove leading/trailing spaces.',
        'Normalize Newlines: Convert all line endings to LF.',
        'Max Length Guard: Warn if content exceeds QR capacity.'
      ]
    },
    {
      heading: 'ฟีเจอร์ระดับโปร',
      paragraphs: [
        `The Professional level adds watermarks, metadata, sharing options, safety analysis, payment QR codes, and enterprise features.`
      ]
    },
    {
      heading: 'ลายน้ำ',
      paragraphs: [
        'Add watermarks to your QR codes:'
      ],
      bullets: [
        'Kind: Text, Image, or Pattern watermark.',
        'Position: Center, Corners, Edges, Behind, or Quiet Zone.',
        'Opacity: Watermark transparency (0-100%).',
        'Blend Mode: Normal, Multiply, Screen, or Overlay blending.'
      ]
    },
    {
      heading: 'เมทาดาทา',
      paragraphs: [
        'Embed metadata in exported files:'
      ],
      bullets: [
        'Title, Author, Copyright, License, Description fields.',
        'Creation Time: Embed generation timestamp.',
        'Custom Key-Value: Add arbitrary metadata pairs.'
      ]
    },
    {
      heading: 'การแชร์',
      paragraphs: [
        'Share your QR code configurations:'
      ],
      bullets: [
        'Direct Link: Generate a shareable URL with your current settings.',
        'Embed HTML: Get embed code for websites.',
        'Encode Parameters: Include all settings in the share URL.',
        'Note: Overlay images from local files cannot be shared via URL.'
      ]
    },
    {
      heading: 'การวิเคราะห์ความปลอดภัย',
      paragraphs: [
        'Ensure QR codes remain scannable:'
      ],
      bullets: [
        'Safety Mode: Off, Balanced, or Strict scanning requirements.',
        'Min Module Size: Minimum pixel size per module.',
        'Min Quiet Zone: Minimum margin modules.',
        'Lock Finders/Timing/Align/Format/Version: Protect specific elements.',
        'Max Overlay Intensity by ECC: Automatic intensity limits based on error correction level.'
      ]
    },
    {
      heading: 'ประเภทเนื้อหา (โปร)',
      paragraphs: [
        'Professional level adds payment and enterprise content types:'
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
        'Custom Format: Raw data with no formatting or validation.'
      ]
    },
    {
      heading: 'โหมดผสมซ้อนทับ (โปร)',
      paragraphs: [
        'Additional blend modes in Professional level:'
      ],
      bullets: [
        'Pixelate: Pixelated overlay effect.',
        'Outline: Edge detection overlay showing only contours.',
        'Wave: Wavy distortion effect.',
        'Subpixel Size: Variable subpixel sizing based on image.',
        'True Dither: Advanced dithering with ordered matrix selection.',
        'Extreme: Maximum image visibility, may affect scannability.'
      ]
    },
    {
      heading: 'การตั้งค่าการป้องกัน',
      paragraphs: [
        'Fine-grained control over which QR elements are protected from overlay modification:'
      ],
      bullets: [
        'Preserve Timing: Keep timing patterns unmodified.',
        'Preserve Alignment: Keep alignment patterns unmodified.',
        'Protect Format Info: Shield format information modules.',
        'Protect Version Info: Shield version information modules.'
      ]
    },
    {
      heading: 'โหมดรับรู้ ECC',
      paragraphs: [
        `Intelligently distributes overlay intensity based on error correction capacity. The system analyzes which modules can be modified while maintaining scannability.`
      ],
      bullets: [
        'Risk Budget: Percentage of error correction capacity to use (0-100%).',
        'Higher budget = more visible overlay but riskier scannability.',
        'Lower budget = safer scanning but less visible overlay.'
      ]
    },
    {
      heading: 'ตัวเลือกการเรนเดอร์ระดับโปร',
      paragraphs: [
        'Advanced rendering controls:'
      ],
      bullets: [
        'Crisp Edges: Use pixelated image rendering for sharp module edges.',
        'Pixel Snap: Floor, Round, or Ceil pixel alignment.',
        'Per-Module Color Mode: Solid, By Brightness, By Position, By Overlay, By Cluster.',
        'Color Palette: Define custom color palette for per-module coloring.',
        'Contrast Guard: Ensure minimum contrast ratio between colors.',
        'Min Contrast Ratio: WCAG-style contrast requirement (1:1 to 21:1).',
        'Extra Border Modules: Additional border beyond quiet zone.'
      ]
    },
    {
      heading: 'ตัวเลือกเอาต์พุตระดับโปร',
      paragraphs: [
        'Enterprise export settings:'
      ],
      bullets: [
        'DPI: Set print resolution (72-600 DPI). 300 DPI recommended for print.',
        'Include Quiet Zone: Toggle quiet zone in output dimensions.',
        'Export As Additional: Generate PDF alongside primary format.'
      ]
    },
    {
      heading: 'การตั้งค่าแอนิเมชัน (โปร)',
      paragraphs: [
        'Additional professional animation features:'
      ],
      bullets: [
        'Temporal Dither: Off, Blue Noise, or Flicker Safe per-frame dithering.',
        'Pattern: None, Pulse, Wave, Scanline, Shimmer, or Drift effects.'
      ]
    },
    {
      heading: 'แนวปฏิบัติที่ดีที่สุด',
      paragraphs: [
        'Follow these guidelines for reliable QR codes:'
      ],
      bullets: [
        'Always test your QR codes with multiple scanner apps before printing.',
        'Use Error Correction H (High) when adding overlays.',
        'Keep at least 4 modules of quiet zone (margin).',
        'Ensure high contrast between foreground and background.',
        'For print, use at least 300 DPI and test at actual print size.',
        'Enable Preserve Finder Patterns when using overlays.',
        'Start with lower overlay intensity and increase gradually.',
        'For outdoor use, consider larger module sizes and higher error correction.'
      ]
    },
    {
      heading: 'การแก้ปัญหา',
      paragraphs: [
        'Common issues and solutions:'
      ],
      bullets: [
        'QR won\'t scan: Reduce overlay intensity, increase error correction, check contrast.',
        'Code too large: Reduce content length, use URL shortener, lower version.',
        'Blurry output: Increase module size, use PNG instead of compressed formats.',
        'Colors look wrong: Check color contrast, try grayscale overlay mode.',
        'GIF not animating: Ensure using GIF format output, check frame count.',
        'Image overlay not loading: Check CORS permissions on remote images.'
      ]
    },
    {
      heading: 'ปุ่มลัดแป้นพิมพ์',
      paragraphs: [
        `ANQR supports standard keyboard shortcuts. Use Ctrl/Cmd+S to trigger export (when focused on the preview).`
      ]
    },
    {
      heading: 'การแชร์และฝัง',
      paragraphs: [
        `In Professional mode, click the Share button to copy a URL with your current settings. Recipients can open this URL to see your exact configuration. Note: Overlay images from local files cannot be shared via URL.`
      ]
    }
  ]
};

export default docs;
