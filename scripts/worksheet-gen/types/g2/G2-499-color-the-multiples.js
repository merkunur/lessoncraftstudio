/**
 * G2-499 — Color the Multiples (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode multiples). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "G2-499", slug: "color-the-multiples", exerciseType: "arrays-multiplication", gradeBand: "G2", mode: "multiples", unit: null,
  i18n: { en: { title: "Color the Multiples", instruction: "Color every number you say when you count by {N}s." } },
});
