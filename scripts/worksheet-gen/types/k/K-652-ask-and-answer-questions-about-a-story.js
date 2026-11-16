/** K-652 — Ask and Answer Questions About a Story (story-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeStoryKType } = require('../_shared/story-k.js');
module.exports = makeStoryKType({
  id: 'K-652', slug: 'ask-and-answer-questions-about-a-story', mode: 'ask',
  i18n: { en: { title: "Ask and Answer Questions About a Story", instruction: "Listen to the story and to each question. Circle the picture that answers it. Tell how you know." } },
});
