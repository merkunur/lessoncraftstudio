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
 *   --target=<iso>  restrict to CROSS-LANGUAGE landings teaching that target (else bounds to exactly
 *                   the cross-language deck set, not the monolingual same-type decks). Omit for monolingual.
 */
'use strict';
const fs = require('fs');
const path = require('path');
/* ⚠ The replacement MUST NOT reach inside executable <script> blocks.
   This script's needle is `<deckURL>` + a quote, and catalog-export.js emits
   `var url="https://…/<loc>/decks/<slug>/";` inside the deck's inline embed
   affordance — a verbatim match. Every repoint therefore used to drag the
   embed snippet's iframe src onto the landing page, which posts no resize
   message and renders the full site chrome, silently breaking embedding across
   ~32,000 decks. JSON-LD is DATA and is still rewritten; only code is spared. */
const { replaceQuoteTerminatedOutsideScripts } = require('./replace-outside-scripts');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const TYPES = (arg('types', '') ? arg('types', '').split(',').map(s => s.trim()).filter(Boolean) : null); // null = all types
const TARGET = arg('target', null); // cross-language target ISO; null = monolingual (target-less landings + all)
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
  // --target set → only cross-language landings teaching that target; unset → only monolingual
  // (target-less) landings, so a monolingual repoint never strays into the cross-language set.
  if (TARGET ? (l.coordinate.target !== TARGET) : !!l.coordinate.target) continue;
  const landingURL = `${HOST}/${LOCALE}/worksheets/${l.slug}`;
  const decks = (l.collapseSiblings && l.collapseSiblings.length) ? l.collapseSiblings : [l.canonicalDeckSlug];
  for (const ds of decks) map[ds] = landingURL;
}

let okFiles = 0, replTotal = 0, sparedTotal = 0; const missing = [], noop = [];
for (const [slug, landingURL] of Object.entries(map)) {
  const f = `${DECKS_ROOT}/${slug}/deck.html`;
  if (!fs.existsSync(f)) { missing.push(slug); continue; }
  const orig = fs.readFileSync(f, 'utf8');
  const deckURL = `${HOST}/${LOCALE}/decks/${slug}/`;
  const rep = replaceQuoteTerminatedOutsideScripts(orig, deckURL, landingURL);
  let html = rep.html; const n = rep.n;
  sparedTotal += rep.skipped;
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
  `spared-in-scripts=${sparedTotal} missing=${missing.length}${missing.length ? ' [' + missing.slice(0, 8).join(',') + ']' : ''} ` +
  `noop=${noop.length}${noop.length ? ' [' + noop.slice(0, 8).join(',') + ']' : ''}`);
