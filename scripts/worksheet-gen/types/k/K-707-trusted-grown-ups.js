/** K-707 — Trusted Grown-Ups (Batch K, Daily Teaching System Stage D-5, 2026-11-23; health en-K-006). dk-kinder.js mode 'trusted'. English only. */
'use strict';
const { makeDkKinderType } = require('../_shared/dk-kinder.js');
module.exports = makeDkKinderType({
  id: 'K-707', slug: 'trusted-grown-ups', mode: 'trusted', exerciseType: 'healthy-habits',
  difficulty: {"1":{"grown":3,"kids":3},"2":{"grown":4,"kids":4,"draw":"adult"},"3":{"grown":4,"kids":4,"draw":"adult+place"}},
  i18n: { en: { title: "Trusted Grown-Ups", instruction: "Circle each grown-up who could help you if you need help. Read the line at the bottom together. Then draw your own trusted grown-up." } },
});
