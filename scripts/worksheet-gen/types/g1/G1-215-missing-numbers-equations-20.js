/** G1-215 — Missing Number Problems to 20. nt20-VAR variation of G1-208 (same family: mental-math). */
'use strict';
const base = require('./G1-208-mental-math-to-20.js');
module.exports = {
  ...base,
  id: 'G1-215',
  slug: 'missing-numbers-equations-20',
  // Level Set 2026-10-09: real levels (level 2 = the published config; knobs in G1-208-mental-math-to-20.js)
  difficulty: { 1: {"max":20,"cards":12,"ops":["+","-"],"pos":["b"]}, 2: {"max":20,"cards":12,"cols":3,"rows":4,"ops":["+","-"],"missing":true}, 3: {"max":20,"cards":12,"ops":["+","-"],"pos":["a"],"cross":"always"} },
  i18n: { en: { title: "Missing Number Problems to 20", instruction: "Work out the missing number in your head. Write it in the box." } },
};
