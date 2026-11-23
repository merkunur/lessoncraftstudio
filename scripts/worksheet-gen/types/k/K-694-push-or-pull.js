/** K-694 — Push or Pull? (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-014). dk-kinder.js mode 'pushpull'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-694', slug: 'push-or-pull', mode: 'pushpull', exerciseType: 'science-sort',
  difficulty: {"1":{"cards":4},"2":{"cards":8},"3":{"cards":6,"draw":true}},
  i18n: { en: { title: "Push or Pull?", instruction: "Look at each picture. Draw a line to push or to pull." } },
});
