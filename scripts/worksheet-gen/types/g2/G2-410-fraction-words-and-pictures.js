/** G2-410 — match fraction words to pictures (T5, 1.G.A.3 / 2.G.A.3). Fractions maker, 2026-11-01. See types/_shared/fr-more.js. */
'use strict';
const { makeFrMoreType } = require('../_shared/fr-more.js');

module.exports = makeFrMoreType({
  id: 'G2-410', slug: 'fraction-words-and-pictures', mode: 'words', gradeBand: 'G2',
  i18n: { en: { title: "Fraction Words and Pictures", instruction: "Read each fraction word. Draw a line to its picture." } },
});
