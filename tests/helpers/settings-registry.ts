/**
 * Settings Registry for ANQR UI Testing
 * Maps all UI settings with their tier, section, type, and test values
 */

export type Tier = 'basic' | 'advanced' | 'professional';
export type InputType = 'slider' | 'select' | 'switch' | 'color' | 'text' | 'number' | 'textarea' | 'file';

export interface Setting {
  id: string;
  section: string;
  tier: Tier;
  type: InputType;
  /** CSS selector or descriptive identifier for the input */
  selector: string;
  /** Test values to try for this setting */
  testValues: (string | number | boolean)[];
  /** Human-readable name */
  name: string;
  /** Whether this setting directly affects QR rendering */
  affectsQR: boolean;
}

/**
 * All settings organized by section
 */
export const SETTINGS_REGISTRY: Setting[] = [
  // ============================================
  // PAYLOAD SECTION (Basic)
  // ============================================
  {
    id: 'payload.kind',
    section: 'payload',
    tier: 'basic',
    type: 'select',
    selector: '[data-testid="payload-type-select"]',
    testValues: ['plain_text', 'url'],
    name: 'Content Type',
    affectsQR: true,
  },
  {
    id: 'payload.text',
    section: 'payload',
    tier: 'basic',
    type: 'textarea',
    selector: 'textarea',
    testValues: ['Hello World', 'Test 123', 'ANQR Test Content'],
    name: 'Payload Text',
    affectsQR: true,
  },
  {
    id: 'payload.url.href',
    section: 'payload',
    tier: 'basic',
    type: 'text',
    selector: 'input[type="url"]',
    testValues: ['https://example.com', 'https://test.com/page', 'https://anqr.link'],
    name: 'URL',
    affectsQR: true,
  },

  // ============================================
  // OVERLAY SECTION (Basic)
  // ============================================
  {
    id: 'overlay.enabled',
    section: 'overlay',
    tier: 'basic',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Overlay Enabled',
    affectsQR: true,
  },
  {
    id: 'overlay.mode',
    section: 'overlay',
    tier: 'basic',
    type: 'select',
    selector: '[data-testid="overlay-mode-select"]',
    testValues: ['center', 'blend', 'halftone', 'dithered'],
    name: 'Overlay Mode',
    affectsQR: true,
  },
  {
    id: 'overlay.intensity',
    section: 'overlay',
    tier: 'basic',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [25, 50, 75, 100],
    name: 'Overlay Intensity',
    affectsQR: true,
  },
  {
    id: 'overlay.colorMode',
    section: 'overlay',
    tier: 'basic',
    type: 'select',
    selector: '[data-testid="color-mode-select"]',
    testValues: ['color', 'grayscale', 'bw'],
    name: 'Color Mode',
    affectsQR: true,
  },
  {
    id: 'overlay.preserveFinders',
    section: 'overlay',
    tier: 'basic',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Preserve Finders',
    affectsQR: true,
  },

  // ============================================
  // QR ENCODING SECTION (Advanced)
  // ============================================
  {
    id: 'qr.version',
    section: 'qr',
    tier: 'advanced',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [0, 5, 10, 20],
    name: 'QR Version',
    affectsQR: true,
  },
  {
    id: 'qr.ecc',
    section: 'qr',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="ecc-select"]',
    testValues: ['L', 'M', 'Q', 'H'],
    name: 'Error Correction',
    affectsQR: true,
  },
  {
    id: 'qr.quietZoneModules',
    section: 'qr',
    tier: 'advanced',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [0, 2, 4, 8],
    name: 'Quiet Zone',
    affectsQR: true,
  },
  {
    id: 'qr.encodingMode',
    section: 'qr',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="encoding-mode-select"]',
    testValues: ['auto', 'numeric', 'alphanumeric', 'byte'],
    name: 'Encoding Mode',
    affectsQR: true,
  },

  // ============================================
  // RENDER SECTION (Advanced)
  // ============================================
  {
    id: 'render.modulePx',
    section: 'render',
    tier: 'advanced',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [5, 10, 15, 20],
    name: 'Module Size',
    affectsQR: true,
  },
  {
    id: 'render.moduleGapPercent',
    section: 'render',
    tier: 'advanced',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [0, 10, 20, 30],
    name: 'Module Gap',
    affectsQR: true,
  },
  {
    id: 'render.moduleStyle',
    section: 'render',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="module-style-select"]',
    testValues: ['square', 'rounded', 'dots', 'diamond', 'connected'],
    name: 'Module Style',
    affectsQR: true,
  },
  {
    id: 'render.finderStyle',
    section: 'render',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="finder-style-select"]',
    testValues: ['square', 'rounded', 'circle'],
    name: 'Finder Style',
    affectsQR: true,
  },
  {
    id: 'render.fgColor',
    section: 'render',
    tier: 'advanced',
    type: 'color',
    selector: 'input[type="color"]',
    testValues: ['#000000', '#ff0000', '#0000ff', '#00ff00'],
    name: 'Foreground Color',
    affectsQR: true,
  },
  {
    id: 'render.bgColor',
    section: 'render',
    tier: 'advanced',
    type: 'color',
    selector: 'input[type="color"]',
    testValues: ['#ffffff', '#f0f0f0', '#ffffcc'],
    name: 'Background Color',
    affectsQR: true,
  },
  {
    id: 'render.bgTransparent',
    section: 'render',
    tier: 'advanced',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Transparent Background',
    affectsQR: true,
  },
  {
    id: 'render.cornerRadius',
    section: 'render',
    tier: 'advanced',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [0, 25, 50, 100],
    name: 'Corner Radius',
    affectsQR: true,
  },
  {
    id: 'render.gapMode',
    section: 'render',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="gap-mode-select"]',
    testValues: ['none', 'inset', 'stroke', 'negative_space'],
    name: 'Gap Mode',
    affectsQR: true,
  },
  {
    id: 'render.gradient.type',
    section: 'render',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="gradient-select"]',
    testValues: ['none', 'linear', 'radial', 'conic'],
    name: 'Gradient Type',
    affectsQR: true,
  },
  {
    id: 'render.frameStyle',
    section: 'render',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="frame-style-select"]',
    testValues: ['none', 'rounded_frame', 'sticker', 'tag'],
    name: 'Frame Style',
    affectsQR: true,
  },

  // ============================================
  // ANIMATION SECTION (Advanced)
  // ============================================
  {
    id: 'animation.speedMs',
    section: 'animation',
    tier: 'advanced',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [50, 100, 200, 500],
    name: 'Animation Speed',
    affectsQR: false, // Affects playback, not static QR
  },
  {
    id: 'animation.loop',
    section: 'animation',
    tier: 'advanced',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Loop Animation',
    affectsQR: false,
  },
  {
    id: 'animation.bounce',
    section: 'animation',
    tier: 'advanced',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Bounce Animation',
    affectsQR: false,
  },

  // ============================================
  // OUTPUT SECTION (Advanced)
  // ============================================
  {
    id: 'output.format',
    section: 'output',
    tier: 'advanced',
    type: 'select',
    selector: '[data-testid="format-select"]',
    testValues: ['png', 'webp', 'gif', 'svg'],
    name: 'Output Format',
    affectsQR: false, // Export format, not display
  },
  {
    id: 'output.widthPx',
    section: 'output',
    tier: 'advanced',
    type: 'number',
    selector: 'input[type="number"]',
    testValues: [200, 400, 800],
    name: 'Output Width',
    affectsQR: false,
  },
  {
    id: 'output.heightPx',
    section: 'output',
    tier: 'advanced',
    type: 'number',
    selector: 'input[type="number"]',
    testValues: [200, 400, 800],
    name: 'Output Height',
    affectsQR: false,
  },

  // ============================================
  // WATERMARK SECTION (Professional)
  // ============================================
  {
    id: 'watermark.enabled',
    section: 'watermark',
    tier: 'professional',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Watermark Enabled',
    affectsQR: true,
  },
  {
    id: 'watermark.kind',
    section: 'watermark',
    tier: 'professional',
    type: 'select',
    selector: '[data-testid="watermark-kind-select"]',
    testValues: ['text', 'image', 'pattern'],
    name: 'Watermark Type',
    affectsQR: true,
  },
  {
    id: 'watermark.text',
    section: 'watermark',
    tier: 'professional',
    type: 'text',
    selector: 'input[type="text"]',
    testValues: ['SAMPLE', 'DRAFT', 'TEST'],
    name: 'Watermark Text',
    affectsQR: true,
  },
  {
    id: 'watermark.position',
    section: 'watermark',
    tier: 'professional',
    type: 'select',
    selector: '[data-testid="watermark-position-select"]',
    testValues: ['center', 'corners', 'edges', 'behind', 'quiet_zone'],
    name: 'Watermark Position',
    affectsQR: true,
  },
  {
    id: 'watermark.opacity',
    section: 'watermark',
    tier: 'professional',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [25, 50, 75, 100],
    name: 'Watermark Opacity',
    affectsQR: true,
  },

  // ============================================
  // SAFETY SECTION (Professional)
  // ============================================
  {
    id: 'safety.mode',
    section: 'safety',
    tier: 'professional',
    type: 'select',
    selector: '[data-testid="safety-mode-select"]',
    testValues: ['off', 'balanced', 'strict'],
    name: 'Safety Mode',
    affectsQR: true,
  },
  {
    id: 'safety.minModulePx',
    section: 'safety',
    tier: 'professional',
    type: 'slider',
    selector: '[role="slider"]',
    testValues: [1, 3, 5, 10],
    name: 'Min Module Size',
    affectsQR: true,
  },
  {
    id: 'qa.contrastCheck',
    section: 'safety',
    tier: 'professional',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Contrast Check',
    affectsQR: false,
  },
  {
    id: 'qa.showHeatmap',
    section: 'safety',
    tier: 'professional',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Show Heatmap',
    affectsQR: true, // Heatmap overlays on QR
  },
  {
    id: 'auto.pickVersion',
    section: 'safety',
    tier: 'professional',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Auto Pick Version',
    affectsQR: true,
  },
  {
    id: 'auto.pickEcc',
    section: 'safety',
    tier: 'professional',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Auto Pick ECC',
    affectsQR: true,
  },

  // ============================================
  // METADATA SECTION (Professional)
  // ============================================
  {
    id: 'metadata.title',
    section: 'metadata',
    tier: 'professional',
    type: 'text',
    selector: 'input[type="text"]',
    testValues: ['My QR Code', 'Test Title'],
    name: 'Metadata Title',
    affectsQR: false, // Metadata doesn't change visual QR
  },
  {
    id: 'metadata.author',
    section: 'metadata',
    tier: 'professional',
    type: 'text',
    selector: 'input[type="text"]',
    testValues: ['John Doe', 'ANQR'],
    name: 'Metadata Author',
    affectsQR: false,
  },

  // ============================================
  // SHARE SECTION (Professional)
  // ============================================
  {
    id: 'share.encodeMoreParams',
    section: 'share',
    tier: 'professional',
    type: 'switch',
    selector: '[role="switch"]',
    testValues: [true, false],
    name: 'Encode More Params',
    affectsQR: false,
  },
];

/**
 * Get settings for a specific tier (includes lower tiers)
 */
export function getSettingsForTier(tier: Tier): Setting[] {
  const tierHierarchy: Record<Tier, Tier[]> = {
    basic: ['basic'],
    advanced: ['basic', 'advanced'],
    professional: ['basic', 'advanced', 'professional'],
  };
  
  const allowedTiers = tierHierarchy[tier];
  return SETTINGS_REGISTRY.filter(s => allowedTiers.includes(s.tier));
}

/**
 * Get settings for a specific section
 */
export function getSettingsForSection(section: string): Setting[] {
  return SETTINGS_REGISTRY.filter(s => s.section === section);
}

/**
 * Get settings that affect QR rendering
 */
export function getQRAffectingSettings(): Setting[] {
  return SETTINGS_REGISTRY.filter(s => s.affectsQR);
}

/**
 * Get all unique sections
 */
export function getSections(): string[] {
  return [...new Set(SETTINGS_REGISTRY.map(s => s.section))];
}

/**
 * Generate all permutations of settings for exhaustive testing
 * WARNING: This can generate millions of combinations!
 */
export function* generatePermutations(
  settings: Setting[],
  maxDepth = 3
): Generator<Array<{ setting: Setting; value: string | number | boolean }>> {
  if (settings.length === 0 || maxDepth === 0) {
    yield [];
    return;
  }
  
  const [first, ...rest] = settings;
  
  for (const value of first.testValues) {
    for (const restPerm of generatePermutations(rest, maxDepth - 1)) {
      yield [{ setting: first, value }, ...restPerm];
    }
  }
}

/**
 * Calculate total permutation count
 */
export function countPermutations(settings: Setting[]): number {
  return settings.reduce((acc, s) => acc * s.testValues.length, 1);
}
