/**
 * K-620 — Color the Syllables (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode syllables). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-620", slug: "color-the-syllables", exerciseType: "syllable-split", gradeBand: "K", mode: "syllables", unit: null,
  i18n: { en: { title: "Color the Syllables", instruction: "Say each word and clap its parts. Color each part a different color." } },
});
