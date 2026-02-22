#!/usr/bin/env node
/**
 * Performance Audit Script for LessonCraftStudio Landing Pages
 *
 * Static analysis (default): scans source files for CWV best practices
 * Live mode (--live):        checks TTFB, response sizes, and headers (10 URLs)
 * Full mode (--full):        comprehensive 100-URL audit with CWV metrics
 *
 * Usage:
 *   node scripts/performance-audit.js          # static analysis
 *   node scripts/performance-audit.js --live   # quick live URL checks (10 URLs)
 *   node scripts/performance-audit.js --full   # full 100-URL audit + CWV
 *   node scripts/performance-audit.js --json   # JSON output for CI
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const FRONTEND = path.join(ROOT, 'frontend');

const args = process.argv.slice(2);
const LIVE = args.includes('--live');
const FULL = args.includes('--full');
const JSON_OUTPUT = args.includes('--json');

// Colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const results = { pass: 0, warn: 0, fail: 0, checks: [] };

// Extended results for --full mode
const fullResults = {
  timestamp: new Date().toISOString(),
  mode: FULL ? 'full' : LIVE ? 'live' : 'static',
  pageTypes: {},
  cwv: {},
  summary: {},
};

function log(level, msg, detail) {
  const tag = level === 'PASS' ? `${GREEN}PASS${RESET}`
            : level === 'WARN' ? `${YELLOW}WARN${RESET}`
            : `${RED}FAIL${RESET}`;

  results.checks.push({ level, msg, detail: detail || '' });
  if (level === 'PASS') results.pass++;
  else if (level === 'WARN') results.warn++;
  else results.fail++;

  if (!JSON_OUTPUT) {
    console.log(`  [${tag}] ${msg}${detail ? ` \u2014 ${detail}` : ''}`);
  }
}

function heading(title) {
  if (!JSON_OUTPUT) {
    console.log(`\n${BOLD}${CYAN}${title}${RESET}`);
    console.log('\u2500'.repeat(60));
  }
}

function readFile(relPath) {
  const full = path.join(FRONTEND, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf-8');
}

// ─── URL Generation ──────────────────────────────────────────

function getQuickUrls() {
  return [
    { path: '/en/worksheets/animals', type: 'theme-hub' },
    { path: '/en/worksheets/food', type: 'theme-hub' },
    { path: '/en/worksheets/transportation', type: 'theme-hub' },
    { path: '/en/worksheets/seasons', type: 'theme-hub' },
    { path: '/en/worksheets/sports', type: 'theme-hub' },
    { path: '/en/worksheets/animals/kindergarten', type: 'theme-grade' },
    { path: '/en/worksheets/food/first-grade', type: 'theme-grade' },
    { path: '/en/worksheets/transportation/preschool', type: 'theme-grade' },
    { path: '/en/worksheets/seasons/second-grade', type: 'theme-grade' },
    { path: '/en/worksheets/sports/third-grade', type: 'theme-grade' },
  ];
}

function getFullUrls() {
  const urls = [];

  // Homepage + About (2)
  urls.push({ path: '/en', type: 'homepage' });
  urls.push({ path: '/en/about', type: 'about' });

  // Product pages (20) - every ~2nd product, spread across app types
  const products = [
    'addition-worksheets', 'alphabet-train-worksheets', 'coloring-worksheets',
    'crossword-worksheets', 'cryptogram-worksheets', 'draw-and-color-worksheets',
    'drawing-lines-worksheets', 'find-and-count-worksheets', 'find-objects-worksheets',
    'grid-match-worksheets', 'matching-worksheets', 'math-worksheets',
    'missing-pieces-worksheets', 'odd-one-out-worksheets', 'pattern-worksheets',
    'picture-sort-worksheets', 'shadow-match-worksheets', 'subtraction-worksheets',
    'word-scramble-worksheets', 'word-search-worksheets',
  ];
  for (const p of products) {
    urls.push({ path: `/en/apps/${p}`, type: 'product' });
  }

  // Theme hub pages (25) - every 2nd theme
  const themes = [
    'animals', 'transportation', 'school', 'emotions', 'clothing',
    'toys', 'jobs', 'seasons', 'weather', 'shapes',
    'alphabet', 'easter', 'christmas', 'farm', 'dinosaurs',
    'fruits', 'flowers', 'pets', 'garden', 'pirates',
    'robots', 'construction', 'travel', 'circus', 'spring',
  ];
  for (const t of themes) {
    urls.push({ path: `/en/worksheets/${t}`, type: 'theme-hub' });
  }

  // Theme+grade pages (40) - 8 themes x 5 grades
  const themeGradeThemes = [
    'animals', 'food', 'sports', 'space', 'holidays',
    'dinosaurs', 'robots', 'birthday',
  ];
  const grades = ['preschool', 'kindergarten', 'first-grade', 'second-grade', 'third-grade'];
  for (const t of themeGradeThemes) {
    for (const g of grades) {
      urls.push({ path: `/en/worksheets/${t}/${g}`, type: 'theme-grade' });
    }
  }

  // Grade hub pages (5)
  for (const g of grades) {
    urls.push({ path: `/en/apps/grades/${g}`, type: 'grade-hub' });
  }

  // Category hub pages (8)
  const categories = [
    'math', 'language-arts', 'word-games', 'art-creativity',
    'logic-puzzles', 'visual-perception', 'matching-sorting', 'patterns-motor',
  ];
  for (const c of categories) {
    urls.push({ path: `/en/apps/category/${c}`, type: 'category-hub' });
  }

  return urls;
}

// PSI representative URLs (1 per page type for CWV measurement)
function getPsiUrls() {
  return [
    { path: '/en/apps/addition-worksheets', type: 'product' },
    { path: '/en/worksheets/animals', type: 'theme-hub' },
    { path: '/en/worksheets/animals/kindergarten', type: 'theme-grade' },
    { path: '/en/apps/grades/kindergarten', type: 'grade-hub' },
    { path: '/en/apps/category/math', type: 'category-hub' },
  ];
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

function measureUrl(url) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const req = https.get(url, { headers: { 'Accept-Encoding': 'gzip, br' } }, (res) => {
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
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('timeout after 15s'));
    });
  });
}

async function auditLive() {
  heading('6. Live URL Checks (TTFB, Size, Headers)');

  const BASE = 'https://www.lessoncraftstudio.com';
  const urls = getQuickUrls();

  for (const { path: urlPath } of urls) {
    const url = BASE + urlPath;
    try {
      const { ttfb, size, headers, status } = await measureUrl(url);
      logUrlResult(urlPath, { ttfb, size, headers, status });
    } catch (err) {
      log('FAIL', `${urlPath}: ${err.message}`);
    }
  }
}

function logUrlResult(urlPath, { ttfb, size, headers, status }) {
  // Status check
  if (status >= 300 && status < 400) {
    log('WARN', `${urlPath}: redirect (${status})`, 'check canonical URL');
    return { ok: false };
  } else if (status !== 200) {
    log('FAIL', `${urlPath}: HTTP ${status}`);
    return { ok: false };
  }

  // TTFB check
  if (ttfb < 800) {
    log('PASS', `${urlPath}: TTFB ${ttfb}ms`, '< 800ms target');
  } else if (ttfb < 1500) {
    log('WARN', `${urlPath}: TTFB ${ttfb}ms`, '> 800ms target');
  } else {
    log('FAIL', `${urlPath}: TTFB ${ttfb}ms`, '> 1500ms \u2014 investigate');
  }

  // Size check
  const sizeKB = Math.round(size / 1024);
  if (sizeKB < 200) {
    log('PASS', `${urlPath}: HTML ${sizeKB}KB`, '< 200KB target');
  } else if (sizeKB < 400) {
    log('WARN', `${urlPath}: HTML ${sizeKB}KB`, '> 200KB target');
  } else {
    log('FAIL', `${urlPath}: HTML ${sizeKB}KB`, '> 400KB \u2014 too large');
  }

  // Encoding check
  const encoding = headers['content-encoding'] || 'none';
  if (encoding === 'br' || encoding === 'gzip') {
    log('PASS', `${urlPath}: compression ${encoding}`);
  } else {
    log('WARN', `${urlPath}: no compression detected`);
  }

  return { ok: true, ttfb, sizeKB, encoding };
}

// ─── Full 100-URL Audit ──────────────────────────────────────

async function auditFull() {
  const BASE = 'https://www.lessoncraftstudio.com';
  const urls = getFullUrls();
  const typeStats = {};

  heading(`6. Full Live Audit (${urls.length} URLs)`);

  let completed = 0;
  for (const { path: urlPath, type } of urls) {
    completed++;
    if (!JSON_OUTPUT) {
      process.stdout.write(`\r  ${DIM}[${completed}/${urls.length}]${RESET} `);
    }

    const url = BASE + urlPath;
    if (!typeStats[type]) {
      typeStats[type] = { count: 0, pass: 0, fail: 0, ttfbs: [], sizes: [], errors: [] };
    }

    try {
      const { ttfb, size, headers, status } = await measureUrl(url);

      if (status !== 200) {
        typeStats[type].fail++;
        typeStats[type].errors.push(`${urlPath}: HTTP ${status}`);
        log('FAIL', `${urlPath}: HTTP ${status}`);
        typeStats[type].count++;
        continue;
      }

      typeStats[type].count++;
      typeStats[type].ttfbs.push(ttfb);
      typeStats[type].sizes.push(Math.round(size / 1024));

      const encoding = headers['content-encoding'] || 'none';
      const ttfbOk = ttfb < 800;
      const sizeOk = size / 1024 < 200;
      const compressOk = encoding === 'br' || encoding === 'gzip';

      if (ttfbOk && sizeOk && compressOk) {
        typeStats[type].pass++;
      } else {
        typeStats[type].fail++;
        if (!ttfbOk) log('WARN', `${urlPath}: TTFB ${ttfb}ms`, '> 800ms');
        if (!sizeOk) log('WARN', `${urlPath}: HTML ${Math.round(size / 1024)}KB`, '> 200KB');
        if (!compressOk) log('WARN', `${urlPath}: no compression`);
      }
    } catch (err) {
      typeStats[type].count++;
      typeStats[type].fail++;
      typeStats[type].errors.push(`${urlPath}: ${err.message}`);
      log('FAIL', `${urlPath}: ${err.message}`);
    }

    // Small delay to avoid overwhelming the server
    await new Promise(r => setTimeout(r, 100));
  }

  if (!JSON_OUTPUT) {
    process.stdout.write('\r');
  }

  // Per-type summary
  heading('7. Per-Page-Type Summary');
  for (const [type, stats] of Object.entries(typeStats)) {
    const avgTtfb = stats.ttfbs.length > 0
      ? Math.round(stats.ttfbs.reduce((a, b) => a + b, 0) / stats.ttfbs.length)
      : 'N/A';
    const maxTtfb = stats.ttfbs.length > 0 ? Math.max(...stats.ttfbs) : 'N/A';
    const avgSize = stats.sizes.length > 0
      ? Math.round(stats.sizes.reduce((a, b) => a + b, 0) / stats.sizes.length)
      : 'N/A';
    const maxSize = stats.sizes.length > 0 ? Math.max(...stats.sizes) : 'N/A';

    fullResults.pageTypes[type] = {
      count: stats.count,
      pass: stats.pass,
      fail: stats.fail,
      avgTtfb: avgTtfb,
      maxTtfb: maxTtfb,
      avgSizeKB: avgSize,
      maxSizeKB: maxSize,
      errors: stats.errors,
    };

    if (!JSON_OUTPUT) {
      const allPass = stats.fail === 0;
      const color = allPass ? GREEN : stats.fail <= 2 ? YELLOW : RED;
      console.log(`  ${color}${BOLD}${type}${RESET} (${stats.count} URLs)`);
      console.log(`    Pass: ${stats.pass}  Fail: ${stats.fail}`);
      console.log(`    Avg TTFB: ${avgTtfb}ms  Max TTFB: ${maxTtfb}ms`);
      console.log(`    Avg Size: ${avgSize}KB  Max Size: ${maxSize}KB`);
      if (stats.errors.length > 0) {
        for (const e of stats.errors) {
          console.log(`    ${RED}Error: ${e}${RESET}`);
        }
      }
    }
  }

  // Save type stats for JSON output
  fullResults.liveAudit = {
    totalUrls: urls.length,
    totalPass: Object.values(typeStats).reduce((a, s) => a + s.pass, 0),
    totalFail: Object.values(typeStats).reduce((a, s) => a + s.fail, 0),
  };

  return typeStats;
}

// ─── PageSpeed Insights (CWV) ────────────────────────────────

function fetchPsi(url) {
  return new Promise((resolve, reject) => {
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;
    const req = https.get(psiUrl, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        try {
          const body = Buffer.concat(chunks).toString('utf-8');
          const data = JSON.parse(body);
          resolve(data);
        } catch (e) {
          reject(new Error(`PSI parse error: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error('PSI timeout after 60s'));
    });
  });
}

async function auditCWV() {
  heading('8. Core Web Vitals (PageSpeed Insights)');

  const BASE = 'https://www.lessoncraftstudio.com';
  const psiUrls = getPsiUrls();

  if (!JSON_OUTPUT) {
    console.log(`  Testing ${psiUrls.length} representative URLs via PSI API...`);
    console.log(`  ${DIM}(Each test takes 10-30 seconds)${RESET}\n`);
  }

  for (const { path: urlPath, type } of psiUrls) {
    const url = BASE + urlPath;
    if (!JSON_OUTPUT) {
      process.stdout.write(`  ${DIM}Testing ${urlPath}...${RESET}`);
    }

    try {
      const data = await fetchPsi(url);

      if (data.error) {
        const isQuota = data.error.message && data.error.message.includes('Quota');
        log(isQuota ? 'WARN' : 'FAIL', `PSI ${urlPath}: API error`, data.error.message);
        fullResults.cwv[urlPath] = { type, error: data.error.message };
        continue;
      }

      const audits = data.lighthouseResult?.audits;
      if (!audits) {
        log('FAIL', `PSI ${urlPath}: no Lighthouse data returned`);
        continue;
      }

      // LCP
      const lcpMs = audits['largest-contentful-paint']?.numericValue;
      const lcpSec = lcpMs ? (lcpMs / 1000).toFixed(1) : null;

      // CLS
      const cls = audits['cumulative-layout-shift']?.numericValue;
      const clsFormatted = cls !== undefined ? cls.toFixed(3) : null;

      // TBT (Total Blocking Time - proxy for FID/INP)
      const tbtMs = audits['total-blocking-time']?.numericValue;
      const tbtFormatted = tbtMs !== undefined ? Math.round(tbtMs) : null;

      // Performance score
      const perfScore = data.lighthouseResult?.categories?.performance?.score;
      const scoreFormatted = perfScore !== undefined ? Math.round(perfScore * 100) : null;

      // FCP
      const fcpMs = audits['first-contentful-paint']?.numericValue;
      const fcpSec = fcpMs ? (fcpMs / 1000).toFixed(1) : null;

      if (!JSON_OUTPUT) {
        process.stdout.write('\r' + ' '.repeat(80) + '\r');
      }

      // Store results
      fullResults.cwv[urlPath] = {
        type,
        performanceScore: scoreFormatted,
        lcpMs: lcpMs ? Math.round(lcpMs) : null,
        cls: cls !== undefined ? parseFloat(cls.toFixed(3)) : null,
        tbtMs: tbtFormatted,
        fcpMs: fcpMs ? Math.round(fcpMs) : null,
      };

      // Log results
      // Performance score
      if (scoreFormatted >= 90) {
        log('PASS', `PSI ${urlPath}: score ${scoreFormatted}/100`, type);
      } else if (scoreFormatted >= 50) {
        log('WARN', `PSI ${urlPath}: score ${scoreFormatted}/100`, type);
      } else {
        log('FAIL', `PSI ${urlPath}: score ${scoreFormatted}/100`, type);
      }

      // LCP
      if (lcpSec) {
        if (lcpMs < 2500) {
          log('PASS', `PSI ${urlPath}: LCP ${lcpSec}s`, '< 2.5s target');
        } else if (lcpMs < 4000) {
          log('WARN', `PSI ${urlPath}: LCP ${lcpSec}s`, '> 2.5s target');
        } else {
          log('FAIL', `PSI ${urlPath}: LCP ${lcpSec}s`, '> 4.0s \u2014 poor');
        }
      }

      // CLS
      if (clsFormatted !== null) {
        if (cls < 0.1) {
          log('PASS', `PSI ${urlPath}: CLS ${clsFormatted}`, '< 0.1 target');
        } else if (cls < 0.25) {
          log('WARN', `PSI ${urlPath}: CLS ${clsFormatted}`, '> 0.1 target');
        } else {
          log('FAIL', `PSI ${urlPath}: CLS ${clsFormatted}`, '> 0.25 \u2014 poor');
        }
      }

      // TBT
      if (tbtFormatted !== null) {
        if (tbtMs < 200) {
          log('PASS', `PSI ${urlPath}: TBT ${tbtFormatted}ms`, '< 200ms target');
        } else if (tbtMs < 600) {
          log('WARN', `PSI ${urlPath}: TBT ${tbtFormatted}ms`, '> 200ms target');
        } else {
          log('FAIL', `PSI ${urlPath}: TBT ${tbtFormatted}ms`, '> 600ms \u2014 poor');
        }
      }

    } catch (err) {
      if (!JSON_OUTPUT) {
        process.stdout.write('\r' + ' '.repeat(80) + '\r');
      }
      log('FAIL', `PSI ${urlPath}: ${err.message}`);
    }
  }
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  const mode = FULL ? 'Full (100 URLs + CWV)' : LIVE ? 'Static + Live (10 URLs)' : 'Static analysis only';

  if (!JSON_OUTPUT) {
    console.log(`\n${BOLD}LessonCraftStudio Performance Audit${RESET}`);
    console.log(`Mode: ${mode}`);
  }

  // Static checks (always run)
  auditImageAttributes();
  auditClientComponents();
  auditContentVisibility();
  auditFontLoading();
  auditNextConfig();

  // Live checks
  if (LIVE && !FULL) {
    await auditLive();
  }

  // Full audit
  if (FULL) {
    await auditFull();
    await auditCWV();

    // Save results to JSON file
    fullResults.summary = {
      staticChecks: { pass: results.pass, warn: results.warn, fail: results.fail },
      totalChecks: results.checks.length,
    };
    fullResults.allChecks = results.checks;

    const outPath = path.join(ROOT, 'docs', 'performance-audit-results.json');
    fs.writeFileSync(outPath, JSON.stringify(fullResults, null, 2));
    if (!JSON_OUTPUT) {
      console.log(`\n  ${DIM}Results saved to docs/performance-audit-results.json${RESET}`);
    }
  }

  // Summary
  if (JSON_OUTPUT) {
    const output = FULL ? fullResults : results;
    console.log(JSON.stringify(output, null, 2));
  } else {
    console.log(`\n${BOLD}Summary${RESET}`);
    console.log('\u2500'.repeat(60));
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
