/** G2-294 — Shopping Math: Is There Enough Money?. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"kinds":["canBuy","canBuy"],"cards":2,"items":5,"cardH":240,"dots":100} };
module.exports = {
  ...base,
  id: 'G2-294',
  slug: 'shopping-math-is-there-enough-money',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Shopping Math: Is There Enough Money?", instruction: "Compare the money with the price. Circle yes or no, then write the total." } },
};
