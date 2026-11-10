/**
 * K-616 — Find and Color: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode find-letter). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-616", slug: "find-and-color-the-letter", exerciseType: "letter-knowledge", gradeBand: "K", mode: "find-letter", unit: "letters",
  i18n: { en: { title: "Find and Color: {U}", instruction: "Look at the letter at the top. Find it in the grid and color it every time." } },
});
