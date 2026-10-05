/** G3-360 — Subtraction with Borrowing. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-360',
  slug: 'subtraction-with-borrowing',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":15,"max":60,"sumMax":160,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["-"]}, 2: {"min":15,"max":89,"sumMax":160,"cards":6,"cols":3,"rows":2,"ops":["-"]}, 3: {"min":15,"max":99,"sumMax":160,"cards":9,"cols":3,"rows":3,"ops":["-"]} },
  i18n: { en: { title: "Subtraction with Borrowing", instruction: "Subtract one place at a time. Regroup when you need to borrow." } },
};
