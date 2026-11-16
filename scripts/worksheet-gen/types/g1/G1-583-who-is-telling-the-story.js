/** G1-583 — Who Is Telling the Story? (story-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeStory1Type } = require('../_shared/story-g1.js');
module.exports = makeStory1Type({
  id: 'G1-583', slug: 'who-is-telling-the-story', mode: 'who',
  i18n: { en: { title: "Who Is Telling the Story?", instruction: "Read the story. Who says or tells each sentence? Write the letter in the box." } },
});
