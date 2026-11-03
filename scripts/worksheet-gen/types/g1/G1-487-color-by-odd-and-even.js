/** G1-487 — Color by Odd and Even (Color by Number maker, 2026-11-02, NEW-TEMPLATES §26 T2; 2.OA.C.3): a number in every
 *  shape, the code even or odd — the child decides each number's parity and colours. K-241's engine, mode 'parity' (the
 *  words even / odd are the Odd and Even family's reviewed ones, data/parity-words.json); no 0, all numbers different,
 *  each kind half the shapes, give or take one. Level 1 numbers to 20 · 2 to 50 · 3 to 100. */
'use strict';
const base = require('../k/K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'G1-487',
  slug: 'color-by-odd-and-even',
  gradeBand: 'G1',
  difficulty: {
    1: { mode: 'parity', codes: 2, items: 10, size: 100, range: [1, 20] },
    2: { mode: 'parity', codes: 2, items: 12, size: 100, range: [1, 50] },
    3: { mode: 'parity', codes: 2, items: 12, size: 100, range: [1, 100] },
  },
  i18n: { en: { title: "Color by Odd and Even", instruction: "Is the number in each shape even or odd? Color the shape with that color in the key." } },
};
