/** Level Set config — Syllable Division (G1-305 + G1-325 / 326 / 327 / 328 / 329), 2026-10-01. PDF + interactive + key. */
'use strict';
const { PUBLISHED } = require('./syllable-split-published.js');
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
const face = (id) => ({
  published: PUBLISHED.de[id] || PUBLISHED.en[id],
  publishedByLoc: Object.fromEntries(Object.entries(PUBLISHED).filter(([, f]) => f[id]).map(([l, f]) => [l, f[id]])),
  levels: { 1: ALL, 2: CORE, 3: ALL },
});
module.exports = {
  prefix: 'syl',
  titleMax: 95,                // these pages are noindex; long localized face titles + theme + set number
  crossFaceShare: true,        // the faces are different tasks (scoops / dashes / missing / scramble / sort / kings)
  faceWideDistinct: false,     // themes differ within a LEVEL; da holds only ~9 buildable themes
  allowFewer: true,            // the TeX-agreed pool is thin in some locales (en / fr / da): fewer copies, never a filler
  note: 'Level Set 2026-10-01: Syllable Division (G1-305 + 5 faces). Easier = fewer, two-syllable, shorter words; harder = more and longer words (up to four syllables). Each copy a different picture theme. Screen version: tap the number of syllables, the word written with the right dashes, the missing syllable, the syllables in order, the right column or the vowel; answer key: every answer filled in. Visible to teachers, never indexed; PDF + screen version + answer key.',
  faces: Object.fromEntries(['G1-305', 'G1-325', 'G1-326', 'G1-327', 'G1-328', 'G1-329'].map((id) => [id, face(id)])),
  // a locale ships the faces it publishes (en: no Syllable Scramble, no Vowel King; fr: no Vowel King)
  include: (loc, id) => !!(PUBLISHED[loc] && PUBLISHED[loc][id]),
};
