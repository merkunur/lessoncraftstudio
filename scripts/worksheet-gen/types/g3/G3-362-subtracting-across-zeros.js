/** G3-362 — Subtracting Across Zeros. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-362',
  slug: 'subtracting-across-zeros',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":115,"max":908,"sumMax":999,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["-"],"acrossZero":true}, 2: {"min":115,"max":908,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"acrossZero":true}, 3: {"min":115,"max":900,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"zeros":2} },
  i18n: { en: { title: "Subtracting Across Zeros", instruction: "Subtract one place at a time. Regroup when you need to borrow." } },
};
