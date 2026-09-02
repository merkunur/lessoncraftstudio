/** G1-278 — Number Line to 50: Counting in Fives. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"max":50,"tick":5,"label":5,"lines":3,"pointers":2,"gap":2} };
module.exports = {
  ...base,
  id: 'G1-278',
  slug: 'number-line-to-50-counting-in-fives',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Line to 50: Counting in Fives", instruction: "Count on in fives from 0, 25 or 50 to reach each arrow." } },
};
