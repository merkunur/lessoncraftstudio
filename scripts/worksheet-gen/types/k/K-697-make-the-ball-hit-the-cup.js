/** K-697 — Make the Ball Hit the Cup (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-017). dk-kinder.js mode 'ramp'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-697', slug: 'make-the-ball-hit-the-cup', mode: 'ramp', exerciseType: 'science-sort',
  difficulty: {"1":{"change":"circle"},"2":{"change":"draw"},"3":{"tries":2}},
  i18n: { en: { title: "Make the Ball Hit the Cup", instruction: "Draw the ramp you built. Circle if it worked or if you will try again. If you will try again, draw the change you will make." } },
});
