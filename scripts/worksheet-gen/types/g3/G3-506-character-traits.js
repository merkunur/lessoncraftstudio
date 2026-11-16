/** G3-506 — Character Traits (story-g3 factory; English literacy year 2026-11-16) */
'use strict';
const { makeStory3Type } = require('../_shared/story-g3.js');
module.exports = makeStory3Type({
  id: 'G3-506', slug: 'character-traits', mode: 'traits',
  i18n: { en: { title: "Character Traits", instruction: "Read the story. Choose a word from the list for each character and write it. Then copy the sentence from the story that shows it." } },
});
