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
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Unscramble the Sentence: With Clues", instruction: "The capital letter and the end mark show where a sentence begins and ends." } },
};
