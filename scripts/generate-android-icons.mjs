#!/usr/bin/env node
/**
 * Generate Android app icons from app-icon.html
 * 
 * This script renders the HTML template and creates all required
 * Android icon sizes for adaptive icons and legacy icons.
 */

import puppeteer from 'puppeteer'
import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// Android icon size configurations
// For adaptive icons, foreground is 108dp which scales as follows:
const ICON_SIZES = {
  mdpi: { foreground: 108, legacy: 48 },
  hdpi: { foreground: 162, legacy: 72 },
  xhdpi: { foreground: 216, legacy: 96 },
  xxhdpi: { foreground: 324, legacy: 144 },
  xxxhdpi: { foreground: 432, legacy: 192 },
}

const ANDROID_RES_PATH = join(projectRoot, 'android/app/src/main/res')

async function generateIcons() {
  console.log('🚀 Starting Android icon generation...')
  
  // Launch browser and render HTML
  console.log('📸 Rendering app-icon.html...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  
  const page = await browser.newPage()
  await page.setViewport({ width: 1024, height: 1024 })
  
  const htmlPath = join(projectRoot, 'public/app-icon.html')
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' })
  
  // Capture as PNG
  const screenshotBuffer = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: 1024, height: 1024 }
  })
  
  await browser.close()
  console.log('✅ HTML rendered to PNG (1024x1024)')
  
  // Generate all icon sizes
  for (const [density, sizes] of Object.entries(ICON_SIZES)) {
    const mipmapDir = join(ANDROID_RES_PATH, `mipmap-${density}`)
    
    // Ensure directory exists
    await mkdir(mipmapDir, { recursive: true })
    
    // Generate foreground icon (for adaptive icons)
    const foregroundPath = join(mipmapDir, 'ic_launcher_foreground.png')
    await sharp(screenshotBuffer)
      .resize(sizes.foreground, sizes.foreground, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(foregroundPath)
    console.log(`✅ ${density}/ic_launcher_foreground.png (${sizes.foreground}x${sizes.foreground})`)
    
    // Generate legacy launcher icon
    const launcherPath = join(mipmapDir, 'ic_launcher.png')
    await sharp(screenshotBuffer)
      .resize(sizes.legacy, sizes.legacy, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(launcherPath)
    console.log(`✅ ${density}/ic_launcher.png (${sizes.legacy}x${sizes.legacy})`)
    
    // Generate round launcher icon (same as legacy but will be masked by system)
    const roundPath = join(mipmapDir, 'ic_launcher_round.png')
    await sharp(screenshotBuffer)
      .resize(sizes.legacy, sizes.legacy, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(roundPath)
    console.log(`✅ ${density}/ic_launcher_round.png (${sizes.legacy}x${sizes.legacy})`)
  }
  
  console.log('\n🎉 All Android icons generated successfully!')
}

generateIcons().catch(err => {
  console.error('❌ Error generating icons:', err)
  process.exit(1)
})
