/** G2-255 — 2-Digit Column Addition. nt20-VAR variation of G2-251 (same family: column-arithmetic). */
'use strict';
const base = require('./G2-251-column-add-sub.js');
module.exports = {
  ...base,
  id: 'G2-255',
  slug: 'column-addition-2-digit',
  difficulty: { 1: {"min":11,"max":88,"sumMax":99,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 2: {"min":11,"max":88,"sumMax":99,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":11,"max":88,"sumMax":99,"cards":6,"cols":3,"rows":2,"ops":["+"]} },
  i18n: { en: { title: "2-Digit Column Addition", instruction: "Add one place at a time. Start with the ones." } },
};
