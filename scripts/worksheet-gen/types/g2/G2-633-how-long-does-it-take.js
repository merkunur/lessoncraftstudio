/** G2-633 — Hur lång tid tar det? (Batch E-1, Daily Teaching System Stage E, 2026-11-25; Swedish only, new:klockan-almanackan-ak2). e1-math.js mode 'e1-tid'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G2-633', slug: 'how-long-does-it-take', mode: 'e1-tid', exerciseType: 'telling-time', gradeBand: 'G2',
  i18n: { en: { title: "How Long Does It Take?", instruction: "Look at the start clock and the end clock. Write how many hours and minutes it takes. Then circle the unit that fits best: seconds, minutes or hours." } },
});
