/** K-276 — Find the Whole: Number Bonds. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-276',
  slug: 'number-bonds-missing-whole',
  difficulty: { 1: {"wholeMin":6,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["whole"],"size":196}, 2: {"wholeMin":6,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["whole"],"size":196}, 3: {"wholeMin":6,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["whole"],"size":196} },
  i18n: { en: { title: "Find the Whole: Number Bonds", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
