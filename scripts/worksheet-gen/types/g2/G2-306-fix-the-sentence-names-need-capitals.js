/** G2-306 — Fix the Sentence: Every Sentence Has a Name. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"needCaps":3,"lanes":3,"chips":["capital","name","end"],"ends":["."]} };
module.exports = {
  ...base,
  id: 'G2-306',
  slug: 'fix-the-sentence-names-need-capitals',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Fix the Sentence: Every Sentence Has a Name", instruction: "Every sentence names somebody. Find both capitals, not just the first." } },
};
