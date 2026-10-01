/**
 * G2-326 — Sort by Spelling Rule: {UNIT}. nt20-C variation of G2-315
 * (HANDWRITTEN — listed in tools/b3var-rows/spelling-rules.js HANDWRITTEN).
 *
 * Face 4 `bins` (design §3): a picture bank (nothing printed) and two bins headed
 * by the rule's two candidate chips, five empty rulings each (the line count never
 * states the 3-5 split); the child spells each picture word AND sorts it. Handwritten
 * because its EXEMPLAR differs from the base's (en magic e has no pair): the unit
 * axis resolves the first pair rule (en c-k-ck) and `{UNIT}` = `rule.pairHead`.
 */
'use strict';
const base = require('./G2-315-spelling-rules.js');
const D = { ...base.difficulty[2], bins: { n: 2, items: 8, rows: 5, split: [3, 5], minSide: 6, pic: 56, binW: 300, rowH: 64, glyphH: 30 }, models: 0 };
module.exports = {
  ...base,
  id: 'G2-326',
  slug: 'spelling-rules-sort-by-rule',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  interactive: require('../../lib/spelling-rules-screen.js').interactiveFor('bins'),
  difficulty: { 1: { ...D, bins: { ...D.bins, items: 6, split: [2, 4], rows: 4, minSide: 4 } }, 2: D, 3: { ...D, bins: { ...D.bins, items: 10, split: [4, 6], rows: 6, rowH: 54, pic: 44 } } },
  i18n: { en: { title: 'Sort by Spelling Rule: {UNIT}', instruction: 'Say each picture word. Write it in the bin with its spelling, one word on each line.' } },
  unitAxis: base.unitAxisFor('bins'),
};
