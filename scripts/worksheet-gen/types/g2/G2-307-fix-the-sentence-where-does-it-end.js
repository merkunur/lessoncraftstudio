/** G2-307 — Fix the Sentence: Where Does It End?. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"joinPairs":true,"lanes":3,"ends":["."],"needCaps":1,"rulH":48,"glyphH":22,"icon":40} };
module.exports = {
  ...base,
  id: 'G2-307',
  slug: 'fix-the-sentence-where-does-it-end',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Fix the Sentence: Where Does It End?", instruction: "Two sentences ran together. Write them as two sentences." } },
};
