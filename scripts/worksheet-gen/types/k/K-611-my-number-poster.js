/**
 * K-611 — My Number Poster: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode poster). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-611", slug: "my-number-poster", exerciseType: "number-of-the-day", gradeBand: "K", mode: "poster", unit: "numbers", unitMax: 10,
  i18n: { en: { title: "My Number Poster: {U}", instruction: "Color the number and the number word. Then color that many squares in the frame." } },
});
