#!/usr/bin/env node
/**
 * audit-homepage-link-count.js — the crawl-bait gate for homepage work.
 *
 * CLAUDE.md doctrine: ~140 above-fold internal links per locale is
 * load-bearing; homepage changes must preserve or raise it. This script
 * fetches the rendered HTML of a homepage (live or preview) and counts
 * anchor tags, split into internal vs external, failing below the floor.
 *
 * Usage:
 *   node scripts/audit-homepage-link-count.js --base=http://localhost:3000 \
 *     [--path=/en/preview/homepage-v6] [--locales=en,de,fi] [--min=140]
 *
 * Defaults: base http://localhost:3000, path /<locale>, locales en, min 140.
 * Exit 1 when any audited locale falls below the floor.
 */

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);

const BASE = args.base || 'http://localhost:3000';
const LOCALES = String(args.locales || 'en').split(',').filter(Boolean);
const MIN = Number(args.min || 140);
const PATH_TEMPLATE = args.path || null; // e.g. /en/preview/homepage-v6 (locale substituted)

function urlFor(locale) {
  if (PATH_TEMPLATE) {
    return BASE + PATH_TEMPLATE.replace(/\/(en|de|fr|es|it|pt|nl|sv|da|no|fi)(\/|$)/, `/${locale}$2`);
  }
  return `${BASE}/${locale}`;
}

async function audit(locale) {
  const url = urlFor(locale);
  const res = await fetch(url, { headers: { 'user-agent': 'lcs-link-audit' } });
  if (!res.ok) {
    console.error(`  ${locale}: HTTP ${res.status} at ${url}`);
    return { locale, ok: false, count: 0 };
  }
  const html = await res.text();
  const hrefs = [...html.matchAll(/<a\s[^>]*href="([^"]+)"/g)].map((m) => m[1]);
  const internal = hrefs.filter((h) => h.startsWith('/') || h.includes('lessoncraftstudio.com'));
  const localePrefixed = internal.filter((h) => h.startsWith(`/${locale}`) || h.includes(`.com/${locale}`));
  const missing = html.includes('MISSING_MESSAGE');
  const ok = internal.length >= MIN && !missing;
  console.log(
    `  ${locale}: ${internal.length} internal <a> (${localePrefixed.length} locale-prefixed, ${hrefs.length} total)` +
      `${missing ? '  ⚠ MISSING_MESSAGE present' : ''}  ${ok ? 'PASS' : `FAIL (floor ${MIN})`}`,
  );
  return { locale, ok, count: internal.length };
}

(async () => {
  console.log(`Homepage link-count audit — base ${BASE}, floor ${MIN}`);
  const results = [];
  for (const locale of LOCALES) results.push(await audit(locale));
  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`\nFAIL: ${failed.map((f) => f.locale).join(', ')} below the ${MIN}-link floor (or error/missing message).`);
    process.exit(1);
  }
  console.log('\nPASS: every audited locale meets the crawl-bait floor.');
})();
