/** K-466 — Make Your Own Pattern (Patterns maker, 2026-11-02): an empty train and pictures to cut out. See types/_shared/patterns-more.js. */
'use strict';
const { makePatternsMoreType } = require('../_shared/patterns-more.js');

module.exports = makePatternsMoreType({
  id: 'K-466', slug: 'make-your-own-pattern', mode: 'train-own', gradeBand: 'K',
  i18n: { en: { title: "Make Your Own Pattern", instruction: "Cut out the pictures. Make your own pattern on the train and glue it in the wagons." } },
});
