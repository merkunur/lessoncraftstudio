/**
 * K-608 — Color the Pair (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode bonds). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-608", slug: "color-the-pair", exerciseType: "number-bonds", gradeBand: "K", mode: "bonds", unit: null,
  i18n: { en: { title: "Color the Pair", instruction: "Color the two numbers in each row that make {N} together." } },
});
