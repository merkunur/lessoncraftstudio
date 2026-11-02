/** K-476 — Coloring Page (Coloring Pages maker, 2026-11-02; retires the old `coloring` app): one big drawing, two, or four,
 *  in frames — black-and-white line art of the library only. types/_shared/coloring-page.js, mode 'pictures'. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'K-476', slug: 'coloring-page', mode: 'pictures',
  difficulty: { 1: { n: 1, px: 560 }, 2: { n: 2, px: 300 }, 3: { n: 4, px: 280 } },
  i18n: { en: { title: "Coloring Page", instruction: "Color the picture." } },
});
