/** K-675 — Facts and Labels (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-675', slug: 'facts-and-labels', mode: 'facts', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Facts and Labels", instruction: "Facts tell true things about one topic. A label names a part." } },
});
