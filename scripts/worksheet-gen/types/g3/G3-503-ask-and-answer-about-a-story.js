/** G3-503 — Ask and Answer About a Story (info-text-g3 factory on the story bank of story-g3.js; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3Type } = require('../_shared/info-text-g3.js');
const { STORIES } = require('../_shared/story-g3.js');
module.exports = makeInfoText3Type({
  id: 'G3-503', slug: 'ask-and-answer-about-a-story', mode: 'ask', texts: STORIES, story: true,
  levels: { 1: { font: 15.4, lh: 1.4, quote: 14.5, opt: 14 } },   // a story is shorter than a fact text: larger print and lines
  i18n: { en: { title: "Ask and Answer About a Story", instruction: "Read the story. Each sentence in a box is from the story. Write the question that the sentence answers. The first word is given." } },
});
