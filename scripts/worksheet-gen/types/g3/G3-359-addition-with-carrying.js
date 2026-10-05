/** G3-359 — Addition with Carrying. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-359',
  slug: 'addition-with-carrying',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":15,"max":79,"sumMax":99,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["+"]}, 2: {"min":15,"max":89,"sumMax":160,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":25,"max":99,"sumMax":198,"resultMin":100,"cards":9,"cols":3,"rows":3,"ops":["+"]} },
  i18n: { en: { title: "Addition with Carrying", instruction: "Add one place at a time. Regroup when you need to carry." } },
};
