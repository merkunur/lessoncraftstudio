/** G2-226 — 100 more / 100 less. */
'use strict';
const { makeNeighborsType } = require('../_shared/neighbors.js');
module.exports = makeNeighborsType({
  id: 'G2-226', slug: 'hundred-more-hundred-less', mode: 'more-less', delta: 100, rangeMax: 999, gradeBand: 'G23',
  i18n: { en: { title: '100 More, 100 Less', instruction: 'Write the number that is 100 less and the number that is 100 more.' } },
});
