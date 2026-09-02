/** G1-259 — Write the Word: Choose from the Word Bank. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"cards":8,"rows":4,"starter":false,"pic":80,"glyphH":30,"rulingW":214,"maxLetters":12} };
module.exports = {
  ...base,
  id: 'G1-259',
  slug: 'write-the-word-word-bank-only',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word: Choose from the Word Bank", instruction: "Every word you need is in the word bank. Write the right one next to each picture." } },
};
