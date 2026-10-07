/** G1-270 — Doubles and Halves: First Steps. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-270',
  slug: 'doubles-and-halves-first-steps',
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"dMin":1,"dMax":3,"hMin":1,"hMax":3,"icon":60} }, 2: D, 3: { ...D, ...{"cards":6,"cols":2,"rows":3,"dMin":2,"dMax":5,"hMin":2,"hMax":5,"icon":40,"perRow":3} } },
  i18n: { en: { title: "Doubles and Halves: First Steps", instruction: "Some cards ask you to double a group. Others ask you to halve one." } },
};
