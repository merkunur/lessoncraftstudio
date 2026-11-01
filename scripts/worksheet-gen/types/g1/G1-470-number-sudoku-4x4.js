/** G1-470 — Number Sudoku 4 × 4 (Logic & Math Puzzles maker, task 6 of the ten, 2026-11-01). See types/_shared/logic-more.js. */
'use strict';
const { makeLogicType } = require('../_shared/logic-more.js');

module.exports = makeLogicType({
  id: 'G1-470', slug: 'number-sudoku-4x4', mode: 'sudoku', gradeBand: 'G1', size: 4, symbols: 'numbers',
  i18n: { en: { title: "Number Sudoku 4 × 4", instruction: "Every row, column, and box needs the numbers 1, 2, 3, and 4 once. Write the missing numbers." } },
});
