/** G1-292 — Sort the Words. nt20-B-VAR variation of K-288. */
'use strict';
const base = require('../k/K-288-articles.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.EIGHT, ...{"sortWords":true,"cards":8} };
module.exports = {
  ...base,
  id: 'G1-292',
  slug: 'articles-sort-the-words',
  // Level Set 2026-09-28: L1 = six words, each with its small picture (a reading support);
  // no harder level (ten words is only more of the same).
  difficulty: { 1: { ...D, cards: 6, sortPictures: true }, 2: D, 3: D },
  interactive: { ...base.interactive, instructionKey: 'tapChoiceWord' },
  i18n: { en: { title: "Sort the Words", instruction: "Read every word. Write it under the word that belongs in front of it." } },
};
