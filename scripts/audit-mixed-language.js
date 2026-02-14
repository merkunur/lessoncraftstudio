#!/usr/bin/env node

/**
 * audit-mixed-language.js
 *
 * Verifies no English text leaks on non-English pages.
 * Checks for common English fallback strings that shouldn't appear
 * on non-English locale pages.
 *
 * Usage: node scripts/audit-mixed-language.js [--base-url URL]
 */

const BASE_URL = process.argv.includes('--base-url')
  ? process.argv[process.argv.indexOf('--base-url') + 1]
  : 'https://www.lessoncraftstudio.com';

const NON_EN_LOCALES = ['de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

// English strings that should NEVER appear on non-English pages
const ENGLISH_LEAK_PATTERNS = [
  // Error page strings (the fix in this PR)
  'Something went wrong',
  'Try again',
  'Go to homepage',
  // Loading fallbacks
  'Loading...',
  // Raw translation key paths (would indicate missing translations)
  'navigation.apps',
  'navigation.worksheets',
  'navigation.blog',
  'navigation.pricing',
  'footer.copyright',
  'footer.privacy',
  // Common untranslated UI strings
  'Read more',
  'Learn more',
  'Sign up',
  'Log in',
  'Subscribe now',
  'View all',
  'Back to',
  'Page not found',
];

// Pages to check per locale
const PAGE_PATHS = [
  '',             // homepage
  '/blog',        // blog index
  '/apps',        // apps index
  '/pricing',     // pricing
];

async function fetchPageText(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'LCS-Mixed-Language-Audit/1.0',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return { error: `HTTP ${res.status}`, text: '' };
    }

    const html = await res.text();

    // Extract visible text content (strip tags, scripts, styles)
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return { error: null, text };
  } catch (err) {
    return { error: err.message, text: '' };
  }
}

async function auditPage(locale, path) {
  const url = `${BASE_URL}/${locale}${path}`;
  const { error, text } = await fetchPageText(url);

  if (error) {
    return { url, status: 'error', error, leaks: [] };
  }

  const leaks = [];
  for (const pattern of ENGLISH_LEAK_PATTERNS) {
    // Use word-boundary regex to avoid false positives
    // e.g. Danish "Log ind" should NOT match "Log in"
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[\\s,;.!?()])${escaped}(?=$|[\\s,;.!?()])`, 'g');
    const match = regex.exec(text);
    if (match) {
      // Get surrounding context (50 chars each side)
      const idx = match.index;
      const start = Math.max(0, idx - 50);
      const end = Math.min(text.length, idx + match[0].length + 50);
      const context = text.slice(start, end).trim();
      leaks.push({ pattern, context });
    }
  }

  return { url, status: leaks.length > 0 ? 'FAIL' : 'PASS', leaks };
}

async function main() {
  console.log('=== Mixed-Language Content Audit ===');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Checking ${NON_EN_LOCALES.length} non-English locales x ${PAGE_PATHS.length} pages`);
  console.log(`Looking for ${ENGLISH_LEAK_PATTERNS.length} English leak patterns\n`);

  let totalPages = 0;
  let totalPass = 0;
  let totalFail = 0;
  let totalError = 0;
  const failures = [];

  for (const locale of NON_EN_LOCALES) {
    console.log(`--- Locale: ${locale} ---`);

    for (const path of PAGE_PATHS) {
      const result = await auditPage(locale, path);
      totalPages++;

      if (result.status === 'error') {
        totalError++;
        console.log(`  ${result.url} - ERROR: ${result.error}`);
      } else if (result.status === 'FAIL') {
        totalFail++;
        console.log(`  ${result.url} - FAIL (${result.leaks.length} leak(s))`);
        for (const leak of result.leaks) {
          console.log(`    English detected: "${leak.pattern}"`);
          console.log(`    Context: ...${leak.context}...`);
        }
        failures.push(result);
      } else {
        totalPass++;
        console.log(`  ${result.url} - PASS`);
      }
    }
    console.log();
  }

  console.log('=== Summary ===');
  console.log(`Total pages checked: ${totalPages}`);
  console.log(`  PASS: ${totalPass}`);
  console.log(`  FAIL: ${totalFail}`);
  console.log(`  ERROR: ${totalError}`);

  if (failures.length > 0) {
    console.log('\n=== Failures Detail ===');
    for (const f of failures) {
      console.log(`\n${f.url}:`);
      for (const leak of f.leaks) {
        console.log(`  - "${leak.pattern}"`);
      }
    }
  }

  if (totalFail > 0) {
    console.log('\nRESULT: FAIL - English text detected on non-English pages');
    process.exit(1);
  } else if (totalError > 0 && totalPass === 0) {
    console.log('\nRESULT: INCONCLUSIVE - all pages returned errors');
    process.exit(2);
  } else {
    console.log('\nRESULT: PASS - no English text leaks detected');
    process.exit(0);
  }
}

main();
