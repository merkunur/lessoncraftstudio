/**
 * K-582 — Color and Count (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode color-count). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-582", slug: "color-and-count", exerciseType: "coloring-page", gradeBand: "K", mode: "color-count", unit: null,
  i18n: { en: { title: "Color and Count", instruction: "Color the pictures. Count each kind and write how many." } },
});
