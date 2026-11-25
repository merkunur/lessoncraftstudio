/** G1-654 — Being a Good Citizen (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-020). dk-social-1.js mode 's1-citizen'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-654', slug: 'being-a-good-citizen', mode: 's1-citizen', exerciseType: 'feelings',
  difficulty: {"1":{"n":2,"pictures":true},"2":{"n":4},"3":{"n":4,"more":true}},
  i18n: { en: { title: "Being a Good Citizen", instruction: "Read each story. Circle what a good citizen does. Then circle the word that tells how." } },
});
