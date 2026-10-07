/** G1-271 — Doubles and Halves to 20. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-271',
  slug: 'doubles-and-halves-to-20',
  // numbers only: the published page carried a theme it never draws; Level Set copies are themeless (enumerate.js)
  levelSetThemeless: true,
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"cards":6,"cols":2,"rows":3,"dMin":1,"dMax":5,"hMin":1,"hMax":5} }, 2: D, 3: { ...D, ...{"inverse":true} } },
  i18n: { en: { title: "Doubles and Halves to 20", instruction: "Numbers only this time. Work out each double and half up to 20." } },
};
