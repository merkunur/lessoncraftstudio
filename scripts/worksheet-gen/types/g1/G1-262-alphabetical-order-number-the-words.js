/** G1-262 — ABC Order: Number the Words. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.FOUR_CARDS, ...{"rulings":false} };
module.exports = {
  ...base,
  id: 'G1-262',
  slug: 'alphabetical-order-number-the-words',
  // Level Set 2026-09-27 — the instruction fixes "the four cards": every level keeps four.
  // L1 first letters >= 5 apart · L2 >= 3 apart (published) · L3 one same-first-letter pair.
  difficulty: { 1: { ...D, gap: 5 }, 2: D, 3: { ...D, pairs: 1 } },
  i18n: { en: { title: "ABC Order: Number the Words", instruction: "Number the four cards to put the words in ABC order." } },
};
