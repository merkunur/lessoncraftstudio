/**
 * K-615 — Letters or Numbers? (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode sort-ln). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-615", slug: "color-the-letters", exerciseType: "sorting-categories", gradeBand: "K", mode: "sort-ln", unit: null,
  i18n: { en: { title: "Letters or Numbers?", instruction: "Color all the letters. Leave the numbers white." } },
});
