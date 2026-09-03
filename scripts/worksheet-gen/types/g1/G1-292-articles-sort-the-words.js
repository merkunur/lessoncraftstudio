/** G1-292 — Sort the Words. nt20-B-VAR variation of K-288. */
'use strict';
const base = require('../k/K-288-articles.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"sortWords":true,"cards":8} };
module.exports = {
  ...base,
  id: 'G1-292',
  slug: 'articles-sort-the-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Sort the Words", instruction: "Read every word. Write it under the word that belongs in front of it." } },
};
