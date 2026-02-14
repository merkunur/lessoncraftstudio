#!/usr/bin/env node
/**
 * audit-html-lang.js
 *
 * Verifies that <html lang="..."> is correct across all 11 locales on the live site.
 * Also checks the Content-Language response header.
 *
 * Usage: node scripts/audit-html-lang.js
 */

const BASE = 'https://www.lessoncraftstudio.com';

// All 11 supported locales and their expected hreflang codes
const LOCALES = [
  { code: 'en', hreflang: 'en' },
  { code: 'de', hreflang: 'de' },
  { code: 'fr', hreflang: 'fr' },
  { code: 'es', hreflang: 'es' },
  { code: 'pt', hreflang: 'pt-BR' },
  { code: 'it', hreflang: 'it' },
  { code: 'nl', hreflang: 'nl' },
  { code: 'sv', hreflang: 'sv' },
  { code: 'da', hreflang: 'da' },
  { code: 'no', hreflang: 'no' },
  { code: 'fi', hreflang: 'fi' },
];

// Representative pages to check per locale
function getTestUrls(locale) {
  return [
    `${BASE}/${locale}/apps`,
    `${BASE}/${locale}/worksheets`,
    `${BASE}/${locale}/blog`,
  ];
}

async function checkPage(url, expectedLang, expectedLocale) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'LCS-SEO-Audit/1.0' },
    });

    if (!res.ok) {
      return { url, pass: false, error: `HTTP ${res.status}` };
    }

    const html = await res.text();
    const contentLang = res.headers.get('content-language');

    // Extract <html lang="...">
    const langMatch = html.match(/<html[^>]*\slang="([^"]+)"/i);
    const htmlLang = langMatch ? langMatch[1] : null;

    const issues = [];

    if (!htmlLang) {
      issues.push('missing <html lang>');
    } else if (htmlLang !== expectedLang) {
      issues.push(`<html lang="${htmlLang}"> expected "${expectedLang}"`);
    }

    if (!contentLang) {
      // Content-Language may not be present on all paths (e.g., redirected pages)
      // Only flag as warning, not failure
    } else if (contentLang !== expectedLocale) {
      issues.push(`Content-Language: "${contentLang}" expected "${expectedLocale}"`);
    }

    return {
      url,
      pass: issues.length === 0,
      htmlLang,
      contentLang,
      issues,
    };
  } catch (err) {
    return { url, pass: false, error: err.message };
  }
}

async function main() {
  console.log('Auditing <html lang> across all 11 locales...\n');

  let totalPass = 0;
  let totalFail = 0;
  const failures = [];

  for (const { code, hreflang } of LOCALES) {
    const urls = getTestUrls(code);
    for (const url of urls) {
      const result = await checkPage(url, hreflang, code);
      if (result.pass) {
        totalPass++;
        console.log(`  PASS  ${url}  lang="${result.htmlLang}"  CL="${result.contentLang || 'n/a'}"`);
      } else {
        totalFail++;
        const detail = result.error || result.issues.join('; ');
        console.log(`  FAIL  ${url}  ${detail}`);
        failures.push({ url, detail });
      }
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`Results: ${totalPass}/${totalPass + totalFail} pages pass`);

  if (failures.length > 0) {
    console.log(`\nFailures:`);
    for (const f of failures) {
      console.log(`  ${f.url} — ${f.detail}`);
    }
    process.exit(1);
  } else {
    console.log('All pages have correct <html lang> attributes!');
  }
}

main();
