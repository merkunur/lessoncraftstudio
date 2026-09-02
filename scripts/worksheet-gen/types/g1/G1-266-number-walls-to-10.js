/** G1-266 — Number Walls to 10. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-266',
  slug: 'number-walls-to-10',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Walls to 10", instruction: "Each brick is the sum of the two bricks under it. Build every wall to the top." } },
};
