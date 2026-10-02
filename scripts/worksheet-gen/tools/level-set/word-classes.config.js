/** Level Set config — Word Classes (G2-275 + G2-285 / G2-286 / G2-287 / G1-293 / G1-300), 2026-10-02. PDF + interactive + key. */
'use strict';
const { PUBLISHED } = require('./word-classes-published.js');
const ALL = [1, 2, 3, 4, 5];
const CORE = [2, 3, 4, 5, 6];   // level-2 copy 1 is the published page
const face = (id) => ({
  published: PUBLISHED.en[id],
  publishedByLoc: Object.fromEntries(Object.entries(PUBLISHED).map(([l, f]) => [l, f[id]])),
  levels: { 1: ALL, 2: CORE, 3: ALL },
});
module.exports = {
  prefix: 'wcl',
  titleMax: 100,               // these pages are noindex; long localized face titles + theme + set number
  crossFaceShare: true,        // the faces are different sorts (3 bins / 2 bins, with / without pictures, 9 / 12 / 15 words)
  faceWideDistinct: false,     // themes differ within a LEVEL
  allowFewer: true,            // a thin theme pool gives fewer copies, never a filler
  note: 'Level Set 2026-10-02: Word Classes (G2-275 + 5 faces). Every copy is a new picture theme (new nouns). Levels change the task while keeping each title true: three bins 9 words with pictures / 12 / 15 without pictures; nine words with a worked example in each bin / nine / nine harder words; twelve and fifteen words with easy words / mixed / harder words (never pictures); nouns-verbs and nouns-adjectives 6 words with pictures / 10 / 12 words. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(['G2-275', 'G2-285', 'G2-286', 'G2-287', 'G1-293', 'G1-300'].map((id) => [id, face(id)])),
  include: () => true,
};
