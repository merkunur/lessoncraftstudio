/** G2-562 — Write a Friendly Letter (L.2.2.b; opinion-letters-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeOpinionLettersType } = require('../_shared/opinion-letters-g2.js');
module.exports = makeOpinionLettersType({
  id: 'G2-562', slug: 'write-a-friendly-letter', mode: 'letter', exerciseType: 'sentence-building',
  i18n: { en: { title: "Write a Friendly Letter", instruction: "A friendly letter has five parts. Put a comma after the greeting and the closing." } },
});
