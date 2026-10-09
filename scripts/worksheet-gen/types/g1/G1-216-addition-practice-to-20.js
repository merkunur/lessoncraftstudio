/** G1-216 — Addition Practice to 20. nt20-VAR variation of G1-208 (same family: mental-math). */
'use strict';
const base = require('./G1-208-mental-math-to-20.js');
module.exports = {
  ...base,
  id: 'G1-216',
  slug: 'addition-practice-to-20',
  // Level Set 2026-10-09: real levels (level 2 = the published config; knobs in G1-208-mental-math-to-20.js)
  difficulty: { 1: {"max":20,"cards":12,"ops":["+"],"cross":"never"}, 2: {"max":20,"cards":12,"cols":3,"rows":4,"ops":["+"],"missing":false}, 3: {"max":20,"cards":12,"ops":["+"],"cross":"always"} },
  i18n: { en: { title: "Addition Practice to 20", instruction: "Solve each problem in your head. Write the missing number in the box." } },
};
