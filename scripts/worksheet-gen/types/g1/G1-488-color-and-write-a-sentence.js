/** G1-488 — Color and Write a Sentence (Coloring Pages maker, 2026-11-02, NEW-TEMPLATES §27 T5; W.1.3 / L.1.1.j): one big
 *  drawing to colour, then writing rows; the first rows begin with the reviewed picture-writing starters ("I can see",
 *  "It is" — data/b2/labels.js). types/_shared/coloring-page.js, mode 'sentence'. Level 1 two rows, both with a starter ·
 *  2 three rows, two starters · 3 four rows, none. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'G1-488', slug: 'color-and-write-a-sentence', mode: 'sentence', gradeBand: 'G1',
  difficulty: {
    1: { n: 1, px: 420, rows: 2, rowH: 76, glyphH: 30, starters: 2 },
    2: { n: 1, px: 380, rows: 3, rowH: 66, glyphH: 26, starters: 2 },
    3: { n: 1, px: 340, rows: 4, rowH: 60, glyphH: 24, starters: 0 },
  },
  i18n: { en: { title: "Color and Write a Sentence", instruction: "Color the picture. Then write about it. Use the sentence starters to help you begin." } },
});
