#!/usr/bin/env node

/**
 * Audit Content-Language header across all page types on live site.
 * Verifies that every page response includes a Content-Language header
 * matching the locale in the URL.
 *
 * Usage: node scripts/audit-content-language.js [--base-url URL]
 */

const BASE_URL = process.argv.includes('--base-url')
  ? process.argv[process.argv.indexOf('--base-url') + 1]
  : 'https://www.lessoncraftstudio.com';

const testUrls = [
  // 11 locale homepages
  { url: '/en', expectedLocale: 'en', type: 'homepage' },
  { url: '/de', expectedLocale: 'de', type: 'homepage' },
  { url: '/fr', expectedLocale: 'fr', type: 'homepage' },
  { url: '/es', expectedLocale: 'es', type: 'homepage' },
  { url: '/pt', expectedLocale: 'pt', type: 'homepage' },
  { url: '/it', expectedLocale: 'it', type: 'homepage' },
  { url: '/nl', expectedLocale: 'nl', type: 'homepage' },
  { url: '/sv', expectedLocale: 'sv', type: 'homepage' },
  { url: '/da', expectedLocale: 'da', type: 'homepage' },
  { url: '/no', expectedLocale: 'no', type: 'homepage' },
  { url: '/fi', expectedLocale: 'fi', type: 'homepage' },

  // Blog posts (mixed locales)
  { url: '/en/blog', expectedLocale: 'en', type: 'blog-index' },
  { url: '/de/blog', expectedLocale: 'de', type: 'blog-index' },
  { url: '/fr/blog', expectedLocale: 'fr', type: 'blog-index' },
  { url: '/es/blog', expectedLocale: 'es', type: 'blog-index' },
  { url: '/it/blog', expectedLocale: 'it', type: 'blog-index' },

  // Product pages (mixed locales)
  { url: '/en/apps', expectedLocale: 'en', type: 'apps-index' },
  { url: '/de/apps', expectedLocale: 'de', type: 'apps-index' },
  { url: '/fr/apps', expectedLocale: 'fr', type: 'apps-index' },

  // Worksheet pages (mixed locales)
  { url: '/en/worksheets', expectedLocale: 'en', type: 'worksheets' },
  { url: '/de/worksheets', expectedLocale: 'de', type: 'worksheets' },
  { url: '/fr/worksheets', expectedLocale: 'fr', type: 'worksheets' },

  // Pricing page
  { url: '/en/pricing', expectedLocale: 'en', type: 'pricing' },
  { url: '/de/pricing', expectedLocale: 'de', type: 'pricing' },
];

async function checkUrl(entry) {
  const fullUrl = `${BASE_URL}${entry.url}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'LCS-Content-Language-Audit/1.0' },
    });

    const contentLang = response.headers.get('content-language');
    const status = response.status;

    // Follow redirects manually to check final URL
    const finalUrl = response.url || fullUrl;

    const pass = contentLang === entry.expectedLocale;

    return {
      url: entry.url,
      type: entry.type,
      status,
      contentLanguage: contentLang || '(missing)',
      expected: entry.expectedLocale,
      pass,
      finalUrl: finalUrl !== fullUrl ? finalUrl : null,
    };
  } catch (err) {
    return {
      url: entry.url,
      type: entry.type,
      status: 'ERROR',
      contentLanguage: '(error)',
      expected: entry.expectedLocale,
      pass: false,
      error: err.message,
    };
  }
}

async function main() {
  console.log(`\nAuditing Content-Language headers on ${BASE_URL}`);
  console.log('='.repeat(80));

  const results = [];
  // Process in batches of 5 to avoid overwhelming the server
  for (let i = 0; i < testUrls.length; i += 5) {
    const batch = testUrls.slice(i, i + 5);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
  }

  // Print results
  let passCount = 0;
  let failCount = 0;

  for (const r of results) {
    const icon = r.pass ? 'PASS' : 'FAIL';
    if (r.pass) passCount++;
    else failCount++;

    const redirect = r.finalUrl ? ` -> ${r.finalUrl}` : '';
    console.log(
      `[${icon}] ${r.url.padEnd(30)} ` +
      `type=${r.type.padEnd(14)} ` +
      `status=${String(r.status).padEnd(4)} ` +
      `Content-Language=${r.contentLanguage.padEnd(10)} ` +
      `expected=${r.expected}${redirect}`
    );

    if (r.error) {
      console.log(`       Error: ${r.error}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Results: ${passCount} passed, ${failCount} failed out of ${results.length} URLs`);

  if (failCount > 0) {
    console.log('\nFailed URLs:');
    for (const r of results.filter(r => !r.pass)) {
      console.log(`  ${r.url} - got "${r.contentLanguage}", expected "${r.expected}"`);
    }
    process.exit(1);
  } else {
    console.log('\nAll URLs have correct Content-Language headers!');
    process.exit(0);
  }
}

main();
