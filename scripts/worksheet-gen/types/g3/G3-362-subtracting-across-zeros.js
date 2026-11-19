/** G3-362 — Subtracting Across Zeros. nt20-VAR variation of G3-357 (same family: column-arithmetic). */
'use strict';
const base = require('./G3-357-column-regrouping.js');
module.exports = {
  ...base,
  id: 'G3-362',
  slug: 'subtracting-across-zeros',
  // Level Set 2026-10-05: real levels (level 2 = the published page); level 1 smaller numbers / 4 problems, level 3 harder / more problems
  difficulty: { 1: {"min":115,"max":908,"sumMax":999,"cards":4,"cols":2,"rows":2,"cell":64,"ops":["-"],"acrossZero":true}, 2: {"min":115,"max":908,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"acrossZero":true}, 3: {"min":115,"max":900,"sumMax":999,"cards":6,"cols":3,"rows":2,"ops":["-"],"zeros":2} },
  i18n: { en: { title: "Subtracting Across Zeros", instruction: "Subtract one place at a time. Regroup when you need to borrow." } },

  /**
   * THE ITEM BANK of the unit checks (Part 7.6), 2026-11-19 (unit g2-add-subtract-within-1000, whose lesson hands out
   * level 3): the page of the level, as it is. Level 3 draws its minuends among the eight whole hundreds by trying
   * numbers at random, and about one page in ten gives up ("band too tight"); a check builds sixteen pages a type, and
   * one page that cannot be built left the lesson without a part. The page is drawn again, from where the drawing
   * stood, until it builds — the same problems the level always draws. (The key build, asked with the same seed, draws
   * the same pages and writes the answer digits, as the key of the level does.)
   */
  // 2026-11-19 (review en-1119-math): as the parts before it, each problem a card of its own with its answer digits in
  // its boxes (the column factory's helper) and its digit boxes at 40 px, so that the check fits one page
  checkPage(args, ctx) {
    const { checkCards } = require('../_shared/column-arithmetic.js');
    const { checkGrid } = require('../../lib/check-page.js');
    const lv = Number(args.difficulty) || 2, d = this.difficulty[lv] || this.difficulty[2];
    const self = Object.assign(Object.create(this), { difficulty: { ...this.difficulty, [lv]: { ...d, cell: 40 } } });
    let err = null;
    for (let t = 0; t < 8; t++) {
      try { const built = base.build.call(self, args, { ...ctx, interactive: false, answerKey: false }); return { bodyHtml: checkGrid(checkCards(built.bodyHtml, false), { cols: 3 }), meta: {} }; } catch (e) { err = e; }
    }
    throw err;
  },
};
