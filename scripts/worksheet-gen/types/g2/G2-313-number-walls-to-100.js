/** G2-313 — Number Walls to 100. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('../g1/G1-246-number-walls.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"gap":false,"courses":4,"walls":4,"baseMin":5,"baseMax":12,"topMax":100} };
module.exports = {
  ...base,
  id: 'G2-313',
  slug: 'number-walls-to-100',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Walls to 100", instruction: "Each brick is the sum of the two under it." } },
};
