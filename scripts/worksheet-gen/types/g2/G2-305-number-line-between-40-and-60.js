/** G2-305 — Where on the Number Line? 40 to 60. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('../g1/G1-248-number-line-position.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"min":40,"max":60,"lines":3,"tick":1,"label":5,"pointers":2,"gap":3} };
module.exports = {
  ...base,
  id: 'G2-305',
  slug: 'number-line-between-40-and-60',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Where on the Number Line? 40 to 60", instruction: "This line does not start at zero. Count on from the nearest printed number." } },
};
