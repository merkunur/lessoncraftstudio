/** K-474 — Color by Sight Word (Color by Number maker, 2026-11-02): a sight word in every shape, the code the word. K-241's
 *  engine, mode 'words' (data/literacy/sight-words.js, the first 12 = the core). */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-474',
  slug: 'color-by-sight-word',
  difficulty: {
    1: { mode: 'words', codes: 2, items: 8, size: 112, wordPool: 12 },
    2: { mode: 'words', codes: 3, items: 9, size: 106, wordPool: 12 },
    3: { mode: 'words', codes: 4, items: 12, size: 100, wordPool: 24 },
  },
  i18n: { en: { title: "Color by Sight Word", instruction: "Read the word in each shape. Color the shape with the color of that word in the code." } },
};
