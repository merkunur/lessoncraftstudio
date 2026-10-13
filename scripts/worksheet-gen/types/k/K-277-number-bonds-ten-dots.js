/** K-277 — Make Ten with Counting Dots. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-277',
  slug: 'number-bonds-ten-dots',
  // Level Set 2026-10-13: levels 1 and 3 from K-243 bondLevels (never pasted here — tools/gen-var-specs.js would flatten
  // them); level 2 = the published config, exactly as it was.
  difficulty: base.bondLevels('makeTen', {"wholeMin":10,"wholeMax":10,"dedupUnordered":true,"cards":4,"cols":2,"rows":2,"dots":true,"blanks":["a","b"],"size":232}),
  i18n: { en: { title: "Make Ten with Counting Dots", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
