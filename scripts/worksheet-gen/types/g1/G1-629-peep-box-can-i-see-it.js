/** G1-629 — Peep Box: Can I See It? (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-036). dk-g1.js mode 'g1-peep-box'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-629', slug: 'peep-box-can-i-see-it', mode: 'g1-peep-box', exerciseType: 'science-sort',
  difficulty: {"1":{},"2":{"draw":true},"3":{"draw":true,"frame":true}},
  i18n: { en: { title: "Peep Box: Can I See It?", instruction: "Look through the hole of each box. Circle “I saw it” or “I did not see it,” and draw what you saw." } },
});
