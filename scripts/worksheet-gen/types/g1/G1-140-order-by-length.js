/** G1-140 — Short to Long (measurement-tasks factory, mode order-units) */
'use strict';
const { makeMeasurementType } = require('../_shared/measurement-tasks.js');
module.exports = makeMeasurementType({
  id: 'G1-140', slug: 'measuring-length-order', mode: 'order-units', 
  i18n: { en: { title: 'Short to Long', instruction: 'Measure each object with its squares. Number them 1 (shortest) to 3 (longest).' } },
});
