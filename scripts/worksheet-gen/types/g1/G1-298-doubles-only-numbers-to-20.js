/** G1-298 — Doubles to 20: Just the Numbers. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"ops":["double"],"cards":8,"dMin":2,"dMax":10} };
module.exports = {
  ...base,
  id: 'G1-298',
  slug: 'doubles-only-numbers-to-20',
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"cards":6,"cols":2,"rows":3,"dMin":1,"dMax":6} }, 2: D, 3: { ...D, ...{"inverse":true} } },
  i18n: { en: { title: "Doubles to 20: Just the Numbers", instruction: "Write the double of each number. No pictures to count." } },
  themeAxis: {"applicable":false},
};
