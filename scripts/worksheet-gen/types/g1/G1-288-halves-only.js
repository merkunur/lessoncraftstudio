/** G1-288 — Halves to 12. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["half"],"cards":6,"hMin":1,"hMax":6} };
module.exports = {
  ...base,
  id: 'G1-288',
  slug: 'halves-only',
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"cards":4,"cols":2,"rows":2,"hMin":1,"hMax":4,"icon":48} }, 2: D, 3: { ...D, ...{"inverse":true} } },
  i18n: { en: { title: "Halves to 12", instruction: "Every card cuts a group in half. Write the two equal parts." } },
};
