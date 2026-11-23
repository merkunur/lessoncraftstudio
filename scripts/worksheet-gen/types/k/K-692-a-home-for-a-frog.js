/** K-692 — A Home for a Frog (Batch K, Daily Teaching System Stage D-5, 2026-11-23; science en-K-012). dk-kinder.js mode 'frog-home'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-692', slug: 'a-home-for-a-frog', mode: 'frog-home', exerciseType: 'habitats',
  difficulty: {"1":{"cut":3},"2":{"cut":8,"misfit":2},"3":{"cut":0}},
  i18n: { en: { title: "A Home for a Frog", instruction: "Cut out the pictures. Glue in only what a frog needs. Then draw the frog." } },
});
