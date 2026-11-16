/** G3-507 — Cause and Effect in a Story (info-text-g3c factory on the story bank of story-g3.js; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3cType } = require('../_shared/info-text-g3c.js');
const { STORIES } = require('../_shared/story-g3.js');
module.exports = makeInfoText3cType({
  id: 'G3-507', slug: 'cause-and-effect-in-a-story', mode: 'cause', texts: STORIES, story: true,
  levels: { 1: { font: 17, lh: 1.52 } },   // a story is shorter than a fact text: larger print and lines
  i18n: { en: { title: "Cause and Effect in a Story", instruction: "Read the story. In a story, one thing can make another thing happen. Write the missing cause or effect." } },
});
