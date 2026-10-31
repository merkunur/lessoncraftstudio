/** K-449 — the 20-bead rack (T2, K.CC.B.5 / 1.OA.C.6 readiness). Ten Frames maker, 2026-10-31. See types/_shared/frame-more.js. */
'use strict';
const { makeFrameMoreType } = require('../_shared/frame-more.js');

module.exports = makeFrameMoreType({
  id: 'K-449', slug: 'rekenrek-how-many-beads', mode: 'rekenrek',
  i18n: { en: { title: "Rekenrek: How Many Beads?", instruction: "How many beads are pushed to the left? Write the number." } },
});
