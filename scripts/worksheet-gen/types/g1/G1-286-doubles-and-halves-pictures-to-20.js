/** G1-286 — Doubles and Halves with Pictures to 20. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"cards":4,"cols":2,"rows":2,"dMin":5,"dMax":10,"hMin":5,"hMax":10,"icon":20,"perRow":5,"numeric":false} };
module.exports = {
  ...base,
  id: 'G1-286',
  slug: 'doubles-and-halves-pictures-to-20',
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"dMin":3,"dMax":6,"hMin":3,"hMax":6,"icon":28,"perRow":3} }, 2: D, 3: { ...D, ...{"inverse":true,"cards":6,"cols":2,"rows":3} } },
  i18n: { en: { title: "Doubles and Halves with Pictures to 20", instruction: "Some cards ask for the double, others for the half." } },
};
