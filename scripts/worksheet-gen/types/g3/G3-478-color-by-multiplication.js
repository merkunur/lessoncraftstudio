/** G3-478 — Color by Multiplication Fact (Color by Number maker, 2026-11-02; 3.OA.C.7): a fact in every shape, the code its
 *  product. K-241's engine, mode 'facts': every product of the level has at least two facts among its factors (3 × 4 and
 *  4 × 3, 2 × 6), so the same code is reached two ways. Level 1 the 2, 5 and 10 facts; level 2 adds 3 and 4; level 3 2-9. */
'use strict';
const base = require('../k/K-241-color-by-code.js');
const productsWith = (factors) => { const n = {}; for (const a of factors) for (const b of factors) n[a * b] = (n[a * b] || 0) + 1; return Object.keys(n).map(Number).filter((v) => n[v] >= 2).sort((x, y) => x - y); };
const L1 = [2, 5, 10], L2 = [2, 3, 4, 5, 10], L3 = [2, 3, 4, 5, 6, 7, 8, 9];
module.exports = {
  ...base,
  id: 'G3-478',
  slug: 'color-by-multiplication',
  gradeBand: 'G3',
  difficulty: {
    1: { mode: 'facts', codes: 3, items: 9, size: 104, factors: L1, values: productsWith(L1) },
    2: { mode: 'facts', codes: 4, items: 12, size: 100, factors: L2, values: productsWith(L2) },
    3: { mode: 'facts', codes: 5, items: 12, size: 100, factors: L3, values: productsWith(L3) },
  },
  i18n: { en: { title: "Color by Multiplication Fact", instruction: "Solve the fact in each shape. Color the shape with the color of its product in the code." } },
};
