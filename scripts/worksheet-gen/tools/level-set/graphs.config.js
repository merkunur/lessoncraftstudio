/** Level Set config — Graphs and Data (14 faces), 2026-10-08. PDF + interactive + key. Themes only from the ones whose
 *  pictures were read for look-alikes (data/graph-lookalikes.js); the published themes (the same in all 11 locales, read
 *  from the live manifests 2026-10-08, level 2 only) are never reused in their face. The line plots draw no pictures —
 *  their theme only seeds a different copy. */
'use strict';
const { GRAPH_THEMES } = require('../../lib/picture-distinct.js');
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };   // level-2 copy 1 is the published page
const PUB = {
  'G1-141': ['fruits', 'vehicles'], 'G1-142': ['toys', 'vehicles'], 'G1-143': ['shapes', 'toys'], 'G1-144': ['animals', 'shapes'],
  'G1-146': ['animals', 'fruits'], 'G1-147': ['fruits', 'vehicles'], 'G2-237': ['animals', 'fruits'], 'G2-238': ['fruits', 'vehicles'],
  'G2-239': ['toys', 'vehicles'], 'G2-240': ['shapes', 'toys'], 'G3-332': ['fruits', 'vehicles'], 'G3-333': ['toys', 'vehicles'],
  'G3-334': ['shapes', 'toys'], 'G3-335': ['animals', 'shapes'],
};
module.exports = {
  prefix: 'gds',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  allSkipBwTwins: true,
  themeAllow: GRAPH_THEMES,
  crossFaceShare: true,   // 14 faces × 5 copies per level over 20 read themes: faces share themes (each face is a different task)
  note: 'Level Set 2026-10-08: Graphs and Data. Level 1 three categories up to 5 (fewer marks on a line plot), level 2 the published page, level 3 larger counts (three kinds to sort, five numbers on a line plot). Every page redesigned to use the whole page. Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
  faces: Object.fromEntries(Object.entries(PUB).map(([id, published]) => [id, { published, levels: FIVE }])),
  include: () => true,
};
