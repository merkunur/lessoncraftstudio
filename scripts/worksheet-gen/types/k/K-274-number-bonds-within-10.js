/** K-274 — Number Bonds Within 10. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-274',
  slug: 'number-bonds-within-10',
  difficulty: { 1: {"wholeMin":5,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196}, 2: {"wholeMin":5,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196}, 3: {"wholeMin":5,"wholeMax":10,"dedupUnordered":true,"cards":6,"cols":2,"rows":3,"dots":false,"blanks":["a","b"],"size":196} },
  i18n: { en: { title: "Number Bonds Within 10", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
