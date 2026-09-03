/** K-314 — One and Many: Write It Yourself. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"plurModel":false} };
module.exports = {
  ...base,
  id: 'K-314',
  slug: 'singular-plural-write-it-yourself',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "One and Many: Write It Yourself", instruction: "No dashed letters this time. Write the word for many on the empty line." } },
};
