/**
 * K-580 — Coloring Numbers: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode number). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-580", slug: "color-the-number", exerciseType: "coloring-page", gradeBand: "K", mode: "number", unit: "numbers",
  i18n: { en: { title: "Coloring Numbers: {U}", instruction: "Color everything on the page. Count the stars." } },
});
