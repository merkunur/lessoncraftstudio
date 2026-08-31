/**
 * G3-357 — Column addition & subtraction WITH regrouping (carrying /
 * borrowing — every problem requires at least one regroup). Addition cards
 * carry the small dashed carry mini-row; subtraction cards get empty
 * headroom only (borrow notation differs by country — never pre-printed).
 * CCSS 2.NBT.B.7/3.NBT.A.2 / de schriftliche Verfahren Klasse 3 /
 * es "con llevadas" / fr "avec retenue".
 * d1: addition with carrying, 2-digit · d2: mixed ±, 2-digit · d3: 3-digit mixed.
 */
'use strict';
const { makeColumnType } = require('../_shared/column-arithmetic.js');

module.exports = makeColumnType({
  id: 'G3-357',
  slug: 'column-addition-subtraction-regrouping',
  gradeBand: 'G3',
  regroup: true,
  difficulty: {
    1: { min: 15, max: 89, sumMax: 160, cards: 6, cols: 3, rows: 2, ops: ['+'] },
    2: { min: 15, max: 89, sumMax: 160, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
    3: { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
  },
  i18n: {
    en: {
      title: 'Addition and Subtraction with Regrouping',
      instruction: 'Solve each problem. Regroup when a column goes over nine or comes up short.',
    },
  },
});
