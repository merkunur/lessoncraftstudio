/** G1-669 — Our Class Meeting (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social teacher-led D2.Civ.9.K-2). dk-social-1.js mode 's1-meeting'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-669', slug: 'our-class-meeting', mode: 's1-meeting', exerciseType: 'feelings',
  difficulty: {"1":{"draw":true},"2":{"frame":true},"3":{"frame":true,"decided":true}},
  i18n: { en: { title: "Our Class Meeting", instruction: "At our class meeting, check each rule you followed. Write what you heard and what you think. Then circle a job you would like and how often jobs change." } },
});
