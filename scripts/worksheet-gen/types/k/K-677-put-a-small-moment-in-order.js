/** K-677 — Put a Small Moment in Order (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-677', slug: 'put-a-small-moment-in-order', mode: 'order', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Put a Small Moment in Order", instruction: "A small moment tells what happened, in order, and how the writer felt." } },
});
