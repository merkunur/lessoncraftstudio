/** G1-303 — Letter Boxes and the First Letter. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"bank":false,"starter":true,"boxes":true,"cards":6,"cols":2,"rows":3,"maxLetters":9} };
module.exports = {
  ...base,
  id: 'G1-303',
  slug: 'write-the-word-letter-boxes-and-first-letter',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Letter Boxes and the First Letter", instruction: "Write each word in the letter boxes. The first letter starts you off." } },
};
