/** G2-303 — Grid Coordinates on a 10x10 Grid. nt20-B-VAR variation of G2-279. */
'use strict';
const base = require('./G2-279-grid-coordinates.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G2-303',
  slug: 'grid-coordinates-10x10',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Grid Coordinates on a 10x10 Grid", instruction: "A bigger grid with more squares. Work through the list carefully." } },
};
