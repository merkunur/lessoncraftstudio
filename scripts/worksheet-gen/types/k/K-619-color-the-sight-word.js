/**
 * K-619 — Color the Sight Word: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode sight-word). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-619", slug: "color-the-sight-word", exerciseType: "sight-words", gradeBand: "K", mode: "sight-word", unit: "sight",
  i18n: { en: { title: "Color the Sight Word: {U}", instruction: "Read the word. Color it every time you find it." } },
});
