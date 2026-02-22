#!/usr/bin/env node
/**
 * Part 168: Comprehensive EN Live Page Verification
 *
 * Checks ALL 339 English pages on production:
 *   - 6 secondary pages (homepage, apps hub, worksheets hub, about, faq, pricing)
 *   - 33 product pages (/en/apps/[slug])
 *   - 50 theme hub pages (/en/worksheets/[theme])
 *   - 250 theme+grade pages (/en/worksheets/[theme]/[grade])
 *
 * Checks per page: HTTP 200, <title>, <meta description>, canonical, hreflang, JSON-LD
 *
 * Usage:
 *   node scripts/verify-en-live-pages.js
 *   node scripts/verify-en-live-pages.js --json docs/audit-results/part168-live-verification.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── Configuration ────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.lessoncraftstudio.com';
const MAX_CONCURRENT = 5;
const BATCH_DELAY_MS = 300;
const TIMEOUT_MS = 20000;

// ── Colors ───────────────────────────────────────────────────────────

const C = {
  pass: '\x1b[32m', warn: '\x1b[33m', fail: '\x1b[31m',
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
};

// ── Parse config files ───────────────────────────────────────────────

function parseThemeSlugMap() {
  const src = fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'theme-slugs.ts'), 'utf8');
  const section = src.match(/themeSlugMap[^{]*\{([\s\S]*?)\n\};/);
  if (!section) return {};
  const map = {};
  const blockRe = /['"]?([\w-]+)['"]?\s*:\s*\{([^}]+)\}/g;
  let m;
  while ((m = blockRe.exec(section[1])) !== null) {
    const inner = m[2];
    const enMatch = inner.match(/en\s*:\s*'([\w-]+)'/);
    if (enMatch) map[m[1]] = enMatch[1];
  }
  return map;
}

function parseGradeSlugMap() {
  const src = fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'grade-slugs.ts'), 'utf8');
  const section = src.match(/gradeSlugMap[^{]*\{([\s\S]*?)\n\};/);
  if (!section) return {};
  const map = {};
  const blockRe = /['"]?([\w-]+)['"]?\s*:\s*\{([^}]+)\}/g;
  let m;
  while ((m = blockRe.exec(section[1])) !== null) {
    const inner = m[2];
    const enMatch = inner.match(/en\s*:\s*'([\w-]+)'/);
    if (enMatch) map[m[1]] = enMatch[1];
  }
  return map;
}

function parseProductSlugs() {
  const dir = path.join(ROOT, 'frontend', 'content', 'product-pages', 'en');
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.ts'))
    .map(f => f.replace('.ts', ''));
}

// ── HTTP helper ──────────────────────────────────────────────────────

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: TIMEOUT_MS }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        return fetchUrl(next).then(resolve);
      }
      const chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8'), url }));
    });
    req.on('error', (err) => resolve({ status: 0, body: '', url, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '', url, error: 'timeout' }); });
  });
}

// ── Page checker ─────────────────────────────────────────────────────

function checkPage(res, expectedUrl) {
  const issues = [];
  const body = res.body;

  // 1. HTTP status
  if (res.status !== 200) {
    issues.push(`HTTP ${res.status}${res.error ? ` (${res.error})` : ''}`);
    return { url: expectedUrl, status: 'FAIL', issues, checks: {} };
  }

  // 2. <title> tag
  const titleMatch = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const hasTitle = title.length > 0 && !title.includes('404') && !title.includes('Page Not Found');
  if (!hasTitle) issues.push(`Missing or bad title: "${title.slice(0, 60)}"`);

  // 3. <meta description>
  const descMatch = body.match(/<meta\s+name\s*=\s*["']description["']\s+content\s*=\s*["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  const hasDesc = desc.length > 50;
  if (!hasDesc) issues.push(`Meta description too short (${desc.length} chars)`);

  // 4. Canonical
  const canonMatch = body.match(/<link\s+rel\s*=\s*["']canonical["']\s+href\s*=\s*["']([\s\S]*?)["']/i);
  const canonical = canonMatch ? canonMatch[1].trim() : '';
  const hasCanonical = canonical.length > 0;
  if (!hasCanonical) issues.push('Missing canonical');

  // 5. Hreflang self-ref for en
  const hreflangRe = /<link\s+rel\s*=\s*["']alternate["']\s+hreflang\s*=\s*["']en["']\s+href\s*=\s*["']([\s\S]*?)["']/i;
  const hasHreflang = hreflangRe.test(body);
  if (!hasHreflang) issues.push('Missing hreflang="en" self-reference');

  // 6. JSON-LD
  const jsonLdMatches = body.match(/<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>/gi);
  const jsonLdCount = jsonLdMatches ? jsonLdMatches.length : 0;
  const hasJsonLd = jsonLdCount > 0;
  if (!hasJsonLd) issues.push('No JSON-LD schema found');

  const passed = issues.length === 0;
  return {
    url: expectedUrl,
    status: passed ? 'PASS' : 'FAIL',
    issues,
    checks: {
      http200: true,
      title: hasTitle,
      metaDesc: hasDesc,
      canonical: hasCanonical,
      hreflang: hasHreflang,
      jsonLd: hasJsonLd,
      jsonLdCount,
      titleText: title.slice(0, 80),
      descLength: desc.length,
    },
  };
}

// ── Main ─────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  let jsonPath = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json' && args[i + 1]) jsonPath = args[i + 1];
  }

  console.log(`${C.bold}Part 168: Comprehensive EN Live Page Verification${C.reset}\n`);

  // Build URL list
  const themeMap = parseThemeSlugMap();   // themeId -> EN slug
  const gradeMap = parseGradeSlugMap();   // gradeId -> EN slug
  const productSlugs = parseProductSlugs();

  const themeIds = Object.keys(themeMap);
  const gradeIds = Object.keys(gradeMap);

  console.log(`  Themes: ${themeIds.length} (expect 50)`);
  console.log(`  Grades: ${gradeIds.length} (expect 5)`);
  console.log(`  Products: ${productSlugs.length} (expect 33)`);

  // Secondary pages
  const secondaryPaths = [
    '/en',
    '/en/apps',
    '/en/worksheets',
    '/en/about',
    '/en/faq',
    '/en/pricing',
  ];

  // Product pages
  const productPaths = productSlugs.map(s => `/en/apps/${s}`);

  // Theme hub pages
  const themeHubPaths = themeIds.map(id => `/en/worksheets/${themeMap[id]}`);

  // Theme+grade pages
  const themeGradePaths = [];
  for (const themeId of themeIds) {
    for (const gradeId of gradeIds) {
      themeGradePaths.push(`/en/worksheets/${themeMap[themeId]}/${gradeMap[gradeId]}`);
    }
  }

  const allPaths = [...secondaryPaths, ...productPaths, ...themeHubPaths, ...themeGradePaths];
  const totalExpected = 6 + 33 + 50 + 250;
  console.log(`\n  Total URLs: ${allPaths.length} (expect ${totalExpected})`);

  if (allPaths.length !== totalExpected) {
    console.log(`${C.fail}  WARNING: URL count mismatch!${C.reset}`);
  }

  console.log(`\n  Fetching ${allPaths.length} pages (${MAX_CONCURRENT} concurrent)...\n`);

  // Fetch in batches
  const results = [];
  let passCount = 0;
  let failCount = 0;

  for (let i = 0; i < allPaths.length; i += MAX_CONCURRENT) {
    const batch = allPaths.slice(i, i + MAX_CONCURRENT);
    const batchResults = await Promise.all(
      batch.map(async (p) => {
        const url = `${BASE_URL}${p}`;
        const res = await fetchUrl(url);
        return checkPage(res, url);
      })
    );

    for (const r of batchResults) {
      results.push(r);
      if (r.status === 'PASS') {
        passCount++;
      } else {
        failCount++;
        console.log(`  ${C.fail}\u2717${C.reset} ${r.url}`);
        for (const issue of r.issues) {
          console.log(`      ${C.dim}${issue}${C.reset}`);
        }
      }
    }

    // Progress every 50 pages
    const done = Math.min(i + MAX_CONCURRENT, allPaths.length);
    if (done % 50 === 0 || done === allPaths.length) {
      console.log(`  ${C.dim}... ${done}/${allPaths.length} checked (${passCount} pass, ${failCount} fail)${C.reset}`);
    }

    if (i + MAX_CONCURRENT < allPaths.length) {
      await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
    }
  }

  // Summary by category
  const secondaryResults = results.slice(0, 6);
  const productResults = results.slice(6, 6 + 33);
  const themeResults = results.slice(6 + 33, 6 + 33 + 50);
  const gradeResults = results.slice(6 + 33 + 50);

  const countPass = (arr) => arr.filter(r => r.status === 'PASS').length;

  console.log(`\n${C.bold}Summary${C.reset}`);
  console.log(`  Secondary pages:  ${countPass(secondaryResults)}/${secondaryResults.length}`);
  console.log(`  Product pages:    ${countPass(productResults)}/${productResults.length}`);
  console.log(`  Theme hub pages:  ${countPass(themeResults)}/${themeResults.length}`);
  console.log(`  Theme+grade pages: ${countPass(gradeResults)}/${gradeResults.length}`);
  console.log(`\n  ${C.bold}TOTAL: ${passCount}/${results.length}${C.reset} ${passCount === results.length ? C.pass + 'ALL PASS' + C.reset : C.fail + `${failCount} FAILURES` + C.reset}`);

  // Check distribution
  const checkStats = {
    http200: results.filter(r => r.checks.http200).length,
    title: results.filter(r => r.checks.title).length,
    metaDesc: results.filter(r => r.checks.metaDesc).length,
    canonical: results.filter(r => r.checks.canonical).length,
    hreflang: results.filter(r => r.checks.hreflang).length,
    jsonLd: results.filter(r => r.checks.jsonLd).length,
  };

  console.log(`\n${C.bold}Check Distribution${C.reset}`);
  for (const [check, count] of Object.entries(checkStats)) {
    const pct = ((count / results.length) * 100).toFixed(1);
    const icon = count === results.length ? `${C.pass}\u2713` : `${C.fail}\u2717`;
    console.log(`  ${icon}${C.reset} ${check}: ${count}/${results.length} (${pct}%)`);
  }

  // JSON report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    locale: 'en',
    totalPages: results.length,
    passCount,
    failCount,
    categories: {
      secondary: { total: secondaryResults.length, pass: countPass(secondaryResults) },
      product: { total: productResults.length, pass: countPass(productResults) },
      themeHub: { total: themeResults.length, pass: countPass(themeResults) },
      themeGrade: { total: gradeResults.length, pass: countPass(gradeResults) },
    },
    checkDistribution: checkStats,
    failures: results.filter(r => r.status === 'FAIL').map(r => ({
      url: r.url,
      issues: r.issues,
      checks: r.checks,
    })),
  };

  if (jsonPath) {
    const dir = path.dirname(jsonPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    console.log(`\n  Report saved to ${jsonPath}`);
  }

  // Always save default report
  const defaultPath = path.join(ROOT, 'docs', 'audit-results', 'part168-live-verification.json');
  const defaultDir = path.dirname(defaultPath);
  if (!fs.existsSync(defaultDir)) fs.mkdirSync(defaultDir, { recursive: true });
  fs.writeFileSync(defaultPath, JSON.stringify(report, null, 2));
  console.log(`  Report saved to docs/audit-results/part168-live-verification.json`);

  // Exit code
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(2);
});
