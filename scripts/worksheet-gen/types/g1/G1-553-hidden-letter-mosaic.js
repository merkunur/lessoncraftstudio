/**
 * G1-553 — Hidden Letter Mosaic (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode mosaic). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "G1-553", slug: "hidden-letter-mosaic", exerciseType: "color-by-number", gradeBand: "G1", mode: "mosaic", unit: "letters",
  i18n: { en: { title: "Hidden Letter Mosaic", instruction: "Color every box with an odd number. Which letter do you see? Write it in the answer box." } },
});
