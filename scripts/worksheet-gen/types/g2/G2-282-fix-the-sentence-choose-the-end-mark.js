/** G2-282 — Fix the Sentence: Choose the End Mark. nt20-B-VAR variation of G2-274. */
'use strict';
const base = require('./G2-274-fix-the-sentence.js');
// D = the published level-2 face (byte-identical). Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G2-282',
  slug: 'fix-the-sentence-choose-the-end-mark',
  // Level Set 2026-09-28: L1 one name, ends . ? · L2 published · L3 three names, . ? ! and NO checklist banner
  difficulty: { 1: { ...D, needCaps: 1, ends: ['.', '?'], needQ: 1 }, 2: D, 3: { ...D, needCaps: 3, hideChips: true } },
  i18n: { en: { title: "Fix the Sentence: Choose the End Mark", instruction: "Fix the capital letters and the names, and choose the right end mark." } },
};
