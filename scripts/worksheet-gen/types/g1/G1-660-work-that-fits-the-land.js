/** G1-660 — Work That Fits the Land (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-028). dk-social-1.js mode 's1-landwork'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-660', slug: 'work-that-fits-the-land', mode: 's1-landwork', exerciseType: 'maps',
  difficulty: {"1":{"n":2},"2":{"n":4},"3":{"n":4,"frame":true}},
  i18n: { en: { title: "Work That Fits the Land", instruction: "Draw a line from each worker to the land where the work is done." } },
});
