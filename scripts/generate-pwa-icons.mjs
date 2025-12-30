#!/usr/bin/env node
/**
 * Generate PWA icons from app-icon.html
 * 
 * Creates all required PWA icon sizes for web manifest
 */

import puppeteer from 'puppeteer'
import { mkdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// PWA icon sizes
const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

async function generatePwaIcons() {
  console.log('🚀 Generating PWA icons...')
  
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
  
  // Create icons directory
  const iconsDir = join(projectRoot, 'public/icons')
  await mkdir(iconsDir, { recursive: true })
  
  // Generate all PWA icon sizes
  for (const size of PWA_SIZES) {
    const iconPath = join(iconsDir, `icon-${size}.png`)
    await sharp(screenshotBuffer)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(iconPath)
    console.log(`✅ icon-${size}.png`)
  }
  
  // Also generate favicon.ico (32x32)
  const faviconPath = join(projectRoot, 'public/favicon.ico')
  await sharp(screenshotBuffer)
    .resize(32, 32, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(faviconPath)
  console.log('✅ favicon.ico (32x32)')
  
  // Generate apple-touch-icon (180x180)
  const appleTouchPath = join(projectRoot, 'public/apple-touch-icon.png')
  await sharp(screenshotBuffer)
    .resize(180, 180, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(appleTouchPath)
  console.log('✅ apple-touch-icon.png (180x180)')
  
  console.log('\n🎉 All PWA icons generated successfully!')
}

generatePwaIcons().catch(err => {
  console.error('❌ Error generating icons:', err)
  process.exit(1)
})
