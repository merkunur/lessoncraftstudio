#!/usr/bin/env node
/**
 * gen-var-highlights.js — regenerates frontend/config/worksheets-new-highlights.ts,
 * which feeds the TWO card strips on hub page 1.
 *
 * NEW_WORKSHEET_GROUPS (v2 GROUPS): per locale, the 21 family cards (the 20
 * nt20 families + the K-278 lowercase letter-tracing family), each with its
 * variation landing slugs (tier-1 + tier-2 + theme fans) in curriculum order.
 * Landing slugs are resolved from the locale's landing corpus by
 * canonicalDeckSlug — a variation without a published landing is silently
 * omitted, so the tool can run at any point of the landing rollout and the
 * strip only ever links real pages.
 *
 * MORE_TYPE_GROUPS: the 7 legacy families that can never reach hub page 1 on
 * their own (see MORE_TYPES below). Resolved by SCANNING the corpus for the
 * family key, not by re-deriving deck slugs — their canonical deck slugs carry
 * different ids AND different themes per locale (EN graphing-data-toys-g1142 vs
 * DE diagramme-tiere-g1144; EN measurement-fruits-k038 vs DE messen-tiere-k038),
 * so the BASES-style (id, family, theme) triple resolves nothing in most
 * locales. Unlike the strip above, a short resolve here is a BUG, not a
 * rollout state: every one of these landings exists in all 11 locales today,
 * so the run fails loudly instead of shipping a thinned strip.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const TAX = require(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'));

const LOCALES = ['en', 'de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// base id → { family, theme } (the published nt20 base decks)
const BASES = {
  'K-236': { family: 'pre-writing', theme: 'animals' },
  'K-237': { family: 'number-tracing', theme: null },
  'K-238': { family: 'letter-tracing', theme: null },
  'K-239': { family: 'sight-words', theme: null },
  'K-240': { family: 'cutting-practice', theme: 'animals' },
  'K-241': { family: 'color-by-number', theme: null },
  'K-242': { family: 'mazes', theme: 'toys' },
  'K-243': { family: 'number-bonds', theme: null },
  'G1-208': { family: 'mental-math', theme: null },
  'G1-209': { family: 'fact-families', theme: null },
  'G1-210': { family: 'number-words', theme: null },
  'G1-211': { family: 'money', theme: null },
  'G1-212': { family: 'telling-time', theme: null },
  'G1-213': { family: 'word-problems', theme: 'fruits' },
  'G2-251': { family: 'column-arithmetic', theme: null },
  'G2-252': { family: 'measurement', theme: 'vehicles' },
  'G2-253': { family: 'symmetry', theme: null },
  'G2-254': { family: 'reading-comprehension', theme: null },
  'G3-357': { family: 'column-arithmetic', theme: null },
  'G3-358': { family: 'multiplication-tables', theme: null },
  // the lowercase letter-tracing family — EN only so far; the loop warns and
  // skips a locale with no base landing yet, so this is safe before the fan-out
  'K-278': { family: 'lowercase-letter-tracing', theme: null },
  // nt20-B (2026-09-02): the second batch of 20 types — base decks only, no variations yet
  'K-284': { family: 'word-tracing', theme: 'animals' },
  'K-285': { family: 'dot-to-dot', theme: null },
  'K-286': { family: 'grid-copy', theme: null },
  'K-287': { family: 'singular-plural', theme: 'fruits' },
  'K-288': { family: 'articles', theme: 'animals' },
  'G1-242': { family: 'read-and-color', theme: 'fruits_bw' },
  'G1-243': { family: 'number-of-the-day', theme: null },
  'G1-244': { family: 'write-the-word', theme: 'fruits' },
  'G1-245': { family: 'alphabetical-order', theme: 'animals' },
  'G1-246': { family: 'number-walls', theme: null },
  'G1-247': { family: 'doubles-halves', theme: 'fruits' },
  'G1-248': { family: 'number-lines', theme: null },
  'G1-249': { family: 'sentence-building', theme: 'animals' },
  'G2-274': { family: 'capitals-punctuation', theme: 'vehicles' },
  'G2-275': { family: 'word-classes', theme: 'toys' },
  'G2-276': { family: 'money', theme: 'fruits' },
  'G2-277': { family: 'calendar', theme: null },
  'G2-278': { family: 'picture-writing', theme: 'vehicles' },
  'G2-279': { family: 'grid-coordinates', theme: null },
  'G3-370': { family: 'word-problems', theme: 'fruits' },
};

// base id → its variation keys in curriculum order (matrix assignment; keys
// with @theme are theme-fan decks — deck slug carries the theme segment)
const GROUPS = {
  'K-236': [['K-244', 'pre-writing', 'animals'], ['K-245', 'pre-writing', 'fruits'], ['K-246', 'pre-writing', 'vehicles'], ['K-247', 'pre-writing', 'toys'], ['K-248', 'pre-writing', 'animals']],
  'K-237': [['K-249', 'number-tracing', null], ['K-250', 'number-tracing', null], ['K-251', 'number-tracing', null], ['K-252', 'number-tracing', null], ['K-253', 'number-tracing', null]],
  'K-238': [['K-254', 'letter-tracing', null], ['K-255', 'letter-tracing', null], ['K-256', 'letter-tracing', null], ['K-257', 'letter-tracing', null], ['K-258', 'letter-tracing', null]],
  'K-239': [['K-259', 'sight-words', null], ['K-260', 'sight-words', null], ['K-261', 'sight-words', null], ['K-262', 'sight-words', null], ['K-263', 'sight-words', null]],
  'K-240': [['K-240', 'cutting-practice', 'vehicles'], ['K-240', 'cutting-practice', 'fruits'], ['K-240', 'cutting-practice', 'toys'], ['K-264', 'cutting-practice', 'animals']],
  'K-241': [['K-265', 'color-by-number', null], ['K-266', 'color-by-number', null], ['K-267', 'color-by-number', null], ['K-268', 'color-by-number', null], ['K-269', 'color-by-number', null]],
  'K-242': [['K-270', 'mazes', 'fruits'], ['K-271', 'mazes', 'vehicles'], ['K-272', 'mazes', 'toys'], ['K-242', 'mazes', 'animals'], ['K-242', 'mazes', 'fruits']],
  'K-243': [['K-273', 'number-bonds', null], ['K-274', 'number-bonds', null], ['K-275', 'number-bonds', null], ['K-276', 'number-bonds', null], ['K-277', 'number-bonds', null]],
  'G1-208': [['G1-214', 'mental-math', null], ['G1-215', 'mental-math', null], ['G1-216', 'mental-math', null], ['G1-217', 'mental-math', null], ['G1-218', 'mental-math', null]],
  'G1-209': [['G1-219', 'fact-families', null], ['G1-220', 'fact-families', null], ['G1-221', 'fact-families', null], ['G1-222', 'fact-families', null], ['G3-369', 'fact-families', null]],
  'G1-210': [['G1-223', 'number-words', null], ['G1-224', 'number-words', null], ['G1-225', 'number-words', null], ['G1-226', 'number-words', null], ['G1-227', 'number-words', null]],
  'G1-211': [['G1-228', 'money', null], ['G1-229', 'money', null], ['G1-230', 'money', null], ['G1-231', 'money', null], ['G1-232', 'money', null]],
  'G1-212': [['G1-233', 'telling-time', null], ['G1-234', 'telling-time', null], ['G1-235', 'telling-time', null], ['G1-236', 'telling-time', null], ['G1-237', 'telling-time', null]],
  'G1-213': [['G1-238', 'word-problems', 'fruits'], ['G1-239', 'word-problems', 'fruits'], ['G1-240', 'word-problems', 'fruits'], ['G1-241', 'word-problems', 'fruits'], ['G1-213', 'word-problems', 'animals']],
  'G2-251': [['G2-255', 'column-arithmetic', null], ['G2-256', 'column-arithmetic', null], ['G2-257', 'column-arithmetic', null], ['G2-258', 'column-arithmetic', null], ['G2-259', 'column-arithmetic', null]],
  'G2-252': [['G2-260', 'measurement', null], ['G2-261', 'measurement', 'vehicles'], ['G2-262', 'measurement', 'vehicles'], ['G2-263', 'measurement', null], ['G2-252', 'measurement', 'animals']],
  'G2-253': [['G2-264', 'symmetry', null], ['G2-265', 'symmetry', null], ['G2-266', 'symmetry', null], ['G2-267', 'symmetry', null], ['G2-268', 'symmetry', null]],
  'G2-254': [['G2-269', 'reading-comprehension', null], ['G2-270', 'reading-comprehension', null], ['G2-271', 'reading-comprehension', null], ['G2-272', 'reading-comprehension', null], ['G2-273', 'reading-comprehension', null]],
  'G3-357': [['G3-359', 'column-arithmetic', null], ['G3-360', 'column-arithmetic', null], ['G3-361', 'column-arithmetic', null], ['G3-362', 'column-arithmetic', null], ['G3-363', 'column-arithmetic', null]],
  'G3-358': [['G3-364', 'multiplication-tables', null], ['G3-365', 'multiplication-tables', null], ['G3-366', 'multiplication-tables', null], ['G3-367', 'multiplication-tables', null], ['G3-368', 'multiplication-tables', null]],
  'K-278': [['K-279', 'lowercase-letter-tracing', null], ['K-280', 'lowercase-letter-tracing', null], ['K-281', 'lowercase-letter-tracing', null], ['K-282', 'lowercase-letter-tracing', null], ['K-283', 'lowercase-letter-tracing', null]],
};

/* ---- nt20-B-VAR: the 64 variation faces, DERIVED, not hand-listed -----------
 * Each of the 20 nt20-B bases gains its variation faces as chips. The rows come
 * straight from tools/gen-b2var-specs.js and the spec modules, so this cannot
 * drift from what was actually built — a hand-maintained list is exactly what
 * went stale in the panel face table earlier in this batch. The theme is left
 * null here and resolved per locale through b2ThemeFor above, because two faces
 * ride a different theme in sv/da.
 */
(() => {
  const WSG = path.join(ROOT, 'scripts', 'worksheet-gen');
  let ROWS, loadType;
  try {
    ({ ROWS } = require(path.join(WSG, 'tools', 'gen-b2var-specs.js')));
    ({ loadType } = require(path.join(WSG, 'lib', 'load-types.js')));
  } catch (e) { return; }                       // batch not present: leave GROUPS as-is
  const BASE_OF = {
    'K-284-word-tracing.js': 'K-284', 'K-285-dot-to-dot.js': 'K-285',
    'K-286-grid-copy.js': 'K-286', 'K-287-singular-plural.js': 'K-287',
    'K-288-articles.js': 'K-288', 'G1-242-read-and-color.js': 'G1-242',
    'G1-243-number-of-the-day.js': 'G1-243', 'G1-244-write-the-word.js': 'G1-244',
    'G1-245-alphabetical-order.js': 'G1-245', 'G1-246-number-walls.js': 'G1-246',
    'G1-247-doubles-halves.js': 'G1-247', 'G1-248-number-line-position.js': 'G1-248',
    'G1-249-unscramble-sentence.js': 'G1-249', 'G2-274-fix-the-sentence.js': 'G2-274',
    'G2-275-word-classes.js': 'G2-275', 'G2-276-shopping-math.js': 'G2-276',
    'G2-277-read-the-calendar.js': 'G2-277', 'G2-278-write-about-the-picture.js': 'G2-278',
    'G2-279-grid-coordinates.js': 'G2-279', 'G3-370-muldiv-word-problems.js': 'G3-370',
  };
  for (const r of ROWS) {
    const id = r[1], baseId = BASE_OF[r[3]];
    if (!baseId) continue;
    const fam = loadType(id).exerciseType;
    (GROUPS[baseId] = GROUPS[baseId] || []).push([id, fam, null]);
  }
})();

/* ---- MORE_TYPE_GROUPS: the legacy families stranded off hub page 1 ----------
 * frontend/lib/worksheets-catalog.ts: interleaveByAxis orders type buckets by
 * SIZE DESC and WORKSHEETS_PAGE_SIZE is 24, so hub page 1 is exactly one
 * landing from each of the 24 largest buckets. These families hold 2-4
 * landings each and rank ~46-53 of 53 — they never surface organically (a
 * bucket needs ~47 landings to make rank 24). Order below = card order.
 */
const MORE_TYPES = [
  'arrays-multiplication', 'fractions', 'geometry', 'graphing-data',
  'number-charts', 'measurement', 'telling-time',
];

/* nt20 / nt20-VAR type ids living inside the two REUSED family keys. Those
 * decks already have their own cards in NEW_WORKSHEET_GROUPS (G1-212
 * draw-the-clock-hands, G2-252 capacity-and-mass), so excluding them here is
 * what keeps the two strips from showing the same worksheet twice. */
const MORE_TYPES_EXCLUDE_IDS = [
  'g2252', 'g2260', 'g2261', 'g2262', 'g2263',            // measurement
  'g1212', 'g1233', 'g1234', 'g1235', 'g1236', 'g1237',   // telling-time
];

/* Expected shape, asserted per locale (see the fail-loudly note above). The
 * group count is DERIVED from MORE_TYPES — a hand-written 7 would still pass
 * when an 8th family resolves nothing, which is how the first version of this
 * gate survived its own poison test. The link total is a tripwire on today's
 * corpus, cross-checked against per-locale parity below. */
const MORE_TYPES_EXPECT_LINKS = 21;

/* Curriculum order from the grade band baked into the canonical deck id
 * (K-038 -> k038, G1-140 -> g1140). Locale-invariant, unlike coordinate.level:
 * the SAME deck is `kindergarten` in en, `vorschule` in de and `1-trinn` in no
 * (the Norwegian +1 shift), so the level key cannot order these. */
const BAND_RANK = { k: 1, g1: 2, g2: 3, g3: 4 };
const BAND_RE = /-(k|g1|g2|g3)(\d+)$/;

const out = {};
const outMore = {};
for (const loc of LOCALES) {
  const corpus = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'content', 'seo-landing', loc + '.json'), 'utf8')).landings;
  const byDeck = new Map();
  for (const l of corpus) {
    byDeck.set(l.canonicalDeckSlug, l.slug);
    for (const s of l.collapseSiblings || []) byDeck.set(s, l.slug);
  }
  const famSlug = (fam) => (TAX.axes['exercise-type'][fam].slug[loc] || TAX.axes['exercise-type'][fam].slug.en);
  const themeSlug = (t) => (TAX.axes.theme[t].slug[loc] || TAX.axes.theme[t].slug.en);
  const deckSlug = (id, fam, theme) => famSlug(fam) + (theme ? '-' + themeSlug(theme) : '') + '-' + id.toLowerCase().replace('-', '');

  // A locale's wave may override a type's theme (sv/da/no ship K-288 and K-306 on
  // fruits because their animals vocabulary is gender-degenerate). The wave file
  // is the single source of truth, so read it rather than re-deriving: a theme
  // taken from a global map produces a deck slug that does not exist and the card
  // is then silently dropped for that locale. Both the nt20-B and the nt20-B-VAR
  // waves are consulted; the VAR wave pins EVERY themed face.
  const b2ThemeFor = (id, theme) => {
    for (const w of ['wave-b2-', 'wave-b2var-']) {
      const wp = path.join(ROOT, 'scripts', 'worksheet-gen', 'waves', w + loc + '.json');
      if (!fs.existsSync(wp)) continue;
      const ov = (JSON.parse(fs.readFileSync(wp, 'utf8')).themeOverrides || {})[id];
      if (ov) return ov.replace(/ /g, '_');
    }
    return theme;
  };
  const groups = [];
  for (const [baseId, b] of Object.entries(BASES)) {
    const baseLanding = byDeck.get(deckSlug(baseId, b.family, b2ThemeFor(baseId, b.theme)));
    if (!baseLanding) { console.warn(`${loc}: no base landing for ${baseId}`); continue; }
    const seen = new Set();
    const variations = [];
    for (const [id, fam, theme] of (GROUPS[baseId] || [])) {
      const slug = byDeck.get(deckSlug(id, fam, b2ThemeFor(id, theme)));
      if (slug && slug !== baseLanding && !seen.has(slug)) { seen.add(slug); variations.push(slug); }
    }
    groups.push({ base: baseLanding, variations });
  }
  out[loc] = groups;

  // --- MORE_TYPE_GROUPS -----------------------------------------------------
  // Scan the corpus by family key (see the docblock: these deck slugs are not
  // reconstructable per locale), drop the ids the other strip already owns,
  // order by grade band, then card = lowest band and chips = the rest.
  const moreGroups = [];
  for (const fam of MORE_TYPES) {
    const rows = [];
    for (const l of corpus) {
      if (!l.coordinate || l.coordinate.type !== fam) continue;
      const deck = String(l.canonicalDeckSlug || '');
      if (MORE_TYPES_EXCLUDE_IDS.some((id) => deck.endsWith('-' + id))) continue;
      const m = BAND_RE.exec(deck);
      // An unreadable band would make the card order a guess — halt instead.
      if (!m) throw new Error(loc + ': cannot read grade band from canonicalDeckSlug "' + deck + '" (' + fam + ')');
      rows.push({ slug: l.slug, rank: BAND_RANK[m[1]], num: Number(m[2]) });
    }
    rows.sort((a, b) => a.rank - b.rank || a.num - b.num || (a.slug < b.slug ? -1 : 1));
    if (rows.length < 2) { console.error(loc + ': ' + fam + ' resolved ' + rows.length + ' landing(s)'); continue; }
    moreGroups.push({ base: rows[0].slug, variations: rows.slice(1).map((r) => r.slug) });
  }
  outMore[loc] = moreGroups;
}

// A short resolve here is a bug, not a rollout state — every one of these
// landings exists in all 11 locales, so fail the run rather than quietly
// shipping a thinned strip. Three independent checks: one card per named
// family (derived, so a family that resolves nothing cannot hide), the
// expected link total, and cross-locale parity (the same coordinates exist in
// every locale, so an odd locale out is a defect even if the totals move).
const linkCount = (g) => g.reduce((n, x) => n + 1 + x.variations.length, 0);
const moreShort = LOCALES.filter((l) => (outMore[l] || []).length !== MORE_TYPES.length
  || linkCount(outMore[l] || []) !== MORE_TYPES_EXPECT_LINKS);
if (moreShort.length) {
  for (const l of moreShort) {
    const g = outMore[l] || [];
    console.error('  ' + l + ': ' + g.length + ' groups / ' + linkCount(g) + ' links (expected '
      + MORE_TYPES.length + ' / ' + MORE_TYPES_EXPECT_LINKS + ')');
  }
  throw new Error('gen-var-highlights: MORE_TYPE_GROUPS short in ' + moreShort.join(','));
}
const shapeOf = (l) => (outMore[l] || []).map((g) => 1 + g.variations.length).join('-');
const odd = LOCALES.filter((l) => shapeOf(l) !== shapeOf(LOCALES[0]));
if (odd.length) {
  for (const l of odd) console.error('  ' + l + ': ' + shapeOf(l) + ' vs ' + LOCALES[0] + ' ' + shapeOf(LOCALES[0]));
  throw new Error('gen-var-highlights: MORE_TYPE_GROUPS shape differs by locale in ' + odd.join(','));
}

const header = `/**
 * The two card strips on the /worksheets hub page 1. GENERATED by
 * scripts/seo-landing/gen-var-highlights.js from the landing corpora — re-run
 * it after landing content changes; missing slugs are omitted at render, so
 * trimming is always safe.
 *
 * NEW_WORKSHEET_GROUPS — the 21 nt20/lowercase family cards, each with its
 * variation landing slugs (chips).
 * MORE_TYPE_GROUPS — the 7 older families whose buckets are far too small to
 * reach page 1 through the size-ordered variety grid (arrays-multiplication,
 * fractions, geometry, graphing-data, number-charts, measurement,
 * telling-time), each card carrying that family's other grade bands as chips.
 */
export interface NewWorksheetGroup { base: string; variations: string[] }
export const NEW_WORKSHEET_GROUPS: Record<string, NewWorksheetGroup[]> = `;
const mid = `;
export const MORE_TYPE_GROUPS: Record<string, NewWorksheetGroup[]> = `;
fs.writeFileSync(path.join(ROOT, 'frontend', 'config', 'worksheets-new-highlights.ts'),
  header + JSON.stringify(out, null, 2) + mid + JSON.stringify(outMore, null, 2) + ';\n');
const links = (m) => LOCALES.map((l) => l + ':' + linkCount(m[l])).join(' ');
console.log('gen-var-highlights  NEW_WORKSHEET_GROUPS:', links(out));
console.log('gen-var-highlights  MORE_TYPE_GROUPS:   ', links(outMore));
