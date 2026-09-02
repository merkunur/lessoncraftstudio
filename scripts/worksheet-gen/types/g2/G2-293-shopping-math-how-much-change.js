/** G2-293 — Shopping Math: How Much Change?. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"kinds":["change","change","change"],"items":8,"icon":52} };
module.exports = {
  ...base,
  id: 'G2-293',
  slug: 'shopping-math-how-much-change',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Shopping Math: How Much Change?", instruction: "Count the coins paid, then work out the change." } },
};
