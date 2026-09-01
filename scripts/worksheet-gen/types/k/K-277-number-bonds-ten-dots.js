/** K-277 — Make Ten with Counting Dots. nt20-VAR variation of K-243 (same family: number-bonds). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-277',
  slug: 'number-bonds-ten-dots',
  difficulty: { 1: {"wholeMin":10,"wholeMax":10,"dedupUnordered":true,"cards":4,"cols":2,"rows":2,"dots":true,"blanks":["a","b"],"size":232}, 2: {"wholeMin":10,"wholeMax":10,"dedupUnordered":true,"cards":4,"cols":2,"rows":2,"dots":true,"blanks":["a","b"],"size":232}, 3: {"wholeMin":10,"wholeMax":10,"dedupUnordered":true,"cards":4,"cols":2,"rows":2,"dots":true,"blanks":["a","b"],"size":232} },
  i18n: { en: { title: "Make Ten with Counting Dots", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
