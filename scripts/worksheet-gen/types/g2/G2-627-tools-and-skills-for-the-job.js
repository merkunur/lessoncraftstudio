/** G2-627 — Tools and Skills for the Job (Batch S2, Daily Teaching System Stage D-5, 2026-11-25; social en-2-054). dk-social-2.js mode 's2-tools'. English only. */
'use strict';
const { makeS2Type } = require('../_shared/dk-social-2.js');
module.exports = makeS2Type({
  id: 'G2-627', slug: 'tools-and-skills-for-the-job', mode: 's2-tools', exerciseType: 'science-sort',
  difficulty: {"1":{"n":1},"2":{"n":3},"3":{"n":3,"frame":true}},
  i18n: { en: { title: "Tools and Skills for the Job", instruction: "Color the box blue for each tool or machine and orange for each skill." } },
});
