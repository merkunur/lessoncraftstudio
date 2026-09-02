/** G1-264 — ABC Order: When Two Words Start the Same. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-264',
  slug: 'alphabetical-order-same-first-letter',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "ABC Order: When Two Words Start the Same", instruction: "Some words start with the same letter. Look at the second letter to decide which comes first." } },
};
