/** G3-361 — 3-Digit Addition with Carrying. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-361',
  slug: '3-digit-addition-carrying',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":115,"max":889,"sumMax":999,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["+"],"maxCarries":1}, 2: {"min":115,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":115,"max":889,"sumMax":999,"cards":9,"cols":3,"rows":3,"ops":["+"],"minCarries":2} },
  i18n: { en: { title: "3-Digit Addition with Carrying", instruction: "Add one place at a time. Regroup when you need to carry." } },
};
