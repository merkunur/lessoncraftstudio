/** G3-361 — 3-Digit Addition with Carrying. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-361',
  slug: '3-digit-addition-carrying',
  difficulty: { 1: {"min":115,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 2: {"min":115,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":115,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+"]} },
  i18n: { en: { title: "3-Digit Addition with Carrying", instruction: "Add one place at a time. Regroup when you need to carry." } },
};
