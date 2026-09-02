/** G1-279 — Number Line to 100: Counting in Fives. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-279',
  slug: 'number-line-to-100-counting-in-fives',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Line to 100: Counting in Fives", instruction: "Each tick is five, up to 100. Which number is each arrow on?" } },
};
