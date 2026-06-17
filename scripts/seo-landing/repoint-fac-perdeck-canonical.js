#!/usr/bin/env node
/* One-shot canonical repoint for the find-and-count PER-DECK un-collapse (2026-06-18).
 *
 * The standard repoint-deck-canonical.js only rewrites a `/<locale>/decks/<slug>/` self-canonical
 * → landing. But the find-and-count decks are in a MIXED state on disk:
 *   - by-object decks (find-and-count-<theme>)            still self-canonical to /decks/   (never repointed)
 *   - letter-spotting decks (…-letter-spotting-…-N)        already point at the OLD COLLAPSED landing
 *                                                          /worksheets/find-and-count-<theme>-kindergarten
 * The new en.json gives each deck its OWN per-deck landing, so BOTH states must be rewritten to the
 * new URL. This script replaces each deck.html's CURRENT page-URL (extracted from its canonical tag)
 * AND the bare /decks/<slug>/ form → the deck's new landing URL, across canonical + og:url +
 * twitter:url + JSON-LD url/@id (every place that carries the full quote-terminated page URL). It
 * NEVER touches asset prefixes (…/decks/<slug>/og-image.png, thumbnail.png, *.pdf) — those keep the
 * /decks/ path. Idempotent: backs up to deck.html.perdeck-canonical-bak on first touch; already-correct = noop.
 *
 * MUST run on Hetzner. Usage: node repoint-fac-perdeck-canonical.js [--locale=en] [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const LOCALE = arg('locale', 'en');
const DRY = argv.includes('--dry-run');
const HOST = 'https://www.lessoncraftstudio.com';
const DECKS_ROOT = `/var/www/lcs-media/decks/${LOCALE}`;
const CONTENT = path.resolve(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', LOCALE + '.json');

const data = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
const map = {}; // deckSlug -> newLandingURL  (find-and-count only)
for (const l of data.landings) {
  if (l.coordinate.type !== 'find-and-count') continue;
  const url = `${HOST}/${LOCALE}/worksheets/${l.slug}`;
  const decks = (l.collapseSiblings && l.collapseSiblings.length) ? l.collapseSiblings : [l.canonicalDeckSlug];
  for (const ds of decks) map[ds] = url;
}

let okFiles = 0, replTotal = 0; const missing = [], noop = [], already = [];
for (const [slug, newURL] of Object.entries(map)) {
  const f = `${DECKS_ROOT}/${slug}/deck.html`;
  if (!fs.existsSync(f)) { missing.push(slug); continue; }
  const orig = fs.readFileSync(f, 'utf8');
  const m = orig.match(/rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  const current = m ? m[1] : null;
  if (current === newURL) { already.push(slug); continue; }
  // needles = current page-URL (whatever it is) + the bare /decks/<slug>/ self-canonical form.
  const needles = new Set();
  if (current) needles.add(current);
  needles.add(`${HOST}/${LOCALE}/decks/${slug}/`);
  let html = orig, n = 0;
  for (const needle of needles) {
    if (!needle || needle === newURL) continue;
    for (const q of ['"', "'"]) {
      const parts = html.split(needle + q); n += parts.length - 1; html = parts.join(newURL + q);
    }
  }
  if (n === 0) { noop.push(slug); continue; }
  if (!DRY) {
    const bak = f + '.perdeck-canonical-bak';
    if (!fs.existsSync(bak)) fs.writeFileSync(bak, orig);
    fs.writeFileSync(f, html);
  }
  okFiles++; replTotal += n;
}
console.log(`${DRY ? '[DRY-RUN] ' : ''}fac per-deck repoint locale=${LOCALE}: deck-slugs=${Object.keys(map).length} ` +
  `repointed-files=${okFiles} replacements=${replTotal} already-correct=${already.length} ` +
  `missing=${missing.length}${missing.length ? ' [' + missing.slice(0, 6).join(',') + ']' : ''} ` +
  `noop=${noop.length}${noop.length ? ' [' + noop.slice(0, 6).join(',') + ']' : ''}`);
