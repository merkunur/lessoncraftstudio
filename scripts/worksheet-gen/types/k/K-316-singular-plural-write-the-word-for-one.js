/** K-316 — Write the Word for One. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"direction":"toSingular","plurModel":false,"rowH":166} };
module.exports = {
  ...base,
  id: 'K-316',
  slug: 'singular-plural-write-the-word-for-one',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Write the Word for One", instruction: "No dashed letters this time. Write the word for one yourself." } },
};
