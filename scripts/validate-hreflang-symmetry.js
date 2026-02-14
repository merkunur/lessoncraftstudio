#!/usr/bin/env node
/**
 * Hreflang Symmetry Validation (Build-Time)
 *
 * Comprehensive validation of hreflang tags across ALL ~6,000 URLs.
 * Fetches sitemaps for 100% coverage, then samples HTML for parity checks.
 *
 * 6 Checks:
 *   1. SYMMETRY       - If A declares B, B must declare A back
 *   2. SELF_REFERENCE - Every page must include itself in its hreflang set
 *   3. X_DEFAULT      - Every hreflang set should include x-default
 *   4. SITEMAP_PARITY - HTML hreflang must match sitemap hreflang (sampled)
 *   5. CANONICAL      - <link rel="canonical"> must match page URL (sampled)
 *   6. NO_REDIRECT    - No hreflang target should return 301/302 (sampled)
 *
 * 5 Phases:
 *   Phase 1: Fetch sitemap index + 7 child sitemaps
 *   Phase 2: Validate symmetry, self-reference, x-default (in-memory)
 *   Phase 3: Fetch ~230 stratified HTML samples, check parity + canonical
 *   Phase 4: HEAD requests on hreflang targets for redirect detection
 *   Phase 5: Console summary + JSON report
 *
 * Usage:
 *   node scripts/validate-hreflang-symmetry.js
 *   node scripts/validate-hreflang-symmetry.js --sitemap-only
 *   node scripts/validate-hreflang-symmetry.js --base-url https://staging.example.com
 *   node scripts/validate-hreflang-symmetry.js --json path/to/output.json
 *   node scripts/validate-hreflang-symmetry.js --sample-size 50
 *
 * Exit codes:
 *   0 = All checks passed
 *   1 = Validation failures found
 *   2 = Fatal error (network, parsing)
 */

const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ─── Constants ──────────────────────────────────────────────────────────────────

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const HREFLANG_MAP = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

const HREFLANG_TO_LOCALE = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', 'pt-BR': 'pt',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

const SITEMAP_TYPE_MAP = {
  0: 'static', 1: 'product', 2: 'category-grade', 3: 'theme',
  4: 'theme-grade', 5: 'blog-category', 6: 'blog',
};

// Stratified sampling targets per locale
const SAMPLE_PER_LOCALE = {
  static: 2,
  product: 3,
  'category-grade': 2,
  theme: 3,
  'theme-grade': 4,
  'blog-category': 2,
  blog: 5,
};

const REQUEST_TIMEOUT_MS = 15000;
const USER_AGENT = 'LCS-Hreflang-Validator/1.0';

// CLI defaults
let BASE_URL = 'https://www.lessoncraftstudio.com';
let JSON_OUTPUT_PATH = null; // set after args parsed
let SAMPLE_SIZE_OVERRIDE = null;
let SITEMAP_ONLY = false;
let REQUEST_DELAY_MS = 300;

// ─── Utilities ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeUrl(url) {
  return url.replace(/\/$/, '').toLowerCase();
}

function extractLocaleFromUrl(url) {
  const match = url.match(/lessoncraftstudio\.com\/([a-z]{2})(?:\/|$)/);
  return match ? match[1] : null;
}

function fetchUrl(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: timeoutMs, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        fetchUrl(redirectUrl, timeoutMs).then(resolve).catch(reject);
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

function fetchNoRedirect(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      port: parsed.protocol === 'https:' ? 443 : (parsed.port || 80),
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' },
      timeout: timeoutMs,
    };
    const req = mod.request(options, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        res.resume();
        resolve({ statusCode: res.statusCode, headers: res.headers, body: '' });
        return;
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString('utf-8') });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms`)); });
    req.end();
  });
}

function fetchHead(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === 'https:' ? https : http;
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      port: parsed.protocol === 'https:' ? 443 : (parsed.port || 80),
      method: 'HEAD',
      headers: { 'User-Agent': USER_AGENT },
      timeout: timeoutMs,
    };
    const req = mod.request(options, (res) => {
      res.resume();
      resolve({ statusCode: res.statusCode, headers: res.headers });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms`)); });
    req.end();
  });
}

// ─── XML / HTML Parsers ─────────────────────────────────────────────────────────

function parseSitemapUrlBlocks(xml) {
  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/gi;
  const entries = [];
  let match;
  while ((match = urlBlockRegex.exec(xml)) !== null) {
    const block = match[1];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) continue;
    const loc = locMatch[1].trim();

    const hreflangs = {};
    const xhtmlRegex = /<xhtml:link\s+[^>]*rel=["']alternate["'][^>]*\/?>/gi;
    let xlMatch;
    while ((xlMatch = xhtmlRegex.exec(block)) !== null) {
      const tag = xlMatch[0];
      const hlMatch = tag.match(/hreflang=["']([^"']+)["']/i);
      const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
      if (hlMatch && hrefMatch) {
        hreflangs[hlMatch[1]] = hrefMatch[1];
      }
    }

    entries.push({ loc, hreflangs });
  }
  return entries;
}

function extractHreflangFromHtml(html) {
  const regex = /<link\s+[^>]*rel=["']alternate["'][^>]*>/gi;
  const result = {};
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const hlMatch = tag.match(/hreflang=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hlMatch && hrefMatch) {
      result[hlMatch[1]] = hrefMatch[1];
    }
  }
  return result;
}

function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (match) return match[1];
  // Try alternate attribute order
  const match2 = html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return match2 ? match2[1] : null;
}

function extractXmlLocs(xml) {
  const results = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

// ─── Phase 1: Collect Sitemap Data ──────────────────────────────────────────────

async function collectSitemapData() {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 1: COLLECT SITEMAP DATA');
  console.log('='.repeat(80));
  console.log('');

  console.log('  Fetching sitemap index...');
  let indexXml;
  try {
    indexXml = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  } catch (err) {
    console.error(`  FATAL: Could not fetch sitemap.xml: ${err.message}`);
    process.exit(2);
  }

  const childUrls = extractXmlLocs(indexXml);
  console.log(`  Found ${childUrls.length} child sitemaps`);

  // sitemapMap: normalizedUrl -> { hreflangs: { code: url }, sitemapId, type, rawUrl }
  const sitemapMap = new Map();
  const stats = { bySection: {}, totalUrls: 0, urlsWithHreflang: 0, byType: {} };

  for (let i = 0; i < childUrls.length; i++) {
    const childUrl = childUrls[i];
    const idMatch = childUrl.match(/\/sitemap\/(\d+)\.xml/);
    const sitemapId = idMatch ? parseInt(idMatch[1]) : i;

    await sleep(REQUEST_DELAY_MS);
    console.log(`  Fetching sitemap/${sitemapId}.xml...`);

    try {
      const xml = await fetchUrl(childUrl);
      const entries = parseSitemapUrlBlocks(xml);

      stats.bySection[sitemapId] = entries.length;
      stats.totalUrls += entries.length;

      for (const entry of entries) {
        const type = SITEMAP_TYPE_MAP[sitemapId] || 'unknown';
        const normUrl = normalizeUrl(entry.loc);
        const newHlCount = Object.keys(entry.hreflangs).length;

        // Don't overwrite an entry that has hreflang with one that doesn't
        const existing = sitemapMap.get(normUrl);
        if (existing) {
          const existingHlCount = Object.keys(existing.hreflangs).length;
          if (existingHlCount > 0 && newHlCount === 0) {
            // Skip: keep the richer entry
            stats.byType[type] = (stats.byType[type] || 0) + 1;
            continue;
          }
        }

        sitemapMap.set(normUrl, {
          hreflangs: entry.hreflangs,
          sitemapId,
          type,
          rawUrl: entry.loc,
        });

        stats.byType[type] = (stats.byType[type] || 0) + 1;
      }

      // Count unique URLs with hreflang (computed after all sitemaps to avoid double-counting)

      const withHL = entries.filter(e => Object.keys(e.hreflangs).length > 0).length;
      console.log(`    ${entries.length} URLs, ${withHL} with hreflang`);
    } catch (err) {
      console.log(`    ERROR: ${err.message}`);
      stats.bySection[sitemapId] = 0;
    }
  }

  // Compute accurate urlsWithHreflang after all sitemaps (no double-counting from overwrites)
  for (const [, entry] of sitemapMap) {
    if (Object.keys(entry.hreflangs).length > 0) {
      stats.urlsWithHreflang++;
    }
  }
  stats.uniqueUrls = sitemapMap.size;

  console.log('');
  console.log('  Sitemap Summary:');
  console.log('  ' + '-'.repeat(50));
  console.log(`  Total sitemap entries: ${stats.totalUrls}`);
  console.log(`  Unique URLs (after dedup): ${stats.uniqueUrls}`);
  console.log(`  URLs with hreflang: ${stats.urlsWithHreflang}`);
  console.log('');
  for (const [section, count] of Object.entries(stats.bySection).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
    const typeName = SITEMAP_TYPE_MAP[section] || 'unknown';
    console.log(`    sitemap/${section}.xml: ${count} URLs (${typeName})`);
  }

  return { sitemapMap, stats };
}

// ─── Phase 2: Validate Sitemap-Level Checks ─────────────────────────────────────

function validateSitemapLevel(sitemapMap) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 2: SITEMAP-LEVEL VALIDATION (SYMMETRY, SELF-REF, X-DEFAULT)');
  console.log('='.repeat(80));
  console.log('');

  const issues = [];
  let symmetryChecked = 0;
  let selfRefChecked = 0;
  let xDefaultChecked = 0;

  for (const [normUrl, entry] of sitemapMap) {
    const hreflangs = entry.hreflangs;
    const hlCount = Object.keys(hreflangs).length;

    // Skip URLs with no hreflang (e.g., standalone pages)
    if (hlCount === 0) continue;

    const locale = extractLocaleFromUrl(normUrl);
    if (!locale) continue;

    const codeA = HREFLANG_MAP[locale];
    if (!codeA) continue;

    // ── Check 1: SELF_REFERENCE ──
    selfRefChecked++;
    const selfHref = hreflangs[codeA];
    if (!selfHref) {
      issues.push({
        check: 'SELF_REFERENCE',
        severity: 'HIGH',
        url: entry.rawUrl,
        type: entry.type,
        detail: `Missing self-referencing hreflang="${codeA}" for locale ${locale}`,
      });
    } else if (normalizeUrl(selfHref) !== normUrl) {
      issues.push({
        check: 'SELF_REFERENCE',
        severity: 'HIGH',
        url: entry.rawUrl,
        type: entry.type,
        detail: `Self-ref hreflang="${codeA}" points to ${selfHref} instead of ${entry.rawUrl}`,
      });
    }

    // ── Check 2: X_DEFAULT ──
    xDefaultChecked++;
    if (!hreflangs['x-default']) {
      issues.push({
        check: 'X_DEFAULT',
        severity: 'MEDIUM',
        url: entry.rawUrl,
        type: entry.type,
        detail: `Missing x-default hreflang entry`,
      });
    }

    // ── Check 3: SYMMETRY ──
    for (const [hreflangCode, targetUrl] of Object.entries(hreflangs)) {
      if (hreflangCode === 'x-default') continue;

      symmetryChecked++;
      const normTarget = normalizeUrl(targetUrl);
      const targetEntry = sitemapMap.get(normTarget);

      if (!targetEntry) {
        issues.push({
          check: 'SYMMETRY',
          severity: 'CRITICAL',
          url: entry.rawUrl,
          type: entry.type,
          detail: `hreflang="${hreflangCode}" target ${targetUrl} not found in sitemap`,
          targetUrl,
          hreflangCode,
        });
        continue;
      }

      const targetHreflangs = targetEntry.hreflangs;
      const backRef = targetHreflangs[codeA];

      if (!backRef) {
        issues.push({
          check: 'SYMMETRY',
          severity: 'CRITICAL',
          url: entry.rawUrl,
          type: entry.type,
          detail: `${entry.rawUrl} [${codeA}] -> ${targetUrl} [${hreflangCode}], but target has no hreflang="${codeA}" back`,
          targetUrl,
          hreflangCode,
        });
      } else if (normalizeUrl(backRef) !== normUrl) {
        issues.push({
          check: 'SYMMETRY',
          severity: 'CRITICAL',
          url: entry.rawUrl,
          type: entry.type,
          detail: `${entry.rawUrl} [${codeA}] -> ${targetUrl} [${hreflangCode}], but target's hreflang="${codeA}" points to ${backRef} (not back)`,
          targetUrl,
          hreflangCode,
          backRef,
        });
      }
    }
  }

  // Summarize
  const byCheck = {};
  for (const issue of issues) {
    byCheck[issue.check] = (byCheck[issue.check] || 0) + 1;
  }

  console.log(`  Symmetry pairs checked: ${symmetryChecked}`);
  console.log(`  Self-reference checked: ${selfRefChecked}`);
  console.log(`  X-default checked: ${xDefaultChecked}`);
  console.log(`  Issues found: ${issues.length}`);
  console.log('');

  if (Object.keys(byCheck).length > 0) {
    console.log('  Issues by check:');
    for (const [check, count] of Object.entries(byCheck).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${check}: ${count}`);
    }
    console.log('');

    // Print first 20 issues in detail
    const shown = issues.slice(0, 20);
    console.log(`  First ${shown.length} issues (of ${issues.length}):`);
    console.log('  ' + '-'.repeat(70));
    for (const issue of shown) {
      console.log(`  [${issue.severity}] ${issue.check} (${issue.type})`);
      console.log(`    ${issue.detail}`);
    }
    if (issues.length > 20) {
      console.log(`  ... and ${issues.length - 20} more issues`);
    }
    console.log('');
  } else {
    console.log('  All sitemap-level checks PASSED');
    console.log('');
  }

  return { issues, symmetryChecked, selfRefChecked, xDefaultChecked };
}

// ─── Phase 3: HTML Parity + Canonical (Sampled) ─────────────────────────────────

async function validateHtmlParity(sitemapMap) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 3: HTML PARITY + CANONICAL (STRATIFIED SAMPLE)');
  console.log('='.repeat(80));
  console.log('');

  // Group URLs by type -> by locale
  const byTypeLocale = {};
  for (const [normUrl, entry] of sitemapMap) {
    if (Object.keys(entry.hreflangs).length === 0) continue;
    const locale = extractLocaleFromUrl(normUrl);
    if (!locale) continue;
    const key = entry.type;
    if (!byTypeLocale[key]) byTypeLocale[key] = {};
    if (!byTypeLocale[key][locale]) byTypeLocale[key][locale] = [];
    byTypeLocale[key][locale].push(entry.rawUrl);
  }

  // Build stratified sample
  const sampled = [];
  for (const [type, perLocale] of Object.entries(SAMPLE_PER_LOCALE)) {
    const typeGroup = byTypeLocale[type];
    if (!typeGroup) continue;

    const target = SAMPLE_SIZE_OVERRIDE
      ? Math.ceil(SAMPLE_SIZE_OVERRIDE * (perLocale / Object.values(SAMPLE_PER_LOCALE).reduce((s, v) => s + v, 0)))
      : perLocale;

    for (const locale of ALL_LOCALES) {
      const urls = typeGroup[locale] || [];
      const picked = shuffle(urls).slice(0, target);
      for (const url of picked) {
        sampled.push({ url, type, locale });
      }
    }
  }

  console.log(`  Sample size: ${sampled.length} URLs`);
  const byType = {};
  for (const s of sampled) byType[s.type] = (byType[s.type] || 0) + 1;
  for (const [type, count] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${type}: ${count}`);
  }
  console.log('');

  const parityIssues = [];
  const canonicalIssues = [];
  let totalFetched = 0;
  let fetchErrors = 0;

  for (let i = 0; i < sampled.length; i++) {
    const { url, type, locale } = sampled[i];
    const idx = `[${String(i + 1).padStart(3)}/${sampled.length}]`;

    await sleep(REQUEST_DELAY_MS);

    try {
      const resp = await fetchNoRedirect(url);

      if (resp.statusCode === 429) {
        console.log(`${idx} 429 RATE LIMITED - backing off...`);
        REQUEST_DELAY_MS = Math.min(REQUEST_DELAY_MS * 2, 2000);
        await sleep(2000);
        // Retry once
        try {
          const retry = await fetchNoRedirect(url);
          resp.statusCode = retry.statusCode;
          resp.body = retry.body;
          resp.headers = retry.headers;
        } catch (retryErr) {
          fetchErrors++;
          console.log(`${idx} ERROR (retry) ${type.padEnd(14)} /${locale}/`);
          continue;
        }
      }

      if (resp.statusCode !== 200) {
        console.log(`${idx} ${resp.statusCode} ${type.padEnd(14)} /${locale}/ (skipped)`);
        continue;
      }

      totalFetched++;
      const htmlHreflangs = extractHreflangFromHtml(resp.body);
      const canonical = extractCanonical(resp.body);
      const htmlCount = Object.keys(htmlHreflangs).length;

      const normUrl = normalizeUrl(url);
      const sitemapEntry = sitemapMap.get(normUrl);
      const sitemapHreflangs = sitemapEntry ? sitemapEntry.hreflangs : {};
      const sitemapCount = Object.keys(sitemapHreflangs).length;

      // ── Check 4: SITEMAP_PARITY ──
      // Compare hreflang sets
      const allCodes = new Set([...Object.keys(sitemapHreflangs), ...Object.keys(htmlHreflangs)]);
      const mismatches = [];

      for (const code of allCodes) {
        const sitmapHref = sitemapHreflangs[code] ? normalizeUrl(sitemapHreflangs[code]) : null;
        const htmlHref = htmlHreflangs[code] ? normalizeUrl(htmlHreflangs[code]) : null;

        if (!sitmapHref && htmlHref) {
          mismatches.push({ code, issue: 'HTML_ONLY', htmlHref });
        } else if (sitmapHref && !htmlHref) {
          mismatches.push({ code, issue: 'SITEMAP_ONLY', sitmapHref });
        } else if (sitmapHref && htmlHref && sitmapHref !== htmlHref) {
          mismatches.push({ code, issue: 'URL_MISMATCH', sitmapHref, htmlHref });
        }
      }

      if (mismatches.length > 0) {
        parityIssues.push({
          check: 'SITEMAP_PARITY',
          severity: 'HIGH',
          url,
          type,
          locale,
          sitemapCount,
          htmlCount,
          mismatches,
        });
      }

      // ── Check 5: CANONICAL ──
      if (canonical) {
        const normCanonical = normalizeUrl(canonical);
        if (normCanonical !== normUrl) {
          canonicalIssues.push({
            check: 'CANONICAL',
            severity: 'HIGH',
            url,
            type,
            locale,
            canonical,
            detail: `Canonical ${canonical} does not match page URL ${url}`,
          });
        }
      }

      const status = mismatches.length > 0 ? 'PARITY_ISSUE' : 'OK';
      const slug = url.substring(url.lastIndexOf('/') + 1).substring(0, 35);
      console.log(`${idx} 200 ${type.padEnd(14)} /${locale}/ ${slug} (S:${sitemapCount} H:${htmlCount}) ${status}`);

    } catch (err) {
      fetchErrors++;
      console.log(`${idx} ERROR ${type.padEnd(14)} /${locale}/ ${err.message.substring(0, 50)}`);
    }
  }

  console.log('');
  console.log(`  Fetched: ${totalFetched}, Errors: ${fetchErrors}`);
  console.log(`  Parity issues: ${parityIssues.length}`);
  console.log(`  Canonical issues: ${canonicalIssues.length}`);

  if (parityIssues.length > 0) {
    console.log('');
    console.log('  Parity issues:');
    console.log('  ' + '-'.repeat(70));
    for (const issue of parityIssues.slice(0, 15)) {
      console.log(`  ${issue.url}`);
      console.log(`    Type: ${issue.type} | Sitemap: ${issue.sitemapCount} | HTML: ${issue.htmlCount}`);
      for (const m of issue.mismatches) {
        if (m.issue === 'URL_MISMATCH') {
          console.log(`    [${m.code}] URL_MISMATCH: sitemap=${m.sitmapHref} vs html=${m.htmlHref}`);
        } else if (m.issue === 'HTML_ONLY') {
          console.log(`    [${m.code}] HTML_ONLY: ${m.htmlHref}`);
        } else if (m.issue === 'SITEMAP_ONLY') {
          console.log(`    [${m.code}] SITEMAP_ONLY: ${m.sitmapHref}`);
        }
      }
    }
    if (parityIssues.length > 15) {
      console.log(`  ... and ${parityIssues.length - 15} more`);
    }
  }

  if (canonicalIssues.length > 0) {
    console.log('');
    console.log('  Canonical issues:');
    console.log('  ' + '-'.repeat(70));
    for (const issue of canonicalIssues.slice(0, 10)) {
      console.log(`  ${issue.url}`);
      console.log(`    Canonical: ${issue.canonical}`);
    }
    if (canonicalIssues.length > 10) {
      console.log(`  ... and ${canonicalIssues.length - 10} more`);
    }
  }

  console.log('');

  return {
    parityIssues,
    canonicalIssues,
    totalFetched,
    fetchErrors,
    sampleSize: sampled.length,
    sampled, // keep for Phase 4
  };
}

// ─── Phase 4: No-Redirect Check (Sampled) ───────────────────────────────────────

async function validateNoRedirects(sitemapMap, sampledPages) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 4: NO-REDIRECT CHECK ON HREFLANG TARGETS');
  console.log('='.repeat(80));
  console.log('');

  // Collect unique hreflang target URLs from sampled pages
  const targetUrls = new Set();
  for (const page of sampledPages) {
    const normUrl = normalizeUrl(page.url);
    const entry = sitemapMap.get(normUrl);
    if (!entry) continue;
    for (const [code, href] of Object.entries(entry.hreflangs)) {
      if (code === 'x-default') continue;
      targetUrls.add(href);
    }
  }

  console.log(`  Unique hreflang targets to check: ${targetUrls.size}`);

  // Cap at ~500 to keep runtime reasonable
  const targets = [...targetUrls];
  const capped = targets.length > 500 ? shuffle(targets).slice(0, 500) : targets;
  if (targets.length > 500) {
    console.log(`  Capped to 500 (from ${targets.length})`);
  }
  console.log('');

  const redirectIssues = [];
  let checked = 0;

  for (let i = 0; i < capped.length; i++) {
    const targetUrl = capped[i];
    const idx = `[${String(i + 1).padStart(3)}/${capped.length}]`;

    await sleep(Math.max(REQUEST_DELAY_MS / 2, 100)); // faster for HEAD

    try {
      const resp = await fetchHead(targetUrl);
      checked++;

      if ([301, 302, 307, 308].includes(resp.statusCode)) {
        const location = resp.headers.location || '(unknown)';
        redirectIssues.push({
          check: 'NO_REDIRECT',
          severity: 'CRITICAL',
          url: targetUrl,
          statusCode: resp.statusCode,
          location,
        });
        console.log(`${idx} ${resp.statusCode} REDIRECT -> ${location.substring(0, 60)}`);
      } else if (resp.statusCode === 429) {
        console.log(`${idx} 429 RATE LIMITED - backing off...`);
        REQUEST_DELAY_MS = Math.min(REQUEST_DELAY_MS * 2, 2000);
        await sleep(2000);
        i--; // retry
        continue;
      } else if (resp.statusCode !== 200) {
        console.log(`${idx} ${resp.statusCode} ${targetUrl.substring(BASE_URL.length)}`);
      }
      // 200 is fine, no output needed for success
    } catch (err) {
      console.log(`${idx} ERROR ${err.message.substring(0, 50)}`);
    }
  }

  console.log('');
  console.log(`  Checked: ${checked}`);
  console.log(`  Redirects found: ${redirectIssues.length}`);

  if (redirectIssues.length > 0) {
    console.log('');
    console.log('  Redirect issues:');
    console.log('  ' + '-'.repeat(70));
    for (const issue of redirectIssues.slice(0, 20)) {
      console.log(`  ${issue.statusCode} ${issue.url}`);
      console.log(`    -> ${issue.location}`);
    }
    if (redirectIssues.length > 20) {
      console.log(`  ... and ${redirectIssues.length - 20} more`);
    }
  }

  console.log('');

  return { redirectIssues, checked };
}

// ─── Phase 5: Report ────────────────────────────────────────────────────────────

function generateReport(stats, sitemapResult, htmlResult, redirectResult) {
  const allIssues = [
    ...sitemapResult.issues,
    ...(htmlResult ? htmlResult.parityIssues : []),
    ...(htmlResult ? htmlResult.canonicalIssues : []),
    ...(redirectResult ? redirectResult.redirectIssues : []),
  ];

  const byCheck = {};
  const byType = {};
  const bySeverity = {};

  for (const issue of allIssues) {
    byCheck[issue.check] = (byCheck[issue.check] || 0) + 1;
    if (issue.type) byType[issue.type] = (byType[issue.type] || 0) + 1;
    bySeverity[issue.severity] = (bySeverity[issue.severity] || 0) + 1;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    config: {
      baseUrl: BASE_URL,
      sitemapOnly: SITEMAP_ONLY,
    },
    sitemapStats: {
      totalUrls: stats.totalUrls,
      urlsWithHreflang: stats.urlsWithHreflang,
      bySection: stats.bySection,
      byType: stats.byType,
    },
    summary: {
      totalIssues: allIssues.length,
      byCheck,
      byType,
      bySeverity,
      passed: allIssues.length === 0,
    },
    sitemapValidation: {
      symmetryPairsChecked: sitemapResult.symmetryChecked,
      selfRefChecked: sitemapResult.selfRefChecked,
      xDefaultChecked: sitemapResult.xDefaultChecked,
      issueCount: sitemapResult.issues.length,
      issues: sitemapResult.issues,
    },
  };

  if (htmlResult) {
    report.htmlValidation = {
      sampleSize: htmlResult.sampleSize,
      totalFetched: htmlResult.totalFetched,
      fetchErrors: htmlResult.fetchErrors,
      parityIssueCount: htmlResult.parityIssues.length,
      canonicalIssueCount: htmlResult.canonicalIssues.length,
      parityIssues: htmlResult.parityIssues,
      canonicalIssues: htmlResult.canonicalIssues,
    };
  }

  if (redirectResult) {
    report.redirectValidation = {
      targetsChecked: redirectResult.checked,
      redirectIssueCount: redirectResult.redirectIssues.length,
      redirectIssues: redirectResult.redirectIssues,
    };
  }

  return report;
}

// ─── CLI Args ───────────────────────────────────────────────────────────────────

function parseCliArgs() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--base-url':
        BASE_URL = args[++i];
        break;
      case '--json':
        JSON_OUTPUT_PATH = args[++i];
        break;
      case '--sample-size':
        SAMPLE_SIZE_OVERRIDE = parseInt(args[++i]);
        break;
      case '--sitemap-only':
        SITEMAP_ONLY = true;
        break;
      case '--help':
      case '-h':
        console.log('Usage: node scripts/validate-hreflang-symmetry.js [options]');
        console.log('');
        console.log('Options:');
        console.log('  --base-url URL     Base URL (default: https://www.lessoncraftstudio.com)');
        console.log('  --json PATH        Custom JSON output path');
        console.log('  --sample-size N    Override total HTML sample size');
        console.log('  --sitemap-only     Skip HTML sampling (Phases 3-4)');
        console.log('  --help, -h         Show this help');
        process.exit(0);
    }
  }

  if (!JSON_OUTPUT_PATH) {
    JSON_OUTPUT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'hreflang-symmetry.json');
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  parseCliArgs();
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  LESSONCRAFTSTUDIO HREFLANG SYMMETRY VALIDATION');
  console.log('  ' + new Date().toISOString());
  console.log('  Base URL: ' + BASE_URL);
  console.log('  Mode: ' + (SITEMAP_ONLY ? 'Sitemap-only (fast)' : 'Full (sitemap + HTML sampling)'));
  console.log('='.repeat(80));

  // Phase 1: Collect sitemap data
  const { sitemapMap, stats } = await collectSitemapData();

  // Phase 2: Sitemap-level validation
  const sitemapResult = validateSitemapLevel(sitemapMap);

  // Phase 3 & 4: HTML parity + redirect checks (unless --sitemap-only)
  let htmlResult = null;
  let redirectResult = null;

  if (!SITEMAP_ONLY) {
    htmlResult = await validateHtmlParity(sitemapMap);
    redirectResult = await validateNoRedirects(sitemapMap, htmlResult.sampled);
  }

  // Phase 5: Generate report
  const report = generateReport(stats, sitemapResult, htmlResult, redirectResult);

  // Write JSON report
  const outputDir = path.dirname(JSON_OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(report, null, 2));

  // Final summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('='.repeat(80));
  console.log('  VALIDATION COMPLETE');
  console.log('='.repeat(80));
  console.log('');
  console.log(`  Duration: ${elapsed}s`);
  console.log(`  Sitemap URLs: ${stats.totalUrls}`);
  console.log(`  URLs with hreflang: ${stats.urlsWithHreflang}`);
  console.log('');
  console.log('  Results:');
  console.log('  ' + '-'.repeat(50));
  console.log(`  SYMMETRY:       ${sitemapResult.issues.filter(i => i.check === 'SYMMETRY').length === 0 ? 'PASS' : 'FAIL (' + sitemapResult.issues.filter(i => i.check === 'SYMMETRY').length + ' issues)'}`);
  console.log(`  SELF_REFERENCE: ${sitemapResult.issues.filter(i => i.check === 'SELF_REFERENCE').length === 0 ? 'PASS' : 'FAIL (' + sitemapResult.issues.filter(i => i.check === 'SELF_REFERENCE').length + ' issues)'}`);
  console.log(`  X_DEFAULT:      ${sitemapResult.issues.filter(i => i.check === 'X_DEFAULT').length === 0 ? 'PASS' : 'FAIL (' + sitemapResult.issues.filter(i => i.check === 'X_DEFAULT').length + ' issues)'}`);

  if (htmlResult) {
    console.log(`  SITEMAP_PARITY: ${htmlResult.parityIssues.length === 0 ? 'PASS' : 'FAIL (' + htmlResult.parityIssues.length + ' issues)'}`);
    console.log(`  CANONICAL:      ${htmlResult.canonicalIssues.length === 0 ? 'PASS' : 'FAIL (' + htmlResult.canonicalIssues.length + ' issues)'}`);
  } else {
    console.log(`  SITEMAP_PARITY: SKIPPED (--sitemap-only)`);
    console.log(`  CANONICAL:      SKIPPED (--sitemap-only)`);
  }

  if (redirectResult) {
    console.log(`  NO_REDIRECT:    ${redirectResult.redirectIssues.length === 0 ? 'PASS' : 'FAIL (' + redirectResult.redirectIssues.length + ' issues)'}`);
  } else {
    console.log(`  NO_REDIRECT:    SKIPPED (--sitemap-only)`);
  }

  console.log('');

  const totalIssues = report.summary.totalIssues;
  if (totalIssues === 0) {
    console.log('  RESULT: ALL CHECKS PASSED');
  } else {
    console.log(`  RESULT: ${totalIssues} ISSUES FOUND`);
    if (report.summary.bySeverity.CRITICAL) {
      console.log(`    CRITICAL: ${report.summary.bySeverity.CRITICAL}`);
    }
    if (report.summary.bySeverity.HIGH) {
      console.log(`    HIGH: ${report.summary.bySeverity.HIGH}`);
    }
    if (report.summary.bySeverity.MEDIUM) {
      console.log(`    MEDIUM: ${report.summary.bySeverity.MEDIUM}`);
    }
  }

  console.log('');
  console.log(`  Report saved to: ${JSON_OUTPUT_PATH}`);
  console.log('');

  process.exit(totalIssues > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(2);
});
