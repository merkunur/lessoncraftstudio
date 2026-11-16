/** G2-525 — Before and After (info-text-g2b factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText2bType } = require('../_shared/info-text-g2b.js');
module.exports = makeInfoText2bType({
  id: 'G2-525', slug: 'before-and-after-steps-of-a-text', mode: 'beforeafter',
  i18n: { en: { title: "Before and After", instruction: "Read the text. Answer questions 1 and 2 with a whole sentence. Then write before or after." } },
});
