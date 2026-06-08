#!/usr/bin/env node
/* Deck.html canonical repoint — standing tooling for the SEO/Landing-Page program.
 * (Proven across Wave-1 STEP-2 + Wave-1b; promoted from ad-hoc scratch to committed tooling at Wave 2.)
 *
 * For each landing of the requested exercise-type(s), repoints the baked self-canonical of its deck.html
 * (canonical + every collapse sibling) from `/<locale>/decks/<slug>/` to `/<locale>/worksheets/<landing>`.
 * Replaces ONLY the COMPLETE quote-terminated page-URL value (canonical / og:url / twitter:url / JSON-LD url+@id)
 * — NEVER the asset prefixes (`/decks/<slug>/og-image.png`, `thumbnail.png`, `*-printable.pdf`), so og:image +
 * PDFs stay intact. Idempotent: backs up to deck.html.precanonical-bak only on first touch; already-repointed = noop.
 *
 * MUST run on Hetzner (acts on /var/www/lcs-media/decks/<locale>/<slug>/deck.html). Reads the deployed en.json.
 * Usage: node scripts/seo-landing/repoint-deck-canonical.js --types=chart-count,subtraction [--locale=en] [--dry-run]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPES = (arg('types', '') ? arg('types', '').split(',').map(s => s.trim()).filter(Boolean) : null); // null = all types
const LOCALE = arg('locale', 'en');
const DRY = argv.includes('--dry-run');
const HOST = 'https://www.lessoncraftstudio.com';
const DECKS_ROOT = `/var/www/lcs-media/decks/${LOCALE}`;
// read the per-locale landing content (en.json / de.json / …) so the repoint maps the locale's own slugs.
const CONTENT = path.resolve(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', LOCALE + '.json');

const data = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
const map = {}; // deckSlug -> landingURL
for (const l of data.landings) {
  if (TYPES && !TYPES.includes(l.coordinate.type)) continue;
  const landingURL = `${HOST}/${LOCALE}/worksheets/${l.slug}`;
  const decks = (l.collapseSiblings && l.collapseSiblings.length) ? l.collapseSiblings : [l.canonicalDeckSlug];
  for (const ds of decks) map[ds] = landingURL;
}

let okFiles = 0, replTotal = 0; const missing = [], noop = [];
for (const [slug, landingURL] of Object.entries(map)) {
  const f = `${DECKS_ROOT}/${slug}/deck.html`;
  if (!fs.existsSync(f)) { missing.push(slug); continue; }
  const orig = fs.readFileSync(f, 'utf8');
  const deckURL = `${HOST}/${LOCALE}/decks/${slug}/`;
  let html = orig, n = 0;
  for (const q of ['"', "'"]) {
    const needle = deckURL + q, repl = landingURL + q;
    const parts = html.split(needle); n += parts.length - 1; html = parts.join(repl);
  }
  if (n === 0) { noop.push(slug); continue; }
  if (!DRY) {
    const bak = f + '.precanonical-bak';
    if (!fs.existsSync(bak)) fs.writeFileSync(bak, orig);
    fs.writeFileSync(f, html);
  }
  okFiles++; replTotal += n;
}
console.log(`${DRY ? '[DRY-RUN] ' : ''}repoint types=${TYPES ? TYPES.join('+') : 'ALL'} locale=${LOCALE}: ` +
  `deck-slugs=${Object.keys(map).length} repointed-files=${okFiles} replacements=${replTotal} ` +
  `missing=${missing.length}${missing.length ? ' [' + missing.slice(0, 8).join(',') + ']' : ''} ` +
  `noop=${noop.length}${noop.length ? ' [' + noop.slice(0, 8).join(',') + ']' : ''}`);
