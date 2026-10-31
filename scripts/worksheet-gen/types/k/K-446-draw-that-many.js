/** K-446 — Draw That Many (Counting maker, 2026-10-31). T5: read a numeral, draw that many (K.CC.B.5). See types/_shared/counting-more.js. */
'use strict';
const { makeCountingMoreType } = require('../_shared/counting-more.js');

module.exports = makeCountingMoreType({
  id: 'K-446', slug: 'draw-that-many', mode: 'draw-set',
  i18n: { en: { title: "Draw That Many", instruction: "Read the number. Draw that many in the box." } },
});
