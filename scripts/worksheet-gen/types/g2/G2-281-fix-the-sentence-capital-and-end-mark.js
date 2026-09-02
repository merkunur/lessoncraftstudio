/** G2-281 — Fix the Sentence: Capital and End Mark. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"ends":[".","?"],"lanes":3} };
module.exports = {
  ...base,
  id: 'G2-281',
  slug: 'fix-the-sentence-capital-and-end-mark',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Fix the Sentence: Capital and End Mark", instruction: "Rewrite each sentence with a capital letter and the right end mark." } },
};
