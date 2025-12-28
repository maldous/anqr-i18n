import type { PageDefinition } from '../types'
import { LAST_UPDATED } from '../types'

export const docs: PageDefinition = {
  title: 'ANQR 用户指南',
  description: '使用 ANQR 创建二维码的完整指南。',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: '入门',
      paragraphs: [
        'ANQR 是一个完全在您的设备上运行的二维码生成器 — 您的电脑、手机或平板电脑。无需账户、无服务器参与、數據保持私密。',
        '界面有三个级别：基础、高级、专业。通过头部选项卡选择级别。每级别解锁附加功能，同时保持界面专注。'
      ],
      bullets: [
        '基础：简单二维码创建，支持纯文本/URL 内容和图像叠加。',
        '高级：二维码编码选项、渲染样式、动画、输出格式、扩展内容类型和叠加自定义。',
        '专业：水印、元數據、分享、安全分析、支付二维码和企业功能。'
      ]
    },
    {
      heading: '快速开始',
      paragraphs: [
        '创建您的第一个二维码：'
      ],
      bullets: [
        '1. 从内容类型下拉菜单选择类型（URL、文本、WiFi 等）。',
        '2. 在提供的字段输入數據。',
        '3. 可选自定义颜色、样式并添加叠加图像。',
        '4. 点击导出以下载 PNG、GIF、WebP 或 SVG 格式二维码。'
      ]
    },
    {
      heading: '基础功能',
      paragraphs: [
        '基础级别提供简化的界面，用于创建带有有效载荷内容和图像叠加的二维码。这是入门最简单方式。'
      ]
    },
    {
      heading: '内容类型 (基础)',
      paragraphs: [
        '纯文本：编码任何文本至二维码容量限制。适合短消息、代码或标识符。',
        'URL：编码网页地址。扫描时打开 URL。支持 http:// 和 https:// 协议。'
      ]
    },
    {
      heading: '图像叠加 (基础)',
      paragraphs: [
        '上传图像 (JPG、PNG、GIF、WebP) 与二维码混合。基础叠加功能包括：'
      ],
      bullets: [
        '从文件上传：从设备选择图像。',
        '从 URL 加载：输入图像 URL (必须允许 CORS)。',
        '中心徽标：放置图像在中心，依赖纠错。',
        '混合：图像与二维码图案的简单 Alpha 混合。',
        '强度：控制叠加对二维码的影响强度 (0-100%)。',
        '颜色模式：全彩、灰度或黑白。',
        '保留查找器图案：保持角图案不变以可靠扫描。'
      ]
    },
    {
      heading: '高级功能',
      paragraphs: [
        '高级级别解锁二维码编码选项、渲染样式、动画、输出格式、扩展内容类型和高级叠加自定义。'
      ]
    },
    {
      heading: '二维码编码设置',
      paragraphs: [
        '版本：二维码有 1-40 版本，较高版本容纳更多數據但更大。设为 0 (自动) 让 ANQR 选择最小适合版本。',
        '纠错：决定二维码承受损坏后仍可扫描的程度。'
      ],
      bullets: [
        'L (低)：7% 纠错 - 最小尺寸、最少冗余。',
        'M (中)：15% 纠错 - 平衡选项。',
        'Q (四分位)：25% 纠错 - 适合打印二维码。',
        'H (高)：30% 纠错 - 适合叠加或恶劣条件的最佳选择。'
      ]
    },
    {
      heading: '静默区 (边距)',
      paragraphs: [
        '静默区是二维码周围的白空间。扫描仪需要此边距检测代码开始。标准推荐至少 4 个模块。低于 4 可能导致扫描问题。'
      ]
    },
    {
      heading: '模块样式',
      paragraphs: [
        '模块是构成二维码的单个方块。ANQR 提供五种样式：'
      ],
      bullets: [
        '方形：经典二维码外观，尖角。',
        '圆角：柔化角，更友好外观。',
        '点：圆形模块，现代美学。',
        '菱形：45° 旋转方形，独特图案。',
        '连接：相邻模块合并，形成有机形状。'
      ]
    },
    {
      heading: '查找器图案样式',
      paragraphs: [
        '查找器图案是帮助扫描仪定向的三个大角方块。可用样式：'
      ],
      bullets: [
        '方形：标准方形角。',
        '圆角：匹配圆角模块样式的柔化角。',
        '圆形：点样式代码的圆形查找器图案。'
      ]
    },
    {
      heading: '对齐与定时图案',
      paragraphs: [
        '较大二维码 (版本 2+) 中的对齐图案帮助纠正扭曲。定时图案是连接查找器图案的交替线。'
      ],
      bullets: [
        '对齐样式：匹配查找器、方形、圆角或圆形。',
        '定时样式：匹配模块、实线或虚线。'
      ]
    },
    {
      heading: '颜色',
      paragraphs: [
        '前景：二维码模块颜色。黑色 (#000000) 是标准，但任何深色有效。',
        '背景：背景颜色。白色 (#ffffff) 是标准。确保与前景足够对比。',
        '透明背景：完全移除背景，用于彩色表面。确保表面提供足够对比。'
      ]
    },
    {
      heading: '模块尺寸与间隙',
      paragraphs: [
        '模块尺寸：每个模块渲染像素大小。较大值创建更大、更易扫描代码。',
        '模块间隙：模块间百分比空间。小间隙 (5-15%) 在某些条件下改善可扫描性，但过度间隙降低可靠性。'
      ]
    },
    {
      heading: '输出设置',
      paragraphs: [
        '根据用例选择导出格式。'
      ],
      bullets: [
        'PNG：无损栅格格式，大多数用途理想。适合打印和数字。',
        'WebP：现代格式，文件更小。适合网页使用。',
        'GIF：动画二维码必需。支持透明。',
        'SVG：无限缩放矢量格式。适合大打印或编辑代码。'
      ]
    },
    {
      heading: '输出尺寸',
      paragraphs: [
        '宽度/高度：像素输出尺寸。对于打印，根据 DPI 计算 (例如，300 DPI 1 英寸 = 300px)。较大尺寸远距离扫描更可靠。'
      ]
    },
    {
      heading: '动画设置 (高级)',
      paragraphs: [
        '控制动画二维码行为：'
      ],
      bullets: [
        '速度：动画帧毫秒率。',
        '循环：连续或单次播放动画。',
        '反弹：乒乓动画方向。',
        '起始帧：从特定帧开始动画。',
        '最大帧：限制动画总帧数。',
        '帧步：跳帧加速动画。',
        '插值：无、交叉淡入或变形帧间。'
      ]
    },
    {
      heading: '内容类型 (高级)',
      paragraphs: [
        '高级级别解锁附加有效载荷格式：'
      ],
      bullets: [
        '电话号码 (tel:)：创建可拨打电话链接。',
        '电子邮件 (mailto:)：打开邮件客户端，可选主题和正文。',
        'SMS：预填短信至电话号码。',
        'vCard：完整联系人卡，包括姓名、组织、电话、电子邮件、地址。',
        'MeCard：日本流行紧凑联系格式。',
        'BizCard：遗留名片格式。',
        '地理位置：地图中打开 GPS 坐标。',
        'WiFi：自动连接网络凭证 (SSID、密码、安全类型)。',
        '日历事件：iCalendar 格式，标题、位置、日期/时间。',
        '事件 RSVP：事件注册页面链接。',
        '日历订阅：订阅 ICS/WebCal 源。',
        '文件/文档 URL：可下载文件直接链接。',
        '云存储链接：Google Drive、Dropbox、OneDrive 等链接。',
        '社交资料：LinkedIn、Twitter、Instagram 等链接。',
        '消息链接：WhatsApp、Telegram、Signal 深度链接。'
      ]
    },
    {
      heading: '高级叠加功能',
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
      heading: '叠加混合模式（高级）',
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
      heading: '叠加强度',
      paragraphs: [
        `Controls how strongly the overlay affects the QR code (0-100%). Higher values show more image detail but may reduce scannability. Start around 70% and adjust based on testing.`
      ]
    },
    {
      heading: '颜色模式',
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
      heading: '保留定位符',
      paragraphs: [
        `When enabled, keeps the three corner finder patterns unmodified by the overlay. Strongly recommended for reliable scanning.`
      ]
    },
    {
      heading: '图像预处理',
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
      heading: '适配模式',
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
      heading: '变换选项',
      paragraphs: [
        'Rotation: Rotate overlay in 90° increments.',
        'Flip X/Y: Mirror the image horizontally or vertically.'
      ]
    },
    {
      heading: '抖动算法',
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
      heading: '扩散核',
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
      heading: '抖动强度',
      paragraphs: [
        `Controls how much dithering is applied (0-100%). Lower values preserve more of the original pattern, higher values show more image detail.`
      ]
    },
    {
      heading: '子像素设置',
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
      heading: '半色调设置',
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
      heading: '双色调颜色',
      paragraphs: [
        `When using Duotone blend mode, set the Shadow color (dark areas) and Highlight color (bright areas).`
      ]
    },
    {
      heading: 'GIF 动画设置',
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
      heading: '高级渲染选项',
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
      heading: '高级 QR 编码',
      paragraphs: [
        'Fine-tune QR encoding:'
      ],
      bullets: [
        'Encoding Mode: Auto, Numeric, Alphanumeric, Byte/UTF-8, or Kanji.',
        'Enforce Min Quiet Zone: Ensure at least 4 module margin.'
      ]
    },
    {
      heading: '高级导出选项',
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
      heading: '验证选项',
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
      heading: '专业功能',
      paragraphs: [
        `The Professional level adds watermarks, metadata, sharing options, safety analysis, payment QR codes, and enterprise features.`
      ]
    },
    {
      heading: '水印',
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
      heading: '元数据',
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
      heading: '分享',
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
      heading: '安全分析',
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
      heading: '内容类型（专业）',
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
      heading: '叠加混合模式（专业）',
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
      heading: '保护设置',
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
      heading: 'ECC 感知模式',
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
      heading: '专业渲染选项',
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
      heading: '专业导出选项',
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
      heading: '动画设置（专业）',
      paragraphs: [
        'Additional professional animation features:'
      ],
      bullets: [
        'Temporal Dither: Off, Blue Noise, or Flicker Safe per-frame dithering.',
        'Pattern: None, Pulse, Wave, Scanline, Shimmer, or Drift effects.'
      ]
    },
    {
      heading: '最佳实践',
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
      heading: '故障排除',
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
      heading: '键盘快捷键',
      paragraphs: [
        `ANQR supports standard keyboard shortcuts. Use Ctrl/Cmd+S to trigger export (when focused on the preview).`
      ]
    },
    {
      heading: '分享与嵌入',
      paragraphs: [
        `In Professional mode, click the Share button to copy a URL with your current settings. Recipients can open this URL to see your exact configuration. Note: Overlay images from local files cannot be shared via URL.`
      ]
    }
  ]
};

export default docs;
