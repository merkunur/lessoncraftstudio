/** G1-283 — Unscramble the Sentence: No Clues. nt20-B-VAR variation of G1-249. */
'use strict';
const base = require('./G1-249-unscramble-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"minTok":4,"maxTok":6} };
module.exports = {
  ...base,
  id: 'G1-283',
  slug: 'unscramble-the-sentence-no-clues',
  // Level Set 2026-09-30: L1 three lanes of 3–4 words · L2 published · L3 6–7 words (no clues). Level 2 = the published config verbatim.
  difficulty: { 1: { ...D, lanes: 3, minTok: 3, maxTok: 4, font: 20, tileH: 46, icon: 80, rulH: 78, glyphH: 30 }, 2: D, 3: { ...D, minTok: 6, maxTok: 7 } },
  i18n: { en: { title: "Unscramble the Sentence: No Clues", instruction: "No capital, no full stop. Find the one order that works." } },
};
