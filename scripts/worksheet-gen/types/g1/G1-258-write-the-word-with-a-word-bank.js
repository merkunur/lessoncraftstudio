/** G1-258 — Write the Word: With a Word Bank. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-258',
  slug: 'write-the-word-with-a-word-bank',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word: With a Word Bank", instruction: "Use the word bank. The first letter is written to start you off." } },
};
