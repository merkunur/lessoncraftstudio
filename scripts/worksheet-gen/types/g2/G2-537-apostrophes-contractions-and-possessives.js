/** G2-537 — Apostrophes (L.2.2.c; word-building-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeWordBuildingType } = require('../_shared/word-building-g2.js');
module.exports = makeWordBuildingType({
  id: 'G2-537', slug: 'apostrophes-contractions-and-possessives', mode: 'apostrophe', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Apostrophes", instruction: "An apostrophe takes the place of the letters that are left out, or it shows who owns something." } },
});
