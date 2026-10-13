/** K-414 — Number Bonds of 6. Level Set 2026-10-13 variation of K-243 (same family: number-bonds) — a new face, no
 *  published page: level 1 with counting dots, level 2 six bonds, level 3 every way to split 6 (0 + 6 … 6 + 0). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-414',
  slug: 'number-bonds-of-6',
  difficulty: base.bondLevels('6'),
  i18n: { en: { title: "Number Bonds of 6", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
