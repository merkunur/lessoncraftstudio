/** G2-282 — Fix the Sentence: Choose the End Mark. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G2-282',
  slug: 'fix-the-sentence-choose-the-end-mark',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Fix the Sentence: Choose the End Mark", instruction: "Some sentences ask a question. Choose the right end mark." } },
};
