/** G1-289 — Number Walls: Start at the Top. nt20-B-VAR variation of G1-246. */
'use strict';
const base = require('./G1-246-number-walls.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"topGiven":true} };
module.exports = {
  ...base,
  id: 'G1-289',
  slug: 'number-walls-from-the-top-down',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Number Walls: Start at the Top", instruction: "The top brick is given this time. Work downwards and subtract." } },
};
