/** K-686 — Draw Same and Different (two-stories-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeTwoStoriesKType } = require('../_shared/two-stories-k.js');
module.exports = makeTwoStoriesKType({
  id: 'K-686', slug: 'draw-same-and-different', mode: 'draw', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Draw Same and Different", instruction: "We compare two stories: what is the same and what is different." } },
});
