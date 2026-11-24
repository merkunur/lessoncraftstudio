/** K-726 — Our Class Vote (Batch SK, Daily Teaching System Stage D-5, 2026-11-24; social teacher-led D2.Civ.11.K-2). dk-social-k.js mode 'sk-vote'. English only. */
'use strict';
const { makeSkType } = require('../_shared/dk-social-k.js');
module.exports = makeSkType({
  id: 'K-726', slug: 'our-class-vote', mode: 'sk-vote', exerciseType: 'graphing-data',
  difficulty: {"1":{"books":2},"2":{"books":3,"mine":true},"3":{"books":3,"mine":true,"write":true,"newq":true}},
  i18n: { en: { title: "Our Class Vote", instruction: "Vote for one book: circle it. Count the votes with your teacher and color one box for each vote. Did your book win?" } },
});
