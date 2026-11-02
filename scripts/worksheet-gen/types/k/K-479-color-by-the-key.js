/** K-479 — Color by the Key (Coloring Pages maker, 2026-11-02): numbered drawings and a key — number, crayon, colour word.
 *  The teacher may type every key line herself (free-text slots: "your favourite colour", a colour of her choice); an open
 *  page, never graded. types/_shared/coloring-page.js, mode 'key'. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'K-479', slug: 'color-by-the-key', mode: 'key',
  difficulty: { 1: { n: 2, px: 240 }, 2: { n: 3, px: 210 }, 3: { n: 4, px: 210 } },
  i18n: { en: { title: "Color by the Key", instruction: "Look at the number on each picture. Find it in the key and color the picture in that color." } },
});
