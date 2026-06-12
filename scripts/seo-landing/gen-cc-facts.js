#!/usr/bin/env node
/* gen-cc-facts.js — Stage-A facts dump for the chart-count landing generator.
 *
 * Reusable across the 8-locale rollout (sv shipped this ad-hoc + uncommitted; this
 * closes that gap for nl/da/no/fr/it/pt). Reads the published chart-count decks for a
 * locale from the DB, groups by theme (subjectTags[0]), picks the canonical deck
 * (earliest publishedAt, the deck the landing's canonicalDeckSlug points to), reads
 * that deck's manifest, and emits per-category {nounKey, locName, count}.
 *
 *   count   = exercises[0].counts[<name>]  — the rendered bar height (the DATA itself;
 *             the §22.1 render-time-quantity rule). Locale-specific per deck.
 *   locName = the manifest's already-localized category name (e.g. the Dutch singular).
 *   nounKey = the image basename, theme-dir + upload-suffix stripped.
 *
 * The honest-count binding (gen-<loc>-chartcount.js): prose p2 counts AND the
 * practiceProblems answers both draw from `count` here → agree-by-construction with
 * the chart. The native PLURAL for the Quiz is resolved downstream (vocab + OVERRIDE).
 *
 * MUST run on Hetzner (DATABASE_URL -> local production Postgres; reads the on-disk
 * deck manifests under /var/www/lcs-media/decks/<locale>/).
 *
 * Usage (on Hetzner):
 *   node scripts/seo-landing/gen-cc-facts.js --locale=nl > scripts/seo-landing/_nl-cc-facts.json
 */
'use strict';
const fs = require('fs');
const db = require('../publish-cli/db');

const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find((s) => s.indexOf('--' + k + '=') === 0); return a ? a.slice(k.length + 3) : d; };
const LOCALE = arg('locale', null);
if (!LOCALE) { console.error('CC-FACTS-ERROR: --locale=<loc> required'); process.exit(1); }
const DECK_ROOT = '/var/www/lcs-media/decks/' + LOCALE + '/';

// image basename -> vocab-canonical nounKey: strip the upload timestamp+hash suffix
// (`ring-1769383010179-6b29f518.webp` -> `ring`; `party-hat-...webp` -> `party-hat`),
// then a bare trailing `-<n>` duplicate counter.
function nounKey(p) {
  // Upload suffix is `-<13-digit-timestamp>-<base36 hash>.webp` (the hash is lowercase
  // alphanumeric, NOT always hex — e.g. `heptagon-1769383459045-so8kiwbv.webp`).
  return p.split('/').pop()
    .replace(/-\d{10,}-[0-9a-z]+\.webp$/i, '')
    .replace(/\.webp$/i, '')
    .replace(/-\d+$/, '');
}

function manifestPath(slug) {
  const dirs = fs.readdirSync(DECK_ROOT).filter((d) => d === slug || d.indexOf(slug + '-v') === 0);
  if (!dirs.length) return null;
  dirs.sort(); // -v1, -v2 ... take the highest
  return DECK_ROOT + dirs[dirs.length - 1] + '/manifest.json';
}

(async function () {
  const c = db.client();
  const rows = await c.deck.findMany({
    where: { language: LOCALE, status: 'published', exerciseType: 'chart-count' },
    select: { slug: true, subjectTags: true, publishedAt: true, id: true },
    orderBy: [{ slug: 'asc' }],
  });

  // group by theme (subjectTags[0]); canonical = earliest publishedAt (tiebreak id) —
  // mirrors enum-wave2-chartcount.js so the canonical matches the landing's deck.
  const groups = {};
  rows.forEach((r) => {
    const theme = (r.subjectTags && r.subjectTags[0]) || null;
    if (!theme) return;
    (groups[theme] = groups[theme] || []).push(r);
  });

  const facts = [];
  const warn = { noManifest: [], noExercise: [], countMiss: [] };
  Object.keys(groups).sort().forEach((theme) => {
    const members = groups[theme].slice().sort((a, b) => {
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : Infinity;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : Infinity;
      if (ta !== tb) return ta - tb;
      return a.id < b.id ? -1 : 1;
    });
    const canonical = members[0].slug;
    const mp = manifestPath(canonical);
    if (!mp) { warn.noManifest.push(canonical); return; }
    const m = JSON.parse(fs.readFileSync(mp, 'utf8'));
    const ex = m.exercises && m.exercises[0];
    if (!ex || !ex.chartImages || !ex.counts) { warn.noExercise.push(canonical); return; }
    const categories = [];
    for (const ci of ex.chartImages) {
      const key = ci.name || ci.word;
      const count = ex.counts[key];
      if (count === undefined) { warn.countMiss.push(canonical + ':' + key); continue; }
      categories.push({ nounKey: nounKey(ci.path || ci.url || ''), locName: key, count });
    }
    facts.push({ slug: canonical, themeKey: theme, siblings: members.map((m) => m.slug), categories });
  });

  // diagnostics to stderr so stdout stays pure JSON
  console.error('=== gen-cc-facts ' + LOCALE + ' ===');
  console.error('decks:', rows.length, ' themes:', Object.keys(groups).length, ' facts emitted:', facts.length);
  if (warn.noManifest.length) console.error('NO MANIFEST:', warn.noManifest.join(', '));
  if (warn.noExercise.length) console.error('NO chartImages/counts:', warn.noExercise.join(', '));
  if (warn.countMiss.length) console.error('COUNT-KEY MISS:', warn.countMiss.join(', '));

  process.stdout.write(JSON.stringify(facts, null, 1) + '\n');
  await db.disconnect();
})().catch((e) => { console.error('CC-FACTS-ERROR:', e && e.message); process.exit(1); });
