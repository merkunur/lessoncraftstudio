/** K-038 — Heavy or Light? (measurement-tasks factory, mode heavier) */
'use strict';
const { makeMeasurementType } = require('../_shared/measurement-tasks.js');
module.exports = makeMeasurementType({
  id: 'K-038', slug: 'heavy-and-light', mode: 'heavier', gradeBand: 'K',
  i18n: { en: { title: 'Heavy or Light?', instruction: 'Think about real life! Circle the HEAVIER one.' } },
});
