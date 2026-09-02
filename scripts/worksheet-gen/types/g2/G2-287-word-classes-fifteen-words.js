/** G2-287 — Word Classes: Sort Fifteen Words. nt20-B-VAR variation of G2-275. */
'use strict';
const base = require('./G2-275-word-classes.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'G2-287',
  slug: 'word-classes-fifteen-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Word Classes: Sort Fifteen Words", instruction: "There are more words and no pictures. Read each one carefully before you sort it." } },
};
