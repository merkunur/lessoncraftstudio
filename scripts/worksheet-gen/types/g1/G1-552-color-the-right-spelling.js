/**
 * G1-552 — Color the Right Spelling (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode right-spelling). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "G1-552", slug: "color-the-right-spelling", exerciseType: "word-building", gradeBand: "G1", mode: "right-spelling", unit: null,
  i18n: { en: { title: "Color the Right Spelling", instruction: "Look at each picture. Color the word that is spelled the right way." } },
});
