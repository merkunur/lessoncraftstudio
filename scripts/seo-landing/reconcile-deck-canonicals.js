#!/usr/bin/env node
/* Deck.html canonical RECONCILER — forensic-audit 2026-07-10 remediation (report §4.3/§4.5).
 *
 * Enforces the landing-map state (frontend/content/seo-landing/<locale>.json) on every
 * deck.html's page-URL identity (canonical + og:url + twitter:url + JSON-LD url/@id + any
 * hreflang self entries — the same quote-terminated full-URL occurrences the original
 * repoint-deck-canonical.js rewrote). Fixes, in one idempotent pass:
 *   BROKEN_TARGET  canonical -> /worksheets/<slug> that does not exist (the 165 it
 *                  `/it/worksheets/undefined` bake + the 2 renamed es treasure-hunt slugs):
 *                  rewrite to the deck's mapped landing, else restore self-canonical.
 *   STALE_LANDING  canonical -> an existing landing that is NOT the deck's mapped landing
 *                  (or the deck has no mapping at all): rewrite to map value / self.
 *   NEEDS_REPOINT  self-canonical but listed in a landing's canonicalDeckSlug/collapseSiblings
 *                  (the 783 sitemap-orphans: excluded from deck shards by landingSlugForDeck
 *                  yet never repointed): rewrite self -> landing.
 *
 * Unlike repoint-deck-canonical.js (needle = self URL only; NO-OP on already-corrupted files),
 * this script needles on the file's CURRENT canonical value, so corrupted files are reachable.
 *
 * MUST run on Hetzner. Default is DRY-RUN (classification counts + samples). --apply mutates
 * with a .bak.reconcile backup on first touch + atomic temp+rename.
 * Usage: node scripts/seo-landing/reconcile-deck-canonicals.js [--locales=en,de,...] [--apply] [--samples=N]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { replaceQuoteTerminatedOutsideScripts } = require('./replace-outside-scripts');

const HOST = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const LOCALES = arg('locales', '') ? arg('locales', '').split(',').map(s => s.trim()).filter(Boolean) : ALL_LOCALES;
const APPLY = argv.includes('--apply');
const SAMPLES = parseInt(arg('samples', '5'), 10);
const CONTENT_DIR = path.resolve(__dirname, '..', '..', 'frontend', 'content', 'seo-landing');
const DECKS_ROOT = '/var/www/lcs-media/decks';

const CANON_RE = /<link rel="canonical" href="([^"]+)"/;

function loadMaps(locale) {
  const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, locale + '.json'), 'utf8'));
  const deckToLanding = {}; // deckSlug -> landing slug
  const landingSlugs = new Set();
  for (const l of data.landings) {
    if (!l.slug) continue; // defensive: the slugless-entry bug class must never map anything
    landingSlugs.add(l.slug);
    const decks = (l.collapseSiblings && l.collapseSiblings.length) ? l.collapseSiblings : [l.canonicalDeckSlug];
    for (const ds of decks) if (ds) deckToLanding[ds] = l.slug;
    if (l.canonicalDeckSlug) deckToLanding[l.canonicalDeckSlug] = l.slug; // canon deck always maps
  }
  return { deckToLanding, landingSlugs };
}

/* ⚠ Must not reach inside executable <script> blocks. catalog-export.js emits
   a quote-terminated self-canonical assignment (var url="…/<loc>/decks/<slug>/";)
   inside the deck's inline embed affordance — a verbatim match for this needle.
   Rewriting it repointed the embed iframe at a landing page, which posts no
   resize message and renders the full site chrome, so embedding broke on every
   deck a repoint touched. JSON-LD is DATA and is still rewritten; only
   executable code is spared. */
function replaceAllQuoteTerminated(html, fromURL, toURL) {
  const r = replaceQuoteTerminatedOutsideScripts(html, fromURL, toURL);
  return { html: r.html, n: r.n, skipped: r.skipped };
}

function writeAtomic(file, content) {
  const bak = file + '.bak.reconcile';
  if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
  const tmp = file + '.tmp.reconcile';
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}

const totals = {};
const sampleLog = {};
function tally(cls, detail) {
  totals[cls] = (totals[cls] || 0) + 1;
  if (detail && (sampleLog[cls] = sampleLog[cls] || []).length < SAMPLES) sampleLog[cls].push(detail);
}

for (const locale of LOCALES) {
  const { deckToLanding, landingSlugs } = loadMaps(locale);
  const root = path.join(DECKS_ROOT, locale);
  if (!fs.existsSync(root)) { console.warn(`[warn] no deck root for ${locale}`); continue; }
  const dirs = fs.readdirSync(root, { withFileTypes: true })
    .filter(d => d.isDirectory() && /-v\d+$/.test(d.name));
  for (const d of dirs) {
    const slug = d.name.replace(/-v\d+$/, '');
    const file = path.join(root, d.name, 'deck.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const m = html.match(CANON_RE);
    if (!m) { tally('NO_CANONICAL', `${locale}/${slug}`); continue; }
    const canon = m[1];
    const selfURL = `${HOST}/${locale}/decks/${slug}/`;
    const mapped = deckToLanding[slug] ? `${HOST}/${locale}/worksheets/${deckToLanding[slug]}` : null;

    let cls = null, target = null;
    if (canon === selfURL) {
      if (mapped) { cls = 'NEEDS_REPOINT'; target = mapped; }
      else { tally('OK_SELF'); continue; }
    } else {
      const wm = canon.match(new RegExp(`^${HOST}/${locale}/worksheets/([^/"']+)$`.replace(/[/]/g, '\\/')));
      if (!wm) { tally('WEIRD_CANONICAL', `${locale}/${slug} -> ${canon}`); continue; }
      const wslug = wm[1];
      if (mapped && canon === mapped) { tally('OK_LANDING'); continue; }
      if (!landingSlugs.has(wslug)) { cls = 'BROKEN_TARGET'; target = mapped || selfURL; }
      else { cls = 'STALE_LANDING'; target = mapped || selfURL; }
    }

    const { html: out, n } = replaceAllQuoteTerminated(html, canon === selfURL ? selfURL : canon, target);
    if (n === 0) { tally('NEEDLE_MISS', `${locale}/${slug}`); continue; }
    tally(cls, `${locale}/${slug}: ${canon} -> ${target} (${n} repl)`);
    if (APPLY) writeAtomic(file, out);
  }
}

console.log(`\n=== reconcile-deck-canonicals ${APPLY ? 'APPLY' : 'DRY-RUN'} (locales: ${LOCALES.join(',')}) ===`);
for (const [cls, n] of Object.entries(totals).sort((a, b) => b[1] - a[1])) {
  console.log(`${cls.padEnd(16)} ${n}`);
  for (const s of sampleLog[cls] || []) console.log(`    ${s}`);
}
if (!APPLY) console.log('\nDry-run only — re-run with --apply to mutate (backups: deck.html.bak.reconcile).');
