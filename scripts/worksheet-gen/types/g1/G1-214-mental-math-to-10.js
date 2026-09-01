/** G1-214 — Mental Math to 10. nt20-VAR variation of G1-208 (same family: mental-math). */
'use strict';
const base = require('./G1-208-mental-math-to-20.js');
module.exports = {
  ...base,
  id: 'G1-214',
  slug: 'mental-math-to-10',
  difficulty: { 1: {"max":10,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":false}, 2: {"max":10,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":false}, 3: {"max":10,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":false} },
  i18n: { en: { title: "Mental Math to 10", instruction: "Solve each problem in your head. Write the missing number in the box." } },
};
