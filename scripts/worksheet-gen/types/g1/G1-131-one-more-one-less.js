/** G1-131 — 1 more / 1 less (two-digit). */
'use strict';
const { makeNeighborsType } = require('../_shared/neighbors.js');
module.exports = makeNeighborsType({
  id: 'G1-131', slug: 'one-more-one-less', mode: 'more-less', delta: 1, rangeMax: 99, gradeBand: 'G1',
  i18n: { en: { title: '1 More, 1 Less', instruction: 'Write the number that is 1 less and the number that is 1 more.' } },
});
