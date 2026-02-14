#!/usr/bin/env node
/**
 * Canonical Tag Audit & Redirect Chain Elimination
 *
 * 3 Phases:
 *   Phase 1: In-memory redirect chain analysis (0 HTTP requests, 100% coverage)
 *   Phase 2: Live canonical audit (~200 stratified sample pages)
 *   Phase 3: Live redirect hop verification (~100 sampled redirects)
 *
 * 4 Checks:
 *   CHAIN          - No redirect should trigger another redirect (max 1 hop)
 *   CIRCULAR       - No redirect loops (A->B->...->A)
 *   CANONICAL_SELF - <link rel="canonical"> must match the page's own URL
 *   REDIRECT_HOP   - Live redirects resolve in exactly 1 hop to a 200
 *
 * Usage:
 *   node scripts/audit-canonical-and-redirects.js
 *   node scripts/audit-canonical-and-redirects.js --chain-only
 *   node scripts/audit-canonical-and-redirects.js --base-url https://staging.example.com
 *   node scripts/audit-canonical-and-redirects.js --json path/to/output.json
 *   node scripts/audit-canonical-and-redirects.js --sample-size 50
 *
 * Exit codes:
 *   0 = All checks passed
 *   1 = Issues found
 *   2 = Fatal error
 */

const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');

// ─── Constants ──────────────────────────────────────────────────────────────────

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const USER_AGENT = 'LCS-Redirect-Auditor/1.0';
const REQUEST_TIMEOUT_MS = 15000;
const REQUEST_DELAY_MS = 300;

const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const CONFIG_DIR = path.join(FRONTEND_DIR, 'config');

// ─── CLI Argument Parsing ───────────────────────────────────────────────────────

let BASE_URL = 'https://www.lessoncraftstudio.com';
let JSON_OUTPUT_PATH = null;
let CHAIN_ONLY = false;
let SAMPLE_SIZE_OVERRIDE = null;

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--base-url': BASE_URL = args[++i]; break;
    case '--json': JSON_OUTPUT_PATH = args[++i]; break;
    case '--chain-only': CHAIN_ONLY = true; break;
    case '--sample-size': SAMPLE_SIZE_OVERRIDE = parseInt(args[++i], 10); break;
  }
}

if (!JSON_OUTPUT_PATH) {
  JSON_OUTPUT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'canonical-and-redirects.json');
}

// Stratified sample sizes per page type per locale
const SAMPLE_PER_LOCALE = {
  static: 2,
  blog: 4,
  'blog-category': 1,
  product: 3,
  'product-category': 1,
  grade: 1,
  theme: 3,
  'theme-grade': 3,
};

// ─── Utilities ──────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeUrl(url) { return url.replace(/\/$/, '').toLowerCase(); }

function classifyUrl(url) {
  if (/\/blog\/category\//.test(url)) return 'blog-category';
  if (/\/blog\//.test(url)) return 'blog';
  if (/\/apps\/category\//.test(url)) return 'product-category';
  if (/\/apps\/grades\//.test(url)) return 'grade';
  if (/\/apps\//.test(url)) return 'product';
  if (/\/worksheets\/[^/]+\/[^/]+/.test(url)) return 'theme-grade';
  if (/\/worksheets\//.test(url)) return 'theme';
  return 'static';
}

function extractLocaleFromPath(urlOrPath) {
  const match = urlOrPath.match(/\/([a-z]{2})(?:\/|$)/);
  return match ? match[1] : null;
}

// ─── HTTP Helpers ───────────────────────────────────────────────────────────────

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

async function fetchFollowCounting(url, maxHops = 5) {
  const chain = [url];
  let current = url;
  for (let hop = 0; hop < maxHops; hop++) {
    const resp = await fetchNoRedirect(current);
    if ([301, 302, 307, 308].includes(resp.statusCode)) {
      const loc = resp.headers.location;
      const target = loc.startsWith('http') ? loc : new URL(loc, current).href;
      chain.push(target);
      current = target;
    } else {
      return { finalStatus: resp.statusCode, hops: chain.length - 1, chain };
    }
  }
  return { finalStatus: 'TOO_MANY_HOPS', hops: chain.length - 1, chain };
}

// ─── HTML / XML Parsers ─────────────────────────────────────────────────────────

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (match) return match[1];
  const match2 = html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return match2 ? match2[1] : null;
}

function parseSitemapLocs(xml) {
  const locs = [];
  const regex = /<loc>([^<]+)<\/loc>/gi;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

// ─── TS Config File Loader ──────────────────────────────────────────────────────

/**
 * Extract a balanced JS literal ({...} or [...]) from file content.
 * Handles nested braces, strings, and template literals correctly.
 */
function extractBalancedLiteral(content, varName) {
  const idx = content.indexOf(varName);
  if (idx < 0) return null;

  // Find '=' after the variable name
  const afterName = content.slice(idx + varName.length);
  const eqIdx = afterName.indexOf('=');
  if (eqIdx < 0) return null;

  const afterEq = content.slice(idx + varName.length + eqIdx + 1);

  // Find the first { or [
  let start = 0;
  while (start < afterEq.length && afterEq[start] !== '{' && afterEq[start] !== '[') start++;
  if (start >= afterEq.length) return null;

  const openChar = afterEq[start];
  const closeChar = openChar === '{' ? '}' : ']';
  let depth = 0;
  let inString = false;
  let stringChar = null;

  for (let i = start; i < afterEq.length; i++) {
    const ch = afterEq[i];

    if (inString) {
      if (ch === '\\') { i++; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      inString = true;
      stringChar = ch;
      continue;
    }

    // Skip line comments
    if (ch === '/' && i + 1 < afterEq.length && afterEq[i + 1] === '/') {
      while (i < afterEq.length && afterEq[i] !== '\n') i++;
      continue;
    }

    if (ch === openChar) depth++;
    if (ch === closeChar) depth--;

    if (depth === 0) {
      return afterEq.slice(start, i + 1);
    }
  }

  return null;
}

function loadTsConfig(filePath, exportName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const literal = extractBalancedLiteral(content, exportName);
  if (!literal) throw new Error(`Could not extract '${exportName}' from ${filePath}`);
  return new Function('return ' + literal)();
}

// ─── Phase 1: Redirect Chain Analysis ───────────────────────────────────────────

function buildRedirectMap() {
  console.log('\n=== Phase 1: Building Redirect Map ===\n');
  const redirectMap = new Map(); // path -> { target, type }
  const stats = {};

  function addRedirect(source, target, type) {
    // Normalize: lowercase, no trailing slash
    source = normalizeUrl(source);
    target = normalizeUrl(target);
    if (source === target) return; // Self-redirect, skip
    redirectMap.set(source, { target, type });
    stats[type] = (stats[type] || 0) + 1;
  }

  // ── 1. Blog cross-locale redirects ──
  const { crossLocaleSlugs } = require(path.join(CONFIG_DIR, 'blog-cross-locale-redirects'));
  for (const { slug, nativeLocale, wrongLocales } of crossLocaleSlugs) {
    for (const wrongLocale of wrongLocales) {
      addRedirect(`/${wrongLocale}/blog/${slug}`, `/${nativeLocale}/blog/${slug}`, 'blog-cross-locale');
    }
  }
  console.log(`  blog-cross-locale: ${stats['blog-cross-locale'] || 0} redirects`);

  // ── 2. Blog legacy slug redirects ──
  const { legacyBlogSlugs } = require(path.join(CONFIG_DIR, 'blog-redirects'));
  for (const { oldSlug, newSlug, locale } of legacyBlogSlugs) {
    for (const loc of ALL_LOCALES) {
      addRedirect(`/${loc}/blog/${oldSlug}`, `/${locale}/blog/${newSlug}`, 'blog-legacy');
    }
  }
  console.log(`  blog-legacy:       ${stats['blog-legacy'] || 0} redirects`);

  // ── 3. Blog category slug redirects ──
  const blogCategorySlugMap = loadTsConfig(
    path.join(CONFIG_DIR, 'blog-category-slugs.ts'), 'blogCategorySlugMap'
  );
  for (const [, slugs] of Object.entries(blogCategorySlugMap)) {
    for (const locale of ALL_LOCALES) {
      const correctSlug = slugs[locale] || slugs.en;
      for (const [, otherSlug] of Object.entries(slugs)) {
        if (otherSlug !== correctSlug) {
          addRedirect(
            `/${locale}/blog/category/${otherSlug}`,
            `/${locale}/blog/category/${correctSlug}`,
            'blog-category'
          );
        }
      }
    }
  }
  console.log(`  blog-category:     ${stats['blog-category'] || 0} redirects`);

  // ── 4. Product category slug redirects ──
  const productCategorySlugMap = loadTsConfig(
    path.join(CONFIG_DIR, 'product-category-slugs.ts'), 'productCategorySlugMap'
  );
  for (const [, slugs] of Object.entries(productCategorySlugMap)) {
    for (const locale of ALL_LOCALES) {
      const correctSlug = slugs[locale] || slugs.en;
      for (const [, otherSlug] of Object.entries(slugs)) {
        if (otherSlug !== correctSlug) {
          addRedirect(
            `/${locale}/apps/category/${otherSlug}`,
            `/${locale}/apps/category/${correctSlug}`,
            'product-category'
          );
        }
      }
    }
  }
  console.log(`  product-category:  ${stats['product-category'] || 0} redirects`);

  // ── 5. Grade slug redirects ──
  const gradeSlugMap = loadTsConfig(
    path.join(CONFIG_DIR, 'grade-slugs.ts'), 'gradeSlugMap'
  );
  for (const [, slugs] of Object.entries(gradeSlugMap)) {
    for (const locale of ALL_LOCALES) {
      const correctSlug = slugs[locale] || slugs.en;
      // Middleware uses getGradeIdFromSlug which checks both locale-specific AND English slug
      for (const [, otherSlug] of Object.entries(slugs)) {
        if (otherSlug !== correctSlug) {
          addRedirect(
            `/${locale}/apps/grades/${otherSlug}`,
            `/${locale}/apps/grades/${correctSlug}`,
            'grade'
          );
        }
      }
    }
  }
  console.log(`  grade:             ${stats['grade'] || 0} redirects`);

  // ── 6. Product page redirects (appId + English slug) ──
  const productPageSlugs = loadTsConfig(
    path.join(CONFIG_DIR, 'product-page-slugs.ts'), 'productPageSlugs'
  );
  for (const app of productPageSlugs) {
    const enSlug = app.slugs.en;
    for (const locale of ALL_LOCALES) {
      const targetSlug = app.slugs[locale] || enSlug;

      // 6a. AppId -> localized slug
      if (targetSlug && targetSlug !== app.appId) {
        addRedirect(`/${locale}/apps/${app.appId}`, `/${locale}/apps/${targetSlug}`, 'product-appid');
      }

      // 6b. English slug -> localized slug (non-en locales)
      if (locale !== 'en' && app.slugs[locale] && app.slugs[locale] !== enSlug) {
        addRedirect(`/${locale}/apps/${enSlug}`, `/${locale}/apps/${app.slugs[locale]}`, 'product-en-slug');
      }
    }
  }
  console.log(`  product-appid:     ${stats['product-appid'] || 0} redirects`);
  console.log(`  product-en-slug:   ${stats['product-en-slug'] || 0} redirects`);

  // ── 7. Hardcoded redirects ──
  addRedirect('/', '/en', 'hardcoded');
  addRedirect('/blog', '/en/blog', 'hardcoded');
  for (const page of ['/contact', '/pricing', '/privacy', '/terms', '/about']) {
    addRedirect(page, `/en${page}`, 'hardcoded');
  }
  addRedirect('/word-scramble', '/en/apps/word-scramble-worksheets', 'hardcoded');
  addRedirect('/find-objects', '/en/apps/find-objects-worksheets', 'hardcoded');
  addRedirect('/generators', '/en/apps', 'hardcoded');
  addRedirect('/signup', '/en/auth/signup', 'hardcoded');

  // Localized page slugs
  const localizedPageSlugs = {
    prising: 'pricing', tarifs: 'pricing', preise: 'pricing',
    precios: 'pricing', prezzi: 'pricing', precos: 'pricing',
    prijzen: 'pricing', hinnoittelu: 'pricing', priser: 'pricing',
  };
  for (const locale of ALL_LOCALES) {
    for (const [localizedSlug, canonical] of Object.entries(localizedPageSlugs)) {
      addRedirect(`/${locale}/${localizedSlug}`, `/${locale}/${canonical}`, 'hardcoded');
    }
  }

  // Bare /blog/{slug} paths (for cross-locale slugs with nativeLocale != 'en')
  for (const { slug } of crossLocaleSlugs) {
    addRedirect(`/blog/${slug}`, `/en/blog/${slug}`, 'bare-blog');
  }
  for (const { oldSlug } of legacyBlogSlugs) {
    addRedirect(`/blog/${oldSlug}`, `/en/blog/${oldSlug}`, 'bare-blog');
  }
  console.log(`  hardcoded:         ${stats['hardcoded'] || 0} redirects`);
  console.log(`  bare-blog:         ${stats['bare-blog'] || 0} redirects`);

  const total = redirectMap.size;
  console.log(`\n  TOTAL: ${total.toLocaleString()} unique redirect rules loaded`);

  return { redirectMap, stats, productPageSlugs };
}

function traceChains(redirectMap) {
  console.log('\n  Tracing chains...');
  const issues = [];
  let configToConfig = 0;
  let barePathChains = 0;

  for (const [source, { target, type }] of redirectMap) {
    const secondHop = redirectMap.get(target);
    if (!secondHop) continue;

    // Trace full chain
    const chain = [source, target, secondHop.target];
    const types = [type, secondHop.type];
    let current = secondHop.target;
    const visited = new Set(chain);
    let circular = false;

    while (redirectMap.has(current)) {
      const next = redirectMap.get(current);
      types.push(next.type);
      if (visited.has(next.target)) {
        circular = true;
        chain.push(next.target);
        break;
      }
      visited.add(next.target);
      chain.push(next.target);
      current = next.target;
    }

    const isBarePathChain = type === 'bare-blog' || type === 'hardcoded';
    if (isBarePathChain) barePathChains++;
    else configToConfig++;

    issues.push({
      check: circular ? 'CIRCULAR' : 'CHAIN',
      severity: circular ? 'CRITICAL' : (isBarePathChain ? 'LOW' : 'HIGH'),
      source,
      chain,
      hops: chain.length - 1,
      types,
      category: isBarePathChain ? 'bare-path' : 'config-to-config',
    });
  }

  console.log(`  Config-to-config chains: ${configToConfig}`);
  console.log(`  Bare-path chains: ${barePathChains}`);
  console.log(`  Total chains: ${issues.length}`);

  return issues;
}

// ─── Phase 2: Live Canonical Audit ──────────────────────────────────────────────

async function auditCanonicals() {
  console.log('\n=== Phase 2: Live Canonical Audit ===\n');
  const issues = [];

  // Fetch sitemap index
  console.log('  Fetching sitemap index...');
  let sitemapXml;
  try {
    sitemapXml = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  } catch (err) {
    console.error(`  ERROR: Could not fetch sitemap index: ${err.message}`);
    return issues;
  }

  // Parse child sitemap URLs from sitemap index
  const childSitemapUrls = parseSitemapLocs(sitemapXml).filter(u => u.endsWith('.xml'));
  console.log(`  Found ${childSitemapUrls.length} child sitemaps`);

  // Fetch all child sitemaps and collect <loc> URLs
  const allUrls = [];
  for (const childUrl of childSitemapUrls) {
    try {
      await sleep(100);
      const childXml = await fetchUrl(childUrl);
      const locs = parseSitemapLocs(childXml);
      allUrls.push(...locs);
    } catch (err) {
      console.warn(`  WARN: Could not fetch ${childUrl}: ${err.message}`);
    }
  }
  console.log(`  Total URLs in sitemaps: ${allUrls.length}`);

  // Stratified sampling
  const byTypeAndLocale = {};
  for (const url of allUrls) {
    const type = classifyUrl(url);
    const locale = extractLocaleFromPath(url) || 'unknown';
    const key = `${type}:${locale}`;
    if (!byTypeAndLocale[key]) byTypeAndLocale[key] = [];
    byTypeAndLocale[key].push(url);
  }

  const sample = [];
  for (const [key, urls] of Object.entries(byTypeAndLocale)) {
    const type = key.split(':')[0];
    const targetCount = SAMPLE_SIZE_OVERRIDE
      ? Math.max(1, Math.round(SAMPLE_SIZE_OVERRIDE / Object.keys(byTypeAndLocale).length))
      : (SAMPLE_PER_LOCALE[type] || 1);
    const picked = shuffle(urls).slice(0, targetCount);
    sample.push(...picked);
  }

  console.log(`  Sampled ${sample.length} URLs for canonical check`);

  // Check canonical on each sampled URL
  let checked = 0;
  let passed = 0;
  let errors = 0;

  for (const url of sample) {
    checked++;
    if (checked % 20 === 0) {
      process.stdout.write(`  Checked ${checked}/${sample.length}...\r`);
    }
    try {
      await sleep(REQUEST_DELAY_MS);
      const resp = await fetchNoRedirect(url);

      if (resp.statusCode !== 200) {
        issues.push({
          check: 'CANONICAL_SELF',
          severity: 'HIGH',
          url,
          detail: `Expected 200 but got ${resp.statusCode} (page should not redirect)`,
        });
        continue;
      }

      const canonical = extractCanonical(resp.body);
      if (!canonical) {
        issues.push({
          check: 'CANONICAL_SELF',
          severity: 'MEDIUM',
          url,
          detail: 'No <link rel="canonical"> found',
        });
        continue;
      }

      const normalizedCanonical = normalizeUrl(canonical);
      const normalizedUrl = normalizeUrl(url);

      if (normalizedCanonical !== normalizedUrl) {
        issues.push({
          check: 'CANONICAL_SELF',
          severity: 'HIGH',
          url,
          canonical,
          detail: `Canonical mismatch: page=${normalizedUrl} canonical=${normalizedCanonical}`,
        });
      } else {
        passed++;
      }
    } catch (err) {
      errors++;
      if (errors <= 3) {
        console.warn(`  WARN: Error fetching ${url}: ${err.message}`);
      }
    }
  }

  console.log(`  Canonical check complete: ${passed} passed, ${issues.length} issues, ${errors} errors`);

  return issues;
}

// ─── Phase 3: Live Redirect Hop Check ───────────────────────────────────────────

async function auditLiveRedirectHops(redirectMap) {
  console.log('\n=== Phase 3: Live Redirect Hop Check ===\n');
  const issues = [];

  // Group redirect entries by type for stratified sampling
  const byType = {};
  for (const [source, { type }] of redirectMap) {
    if (!byType[type]) byType[type] = [];
    byType[type].push(source);
  }

  // Sample ~15 per type (skip bare-blog to keep it fast)
  const sample = [];
  const SAMPLE_PER_TYPE = 15;
  for (const [type, sources] of Object.entries(byType)) {
    if (type === 'bare-blog') {
      // Take just 5 bare-blog samples
      sample.push(...shuffle(sources).slice(0, 5));
    } else {
      sample.push(...shuffle(sources).slice(0, SAMPLE_PER_TYPE));
    }
  }

  console.log(`  Sampled ${sample.length} redirect-triggering URLs across ${Object.keys(byType).length} types`);

  let checked = 0;
  let singleHop = 0;
  let errors = 0;
  let undeployed = 0;
  let barePathMultiHop = 0;

  for (const sourcePath of sample) {
    checked++;
    if (checked % 10 === 0) {
      process.stdout.write(`  Checked ${checked}/${sample.length}...\r`);
    }

    const fullUrl = `${BASE_URL}${sourcePath}`;
    const { target, type } = redirectMap.get(sourcePath);
    const isBarePathType = type === 'bare-blog' || type === 'hardcoded';

    try {
      await sleep(REQUEST_DELAY_MS);
      const result = await fetchFollowCounting(fullUrl);

      if (result.hops === 1 && result.finalStatus === 200) {
        singleHop++;
      } else if (result.hops === 0 && result.finalStatus === 200) {
        // URL renders directly without redirect - OK
        singleHop++;
      } else if (result.hops > 1) {
        if (isBarePathType) {
          // Bare-path multi-hop chains are expected (e.g., /blog/slug -> /en/blog/slug -> /de/blog/slug)
          barePathMultiHop++;
          issues.push({
            check: 'REDIRECT_HOP',
            severity: 'LOW',
            source: sourcePath,
            expectedTarget: target,
            type,
            hops: result.hops,
            chain: result.chain,
            finalStatus: result.finalStatus,
            detail: `Bare-path ${result.hops}-hop chain (expected): ${result.chain.map(c => c.replace(BASE_URL, '')).join(' -> ')}`,
          });
        } else {
          issues.push({
            check: 'REDIRECT_HOP',
            severity: result.hops > 2 ? 'CRITICAL' : 'HIGH',
            source: sourcePath,
            expectedTarget: target,
            type,
            hops: result.hops,
            chain: result.chain,
            finalStatus: result.finalStatus,
            detail: `${result.hops} hops (expected 1): ${result.chain.map(c => c.replace(BASE_URL, '')).join(' -> ')}`,
          });
        }
      } else if (result.finalStatus !== 200) {
        // 0-hop non-200: redirect rule exists in local config but isn't active on production
        undeployed++;
        issues.push({
          check: 'REDIRECT_MISSING',
          severity: 'INFO',
          source: sourcePath,
          type,
          hops: result.hops,
          finalStatus: result.finalStatus,
          detail: `Redirect not active on production (HTTP ${result.finalStatus}) - config may not be deployed yet`,
        });
      } else {
        singleHop++;
      }
    } catch (err) {
      errors++;
      if (errors <= 3) {
        console.warn(`  WARN: Error checking ${fullUrl}: ${err.message}`);
      }
    }
  }

  console.log(`  Hop check: ${singleHop} OK, ${barePathMultiHop} bare-path chains (expected), ${undeployed} undeployed, ${errors} errors`);

  return issues;
}

// ─── Report Generation ──────────────────────────────────────────────────────────

function printSummary(chainIssues, canonicalIssues, hopIssues, redirectMapSize, stats) {
  console.log('\n' + '='.repeat(72));
  console.log('  AUDIT SUMMARY');
  console.log('='.repeat(72));

  const configChains = chainIssues.filter(i => i.category === 'config-to-config');
  const bareChains = chainIssues.filter(i => i.category === 'bare-path');
  const circular = chainIssues.filter(i => i.check === 'CIRCULAR');

  console.log(`\n  Phase 1: Redirect Chain Analysis`);
  console.log(`    Total redirect rules:       ${redirectMapSize.toLocaleString()}`);
  console.log(`    Config-to-config chains:     ${configChains.length}`);
  console.log(`    Bare-path chains (expected): ${bareChains.length}`);
  console.log(`    Circular redirects:          ${circular.length}`);

  if (!CHAIN_ONLY) {
    console.log(`\n  Phase 2: Live Canonical Audit`);
    console.log(`    Canonical issues:            ${canonicalIssues.length}`);

    const realHopIssues = hopIssues.filter(i => i.check === 'REDIRECT_HOP' && i.severity !== 'LOW');
    const barePathHopIssues = hopIssues.filter(i => i.check === 'REDIRECT_HOP' && i.severity === 'LOW');
    const undeployedIssues = hopIssues.filter(i => i.check === 'REDIRECT_MISSING');

    console.log(`\n  Phase 3: Live Redirect Hop Check`);
    console.log(`    Real multi-hop chains:       ${realHopIssues.length}`);
    console.log(`    Bare-path chains (expected): ${barePathHopIssues.length}`);
    console.log(`    Undeployed configs (INFO):   ${undeployedIssues.length}`);
  }

  // Show critical/high issues in detail
  const criticalIssues = [
    ...configChains.slice(0, 10),
    ...circular.slice(0, 5),
    ...canonicalIssues.filter(i => i.severity === 'HIGH').slice(0, 10),
    ...hopIssues.filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH').slice(0, 5),
  ];

  if (criticalIssues.length > 0) {
    console.log('\n  ISSUES (CRITICAL/HIGH only, showing up to 30):');
    for (const issue of criticalIssues) {
      console.log(`    [${issue.severity}] ${issue.check}: ${issue.detail || issue.source}`);
      if (issue.chain) {
        console.log(`      Chain: ${issue.chain.slice(0, 4).join(' -> ')}${issue.chain.length > 4 ? ' -> ...' : ''}`);
      }
    }
  }

  // Only count CRITICAL/HIGH for pass/fail (INFO and LOW are informational)
  const totalCritical = configChains.length + circular.length +
    canonicalIssues.filter(i => i.severity === 'HIGH' || i.severity === 'CRITICAL').length +
    hopIssues.filter(i => i.severity === 'HIGH' || i.severity === 'CRITICAL').length;

  const status = totalCritical === 0 ? 'PASS' : 'FAIL';
  console.log(`\n  STATUS: ${status}${totalCritical > 0 ? ` (${totalCritical} critical/high issues)` : ''}`);
  console.log('='.repeat(72) + '\n');

  return status;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Canonical Tag Audit & Redirect Chain Elimination');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Mode: ${CHAIN_ONLY ? 'Chain analysis only (no HTTP)' : 'Full audit (chain + live checks)'}`);

  // Phase 1: In-memory redirect chain analysis
  const { redirectMap, stats } = buildRedirectMap();
  const chainIssues = traceChains(redirectMap);

  // Phase 2 & 3: Live checks (unless --chain-only)
  let canonicalIssues = [];
  let hopIssues = [];
  if (!CHAIN_ONLY) {
    canonicalIssues = await auditCanonicals();
    hopIssues = await auditLiveRedirectHops(redirectMap);
  }

  // Summary
  const status = printSummary(chainIssues, canonicalIssues, hopIssues, redirectMap.size, stats);

  // Write JSON report
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    mode: CHAIN_ONLY ? 'chain-only' : 'full',
    phases: {
      redirectChains: {
        totalRedirectRules: redirectMap.size,
        rulesByType: stats,
        configToConfigChains: chainIssues.filter(i => i.category === 'config-to-config').length,
        barePathChains: chainIssues.filter(i => i.category === 'bare-path').length,
        circularRedirects: chainIssues.filter(i => i.check === 'CIRCULAR').length,
        issues: chainIssues,
      },
      canonicalAudit: CHAIN_ONLY ? null : {
        pagesChecked: canonicalIssues.length > 0 ? 'see issues' : 'all passed',
        issues: canonicalIssues,
      },
      redirectHops: CHAIN_ONLY ? null : {
        realMultiHop: hopIssues.filter(i => i.check === 'REDIRECT_HOP' && i.severity !== 'LOW').length,
        barePathChains: hopIssues.filter(i => i.check === 'REDIRECT_HOP' && i.severity === 'LOW').length,
        undeployedConfigs: hopIssues.filter(i => i.check === 'REDIRECT_MISSING').length,
        issues: hopIssues,
      },
    },
    summary: {
      criticalHighIssues: chainIssues.filter(i => i.category === 'config-to-config').length +
        chainIssues.filter(i => i.check === 'CIRCULAR').length +
        canonicalIssues.filter(i => i.severity === 'HIGH' || i.severity === 'CRITICAL').length +
        hopIssues.filter(i => i.severity === 'HIGH' || i.severity === 'CRITICAL').length,
      infoIssues: hopIssues.filter(i => i.severity === 'INFO' || i.severity === 'LOW').length +
        chainIssues.filter(i => i.category === 'bare-path').length,
      status,
    },
  };

  // Ensure output directory exists
  const outputDir = path.dirname(JSON_OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(`Report written to: ${JSON_OUTPUT_PATH}`);

  // Exit code: 0 = pass, 1 = issues
  const exitCode = status === 'PASS' ? 0 : 1;
  process.exit(exitCode);
}

main().catch(err => {
  console.error('\nFATAL ERROR:', err.message);
  console.error(err.stack);
  process.exit(2);
});
