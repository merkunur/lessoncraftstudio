/** G2-517 — Same Length, Two Units (measure-units factory, mode two-units; Year pages X, 2026-11-14) */
'use strict';
const { makeMeasureUnitsType } = require('../_shared/measure-units.js');
module.exports = makeMeasureUnitsType({
  id: 'G2-517', slug: 'same-length-two-units', mode: 'two-units', gradeBand: 'G2',
  i18n: { en: { title: "Same Length, Two Units", instruction: "Each ribbon was measured twice, with two different units. Write how many of each unit it took. Then fill in the circle for the unit it took more of." } },
});
