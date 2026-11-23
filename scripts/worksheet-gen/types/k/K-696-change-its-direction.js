/** K-696 — Change Its Direction (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-016). dk-kinder.js mode 'direction'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-696', slug: 'change-its-direction', mode: 'direction', exerciseType: 'science-sort',
  difficulty: {"1":{"cards":2,"options":true},"2":{"cards":4},"3":{"cards":2,"game":true}},
  i18n: { en: { title: "Change Its Direction", instruction: "We look down at the floor from above. The ball rolls and gets a push. Draw an arrow to show where it goes." } },
});
