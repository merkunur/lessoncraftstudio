/** G3-494 — Answer with Evidence (info-text-g3 factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3Type } = require('../_shared/info-text-g3.js');
module.exports = makeInfoText3Type({
  id: 'G3-494', slug: 'answer-with-evidence', mode: 'evidence',
  i18n: { en: { title: "Answer with Evidence", instruction: "Read the text. Write each answer. In the box, write the number of the paragraph that proves your answer." } },
});
