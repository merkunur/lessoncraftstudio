/** G2-290 — Shopping Math: Four Questions. nt20-B-VAR variation of G2-276. */
'use strict';
const base = require('./G2-276-shopping-math.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"items":5} };
module.exports = {
  ...base,
  id: 'G2-290',
  slug: 'shopping-math-four-questions',
  // Level Set 2026-10-05: real levels (level 2 = the published page, D): level 1 smaller prices, level 3 harder
  difficulty: { 1: { ...D, ...{"baseMax":6} }, 2: D, 3: { ...D, ...{"items":6,"baseMax":9,"kinds":["total3","change","canBuy","diff"]} } },
  i18n: { en: { title: "Shopping Math: Four Questions", instruction: "Four cards, four different shopping questions to answer." } },
};
