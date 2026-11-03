/** K-513 — Color by Number Word (Color by Number maker, 2026-11-02, NEW-TEMPLATES §26 T5; K.CC.A.3 with number words): a
 *  number WORD in every wide shape, the code its numeral — the child reads the word and finds its number in the code.
 *  K-241's engine, mode 'numwords' (lib/number-words.js, the reviewed words of every locale; no 0). Level 1 one to five,
 *  three colours · 2 one to ten, four · 3 eleven to twenty, four. */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-513',
  slug: 'color-by-number-word',
  difficulty: {
    1: { mode: 'numwords', codes: 3, items: 9, size: 100, range: [1, 5] },
    2: { mode: 'numwords', codes: 4, items: 12, size: 100, range: [1, 10] },
    3: { mode: 'numwords', codes: 4, items: 12, size: 100, range: [11, 20] },
  },
  i18n: { en: { title: "Color by Number Word", instruction: "Read the number word in each shape. Find its number in the key and color the shape with that color." } },
};
