/**
 * K-603 — Count and Color the Number (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode count-color). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-603", slug: "count-and-color-the-number", exerciseType: "counting-pictures", gradeBand: "K", mode: "count-color", unit: null,
  i18n: { en: { title: "Count and Color the Number", instruction: "Count the pictures in each row. Color the number that tells how many." } },
});
