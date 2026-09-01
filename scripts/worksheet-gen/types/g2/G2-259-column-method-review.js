/** G2-259 — Column Method Review. nt20-VAR variation of G2-251 (same family: column-arithmetic). */
'use strict';
const base = require('./G2-251-column-add-sub.js');
module.exports = {
  ...base,
  id: 'G2-259',
  slug: 'column-method-review',
  difficulty: { 1: {"min":11,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 2: {"min":11,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 3: {"min":11,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]} },
  i18n: { en: { title: "Column Method Review", instruction: "Add or subtract one place at a time. Start with the ones." } },
};
