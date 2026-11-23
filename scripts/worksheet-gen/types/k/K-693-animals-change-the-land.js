/** K-693 — Animals Change the Land (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-013). dk-kinder.js mode 'land'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-693', slug: 'animals-change-the-land', mode: 'land', exerciseType: 'habitats',
  difficulty: {"1":{"pairs":2,"extra":1},"2":{"pairs":4},"3":{"pairs":4,"draw":true}},
  i18n: { en: { title: "Animals Change the Land", instruction: "Look at each place before and after. Draw a line to the animal that made the change." } },
});
