/** K-687 — What My Body Needs (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-003). dk-kinder.js mode 'needs'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-687', slug: 'what-my-body-needs', mode: 'needs', exerciseType: 'science-sort',
  difficulty: {"1":{"needs":3,"wants":3,"words":true},"2":{"needs":4,"wants":4,"words":true},"3":{"needs":4,"wants":4,"draw":true,"words":true}},
  i18n: { en: { title: "What My Body Needs", instruction: "Circle each thing your body needs to live. Cross out each thing that is just nice to have." } },
});
