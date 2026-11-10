/**
 * K-618 — Color the First Letter (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode first-letter). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-618", slug: "color-the-first-letter", exerciseType: "beginning-sounds", gradeBand: "K", mode: "first-letter", unit: null,
  i18n: { en: { title: "Color the First Letter", instruction: "Say the name of each picture. Color the letter it starts with." } },
});
