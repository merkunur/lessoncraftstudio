/** K-022 — Which number comes between? */
'use strict';
const { makeNeighborsType } = require('../_shared/neighbors.js');
module.exports = makeNeighborsType({
  id: 'K-022', slug: 'number-between', mode: 'between', rangeMax: 20,
  i18n: { en: { title: 'Stuck in the Middle', instruction: 'Write the number that comes between.' } },
});
