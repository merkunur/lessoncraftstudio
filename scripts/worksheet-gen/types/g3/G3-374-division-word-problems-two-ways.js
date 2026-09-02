/** G3-374 — Division Word Problems: Two Ways. nt20-B-VAR variation of G3-370. */
'use strict';
const base = require('./G3-370-muldiv-word-problems.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["share","group"],"n1":[2,4],"n2":[2,5],"max":20,"icon":16} };
module.exports = {
  ...base,
  id: 'G3-374',
  slug: 'division-word-problems-two-ways',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Division Word Problems: Two Ways", instruction: "One story shares out, the other makes groups. Both are division." } },
};
