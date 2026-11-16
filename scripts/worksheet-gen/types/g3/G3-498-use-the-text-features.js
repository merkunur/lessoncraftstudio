/** G3-498 — Use the Text Features (info-text-g3b factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3bType } = require('../_shared/info-text-g3b.js');
module.exports = makeInfoText3bType({
  id: 'G3-498', slug: 'use-the-text-features', mode: 'find',
  i18n: { en: { title: "Use the Text Features", instruction: "This text is printed as a small book. Read it. Then use the text feature named in each question and write the answer." } },
});
