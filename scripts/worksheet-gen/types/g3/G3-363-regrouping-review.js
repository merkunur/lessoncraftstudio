/** G3-363 — Regrouping Review. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-363',
  slug: 'regrouping-review',
  difficulty: { 1: {"min":15,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 2: {"min":15,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 3: {"min":15,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]} },
  i18n: { en: { title: "Regrouping Review", instruction: "Solve each problem. Regroup when you need to carry or borrow." } },
};
