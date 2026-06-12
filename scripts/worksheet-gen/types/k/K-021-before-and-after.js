/** K-021 — Number before / number after. */
'use strict';
const { makeNeighborsType } = require('../_shared/neighbors.js');
module.exports = makeNeighborsType({
  id: 'K-021', slug: 'before-and-after', mode: 'before-after', rangeMax: 20,
  i18n: { en: { title: 'Before and After', instruction: 'Write the number that comes before and the one that comes after.' } },
});
