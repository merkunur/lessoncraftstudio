/** K-415 — Number Bonds of 7. Level Set 2026-10-13 variation of K-243 (same family: number-bonds) — a new face, no
 *  published page: level 1 with counting dots, level 2 six bonds, level 3 every way to split 7 (0 + 7 … 7 + 0). */
'use strict';
const base = require('./K-243-number-bonds.js');
module.exports = {
  ...base,
  id: 'K-415',
  slug: 'number-bonds-of-7',
  difficulty: base.bondLevels('7'),
  i18n: { en: { title: "Number Bonds of 7", instruction: "Look at each number bond. Write the missing number in the dashed circle." } },
};
