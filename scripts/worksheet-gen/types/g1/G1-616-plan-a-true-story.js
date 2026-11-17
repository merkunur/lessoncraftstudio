/** G1-616 — Plan a True Story (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-616', slug: 'plan-a-true-story', mode: 'storyplan', exerciseType: 'story-sequencing',
  i18n: { en: { title: "Plan a True Story", instruction: "Time words like first, next, and last tell the order of a story." } },
});
