/** Level Set config — Word Problems, add / subtract stories (G1-213 Picture Word Problems + G1-238 / 239 / 240 / 241),
 *  walk #65, 2026-10-14. PDF + interactive (type the answer) + key. Only themes on the allow-list of countable things in
 *  lib/word-problems-levelset.js (every picture opened on contact sheets). The published theme of each face (live
 *  manifests 2026-10-14: G1-213 on fruits AND animals, the four variations on fruits) is skipped at level 2.
 *  ⚠ prefix 'wpa' (wave files waves/wave-wpa-<loc>.json) — never reuse it for another type. */
'use strict';
const { THEMES } = require('../../lib/word-problems-levelset.js');
const PUB = { 'G1-213': ['fruits', 'animals'], 'G1-238': ['fruits'], 'G1-239': ['fruits'], 'G1-240': ['fruits'], 'G1-241': ['fruits'] };
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
module.exports = {
  prefix: 'wpa',
  titleMax: 100,
  faceWideDistinct: false,   // 19 object themes cannot give five faces 15 different themes each; they differ within a level
  crossFaceShare: true,      // the faces are different tasks (add / take away / within 10 / three stories)
  allowFewer: true,
  themeAllow: THEMES,
  note: 'Level Set 2026-10-14: Word Problems (add and subtract stories, G1-213 + 4 variations). Level 1 smaller numbers (within 10; on the within-10 pages the second number is 2 or 3 — counting on), level 2 the published page, level 3 the unknown moves: change unknown (7 + ? = 12, only the start is pictured) and compare (how many more / fewer, two rows of pictures). New stories in all 11 languages. Visible to teachers, never indexed; PDF + interactive screen version (type the answer) + answer key.',
  faces: Object.fromEntries(Object.entries(PUB).map(([id, t]) => [id, { published: t, levels: FIVE }])),
  include: () => true,
};
