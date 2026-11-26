/** G2-631 — Betala med sedlar och få växel tillbaka (Batch E-1, Daily Teaching System Stage E, 2026-11-25; Swedish only, new:pengar-raknehandelser-0-100). e1-math.js mode 'e1-vaxel'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G2-631', slug: 'pay-with-bills-and-get-change', mode: 'e1-vaxel', exerciseType: 'money', gradeBand: 'G2',
  i18n: { en: { title: "Pay with Bills and Get Change", instruction: "The customer pays with a bill. Count up from the price to the bill on the number line. Draw the change and write how many kronor the customer gets back." } },
});
