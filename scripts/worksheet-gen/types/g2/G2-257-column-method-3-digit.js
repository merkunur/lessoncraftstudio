/** G2-257 — 3-Digit Numbers in Columns. nt20-VAR variation of G2-251 (same family: column-arithmetic). */
'use strict';
const base = require('./G2-251-column-add-sub.js');
module.exports = {
  ...base,
  id: 'G2-257',
  slug: 'column-method-3-digit',
  difficulty: { 1: {"min":111,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 2: {"min":111,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]}, 3: {"min":111,"max":888,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+","-"]} },
  i18n: { en: { title: "3-Digit Numbers in Columns", instruction: "Add or subtract one place at a time. Start with the ones." } },
};
