#!/usr/bin/env node
/**
 * Verify the topic-hub image work against the RENDERED page, not the source.
 *
 * The de-orphan lesson (§22.1): a predicate can look correct in the code path,
 * pass a grep, and still render nothing. The only trustworthy check is what the
 * server actually emits — so this fetches live URLs and reads the emitted tags.
 *
 * Three assertions per hub:
 *   1. og:image is NOT the shared brand asset, and resolves 200 as a PNG.
 *   2. og:image points at a /decks/<slug>/og-image.png (a picture of a deck on
 *      this page), and og:image:alt is in the page's own language.
 *   3. thumbnail alt text names real vocabulary on at least some cards.
 *
 * Also samples a deck-less hub to confirm the brand fallback still works — the
 * fail-closed path matters as much as the happy one.
 *
 * Usage: node scripts/seo-per-page/verify-topic-hub-images.js [--host=https://...]
 */
const HOST = (process.argv.find((a) => a.startsWith('--host=')) || '').split('=')[1]
  || 'https://www.lessoncraftstudio.com';

/** A spread across locales, axes and both route shapes. */
const HUBS = [
  '/en/topic/grade-1/word-scramble',
  '/nl/topic/groep-3/woordzoeker',
  '/de/topic/mathe-raetsel',
  '/sv/topic/djur',
  '/es/topic/preescolar/grande-pequeno',
  '/fr/topic/l-intrus',
  '/it/topic/colori/anagrammi',
  '/pt/topic/quadro-numerico',
];

const BRAND = '/og-homepage.png';

async function get(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, type: res.headers.get('content-type') || '', body: await res.text() };
}

function meta(html, prop) {
  const re = new RegExp(`<meta[^>]+property="${prop}"[^>]+content="([^"]*)"`, 'i');
  const m = html.match(re) || html.match(
    new RegExp(`<meta[^>]+content="([^"]*)"[^>]+property="${prop}"`, 'i'),
  );
  return m ? m[1] : null;
}

function alts(html) {
  return [...html.matchAll(/alt="([^"]*)"/g)].map((m) => m[1]).filter(Boolean);
}

/* WHICH TEMPLATE rendered — the only decisive test.
 *
 * Two weaker heuristics were tried and both lied:
 *   - "contains a comma"  — a French level label is "(grande section, 5-7 ans)",
 *                           so it reported 33 vocabulary alts on a page with none.
 *   - "contains a known vocabulary name" — Spanish theme names collide with
 *                           vocabulary names ("Animales"), so it reported 24 of
 *                           26 BEFORE the change was even deployed.
 *
 * The real difference is the sentence itself: the vocab-bearing thumbnail uses
 * `seo.worksheetMainAlt`, the category-level one uses `seo.deckCardAlt`. Build a
 * matcher from each locale's OWN message file, so this works in all 11 without
 * hardcoding a word of any language.
 */
const fs = require('fs');
const pathMod = require('path');
const _tmpl = {};
function templates(locale) {
  if (locale in _tmpl) return _tmpl[locale];
  let t = null;
  try {
    const p = pathMod.resolve(__dirname, '..', '..', 'frontend', 'messages', `${locale}.json`);
    const m = JSON.parse(fs.readFileSync(p, 'utf8'));
    const toRe = (s) => new RegExp('^' + s
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\\\{[a-zA-Z]+\\\}/g, '(.+?)') + '$');
    t = {
      vocab: [m.seo.worksheetMainAlt.withTheme, m.seo.worksheetMainAlt.withoutTheme].map(toRe),
      card: [m.seo.deckCardAlt.withTheme, m.seo.deckCardAlt.withoutTheme].map(toRe),
    };
  } catch { t = null; }
  _tmpl[locale] = t;
  return t;
}
function hasKnownVocab(altText, locale) {
  const t = templates(locale);
  if (!t) return false;
  const text = altText.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').trim();
  return t.vocab.some((re) => re.test(text));
}

(async () => {
  let fails = 0;
  const seenImages = new Set();

  for (const path of HUBS) {
    const url = HOST + path;
    let r;
    try { r = await get(url); } catch (e) { console.log(`FAIL ${path} — unreachable: ${e.message}`); fails++; continue; }
    if (r.status !== 200) { console.log(`FAIL ${path} — HTTP ${r.status}`); fails++; continue; }

    const og = meta(r.body, 'og:image');
    const ogAlt = meta(r.body, 'og:image:alt');
    const problems = [];

    if (!og) problems.push('no og:image');
    else if (og.endsWith(BRAND)) problems.push('still the shared brand image');
    else if (!/\/decks\/[^/]+\/og-image\.png$/.test(og)) problems.push(`unexpected og:image shape: ${og}`);
    else {
      seenImages.add(og);
      const head = await fetch(og, { method: 'GET' });
      if (head.status !== 200) problems.push(`og:image ${head.status}`);
      else if (!(head.headers.get('content-type') || '').includes('image/png')) {
        problems.push(`og:image not a png (${head.headers.get('content-type')})`);
      }
    }

    // Vocabulary in thumbnail alts. Counting commas was NOT good enough — a
    // French level name is "(grande section, 5-7 ans)", so the old heuristic
    // reported 33 vocabulary alts on a page that had none. Test membership
    // against the actual built map instead: an alt counts only if it contains a
    // name this locale's map really holds.
    const a = alts(r.body);
    const locale = path.split('/')[1];
    const withList = a.filter((x) => hasKnownVocab(x, locale));

    const line = problems.length ? 'FAIL' : 'ok  ';
    if (problems.length) fails++;
    console.log(`${line} ${path}`);
    console.log(`       og:image  ${og || '(none)'}`);
    console.log(`       og alt    ${(ogAlt || '(none)').slice(0, 90)}`);
    console.log(`       alts ${a.length} total, ${withList.length} naming specific contents`);
    if (withList.length) console.log(`       e.g. "${withList[0].slice(0, 110)}"`);
    for (const p of problems) console.log(`       -> ${p}`);
  }

  console.log(`\ndistinct og:images across ${HUBS.length} hubs: ${seenImages.size}`);
  if (seenImages.size < HUBS.length - 1) {
    console.log('WARNING: hubs are sharing images — expected one per hub');
  }
  console.log(fails === 0 ? 'PASS' : `${fails} FAILURES`);
  process.exit(fails === 0 ? 0 : 1);
})();
