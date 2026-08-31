/**
 * G2-251 — Column addition & subtraction WITHOUT regrouping (the entry form
 * of the written algorithm). Every column stays inside its place: digit sums
 * ≤ 9, top digit ≥ bottom digit. CCSS 2.NBT.B.5 / de halbschriftlich→
 * schriftlich vorbereitend / es "sumas sin llevar".
 * d1: addition only, 2-digit · d2: mixed ±, 2-digit · d3: mixed ±, 3-digit.
 */
'use strict';
const { makeColumnType } = require('../_shared/column-arithmetic.js');

module.exports = makeColumnType({
  id: 'G2-251',
  slug: 'column-addition-subtraction-no-regrouping',
  gradeBand: 'G2',
  regroup: false,
  difficulty: {
    1: { min: 11, max: 88, sumMax: 99, cards: 6, cols: 3, rows: 2, ops: ['+'] },
    2: { min: 11, max: 88, sumMax: 99, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
    3: { min: 111, max: 888, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
  },
  i18n: {
    en: {
      title: 'Column Addition and Subtraction',
      // (de-panel finding: the numbers are pre-printed — never claim the child writes them)
      instruction: 'Add or subtract one place at a time. Start with the ones.',
    },
  },
});
