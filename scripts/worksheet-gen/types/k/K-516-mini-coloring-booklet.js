/** K-516 — A Mini Coloring Booklet (Coloring Pages maker, 2026-11-02, NEW-TEMPLATES §27 T6): one sheet folded twice into a
 *  four-page book — a cover with the theme's name and three drawings to colour. The top half is printed upside down so
 *  every page stands upright once folded. types/_shared/coloring-page.js, mode 'booklet'. Level 1 drawings only · 2 each
 *  drawing with its name · 3 each drawing with a line to write its name. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'K-516', slug: 'mini-coloring-booklet', mode: 'booklet',
  difficulty: {
    1: { n: 4, px: 250 },
    2: { n: 4, px: 230, words: true, maxLetters: 10 },
    3: { n: 4, px: 230, write: true },
  },
  i18n: { en: { title: "A Mini Coloring Booklet", instruction: "Fold the top half back, then fold the left half back to make a little book. Color every page." } },
});
