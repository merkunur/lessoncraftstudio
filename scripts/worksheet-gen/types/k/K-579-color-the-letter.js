/**
 * K-579 — Coloring Alphabet: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode letter). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-579", slug: "color-the-letter", exerciseType: "coloring-page", gradeBand: "K", mode: "letter", unit: "letters",
  i18n: { en: { title: "Coloring Alphabet: {U}", instruction: "Color the page. Make it as bright and beautiful as you can." } },
});
