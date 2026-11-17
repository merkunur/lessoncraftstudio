/** K-685 — Compare Two Stories (two-stories-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeTwoStoriesKType } = require('../_shared/two-stories-k.js');
module.exports = makeTwoStoriesKType({
  id: 'K-685', slug: 'compare-two-stories', mode: 'sort', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Compare Two Stories", instruction: "Two stories can tell about adventures that are alike and different." } },
});
