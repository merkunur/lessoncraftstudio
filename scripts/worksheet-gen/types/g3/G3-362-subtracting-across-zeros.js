/** G3-362 — Subtracting Across Zeros. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-362',
  slug: 'subtracting-across-zeros',
  difficulty: { 1: {"min":115,"max":908,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"acrossZero":true}, 2: {"min":115,"max":908,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"acrossZero":true}, 3: {"min":115,"max":908,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"acrossZero":true} },
  i18n: { en: { title: "Subtracting Across Zeros", instruction: "Subtract one place at a time. Regroup when you need to borrow." } },
};
