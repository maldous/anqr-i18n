#!/usr/bin/env node
/**
 * Sitemap Generator with hreflang support
 * Generates sitemap.xml with proper hreflang alternate links for all supported languages
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// All supported languages (from src/i18n/index.ts)
const languages = [
  'en-GB', // Default
  'af', 'ar', 'bg', 'bn-BD', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR',
  'es-ES', 'fi-FI', 'fil', 'fr-FR', 'gu', 'hi-IN', 'hr', 'hu-HU',
  'id', 'it-IT', 'ja-JP', 'km-KH', 'kn-IN', 'ko-KR', 'lo-LA',
  'ml-IN', 'mr-IN', 'ms', 'my-MM', 'ne-NP', 'nl-NL', 'no-NO',
  'pa', 'pl-PL', 'pt-BR', 'ro', 'ru-RU', 'sv-SE', 'ta-IN',
  'te-IN', 'th', 'vi', 'zh-CN', 'zu'
];

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: 'learn', priority: 0.9, changefreq: 'weekly' },
  { path: 'examples', priority: 0.9, changefreq: 'weekly' },
  { path: 'guide', priority: 0.8, changefreq: 'weekly' },
  { path: 'about', priority: 0.6, changefreq: 'monthly' },
  { path: 'contact', priority: 0.5, changefreq: 'monthly' },
  { path: 'privacy', priority: 0.4, changefreq: 'monthly' },
  { path: 'terms', priority: 0.4, changefreq: 'monthly' },
];

// Non-localized pages
const globalPages = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: 'gallery', priority: 0.9, changefreq: 'weekly' },
];

const BASE_URL = 'https://anqr.link';
const LASTMOD = new Date().toISOString().split('T')[0];

/**
 * Convert language code to hreflang format
 * Most codes are already correct, but we need to handle some special cases
 */
function toHreflang(lang) {
  // en-GB is the default, use 'en' for broader matching
  if (lang === 'en-GB') return 'en';
  // Convert to lowercase for hreflang (e.g., zh-CN -> zh-cn)
  return lang.toLowerCase();
}

/**
 * Get URL for a page in a specific language
 */
function getUrl(pagePath, lang) {
  const base = pagePath ? `${BASE_URL}/${pagePath}` : BASE_URL + '/';
  if (lang === 'en-GB') {
    return base;
  }
  return `${base}${pagePath ? '?' : '?'}lang=${lang}`;
}

/**
 * Generate hreflang links for a page
 */
function generateHreflangLinks(pagePath, indent = '    ') {
  const links = languages.map(lang => {
    const href = getUrl(pagePath, lang);
    const hreflang = toHreflang(lang);
    return `${indent}<xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`;
  });
  
  // Add x-default pointing to English version
  const defaultHref = getUrl(pagePath, 'en-GB');
  links.push(`${indent}<xhtml:link rel="alternate" hreflang="x-default" href="${defaultHref}"/>`);
  
  return links.join('\n');
}

/**
 * Generate a URL entry with hreflang tags
 */
function generateUrlEntry(pagePath, lang, priority, changefreq, includeHreflang = true) {
  const loc = getUrl(pagePath, lang);
  const adjustedPriority = lang === 'en-GB' ? priority : Math.max(0.3, priority - 0.1);
  
  let entry = `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${adjustedPriority.toFixed(1)}</priority>`;
  
  if (includeHreflang) {
    entry += '\n' + generateHreflangLinks(pagePath);
  }
  
  entry += '\n  </url>';
  return entry;
}

/**
 * Generate the complete sitemap
 */
function generateSitemap() {
  const entries = [];
  
  // Add header
  entries.push(`<?xml version="1.0" encoding="UTF-8"?>`);
  entries.push(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`);
  entries.push(`        xmlns:xhtml="http://www.w3.org/1999/xhtml">`);
  entries.push('');
  
  // Add global pages (no language variants)
  entries.push('  <!-- Global Pages (no language variants) -->');
  for (const page of globalPages) {
    entries.push(`  <url>`);
    entries.push(`    <loc>${BASE_URL}${page.path ? '/' + page.path : '/'}</loc>`);
    entries.push(`    <lastmod>${LASTMOD}</lastmod>`);
    entries.push(`    <changefreq>${page.changefreq}</changefreq>`);
    entries.push(`    <priority>${page.priority.toFixed(1)}</priority>`);
    entries.push(`  </url>`);
  }
  entries.push('');
  
  // Add static pages with hreflang for each language
  for (const page of staticPages) {
    entries.push(`  <!-- ${page.path.toUpperCase()} page - all languages with hreflang -->`);
    
    // English (default) version first
    entries.push(generateUrlEntry(page.path, 'en-GB', page.priority, page.changefreq, true));
    
    // All other languages
    for (const lang of languages) {
      if (lang === 'en-GB') continue;
      entries.push(generateUrlEntry(page.path, lang, page.priority, page.changefreq, true));
    }
    entries.push('');
  }
  
  // Close urlset
  entries.push('</urlset>');
  
  return entries.join('\n');
}

// Generate and write the sitemap
const sitemap = generateSitemap();
const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

// Count URLs
const urlCount = (sitemap.match(/<url>/g) || []).length;
const hreflangCount = (sitemap.match(/xhtml:link/g) || []).length;

console.log(`✅ Generated sitemap.xml`);
console.log(`   - ${urlCount} URLs`);
console.log(`   - ${hreflangCount} hreflang links`);
console.log(`   - Output: ${outputPath}`);
