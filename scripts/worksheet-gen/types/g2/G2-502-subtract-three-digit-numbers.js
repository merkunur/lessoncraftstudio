/** G2-502 — Subtract Three-Digit Numbers with Regrouping (Year pages E, 2026-11-13): subtraction only, in columns
 *  (2.NBT.B.7). Level 1 a three-digit minus a two-digit number with one regrouping, level 2 two three-digit numbers
 *  with one regrouping, level 3 with two. Every answer has three digits, so the number of answer boxes tells nothing. A face of the column factory; G3-357 mixes plus and minus. */
'use strict';
const { makeColumnType } = require('../_shared/column-arithmetic.js');
module.exports = makeColumnType({
  id: 'G2-502', slug: 'subtract-three-digit-numbers', gradeBand: 'G23', regroup: true,
  difficulty: {
    1: { min: 115, max: 889, bMin: 12, bMax: 89, sumMax: 999, cards: 4, cols: 2, rows: 2, cell: 64, ops: ['-'], digits: [3], maxCarries: 1, resultMin: 100 },
    2: { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['-'], digits: [3], sameDigits: true, maxCarries: 1, resultMin: 100 },
    3: { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['-'], digits: [3], sameDigits: true, minCarries: 2, resultMin: 100 },
  },
  i18n: { en: { title: 'Subtract Three-Digit Numbers with Regrouping', instruction: 'Subtract one place at a time. Regroup when you need to borrow.' } },
});
