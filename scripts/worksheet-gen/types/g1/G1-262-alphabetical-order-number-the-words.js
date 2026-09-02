/** G1-262 — ABC Order: Number the Words. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"rulings":false} };
module.exports = {
  ...base,
  id: 'G1-262',
  slug: 'alphabetical-order-number-the-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "ABC Order: Number the Words", instruction: "Use the alphabet strip at the top. Number the cards to put the words in ABC order." } },
};
