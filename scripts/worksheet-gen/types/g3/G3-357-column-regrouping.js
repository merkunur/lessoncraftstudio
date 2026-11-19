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

const type = makeColumnType({
  id: 'G3-357',
  slug: 'column-addition-subtraction-regrouping',
  gradeBand: 'G3',
  regroup: true,
  difficulty: {
    // Level Set 2026-10-05: level 1 asks for BOTH operations (the title promises addition AND subtraction), smaller numbers, 4 problems
    1: {"min":15,"max":89,"sumMax":99,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["+","-"],"digits":[2]},
    2: { min: 15, max: 89, sumMax: 160, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
    3: { min: 115, max: 889, sumMax: 999, cards: 6, cols: 3, rows: 2, ops: ['+', '-'] },
  },
  i18n: {
    en: {
      title: 'Addition and Subtraction with Regrouping',
      instruction: 'Solve each problem. Regroup when you need to carry or borrow.',
    },
  },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (review
 * en-3checks-f1116 of g3-rounding-adding-subtracting, part 4). The page of the level, each problem a card of its own.
 * The page's answer boxes carry their digit only in the key build, where the check read them as marks, and a mark has a
 * place: every three-digit answer marks its first box, so no part could hold two problems — the lesson "Add and
 * subtract with regrouping" asked an addition only. Here each empty digit box carries its digit as its answer
 * (data-lcs-answer): the key writes it in, and two problems of a part are told apart by what they ask. G3-357 only;
 * the faces that spread this type keep their pages as they are.
 */
type.checkPage = function checkPage(args, ctx) {
  if (this.id !== 'G3-357') return this.build(args, ctx);
  const { checkGrid } = require('../../lib/check-page.js');
  const body = this.build(args, { ...ctx, interactive: false, answerKey: false }).bodyHtml;
  // (2026-11-19: the column factory's helper; the key also shows the 1s an addition carries — review en-1119-math, part 4)
  const cards = require('../_shared/column-arithmetic.js').checkCards(body, !!(ctx && ctx.answerKey));
  if (cards.length < 6 || cards.some((c) => !/data-lcs-answer=/.test(c))) throw new Error(this.id + ' checkPage: ' + cards.length + ' problems with their answers');
  return { bodyHtml: checkGrid(cards, { cols: 3 }), meta: {} };
};

module.exports = type;
