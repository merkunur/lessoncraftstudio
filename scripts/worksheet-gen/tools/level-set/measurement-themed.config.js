/** Level Set config — Measurement, the THEMED faces, 2026-10-09. PDF + interactive + key. A face's live themes (the
 *  same in all 11 locales — level 2 and the June level-1 / level-3 pages, read from the live list 2026-10-09) are never
 *  reused in that face. A face builds only themes it can honestly draw: the length faces need pictures flat enough to
 *  lie along a row of squares (themes whose pictures are people, feelings, colours or weather are refused), Heavy or
 *  Light? needs real-world mass ranks (lib/mass-rank.js), the balance faces need light objects with real weights
 *  (data/light-objects.js). How Much Longer? has two real levels only (2026-09-27): no level-3 copies. */
'use strict';
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
const LIVE = {
  'K-038': ['animals', 'fruits'], 'G1-139': ['animals', 'shapes', 'fruits', 'vehicles'], 'G1-140': ['fruits', 'vehicles', 'toys'],
  'G2-235': ['shapes', 'toys', 'animals'], 'G2-236': ['shapes', 'vehicles', 'toys'], 'G2-252': ['animals', 'vehicles'],
  'G2-261': ['vehicles'], 'G2-262': ['vehicles'],
};
module.exports = {
  prefix: 'msrs',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  crossFaceShare: true,   // 8 different tasks; the balance faces share 7 light-object themes, Heavy or Light? its 7 ranked themes
  themeDeny: ['body parts', 'body parts bw', 'emotions', 'emotions bw', 'colors', 'colors bw', 'occupations', 'occupations bw', 'activities', 'activities bw', 'weather', 'weather bw', 'miscellaneous', 'miscellaneous bw'],
  note: 'Level Set 2026-10-09: Measurement (lengths in squares and on a ruler, heavier or lighter, measuring jugs and balance scales). Level 1 easier (short lengths, far-apart weights, fewer weights), level 2 the published page, level 3 harder (longer lengths, close weights, more weights, finer marks). Every page redesigned so the drawings fill their cards; a balance holds only a light object with a real weight. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(Object.entries(LIVE).map(([id, published]) => [id, { published, levels: id === 'G2-236' ? { 1: FIVE[1], 2: FIVE[2] } : FIVE }])),
  include: () => true,
};
