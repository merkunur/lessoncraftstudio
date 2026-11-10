/**
 * K-625 — My Name Poster (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode name-poster). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-625", slug: "my-name-poster", exerciseType: "all-about-me", gradeBand: "K", mode: "name-poster", unit: null,
  i18n: { en: { title: "My Name Poster", instruction: "Color the letters of your name. Draw yourself in the box." } },
});
