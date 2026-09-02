/** G2-286 — Word Classes: Sort Twelve Words. nt20-B-VAR variation of G2-275. */
'use strict';
const base = require('./G2-275-word-classes.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"pics":false} };
module.exports = {
  ...base,
  id: 'G2-286',
  slug: 'word-classes-without-pictures',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Word Classes: Sort Twelve Words", instruction: "No pictures to help. Read each word and sort it into a bin." } },
};
