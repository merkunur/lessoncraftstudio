/**
 * K-594 — Which Size Is Different? (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode odd-size). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-594", slug: "odd-size-in-the-row", exerciseType: "find-the-differences", gradeBand: "K", mode: "odd-size", unit: null,
  i18n: { en: { title: "Which Size Is Different?", instruction: "In each row one picture has a different size. Circle it." } },
});
