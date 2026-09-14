/**
 * G2-328 — Plurals: {UNIT}. nt20-C variation of G2-315 (HANDWRITTEN —
 * listed in tools/b3var-rows/spelling-rules.js HANDWRITTEN).
 *
 * Face 6 `form:'plural'` (design §3): six full-width rows — one picture with the
 * singular printed in letter cells, three clones showing MANY, and the plural as a
 * gapWord whose 3-cell box sits at the CHANGED grapheme (en cherry → cherr[ies],
 * leaf → lea[ves]); the rule box shows two `singular → plural` models with the
 * change in coral. Handwritten because its EXEMPLAR is a `gap.kind:'plural'` rule
 * (en y-ies-f-ves), which the base's gap faces refuse and which refuses them: the
 * unit axis lists the plural-form rules only. REFUSED per design in sv / no / nl
 * (no plural-form rule in those banks → the panel authors none → no landing).
 */
'use strict';
const base = require('./G2-315-spelling-rules.js');
const D = {
  ...base.difficulty[2],
  form: { of: 'plural', rows: 6, gapCells: 3, pic: 56, clonePx: 32, singCell: 24, plurCellMax: 30, maxSingular: 8, maxPlural: 10 },
  cards: 6, cols: 1, rows: 6, models: 2, minPool: 10,
};
module.exports = {
  ...base,
  id: 'G2-328',
  slug: 'spelling-rules-plural-spelling',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: 'Plurals: {UNIT}', instruction: 'Read the word for one. Write the word for many in the boxes. The plural changes the spelling.' } },
  unitAxis: base.unitAxisFor('plural'),
};
