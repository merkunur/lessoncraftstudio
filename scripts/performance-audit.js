#!/usr/bin/env node
/**
 * Performance Audit Script for LessonCraftStudio Landing Pages
 *
 * Static analysis (default): scans source files for CWV best practices
 * Live mode (--live):        checks TTFB, response sizes, and headers
 *
 * Usage:
 *   node scripts/performance-audit.js          # static analysis
 *   node scripts/performance-audit.js --live    # live URL checks
 *   node scripts/performance-audit.js --json    # JSON output for CI
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const JSON_OUTPUT = args.includes('--json');

// Colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

const results = { pass: 0, warn: 0, fail: 0, checks: [] };

function log(level, msg, detail) {
  const tag = level === 'PASS' ? `${GREEN}PASS${RESET}`
            : level === 'WARN' ? `${YELLOW}WARN${RESET}`
            : `${RED}FAIL${RESET}`;

  results.checks.push({ level, msg, detail: detail || '' });
  if (level === 'PASS') results.pass++;
  else if (level === 'WARN') results.warn++;
  else results.fail++;

  if (!JSON_OUTPUT) {
    console.log(`  [${tag}] ${msg}${detail ? ` — ${detail}` : ''}`);
  }
}

function heading(title) {
  if (!JSON_OUTPUT) {
    console.log(`\n${BOLD}${CYAN}${title}${RESET}`);
    console.log('─'.repeat(60));
  }
}

function readFile(relPath) {
  const full = path.join(FRONTEND, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf-8');
}

// ─── Static Analysis ──────────────────────────────────────────

function auditImageAttributes() {
  heading('1. Image Attribute Audit');

  // Theme hub hero images
  const themeHub = readFile('app/[locale]/worksheets/[theme]/page.tsx');
  if (!themeHub) {
    log('FAIL', 'Theme hub page not found');
  } else {
    if (themeHub.includes('fetchPriority=')) {
      log('PASS', 'Theme hub hero: fetchPriority present');
    } else {
      log('FAIL', 'Theme hub hero: missing fetchPriority on LCP candidate');
    }
    if (themeHub.includes('decoding="async"')) {
      log('PASS', 'Theme hub hero: decoding="async" present');
    } else {
      log('WARN', 'Theme hub hero: missing decoding="async"');
    }
    if (themeHub.includes('loading="eager"')) {
      log('PASS', 'Theme hub hero: loading="eager" (above-fold)');
    } else {
      log('WARN', 'Theme hub hero: hero images should use loading="eager"');
    }
    // Check width/height
    if (themeHub.includes('width={96}') && themeHub.includes('height={96}')) {
      log('PASS', 'Theme hub hero: explicit width/height (prevents CLS)');
    } else {
      log('WARN', 'Theme hub hero: missing explicit width/height');
    }
  }

  // Grade page hero images
  const gradePage = readFile('app/[locale]/worksheets/[theme]/[grade]/page.tsx');
  if (!gradePage) {
    log('FAIL', 'Grade page not found');
  } else {
    if (gradePage.includes('fetchPriority=')) {
      log('PASS', 'Grade page hero: fetchPriority present');
    } else {
      log('FAIL', 'Grade page hero: missing fetchPriority on LCP candidate');
    }
    if (gradePage.includes('decoding="async"')) {
      log('PASS', 'Grade page hero: decoding="async" present');
    } else {
      log('WARN', 'Grade page hero: missing decoding="async"');
    }
  }

  // ThemeSamplePreviews (below-fold lazy images)
  const previews = readFile('components/theme-page/ThemeSamplePreviews.tsx');
  if (!previews) {
    log('FAIL', 'ThemeSamplePreviews component not found');
  } else {
    if (previews.includes('loading="lazy"')) {
      log('PASS', 'ThemeSamplePreviews: loading="lazy" (below-fold)');
    } else {
      log('WARN', 'ThemeSamplePreviews: should use loading="lazy"');
    }
    if (previews.includes('decoding="async"')) {
      log('PASS', 'ThemeSamplePreviews: decoding="async" present');
    } else {
      log('WARN', 'ThemeSamplePreviews: missing decoding="async"');
    }
    if (previews.includes('width=') && previews.includes('height=')) {
      log('PASS', 'ThemeSamplePreviews: explicit width/height (prevents CLS)');
    } else {
      log('WARN', 'ThemeSamplePreviews: missing explicit dimensions');
    }
  }
}

function auditClientComponents() {
  heading('2. Client Component Audit');

  const themePageDir = path.join(FRONTEND, 'components/theme-page');
  if (!fs.existsSync(themePageDir)) {
    log('FAIL', 'theme-page components directory not found');
    return;
  }

  const files = fs.readdirSync(themePageDir).filter(f => f.endsWith('.tsx'));
  let clientCount = 0;
  const clientFiles = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(themePageDir, file), 'utf-8');
    if (content.includes("'use client'") || content.includes('"use client"')) {
      clientCount++;
      clientFiles.push(file);
    }
  }

  if (clientCount <= 1) {
    log('PASS', `Theme-page client components: ${clientCount}/${files.length}`,
      clientCount === 1 ? clientFiles[0] : 'all server components');
  } else if (clientCount <= 2) {
    log('WARN', `Theme-page client components: ${clientCount}/${files.length}`,
      clientFiles.join(', '));
  } else {
    log('FAIL', `Theme-page client components: ${clientCount}/${files.length} (target: <=1)`,
      clientFiles.join(', '));
  }
}

function auditContentVisibility() {
  heading('3. Content Visibility Audit');

  const themeHub = readFile('app/[locale]/worksheets/[theme]/page.tsx');
  const gradePage = readFile('app/[locale]/worksheets/[theme]/[grade]/page.tsx');

  for (const [name, content] of [['Theme hub', themeHub], ['Grade page', gradePage]]) {
    if (!content) {
      log('FAIL', `${name}: file not found`);
      continue;
    }
    if (content.includes('contentVisibility')) {
      log('PASS', `${name}: contentVisibility found on below-fold sections`);
    } else {
      log('WARN', `${name}: no contentVisibility detected`, 'add to below-fold sections');
    }
    if (content.includes('containIntrinsicSize')) {
      log('PASS', `${name}: containIntrinsicSize found (prevents layout shift)`);
    } else if (content.includes('contentVisibility')) {
      log('WARN', `${name}: contentVisibility without containIntrinsicSize`, 'may cause CLS');
    }
  }
}

function auditFontLoading() {
  heading('4. Font Loading Audit');

  const layout = readFile('app/layout.tsx');
  if (!layout) {
    log('FAIL', 'Root layout not found');
    return;
  }

  if (layout.includes("display: 'swap'")) {
    log('PASS', 'Font display: swap configured');
  } else {
    log('FAIL', 'Font display: swap NOT found', 'FOIT risk');
  }

  if (layout.includes('preload: true')) {
    log('PASS', 'Font preload: true configured');
  } else {
    log('WARN', 'Font preload not explicitly set');
  }

  if (layout.includes('next/font/google')) {
    log('PASS', 'Using next/font (self-hosted, no external requests)');
  } else {
    log('WARN', 'Not using next/font', 'external font requests add latency');
  }
}

function auditNextConfig() {
  heading('5. Next.js Config Audit');

  const configPath = path.join(FRONTEND, 'next.config.js');
  if (!fs.existsSync(configPath)) {
    log('FAIL', 'next.config.js not found');
    return;
  }
  const config = fs.readFileSync(configPath, 'utf-8');

  // Image formats
  if (config.includes('image/webp') && config.includes('image/avif')) {
    log('PASS', 'Image formats: WebP + AVIF configured');
  } else if (config.includes('image/webp')) {
    log('WARN', 'Image formats: WebP only (AVIF missing)');
  } else {
    log('FAIL', 'Image formats: neither WebP nor AVIF configured');
  }

  // Trailing slash
  if (config.includes('trailingSlash: false')) {
    log('PASS', 'trailingSlash: false (no duplicate URLs)');
  } else {
    log('WARN', 'trailingSlash setting not found');
  }

  // Standalone output
  if (config.includes("output: 'standalone'")) {
    log('PASS', 'Standalone output mode (optimized bundle)');
  } else {
    log('WARN', 'Not using standalone output mode');
  }

  // DNS prefetch
  if (config.includes('X-DNS-Prefetch-Control')) {
    log('PASS', 'X-DNS-Prefetch-Control header configured');
  } else {
    log('WARN', 'X-DNS-Prefetch-Control header missing');
  }
}

// ─── Live URL Checks ──────────────────────────────────────────

async function auditLive() {
  heading('6. Live URL Checks (TTFB, Size, Headers)');

  const https = require('https');
  const BASE = 'https://www.lessoncraftstudio.com';

  const urls = [
    '/en/worksheets/animals',
    '/en/worksheets/food',
    '/en/worksheets/transportation',
    '/en/worksheets/seasons',
    '/en/worksheets/sports',
    '/en/worksheets/animals/kindergarten',
    '/en/worksheets/food/first-grade',
    '/en/worksheets/transportation/preschool',
    '/en/worksheets/seasons/second-grade',
    '/en/worksheets/sports/third-grade',
  ];

  for (const urlPath of urls) {
    const url = BASE + urlPath;
    try {
      const { ttfb, size, headers, status } = await measureUrl(url);

      // TTFB check
      if (status >= 300 && status < 400) {
        log('WARN', `${urlPath}: redirect (${status})`, 'check canonical URL');
      } else if (status !== 200) {
        log('FAIL', `${urlPath}: HTTP ${status}`);
        continue;
      }

      if (ttfb < 800) {
        log('PASS', `${urlPath}: TTFB ${ttfb}ms`, `< 800ms target`);
      } else if (ttfb < 1500) {
        log('WARN', `${urlPath}: TTFB ${ttfb}ms`, '> 800ms target');
      } else {
        log('FAIL', `${urlPath}: TTFB ${ttfb}ms`, '> 1500ms — investigate');
      }

      // Size check
      const sizeKB = Math.round(size / 1024);
      if (sizeKB < 200) {
        log('PASS', `${urlPath}: HTML ${sizeKB}KB`, '< 200KB target');
      } else if (sizeKB < 400) {
        log('WARN', `${urlPath}: HTML ${sizeKB}KB`, '> 200KB target');
      } else {
        log('FAIL', `${urlPath}: HTML ${sizeKB}KB`, '> 400KB — too large');
      }

      // Encoding check
      const encoding = headers['content-encoding'] || 'none';
      if (encoding === 'br' || encoding === 'gzip') {
        log('PASS', `${urlPath}: compression ${encoding}`);
      } else {
        log('WARN', `${urlPath}: no compression detected`);
      }
    } catch (err) {
      log('FAIL', `${urlPath}: ${err.message}`);
    }
  }
}

function measureUrl(url) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const req = require('https').get(url, { headers: { 'Accept-Encoding': 'gzip, br' } }, (res) => {
      const ttfb = Date.now() - start;
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          ttfb,
          size: Buffer.concat(chunks).length,
          headers: res.headers,
          status: res.statusCode,
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('timeout after 10s'));
    });
  });
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  if (!JSON_OUTPUT) {
    console.log(`\n${BOLD}LessonCraftStudio Performance Audit${RESET}`);
    console.log(`Mode: ${LIVE ? 'Static + Live' : 'Static analysis only'}`);
  }

  // Static checks (always run)
  auditImageAttributes();
  auditClientComponents();
  auditContentVisibility();
  auditFontLoading();
  auditNextConfig();

  // Live checks (opt-in)
  if (LIVE) {
    await auditLive();
  }

  // Summary
  if (JSON_OUTPUT) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    console.log(`\n${BOLD}Summary${RESET}`);
    console.log('─'.repeat(60));
    console.log(`  ${GREEN}PASS: ${results.pass}${RESET}  ${YELLOW}WARN: ${results.warn}${RESET}  ${RED}FAIL: ${results.fail}${RESET}`);

    if (results.fail > 0) {
      console.log(`\n${RED}${BOLD}Action required: ${results.fail} check(s) failed${RESET}`);
      process.exit(1);
    } else if (results.warn > 0) {
      console.log(`\n${YELLOW}All checks passed with ${results.warn} warning(s)${RESET}`);
    } else {
      console.log(`\n${GREEN}${BOLD}All checks passed!${RESET}`);
    }
  }
}

main().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
