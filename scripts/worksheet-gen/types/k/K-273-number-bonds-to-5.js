/** K-273 — Number Bonds to 5. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-273',
  slug: 'number-bonds-to-5',
  difficulty: { 1: {"wholeMin":5,"wholeMax":5,"cards":6,"cols":2,"rows":3,"dots":true,"blanks":["a","b"],"size":196}, 2: {"wholeMin":5,"wholeMax":5,"cards":6,"cols":2,"rows":3,"dots":true,"blanks":["a","b"],"size":196}, 3: {"wholeMin":5,"wholeMax":5,"cards":6,"cols":2,"rows":3,"dots":true,"blanks":["a","b"],"size":196} },
  i18n: { en: { title: "Number Bonds to 5", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
