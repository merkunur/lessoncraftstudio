/** G2-308 — Grid Coordinates: Write the Codes. nt20-B-VAR variation of G2-279. */
'use strict';
const base = require('./G2-279-grid-coordinates.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"inverse":true} };
module.exports = {
  ...base,
  id: 'G2-308',
  slug: 'grid-coordinates-write-the-codes',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Grid Coordinates: Write the Codes", instruction: "The picture is already colored. Write the letter and number of every colored square." } },
};
