/** G1-297 — Halves to 20 with Pictures. nt20-B-VAR variation of G1-247. */
'use strict';
const base = require('./G1-247-doubles-halves.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["half"],"cards":6,"hMin":5,"hMax":10,"icon":20,"perRow":5} };
module.exports = {
  ...base,
  id: 'G1-297',
  slug: 'halves-only-to-20',
  // Level Set 2026-10-07: level 1 easier, level 2 the published page (unchanged), level 3 harder
  difficulty: { 1: { ...D, ...{"cards":4,"cols":2,"rows":2,"hMin":3,"hMax":6,"icon":30} }, 2: D, 3: { ...D, ...{"inverse":true} } },
  i18n: { en: { title: "Halves to 20 with Pictures", instruction: "Bigger groups of pictures to halve, all the way up to twenty." } },
};
