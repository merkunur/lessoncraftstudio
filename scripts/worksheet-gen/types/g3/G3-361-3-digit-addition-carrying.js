/** G3-361 — 3-Digit Addition with Carrying. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');

/** the carries of a + b, place by place from the ones (1 where a place gives a ten to the next) */
function carriesOf(a, b) {
  const out = [];
  let c = 0;
  for (let x = a, y = b; x > 0 || y > 0; x = Math.floor(x / 10), y = Math.floor(y / 10)) { c = (x % 10) + (y % 10) + c >= 10 ? 1 : 0; out.push(c); }
  return out;
}

module.exports = {
  ...base,
  id: 'G3-361',
  slug: '3-digit-addition-carrying',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":115,"max":889,"sumMax":999,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["+"],"maxCarries":1}, 2: {"min":115,"max":889,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["+"]}, 3: {"min":115,"max":889,"sumMax":999,"cards":9,"cols":3,"rows":3,"ops":["+"],"minCarries":2} },
  i18n: { en: { title: "3-Digit Addition with Carrying", instruction: "Add one place at a time. Regroup when you need to carry." } },

  /**
   * THE ITEM BANK of the unit checks (Part 7.6): the page of the level, each problem a card of its own, its answer digits
   * in its boxes and, in the key, the 1s it carries (the reviewer: "show the 1s"). 2026-11-19 (review en-1119-math: one
   * problem a part let one slip decide the lesson): the level draws problems that make one new ten or hundred and
   * problems that make both, and the check takes one of each (lists: kindRegroup, mixKinds), form B as form A (the
   * earlier rule "every problem regroups twice" answered the review of 2026-11-15, when a part held one problem).
   */
  checkPage(args, ctx) {
    const { checkCards } = require('../_shared/column-arithmetic.js');
    const { checkGrid } = require('../../lib/check-page.js');
    // (the check sets the digit boxes at 40 px, the page at 44: the three parts of the within-1,000 check fit one page)
    const lv = Number(args.difficulty) || 2, d = this.difficulty[lv] || this.difficulty[2];
    const self = Object.assign(Object.create(this), { difficulty: { ...this.difficulty, [lv]: { ...d, cell: 40 } } });
    const built = base.build.call(self, args, { ...ctx, interactive: false, answerKey: false });
    return { bodyHtml: checkGrid(checkCards(built.bodyHtml, !!(ctx && ctx.answerKey)), { cols: 3 }), meta: {} };
  },
};
