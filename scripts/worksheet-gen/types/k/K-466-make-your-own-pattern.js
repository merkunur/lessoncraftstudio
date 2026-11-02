/** K-466 — Make Your Own Pattern (Patterns maker, 2026-11-02): an empty train and pictures to cut out. See types/_shared/patterns-more.js. */
'use strict';
const { makePatternsMoreType } = require('../_shared/patterns-more.js');

module.exports = makePatternsMoreType({
  id: 'K-466', slug: 'make-your-own-pattern', mode: 'train-own', gradeBand: 'K',
  i18n: { en: { title: "Make Your Own Pattern", instruction: "Cut out the pictures. Lay them on the train to make your own pattern that repeats. Then glue one picture in each train car." } },
});
