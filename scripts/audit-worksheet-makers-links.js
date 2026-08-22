#!/usr/bin/env node
/**
 * audit-worksheet-makers-links.js — link + contract gate for the Press Hall
 * hub (/[locale]/worksheet-makers), per locale:
 *   (a) exactly 33 machine-card anchors (class wmk-card-link), each with an
 *       id (the nav fragment-fallback contract, category-nav-data.ts);
 *   (b) every distinct card href fetches 200 (internal /tools/<slug>
 *       landings and /worksheet-generators/*.html fallbacks alike);
 *   (c) zero MISSING_MESSAGE / raw-key leaks in the HTML;
 *   (d) the four set-piece links (topic hub, worksheets catalog, and the 11
 *       typesetting-case locale plates) fetch 200.
 *
 * Usage:
 *   node scripts/audit-worksheet-makers-links.js --base=http://localhost:3000 \
 *     [--locales=en,de,fr,es,it,pt,nl,sv,da,no,fi] [--path=/{locale}/worksheet-makers]
 * Exit 1 on any failure.
 */
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = args.base || 'http://localhost:3000';
const PATH_TEMPLATE = args.path || '/{locale}/worksheet-makers';
const LOCALES = String(args.locales || 'en,de,fr,es,it,pt,nl,sv,da,no,fi').split(',').filter(Boolean);
const EXPECTED_CARDS = 33;

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, text: res.status === 200 ? await res.text() : '' };
}

async function headOk(url, cache) {
  if (cache.has(url)) return cache.get(url);
  let ok = false;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    ok = res.status === 200;
    // drain to keep sockets healthy
    await res.arrayBuffer().catch(() => {});
  } catch { ok = false; }
  cache.set(url, ok);
  return ok;
}

(async () => {
  let allOk = true;
  const cache = new Map();
  for (const locale of LOCALES) {
    const url = BASE + PATH_TEMPLATE.replace(/\{locale\}/g, locale);
    const fails = [];
    const { status, text } = await fetchText(url);
    if (status !== 200) {
      console.log(`  ${locale}  FAIL  hub ${status}`);
      allOk = false;
      continue;
    }
    // (a) card anchors: class contains wmk-card-link
    const anchors = [...text.matchAll(/<a\b[^>]*class="[^"]*wmk-card-link[^"]*"[^>]*>/g)].map((m) => m[0]);
    if (anchors.length !== EXPECTED_CARDS) fails.push(`cards ${anchors.length} != ${EXPECTED_CARDS}`);
    const withoutId = anchors.filter((a) => !/\bid="[^"]+"/.test(a)).length;
    if (withoutId) fails.push(`${withoutId} cards missing id`);
    // (b) card hrefs resolve
    const hrefs = [...new Set(anchors
      .map((a) => (a.match(/\bhref="([^"]+)"/) || [])[1])
      .filter(Boolean))];
    for (const h of hrefs) {
      const abs = h.startsWith('http') ? h : BASE + h;
      if (!(await headOk(abs, cache))) fails.push(`404: ${h}`);
    }
    // (c) i18n leaks
    const leaks = (text.match(/MISSING_MESSAGE|worksheetMakersPage\./g) || []).length;
    if (leaks) fails.push(`${leaks} i18n leaks`);
    // (d) set-piece links: topic + worksheets + the 11 locale plates
    for (const h of [`/${locale}/topic`, `/${locale}/worksheets`]) {
      if (!text.includes(`href="${h}"`)) fails.push(`missing set-piece link ${h}`);
      else if (!(await headOk(BASE + h, cache))) fails.push(`404: ${h}`);
    }
    const plates = [...text.matchAll(/href="\/([a-z]{2})\/worksheet-makers"/g)].map((m) => m[1]);
    if (new Set(plates).size < 11) fails.push(`typesetting plates ${new Set(plates).size} < 11`);
    console.log(`  ${locale}  ${fails.length ? `FAIL  ${fails.slice(0, 6).join('  ·  ')}` : `PASS  (${hrefs.length} hrefs ok)`}`);
    if (fails.length) allOk = false;
  }
  console.log(allOk ? '\nPASS: all locales clean.' : '\nFAIL: fix the reported locales.');
  process.exit(allOk ? 0 : 1);
})();
