/** K-673 — What I Like Best and Why (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-673', slug: 'what-i-like-best-and-why', mode: 'opinion', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "What I Like Best and Why", instruction: "An opinion tells what you like best. A reason tells why." } },
});
