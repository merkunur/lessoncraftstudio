#!/usr/bin/env node
/**
 * Live HTML Hreflang Audit for LessonCraftStudio
 *
 * 5-phase pipeline:
 *   Phase 1: URL Discovery from Sitemaps
 *   Phase 2: Fetch & Parse Each Page
 *   Phase 3: Individual Page Checks (8 checks)
 *   Phase 4: Hreflang URL Resolution
 *   Phase 5: Reciprocal Verification
 *
 * Usage: node scripts/audit-live-hreflang.js
 * Estimated runtime: 5-8 minutes (~800 HTTP requests at 300ms delay)
 */

const https = require('https');
const path = require('path');
const fs = require('fs');

// ─── Configuration ──────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'da', 'sv', 'no', 'fi'];

const HREFLANG_MAP = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

// Reverse map: hreflang code -> locale
const HREFLANG_TO_LOCALE = {};
for (const [locale, code] of Object.entries(HREFLANG_MAP)) {
  HREFLANG_TO_LOCALE[code] = locale;
}

const BLOG_SAMPLES_PER_LOCALE = 5;
const PRODUCT_SAMPLES_PER_LOCALE = 3;
const THEME_SAMPLES_PER_LOCALE = 3;

let REQUEST_DELAY_MS = 300;
const REQUEST_TIMEOUT_MS = 15000;
const USER_AGENT = 'LCS-Hreflang-Audit/1.0';

// Sitemap child indices: 6=blog, 1=products, 3=themes
const SITEMAP_CHILDREN = {
  blog: '/sitemap/6.xml',
  product: '/sitemap/1.xml',
  theme: '/sitemap/3.xml',
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

function extractFromXml(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'g');
  const results = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

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

function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (match) return match[1];
  const match2 = html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return match2 ? match2[1] : null;
}

function extractHtmlLang(html) {
  const match = html.match(/<html[^>]*\slang=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Detect page type and locale from URL.
 */
function parseUrl(url) {
  // Blog: /en/blog/slug
  let match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/blog\/([^/?#]+)/);
  if (match) return { type: 'blog', locale: match[1], slug: match[2] };

  // Theme: /en/themes/slug
  match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/themes\/([^/?#]+)/);
  if (!match) match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/themen\/([^/?#]+)/);
  if (!match) match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/[^/]+\/([^/?#]+)/);
  if (match && !match[0].includes('/blog/')) {
    // Could be theme or product - determine by path segment
    const pathMatch = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/([^/]+)\/([^/?#]+)/);
    if (pathMatch) {
      // Known product path segments contain worksheet generator names
      return { type: 'other', locale: pathMatch[1], slug: pathMatch[3], segment: pathMatch[2] };
    }
  }

  // Product or root pages: /en/slug
  match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/([^/?#]+)$/);
  if (match) return { type: 'product', locale: match[1], slug: match[2] };

  // Homepage: /en
  match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\/?$/);
  if (match) return { type: 'homepage', locale: match[1], slug: '' };

  return null;
}

/**
 * Extract locale from URL path.
 */
function getLocaleFromUrl(url) {
  const match = url.match(/lessoncraftstudio\.com\/([a-z]{2})\//);
  return match ? match[1] : null;
}

// ─── Phase 1: URL Discovery ────────────────────────────────────────────────────

async function discoverUrls() {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 1: URL DISCOVERY FROM SITEMAPS');
  console.log('='.repeat(80));
  console.log('');

  const urlsByType = { blog: [], product: [], theme: [] };

  // Fetch each child sitemap
  for (const [type, childPath] of Object.entries(SITEMAP_CHILDREN)) {
    const sitemapUrl = `${BASE_URL}${childPath}`;
    console.log(`  Fetching ${type} sitemap: ${sitemapUrl}`);
    await sleep(REQUEST_DELAY_MS);

    try {
      const xml = await fetchUrlFollowRedirects(sitemapUrl);
      const urls = extractFromXml(xml, 'loc');
      urlsByType[type] = urls;
      console.log(`    Found ${urls.length} URLs`);
    } catch (err) {
      console.log(`    ERROR: ${err.message}`);
    }
  }

  // Group by locale
  const grouped = { blog: {}, product: {}, theme: {} };
  for (const locale of ALL_LOCALES) {
    grouped.blog[locale] = [];
    grouped.product[locale] = [];
    grouped.theme[locale] = [];
  }

  for (const url of urlsByType.blog) {
    const locale = getLocaleFromUrl(url);
    if (locale && grouped.blog[locale]) {
      grouped.blog[locale].push(url);
    }
  }
  for (const url of urlsByType.product) {
    const locale = getLocaleFromUrl(url);
    if (locale && grouped.product[locale]) {
      grouped.product[locale].push(url);
    }
  }
  for (const url of urlsByType.theme) {
    const locale = getLocaleFromUrl(url);
    if (locale && grouped.theme[locale]) {
      grouped.theme[locale].push(url);
    }
  }

  // Sample URLs
  const sampled = [];
  console.log('\n  Sampling URLs per locale:');
  console.log('  ' + '-'.repeat(60));

  for (const locale of ALL_LOCALES) {
    const blogSample = shuffle(grouped.blog[locale]).slice(0, BLOG_SAMPLES_PER_LOCALE);
    const productSample = shuffle(grouped.product[locale]).slice(0, PRODUCT_SAMPLES_PER_LOCALE);
    const themeSample = shuffle(grouped.theme[locale]).slice(0, THEME_SAMPLES_PER_LOCALE);

    for (const url of blogSample) sampled.push({ url, type: 'blog', locale });
    for (const url of productSample) sampled.push({ url, type: 'product', locale });
    for (const url of themeSample) sampled.push({ url, type: 'theme', locale });

    console.log(`  ${locale}: ${blogSample.length} blog, ${productSample.length} product, ${themeSample.length} theme`);
  }

  console.log('  ' + '-'.repeat(60));
  console.log(`  Total sampled: ${sampled.length} pages`);
  console.log(`    Blog: ${sampled.filter(s => s.type === 'blog').length}`);
  console.log(`    Product: ${sampled.filter(s => s.type === 'product').length}`);
  console.log(`    Theme: ${sampled.filter(s => s.type === 'theme').length}`);

  return { sampled, sitemapCounts: { blog: urlsByType.blog.length, product: urlsByType.product.length, theme: urlsByType.theme.length } };
}

// ─── Phase 2 & 3: Fetch, Parse & Check Each Page ───────────────────────────────

async function fetchAndCheckPages(sampled) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 2 & 3: FETCH, PARSE & CHECK PAGES');
  console.log('='.repeat(80));
  console.log('');

  const pages = [];

  for (let i = 0; i < sampled.length; i++) {
    const { url, type, locale } = sampled[i];
    const idx = `[${String(i + 1).padStart(3)}/${sampled.length}]`;

    await sleep(REQUEST_DELAY_MS);

    const pageResult = {
      url,
      type,
      locale,
      statusCode: null,
      htmlLang: null,
      contentLanguage: null,
      canonical: null,
      hreflangTags: [],
      hreflangCount: 0,
      issues: [],
    };

    try {
      const resp = await fetchUrlNoRedirect(url);
      pageResult.statusCode = resp.statusCode;

      // Check 1: HTTP_STATUS
      if (resp.statusCode !== 200) {
        pageResult.issues.push({
          check: 'HTTP_STATUS',
          severity: 'CRITICAL',
          detail: `Page returns ${resp.statusCode} instead of 200${resp.headers.location ? ' -> ' + resp.headers.location : ''}`,
        });
        console.log(`${idx} CRITICAL  ${resp.statusCode} ${type.padEnd(7)} /${locale}/ ${url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('/') + 50)}`);
        pages.push(pageResult);
        continue;
      }

      // Parse HTML
      pageResult.htmlLang = extractHtmlLang(resp.body);
      pageResult.contentLanguage = resp.headers['content-language'] || null;
      pageResult.canonical = extractCanonical(resp.body);
      pageResult.hreflangTags = extractHreflangTags(resp.body);
      pageResult.hreflangCount = pageResult.hreflangTags.length;

      // Check 2: CANONICAL_MISMATCH
      if (pageResult.canonical && pageResult.canonical !== url) {
        // Normalize trailing slashes for comparison
        const normCanonical = pageResult.canonical.replace(/\/$/, '');
        const normUrl = url.replace(/\/$/, '');
        if (normCanonical !== normUrl) {
          pageResult.issues.push({
            check: 'CANONICAL_MISMATCH',
            severity: 'HIGH',
            detail: `Canonical "${pageResult.canonical}" does not match page URL "${url}"`,
          });
        }
      }

      // Check 3: HTML_LANG_MISMATCH
      if (pageResult.htmlLang) {
        const htmlLangBase = pageResult.htmlLang.split('-')[0].toLowerCase();
        // pt-BR -> pt base matches pt locale
        if (htmlLangBase !== locale) {
          pageResult.issues.push({
            check: 'HTML_LANG_MISMATCH',
            severity: 'HIGH',
            detail: `<html lang="${pageResult.htmlLang}"> does not match URL locale "${locale}"`,
          });
        }
      }

      // Check 4: CONTENT_LANGUAGE_MISMATCH
      if (pageResult.contentLanguage) {
        const clBase = pageResult.contentLanguage.split('-')[0].toLowerCase();
        if (clBase !== locale) {
          pageResult.issues.push({
            check: 'CONTENT_LANGUAGE_MISMATCH',
            severity: 'MEDIUM',
            detail: `Content-Language header "${pageResult.contentLanguage}" does not match URL locale "${locale}"`,
          });
        }
      }

      // Check 5: SELF_HREFLANG_MISSING
      const expectedHreflang = HREFLANG_MAP[locale];
      const selfTag = pageResult.hreflangTags.find(t => t.hreflang === expectedHreflang || t.hreflang === locale);
      if (!selfTag) {
        pageResult.issues.push({
          check: 'SELF_HREFLANG_MISSING',
          severity: 'HIGH',
          detail: `No self-referencing hreflang tag for "${expectedHreflang}" found`,
        });
      } else {
        // Check self-referencing URL matches
        const normSelf = selfTag.href.replace(/\/$/, '');
        const normUrl = url.replace(/\/$/, '');
        if (normSelf !== normUrl) {
          pageResult.issues.push({
            check: 'SELF_HREFLANG_MISMATCH',
            severity: 'HIGH',
            detail: `Self hreflang href "${selfTag.href}" does not match page URL "${url}"`,
          });
        }
      }

      // Check 6: X_DEFAULT_MISSING
      const xDefault = pageResult.hreflangTags.find(t => t.hreflang === 'x-default');
      if (!xDefault) {
        pageResult.issues.push({
          check: 'X_DEFAULT_MISSING',
          severity: 'MEDIUM',
          detail: 'No x-default hreflang tag found',
        });
      }

      // Check 7: HREFLANG_MISSING_LOCALES
      const allExpectedCodes = Object.values(HREFLANG_MAP);
      const foundCodes = pageResult.hreflangTags
        .filter(t => t.hreflang !== 'x-default')
        .map(t => t.hreflang);
      const missingCodes = allExpectedCodes.filter(code => !foundCodes.includes(code));
      if (missingCodes.length > 0) {
        const missingLocales = missingCodes.map(code => HREFLANG_TO_LOCALE[code] || code);
        pageResult.issues.push({
          check: 'HREFLANG_MISSING_LOCALES',
          severity: 'MEDIUM',
          detail: `Missing hreflang for locales: ${missingLocales.join(', ')}`,
        });
      }

      // Check 8: HREFLANG_DUPLICATES
      const hreflangCodes = pageResult.hreflangTags.map(t => t.hreflang);
      const duplicates = hreflangCodes.filter((v, i) => hreflangCodes.indexOf(v) !== i);
      if (duplicates.length > 0) {
        pageResult.issues.push({
          check: 'HREFLANG_DUPLICATES',
          severity: 'HIGH',
          detail: `Duplicate hreflang entries: ${[...new Set(duplicates)].join(', ')}`,
        });
      }

      const issueCount = pageResult.issues.length;
      const status = issueCount === 0 ? 'OK' : `${issueCount} issue${issueCount > 1 ? 's' : ''}`;
      const slug = url.substring(url.lastIndexOf('/') + 1).substring(0, 45);
      console.log(`${idx} ${status.padEnd(10)} ${type.padEnd(7)} /${locale}/ ${slug} (${pageResult.hreflangCount} hreflangs)`);

    } catch (err) {
      pageResult.statusCode = 'TIMEOUT';
      pageResult.issues.push({
        check: 'HTTP_STATUS',
        severity: 'CRITICAL',
        detail: `Fetch error: ${err.message}`,
      });
      console.log(`${idx} ERROR     ${type.padEnd(7)} /${locale}/ ${err.message.substring(0, 50)}`);
    }

    pages.push(pageResult);
  }

  return pages;
}

// ─── Phase 4: Hreflang URL Resolution ──────────────────────────────────────────

async function resolveHreflangUrls(pages) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 4: HREFLANG URL RESOLUTION');
  console.log('='.repeat(80));
  console.log('');

  // Collect all unique hreflang URLs
  const urlSet = new Set();
  for (const page of pages) {
    for (const tag of page.hreflangTags) {
      urlSet.add(tag.href);
    }
  }

  const uniqueUrls = [...urlSet];
  console.log(`  Unique hreflang URLs to check: ${uniqueUrls.length}`);

  // Resolution cache: url -> { statusCode, redirectTarget, hreflangTags }
  const cache = new Map();

  // Also populate cache from pages we already fetched in Phase 2
  for (const page of pages) {
    if (page.statusCode === 200) {
      cache.set(page.url, {
        statusCode: 200,
        redirectTarget: null,
        hreflangTags: page.hreflangTags,
      });
    }
  }

  const alreadyCached = [...urlSet].filter(u => cache.has(u)).length;
  const toFetch = [...urlSet].filter(u => !cache.has(u));
  console.log(`  Already cached from Phase 2: ${alreadyCached}`);
  console.log(`  Need to fetch: ${toFetch.length}`);
  console.log('');

  const redirectTargets = [];
  let status200 = alreadyCached;
  let status301 = 0;
  let status404 = 0;
  let statusOther = 0;
  let fetchErrors = 0;

  for (let i = 0; i < toFetch.length; i++) {
    const url = toFetch[i];
    const idx = `[${String(i + 1).padStart(3)}/${toFetch.length}]`;

    await sleep(REQUEST_DELAY_MS);

    try {
      const resp = await fetchUrlNoRedirect(url);

      if (resp.statusCode === 200) {
        status200++;
        const hreflangTags = extractHreflangTags(resp.body);
        cache.set(url, { statusCode: 200, redirectTarget: null, hreflangTags });
      } else if (resp.statusCode === 301 || resp.statusCode === 302) {
        status301++;
        const target = resp.headers.location || '(unknown)';
        const fullTarget = target.startsWith('http') ? target : new URL(target, url).href;
        cache.set(url, { statusCode: resp.statusCode, redirectTarget: fullTarget, hreflangTags: [] });
        redirectTargets.push({
          hreflangUrl: url,
          redirectsTo: fullTarget,
          statusCode: resp.statusCode,
        });
        console.log(`${idx} ${resp.statusCode} REDIRECT ${url.substring(BASE_URL.length)}`);
        console.log(`         -> ${fullTarget.substring(BASE_URL.length)}`);
      } else if (resp.statusCode === 404) {
        status404++;
        cache.set(url, { statusCode: 404, redirectTarget: null, hreflangTags: [] });
        console.log(`${idx} 404 NOT FOUND ${url.substring(BASE_URL.length)}`);
      } else if (resp.statusCode === 429) {
        // Rate limited - increase delay and retry
        console.log(`${idx} 429 RATE LIMITED - backing off to 1000ms...`);
        REQUEST_DELAY_MS = 1000;
        await sleep(1000);
        try {
          const retryResp = await fetchUrlNoRedirect(url);
          if (retryResp.statusCode === 200) {
            status200++;
            const hreflangTags = extractHreflangTags(retryResp.body);
            cache.set(url, { statusCode: 200, redirectTarget: null, hreflangTags });
          } else {
            statusOther++;
            cache.set(url, { statusCode: retryResp.statusCode, redirectTarget: null, hreflangTags: [] });
            console.log(`${idx} ${retryResp.statusCode} (retry) ${url.substring(BASE_URL.length)}`);
          }
        } catch (retryErr) {
          fetchErrors++;
          cache.set(url, { statusCode: 'ERROR', redirectTarget: null, hreflangTags: [] });
        }
      } else {
        statusOther++;
        cache.set(url, { statusCode: resp.statusCode, redirectTarget: null, hreflangTags: [] });
        console.log(`${idx} ${resp.statusCode} ${url.substring(BASE_URL.length)}`);
      }
    } catch (err) {
      fetchErrors++;
      cache.set(url, { statusCode: 'ERROR', redirectTarget: null, hreflangTags: [] });
      console.log(`${idx} ERROR ${url.substring(BASE_URL.length)} - ${err.message.substring(0, 50)}`);
    }
  }

  console.log('');
  console.log(`  Resolution summary:`);
  console.log(`    200 OK:      ${status200}`);
  console.log(`    301/302:     ${status301}`);
  console.log(`    404:         ${status404}`);
  console.log(`    Other:       ${statusOther}`);
  console.log(`    Errors:      ${fetchErrors}`);

  // Add HREFLANG_REDIRECTS issues to pages
  for (const page of pages) {
    for (const tag of page.hreflangTags) {
      const resolution = cache.get(tag.href);
      if (resolution) {
        if (resolution.statusCode === 301 || resolution.statusCode === 302) {
          page.issues.push({
            check: 'HREFLANG_REDIRECTS',
            severity: 'CRITICAL',
            detail: `Hreflang ${tag.hreflang} -> "${tag.href}" returns ${resolution.statusCode} -> "${resolution.redirectTarget}"`,
          });
        } else if (resolution.statusCode === 404) {
          page.issues.push({
            check: 'HREFLANG_404',
            severity: 'CRITICAL',
            detail: `Hreflang ${tag.hreflang} -> "${tag.href}" returns 404`,
          });
        }
      }
    }
  }

  return { cache, redirectTargets, totalChecked: uniqueUrls.length, status200, status301, status404 };
}

// ─── Phase 5: Reciprocal Verification ──────────────────────────────────────────

async function verifyReciprocals(pages, cache) {
  console.log('');
  console.log('='.repeat(80));
  console.log('  PHASE 5: RECIPROCAL VERIFICATION');
  console.log('='.repeat(80));
  console.log('');

  let totalChecked = 0;
  let totalMissing = 0;
  let pagesChecked = 0;

  // For each page, check that each hreflang target links back
  for (const page of pages) {
    if (page.statusCode !== 200 || page.hreflangTags.length === 0) continue;
    pagesChecked++;

    for (const tag of page.hreflangTags) {
      if (tag.hreflang === 'x-default') continue;

      const targetResolution = cache.get(tag.href);
      if (!targetResolution || targetResolution.statusCode !== 200) continue;

      totalChecked++;

      // Check if target's hreflang includes a link back to this page
      const targetHreflangs = targetResolution.hreflangTags || [];

      // Determine what hreflang code the source page should be listed as
      const sourceExpectedCode = HREFLANG_MAP[page.locale];
      const reciprocal = targetHreflangs.find(t => {
        if (t.hreflang !== sourceExpectedCode && t.hreflang !== page.locale) return false;
        // Check if href matches our page URL
        const normHref = t.href.replace(/\/$/, '');
        const normPageUrl = page.url.replace(/\/$/, '');
        return normHref === normPageUrl;
      });

      if (!reciprocal) {
        totalMissing++;
        // Check if target has ANY hreflang pointing to source locale (but wrong URL)
        const anyForLocale = targetHreflangs.find(t =>
          t.hreflang === sourceExpectedCode || t.hreflang === page.locale
        );

        let detail;
        if (anyForLocale) {
          detail = `Target "${tag.href}" links back to "${anyForLocale.href}" instead of "${page.url}" for hreflang="${sourceExpectedCode}"`;
        } else {
          detail = `Target "${tag.href}" has no hreflang back to source page "${page.url}" (expected hreflang="${sourceExpectedCode}")`;
        }

        page.issues.push({
          check: 'RECIPROCAL_MISSING',
          severity: 'HIGH',
          detail,
        });
      }
    }
  }

  console.log(`  Pages checked: ${pagesChecked}`);
  console.log(`  Reciprocal links verified: ${totalChecked}`);
  console.log(`  Missing reciprocals: ${totalMissing}`);

  return { totalChecked, totalMissing };
}

// ─── Report Generation ─────────────────────────────────────────────────────────

function generateReport(pages, resolution, reciprocals, sitemapCounts) {
  // Count issues
  const issuesByCheck = {};
  const issuesBySeverity = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  const issuesByPageType = {
    blog: { total: 0, withIssues: 0 },
    product: { total: 0, withIssues: 0 },
    theme: { total: 0, withIssues: 0 },
  };

  for (const page of pages) {
    if (issuesByPageType[page.type]) {
      issuesByPageType[page.type].total++;
      if (page.issues.length > 0) {
        issuesByPageType[page.type].withIssues++;
      }
    }

    for (const issue of page.issues) {
      issuesByCheck[issue.check] = (issuesByCheck[issue.check] || 0) + 1;
      if (issuesBySeverity[issue.severity] !== undefined) {
        issuesBySeverity[issue.severity]++;
      }
    }
  }

  const pagesWithIssues = pages.filter(p => p.issues.length > 0).length;

  const report = {
    generatedAt: new Date().toISOString(),
    config: {
      baseUrl: BASE_URL,
      blogSamplesPerLocale: BLOG_SAMPLES_PER_LOCALE,
      productSamplesPerLocale: PRODUCT_SAMPLES_PER_LOCALE,
      themeSamplesPerLocale: THEME_SAMPLES_PER_LOCALE,
      totalPagesAudited: pages.length,
      totalHreflangUrlsChecked: resolution.totalChecked,
      totalReciprocalsChecked: reciprocals.totalChecked,
      sitemapCounts,
    },
    summary: {
      totalPages: pages.length,
      pagesWithIssues,
      issuesByCheck,
      issuesBySeverity,
      issuesByPageType,
    },
    pages: pages.map(p => ({
      url: p.url,
      type: p.type,
      locale: p.locale,
      statusCode: p.statusCode,
      htmlLang: p.htmlLang,
      contentLanguage: p.contentLanguage,
      canonical: p.canonical,
      hreflangCount: p.hreflangCount,
      issues: p.issues,
    })),
    hreflangResolutionSummary: {
      totalChecked: resolution.totalChecked,
      status200: resolution.status200,
      status301: resolution.status301,
      status404: resolution.status404,
      redirectTargets: resolution.redirectTargets,
    },
  };

  return report;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();

  console.log('='.repeat(80));
  console.log('  LESSONCRAFTSTUDIO LIVE HREFLANG AUDIT');
  console.log('  ' + new Date().toISOString());
  console.log('='.repeat(80));

  // Phase 1: URL Discovery
  const { sampled, sitemapCounts } = await discoverUrls();

  // Phase 2 & 3: Fetch, Parse & Check Pages
  const pages = await fetchAndCheckPages(sampled);

  // Phase 4: Hreflang URL Resolution
  const resolution = await resolveHreflangUrls(pages);

  // Phase 5: Reciprocal Verification
  const reciprocals = await verifyReciprocals(pages, resolution.cache);

  // Generate report
  const report = generateReport(pages, resolution, reciprocals, sitemapCounts);

  // Write report
  const outputDir = path.join(__dirname, '..', 'docs', 'audit-results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'live-hreflang-audit.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  // Print summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('');
  console.log('='.repeat(80));
  console.log('  AUDIT COMPLETE');
  console.log('='.repeat(80));
  console.log('');
  console.log(`  Duration: ${elapsed}s`);
  console.log(`  Pages audited: ${report.summary.totalPages}`);
  console.log(`  Pages with issues: ${report.summary.pagesWithIssues}`);
  console.log('');
  console.log('  Issues by severity:');
  for (const [severity, count] of Object.entries(report.summary.issuesBySeverity)) {
    if (count > 0) console.log(`    ${severity}: ${count}`);
  }
  console.log('');
  console.log('  Issues by check:');
  for (const [check, count] of Object.entries(report.summary.issuesByCheck).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${check}: ${count}`);
  }
  console.log('');
  console.log('  Issues by page type:');
  for (const [type, data] of Object.entries(report.summary.issuesByPageType)) {
    console.log(`    ${type}: ${data.withIssues}/${data.total} pages with issues`);
  }
  console.log('');
  console.log('  Hreflang URL resolution:');
  console.log(`    200 OK: ${report.hreflangResolutionSummary.status200}`);
  console.log(`    301/302 redirects: ${report.hreflangResolutionSummary.status301}`);
  console.log(`    404 not found: ${report.hreflangResolutionSummary.status404}`);
  if (report.hreflangResolutionSummary.redirectTargets.length > 0) {
    console.log('');
    console.log('  Redirect targets (first 10):');
    for (const rt of report.hreflangResolutionSummary.redirectTargets.slice(0, 10)) {
      console.log(`    ${rt.statusCode} ${rt.hreflangUrl.substring(BASE_URL.length)}`);
      console.log(`       -> ${rt.redirectsTo.substring(BASE_URL.length)}`);
    }
    if (report.hreflangResolutionSummary.redirectTargets.length > 10) {
      console.log(`    ... and ${report.hreflangResolutionSummary.redirectTargets.length - 10} more`);
    }
  }
  console.log('');
  console.log(`  Report saved to: ${outputPath}`);
  console.log('');
}

main().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
