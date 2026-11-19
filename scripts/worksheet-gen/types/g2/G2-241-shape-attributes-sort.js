/** G2-241 — Shape Sorter (geometry-tasks factory, mode sort-sides) */
'use strict';
const { makeGeometryType, polyPoints, polySvg } = require('../_shared/geometry-tasks.js');
const tokens = require('../../primitives/_tokens.js');
const type = makeGeometryType({
  id: 'G2-241', slug: '2d-shapes-attributes', mode: 'sort-sides',
  i18n: { en: { title: 'Shape Sorter', instruction: 'Draw a line from each shape to its number of sides.' } },
});

/**
 * THE ITEM BANK of the unit checks (Part 7.6; docs/daily-teaching-system/PART-7-DESIGN.md "7.6"), 2026-11-19 (review
 * en-3checks-f1116 of g2-shapes-solids-symmetry: "no part on sorting shapes by sides"). The page is one task — a row of
 * shapes above the bins they are sorted into — and cannot be cut. Here a card is the page made small: one shape for each
 * of three shapes, each above its own row of bins as numbers, the right bin marked for the key. 2026-11-19 (review
 * en-1119-math: with one shape per bin the last shape was found by elimination, and no pentagon appeared): every shape
 * is drawn on its own (repeats allowed) and offers every bin of the lesson — 3 and 4 sides at level 1, 3, 4, 5 and 6 from
 * level 2 —, the bins spaced apart. The shapes are the uneven, turned polygons the
 * page draws itself (geometry-tasks.js polyPoints: every corner a visible corner), so a child counts the sides and does
 * not recognise a familiar picture; the factory's own sort pages draw half their shapes the same way.
 */
type.checkPage = function checkPage(args, ctx) {
  const { checkGrid } = require('../../lib/check-page.js');
  const lv = Number(args.difficulty) || 2, rng = ctx.rng;
  const FILL = [tokens.color.tealSoft, tokens.color.coralSoft, tokens.color.creamDeep];
  const bin = (g, ok) => `<span data-lcs-choice="${g}"${ok ? ' data-lcs-correct="1"' : ''} style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:40px;box-sizing:border-box;border:2.5px dashed ${tokens.color.teal};border-radius:12px;background:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:21px;color:${tokens.color.teal}">${g}</span>`;
  const cards = [];
  for (let c = 0; c < 8; c++) {
    const groups = lv === 1 ? [3, 4] : [3, 4, 5, 6];
    const order = [0, 1, 2].map(() => rng.pick(groups));
    if (new Set(order).size === 1) order[rng.int(0, 2)] = rng.pick(groups.filter((g) => g !== order[0]));
    const px = 100;
    const one = (n, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px" data-lcs-sides="${n}">${polySvg(polyPoints(n, rng), px, FILL[i % FILL.length])}` +
      `<span style="display:flex;gap:9px">${groups.map((g) => bin(g, g === n)).join('')}</span></div>`;
    cards.push(`<div class="ws-card-stage" style="justify-content:space-evenly;align-items:flex-start;gap:8px;padding:6px 4px" data-lcs-sort="${order.join(',')}">${order.map(one).join('')}</div>`);
  }
  return { bodyHtml: checkGrid(cards), meta: {} };
};

module.exports = type;
