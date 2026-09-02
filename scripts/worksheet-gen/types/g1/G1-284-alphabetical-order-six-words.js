/** G1-284 — ABC Order: Six Words. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{} };
module.exports = {
  ...base,
  id: 'G1-284',
  slug: 'alphabetical-order-six-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "ABC Order: Six Words", instruction: "Six words to put in order, and some letters sit right next to each other." } },
};
