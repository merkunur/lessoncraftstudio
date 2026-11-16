/** G2-522 — Steps in Order (info-text-g2b factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText2bType } = require('../_shared/info-text-g2b.js');
module.exports = makeInfoText2bType({
  id: 'G2-522', slug: 'steps-in-order-how-it-is-made', mode: 'steps',
  i18n: { en: { title: "Steps in Order", instruction: "Read the text. Write the four steps in order. The first word of each step is given." } },
});
