/** G1-299 — Halves to 20: Just the Numbers. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"ops":["half"],"cards":8,"hMin":2,"hMax":10} };
module.exports = {
  ...base,
  id: 'G1-299',
  slug: 'halves-only-numbers-to-20',
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"cards":6,"cols":2,"rows":3,"hMin":1,"hMax":6} }, 2: D, 3: { ...D, ...{"inverse":true} } },
  i18n: { en: { title: "Halves to 20: Just the Numbers", instruction: "Split each number into two equal parts. No pictures to count." } },
  themeAxis: {"applicable":false},
};
