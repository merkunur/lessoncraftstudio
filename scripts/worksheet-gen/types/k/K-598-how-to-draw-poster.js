/**
 * K-598 — How to Draw Poster (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode poster). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-598", slug: "how-to-draw-poster", exerciseType: "how-to-draw", gradeBand: "K", mode: "poster", unit: null,
  i18n: { en: { title: "How to Draw Poster", instruction: "Look at the steps in order. Color the name and the finished picture." } },
});
