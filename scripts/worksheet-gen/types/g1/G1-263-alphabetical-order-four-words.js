/** G1-263 — ABC Order: Four Words. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-263',
  slug: 'alphabetical-order-four-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "ABC Order: Four Words", instruction: "Number the cards in ABC order. Then copy the words onto the lines in that order." } },
};
