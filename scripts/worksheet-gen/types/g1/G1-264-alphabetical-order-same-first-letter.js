/** G1-264 — ABC Order: When Words Start the Same. nt20-B-VAR variation of G1-245. */
'use strict';
const base = require('./G1-245-alphabetical-order.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.PAIRS, ...{} };
module.exports = {
  ...base,
  id: 'G1-264',
  slug: 'alphabetical-order-same-first-letter',
  // Level Set 2026-09-27 — the instruction fixes "two pairs": every level keeps two.
  // L1 four cards = the two pairs alone · L2 six cards, second letters >= 2 apart (published) ·
  // L3 six cards, at least one pair whose second letters are only 1-2 apart (a close
  // second-letter decision; both pairs close is too rare — measured 0-7 themes per locale).
  // on screen: the hint that the second letter decides (i18n/interactive-instructions.json)
  interactive: { ...base.interactive, instructionKey: 'tapSame' },
  difficulty: { 1: { ...base.FOUR_CARDS, pairs: 2 }, 2: D, 3: { ...D, pairGap: 1, closePairs: 1, pairMax: 2 } },
  i18n: { en: { title: "ABC Order: When Words Start the Same", instruction: "Two pairs start with the same letter. Use the second letter to order them." } },
};
