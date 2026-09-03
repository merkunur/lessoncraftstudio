/** G1-304 — Write the Word: Every Clue. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"bank":true,"starter":true,"boxes":true,"cards":6,"cols":2,"rows":3,"maxLetters":9} };
module.exports = {
  ...base,
  id: 'G1-304',
  slug: 'write-the-word-every-clue',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word: Every Clue", instruction: "Write each word using the bank, the boxes and the first letter." } },
};
