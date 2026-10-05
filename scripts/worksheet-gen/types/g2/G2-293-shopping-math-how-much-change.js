/** G2-293 — Shopping Math: How Much Change?. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"kinds":["change","change"],"cards":2,"items":5,"cardH":240,"dots":100} };
module.exports = {
  ...base,
  id: 'G2-293',
  slug: 'shopping-math-how-much-change',
  // Level Set 2026-10-05: real levels (level 2 = the published page, D): level 1 smaller prices, level 3 harder
  difficulty: { 1: { ...D, ...{"baseMax":5,"items":4} }, 2: D, 3: { ...D, ...{"cards":3,"baseMax":9,"payMulti":true,"cardH":140,"dots":60} } },
  i18n: { en: { title: "Shopping Math: How Much Change?", instruction: "Count the coins paid, then work out the change." } },
};
