/** G1-301 — Word Bank and Letter Boxes. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"bank":true,"starter":false,"boxes":true,"cards":6,"cols":2,"rows":3,"maxLetters":9} };
module.exports = {
  ...base,
  id: 'G1-301',
  slug: 'write-the-word-bank-and-letter-boxes',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Word Bank and Letter Boxes", instruction: "Find the word in the bank. Write one letter in each box." } },
};
