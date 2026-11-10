/**
 * K-624 — Alphabet Coloring Cards (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode letter-cards). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-624", slug: "alphabet-coloring-cards", exerciseType: "picture-word-cards", gradeBand: "K", mode: "letter-cards", unit: null,
  i18n: { en: { title: "Alphabet Coloring Cards", instruction: "Color each card. Then cut out the cards along the dashed lines." } },
});
