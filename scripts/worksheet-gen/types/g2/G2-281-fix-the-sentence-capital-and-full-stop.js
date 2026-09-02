/** G2-281 — Fix the Sentence: Capital and Full Stop. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G2-281',
  slug: 'fix-the-sentence-capital-and-full-stop',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Fix the Sentence: Capital and Full Stop", instruction: "Every sentence is missing something. Rewrite it with a capital letter and a full stop." } },
};
