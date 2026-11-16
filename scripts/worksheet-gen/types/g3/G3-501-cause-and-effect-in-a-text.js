/** G3-501 — Cause and Effect (info-text-g3c factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3cType } = require('../_shared/info-text-g3c.js');
module.exports = makeInfoText3cType({
  id: 'G3-501', slug: 'cause-and-effect-in-a-text', mode: 'cause',
  i18n: { en: { title: "Cause and Effect", instruction: "Read the text. A cause makes something happen. An effect is what happens. Write the missing cause or effect." } },
});
