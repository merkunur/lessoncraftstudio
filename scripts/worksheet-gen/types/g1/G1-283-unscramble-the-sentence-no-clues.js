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
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Unscramble the Sentence: No Clues", instruction: "There are no capitals and no full stop to help. Put the words in the only order that works." } },
};
