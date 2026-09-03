/** G1-302 — Unscramble the Sentence: Find the Beginning. nt20-B-VAR variation of G1-249. */
'use strict';
const base = require('./G1-249-unscramble-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"showCap":false,"showEnd":true} };
module.exports = {
  ...base,
  id: 'G1-302',
  slug: 'unscramble-the-sentence-end-mark-only',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Unscramble the Sentence: Find the Beginning", instruction: "Find the first word: one tile shows the end mark." } },
};
