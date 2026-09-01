/** G1-218 — Missing Number Problems to 10. nt20-VAR variation of G1-208 (same family: mental-math). */
'use strict';
const base = require('./G1-208-mental-math-to-20.js');
module.exports = {
  ...base,
  id: 'G1-218',
  slug: 'missing-numbers-equations-10',
  difficulty: { 1: {"max":10,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true}, 2: {"max":10,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true}, 3: {"max":10,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true} },
  i18n: { en: { title: "Missing Number Problems to 10", instruction: "Work out the missing number in your head. Write it in the box." } },
};
