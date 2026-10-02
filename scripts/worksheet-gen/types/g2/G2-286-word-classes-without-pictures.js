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
  // Level Set 2026-10-02: real easier / harder levels (level 2 = the published config); the title's count and picture promise hold
  difficulty: { 1: { ...D, tiers: [1] }, 2: D, 3: { ...D, tiers: [2, 3] } },
  i18n: { en: { title: "Word Classes: Sort Twelve Words", instruction: "No pictures to help. Read each word and sort it into a bin." } },
};
