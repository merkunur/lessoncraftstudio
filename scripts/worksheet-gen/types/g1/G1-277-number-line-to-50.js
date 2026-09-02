/** G1-277 — Where on the Number Line? 0 to 50. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"max":50,"label":10} };
module.exports = {
  ...base,
  id: 'G1-277',
  slug: 'number-line-to-50',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Where on the Number Line? 0 to 50", instruction: "Count on to 50. Every tenth number is printed to help you." } },
};
