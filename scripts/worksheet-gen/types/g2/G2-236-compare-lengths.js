/** G2-236 — How Much Longer? (measurement-tasks factory, mode compare-length) */
'use strict';
const { makeMeasurementType } = require('../_shared/measurement-tasks.js');
module.exports = makeMeasurementType({
  id: 'G2-236', slug: 'comparing-lengths', mode: 'compare-length', gradeBand: 'G23',
  i18n: { en: { title: 'How Much Longer?', instruction: 'Measure both objects. Write how many units longer one is.' } },
});
