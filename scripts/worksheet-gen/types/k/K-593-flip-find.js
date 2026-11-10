/**
 * K-593 — Which One Faces the Other Way? (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode flip). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-593", slug: "flip-find", exerciseType: "find-the-differences", gradeBand: "K", mode: "flip", unit: null,
  i18n: { en: { title: "Which One Faces the Other Way?", instruction: "In each row one picture faces the other way. Circle it." } },
});
