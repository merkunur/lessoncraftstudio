/** K-465 — Pattern Train: Cut and Glue (Patterns maker, 2026-11-02; the old pattern-train app). See types/_shared/patterns-more.js. */
'use strict';
const { makePatternsMoreType } = require('../_shared/patterns-more.js');

module.exports = makePatternsMoreType({
  id: 'K-465', slug: 'pattern-train-cut-and-glue', mode: 'train-cut', gradeBand: 'K',
  i18n: { en: { title: "Pattern Train", instruction: "Look at the pattern on the train. Cut out the pictures at the bottom and glue each one in the right empty wagon." } },
});
