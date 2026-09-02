/** K-300 — Copy the Picture on an 8x8 Grid. nt20-B-VAR variation of K-286. */
'use strict';
const base = require('./K-286-grid-copy.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'K-300',
  slug: 'grid-copy-8x8',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Copy the Picture on an 8x8 Grid", instruction: "This grid is bigger. Find each colored square by its letter and number, then copy it." } },
};
