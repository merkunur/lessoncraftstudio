/** G1-282 — Unscramble the Sentence: With Clues. nt20-B-VAR variation of G1-249. */
'use strict';
const base = require('./G1-249-unscramble-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-282',
  slug: 'unscramble-the-sentence-with-clues',
  // Level Set 2026-09-30: L1 3–4-word sentences · L2 published · L3 four lanes of 5–6 words (clues kept). Level 2 = the published config verbatim.
  difficulty: { 1: { ...D, minTok: 3, maxTok: 4 }, 2: D, 3: { ...D, lanes: 4, minTok: 5, maxTok: 6, font: 18, tileH: 40, icon: 64, rulH: 64, glyphH: 26 } },
  i18n: { en: { title: "Unscramble the Sentence: With Clues", instruction: "The capital letter and the end mark show where a sentence begins and ends." } },
};
