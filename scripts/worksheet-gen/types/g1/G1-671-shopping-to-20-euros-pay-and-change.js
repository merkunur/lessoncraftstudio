/** G1-671 — Einkaufen bis 20 Euro: bezahlen und Rückgeld (Batch E-1, Daily Teaching System Stage E, 2026-11-25; German only, new:ausblick-bis-100). e1-math.js mode 'e1-markt'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G1-671', slug: 'shopping-to-20-euros-pay-and-change', mode: 'e1-markt', exerciseType: 'money', gradeBand: 'G1',
  i18n: { en: { title: "Shopping to 20 Euros: Pay and Get Change", instruction: "Add the two prices and write the total. Circle the money in the purse that pays exactly. On the last cards you pay with a note: write how much change you get." } },
});
