/** G1-215 — Missing Number Problems to 20. nt20-VAR variation of G1-208 (same family: mental-math). */
'use strict';
const base = require('./G1-208-mental-math-to-20.js');
module.exports = {
  ...base,
  id: 'G1-215',
  slug: 'missing-numbers-equations-20',
  difficulty: { 1: {"max":20,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true}, 2: {"max":20,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true}, 3: {"max":20,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true} },
  i18n: { en: { title: "Missing Number Problems to 20", instruction: "Work out the missing number in your head. Write it in the box." } },
};
