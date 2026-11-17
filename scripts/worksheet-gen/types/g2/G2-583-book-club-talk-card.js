/** G2-583 — Book Club Talk Card (SL.2.1.b; stories-compare-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeStoriesCompareType } = require('../_shared/stories-compare-g2.js');
module.exports = makeStoriesCompareType({
  id: 'G2-583', slug: 'book-club-talk-card', mode: 'card', exerciseType: 'sentence-building',
  i18n: { en: { title: "Book Club Talk Card", instruction: "Plan what to say about our book. After the talk, tell how you built on an idea." } },
});
