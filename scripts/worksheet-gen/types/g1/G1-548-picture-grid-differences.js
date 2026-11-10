/**
 * G1-548 — Picture Grid: Find the Differences (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode picture-grid). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "G1-548", slug: "picture-grid-differences", exerciseType: "find-the-differences", gradeBand: "G1", mode: "picture-grid", unit: null,
  i18n: { en: { title: "Picture Grid: Find the Differences", instruction: "Look at the top grid. Find the {N} pictures that changed in the bottom grid. Circle them." } },
});
