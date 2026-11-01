/** G3-407 — the multiplication square to fill (T1, 3.OA.C.7 / 3.OA.B.5). Multiplication & Division maker, 2026-11-01. See types/_shared/md-more.js. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');

module.exports = makeMdMoreType({
  id: 'G3-407', slug: 'multiplication-square-to-fill', mode: 'square', gradeBand: 'G3',
  i18n: { en: { title: "Fill the Multiplication Square", instruction: "Multiply the number at the start of the row by the number at the top of the column. Write the product in each empty box." } },
});
