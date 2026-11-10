/**
 * K-596 — Roll and Draw a Robot (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode roll). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-596", slug: "roll-and-draw-a-robot", exerciseType: "how-to-draw", gradeBand: "K", mode: "roll", unit: null, kind: "robot",
  i18n: { en: { title: "Roll and Draw a Robot", instruction: "Roll a die for each row. Draw the part under your number in the empty box." } },
});
