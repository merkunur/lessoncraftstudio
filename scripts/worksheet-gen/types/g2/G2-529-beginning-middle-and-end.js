/** G2-529 — Beginning, Middle, and End (story-g2 factory; English literacy year 2026-11-16) */
'use strict';
const { makeStory2Type } = require('../_shared/story-g2.js');
module.exports = makeStory2Type({
  id: 'G2-529', slug: 'beginning-middle-and-end', mode: 'retell',
  i18n: { en: { title: "Beginning, Middle, and End", instruction: "Read the story. Then retell it: write what happens at the beginning, in the middle, and at the end." } },
});
