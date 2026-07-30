#!/usr/bin/env node
/* =====================================================================
   seed-object-attributes.js — PHASE A step 1.

   Builds the first-pass seed for `mini tools/object-attributes.json`, the
   conceptual-attribute corpus behind Sorting Hoops' "guess my rule".

   ⚠ THIS IS A SEED, NOT THE ANSWER. It is deliberately cheap and
   deliberately wrong in places, so that the per-key correction pass is a
   REVIEW rather than an authoring job. Nothing here ships unreviewed.

   ⚠ SIX CONCEPTUAL FIELDS ONLY — no colour, no shape, no visual anything.
   Visual attributes come from the drawn logic blocks, where they are exact
   by construction; a conceptual tag can never be contradicted by the
   artwork, so no image inspection is needed anywhere in this pipeline.

     living    living | once_living | never_living
     natural   natural | made
     edible    yes | no                 (as normally eaten by people)
     moves     self | moved | still     (a car is `moved` — it needs a driver)
     size_band hand | person | bigger   (the REAL object, not the picture)
     habitat   land | water | air | none

   Scope: the non-`na` cards of pww-index-en.json. The 119 `na:1` cards
   (colours, emotions, weather adjectives, gerunds) are not objects and are
   excluded by construction.

   ⚠ SEEDING IS BY MOST-SPECIFIC THEME, not first-theme. `beach` holds crab
   AND bucket; `spring` holds bee AND bicycle; `things_that_fly` holds bat
   AND airplane. Seeding those from the scene theme would be wrong for half
   their contents, so a key is seeded from the highest-priority taxonomic
   theme it appears in, and only falls back to a scene theme if it appears
   in no taxonomic one.

   Usage: node scripts/seed-object-attributes.js [--out <path>]
   ===================================================================== */
'use strict';
const fs = require('path') && require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const INDEX = path.join(ROOT, 'mini tools', 'pww-index-en.json');
const OUT = (() => {
  const i = process.argv.indexOf('--out');
  return i > -1 ? process.argv[i + 1] : path.join(ROOT, 'mini tools', '_object-attributes.seed.json');
})();

/* ---------------------------------------------------------------------
   Defaults per theme: [living, natural, edible, moves, size_band, habitat]
   Ordered most-specific first — a key takes the FIRST theme in this list
   that contains it.
   --------------------------------------------------------------------- */
const SEED = [
  /* --- taxonomic: living things ------------------------------------- */
  ['dinosaurs',                ['once_living', 'natural', 'no',  'self',  'bigger', 'land']],
  ['ocean_life',               ['living',      'natural', 'no',  'self',  'person', 'water']],
  ['insects_and_bugs',         ['living',      'natural', 'no',  'self',  'hand',   'land']],
  ['reptiles_and_amphibians',  ['living',      'natural', 'no',  'self',  'hand',   'land']],
  ['birds',                    ['living',      'natural', 'no',  'self',  'hand',   'air']],
  ['birds_2',                  ['living',      'natural', 'no',  'self',  'hand',   'air']],
  ['farm_animals',             ['living',      'natural', 'no',  'self',  'person', 'land']],
  ['zoo_animals',              ['living',      'natural', 'no',  'self',  'bigger', 'land']],
  ['forest_creatures',         ['living',      'natural', 'no',  'self',  'person', 'land']],
  ['pets',                     ['living',      'natural', 'no',  'self',  'person', 'land']],
  ['animals',                  ['living',      'natural', 'no',  'self',  'person', 'land']],
  ['occupations',              ['living',      'natural', 'no',  'self',  'person', 'land']],
  ['tree',                     ['living',      'natural', 'no',  'still', 'bigger', 'land']],
  ['flowers',                  ['living',      'natural', 'no',  'still', 'hand',   'land']],
  ['body_parts',               ['living',      'natural', 'no',  'moved', 'hand',   'none']],

  /* --- taxonomic: food ---------------------------------------------- */
  ['fruits',                   ['once_living', 'natural', 'yes', 'still', 'hand',   'none']],
  ['vegetables',               ['once_living', 'natural', 'yes', 'still', 'hand',   'none']],
  ['bakery',                   ['never_living', 'made',   'yes', 'still', 'hand',   'none']],
  ['desserts_and_sweets',      ['never_living', 'made',   'yes', 'still', 'hand',   'none']],
  ['breakfast',                ['never_living', 'made',   'yes', 'still', 'hand',   'none']],

  /* --- taxonomic: made objects -------------------------------------- */
  ['vehicles',                 ['never_living', 'made',   'no',  'moved', 'bigger', 'land']],
  ['musical_instruments',      ['never_living', 'made',   'no',  'moved', 'person', 'none']],
  ['music',                    ['never_living', 'made',   'no',  'moved', 'person', 'none']],
  ['kitchen_tools',            ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['tools',                    ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['clothing',                 ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['accessories',              ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['furniture',                ['never_living', 'made',   'no',  'moved', 'person', 'none']],
  ['toys',                     ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['classroom',                ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['hospital',                 ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['post_office',              ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['camping',                  ['never_living', 'made',   'no',  'moved', 'person', 'none']],
  ['around_the_house',         ['never_living', 'made',   'no',  'still', 'person', 'none']],
  ['at_the_supermarket',       ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['shapes',                   ['never_living', 'made',   'no',  'still', 'hand',   'none']],

  /* --- scene / seasonal: MIXED, expect heavy correction -------------- */
  ['space',                    ['never_living', 'natural', 'no', 'still', 'bigger', 'none']],
  ['weather',                  ['never_living', 'natural', 'no', 'still', 'bigger', 'none']],
  ['beach',                    ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['things_that_fly',          ['never_living', 'made',   'no',  'moved', 'person', 'air']],
  ['spring',                   ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['summer',                   ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['winter',                   ['never_living', 'made',   'no',  'moved', 'hand',   'none']],
  ['christmas',                ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['easter',                   ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['4th_of_july',              ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['thanksgivinng',            ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['miscellaneous',            ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['colors',                   ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['emotions',                 ['never_living', 'made',   'no',  'still', 'hand',   'none']],
  ['activities',               ['never_living', 'made',   'no',  'still', 'hand',   'none']]
];

const FIELDS = ['living', 'natural', 'edible', 'moves', 'size_band', 'habitat'];
const PRIORITY = new Map(SEED.map(([k], i) => [k, i]));
const DEFAULTS = new Map(SEED);

const idx = JSON.parse(fs.readFileSync(INDEX, 'utf8'));

/* key -> every theme it appears in (non-na cards only) */
const themesOf = new Map();
const label = new Map();
idx.themes.forEach((t) => {
  t.c.forEach((c) => {
    if (c.na) return;
    if (!themesOf.has(c.k)) { themesOf.set(c.k, []); label.set(c.k, c.s); }
    themesOf.get(c.k).push(t.k);
  });
});

const unknownThemes = idx.themes.map((t) => t.k).filter((k) => !PRIORITY.has(k));
if (unknownThemes.length) {
  console.error('HALT — themes with no seed row: ' + unknownThemes.join(', '));
  process.exit(1);
}

const out = {};
const fromTheme = {};
Array.from(themesOf.keys()).sort().forEach((key) => {
  const best = themesOf.get(key).slice().sort((a, b) => PRIORITY.get(a) - PRIORITY.get(b))[0];
  const v = DEFAULTS.get(best);
  const rec = {};
  FIELDS.forEach((f, i) => { rec[f] = v[i]; });
  rec._seed = best;                       /* provenance, stripped at merge */
  rec._word = label.get(key);
  out[key] = rec;
  fromTheme[best] = (fromTheme[best] || 0) + 1;
});

fs.writeFileSync(OUT, JSON.stringify({
  $comment: 'SEED ONLY — first pass from theme membership. Corrected per key before it ships.',
  fields: FIELDS,
  count: Object.keys(out).length,
  keys: out
}, null, 1) + '\n', 'utf8');

console.log(`seeded ${Object.keys(out).length} keys -> ${path.relative(ROOT, OUT)}`);
console.log('\nkeys seeded per source theme (high count on a MIXED theme = more correction work):');
Object.entries(fromTheme).sort((a, b) => b[1] - a[1])
  .forEach(([t, n]) => console.log(`  ${String(n).padStart(4)}  ${t}`));
