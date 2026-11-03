/** K-515 — Color Big and Small (Coloring Pages maker, 2026-11-02, NEW-TEMPLATES §27 T4; K.MD.A.2 size words): the same
 *  drawing at two or three sizes, and a key by size — a size dot and the size word, then a crayon and its colour word (the
 *  teacher may type her own colour on every key line). The sizes stand in a shuffled order, so "the big one" is found by
 *  looking, not by place. types/_shared/coloring-page.js, mode 'sizes'. Level 1 one drawing, big and small · 2 two
 *  drawings, big and small · 3 one drawing, big, medium and small. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'K-515', slug: 'color-big-and-small', mode: 'sizes',
  difficulty: {
    1: { n: 1, sizes: ['big', 'small'], px: { big: 400, small: 170 } },
    2: { n: 2, sizes: ['big', 'small'], px: { big: 260, small: 120 } },
    3: { n: 1, sizes: ['big', 'medium', 'small'], px: { big: 320, medium: 200, small: 115 } },
  },
  i18n: { en: { title: "Color Big and Small", instruction: "Look at the key: every size has its own color. Color each picture with the color of its size." } },
});
