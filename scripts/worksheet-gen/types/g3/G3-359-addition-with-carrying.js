/** G3-359 — Addition with Carrying. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-359',
  slug: 'addition-with-carrying',
  difficulty: { 1: {"min":15,"max":89,"sumMax":160,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 2: {"min":15,"max":89,"sumMax":160,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":15,"max":89,"sumMax":160,"cards":6,"cols":3,"rows":2,"ops":["+"]} },
  i18n: { en: { title: "Addition with Carrying", instruction: "Add one place at a time. Regroup when you need to carry." } },
};
