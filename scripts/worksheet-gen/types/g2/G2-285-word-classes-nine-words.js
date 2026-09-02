/** G2-285 — Word Classes: Sort Nine Words. nt20-B-VAR variation of G2-275. */
'use strict';
const base = require('./G2-275-word-classes.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G2-285',
  slug: 'word-classes-nine-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Word Classes: Sort Nine Words", instruction: "Each noun chip has a picture to help. Sort every word into a bin." } },
};
