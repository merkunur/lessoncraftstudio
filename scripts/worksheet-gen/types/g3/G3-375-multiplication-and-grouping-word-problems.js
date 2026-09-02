/** G3-375 — Multiply and Group: Word Problems. nt20-B-VAR variation of G3-370. */
'use strict';
const base = require('./G3-370-muldiv-word-problems.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["mul","group"],"n1":[2,4],"n2":[2,5],"max":20,"icon":16} };
module.exports = {
  ...base,
  id: 'G3-375',
  slug: 'multiplication-and-grouping-word-problems',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Multiply and Group: Word Problems", instruction: "One story builds groups, the other breaks them up." } },
};
