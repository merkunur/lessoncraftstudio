/** G2-281 — Fix the Sentence: Capital and End Mark. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"ends":[".","?"],"lanes":3,"needQ":1} };
module.exports = {
  ...base,
  id: 'G2-281',
  slug: 'fix-the-sentence-capital-and-end-mark',
  // Level Set 2026-09-28: L1 full stop only · L2 published (. and ?) · L3 + two names to capitalise, 4 lanes
  difficulty: { 1: { ...D, ends: ['.'], needQ: 0 }, 2: D, 3: { ...D, lanes: 4, needCaps: 2, chips: ['capital', 'name', 'end'] } },
  i18n: { en: { title: "Fix the Sentence: Capital and End Mark", instruction: "Rewrite each sentence with a capital letter and the right end mark." } },
};
