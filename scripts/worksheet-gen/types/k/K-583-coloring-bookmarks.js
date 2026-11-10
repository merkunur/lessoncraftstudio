/**
 * K-583 — Coloring Bookmarks (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode bookmarks). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-583", slug: "coloring-bookmarks", exerciseType: "coloring-page", gradeBand: "K", mode: "bookmarks", unit: null,
  i18n: { en: { title: "Coloring Bookmarks", instruction: "Color the bookmarks. Cut them out along the dashed lines." } },
});
