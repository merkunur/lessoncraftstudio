/** G3-631 — Überschlag und Probe: Kann das stimmen? (Batch E-1, Daily Teaching System Stage E, 2026-11-25; German only, de3-runden-schriftlich). e1-math.js mode 'e1-ueber'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G3-631', slug: 'estimate-and-check-can-that-be-right', mode: 'e1-ueber', exerciseType: 'column-arithmetic', gradeBand: 'G3',
  i18n: { en: { title: "Estimate and Check: Can That Be Right?", instruction: "Make an estimate for each finished calculation and circle: can be right or cannot be right. Do the inverse check for the tasks named below. If a calculation is wrong, write the right result." } },
});
