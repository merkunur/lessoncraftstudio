/** G1-132 — 10 more / 10 less. */
'use strict';
const { makeNeighborsType } = require('../_shared/neighbors.js');
module.exports = makeNeighborsType({
  id: 'G1-132', slug: 'ten-more-ten-less', mode: 'more-less', delta: 10, rangeMax: 99, gradeBand: 'G1',
  i18n: { en: { title: '10 More, 10 Less', instruction: 'Write the number that is 10 less and the number that is 10 more.' } },
});
