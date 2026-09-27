/** G1-263 — ABC Order: Number Them, Then Write Them. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.FOUR_CARDS, ...{} };
module.exports = {
  ...base,
  id: 'G1-263',
  slug: 'alphabetical-order-four-words',
  // Level Set 2026-09-27 — L1 first letters >= 5 apart · L2 >= 3 apart (published) ·
  // L3 neighbouring first letters allowed (the child must look harder at the strip).
  difficulty: { 1: { ...D, gap: 5 }, 2: D, 3: { ...D, gap: 1 } },
  i18n: { en: { title: "ABC Order: Number Them, Then Write Them", instruction: "Number the cards, then copy the words onto the lines in order." } },
};
