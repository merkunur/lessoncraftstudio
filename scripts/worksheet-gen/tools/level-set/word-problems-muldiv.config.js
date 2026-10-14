/** Level Set config — Word Problems, multiply / divide stories (G3-370 + G3-371..376), walk #65, 2026-10-14.
 *  PDF + interactive (type the answer) + key. Allow-listed object themes, colour AND black-and-white line art
 *  (themeAxis.levelSetBw — the audit: B&W works, colour carries no answer). Published theme per face from the live
 *  manifests 2026-10-14, skipped at level 2. ⚠ prefix 'wpm' — never reuse it for another type. */
'use strict';
const { THEMES } = require('../../lib/word-problems-levelset.js');
const PUB = { 'G3-370': 'fruits', 'G3-371': 'animals', 'G3-372': 'fruits', 'G3-373': 'toys', 'G3-374': 'fruits', 'G3-375': 'animals', 'G3-376': 'toys' };
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };
module.exports = {
  prefix: 'wpm',
  titleMax: 100,
  faceWideDistinct: false,
  crossFaceShare: true,
  allowFewer: true,
  themeAllow: THEMES,
  note: 'Level Set 2026-10-14: Multiplication and Division Word Problems (G3-370 + 6 variations). Level 1 small numbers (up to 12–20) with big pictures, level 2 the published page, level 3 bigger numbers (up to 30–36), three stories on the sharing and grouping pages, and no pictures on the mixed page (the picture would tell which operation it is). New stories in all 11 languages. Visible to teachers, never indexed; PDF + interactive screen version (type the answer) + answer key.',
  faces: Object.fromEntries(Object.entries(PUB).map(([id, t]) => [id, { published: t, levels: FIVE }])),
  include: () => true,
};
