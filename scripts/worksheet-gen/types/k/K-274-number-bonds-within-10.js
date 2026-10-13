/** K-274 — Number Bonds Within 10. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-274',
  slug: 'number-bonds-within-10',
  // Level Set 2026-10-13: levels 1 and 3 from K-243 bondLevels (never pasted here — tools/gen-var-specs.js would flatten
  // them); level 2 = the published config, exactly as it was.
  difficulty: base.bondLevels('within', {"wholeMin":5,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196}),
  i18n: { en: { title: "Number Bonds Within 10", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
