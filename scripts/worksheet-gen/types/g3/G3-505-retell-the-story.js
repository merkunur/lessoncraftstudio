/** G3-505 — Retell the Story (info-text-g3c factory on the story bank of story-g3.js; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3cType } = require('../_shared/info-text-g3c.js');
const { STORIES } = require('../_shared/story-g3.js');
module.exports = makeInfoText3cType({
  id: 'G3-505', slug: 'retell-the-story', mode: 'chain', texts: STORIES, story: true,
  levels: { 2: { font: 15.4, lh: 1.4, rowH: 31, lines2: true }, 3: { font: 15.4, lh: 1.4, rowH: 33 } },   // a story is shorter than a fact text: larger print and lines
  i18n: { en: { title: "Retell the Story", instruction: "Read the story. Then retell it: write the four main events in order." } },
});
