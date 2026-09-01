#!/usr/bin/env node
/**
 * gen-var-highlights.js — regenerates frontend/config/worksheets-new-highlights.ts
 * as v2 GROUPS: per locale, the 21 family cards (the 20 nt20 families + the
 * K-278 lowercase letter-tracing family), each with its variation
 * landing slugs (tier-1 + tier-2 + theme fans) in curriculum order. Landing
 * slugs are resolved from the locale's landing corpus by canonicalDeckSlug —
 * a variation without a published landing is silently omitted, so the tool
 * can run at any point of the landing rollout and the strip only ever links
 * real pages.
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

const out = {};
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

  const groups = [];
  for (const [baseId, b] of Object.entries(BASES)) {
    const baseLanding = byDeck.get(deckSlug(baseId, b.family, b.theme));
    if (!baseLanding) { console.warn(`${loc}: no base landing for ${baseId}`); continue; }
    const seen = new Set();
    const variations = [];
    for (const [id, fam, theme] of GROUPS[baseId]) {
      const slug = byDeck.get(deckSlug(id, fam, theme));
      if (slug && slug !== baseLanding && !seen.has(slug)) { seen.add(slug); variations.push(slug); }
    }
    groups.push({ base: baseLanding, variations });
  }
  out[loc] = groups;
}

const header = `/**
 * "New worksheets" strip on the /worksheets hub — v2 GROUPS: the 20 nt20
 * family cards, each with its variation landing slugs (chips). GENERATED by
 * scripts/seo-landing/gen-var-highlights.js from the landing corpora —
 * re-run it after landing content changes; missing slugs are omitted at
 * render, so trimming is always safe.
 */
export interface NewWorksheetGroup { base: string; variations: string[] }
export const NEW_WORKSHEET_GROUPS: Record<string, NewWorksheetGroup[]> = `;
fs.writeFileSync(path.join(ROOT, 'frontend', 'config', 'worksheets-new-highlights.ts'),
  header + JSON.stringify(out, null, 2) + ';\n');
const counts = LOCALES.map((l) => l + ':' + out[l].reduce((n, g) => n + 1 + g.variations.length, 0)).join(' ');
console.log('gen-var-highlights:', counts);
