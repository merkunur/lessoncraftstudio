/**
 * gen-b2var-waves.js — nt20-B-VAR wave files, one per locale.
 *
 * EVERY themed face is pinned through `themeOverrides`. Nothing is left to the
 * positional round-robin in enumerate.js, which assigns a theme by the spec's
 * INDEX in the wave's `types` array: last batch a hand-computed map disagreed
 * with that index and G1-247 shipped on toys in 11 locales after eight landing
 * panels had already written copy about fruits. Pinning every type removes the
 * class of defect entirely — and it means inserting a type is safe, because no
 * later type's theme shifts.
 *
 * THEMES ARE MEASURED, NOT ASSUMED. Every (face, theme, locale) triple below was
 * built before being written here. Three faces carry per-locale exceptions:
 *   K-306 articles — animals fails sv+da (their animals vocab is gender-
 *     degenerate, 36:1), so those two ride fruits.
 *   K-307 articles — vehicles fails sv (only fruits satisfies the gender mix).
 *   G1-258 write-the-word — fruits/fi has 5 eligible nouns and d1 needs 6.
 * A theme is varied across the faces of a family where the data allows, so the
 * deck slugs differ by theme as well as by variant id.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const LOCALES = ['en', 'de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

// Themed faces: id -> theme. Locale exceptions applied below.
const THEME = {
  // K-284 word-tracing (base ships animals)
  'K-289': 'fruits', 'K-290': 'vehicles', 'K-291': 'toys',
  // K-287 singular-plural (base ships fruits)
  'K-302': 'animals', 'K-303': 'vehicles',
  // K-288 articles (base ships animals; sv/da/no ride fruits)
  'K-306': 'animals', 'K-307': 'vehicles',
  // G1-242 read-and-color (BW only; base ships fruits bw)
  'G1-251': 'animals bw', 'G1-252': 'toys bw',
  // G1-244 write-the-word (base ships fruits)
  'G1-258': 'animals', 'G1-259': 'vehicles', 'G1-260': 'toys',
  // G1-245 alphabetical-order (base ships animals)
  'G1-262': 'fruits', 'G1-263': 'vehicles', 'G1-264': 'toys',
  // G1-247 doubles-halves (base ships fruits)
  'G1-270': 'animals', 'G1-271': 'vehicles',
  // G1-249 sentence-building (base ships animals)
  'G1-282': 'fruits', 'G1-283': 'animals', // NOT vehicles: the bank's
  // "{name} feeds the {noun}" frame has no animacy gate and rendered
  // "tom feeds the skateboard". Every frame is safe on animals.
  // G2-274 capitals-punctuation (base ships vehicles)
  'G2-281': 'animals', 'G2-282': 'fruits',
  // G2-275 word-classes (base ships toys)
  'G2-285': 'animals', 'G2-286': 'fruits', 'G2-287': 'vehicles',
  // G2-276 money (base ships fruits)
  'G2-289': 'animals', 'G2-290': 'vehicles', 'G2-291': 'toys', 'G2-292': 'fruits',
  'G2-293': 'animals', 'G2-294': 'vehicles', 'G2-295': 'toys',
  // G2-278 picture-writing (base ships vehicles)
  'G2-299': 'animals', 'G2-300': 'fruits',
  // G3-370 word-problems (base ships fruits)
  // The share/group frames put things in BAGS and BOXES ("range 15 X dans des
  // boîtes de 3"), which needs small countable objects. On vehicles that renders
  // "15 ferries in boxes of 3" — absurd for an 8-year-old. The two faces that
  // carry a division op ride fruits/toys instead; G3-371 keeps animals because
  // multiplication-only says "4 rows of 5", which is fine for animals.
  'G3-371': 'animals', 'G3-372': 'fruits', 'G3-373': 'toys',
  'G3-374': 'fruits', 'G3-375': 'animals', 'G3-376': 'toys',

  // ── wave 2 ───────────────────────────────────────────────────────────────
  'K-311': 'animals',                                 // K-284 word-tracing
  'G1-286': 'toys',                                   // G1-247 doubles-halves
  'G1-291': 'animals',                                // G1-244 write-the-word
  // G2-306 rides ANIMALS deliberately, repeating G2-281's theme rather than
  // varying it: the fix frames include "{name} feeds the {noun}", which has no
  // animacy gate (it rendered "tom feeds the skateboard" last batch), and the
  // note above records that every frame is safe on animals. A face whose whole
  // subject is names needs name-bearing frames, so this is not the place to
  // gamble on theme variety.
  // G3-377 is mul+SHARE, so it carries a division op and must not ride vehicles
  // for the bags-and-boxes reason above.
};

// locale -> id -> replacement theme (each one measured, see the docblock)
const EXCEPT = {
  sv: { 'K-306': 'fruits', 'K-307': 'fruits' },
  da: { 'K-306': 'fruits' },
  no: { 'K-306': 'fruits' },
};

// Themeless faces still need to appear in `types`.
const THEMELESS = [
  'K-294', 'K-295', 'K-296',                       // dot-to-dot
  'K-298', 'K-299', 'K-300',                       // grid-copy
  'G1-255', 'G1-256', 'G1-257',                    // number-of-the-day
  'G1-266', 'G1-267', 'G1-268',                    // number-walls
  'G1-274', 'G1-275', 'G1-276', 'G1-277',          // number-lines
  'G1-278', 'G1-279', 'G1-280', 'G1-281',
  'G2-296', 'G2-297', 'G2-298',                    // calendar
  'G2-302', 'G2-303',                              // grid-coordinates
  // ── wave 2 ───────────────────────────────────────────────────────────────
  'K-308', 'G1-285', 'G1-294', 'G2-304',           // dot-to-dot (step knob)
  'G1-295', 'G2-305', 'G2-310',                    // number-lines (min knob)
];

const TYPES = [...Object.keys(THEME), ...THEMELESS].sort();

let n = 0;
for (const loc of LOCALES) {
  const overrides = {};
  for (const id of Object.keys(THEME)) {
    overrides[id] = (EXCEPT[loc] && EXCEPT[loc][id]) || THEME[id];
  }
  const plan = {
    id: 'wave-b2var-' + loc,
    seedEpoch: 1,
    locales: [loc],
    themes: ['animals', 'vehicles', 'toys', 'fruits', 'animals bw', 'fruits bw', 'farm animals bw', 'toys bw'],
    themesPerType: 1,
    difficulties: [2],
    types: TYPES,
    themeOverrides: overrides,
  };
  fs.writeFileSync(path.join(ROOT, 'waves', 'wave-b2var-' + loc + '.json'), JSON.stringify(plan, null, 2) + '\n');
  n++;
}
console.log('gen-b2var-waves: wrote ' + n + ' wave files, ' + TYPES.length + ' types each (' +
  Object.keys(THEME).length + ' themed pinned, ' + THEMELESS.length + ' themeless)');
