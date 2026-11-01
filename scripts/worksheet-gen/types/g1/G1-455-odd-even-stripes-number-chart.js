/** G1-455 — colour the even (or odd) numbers on the number chart (T1, 2.OA.C.3). Odd & Even maker, 2026-11-01. See types/_shared/odd-more.js. */
'use strict';
const { makeOddMoreType } = require('../_shared/odd-more.js');

module.exports = makeOddMoreType({
  id: 'G1-455', slug: 'odd-even-stripes-number-chart', mode: 'stripes', gradeBand: 'G1',
  i18n: { en: { title: "Even Number Stripes", instruction: "Colour every even number on the chart. What pattern do you see?" } },
});
