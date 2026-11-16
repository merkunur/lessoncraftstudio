/** G3-500 — Events in Order (info-text-g3c factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3cType } = require('../_shared/info-text-g3c.js');
module.exports = makeInfoText3cType({
  id: 'G3-500', slug: 'events-in-order', mode: 'chain',
  i18n: { en: { title: "Events in Order", instruction: "Read the text. Then write the four events or steps in order." } },
});
