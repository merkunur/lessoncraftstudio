/** K-299 — Copy the Picture Using Letters and Numbers. nt20-B-VAR variation of K-286. */
'use strict';
const base = require('./K-286-grid-copy.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"labels":true} };
module.exports = {
  ...base,
  id: 'K-299',
  slug: 'grid-copy-with-letters-and-numbers',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Copy the Picture Using Letters and Numbers", instruction: "Use the letter and number of each square to copy the picture." } },
};
