/** G1-260 — Write the Word on Plain Lines. nt20-B-VAR variation of G1-244. */
'use strict';
const base = require('./G1-244-write-the-word.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-260',
  slug: 'write-the-word-on-plain-lines',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word on Plain Lines", instruction: "There is no word bank this time. Say each picture word, then write it on the lines." } },
};
