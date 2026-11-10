/**
 * K-606 — Color the Greater Number (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode bigger). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-606", slug: "color-the-bigger-number", exerciseType: "comparing-numbers", gradeBand: "K", mode: "bigger", unit: null,
  i18n: { en: { title: "Color the Greater Number", instruction: "Look at the two numbers in each box. Color the greater number." } },
});
