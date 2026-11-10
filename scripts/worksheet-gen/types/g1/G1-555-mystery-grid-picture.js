/**
 * G1-555 — Mystery Grid Picture (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode pixel). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "G1-555", slug: "mystery-grid-picture", exerciseType: "color-by-number", gradeBand: "G1", mode: "pixel", unit: null,
  i18n: { en: { title: "Mystery Grid Picture", instruction: "Color each box with the color of its number. What picture appears?" } },
});
