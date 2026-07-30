#!/usr/bin/env node
/*
 * gen-deck-noindex-exempt-map.js — emit the nginx map body that EXEMPTS
 * landing-less decks from the deck.html `X-Robots-Tag: noindex` header.
 *
 * WHY (2026-07-30). Two individually-correct changes had come to contradict
 * each other:
 *
 *   2026-06-20  sitemap shards 0/1 were narrowed to emit ONLY landing-less
 *               decks, on the documented reasoning that such a deck is
 *               SELF-canonical and "the ONLY indexable surface for its
 *               content" (frontend/app/sitemap/0.xml/route.ts).
 *   2026-07-22  patch-nginx-deck-noindex.py added `noindex, indexifembedded`
 *               to THE deck location block — which serves every deck, so it
 *               covered the landing-less ones too.
 *
 * Net effect: 9,752 sitemapped URLs were noindexed, and ~13.2k decks (29% of
 * the catalog) had no indexable surface anywhere — noindexed themselves, with
 * no /worksheets/ landing to carry them. GSC reports these as "Submitted URL
 * marked 'noindex'".
 *
 * This script writes the exempt set (landing-less decks only). The companion
 * patch-nginx-deck-noindex-exempt.py turns the static header into
 * `add_header X-Robots-Tag $deck_robots always;` where:
 *
 *     map $uri $deck_robots {
 *         default "noindex, indexifembedded";
 *         include /etc/nginx/deck-noindex-exempt.map;
 *     }
 *
 * nginx omits add_header entirely when the value is an empty string, so an
 * exempt deck serves NO X-Robots-Tag at all.
 *
 * FAILS SAFE BY DIRECTION. The map lists what to EXEMPT and the default is
 * noindex, so a missing/stale/truncated map leaves decks noindexed — it can
 * never accidentally un-noindex a deck that HAS a landing and would then
 * compete with it. (Listing the with-landing set instead would fail the other,
 * dangerous way.)
 *
 * STALENESS. The map goes stale the moment a landing is published for a
 * previously landing-less deck: that deck must go BACK to noindex. Re-run this
 * (and reload nginx) after any landing wave — it is wired into publish-wave.js.
 *
 * SOURCE OF TRUTH. Deck set = the live symlink layout under
 * /var/www/lcs-media/decks/ (same substrate as gen-old-slug-redirects.js): a
 * deck is served iff its symlink exists, and unpublish removes it (§15.11), so
 * the filesystem — not the DB — is authoritative for "what nginx will serve".
 * Landing set = frontend/content/seo-landing/<locale>.json, read with the same
 * canonicalDeckSlug/collapseSiblings rule as
 * frontend/lib/seo/landing-content.ts: deckMap().
 *
 * Alias symlinks (name !== target slug) are skipped: they 301 to the canonical
 * slug via $deck_redirect before any header is emitted.
 *
 * Read-only against the catalog; writes only the two artifact files below.
 *   /etc/nginx/deck-noindex-exempt.map        (nginx `map $uri` body)
 *   /opt/lessoncraftstudio/deck-noindex-exempt.txt   (loc|slug, for sampling)
 *
 * Usage (on Hetzner):
 *   node scripts/publish-cli/gen-deck-noindex-exempt-map.js [--dry-run] [--out=PATH]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = '/var/www/lcs-media/decks';
const LANDING_DIR = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing');
const DEFAULT_MAP_OUT = '/etc/nginx/deck-noindex-exempt.map';
const LIST_OUT = '/opt/lessoncraftstudio/deck-noindex-exempt.txt';

const argv = process.argv.slice(2);
const DRY_RUN = argv.includes('--dry-run');
const outArg = argv.find((a) => a.indexOf('--out=') === 0);
const MAP_OUT = outArg ? outArg.slice('--out='.length) : DEFAULT_MAP_OUT;

function isDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch (e) { return false; }
}

/**
 * deckSlug → landingSlug for one locale. Mirrors landing-content.ts deckMap():
 * collapseSiblings REPLACES canonicalDeckSlug when non-empty (the generator
 * includes the canonical slug inside collapseSiblings), else the canonical
 * slug alone. Any deck present here HAS a landing → must stay noindexed.
 */
function loadLandingDeckSet(locale) {
  const p = path.join(LANDING_DIR, locale + '.json');
  let raw;
  try { raw = fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
  let parsed;
  try { parsed = JSON.parse(raw); } catch (e) {
    throw new Error('unparseable landing file for ' + locale + ': ' + e.message);
  }
  const set = new Set();
  const landings = (parsed && parsed.landings) || [];
  for (const l of landings) {
    const decks = l.collapseSiblings && l.collapseSiblings.length
      ? l.collapseSiblings
      : [l.canonicalDeckSlug];
    for (const d of decks) if (d) set.add(d);
  }
  return set;
}

if (!isDir(ROOT)) {
  console.error('FATAL: deck root not found: ' + ROOT + ' (run this on Hetzner)');
  process.exit(1);
}

const locales = fs.readdirSync(ROOT)
  .filter((l) => l[0] !== '.' && isDir(path.join(ROOT, l)))
  .sort();

const mapLines = [];
const listLines = [];
const perLocale = {};
let served = 0;
let withLanding = 0;
let aliases = 0;
let dangling = 0;
const missingLandingFile = [];

for (const loc of locales) {
  const dir = path.join(ROOT, loc);
  const landingDecks = loadLandingDeckSet(loc);
  if (landingDecks === null) {
    // No landing file for this locale => NO deck here has a landing => every
    // deck is landing-less and exempt. Surfaced loudly rather than silently
    // exempting a whole locale on a mis-typed path.
    missingLandingFile.push(loc);
  }
  let entries;
  try { entries = fs.readdirSync(dir); } catch (e) { continue; }
  let n = 0;
  for (const name of entries) {
    if (name[0] === '.') continue;
    const p = path.join(dir, name);
    let st;
    try { st = fs.lstatSync(p); } catch (e) { continue; }
    if (!st.isSymbolicLink()) continue;
    let target;
    try { target = fs.readlinkSync(p); } catch (e) { continue; }
    const slug = target.replace(/\/+$/, '').replace(/-v\d+$/, '');
    if (name !== slug) { aliases++; continue; }        // alias → 301s first
    if (!fs.existsSync(path.join(dir, target.replace(/\/+$/, '')))) { dangling++; continue; }
    served++;
    if (landingDecks && landingDecks.has(slug)) { withLanding++; continue; }

    // Landing-less → exempt. Both key forms, matching the $deck_redirect map's
    // convention (the deck location regex requires the trailing slash, but the
    // no-slash form costs nothing and guards a future block that doesn't).
    mapLines.push('"/' + loc + '/decks/' + slug + '/" "";');
    mapLines.push('"/' + loc + '/decks/' + slug + '" "";');
    listLines.push(loc + '|' + slug);
    n++;
  }
  perLocale[loc] = n;
}

const exemptCount = listLines.length;

console.log('locales scanned:        ' + locales.length);
console.log('served decks (self-link): ' + served);
console.log('  with landing (stay noindex): ' + withLanding);
console.log('  landing-less (EXEMPT):       ' + exemptCount);
console.log('alias symlinks skipped (301 first): ' + aliases);
console.log('dangling symlinks skipped:          ' + dangling);
console.log('per-locale exempt count: ' + JSON.stringify(perLocale));
if (missingLandingFile.length) {
  console.warn('WARNING: no seo-landing file for locale(s): ' + missingLandingFile.join(', ') +
    ' — every deck in them is treated as landing-less. Verify LANDING_DIR: ' + LANDING_DIR);
}

// Guard against writing an empty/absurd map from a bad path or a half-mounted
// filesystem: exempting nothing is safe, but exempting EVERYTHING is not.
if (served > 0 && exemptCount === served) {
  console.error('FATAL: every served deck resolved as landing-less. That means the landing');
  console.error('       files were not read. Refusing to write. Check LANDING_DIR: ' + LANDING_DIR);
  process.exit(1);
}

if (DRY_RUN) {
  console.log('\n--dry-run: nothing written. Would write ' + mapLines.length +
    ' lines to ' + MAP_OUT);
  console.log('sample:\n' + mapLines.slice(0, 4).join('\n'));
  process.exit(0);
}

fs.writeFileSync(MAP_OUT, mapLines.join('\n') + '\n');
try {
  fs.writeFileSync(LIST_OUT, listLines.join('\n') + '\n');
} catch (e) {
  console.warn('note: could not write sample list ' + LIST_OUT + ': ' + e.message);
}
console.log('\nwrote ' + mapLines.length + ' map lines to ' + MAP_OUT);
console.log('Reload nginx for this to take effect:  nginx -t && systemctl reload nginx');
