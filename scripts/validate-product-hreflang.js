/**
 * Part 18: Product Page Hreflang Validation
 *
 * Validates that the hreflang output for product pages is correct,
 * complete, and consistent between the HTML path (page.tsx generateMetadata)
 * and the sitemap path (sitemap.ts).
 *
 * Since product pages are config-driven (not DB-driven), this script
 * runs locally without database access.
 *
 * 5 checks performed:
 *   1. HTML_SITEMAP_MATCH    - HTML and sitemap paths produce identical hreflang
 *   2. COMPLETE_COVERAGE     - Every app has all 11 locales + x-default (12 entries)
 *   3. HREFLANG_CODE_CORRECT - Keys use correct ISO codes (pt-BR not pt, etc.)
 *   4. URL_FORMAT_VALID      - Every URL matches expected pattern
 *   5. RECIPROCAL_LINKS      - Every page A declaring B also gets declared by B
 *
 * Usage (run from frontend directory):
 *   cd frontend
 *   NODE_PATH=./node_modules node ../scripts/validate-product-hreflang.js
 *
 * Exit code: 0 = clean, 1 = issues found
 */

const path = require('path');

// ---------------------------------------------------------------------------
// Bootstrap ts-node so we can require .ts config files
// ---------------------------------------------------------------------------
require('ts-node').register({
  transpileOnly: true,
  skipProject: true,
  compilerOptions: {
    module: 'commonjs',
    moduleResolution: 'node',
    jsx: 'react-jsx',
    esModuleInterop: true,
    strict: false,
  },
});
require('tsconfig-paths').register({
  baseUrl: path.join(__dirname, '..', 'frontend'),
  paths: { '@/*': ['./*'] },
});

// ---------------------------------------------------------------------------
// Imports from the actual codebase
// ---------------------------------------------------------------------------
const {
  productPageSlugs,
  getAlternateUrls,
  getAppConfigBySlug,
  SUPPORTED_LOCALES: SLUG_LOCALES,
} = require('../frontend/config/product-page-slugs');

const {
  getContentBySlug,
} = require('../frontend/config/product-page-content');

const { getHreflangCode, hreflangMap } = require('../frontend/lib/schema-generator');

const { SUPPORTED_LOCALES } = require('../frontend/config/locales');

const BASE = 'https://www.lessoncraftstudio.com';

// ---------------------------------------------------------------------------
// Issue tracking
// ---------------------------------------------------------------------------
const issues = [];

function addIssue(check, appId, locale, message) {
  issues.push({ check, appId, locale: locale || '-', message });
}

// ---------------------------------------------------------------------------
// Check 1: HTML_SITEMAP_MATCH
//
// Simulate the HTML path (page.tsx generateMetadata):
//   For each (locale, slug) pair:
//     getContentBySlug(locale, slug) -> confirms content exists
//     getAppConfigBySlug(slug)       -> gets appId
//     getAlternateUrls(appId)        -> hreflang output
//
// Simulate the sitemap path (sitemap.ts):
//   For each app in productPageSlugs:
//     getAlternateUrls(app.appId)    -> hreflang output
//
// Both must produce identical hreflang for the same app.
// ---------------------------------------------------------------------------
function checkHtmlSitemapMatch() {
  let checked = 0;

  for (const config of productPageSlugs) {
    // --- Sitemap path ---
    const sitemapHreflang = getAlternateUrls(config.appId, BASE);

    for (const locale of SUPPORTED_LOCALES) {
      const slug = config.slugs[locale];
      if (!slug) continue;
      checked++;

      // --- HTML path ---
      // Step 1: page.tsx looks up content
      const content = getContentBySlug(locale, slug);
      if (!content) {
        addIssue('HTML_SITEMAP_MATCH', config.appId, locale,
          `getContentBySlug("${locale}", "${slug}") returned undefined - HTML path would not generate hreflang`);
        continue;
      }

      // Step 2: page.tsx looks up app config
      const appConfig = getAppConfigBySlug(slug);
      if (!appConfig) {
        addIssue('HTML_SITEMAP_MATCH', config.appId, locale,
          `getAppConfigBySlug("${slug}") returned undefined - HTML path would not generate hreflang`);
        continue;
      }

      // Step 3: page.tsx calls getAlternateUrls
      const htmlHreflang = getAlternateUrls(appConfig.appId, BASE);

      // --- Compare ---
      const htmlKeys = Object.keys(htmlHreflang).sort();
      const sitemapKeys = Object.keys(sitemapHreflang).sort();

      if (htmlKeys.join(',') !== sitemapKeys.join(',')) {
        const onlyHtml = htmlKeys.filter(k => !sitemapKeys.includes(k));
        const onlySitemap = sitemapKeys.filter(k => !htmlKeys.includes(k));
        addIssue('HTML_SITEMAP_MATCH', config.appId, locale,
          `Key mismatch: HTML-only=[${onlyHtml.join(',')}], Sitemap-only=[${onlySitemap.join(',')}]`);
        continue;
      }

      for (const key of htmlKeys) {
        if (htmlHreflang[key] !== sitemapHreflang[key]) {
          addIssue('HTML_SITEMAP_MATCH', config.appId, locale,
            `URL mismatch for "${key}": HTML="${htmlHreflang[key]}" vs Sitemap="${sitemapHreflang[key]}"`);
        }
      }
    }
  }
  return checked;
}

// ---------------------------------------------------------------------------
// Check 2: COMPLETE_COVERAGE
//
// Every app must have hreflang entries for all 11 locales + x-default = 12.
// Unlike blog posts which can have partial translations, product pages must
// always have all 11 locales.
// ---------------------------------------------------------------------------
function checkCompleteCoverage() {
  let checked = 0;

  for (const config of productPageSlugs) {
    checked++;
    const urls = getAlternateUrls(config.appId, BASE);
    const keys = Object.keys(urls);

    // Check for each locale
    for (const locale of SUPPORTED_LOCALES) {
      const hreflang = getHreflangCode(locale);
      if (!urls[hreflang]) {
        addIssue('COMPLETE_COVERAGE', config.appId, locale,
          `Missing hreflang entry for "${hreflang}"`);
      }
    }

    // Check for x-default
    if (!urls['x-default']) {
      addIssue('COMPLETE_COVERAGE', config.appId, null,
        `Missing x-default entry`);
    }

    // Check total count (11 locales + x-default = 12)
    const expectedCount = SUPPORTED_LOCALES.length + 1;
    if (keys.length !== expectedCount) {
      addIssue('COMPLETE_COVERAGE', config.appId, null,
        `Expected ${expectedCount} hreflang entries, got ${keys.length}`);
    }
  }
  return checked;
}

// ---------------------------------------------------------------------------
// Check 3: HREFLANG_CODE_CORRECT
//
// Verify that hreflang keys use the correct ISO codes:
//   pt -> pt-BR (not just "pt")
//   All others match getHreflangCode() output
// ---------------------------------------------------------------------------
function checkHreflangCodeCorrect() {
  let checked = 0;

  for (const config of productPageSlugs) {
    const urls = getAlternateUrls(config.appId, BASE);

    for (const locale of SUPPORTED_LOCALES) {
      checked++;
      const expectedCode = getHreflangCode(locale);

      // Verify the expected code is a key in the URLs
      if (urls[expectedCode]) {
        // Good - the correct code is used
      } else if (urls[locale] && locale !== expectedCode) {
        // Bad - the raw locale was used instead of the proper hreflang code
        addIssue('HREFLANG_CODE_CORRECT', config.appId, locale,
          `Uses "${locale}" instead of correct hreflang code "${expectedCode}"`);
      }
      // If neither exists, COMPLETE_COVERAGE will catch it
    }
  }
  return checked;
}

// ---------------------------------------------------------------------------
// Check 4: URL_FORMAT_VALID
//
// Every hreflang URL must match pattern:
//   https://www.lessoncraftstudio.com/{locale}/apps/{slug}
// where slug matches the config for that locale.
// ---------------------------------------------------------------------------
function checkUrlFormatValid() {
  let checked = 0;
  const urlPattern = /^https:\/\/www\.lessoncraftstudio\.com\/([a-z]{2})\/apps\/([a-z0-9-]+)$/;

  for (const config of productPageSlugs) {
    const urls = getAlternateUrls(config.appId, BASE);

    for (const [code, url] of Object.entries(urls)) {
      if (code === 'x-default') {
        // x-default should point to English URL
        checked++;
        const expectedXDefault = `${BASE}/en/apps/${config.slugs.en}`;
        if (url !== expectedXDefault) {
          addIssue('URL_FORMAT_VALID', config.appId, null,
            `x-default "${url}" does not match English URL "${expectedXDefault}"`);
        }
        continue;
      }

      checked++;
      const match = url.match(urlPattern);
      if (!match) {
        addIssue('URL_FORMAT_VALID', config.appId, null,
          `URL "${url}" (hreflang="${code}") does not match expected pattern`);
        continue;
      }

      const urlLocale = match[1];
      const urlSlug = match[2];

      // Verify the locale in the URL matches what we expect for this hreflang code
      // Reverse lookup: hreflang code -> locale
      const expectedLocale = Object.entries(hreflangMap).find(([, v]) => v === code)?.[0];
      if (expectedLocale && urlLocale !== expectedLocale) {
        addIssue('URL_FORMAT_VALID', config.appId, urlLocale,
          `URL locale "${urlLocale}" does not match hreflang code "${code}" (expected locale "${expectedLocale}")`);
      }

      // Verify the slug matches the config
      const expectedSlug = config.slugs[urlLocale];
      if (expectedSlug && urlSlug !== expectedSlug) {
        addIssue('URL_FORMAT_VALID', config.appId, urlLocale,
          `URL slug "${urlSlug}" does not match config slug "${expectedSlug}"`);
      }
    }
  }
  return checked;
}

// ---------------------------------------------------------------------------
// Check 5: RECIPROCAL_LINKS
//
// For every page A that declares page B as an alternate, page B's hreflang
// set must declare page A back. Because all locales for the same app share
// the same hreflang object from getAlternateUrls(), this should be trivially
// true — but we verify the architecture is correct.
// ---------------------------------------------------------------------------
function checkReciprocalLinks() {
  let checked = 0;

  // Build a map: URL -> hreflang set
  const urlToHreflang = new Map();

  for (const config of productPageSlugs) {
    const urls = getAlternateUrls(config.appId, BASE);

    for (const [code, url] of Object.entries(urls)) {
      if (code === 'x-default') continue;
      urlToHreflang.set(url, { appId: config.appId, hreflang: urls });
    }
  }

  // Check reciprocity
  for (const config of productPageSlugs) {
    const urls = getAlternateUrls(config.appId, BASE);

    for (const [codeA, urlA] of Object.entries(urls)) {
      if (codeA === 'x-default') continue;

      for (const [codeB, urlB] of Object.entries(urls)) {
        if (codeB === 'x-default' || codeA === codeB) continue;
        checked++;

        // urlA declares urlB as alternate.
        // urlB's page should declare urlA back.
        const pageB = urlToHreflang.get(urlB);
        if (!pageB) {
          addIssue('RECIPROCAL_LINKS', config.appId, null,
            `URL "${urlB}" (hreflang="${codeB}") declared as alternate but has no hreflang entry`);
          continue;
        }

        // Check that pageB's hreflang includes urlA
        const pageBUrls = Object.values(pageB.hreflang);
        if (!pageBUrls.includes(urlA)) {
          addIssue('RECIPROCAL_LINKS', config.appId, null,
            `"${urlA}" declares "${urlB}" as alternate, but "${urlB}" does not declare "${urlA}" back`);
        }
      }
    }
  }
  return checked;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log('='.repeat(70));
  console.log('  PRODUCT PAGE HREFLANG VALIDATION');
  console.log('='.repeat(70));
  console.log();

  const appCount = productPageSlugs.length;
  const localeCount = SUPPORTED_LOCALES.length;
  console.log(`Apps: ${appCount}  |  Locales: ${localeCount}  |  Total combos: ${appCount * localeCount}`);
  console.log();

  // Run all 5 checks
  const counts = {};
  counts['HTML_SITEMAP_MATCH'] = checkHtmlSitemapMatch();
  counts['COMPLETE_COVERAGE'] = checkCompleteCoverage();
  counts['HREFLANG_CODE_CORRECT'] = checkHreflangCodeCorrect();
  counts['URL_FORMAT_VALID'] = checkUrlFormatValid();
  counts['RECIPROCAL_LINKS'] = checkReciprocalLinks();

  // Report
  const checks = [
    'HTML_SITEMAP_MATCH',
    'COMPLETE_COVERAGE',
    'HREFLANG_CODE_CORRECT',
    'URL_FORMAT_VALID',
    'RECIPROCAL_LINKS',
  ];

  for (const check of checks) {
    const checkIssues = issues.filter(i => i.check === check);
    const status = checkIssues.length === 0 ? 'PASS' : 'FAIL';
    const icon = status === 'PASS' ? '[OK]' : '[!!]';
    console.log(`${icon} ${check}: ${counts[check]} checked, ${checkIssues.length} issues`);

    if (checkIssues.length > 0) {
      for (const issue of checkIssues) {
        console.log(`     - [${issue.appId}] (${issue.locale}): ${issue.message}`);
      }
    }
  }

  console.log();
  console.log('-'.repeat(70));

  if (issues.length === 0) {
    console.log(`RESULT: ALL CLEAN - ${appCount} apps x ${localeCount} locales, 0 issues`);
    process.exit(0);
  } else {
    console.log(`RESULT: ${issues.length} ISSUES FOUND across ${checks.filter(c => issues.some(i => i.check === c)).length} checks`);
    process.exit(1);
  }
}

main();
