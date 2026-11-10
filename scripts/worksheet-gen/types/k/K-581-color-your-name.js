/**
 * K-581 — Color Your Name (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode name). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-581", slug: "color-your-name", exerciseType: "coloring-page", gradeBand: "K", mode: "name", unit: null,
  i18n: { en: { title: "Color Your Name", instruction: "Color every letter of your name." } },
});
