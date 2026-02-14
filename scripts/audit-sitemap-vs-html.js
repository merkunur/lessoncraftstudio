#!/usr/bin/env node
/**
 * Sitemap vs HTML Hreflang Cross-Reference Audit
 *
 * 3-phase pipeline:
 *   Phase 1: Parse all sitemaps with hreflang alternates
 *   Phase 2: Sample & fetch live HTML pages
 *   Phase 3: Compare sitemap hreflang set vs HTML hreflang set
 *
 * Usage: node scripts/audit-sitemap-vs-html.js
 * Estimated runtime: ~3-4 minutes (7 sitemaps + 100 page fetches at 300ms)
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// ─── Configuration ──────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];

let REQUEST_DELAY_MS = 300;
const REQUEST_TIMEOUT_MS = 15000;
const USER_AGENT = 'LCS-Sitemap-HTML-Audit/1.0';

// Sampling targets
const SAMPLE_TARGETS = {
  blog: 40,     // ~4 per locale from sitemap/6.xml
  product: 25,  // ~2-3 per locale from sitemap/1.xml
  theme: 25,    // ~2-3 per locale from sitemap/3.xml
  other: 10,    // mix from sitemaps 0/2/4/5
};

// Sitemap section -> page type mapping
const SITEMAP_TYPE_MAP = {
  0: 'static',
  1: 'product',
  2: 'category',
  3: 'theme',
  4: 'theme-grade',
  5: 'static',
  6: 'blog',
};

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

/**
 * Normalize URL for comparison: trim trailing slash, lowercase.
 */
function normalizeUrl(url) {
  return url.replace(/\/$/, '').toLowerCase();
}

/**
 * Fetch URL following redirects (for sitemaps).
 */
function fetchUrlFollowRedirects(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: timeoutMs, headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        fetchUrlFollowRedirects(redirectUrl, timeoutMs).then(resolve).catch(reject);
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
 * Fetch URL WITHOUT following redirects. Returns { statusCode, headers, body }.
 */
function fetchUrlNoRedirect(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      port: 443,
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html',
      },
      timeout: timeoutMs,
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        res.resume();
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: '',
        });
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf-8'),
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout after ${timeoutMs}ms`)); });
    req.end();
  });
}

/**
 * Extract text content from XML tags.
 */
function extractFromXml(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'g');
  const results = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

/**
 * Extract <xhtml:link rel="alternate" hreflang="..." href="..." /> from sitemap XML.
 */
function extractSitemapHreflangs(xml) {
  const xhtmlLinkRegex = /<xhtml:link\s+[^>]*rel=["']alternate["'][^>]*\/?>/gi;
  const tags = [];
  let match;
  while ((match = xhtmlLinkRegex.exec(xml)) !== null) {
    const tag = match[0];
    const hreflangMatch = tag.match(/hreflang=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hreflangMatch && hrefMatch) {
      tags.push({
        hreflang: hreflangMatch[1],
        href: hrefMatch[1],
      });
    }
  }
  return tags;
}

/**
 * Extract <link rel="alternate" hreflang="..." href="..." /> from HTML.
 */
function extractHreflangTags(html) {
  const regex = /<link\s+[^>]*rel=["']alternate["'][^>]*>/gi;
  const tags = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const hreflangMatch = tag.match(/hreflang=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hreflangMatch && hrefMatch) {
      tags.push({
        hreflang: hreflangMatch[1],
        href: hrefMatch[1],
      });
    }
  }
  return tags;
}

/**
 * Classify a URL by page type.
 */
function classifyUrl(url) {
  if (url.match(/\/blog\//)) return 'blog';
  if (url.match(/\/[a-z]{2}\/[^/]+\/[^/]+\/[^/]+/)) return 'theme-grade'; // e.g. /en/themes/animals/1st-grade
  if (url.match(/\/themes\/|\/themen\/|\/temas\/|\/thema\/|\/teman\/|\/teemat\//)) return 'theme';
  // Product pages: /{locale}/{slug} with no further path segments
  if (url.match(/\/[a-z]{2}\/[^/]+\/?$/)) return 'product';
  // Category pages
  if (url.match(/\/category\/|\/kategorie\/|\/categorie\//)) return 'category';
  return 'static';
}

/**
 * Get locale from URL path.
 */
function getLocaleFromUrl(url) {
  const match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\//);
  return match ? match[1] : null;
}

/**
 * Parse a single <url> block from sitemap XML, extracting both <loc> and xhtml:link tags.
 */
function parseSitemapUrlBlocks(xml) {
  const urlBlockRegex = /<url>([\s\S]*?)<\/url>/gi;
  const entries = [];
  let match;
  while ((match = urlBlockRegex.exec(xml)) !== null) {
    const block = match[1];
    // Extract <loc>
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) continue;
    const loc = locMatch[1].trim();

    // Extract all xhtml:link alternates from this block
    const hreflangs = [];
    const xhtmlRegex = /<xhtml:link\s+[^>]*rel=["']alternate["'][^>]*\/?>/gi;
    let xlMatch;
    while ((xlMatch = xhtmlRegex.exec(block)) !== null) {
      const tag = xlMatch[0];
      const hlMatch = tag.match(/hreflang=["']([^"']+)["']/i);
      const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
      if (hlMatch && hrefMatch) {
        hreflangs.push({
          hreflang: hlMatch[1],
          href: hrefMatch[1],
        });
      }
    }

    entries.push({ loc, hreflangs });
  }
  return entries;
}

// ─── Phase 1: Parse All Sitemaps ────────────────────────────────────────────────

async function parseSitemaps() {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 1: PARSE ALL SITEMAPS WITH HREFLANG ALTERNATES');
  console.log('='.repeat(80));
  console.log('');

  // Fetch sitemap index
  console.log('  Fetching sitemap index...');
  let indexXml;
  try {
    indexXml = await fetchUrlFollowRedirects(`${BASE_URL}/sitemap.xml`);
  } catch (err) {
    console.log(`  FATAL: Could not fetch sitemap.xml: ${err.message}`);
    process.exit(1);
  }

  const childSitemapUrls = extractFromXml(indexXml, 'loc');
  console.log(`  Found ${childSitemapUrls.length} child sitemaps`);

  // Build the master map: url -> { sitemapHreflangs, sitemapId, type }
  const sitemapMap = new Map();
  const sitemapStats = { bySection: {}, totalUrls: 0, urlsWithHreflang: 0, byType: {} };

  for (let i = 0; i < childSitemapUrls.length; i++) {
    const childUrl = childSitemapUrls[i];
    // Extract sitemap ID from URL (e.g. /sitemap/6.xml -> 6)
    const idMatch = childUrl.match(/\/sitemap\/(\d+)\.xml/);
    const sitemapId = idMatch ? parseInt(idMatch[1]) : i;

    await sleep(REQUEST_DELAY_MS);
    console.log(`  Fetching sitemap/${sitemapId}.xml...`);

    try {
      const xml = await fetchUrlFollowRedirects(childUrl);
      const entries = parseSitemapUrlBlocks(xml);

      sitemapStats.bySection[sitemapId] = entries.length;
      sitemapStats.totalUrls += entries.length;

      for (const entry of entries) {
        const type = SITEMAP_TYPE_MAP[sitemapId] || classifyUrl(entry.loc);
        sitemapMap.set(entry.loc, {
          sitemapHreflangs: entry.hreflangs,
          sitemapId,
          type,
        });

        if (entry.hreflangs.length > 0) {
          sitemapStats.urlsWithHreflang++;
        }

        // Count by type
        sitemapStats.byType[type] = (sitemapStats.byType[type] || 0) + 1;
      }

      console.log(`    ${entries.length} URLs, ${entries.filter(e => e.hreflangs.length > 0).length} with hreflang`);
    } catch (err) {
      console.log(`    ERROR: ${err.message}`);
      sitemapStats.bySection[sitemapId] = 0;
    }
  }

  console.log('');
  console.log('  Sitemap Summary:');
  console.log('  ' + '-'.repeat(50));
  console.log(`  Total URLs: ${sitemapStats.totalUrls}`);
  console.log(`  URLs with hreflang: ${sitemapStats.urlsWithHreflang}`);
  console.log('');
  console.log('  By section:');
  for (const [section, count] of Object.entries(sitemapStats.bySection).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
    const typeName = SITEMAP_TYPE_MAP[section] || 'unknown';
    console.log(`    sitemap/${section}.xml: ${count} URLs (${typeName})`);
  }
  console.log('');
  console.log('  By type:');
  for (const [type, count] of Object.entries(sitemapStats.byType).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${type}: ${count}`);
  }

  return { sitemapMap, sitemapStats };
}

// ─── Phase 2: Sample & Fetch Live HTML ──────────────────────────────────────────

async function sampleAndFetchHtml(sitemapMap) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 2: SAMPLE & FETCH LIVE HTML');
  console.log('='.repeat(80));
  console.log('');

  // Group URLs by type
  const urlsByType = {};
  for (const [url, data] of sitemapMap) {
    const type = data.type;
    if (!urlsByType[type]) urlsByType[type] = [];
    urlsByType[type].push(url);
  }

  console.log('  Available URLs by type:');
  for (const [type, urls] of Object.entries(urlsByType)) {
    console.log(`    ${type}: ${urls.length}`);
  }
  console.log('');

  // Build stratified sample
  const sampled = [];

  // Blog: ~40 URLs, stratified by locale (~4 per locale)
  if (urlsByType.blog) {
    const blogByLocale = {};
    for (const locale of ALL_LOCALES) blogByLocale[locale] = [];
    for (const url of urlsByType.blog) {
      const locale = getLocaleFromUrl(url);
      if (locale && blogByLocale[locale]) blogByLocale[locale].push(url);
    }
    const perLocale = Math.ceil(SAMPLE_TARGETS.blog / ALL_LOCALES.length);
    for (const locale of ALL_LOCALES) {
      const picked = shuffle(blogByLocale[locale]).slice(0, perLocale);
      for (const url of picked) sampled.push({ url, type: 'blog', locale });
    }
  }

  // Product: ~25 URLs, stratified by locale
  if (urlsByType.product) {
    const productByLocale = {};
    for (const locale of ALL_LOCALES) productByLocale[locale] = [];
    for (const url of urlsByType.product) {
      const locale = getLocaleFromUrl(url);
      if (locale && productByLocale[locale]) productByLocale[locale].push(url);
    }
    const perLocale = Math.ceil(SAMPLE_TARGETS.product / ALL_LOCALES.length);
    for (const locale of ALL_LOCALES) {
      const picked = shuffle(productByLocale[locale]).slice(0, perLocale);
      for (const url of picked) sampled.push({ url, type: 'product', locale });
    }
  }

  // Theme: ~25 URLs, stratified by locale
  if (urlsByType.theme) {
    const themeByLocale = {};
    for (const locale of ALL_LOCALES) themeByLocale[locale] = [];
    for (const url of urlsByType.theme) {
      const locale = getLocaleFromUrl(url);
      if (locale && themeByLocale[locale]) themeByLocale[locale].push(url);
    }
    const perLocale = Math.ceil(SAMPLE_TARGETS.theme / ALL_LOCALES.length);
    for (const locale of ALL_LOCALES) {
      const picked = shuffle(themeByLocale[locale]).slice(0, perLocale);
      for (const url of picked) sampled.push({ url, type: 'theme', locale });
    }
  }

  // Other: ~10 URLs from sitemaps 0/2/4/5
  const otherTypes = ['static', 'category', 'theme-grade'];
  const otherUrls = [];
  for (const type of otherTypes) {
    if (urlsByType[type]) {
      for (const url of urlsByType[type]) otherUrls.push({ url, type });
    }
  }
  const otherPicked = shuffle(otherUrls).slice(0, SAMPLE_TARGETS.other);
  for (const item of otherPicked) {
    const locale = getLocaleFromUrl(item.url);
    sampled.push({ url: item.url, type: item.type, locale: locale || 'unknown' });
  }

  console.log(`  Sampled ${sampled.length} URLs:`);
  const sampledByType = {};
  for (const s of sampled) {
    sampledByType[s.type] = (sampledByType[s.type] || 0) + 1;
  }
  for (const [type, count] of Object.entries(sampledByType)) {
    console.log(`    ${type}: ${count}`);
  }
  console.log('');

  // Fetch each sampled URL WITHOUT following redirects
  const results = [];

  for (let i = 0; i < sampled.length; i++) {
    const { url, type, locale } = sampled[i];
    const idx = `[${String(i + 1).padStart(3)}/${sampled.length}]`;

    await sleep(REQUEST_DELAY_MS);

    const result = {
      url,
      type,
      locale,
      statusCode: null,
      htmlHreflangs: [],
      error: null,
    };

    try {
      const resp = await fetchUrlNoRedirect(url);
      result.statusCode = resp.statusCode;

      if (resp.statusCode === 200) {
        result.htmlHreflangs = extractHreflangTags(resp.body);
        const slug = url.substring(url.lastIndexOf('/') + 1).substring(0, 40);
        console.log(`${idx} 200 ${type.padEnd(12)} /${locale}/ ${slug} (${result.htmlHreflangs.length} hreflangs)`);
      } else if (resp.statusCode === 301 || resp.statusCode === 302) {
        const target = resp.headers.location || '(unknown)';
        console.log(`${idx} ${resp.statusCode} ${type.padEnd(12)} /${locale}/ -> ${target.substring(0, 60)}`);
      } else if (resp.statusCode === 429) {
        // Rate limited - back off and retry once
        console.log(`${idx} 429 RATE LIMITED - backing off to 1000ms...`);
        REQUEST_DELAY_MS = 1000;
        await sleep(1000);
        try {
          const retryResp = await fetchUrlNoRedirect(url);
          result.statusCode = retryResp.statusCode;
          if (retryResp.statusCode === 200) {
            result.htmlHreflangs = extractHreflangTags(retryResp.body);
            console.log(`${idx} 200 (retry) ${type.padEnd(12)} /${locale}/ (${result.htmlHreflangs.length} hreflangs)`);
          } else {
            console.log(`${idx} ${retryResp.statusCode} (retry) ${type.padEnd(12)} /${locale}/`);
          }
        } catch (retryErr) {
          result.error = retryErr.message;
          console.log(`${idx} ERROR (retry) ${retryErr.message.substring(0, 50)}`);
        }
      } else {
        console.log(`${idx} ${resp.statusCode} ${type.padEnd(12)} /${locale}/`);
      }
    } catch (err) {
      result.error = err.message;
      console.log(`${idx} ERROR ${type.padEnd(12)} /${locale}/ ${err.message.substring(0, 50)}`);
    }

    results.push(result);
  }

  return results;
}

// ─── Phase 3: Compare Sitemap vs HTML ───────────────────────────────────────────

function compareSitemapVsHtml(sitemapMap, fetchResults) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 3: COMPARE SITEMAP vs HTML HREFLANG');
  console.log('='.repeat(80));
  console.log('');

  const divergences = [];
  const sitemapRedirects = [];
  let totalCompared = 0;
  let pagesWithDivergence = 0;
  const divergencesByCheck = {};
  const divergencesByPageType = {};

  for (const result of fetchResults) {
    const { url, type, statusCode, htmlHreflangs, error } = result;

    // Check 4: SITEMAP_REDIRECTS - sitemap URL itself returns 301
    if (statusCode === 301 || statusCode === 302) {
      sitemapRedirects.push({
        url,
        type,
        statusCode,
        sitemapId: sitemapMap.get(url)?.sitemapId,
      });
      divergencesByCheck['SITEMAP_REDIRECTS'] = (divergencesByCheck['SITEMAP_REDIRECTS'] || 0) + 1;
      continue;
    }

    // Skip pages with errors or non-200 status
    if (statusCode !== 200 || error) continue;

    const sitemapData = sitemapMap.get(url);
    if (!sitemapData) {
      // URL not found in sitemap (shouldn't happen since we sampled from sitemap)
      continue;
    }

    totalCompared++;
    const sitemapHreflangs = sitemapData.sitemapHreflangs;
    const issues = [];

    // Build maps for comparison: hreflang code -> normalized href
    const sitemapByCode = new Map();
    for (const tag of sitemapHreflangs) {
      sitemapByCode.set(tag.hreflang, normalizeUrl(tag.href));
    }

    const htmlByCode = new Map();
    for (const tag of htmlHreflangs) {
      htmlByCode.set(tag.hreflang, normalizeUrl(tag.href));
    }

    // Check 5: COUNT_MISMATCH
    if (sitemapHreflangs.length !== htmlHreflangs.length) {
      issues.push({
        check: 'COUNT_MISMATCH',
        severity: 'MEDIUM',
        sitemapCount: sitemapHreflangs.length,
        htmlCount: htmlHreflangs.length,
        detail: `Sitemap has ${sitemapHreflangs.length} hreflangs, HTML has ${htmlHreflangs.length}`,
      });
    }

    // Check 1: SITEMAP_ONLY - in sitemap but not in HTML
    for (const [code, href] of sitemapByCode) {
      if (!htmlByCode.has(code)) {
        issues.push({
          check: 'SITEMAP_ONLY',
          severity: 'HIGH',
          hreflang: code,
          sitemapHref: href,
          htmlHref: null,
        });
      }
    }

    // Check 2: HTML_ONLY - in HTML but not in sitemap
    for (const [code, href] of htmlByCode) {
      if (!sitemapByCode.has(code)) {
        issues.push({
          check: 'HTML_ONLY',
          severity: 'HIGH',
          hreflang: code,
          sitemapHref: null,
          htmlHref: href,
        });
      }
    }

    // Check 3: URL_MISMATCH - same hreflang code, different URL
    for (const [code, sitemapHref] of sitemapByCode) {
      const htmlHref = htmlByCode.get(code);
      if (htmlHref && sitemapHref !== htmlHref) {
        issues.push({
          check: 'URL_MISMATCH',
          severity: 'CRITICAL',
          hreflang: code,
          sitemapHref,
          htmlHref,
        });
      }
    }

    if (issues.length > 0) {
      pagesWithDivergence++;
      divergences.push({
        url,
        type,
        sitemapId: sitemapData.sitemapId,
        sitemapHreflangCount: sitemapHreflangs.length,
        htmlHreflangCount: htmlHreflangs.length,
        issues,
      });

      // Count by check type
      for (const issue of issues) {
        divergencesByCheck[issue.check] = (divergencesByCheck[issue.check] || 0) + 1;
      }

      // Count by page type
      divergencesByPageType[type] = (divergencesByPageType[type] || 0) + 1;
    }
  }

  // Print summary
  console.log(`  Total compared: ${totalCompared}`);
  console.log(`  Pages with divergence: ${pagesWithDivergence}`);
  console.log(`  Sitemap URLs that redirect: ${sitemapRedirects.length}`);
  console.log('');

  if (Object.keys(divergencesByCheck).length > 0) {
    console.log('  Divergences by check:');
    for (const [check, count] of Object.entries(divergencesByCheck).sort((a, b) => b[1] - a[1])) {
      const severity = check === 'URL_MISMATCH' || check === 'SITEMAP_REDIRECTS' ? 'CRITICAL'
        : check === 'SITEMAP_ONLY' || check === 'HTML_ONLY' ? 'HIGH'
        : 'MEDIUM';
      console.log(`    ${severity.padEnd(8)} ${check}: ${count}`);
    }
    console.log('');
  }

  if (Object.keys(divergencesByPageType).length > 0) {
    console.log('  Divergences by page type:');
    for (const [type, count] of Object.entries(divergencesByPageType).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${type}: ${count}`);
    }
    console.log('');
  }

  if (sitemapRedirects.length > 0) {
    console.log('  Sitemap URLs returning redirects:');
    for (const sr of sitemapRedirects.slice(0, 10)) {
      console.log(`    ${sr.statusCode} [sitemap/${sr.sitemapId}] ${sr.url.substring(BASE_URL.length)}`);
    }
    if (sitemapRedirects.length > 10) {
      console.log(`    ... and ${sitemapRedirects.length - 10} more`);
    }
    console.log('');
  }

  // Print detailed divergences
  if (divergences.length > 0) {
    console.log('  Detailed divergences:');
    console.log('  ' + '-'.repeat(70));
    for (const div of divergences) {
      console.log(`\n  URL: ${div.url}`);
      console.log(`  Type: ${div.type} | Sitemap: ${div.sitemapId} | Sitemap hreflangs: ${div.sitemapHreflangCount} | HTML hreflangs: ${div.htmlHreflangCount}`);
      for (const issue of div.issues) {
        if (issue.check === 'COUNT_MISMATCH') {
          console.log(`    ${issue.severity} ${issue.check}: ${issue.detail}`);
        } else if (issue.check === 'URL_MISMATCH') {
          console.log(`    ${issue.severity} ${issue.check} [${issue.hreflang}]:`);
          console.log(`      Sitemap: ${issue.sitemapHref}`);
          console.log(`      HTML:    ${issue.htmlHref}`);
        } else if (issue.check === 'SITEMAP_ONLY') {
          console.log(`    ${issue.severity} ${issue.check} [${issue.hreflang}]: ${issue.sitemapHref}`);
        } else if (issue.check === 'HTML_ONLY') {
          console.log(`    ${issue.severity} ${issue.check} [${issue.hreflang}]: ${issue.htmlHref}`);
        }
      }
    }
    console.log('');
  }

  return {
    totalCompared,
    pagesWithDivergence,
    divergencesByCheck,
    divergencesByPageType,
    divergences,
    sitemapRedirects,
  };
}

// ─── Report Generation ──────────────────────────────────────────────────────────

function generateReport(sitemapStats, comparisonResult) {
  return {
    generatedAt: new Date().toISOString(),
    config: {
      totalSitemapUrls: sitemapStats.totalUrls,
      sampledUrls: comparisonResult.totalCompared + comparisonResult.sitemapRedirects.length,
      sampleTargets: SAMPLE_TARGETS,
    },
    sitemapStats: {
      bySection: sitemapStats.bySection,
      byType: sitemapStats.byType,
      totalUrls: sitemapStats.totalUrls,
      urlsWithHreflang: sitemapStats.urlsWithHreflang,
    },
    summary: {
      totalCompared: comparisonResult.totalCompared,
      pagesWithDivergence: comparisonResult.pagesWithDivergence,
      divergencesByCheck: comparisonResult.divergencesByCheck,
      divergencesByPageType: comparisonResult.divergencesByPageType,
    },
    divergences: comparisonResult.divergences,
    sitemapRedirects: comparisonResult.sitemapRedirects,
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  LESSONCRAFTSTUDIO SITEMAP vs HTML HREFLANG CROSS-REFERENCE AUDIT');
  console.log('  ' + new Date().toISOString());
  console.log('='.repeat(80));

  // Phase 1: Parse all sitemaps
  const { sitemapMap, sitemapStats } = await parseSitemaps();

  // Phase 2: Sample & fetch live HTML
  const fetchResults = await sampleAndFetchHtml(sitemapMap);

  // Phase 3: Compare sitemap vs HTML
  const comparisonResult = compareSitemapVsHtml(sitemapMap, fetchResults);

  // Generate and write report
  const report = generateReport(sitemapStats, comparisonResult);

  const outputDir = path.join(__dirname, '..', 'docs', 'audit-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'sitemap-vs-html-divergence.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  // Print final summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('='.repeat(80));
  console.log('  AUDIT COMPLETE');
  console.log('='.repeat(80));
  console.log('');
  console.log(`  Duration: ${elapsed}s`);
  console.log(`  Sitemap URLs parsed: ${sitemapStats.totalUrls}`);
  console.log(`  Pages compared: ${comparisonResult.totalCompared}`);
  console.log(`  Pages with divergence: ${comparisonResult.pagesWithDivergence}`);
  console.log(`  Sitemap redirects: ${comparisonResult.sitemapRedirects.length}`);
  console.log('');

  if (comparisonResult.pagesWithDivergence === 0 && comparisonResult.sitemapRedirects.length === 0) {
    console.log('  RESULT: PERFECT MATCH - Sitemap and HTML hreflang are fully aligned.');
  } else {
    console.log('  RESULT: DIVERGENCES FOUND - Review details above and in the JSON report.');
  }

  console.log('');
  console.log(`  Report saved to: ${outputPath}`);
  console.log('');
}

main().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
