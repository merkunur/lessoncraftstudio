/** G2-407 — draw the lines that cut a shape into equal parts (T2, 1.G.A.3 / 2.G.A.3). Fractions maker, 2026-11-01. See types/_shared/fr-more.js. */
'use strict';
const { makeFrMoreType } = require('../_shared/fr-more.js');

module.exports = makeFrMoreType({
  id: 'G2-407', slug: 'cut-into-equal-parts', mode: 'cut', gradeBand: 'G2',
  i18n: { en: { title: "Cut It into Equal Parts", instruction: "Draw lines to cut each shape into equal parts. The number under the shape tells how many." } },
});
