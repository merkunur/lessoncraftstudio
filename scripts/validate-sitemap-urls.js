#!/usr/bin/env node
/**
 * Sitemap URL Validation (Build-Time)
 *
 * Generates ALL sitemap URLs from the same config files sitemap.ts uses,
 * then simulates ALL middleware redirect rules on each URL to confirm
 * none would trigger a 301. Also checks hreflang alternates and health counts.
 *
 * 0 HTTP requests for IDs 0-4 (config-only sections).
 * IDs 5-6 (DB-dependent) are validated via live sitemap fetch.
 *
 * 4 Checks:
 *   REDIRECT_IN_SITEMAP   - Sitemap URL would trigger a middleware 301
 *   HREFLANG_TO_REDIRECT  - Hreflang alternate points to a redirect URL
 *   SELF_HREFLANG_MISSING - Page not in its own hreflang set
 *   HEALTH_COUNT          - URL count per section within expected range
 *
 * Usage:
 *   node scripts/validate-sitemap-urls.js
 *   node scripts/validate-sitemap-urls.js --offline
 *   node scripts/validate-sitemap-urls.js --base-url https://staging.example.com
 *   node scripts/validate-sitemap-urls.js --json path/to/output.json
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

const HREFLANG_MAP = {
  en: 'en', de: 'de', fr: 'fr', es: 'es', pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};

const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const CONFIG_DIR = path.join(FRONTEND_DIR, 'config');

const USER_AGENT = 'LCS-Sitemap-Validator/1.0';
const REQUEST_TIMEOUT_MS = 15000;
const REQUEST_DELAY_MS = 300;

// Health count expected ranges per section
const HEALTH_RANGES = {
  0: { min: 100, max: 120, label: 'Static pages' },
  1: { min: 330, max: 400, label: 'Product pages' },
  2: { min: 130, max: 160, label: 'Categories + grades' },
  3: { min: 500, max: 600, label: 'Theme hubs' },
  4: { min: 2500, max: 3000, label: 'Theme+grade combos' },
  5: { min: 50, max: 100, label: 'Blog categories' },
  6: { min: 1000, max: 4000, label: 'Blog posts' },
};

// ─── CLI Arguments ──────────────────────────────────────────────────────────────

let BASE_URL = 'https://www.lessoncraftstudio.com';
let JSON_OUTPUT_PATH = null;
let OFFLINE = false;

const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--base-url': BASE_URL = args[++i]; break;
    case '--json': JSON_OUTPUT_PATH = args[++i]; break;
    case '--offline': OFFLINE = true; break;
    case '--help': case '-h':
      console.log('Usage: node scripts/validate-sitemap-urls.js [options]');
      console.log('');
      console.log('Options:');
      console.log('  --base-url URL   Base URL for live sitemap fetch (default: production)');
      console.log('  --json PATH      Custom JSON output path');
      console.log('  --offline        Skip live sitemap fetch (only validate IDs 0-4)');
      console.log('  --help, -h       Show this help');
      process.exit(0);
  }
}

if (!JSON_OUTPUT_PATH) {
  JSON_OUTPUT_PATH = path.join(__dirname, '..', 'docs', 'audit-results', 'sitemap-url-validation.json');
}

// ─── Utilities ──────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function normalizeUrl(url) { return url.replace(/\/$/, '').toLowerCase(); }

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

// ─── XML Parser ─────────────────────────────────────────────────────────────────

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

function extractXmlLocs(xml) {
  const results = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

// ─── TS Config File Loader ──────────────────────────────────────────────────────

function extractBalancedLiteral(content, varName) {
  const idx = content.indexOf(varName);
  if (idx < 0) return null;

  const afterName = content.slice(idx + varName.length);
  const eqIdx = afterName.indexOf('=');
  if (eqIdx < 0) return null;

  const afterEq = content.slice(idx + varName.length + eqIdx + 1);

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

// ─── Middleware Redirect Simulator ──────────────────────────────────────────────

function buildRedirectSimulator() {
  console.log('  Building redirect simulator from config files...');

  // 1. Blog cross-locale redirects: slug -> nativeLocale
  const { crossLocaleSlugs } = require(path.join(CONFIG_DIR, 'blog-cross-locale-redirects'));
  const slugToLocaleMap = new Map();
  for (const { slug, nativeLocale } of crossLocaleSlugs) {
    slugToLocaleMap.set(slug, nativeLocale);
  }
  console.log(`    blog cross-locale: ${slugToLocaleMap.size} slug mappings`);

  // 2. Blog legacy slugs: oldSlug -> { nativeLocale, newSlug }
  const { legacyBlogSlugs } = require(path.join(CONFIG_DIR, 'blog-redirects'));
  const oldSlugMap = new Map();
  for (const { oldSlug, newSlug, locale } of legacyBlogSlugs) {
    oldSlugMap.set(oldSlug, { nativeLocale: locale, newSlug });
  }
  console.log(`    blog legacy: ${oldSlugMap.size} old slug mappings`);

  // 3. Blog category slugs
  const blogCategorySlugMap = loadTsConfig(
    path.join(CONFIG_DIR, 'blog-category-slugs.ts'), 'blogCategorySlugMap'
  );
  // Build reverse lookup: slug -> { categoryId, locale (from which this slug comes) }
  const allBlogCategorySlugs = new Set();
  for (const [, slugs] of Object.entries(blogCategorySlugMap)) {
    for (const slug of Object.values(slugs)) {
      allBlogCategorySlugs.add(slug);
    }
  }
  console.log(`    blog categories: ${Object.keys(blogCategorySlugMap).length} categories`);

  // 4. Product category slugs
  const productCategorySlugMap = loadTsConfig(
    path.join(CONFIG_DIR, 'product-category-slugs.ts'), 'productCategorySlugMap'
  );
  const allProductCategorySlugs = new Set();
  for (const [, slugs] of Object.entries(productCategorySlugMap)) {
    for (const slug of Object.values(slugs)) {
      allProductCategorySlugs.add(slug);
    }
  }
  console.log(`    product categories: ${Object.keys(productCategorySlugMap).length} categories`);

  // 5. Grade slugs
  const gradeSlugMap = loadTsConfig(
    path.join(CONFIG_DIR, 'grade-slugs.ts'), 'gradeSlugMap'
  );
  console.log(`    grades: ${Object.keys(gradeSlugMap).length} grade levels`);

  // 6. Product page slugs (appId + English slug redirects)
  const productPageSlugs = loadTsConfig(
    path.join(CONFIG_DIR, 'product-page-slugs.ts'), 'productPageSlugs'
  );
  const legacyAppIdMap = new Map();
  const englishSlugMap = new Map();
  for (const app of productPageSlugs) {
    const localeToSlug = {};
    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (slug) localeToSlug[locale] = slug;
    }
    legacyAppIdMap.set(app.appId, localeToSlug);
    const enSlug = app.slugs.en;
    if (enSlug) {
      englishSlugMap.set(enSlug, localeToSlug);
    }
  }
  console.log(`    product pages: ${productPageSlugs.length} apps`);

  // Build category reverse lookups (same logic as middleware)
  function getBlogCategoryIdFromSlug(slug) {
    for (const [categoryId, slugs] of Object.entries(blogCategorySlugMap)) {
      for (const s of Object.values(slugs)) {
        if (s === slug) return categoryId;
      }
    }
    return null;
  }

  function getProductCategoryIdFromSlug(slug) {
    for (const [categoryId, slugs] of Object.entries(productCategorySlugMap)) {
      for (const s of Object.values(slugs)) {
        if (s === slug) return categoryId;
      }
    }
    return null;
  }

  function getGradeIdFromSlug(locale, slug) {
    for (const [gradeId, slugs] of Object.entries(gradeSlugMap)) {
      if (slugs[locale] === slug || slugs.en === slug) return gradeId;
    }
    return null;
  }

  /**
   * Simulate middleware redirect logic on a path.
   * Returns null if no redirect, or { target, type } if redirect would fire.
   */
  return function simulateRedirect(urlPath) {
    // Rule 1: Blog cross-locale redirect
    const blogMatch = urlPath.match(/^\/([a-z]{2})\/blog\/(.+)$/);
    if (blogMatch) {
      const [, locale, slug] = blogMatch;

      // 1a. Current slug under wrong locale
      const nativeLocale = slugToLocaleMap.get(slug);
      if (nativeLocale && nativeLocale !== locale) {
        return { target: `/${nativeLocale}/blog/${slug}`, type: 'blog-cross-locale' };
      }

      // 1b. Old slug -> correct locale + new slug
      const oldSlugInfo = oldSlugMap.get(slug);
      if (oldSlugInfo) {
        return { target: `/${oldSlugInfo.nativeLocale}/blog/${oldSlugInfo.newSlug}`, type: 'blog-legacy' };
      }

      // 1c. Fuzzy match (strip suffixes)
      if (!nativeLocale && !oldSlugInfo) {
        const strippedSlug = slug
          .replace(/-final-optimized$/, '')
          .replace(/-optimized$/, '')
          .replace(/-final$/, '');
        if (strippedSlug !== slug) {
          const strippedInfo = oldSlugMap.get(strippedSlug);
          if (strippedInfo) {
            return { target: `/${strippedInfo.nativeLocale}/blog/${strippedInfo.newSlug}`, type: 'blog-legacy-fuzzy' };
          }
          const strippedNative = slugToLocaleMap.get(strippedSlug);
          if (strippedNative && strippedNative !== locale) {
            return { target: `/${strippedNative}/blog/${strippedSlug}`, type: 'blog-cross-locale-fuzzy' };
          }
        }
      }
    }

    // Rule 2: Blog category slug redirect
    const blogCatMatch = urlPath.match(/^\/([a-z]{2})\/blog\/category\/([a-z0-9-]+)$/);
    if (blogCatMatch) {
      const [, catLocale, catSlug] = blogCatMatch;
      const categoryId = getBlogCategoryIdFromSlug(catSlug);
      if (categoryId) {
        const localizedSlug = blogCategorySlugMap[categoryId]?.[catLocale] ?? blogCategorySlugMap[categoryId]?.en ?? categoryId;
        if (localizedSlug !== catSlug) {
          return { target: `/${catLocale}/blog/category/${localizedSlug}`, type: 'blog-category' };
        }
      }
    }

    // Rule 3: Product category slug redirect
    const prodCatMatch = urlPath.match(/^\/([a-z]{2})\/apps\/category\/([a-z0-9-]+)$/);
    if (prodCatMatch) {
      const [, pcLocale, pcSlug] = prodCatMatch;
      const categoryId = getProductCategoryIdFromSlug(pcSlug);
      if (categoryId) {
        const localizedSlug = productCategorySlugMap[categoryId]?.[pcLocale] ?? productCategorySlugMap[categoryId]?.en ?? categoryId;
        if (localizedSlug !== pcSlug) {
          return { target: `/${pcLocale}/apps/category/${localizedSlug}`, type: 'product-category' };
        }
      }
    }

    // Rule 4: Grade slug redirect
    const gradeMatch = urlPath.match(/^\/([a-z]{2})\/apps\/grades\/([a-z0-9-]+)$/);
    if (gradeMatch) {
      const [, grLocale, grSlug] = gradeMatch;
      const gradeId = getGradeIdFromSlug(grLocale, grSlug);
      if (gradeId) {
        const localizedSlug = gradeSlugMap[gradeId]?.[grLocale] || gradeSlugMap[gradeId]?.en;
        if (localizedSlug && localizedSlug !== grSlug) {
          return { target: `/${grLocale}/apps/grades/${localizedSlug}`, type: 'grade' };
        }
      }
    }

    // Rule 5 & 6: Product page appId and English slug redirects
    const appsMatch = urlPath.match(/^\/([a-z]{2})\/apps\/([a-z0-9-]+)$/);
    if (appsMatch) {
      const [, locale, slug] = appsMatch;

      // 5a. AppId -> localized slug
      const localizedSlugs = legacyAppIdMap.get(slug);
      if (localizedSlugs) {
        const targetSlug = localizedSlugs[locale] || localizedSlugs.en;
        if (targetSlug && targetSlug !== slug) {
          return { target: `/${locale}/apps/${targetSlug}`, type: 'product-appid' };
        }
      }

      // 5b. English slug under non-English locale
      if (locale !== 'en') {
        const appSlugs = englishSlugMap.get(slug);
        if (appSlugs) {
          const localizedSlug = appSlugs[locale];
          if (localizedSlug && localizedSlug !== slug) {
            return { target: `/${locale}/apps/${localizedSlug}`, type: 'product-en-slug' };
          }
        }
      }
    }

    return null; // No redirect
  };
}

// ─── Sitemap URL Generator (Config-based, IDs 0-4) ─────────────────────────────

function generateConfigSitemapUrls() {
  console.log('  Generating sitemap URLs from config files...');
  const baseUrl = BASE_URL;

  // Load all config data
  const themeSlugMap = loadTsConfig(path.join(CONFIG_DIR, 'theme-slugs.ts'), 'themeSlugMap');
  const gradeSlugMap = loadTsConfig(path.join(CONFIG_DIR, 'grade-slugs.ts'), 'gradeSlugMap');
  const productPageSlugs = loadTsConfig(path.join(CONFIG_DIR, 'product-page-slugs.ts'), 'productPageSlugs');
  const blogCategorySlugMap = loadTsConfig(path.join(CONFIG_DIR, 'blog-category-slugs.ts'), 'blogCategorySlugMap');
  const productCategorySlugMap = loadTsConfig(path.join(CONFIG_DIR, 'product-category-slugs.ts'), 'productCategorySlugMap');

  const allThemeIds = Object.keys(themeSlugMap);
  const allGradeIds = Object.keys(gradeSlugMap);

  function getHreflangCode(locale) {
    return HREFLANG_MAP[locale] || locale;
  }

  // Helper: generate all-locale hreflang alternates for a shared path
  function allLocaleAlternates(pathStr) {
    const alternates = {};
    for (const lang of ALL_LOCALES) {
      alternates[getHreflangCode(lang)] = `${baseUrl}/${lang}${pathStr}`;
    }
    alternates['x-default'] = `${baseUrl}/en${pathStr}`;
    return alternates;
  }

  const sections = {};

  // ── ID 0: Static pages ──
  const staticPages = [
    '', '/apps', '/pricing', '/blog', '/terms',
    '/privacy', '/faq', '/contact', '/license', '/worksheets',
  ];
  sections[0] = [];
  for (const locale of ALL_LOCALES) {
    for (const pagePath of staticPages) {
      sections[0].push({
        url: `${baseUrl}/${locale}${pagePath}`,
        hreflangs: allLocaleAlternates(pagePath),
        sectionId: 0,
      });
    }
  }
  console.log(`    ID 0 (Static): ${sections[0].length} URLs`);

  // ── ID 1: Product pages ──
  sections[1] = [];
  for (const app of productPageSlugs) {
    // Build alternates for this app
    const appAlternates = {};
    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (slug) {
        appAlternates[getHreflangCode(locale)] = `${baseUrl}/${locale}/apps/${slug}`;
      }
    }
    if (app.slugs.en) {
      appAlternates['x-default'] = `${baseUrl}/en/apps/${app.slugs.en}`;
    }

    for (const [locale, slug] of Object.entries(app.slugs)) {
      if (slug) {
        sections[1].push({
          url: `${baseUrl}/${locale}/apps/${slug}`,
          hreflangs: appAlternates,
          sectionId: 1,
        });
      }
    }
  }
  console.log(`    ID 1 (Product): ${sections[1].length} URLs`);

  // ── ID 2: Categories + grades ──
  sections[2] = [];
  const productCategories = Object.keys(productCategorySlugMap);
  for (const locale of ALL_LOCALES) {
    for (const cat of productCategories) {
      const catAlternates = {};
      for (const lang of ALL_LOCALES) {
        const langSlug = productCategorySlugMap[cat]?.[lang] ?? productCategorySlugMap[cat]?.en ?? cat;
        catAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/category/${langSlug}`;
      }
      catAlternates['x-default'] = `${baseUrl}/en/apps/category/${productCategorySlugMap[cat]?.en ?? cat}`;

      const localeSlug = productCategorySlugMap[cat]?.[locale] ?? productCategorySlugMap[cat]?.en ?? cat;
      sections[2].push({
        url: `${baseUrl}/${locale}/apps/category/${localeSlug}`,
        hreflangs: catAlternates,
        sectionId: 2,
      });
    }
  }

  const grades = allGradeIds;
  for (const locale of ALL_LOCALES) {
    for (const grade of grades) {
      const gradeAlternates = {};
      for (const lang of ALL_LOCALES) {
        const langSlug = gradeSlugMap[grade]?.[lang] || gradeSlugMap[grade]?.en || grade;
        gradeAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/apps/grades/${langSlug}`;
      }
      gradeAlternates['x-default'] = `${baseUrl}/en/apps/grades/${gradeSlugMap[grade]?.en || grade}`;

      const localeSlug = gradeSlugMap[grade]?.[locale] || gradeSlugMap[grade]?.en || grade;
      sections[2].push({
        url: `${baseUrl}/${locale}/apps/grades/${localeSlug}`,
        hreflangs: gradeAlternates,
        sectionId: 2,
      });
    }
  }
  console.log(`    ID 2 (Cat+Grade): ${sections[2].length} URLs`);

  // ── ID 3: Theme hubs ──
  sections[3] = [];
  for (const locale of ALL_LOCALES) {
    for (const themeId of allThemeIds) {
      const slug = themeSlugMap[themeId]?.[locale] ?? themeSlugMap[themeId]?.en;
      if (!slug) continue;

      const themeAlternates = {};
      for (const lang of ALL_LOCALES) {
        const langSlug = themeSlugMap[themeId]?.[lang] ?? themeSlugMap[themeId]?.en;
        if (langSlug) {
          themeAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets/${langSlug}`;
        }
      }
      const enSlug = themeSlugMap[themeId]?.en;
      if (enSlug) themeAlternates['x-default'] = `${baseUrl}/en/worksheets/${enSlug}`;

      sections[3].push({
        url: `${baseUrl}/${locale}/worksheets/${slug}`,
        hreflangs: themeAlternates,
        sectionId: 3,
      });
    }
  }
  console.log(`    ID 3 (Theme): ${sections[3].length} URLs`);

  // ── ID 4: Theme + grade combos ──
  sections[4] = [];
  for (const locale of ALL_LOCALES) {
    for (const themeId of allThemeIds) {
      const tSlug = themeSlugMap[themeId]?.[locale] ?? themeSlugMap[themeId]?.en;
      if (!tSlug) continue;

      for (const gradeId of allGradeIds) {
        const gSlug = gradeSlugMap[gradeId]?.[locale] || gradeSlugMap[gradeId]?.en;
        if (!gSlug) continue;

        const tgAlternates = {};
        for (const lang of ALL_LOCALES) {
          const ltSlug = themeSlugMap[themeId]?.[lang] ?? themeSlugMap[themeId]?.en;
          const lgSlug = gradeSlugMap[gradeId]?.[lang] || gradeSlugMap[gradeId]?.en;
          if (ltSlug && lgSlug) {
            tgAlternates[getHreflangCode(lang)] = `${baseUrl}/${lang}/worksheets/${ltSlug}/${lgSlug}`;
          }
        }
        const enTSlug = themeSlugMap[themeId]?.en;
        const enGSlug = gradeSlugMap[gradeId]?.en;
        if (enTSlug && enGSlug) {
          tgAlternates['x-default'] = `${baseUrl}/en/worksheets/${enTSlug}/${enGSlug}`;
        }

        sections[4].push({
          url: `${baseUrl}/${locale}/worksheets/${tSlug}/${gSlug}`,
          hreflangs: tgAlternates,
          sectionId: 4,
        });
      }
    }
  }
  console.log(`    ID 4 (Theme+Grade): ${sections[4].length} URLs`);

  return sections;
}

// ─── Live Sitemap Fetcher (IDs 5-6) ─────────────────────────────────────────────

async function fetchLiveSitemapSections() {
  console.log('  Fetching live sitemaps for IDs 5-6...');
  const sections = {};

  // Fetch sitemap index to find child sitemap URLs
  let indexXml;
  try {
    indexXml = await fetchUrl(`${BASE_URL}/sitemap.xml`);
  } catch (err) {
    console.log(`    WARN: Could not fetch sitemap.xml: ${err.message}`);
    return sections;
  }

  const childUrls = extractXmlLocs(indexXml);
  console.log(`    Found ${childUrls.length} child sitemaps`);

  for (const childUrl of childUrls) {
    const idMatch = childUrl.match(/\/sitemap\/(\d+)\.xml/);
    if (!idMatch) continue;
    const sitemapId = parseInt(idMatch[1]);

    // Only fetch IDs 5 and 6
    if (sitemapId !== 5 && sitemapId !== 6) continue;

    await sleep(REQUEST_DELAY_MS);
    try {
      const xml = await fetchUrl(childUrl);
      const entries = parseSitemapUrlBlocks(xml);

      sections[sitemapId] = entries.map(e => ({
        url: e.loc,
        hreflangs: e.hreflangs,
        sectionId: sitemapId,
      }));

      console.log(`    ID ${sitemapId}: ${entries.length} URLs`);
    } catch (err) {
      console.log(`    WARN: Could not fetch sitemap/${sitemapId}.xml: ${err.message}`);
    }
  }

  return sections;
}

// ─── Validation ─────────────────────────────────────────────────────────────────

function validateUrls(sections, simulateRedirect) {
  console.log('\n  Validating URLs against middleware redirect rules...');
  const issues = [];
  const sectionCounts = {};

  for (const [sectionId, entries] of Object.entries(sections)) {
    const id = parseInt(sectionId);
    sectionCounts[id] = entries.length;
    let redirectCount = 0;
    let hreflangRedirectCount = 0;
    let selfMissingCount = 0;

    for (const entry of entries) {
      // Extract path from URL
      const urlObj = new URL(entry.url);
      const urlPath = urlObj.pathname;

      // Check 1: REDIRECT_IN_SITEMAP
      const redirect = simulateRedirect(urlPath);
      if (redirect) {
        redirectCount++;
        issues.push({
          check: 'REDIRECT_IN_SITEMAP',
          severity: 'CRITICAL',
          sectionId: id,
          url: entry.url,
          redirectTarget: redirect.target,
          redirectType: redirect.type,
          detail: `Sitemap URL would 301 to ${redirect.target} (${redirect.type})`,
        });
      }

      // Check 2: HREFLANG_TO_REDIRECT
      for (const [hreflangCode, hreflangUrl] of Object.entries(entry.hreflangs)) {
        if (hreflangCode === 'x-default') continue;
        try {
          const hlPath = new URL(hreflangUrl).pathname;
          const hlRedirect = simulateRedirect(hlPath);
          if (hlRedirect) {
            hreflangRedirectCount++;
            issues.push({
              check: 'HREFLANG_TO_REDIRECT',
              severity: 'HIGH',
              sectionId: id,
              url: entry.url,
              hreflangCode,
              hreflangUrl,
              redirectTarget: hlRedirect.target,
              redirectType: hlRedirect.type,
              detail: `hreflang="${hreflangCode}" target ${hreflangUrl} would 301 to ${hlRedirect.target}`,
            });
          }
        } catch {
          // Malformed URL, skip
        }
      }

      // Check 3: SELF_HREFLANG_MISSING
      const hlCount = Object.keys(entry.hreflangs).length;
      if (hlCount > 0) {
        // Find the locale of this URL
        const localeMatch = urlPath.match(/^\/([a-z]{2})(?:\/|$)/);
        if (localeMatch) {
          const locale = localeMatch[1];
          const selfCode = HREFLANG_MAP[locale];
          if (selfCode) {
            const selfHref = entry.hreflangs[selfCode];
            if (!selfHref) {
              selfMissingCount++;
              issues.push({
                check: 'SELF_HREFLANG_MISSING',
                severity: 'HIGH',
                sectionId: id,
                url: entry.url,
                expectedCode: selfCode,
                detail: `Missing self-referencing hreflang="${selfCode}" for locale ${locale}`,
              });
            } else {
              const normSelf = normalizeUrl(selfHref);
              const normUrl = normalizeUrl(entry.url);
              if (normSelf !== normUrl) {
                selfMissingCount++;
                issues.push({
                  check: 'SELF_HREFLANG_MISSING',
                  severity: 'HIGH',
                  sectionId: id,
                  url: entry.url,
                  expectedCode: selfCode,
                  selfHref,
                  detail: `Self-ref hreflang="${selfCode}" points to ${selfHref} instead of ${entry.url}`,
                });
              }
            }
          }
        }
      }
    }

    console.log(`    ID ${sectionId}: ${entries.length} URLs, ${redirectCount} redirects, ${hreflangRedirectCount} hreflang redirects, ${selfMissingCount} self-missing`);
  }

  return { issues, sectionCounts };
}

function checkHealthCounts(sectionCounts) {
  const healthIssues = [];

  for (const [idStr, range] of Object.entries(HEALTH_RANGES)) {
    const id = parseInt(idStr);
    const count = sectionCounts[id];

    if (count === undefined) {
      if (id <= 4) {
        // Config-based sections should always be present
        healthIssues.push({
          check: 'HEALTH_COUNT',
          severity: 'CRITICAL',
          sectionId: id,
          detail: `Section ${id} (${range.label}) is missing entirely`,
        });
      }
      // IDs 5-6 may be missing in offline mode
      continue;
    }

    if (count < range.min) {
      healthIssues.push({
        check: 'HEALTH_COUNT',
        severity: 'HIGH',
        sectionId: id,
        count,
        expected: `${range.min}-${range.max}`,
        detail: `Section ${id} (${range.label}): ${count} URLs, expected at least ${range.min}`,
      });
    } else if (count > range.max) {
      healthIssues.push({
        check: 'HEALTH_COUNT',
        severity: 'MEDIUM',
        sectionId: id,
        count,
        expected: `${range.min}-${range.max}`,
        detail: `Section ${id} (${range.label}): ${count} URLs, expected at most ${range.max} (may need range update)`,
      });
    }
  }

  return healthIssues;
}

// ─── Report ─────────────────────────────────────────────────────────────────────

function printSummary(allIssues, sectionCounts) {
  console.log('\n' + '='.repeat(72));
  console.log('  SITEMAP URL VALIDATION SUMMARY');
  console.log('='.repeat(72));

  // Health counts table
  console.log('\n  Section Counts:');
  console.log('  ' + '-'.repeat(60));
  let totalUrls = 0;
  for (const [idStr, range] of Object.entries(HEALTH_RANGES)) {
    const id = parseInt(idStr);
    const count = sectionCounts[id];
    const status = count === undefined ? 'SKIPPED'
      : count < range.min ? 'LOW'
      : count > range.max ? 'HIGH'
      : 'OK';
    const countStr = count !== undefined ? String(count).padStart(5) : '    -';
    console.log(`    ID ${id} ${range.label.padEnd(22)} ${countStr}  [${range.min}-${range.max}]  ${status}`);
    if (count !== undefined) totalUrls += count;
  }
  console.log('  ' + '-'.repeat(60));
  console.log(`    TOTAL${' '.repeat(24)} ${String(totalUrls).padStart(5)}`);

  // Issue breakdown
  const byCheck = {};
  const bySeverity = {};
  for (const issue of allIssues) {
    byCheck[issue.check] = (byCheck[issue.check] || 0) + 1;
    bySeverity[issue.severity] = (bySeverity[issue.severity] || 0) + 1;
  }

  console.log('\n  Check Results:');
  console.log('  ' + '-'.repeat(60));
  const checks = ['REDIRECT_IN_SITEMAP', 'HREFLANG_TO_REDIRECT', 'SELF_HREFLANG_MISSING', 'HEALTH_COUNT'];
  for (const check of checks) {
    const count = byCheck[check] || 0;
    const status = count === 0 ? 'PASS' : `FAIL (${count})`;
    console.log(`    ${check.padEnd(25)} ${status}`);
  }

  // Show first critical/high issues
  const criticalHigh = allIssues.filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH');
  if (criticalHigh.length > 0) {
    console.log(`\n  Issues (${criticalHigh.length} critical/high):`);
    console.log('  ' + '-'.repeat(60));
    for (const issue of criticalHigh.slice(0, 20)) {
      console.log(`    [${issue.severity}] ${issue.check}`);
      console.log(`      ${issue.detail}`);
    }
    if (criticalHigh.length > 20) {
      console.log(`    ... and ${criticalHigh.length - 20} more`);
    }
  }

  const totalCriticalHigh = (bySeverity.CRITICAL || 0) + (bySeverity.HIGH || 0);
  const status = totalCriticalHigh === 0 ? 'PASS' : 'FAIL';
  console.log(`\n  STATUS: ${status}${totalCriticalHigh > 0 ? ` (${totalCriticalHigh} critical/high issues)` : ''}`);
  console.log('='.repeat(72) + '\n');

  return status;
}

// ─── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();

  console.log('='.repeat(72));
  console.log('  SITEMAP URL VALIDATION');
  console.log('  ' + new Date().toISOString());
  console.log('  Mode: ' + (OFFLINE ? 'Offline (IDs 0-4 only)' : 'Full (IDs 0-6)'));
  console.log('='.repeat(72));
  console.log('');

  // Step 1: Build redirect simulator
  const simulateRedirect = buildRedirectSimulator();

  // Step 2: Generate config-based sitemap URLs (IDs 0-4)
  console.log('');
  const sections = generateConfigSitemapUrls();

  // Step 3: Fetch live sitemap sections (IDs 5-6) unless offline
  if (!OFFLINE) {
    console.log('');
    const liveSections = await fetchLiveSitemapSections();
    for (const [id, entries] of Object.entries(liveSections)) {
      sections[id] = entries;
    }
  }

  // Step 4: Validate all URLs
  const { issues: urlIssues, sectionCounts } = validateUrls(sections, simulateRedirect);

  // Step 5: Check health counts
  const healthIssues = checkHealthCounts(sectionCounts);

  // Combine all issues
  const allIssues = [...urlIssues, ...healthIssues];

  // Step 6: Summary
  const status = printSummary(allIssues, sectionCounts);

  // Write JSON report
  const byCheck = {};
  const bySeverity = {};
  for (const issue of allIssues) {
    byCheck[issue.check] = (byCheck[issue.check] || 0) + 1;
    bySeverity[issue.severity] = (bySeverity[issue.severity] || 0) + 1;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: OFFLINE ? 'offline' : 'full',
    baseUrl: BASE_URL,
    duration: ((Date.now() - startTime) / 1000).toFixed(1) + 's',
    sectionCounts,
    totalUrls: Object.values(sectionCounts).reduce((s, c) => s + c, 0),
    summary: {
      totalIssues: allIssues.length,
      byCheck,
      bySeverity,
      status,
    },
    healthRanges: HEALTH_RANGES,
    issues: allIssues,
  };

  const outputDir = path.dirname(JSON_OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(JSON_OUTPUT_PATH, JSON.stringify(report, null, 2));
  console.log(`Report written to: ${JSON_OUTPUT_PATH}`);

  const exitCode = status === 'PASS' ? 0 : 1;
  process.exit(exitCode);
}

main().catch(err => {
  console.error('\nFATAL ERROR:', err.message);
  console.error(err.stack);
  process.exit(2);
});
