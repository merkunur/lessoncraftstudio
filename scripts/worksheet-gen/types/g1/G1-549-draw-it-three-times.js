/**
 * G1-549 — Draw It Three Times (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode three-times). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "G1-549", slug: "draw-it-three-times", exerciseType: "how-to-draw", gradeBand: "G1", mode: "three-times", unit: null,
  i18n: { en: { title: "Draw It Three Times", instruction: "Follow the steps. Draw the picture big, then smaller, then very small." } },
});
