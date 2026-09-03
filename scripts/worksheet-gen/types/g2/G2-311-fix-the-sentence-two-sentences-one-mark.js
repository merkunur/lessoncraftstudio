/** G2-311 — Two Sentences: Full Stop or Question Mark?. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"joinPairs":true,"lanes":3,"ends":[".","?"],"needQ":1,"needCaps":1,"rulH":80} };
module.exports = {
  ...base,
  id: 'G2-311',
  slug: 'fix-the-sentence-two-sentences-one-mark',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Two Sentences: Full Stop or Question Mark?", instruction: "Two sentences ran together, and one of them is a question." } },
};
