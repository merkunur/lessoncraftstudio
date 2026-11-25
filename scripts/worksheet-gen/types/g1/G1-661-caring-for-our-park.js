/** G1-661 — Caring for Our Park (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-029). dk-social-1.js mode 's1-park'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-661', slug: 'caring-for-our-park', mode: 's1-park', exerciseType: 'recycling',
  difficulty: {"1":{"pics":2,"changes":3},"2":{"pics":3,"changes":5},"3":{"pics":3,"changes":5,"frame":true}},
  i18n: { en: { title: "Caring for Our Park", instruction: "Circle the 5 things people changed in picture 2. In picture 3, circle every person who helps." } },
});
