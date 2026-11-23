/** G1-641 — Seedlings and Their Parent (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-055). dk-g1.js mode 'g1-seedlings'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-641', slug: 'seedlings-and-their-parent', mode: 'g1-seedlings', exerciseType: 'plants',
  difficulty: {"1":{"seedlings":1},"2":{"seedlings":3},"3":{"seedlings":3,"frame":true}},
  i18n: { en: { title: "Seedlings and Their Parent", instruction: "Draw each seedling and count its leaves. Circle “same” or “different” for each part." } },
});
