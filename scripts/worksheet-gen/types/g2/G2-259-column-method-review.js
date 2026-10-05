/** G2-259 — Column Method Review. nt20-VAR variation of G2-251 (same family: column-arithmetic). */
'use strict';
const base = require('./G2-251-column-add-sub.js');
module.exports = {
  ...base,
  id: 'G2-259',
  slug: 'column-method-review',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":11,"max":88,"sumMax":99,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["+","-"]}, 2: {"min":11,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 3: {"min":11,"max":988,"sumMax":999,"cards":9,"cols":3,"rows":3,"ops":["+","-"]} },
  i18n: { en: { title: "Column Method Review", instruction: "Add or subtract one place at a time. Start with the ones." } },
};
