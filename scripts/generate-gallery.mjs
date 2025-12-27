#!/usr/bin/env node
/**
 * Gallery Image Generator
 * 
 * Generates preview images for all gallery items using Puppeteer.
 * Static items are saved as PNG, animated items as GIF.
 * 
 * Run with: node scripts/generate-gallery.mjs
 * 
 * Prerequisites:
 * - npm install puppeteer gifenc sharp
 * - Dev server running on port 5174
 */

import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const GALLERY_DIR = path.join(PROJECT_ROOT, 'public', 'gallery')

// Configuration
const DEV_SERVER_URL = 'http://localhost:5174'
const IMAGE_SIZE = 200 // Half size for faster loading
const VIEWPORT = { width: 800, height: 600 }
const STATIC_CAPTURE_DELAY = 500 // Time to wait for static QR to render after canvas ready
const ANIMATED_MAX_TIMEOUT = 600000 // 10 minutes max for animated GIFs
const ANIMATED_POLL_INTERVAL = 500 // Poll every 500ms for animation readiness
const PARALLEL_STATIC = 8 // Higher parallelism for fast static captures
const PARALLEL_ANIMATED = 2 // Lower parallelism for slow animated captures

// ============================================
// GALLERY ITEM GENERATION (matches gallery-items.ts)
// ============================================

const BASE_DATA = 'https://anqr.link'
// Use local dev server URLs for images during capture (avoids CORS issues)
const TSUNAMI_IMG = `${DEV_SERVER_URL}/tsunami.jpg`
const WILLIE_GIF = `${DEV_SERVER_URL}/willie.gif`

function generateGalleryItems() {
  const items = []
  
  // ========== PLAIN QR CODES (6 items) ==========
  items.push(
    { id: 'plain-basic', params: { data: BASE_DATA, ec: 'H', v: 0, style: 'square', finder: 'square', fg: '000000', bg: 'ffffff' } },
    { id: 'plain-v6', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'square', finder: 'square', fg: '000000', bg: 'ffffff' } },
    { id: 'plain-v9', params: { data: BASE_DATA, ec: 'H', v: 9, style: 'square', finder: 'square', fg: '000000', bg: 'ffffff' } },
    { id: 'plain-v12', params: { data: BASE_DATA, ec: 'H', v: 12, style: 'square', finder: 'square', fg: '000000', bg: 'ffffff' } },
    { id: 'plain-ecc-l', params: { data: BASE_DATA, ec: 'L', v: 0, style: 'square', finder: 'square', fg: '000000', bg: 'ffffff' } },
    { id: 'plain-ecc-q', params: { data: BASE_DATA, ec: 'Q', v: 0, style: 'square', finder: 'square', fg: '000000', bg: 'ffffff' } },
  )
  
  // ========== CONTENT TYPES (6 items) ==========
  items.push(
    { id: 'content-vcard', params: { data: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:ANQR\nEND:VCARD', ec: 'H', v: 0, style: 'rounded', finder: 'rounded', fg: '1a365d', bg: 'ebf8ff' } },
    { id: 'content-wifi', params: { data: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', ec: 'H', v: 0, style: 'dots', finder: 'circle', fg: '1b4332', bg: 'd8f3dc' } },
    { id: 'content-email', params: { data: 'mailto:email@anqr.link?subject=Hello', ec: 'H', v: 0, style: 'square', finder: 'square', fg: 'e85d04', bg: 'ffe8d6' } },
    { id: 'content-sms', params: { data: 'sms:+1234567890?body=Hello%20from%20ANQR', ec: 'H', v: 0, style: 'diamond', finder: 'rounded', fg: '006d77', bg: 'e0f4f5' } },
    { id: 'content-geo', params: { data: 'geo:37.7749,-122.4194?q=San+Francisco', ec: 'H', v: 0, style: 'connected', finder: 'square', fg: '7f5539', bg: 'ffe8cc' } },
    { id: 'content-event', params: { data: 'BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20240101T100000\nEND:VEVENT', ec: 'H', v: 0, style: 'rounded', finder: 'circle', fg: '4a0080', bg: 'f5e6ff' } },
  )
  
  // ========== MODULE & FINDER STYLES ==========
  const moduleStyles = ['square', 'rounded', 'dots', 'diamond', 'connected']
  const finderStyles = ['square', 'rounded', 'circle']
  
  for (const style of moduleStyles) {
    items.push({ id: `style-${style}`, params: { data: BASE_DATA, ec: 'H', v: 0, style, finder: 'square', fg: '000000', bg: 'ffffff' } })
  }
  
  for (const finder of finderStyles) {
    items.push({ id: `finder-${finder}`, params: { data: BASE_DATA, ec: 'H', v: 0, style: 'square', finder, fg: '000000', bg: 'ffffff' } })
  }
  
  // Style + finder combinations
  const styleCombos = [
    { style: 'rounded', finder: 'rounded' },
    { style: 'dots', finder: 'circle' },
    { style: 'diamond', finder: 'rounded' },
    { style: 'connected', finder: 'square' },
  ]
  for (const combo of styleCombos) {
    items.push({ id: `combo-${combo.style}-${combo.finder}`, params: { data: BASE_DATA, ec: 'H', v: 0, style: combo.style, finder: combo.finder, fg: '000000', bg: 'ffffff' } })
  }
  
  // ========== COLORS ==========
  const colorSchemes = [
    { name: 'midnight', fg: '1a1a2e', bg: 'eef1ff' },
    { name: 'forest', fg: '1b4332', bg: 'd8f3dc' },
    { name: 'ocean', fg: '023e8a', bg: 'caf0f8' },
    { name: 'sunset', fg: 'bf0603', bg: 'fff3b0' },
    { name: 'royal', fg: '4a0080', bg: 'f5e6ff' },
    { name: 'coral', fg: 'e85d04', bg: 'ffe8d6' },
    { name: 'slate', fg: '343a40', bg: 'e9ecef' },
    { name: 'crimson', fg: '9d0208', bg: 'ffccd5' },
    { name: 'teal', fg: '006d77', bg: 'e0f4f5' },
    { name: 'gold', fg: '7f5539', bg: 'ffe8cc' },
    { name: 'inverted', fg: 'ffffff', bg: '000000' },
    { name: 'navy', fg: '001d3d', bg: 'a2d2ff' },
  ]
  
  for (const color of colorSchemes) {
    items.push({ id: `color-${color.name}`, params: { data: BASE_DATA, ec: 'H', v: 0, style: 'square', finder: 'square', fg: color.fg, bg: color.bg } })
  }
  
  // Colors with dots (6 items to make 18 total)
  for (const color of colorSchemes.slice(0, 6)) {
    items.push({ id: `color-${color.name}-dots`, params: { data: BASE_DATA, ec: 'H', v: 0, style: 'dots', finder: 'circle', fg: color.fg, bg: color.bg } })
  }
  
  // ========== IMAGE OVERLAYS ==========
  const overlayModes = ['dithered', 'blue-noise', 'halftone', 'mosaic', 'brightness', 'duotone', 'subpixel', 'pixelate', 'outline', 'wave', 'extreme']
  
  for (const mode of overlayModes) {
    items.push({ id: `img-${mode}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode, img: TSUNAMI_IMG, intensity: 100 } })
  }
  
  // Different intensities
  for (const intensity of [50, 75, 100]) {
    items.push({ id: `img-dithered-i${intensity}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity } })
  }
  
  // Color modes
  for (const colorMode of ['color', 'grayscale', 'bw']) {
    items.push({ id: `img-colormode-${colorMode}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, colorMode } })
  }
  
  // Add blend mode to make 18 total
  items.push({ id: 'img-blend', params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'blend', img: TSUNAMI_IMG, intensity: 100 } })
  
  // ========== ANIMATED OVERLAYS ==========
  for (const mode of overlayModes.slice(0, 6)) {
    items.push({ id: `anim-${mode}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode, img: WILLIE_GIF, intensity: 100 }, isAnimated: true })
  }
  
  for (const intensity of [50, 75, 100]) {
    items.push({ id: `anim-blue-noise-i${intensity}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'blue-noise', img: WILLIE_GIF, intensity }, isAnimated: true })
  }
  
  for (const colorMode of ['color', 'grayscale', 'bw']) {
    items.push({ id: `anim-colormode-${colorMode}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: WILLIE_GIF, intensity: 100, colorMode }, isAnimated: true })
  }
  
  // ========== PREPROCESSING ==========
  // Brightness
  for (const b of [-50, -25, 25, 50]) {
    items.push({ id: `prep-brightness-${b > 0 ? 'p' : 'n'}${Math.abs(b)}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, brightness: b } })
  }
  
  // Contrast
  for (const c of [-50, 50, 100]) {
    items.push({ id: `prep-contrast-${c > 0 ? 'p' : 'n'}${Math.abs(c)}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, contrast: c } })
  }
  
  // Gamma
  for (const g of [0.5, 1.5, 2.0]) {
    items.push({ id: `prep-gamma-${String(g).replace('.', '')}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, gamma: g } })
  }
  
  // Saturation
  for (const s of [-100, -50, 50, 100]) {
    items.push({ id: `prep-saturation-${s > 0 ? 'p' : 'n'}${Math.abs(s)}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, saturation: s } })
  }
  
  // Blur
  for (const blur of [1, 2, 4]) {
    items.push({ id: `prep-blur-${blur}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, blur } })
  }
  
  // Sharpen
  for (const sharpen of [25, 50, 100]) {
    items.push({ id: `prep-sharpen-${sharpen}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, sharpen } })
  }
  
  // Posterize
  for (const levels of [2, 4, 8]) {
    items.push({ id: `prep-posterize-${levels}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, posterize: levels } })
  }
  
  // Threshold
  for (const thresh of [64, 128, 192]) {
    items.push({ id: `prep-threshold-${thresh}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, threshold: thresh } })
  }
  
  // Edge detection
  for (const edge of ['sobel', 'canny']) {
    items.push({ id: `prep-edge-${edge}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, edge } })
  }
  
  // Invert
  items.push({ id: 'prep-invert', params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, invert: true } })
  
  // Hue rotate (to make 30 total)
  items.push({ id: 'prep-hue-90', params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, hue: 90 } })
  
  // ========== QR ENCODING ==========
  // Versions
  for (const v of [0, 6, 9, 12]) {
    items.push({ id: `enc-v${v}`, params: { data: BASE_DATA, ec: 'H', v, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100 } })
  }
  
  // ECC levels
  for (const ec of ['L', 'M', 'Q', 'H']) {
    items.push({ id: `enc-ecc-${ec.toLowerCase()}`, params: { data: BASE_DATA, ec, v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100 } })
  }
  
  // Version + ECC combinations
  const versionEccCombos = [
    { v: 6, ec: 'L' }, { v: 6, ec: 'H' },
    { v: 9, ec: 'L' }, { v: 9, ec: 'H' },
  ]
  for (const combo of versionEccCombos) {
    items.push({ id: `enc-v${combo.v}-${combo.ec.toLowerCase()}`, params: { data: BASE_DATA, ec: combo.ec, v: combo.v, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100 } })
  }
  
  // ========== DITHERING ALGORITHMS ==========
  const ditherKinds = [
    'error_diffusion', 'ordered_bayer', 'blue_noise', 'white_noise',
    'blue_noise_error_diffusion', 'perceptual', 'adaptive_threshold'
  ]
  
  for (const kind of ditherKinds) {
    items.push({ id: `dither-${kind.replace(/_/g, '-')}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, ditherKind: kind } })
  }
  
  // Diffusion kernels
  const diffusionKernels = ['floyd_steinberg', 'jarvis_judice_ninke', 'stucki', 'atkinson', 'sierra', 'burkes']
  for (const kernel of diffusionKernels) {
    items.push({ id: `dither-kernel-${kernel.replace(/_/g, '-')}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, ditherKind: 'error_diffusion', diffusionKernel: kernel } })
  }
  
  // Dither strengths (5 items to make 18 total)
  for (const strength of [20, 40, 60, 80, 100]) {
    items.push({ id: `dither-strength-${strength}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, ditherStrength: strength } })
  }
  
  // ========== POWER COMBOS (12 items) ==========
  items.push(
    { id: 'combo-dots-halftone-gold', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'dots', finder: 'circle', mode: 'halftone', img: TSUNAMI_IMG, intensity: 100, fg: '7f5539', bg: 'ffe8cc' } },
    { id: 'combo-diamond-blue-noise-navy', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'diamond', finder: 'rounded', mode: 'blue-noise', img: TSUNAMI_IMG, intensity: 100, fg: '001d3d', bg: 'a2d2ff' } },
    { id: 'combo-rounded-mosaic-sunset', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'rounded', finder: 'rounded', mode: 'mosaic', img: TSUNAMI_IMG, intensity: 100, fg: 'bf0603', bg: 'fff3b0' } },
    { id: 'combo-connected-wave-ocean', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'connected', finder: 'square', mode: 'wave', img: TSUNAMI_IMG, intensity: 100, fg: '023e8a', bg: 'caf0f8' } },
    { id: 'combo-dots-extreme-forest', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'dots', finder: 'circle', mode: 'extreme', img: TSUNAMI_IMG, intensity: 100, fg: '1b4332', bg: 'd8f3dc' } },
    { id: 'combo-rounded-dithered-royal', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'rounded', finder: 'rounded', mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, fg: '4a0080', bg: 'f5e6ff' } },
    { id: 'combo-diamond-duotone-crimson', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'diamond', finder: 'rounded', mode: 'duotone', img: TSUNAMI_IMG, intensity: 100, fg: '9d0208', bg: 'ffccd5' } },
    { id: 'combo-connected-pixelate-teal', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'connected', finder: 'square', mode: 'pixelate', img: TSUNAMI_IMG, intensity: 100, fg: '006d77', bg: 'e0f4f5' } },
    { id: 'combo-dots-outline-slate', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'dots', finder: 'circle', mode: 'outline', img: TSUNAMI_IMG, intensity: 100, fg: '343a40', bg: 'e9ecef' } },
    { id: 'combo-rounded-subpixel-coral', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'rounded', finder: 'rounded', mode: 'subpixel', img: TSUNAMI_IMG, intensity: 100, fg: 'e85d04', bg: 'ffe8d6' } },
    { id: 'combo-anim-dots-halftone', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'dots', finder: 'circle', mode: 'halftone', img: WILLIE_GIF, intensity: 100, fg: '1a1a2e', bg: 'eef1ff' }, isAnimated: true },
    { id: 'combo-anim-rounded-blue-noise', params: { data: BASE_DATA, ec: 'H', v: 6, style: 'rounded', finder: 'rounded', mode: 'blue-noise', img: WILLIE_GIF, intensity: 100, fg: '702459', bg: 'fff5f7' }, isAnimated: true },
  )
  
  // ========== BLEND MODES ==========
  const blendColors = [
    { name: 'classic', fg: '000000', bg: 'ffffff' },
    { name: 'navy', fg: '1a365d', bg: 'ebf8ff' },
    { name: 'wine', fg: '702459', bg: 'fff5f7' },
    { name: 'forest', fg: '1c4532', bg: 'f0fff4' },
  ]
  
  for (const color of blendColors) {
    items.push({ id: `blend-${color.name}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'dithered', img: TSUNAMI_IMG, intensity: 100, fg: color.fg, bg: color.bg } })
    items.push({ id: `halftone-${color.name}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'halftone', img: TSUNAMI_IMG, intensity: 100, fg: color.fg, bg: color.bg } })
    items.push({ id: `mosaic-${color.name}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: 'mosaic', img: TSUNAMI_IMG, intensity: 100, fg: color.fg, bg: color.bg } })
  }
  
  // ========== COLOR MODES (6 items) ==========
  const modeColorCombos = [
    { overlayMode: 'dithered', colorMode: 'color' },
    { overlayMode: 'dithered', colorMode: 'grayscale' },
    { overlayMode: 'blue-noise', colorMode: 'color' },
    { overlayMode: 'blue-noise', colorMode: 'bw' },
    { overlayMode: 'halftone', colorMode: 'color' },
    { overlayMode: 'halftone', colorMode: 'bw' },
  ]
  
  for (const combo of modeColorCombos) {
    items.push({ id: `cmode-${combo.overlayMode}-${combo.colorMode}`, params: { data: BASE_DATA, ec: 'H', v: 6, mode: combo.overlayMode, img: TSUNAMI_IMG, intensity: 100, colorMode: combo.colorMode } })
  }
  
  return items
}

// Build URL from params
function buildUrl(params) {
  const url = new URL(DEV_SERVER_URL)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

// Wait for canvas to have non-empty content
async function waitForCanvasReady(page, timeout = 30000) {
  const startTime = Date.now()
  while (Date.now() - startTime < timeout) {
    const hasContent = await page.evaluate(() => {
      const canvas = document.querySelector('canvas')
      if (!canvas) return false
      const ctx = canvas.getContext('2d')
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      // Check if canvas has non-transparent content
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 0) return true
      }
      return false
    })
    if (hasContent) return true
    await new Promise(r => setTimeout(r, 100))
  }
  return false
}

// Wait for animation to be ready (detect frame changes) with 10 minute max timeout
async function waitForAnimationReady(page, itemId) {
  const startTime = Date.now()
  let lastPixelSum = 0
  let frameChangeCount = 0
  let lastLogTime = 0
  const requiredChanges = 3 // Need to see at least 3 frame changes
  
  console.log(`    [${itemId}] Waiting for animation (max ${ANIMATED_MAX_TIMEOUT / 60000} minutes)...`)
  
  while (Date.now() - startTime < ANIMATED_MAX_TIMEOUT) {
    const pixelSum = await page.evaluate(() => {
      const canvas = document.querySelector('canvas')
      if (!canvas) return 0
      const ctx = canvas.getContext('2d')
      const data = ctx.getImageData(0, 0, 50, 50).data
      return data.reduce((sum, v) => sum + v, 0)
    })
    
    if (lastPixelSum !== 0 && Math.abs(pixelSum - lastPixelSum) > 1000) {
      frameChangeCount++
      if (frameChangeCount >= requiredChanges) {
        const elapsed = Math.round((Date.now() - startTime) / 1000)
        console.log(`    [${itemId}] Animation detected after ${elapsed}s`)
        return true
      }
    }
    lastPixelSum = pixelSum
    await new Promise(r => setTimeout(r, ANIMATED_POLL_INTERVAL))
    
    // Log progress every 30 seconds (using separate tracker to avoid timing issues)
    const elapsed = Date.now() - startTime
    if (elapsed - lastLogTime >= 30000) {
      console.log(`    [${itemId}] Still waiting... (${Math.round(elapsed / 1000)}s elapsed)`)
      lastLogTime = elapsed
    }
  }
  
  console.log(`    [${itemId}] Warning: Animation timeout reached, capturing anyway...`)
  return false
}

// Capture a single QR code (PNG for static, GIF for animated)
async function captureQR(page, item) {
  const url = buildUrl(item.params)
  
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 300000 })
  await page.waitForSelector('canvas', { timeout: 150000 })
  
  // Wait for canvas to have content
  await waitForCanvasReady(page)
  
  if (item.isAnimated) {
    // Wait for animation to be ready with proper timeout
    await waitForAnimationReady(page, item.id)
    
    // Small stabilization delay after animation detected
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const frames = []
    const frameCount = 20 // Capture 20 frames
    const frameDelay = 100 // 100ms between frame captures (10 fps capture rate)
    const gifFrameDelay = 10 // 100ms (10 centiseconds) per frame in output GIF = 10 fps
    
    for (let i = 0; i < frameCount; i++) {
      // Capture RGBA pixel data directly from the canvas
      const frameData = await page.evaluate((size) => {
        const canvas = document.querySelector('canvas')
        if (!canvas) return null
        
        // Create scaled canvas for output
        const outputCanvas = document.createElement('canvas')
        outputCanvas.width = size
        outputCanvas.height = size
        const ctx = outputCanvas.getContext('2d')
        ctx.imageSmoothingEnabled = false // Keep pixels crisp
        ctx.drawImage(canvas, 0, 0, size, size)
        
        // Get RGBA pixel data directly
        const imageData = ctx.getImageData(0, 0, size, size)
        // Convert Uint8ClampedArray to regular array for JSON serialization
        return Array.from(imageData.data)
      }, IMAGE_SIZE)
      
      if (frameData && frameData.length > 0) {
        frames.push(new Uint8Array(frameData))
      }
      
      // Wait for animation to advance to next frame
      await new Promise(r => setTimeout(r, frameDelay))
    }
    
    if (frames.length === 0) {
      throw new Error('Could not capture any frames')
    }
    
    // Encode frames as GIF using gifenc (same pattern as exporter.ts)
    const gifenc = (await import('gifenc')).default
    const { GIFEncoder, quantize, applyPalette } = gifenc
    
    const gif = GIFEncoder()
    let isFirstFrame = true
    
    for (const rgbaData of frames) {
      // Use RGBA data directly with gifenc (like exporter.ts does)
      const palette = quantize(rgbaData, 256)
      const index = applyPalette(rgbaData, palette)
      
      // Write frame with delay in centiseconds (1/100th of a second)
      // Use gifFrameDelay for consistent playback speed
      gif.writeFrame(index, IMAGE_SIZE, IMAGE_SIZE, {
        palette,
        delay: gifFrameDelay,
        ...(isFirstFrame && { repeat: 0 }), // Loop forever
      })
      isFirstFrame = false
    }
    
    gif.finish()
    return { buffer: Buffer.from(gif.bytes()), isGif: true }
  }
  
  // For static items, add small delay for rendering to complete
  await new Promise(resolve => setTimeout(resolve, STATIC_CAPTURE_DELAY))
  
  // Capture as PNG
  const canvasData = await page.evaluate((size) => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return null
    
    // Create scaled canvas for output
    const outputCanvas = document.createElement('canvas')
    outputCanvas.width = size
    outputCanvas.height = size
    const ctx = outputCanvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(canvas, 0, 0, size, size)
    
    return outputCanvas.toDataURL('image/png')
  }, IMAGE_SIZE)
  
  if (!canvasData) {
    throw new Error('Could not find canvas element')
  }
  
  const base64Data = canvasData.replace(/^data:image\/png;base64,/, '')
  return { buffer: Buffer.from(base64Data, 'base64'), isGif: false }
}

// Process a single item with its own page
async function processItem(browser, item) {
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT)
  
  try {
    const result = await captureQR(page, item)
    const ext = result.isGif ? 'gif' : 'png'
    const filepath = path.join(GALLERY_DIR, `${item.id}.${ext}`)
    await fs.writeFile(filepath, result.buffer)
    console.log(`  [OK] ${item.id}${result.isGif ? ' (GIF)' : ''}`)
    return { id: item.id, success: true, isGif: result.isGif }
  } catch (error) {
    console.error(`  [FAIL] ${item.id}: ${error.message}`)
    return { id: item.id, success: false, error: error.message }
  } finally {
    await page.close()
  }
}

// Process items in parallel batches with specified parallelism
async function processItemsBatch(browser, items, startIdx, parallelism) {
  const batchSize = Math.min(parallelism, items.length - startIdx)
  const batchItems = items.slice(startIdx, startIdx + batchSize)
  
  // Process all items in the batch truly in parallel
  const results = await Promise.all(
    batchItems.map(item => processItem(browser, item))
  )
  
  return results
}

// Process a queue of items with specified parallelism
async function processQueue(browser, items, parallelism, label, startTime) {
  const results = []
  
  for (let i = 0; i < items.length; i += parallelism) {
    const batchResults = await processItemsBatch(browser, items, i, parallelism)
    results.push(...batchResults)
    
    // Progress
    const progress = Math.min(i + parallelism, items.length)
    const elapsed = Math.round((Date.now() - startTime) / 1000)
    console.log(`  [${label}] Progress: ${progress}/${items.length} (${Math.round(progress / items.length * 100)}%) - ${elapsed}s elapsed`)
  }
  
  return results
}

// Main function
async function main() {
  // Check for --gifs-only flag
  const gifsOnly = process.argv.includes('--gifs-only')
  
  console.log('\n=== ANQR Gallery Generator ===\n')
  
  // Generate items
  const allItems = generateGalleryItems()
  
  // Separate static and animated items
  const staticItems = allItems.filter(item => !item.isAnimated)
  const animatedItems = allItems.filter(item => item.isAnimated)
  
  // Filter based on --gifs-only flag
  let itemsToProcess
  if (gifsOnly) {
    itemsToProcess = animatedItems
    console.log(`Filtered to ${animatedItems.length} animated items (--gifs-only)\n`)
  } else {
    itemsToProcess = allItems
    console.log(`Generated ${allItems.length} gallery items (${staticItems.length} static, ${animatedItems.length} animated)\n`)
  }
  
  // Ensure gallery directory exists
  // Only clean if not in gifs-only mode (preserve existing PNGs)
  if (!gifsOnly) {
    await fs.rm(GALLERY_DIR, { recursive: true, force: true })
  }
  await fs.mkdir(GALLERY_DIR, { recursive: true })
  console.log(`${gifsOnly ? 'Using' : 'Created'} ${GALLERY_DIR}\n`)
  
  // Launch browser
  console.log('Launching browser...\n')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  const startTime = Date.now()
  const results = []
  
  // Process static items first with higher parallelism (they're fast)
  if (!gifsOnly && staticItems.length > 0) {
    console.log(`Capturing ${staticItems.length} static QR codes (${IMAGE_SIZE}x${IMAGE_SIZE}px, ${PARALLEL_STATIC} parallel)...\n`)
    const staticResults = await processQueue(browser, staticItems, PARALLEL_STATIC, 'STATIC', startTime)
    results.push(...staticResults)
    console.log('')
  }
  
  // Process animated items with lower parallelism (they take longer and need more resources)
  if (animatedItems.length > 0 && (gifsOnly || !gifsOnly)) {
    const animatedToProcess = gifsOnly ? itemsToProcess : animatedItems
    if (animatedToProcess.length > 0) {
      console.log(`Capturing ${animatedToProcess.length} animated GIFs (${IMAGE_SIZE}x${IMAGE_SIZE}px, ${PARALLEL_ANIMATED} parallel, up to ${ANIMATED_MAX_TIMEOUT / 60000}min timeout each)...\n`)
      const animatedResults = await processQueue(browser, animatedToProcess, PARALLEL_ANIMATED, 'ANIMATED', startTime)
      results.push(...animatedResults)
    }
  }
  
  await browser.close()
  
  // Summary
  const totalTime = Math.round((Date.now() - startTime) / 1000)
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success)
  
  console.log('\n' + '='.repeat(50))
  console.log(`Successfully captured: ${successful}/${items.length}`)
  console.log(`Total time: ${totalTime}s`)
  
  if (failed.length > 0) {
    console.log(`\nFailed (${failed.length}):`)
    for (const f of failed) {
      console.log(`   - ${f.id}: ${f.error}`)
    }
  }
  
  // Save manifest
  const manifest = {
    generated: new Date().toISOString(),
    count: items.length,
    successful,
    failed: failed.length,
    imageSize: IMAGE_SIZE,
    items: items.map(i => ({ id: i.id, isAnimated: !!i.isAnimated }))
  }
  
  await fs.writeFile(
    path.join(GALLERY_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )
  
  console.log(`\nSaved manifest to ${path.join(GALLERY_DIR, 'manifest.json')}`)
  console.log('\nDone!\n')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
