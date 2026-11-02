/** K-478 — Color the Scene (Coloring Pages maker, 2026-11-02): several drawings of one theme standing together in one big
 *  frame — upright, never overlapping. types/_shared/coloring-page.js, mode 'scene'. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'K-478', slug: 'color-the-scene', mode: 'scene',
  difficulty: { 1: { n: 3, cols: 2, px: 260 }, 2: { n: 5, cols: 3, px: 190 }, 3: { n: 8, cols: 3, px: 170 } },
  i18n: { en: { title: "Color the Scene", instruction: "Color everything in the picture." } },
});
