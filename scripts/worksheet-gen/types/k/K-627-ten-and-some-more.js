/** K-627 — ten and some more (K.NBT.A.1): 11 to 19 loose ones, ring ten, write 10 + □ = □.
 *  Year pages D (Part 12.2), 2026-11-13: a face of types/_shared/base-ten-tasks.js mode 'regroup' with the frame of
 *  Kindergarten (no "tens" word, no times sign). Level 1 11-14 · 2 11-19 · 3 15-19. */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
const type = makeBaseTenType({
  id: 'K-627', slug: 'ten-and-some-more', mode: 'regroup', gradeBand: 'K',
  levels: { regroup: { 1: { lo: 11, hi: 14, frame: 'teen' }, 2: { lo: 11, hi: 19, frame: 'teen' }, 3: { lo: 15, hi: 19, frame: 'teen' } } },
  i18n: { en: { title: 'Ten and Some More', instruction: 'Circle ten squares. Write how many are not circled. Then write the number.' } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6), 2026-11-19 (review en-1119-math of k-teen-numbers-and-counting-to-100,
 * part 1: "the key should also show the ring around two full columns, the first thing a teacher checks"). The page's own
 * rows, as the page lays them out; in the key the ten the child circles is ringed: the squares stand in columns of five
 * from the left, so the ring goes round the first two columns.
 * 2026-11-19 (second read: part 4 of the same check asked "14 = 10 + 4", part 1's fact, in both forms): the rows stay in
 * the page's own card grid, so the cutter reads each row as the fact it is (10, 4 and 14) and a form never asks that fact
 * again in another part (a grid of check cards read every row as a picture of its own).
 */
type.checkPage = function checkPage(args, ctx) {
  const key = !!(ctx && ctx.answerKey);
  const built = this.build(args, { ...ctx, interactive: false, answerKey: false });
  if (!key) return { bodyHtml: built.bodyHtml, meta: {} };
  let rings = 0;
  const bodyHtml = built.bodyHtml.replace(/(<svg [^>]*data-lcs-prim="base-ten"[^>]*>)([\s\S]*?)(<\/svg>)/g, (all, open, inner, close) => {
    const ones = [...inner.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"[^>]*data-lcs-block="one"/g)].map((r) => r.slice(1).map(Number));
    const xs = [...new Set(ones.map((r) => r[0]))].sort((x, y) => x - y).slice(0, 2);
    if (ones.length < 10 || xs.length < 2) throw new Error('K-627 checkPage: no two columns of five to ring');
    const ten = ones.filter((r) => xs.includes(r[0])), x0 = Math.min(...ten.map((r) => r[0])) - 3, y0 = Math.min(...ten.map((r) => r[1])) - 3;
    const x1 = Math.max(...ten.map((r) => r[0] + r[2])) + 3, y1 = Math.max(...ten.map((r) => r[1] + r[3])) + 3;
    rings++;
    return open + inner + `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="10" ry="10" fill="none" stroke="#C9552E" stroke-width="3" data-lcs-ten-ring="1"/>` + close;
  });
  if (!rings) throw new Error('K-627 checkPage: no rows to ring');
  return { bodyHtml, meta: {} };
};

module.exports = type;
