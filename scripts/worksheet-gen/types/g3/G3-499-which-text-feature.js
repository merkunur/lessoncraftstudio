/** G3-499 — Which Text Feature? (info-text-g3b factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3bType } = require('../_shared/info-text-g3b.js');
module.exports = makeInfoText3bType({
  id: 'G3-499', slug: 'which-text-feature', mode: 'tool',
  i18n: { en: { title: "Which Text Feature?", instruction: "This text is printed as a small book. Read it. Write the letter of the text feature you would use. Then use it and write what you find." } },
});
