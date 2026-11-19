/** G2-502 — Subtract Three-Digit Numbers with Regrouping (Year pages E, 2026-11-13): subtraction only, in columns
 *  (2.NBT.B.7). Level 1 a three-digit minus a two-digit number with one regrouping, level 2 two three-digit numbers
 *  with one regrouping, level 3 with two. Every answer has three digits, so the number of answer boxes tells nothing. A face of the column factory; G3-357 mixes plus and minus. */
'use strict';
const { makeColumnType } = require('../_shared/column-arithmetic.js');
const type = makeColumnType({
  id: 'G2-502', slug: 'subtract-three-digit-numbers', gradeBand: 'G23', regroup: true,
  difficulty: {
    1: { min: 115, max: 889, bMin: 12, bMax: 89, sumMax: 999, cards: 4, cols: 2, rows: 2, cell: 64, ops: ['-'], digits: [3], maxCarries: 1, resultMin: 100 },
    2: { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['-'], digits: [3], sameDigits: true, maxCarries: 1, resultMin: 100 },
    3: { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['-'], digits: [3], sameDigits: true, minCarries: 2, resultMin: 100 },
  },
  i18n: { en: { title: 'Subtract Three-Digit Numbers with Regrouping', instruction: 'Subtract one place at a time. Regroup when you need to borrow.' } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6), 2026-11-19 (review en-1119-math of g2-add-subtract-within-1000, part 2:
 * one problem a part, and both forms regrouped a hundred only): the page of the level, each problem a card of its own,
 * its answer digits in its boxes (the column factory's helper). The check takes one problem that regroups a ten for the
 * ones and one that regroups a hundred for the tens (lists: kindText, mixKinds), form B as form A.
 */
type.checkPage = function checkPage(args, ctx) {
  const { checkCards } = require('../_shared/column-arithmetic.js');
  const { checkGrid } = require('../../lib/check-page.js');
  // (the check sets the digit boxes at 40 px, the page at 44: the three parts of the within-1,000 check fit one page)
  const lv = Number(args.difficulty) || 2, d = this.difficulty[lv] || this.difficulty[2];
  const self = Object.assign(Object.create(this), { difficulty: { ...this.difficulty, [lv]: { ...d, cell: 40 } } });
  const built = this.build.call(self, args, { ...ctx, interactive: false, answerKey: false });
  return { bodyHtml: checkGrid(checkCards(built.bodyHtml, false), { cols: 3 }), meta: {} };
};

module.exports = type;
