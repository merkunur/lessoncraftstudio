/** G2-307 — Fix the Sentence: Where Does It End?. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"joinPairs":true,"lanes":3,"ends":["."],"needCaps":1,"rulH":48,"glyphH":22,"icon":40} };
module.exports = {
  ...base,
  id: 'G2-307',
  slug: 'fix-the-sentence-where-does-it-end',
  // Level Set 2026-09-28: L1 the split point is marked with a slash · L2 published
  // (3 names is barely different from the published page, whose draws often carry names — measured;
  // so this face has two levels)
  difficulty: { 1: { ...D, markSplit: true }, 2: D, 3: D },
  interactive: { ...base.interactive, instructionKey: 'tapFixRunOn' },
  i18n: { en: { title: "Fix the Sentence: Where Does It End?", instruction: "Two sentences ran together. Write them as two sentences." } },
};
