/** G3-502 — Show Where the Story Says It (info-text-g3 factory on the story bank of story-g3.js; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3Type } = require('../_shared/info-text-g3.js');
const { STORIES } = require('../_shared/story-g3.js');
module.exports = makeInfoText3Type({
  id: 'G3-502', slug: 'show-where-the-story-says-it', mode: 'evidence', texts: STORIES, story: true,
  i18n: { en: { title: "Show Where the Story Says It", instruction: "Read the story. Write each answer. In the box, write the number of the paragraph that proves your answer." } },
});
