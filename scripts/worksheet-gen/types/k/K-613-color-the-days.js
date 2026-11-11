/**
 * K-613 — Color the Days (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode month). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-613", slug: "color-the-days", exerciseType: "calendar", gradeBand: "K", mode: "month", unit: "months", levels: [2],
  i18n: { en: { title: "Color the Days", instruction: "Color today’s number every day until the whole month is colored." } },
});
