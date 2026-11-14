/** G1-574 — No Gaps, No Overlaps (measure-units factory, mode laid-right; Year pages X, 2026-11-14) */
'use strict';
const { makeMeasureUnitsType } = require('../_shared/measure-units.js');
module.exports = makeMeasureUnitsType({
  id: 'G1-574', slug: 'no-gaps-no-overlaps', mode: 'laid-right', gradeBand: 'G1',
  i18n: { en: { title: "No Gaps, No Overlaps", instruction: "Paper clips measure a ribbon when they lie end to end, from one end of the ribbon to the other. Mark each row right or wrong. Circle every mistake you find." } },
});
