/** G1-290 — Write the Word: One Box for Each Letter. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{} };
module.exports = {
  ...base,
  id: 'G1-290',
  slug: 'write-the-word-letter-boxes',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word: One Box for Each Letter", instruction: "A dashed box for every letter shows how long the word is. No word bank." } },
};
