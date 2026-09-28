/** G2-311 — Two Sentences: Full Stop or Question Mark?. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"joinPairs":true,"lanes":3,"ends":[".","?"],"needQ":1,"needCaps":1,"rulH":48,"glyphH":22,"icon":40} };
module.exports = {
  ...base,
  id: 'G2-311',
  slug: 'fix-the-sentence-two-sentences-one-mark',
  // Level Set 2026-09-28: L1 split marked with a slash · L2 published · L3 unmarked, . ? !
  difficulty: { 1: { ...D, markSplit: true }, 2: D, 3: { ...D, ends: ['.', '?', '!'] } },
  interactive: { ...base.interactive, instructionKey: 'tapFixRunOn' },
  i18n: { en: { title: "Two Sentences: Full Stop or Question Mark?", instruction: "Split the two sentences. End each with the right mark." } },
};
