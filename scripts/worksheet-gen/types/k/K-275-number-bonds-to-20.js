/** K-275 — Number Bonds to 20. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-275',
  slug: 'number-bonds-to-20',
  difficulty: { 1: {"wholeMin":20,"wholeMax":20,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196}, 2: {"wholeMin":20,"wholeMax":20,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196}, 3: {"wholeMin":20,"wholeMax":20,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196} },
  i18n: { en: { title: "Number Bonds to 20", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
