/** K-066 — Top / middle / bottom: circle the middle row. */
'use strict';
const { makePositionType } = require('../_shared/position-words.js');

module.exports = makePositionType({
  id: 'K-066', slug: 'top-middle-bottom', mode: 'rows', relation: 'middle',
  i18n: { en: { title: 'Top, Middle, Bottom', instruction: 'Circle every picture in the MIDDLE row.' } },
});
