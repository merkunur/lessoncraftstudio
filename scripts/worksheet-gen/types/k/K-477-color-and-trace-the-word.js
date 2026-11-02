/** K-477 — Color and Trace the Word (Coloring Pages maker, 2026-11-02): each drawing with its name in dashed school letters
 *  to trace; level 3 also an empty line to write it. Names from image-vocabulary through the reviewed picture-word rules.
 *  types/_shared/coloring-page.js, mode 'trace'. */
'use strict';
const { makeColoringPage } = require('../_shared/coloring-page.js');
module.exports = makeColoringPage({
  id: 'K-477', slug: 'color-and-trace-the-word', mode: 'trace',
  difficulty: {
    1: { n: 1, px: 440, laneH: 90, glyphH: 64, maxLetters: 10 },
    2: { n: 2, px: 220, laneH: 72, glyphH: 50, maxLetters: 10 },
    3: { n: 4, px: 170, laneH: 56, glyphH: 40, maxLetters: 8, write: true },
  },
  i18n: { en: { title: "Color and Trace the Word", instruction: "Color the picture. Trace its name." } },
});
