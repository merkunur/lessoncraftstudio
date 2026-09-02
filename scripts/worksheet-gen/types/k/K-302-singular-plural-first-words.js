/** K-302 — One and Many: First Words. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-302',
  slug: 'singular-plural-first-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "One and Many: First Words", instruction: "One picture, one word. Many pictures, a new word. Trace the word for many." } },
};
