/**
 * K-621 — Color and Write the Word (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode word-write). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-621", slug: "color-and-write-the-word", exerciseType: "write-the-word", gradeBand: "K", mode: "word-write", unit: null,
  i18n: { en: { title: "Color and Write the Word", instruction: "Say the word. Color the big letters. Then write the word on the line." } },
});
