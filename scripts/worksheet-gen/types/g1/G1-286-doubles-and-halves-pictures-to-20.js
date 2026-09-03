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
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Doubles and Halves with Pictures to 20", instruction: "Some cards ask you to double a group, and some ask you to halve one." } },
};
