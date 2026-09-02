/** G2-292 — Shopping Math: Buying Three Things. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"kinds":["total3","total","total3"]} };
module.exports = {
  ...base,
  id: 'G2-292',
  slug: 'shopping-math-three-things',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Shopping Math: Buying Three Things", instruction: "Each basket holds three things. Add all three prices." } },
};
