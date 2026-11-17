/** G2-582 — Book Club Talk: Build on What Others Say (SL.2.1.b; stories-compare-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeStoriesCompareType } = require('../_shared/stories-compare-g2.js');
module.exports = makeStoriesCompareType({
  id: 'G2-582', slug: 'book-club-talk-build-on-what-others-say', mode: 'build', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Book Club Talk: Build on What Others Say", instruction: "To build on a comment, agree, add to it, or see it another way." } },
});
