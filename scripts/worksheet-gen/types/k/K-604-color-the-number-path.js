/**
 * K-604 — Color the Number Path (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode numpath). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-604", slug: "color-the-number-path", exerciseType: "number-charts", gradeBand: "K", mode: "numpath", unit: null,
  i18n: { en: { title: "Color the Number Path", instruction: "Find 1. Color the numbers in order up to {N}, one next to the other, to make a path." } },
});
