#!/usr/bin/env node
/**
 * Sitemap Submission & Verification (Part 169)
 *
 * Fetches all live sitemaps, spot-checks EN URLs, verifies robots.txt,
 * pings Google & Bing, and saves a comprehensive health report.
 *
 * Usage: node scripts/verify-sitemap-submission.js
 */

const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ─── Configuration ──────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.lessoncraftstudio.com';
const USER_AGENT = 'LCS-Sitemap-Submission-Verifier/1.0';
const REQUEST_TIMEOUT_MS = 20000;
const REQUEST_DELAY_MS = 300;

// Expected URL count ranges per numbered sitemap section (from validate-sitemap-urls.js)
const HEALTH_RANGES = {
  0: { min: 100, max: 130, label: 'Static pages' },
  1: { min: 330, max: 400, label: 'Product pages' },
  2: { min: 130, max: 160, label: 'Categories + grades' },
  3: { min: 500, max: 600, label: 'Theme hubs' },
  4: { min: 2500, max: 3000, label: 'Theme+grade combos' },
  5: { min: 50, max: 100, label: 'Blog categories' },
  6: { min: 1000, max: 4000, label: 'Blog posts' },
};

// Additional known sitemaps (no strict URL count ranges)
const KNOWN_EXTRA_SITEMAPS = ['sitemap-images.xml', 'sitemap-news.xml'];

// EN URLs to spot-check (from Part 168 — 339 EN pages verified)
const EN_SPOT_CHECK_URLS = [
  // Product pages (3)
  '/en/apps/addition-worksheets',
  '/en/apps/coloring-worksheets',
  '/en/apps/sudoku-worksheets',
  // Theme hubs (3)
  '/en/worksheets/animals',
  '/en/worksheets/dinosaurs',
  '/en/worksheets/space',
  // Theme+grade combos (3)
  '/en/worksheets/animals/preschool',
  '/en/worksheets/ocean/kindergarten',
  '/en/worksheets/robots/first-grade',
  // Secondary pages (3)
  '/en',
  '/en/apps',
  '/en/worksheets',
];

// ─── Utilities ──────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/**
 * Fetch a URL. Returns { statusCode, body, headers }.
 * Does NOT follow redirects by default (so we can detect redirect issues).
 */
function fetchRaw(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: timeoutMs, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms for ${url}`)); });
  });
}

/**
 * Fetch a URL following redirects. Returns body string.
 */
function fetchFollow(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: timeoutMs, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        fetchFollow(redirectUrl, timeoutMs).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms for ${url}`)); });
  });
}

/**
 * Extract <loc> values from XML.
 */
function extractLocs(xml) {
  const results = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

/**
 * Count <url> blocks in sitemap XML.
 */
function countUrlBlocks(xml) {
  const regex = /<url>/gi;
  let count = 0;
  while (regex.exec(xml) !== null) count++;
  return count;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();
  const results = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    sitemapIndex: { status: null, childSitemapCount: 0, childSitemapUrls: [] },
    childSitemaps: {},
    healthCounts: { status: 'UNKNOWN', details: [] },
    enSpotCheck: { status: 'UNKNOWN', total: EN_SPOT_CHECK_URLS.length, found: 0, missing: [] },
    robotsTxt: { status: 'UNKNOWN', hasSitemapDirective: false, sitemapUrl: null },
    searchEnginePings: {
      google: { status: 'UNKNOWN', url: null, httpStatus: null },
      bing: { status: 'UNKNOWN', url: null, httpStatus: null },
    },
    overallStatus: 'UNKNOWN',
    duration: null,
  };

  console.log('='.repeat(72));
  console.log('  SITEMAP SUBMISSION & VERIFICATION');
  console.log('  ' + new Date().toISOString());
  console.log('='.repeat(72));
  console.log('');

  // ── Step 1: Fetch sitemap index ───────────────────────────────────────────
  console.log('  [1/5] Fetching sitemap index...');
  let indexXml;
  try {
    const resp = await fetchRaw(`${BASE_URL}/sitemap_index.xml`);
    results.sitemapIndex.status = resp.statusCode === 200 ? 'OK' : `HTTP ${resp.statusCode}`;

    if (resp.statusCode === 200) {
      indexXml = resp.body;
    } else if (resp.statusCode >= 300 && resp.statusCode < 400) {
      // Follow redirect for sitemap index
      const redirectUrl = resp.headers.location;
      console.log(`    Redirected to: ${redirectUrl}`);
      indexXml = await fetchFollow(redirectUrl);
      results.sitemapIndex.status = 'OK (redirected)';
    } else {
      console.log(`    FAIL: HTTP ${resp.statusCode}`);
      results.sitemapIndex.status = `FAIL: HTTP ${resp.statusCode}`;
    }
  } catch (err) {
    console.log(`    FAIL: ${err.message}`);
    results.sitemapIndex.status = `FAIL: ${err.message}`;
  }

  if (!indexXml) {
    console.log('\n  FATAL: Could not fetch sitemap index. Aborting.');
    results.overallStatus = 'FAIL';
    writeReport(results, startTime);
    process.exit(1);
  }

  const childSitemapUrls = extractLocs(indexXml);
  results.sitemapIndex.childSitemapCount = childSitemapUrls.length;
  results.sitemapIndex.childSitemapUrls = childSitemapUrls;
  console.log(`    OK: ${childSitemapUrls.length} child sitemaps found`);

  // 7 numbered sitemaps (IDs 0-6) + extras (images, news) = 9 expected
  const numberedCount = childSitemapUrls.filter(u => /\/sitemap\/\d+\.xml/.test(u)).length;
  if (numberedCount !== 7) {
    console.log(`    WARN: Expected 7 numbered sitemaps, got ${numberedCount}`);
  }

  // ── Step 2: Fetch each child sitemap ──────────────────────────────────────
  console.log('\n  [2/5] Fetching child sitemaps...');
  const allSitemapUrls = new Set(); // All URLs across all sitemaps (for spot-check)

  for (const childUrl of childSitemapUrls) {
    const idMatch = childUrl.match(/\/sitemap\/(\d+)\.xml/);
    const sitemapId = idMatch ? parseInt(idMatch[1]) : null;
    // For non-numbered sitemaps, derive a label from the filename
    const extraMatch = childUrl.match(/\/([^/]+)\.xml$/);
    const sitemapKey = sitemapId !== null ? String(sitemapId) : (extraMatch ? extraMatch[1] : childUrl);

    await sleep(REQUEST_DELAY_MS);

    const childResult = {
      url: childUrl,
      status: 'UNKNOWN',
      urlCount: 0,
      healthStatus: 'OK',
    };

    try {
      const xml = await fetchFollow(childUrl);
      const urlCount = countUrlBlocks(xml);
      childResult.status = 'OK';
      childResult.urlCount = urlCount;

      // Collect all URLs for spot-check (only from numbered sitemaps)
      if (sitemapId !== null) {
        const locs = extractLocs(xml);
        for (const loc of locs) {
          allSitemapUrls.add(loc);
        }
      }

      // Check health range (only for numbered sitemaps)
      if (sitemapId !== null) {
        const range = HEALTH_RANGES[sitemapId];
        if (range) {
          if (urlCount < range.min) {
            childResult.healthStatus = `LOW (${urlCount} < ${range.min})`;
          } else if (urlCount > range.max) {
            childResult.healthStatus = `HIGH (${urlCount} > ${range.max})`;
          } else {
            childResult.healthStatus = 'OK';
          }
        }
      }

      const label = sitemapId !== null
        ? `ID ${sitemapId} (${HEALTH_RANGES[sitemapId]?.label || 'Unknown'})`
        : sitemapKey;
      console.log(`    ${label}: ${urlCount} URLs — ${childResult.healthStatus}`);
    } catch (err) {
      childResult.status = `FAIL: ${err.message}`;
      const label = sitemapId !== null ? `ID ${sitemapId}` : sitemapKey;
      console.log(`    ${label}: FAIL — ${err.message}`);
    }

    results.childSitemaps[sitemapKey] = childResult;
  }

  // Overall health count status (only evaluate numbered sitemaps 0-6)
  const numberedEntries = Object.entries(results.childSitemaps).filter(([k]) => /^\d+$/.test(k));
  const allHealthOk = numberedEntries.every(
    ([, c]) => c.healthStatus === 'OK' || c.healthStatus.startsWith('HIGH')
  );
  const anyFail = numberedEntries.some(
    ([, c]) => c.status.startsWith('FAIL') || c.healthStatus.startsWith('LOW')
  );
  results.healthCounts.status = anyFail ? 'FAIL' : allHealthOk ? 'PASS' : 'WARN';

  for (const [key, child] of Object.entries(results.childSitemaps)) {
    const numId = /^\d+$/.test(key) ? parseInt(key) : null;
    results.healthCounts.details.push({
      sitemapKey: key,
      urlCount: child.urlCount,
      expected: numId !== null ? (HEALTH_RANGES[numId] || null) : null,
      healthStatus: child.healthStatus,
    });
  }

  const totalUrls = Object.values(results.childSitemaps).reduce((s, c) => s + c.urlCount, 0);
  console.log(`    TOTAL: ${totalUrls} URLs across ${Object.keys(results.childSitemaps).length} sitemaps`);

  // ── Step 3: EN spot-check ─────────────────────────────────────────────────
  console.log('\n  [3/5] Spot-checking EN URLs...');
  let foundCount = 0;
  const missing = [];

  for (const enPath of EN_SPOT_CHECK_URLS) {
    const fullUrl = `${BASE_URL}${enPath}`;
    if (allSitemapUrls.has(fullUrl)) {
      foundCount++;
      console.log(`    FOUND: ${enPath}`);
    } else {
      missing.push(enPath);
      console.log(`    MISSING: ${enPath}`);
    }
  }

  results.enSpotCheck.found = foundCount;
  results.enSpotCheck.missing = missing;
  results.enSpotCheck.status = missing.length === 0 ? 'PASS' : `FAIL (${missing.length} missing)`;
  console.log(`    Result: ${foundCount}/${EN_SPOT_CHECK_URLS.length} found`);

  // ── Step 4: Verify robots.txt ─────────────────────────────────────────────
  console.log('\n  [4/5] Verifying robots.txt...');
  try {
    const robotsResp = await fetchRaw(`${BASE_URL}/robots.txt`);
    if (robotsResp.statusCode === 200) {
      const robotsBody = robotsResp.body;
      const sitemapMatch = robotsBody.match(/^Sitemap:\s*(.+)$/m);
      if (sitemapMatch) {
        results.robotsTxt.hasSitemapDirective = true;
        results.robotsTxt.sitemapUrl = sitemapMatch[1].trim();
        results.robotsTxt.status = 'PASS';
        console.log(`    OK: Sitemap directive found — ${results.robotsTxt.sitemapUrl}`);
      } else {
        results.robotsTxt.status = 'FAIL: No Sitemap directive';
        console.log('    FAIL: No Sitemap directive found');
      }
    } else {
      results.robotsTxt.status = `FAIL: HTTP ${robotsResp.statusCode}`;
      console.log(`    FAIL: HTTP ${robotsResp.statusCode}`);
    }
  } catch (err) {
    results.robotsTxt.status = `FAIL: ${err.message}`;
    console.log(`    FAIL: ${err.message}`);
  }

  // ── Step 5: Ping search engines ───────────────────────────────────────────
  console.log('\n  [5/5] Pinging search engines...');

  const sitemapIndexUrl = encodeURIComponent(`${BASE_URL}/sitemap_index.xml`);

  // Google ping (deprecated since 2023 — returns 404, which is expected)
  const googlePingUrl = `https://www.google.com/ping?sitemap=${sitemapIndexUrl}`;
  results.searchEnginePings.google.url = googlePingUrl;
  try {
    await sleep(REQUEST_DELAY_MS);
    const googleResp = await fetchRaw(googlePingUrl);
    results.searchEnginePings.google.httpStatus = googleResp.statusCode;
    if (googleResp.statusCode === 200) {
      results.searchEnginePings.google.status = 'OK';
    } else if (googleResp.statusCode === 404) {
      results.searchEnginePings.google.status = 'OK (deprecated endpoint — use Search Console)';
    } else {
      results.searchEnginePings.google.status = `HTTP ${googleResp.statusCode}`;
    }
    console.log(`    Google: HTTP ${googleResp.statusCode} — ${results.searchEnginePings.google.status}`);
  } catch (err) {
    results.searchEnginePings.google.status = `FAIL: ${err.message}`;
    console.log(`    Google: FAIL — ${err.message}`);
  }

  // Bing ping (deprecated — returns 410 Gone, which is expected)
  const bingPingUrl = `https://www.bing.com/ping?sitemap=${sitemapIndexUrl}`;
  results.searchEnginePings.bing.url = bingPingUrl;
  try {
    await sleep(REQUEST_DELAY_MS);
    const bingResp = await fetchRaw(bingPingUrl);
    results.searchEnginePings.bing.httpStatus = bingResp.statusCode;
    if (bingResp.statusCode === 200) {
      results.searchEnginePings.bing.status = 'OK';
    } else if (bingResp.statusCode === 410 || bingResp.statusCode === 404) {
      results.searchEnginePings.bing.status = 'OK (deprecated endpoint — use Bing Webmaster Tools)';
    } else if (bingResp.statusCode >= 200 && bingResp.statusCode < 400) {
      results.searchEnginePings.bing.status = 'OK';
    } else {
      results.searchEnginePings.bing.status = `HTTP ${bingResp.statusCode}`;
    }
    console.log(`    Bing:   HTTP ${bingResp.statusCode} — ${results.searchEnginePings.bing.status}`);
  } catch (err) {
    results.searchEnginePings.bing.status = `FAIL: ${err.message}`;
    console.log(`    Bing:   FAIL — ${err.message}`);
  }

  // ── Overall status ────────────────────────────────────────────────────────
  const checks = [
    results.sitemapIndex.status === 'OK' || results.sitemapIndex.status === 'OK (redirected)',
    !anyFail,
    results.enSpotCheck.status === 'PASS',
    results.robotsTxt.status === 'PASS',
    results.searchEnginePings.google.status.startsWith('OK'),
    results.searchEnginePings.bing.status.startsWith('OK'),
  ];
  const allPass = checks.every(Boolean);
  results.overallStatus = allPass ? 'PASS' : 'FAIL';

  // ── Summary ───────────────────────────────────────────────────────────────
  writeReport(results, startTime);

  console.log('\n' + '='.repeat(72));
  console.log('  SITEMAP SUBMISSION SUMMARY');
  console.log('='.repeat(72));
  console.log(`  Sitemap index:      ${results.sitemapIndex.status} (${results.sitemapIndex.childSitemapCount} child sitemaps)`);
  console.log(`  Health counts:      ${results.healthCounts.status} (${totalUrls} total URLs)`);
  console.log(`  EN spot-check:      ${results.enSpotCheck.status} (${foundCount}/${EN_SPOT_CHECK_URLS.length})`);
  console.log(`  robots.txt:         ${results.robotsTxt.status}`);
  console.log(`  Google ping:        ${results.searchEnginePings.google.status}`);
  console.log(`  Bing ping:          ${results.searchEnginePings.bing.status}`);
  console.log('');
  console.log(`  OVERALL: ${results.overallStatus}`);
  console.log('='.repeat(72));
  console.log('');

  process.exit(results.overallStatus === 'PASS' ? 0 : 1);
}

function writeReport(results, startTime) {
  results.duration = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
  const outputPath = path.join(__dirname, '..', 'docs', 'audit-results', 'part169-sitemap-submission.json');
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n  Report saved to: ${outputPath}`);
}

main().catch(err => {
  console.error('\nFATAL ERROR:', err.message);
  console.error(err.stack);
  process.exit(2);
});
