/** Level Set config — Hundreds Chart Puzzles (G1-310 + its five faces), 2026-10-08. PDF + interactive + key.
 *  Themeless: a copy = a seed on the locale's exemplar chart (noUnits — a level may name its own chart: the G2 faces'
 *  level 3 runs on 101-200); a copy shares at most half of the numbers it asks with another copy of its level.
 *  Level 2 copy 1 is the published page. */
'use strict';
const FACES = ['G1-310', 'G1-347', 'G1-348', 'G2-321', 'G2-322', 'G2-323'];
module.exports = {
  prefix: 'hcp',
  themeless: true,
  noUnits: true,
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-10-08: Hundreds Chart Puzzles. Level 1 one step from a printed number (fewer pieces, more printed guides, two arrows, close errors), level 2 the published page, level 3 harder pieces and errors, four arrows, the 101-200 chart. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(FACES.map((id) => [id, { levels: [2, 1, 3] }])),
  include: () => true,
};
