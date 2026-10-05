/** G2-292 — Shopping Math: Buying Three Things. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"kinds":["total3","total3","total3"]} };
module.exports = {
  ...base,
  id: 'G2-292',
  slug: 'shopping-math-three-things',
  // Level Set 2026-10-05: real levels (level 2 = the published page, D): level 1 smaller prices, level 3 harder
  difficulty: { 1: { ...D, ...{"baseMax":5,"items":4} }, 2: D, 3: { ...D, ...{"cards":4,"baseMax":9,"cardH":0,"dots":40,"icon":56,"font":15,"coinPx":[30,40],"pad":"8px 14px","gap":10} } },
  i18n: { en: { title: "Shopping Math: Buying Three Things", instruction: "Each basket holds three things. Add all three prices." } },
};
