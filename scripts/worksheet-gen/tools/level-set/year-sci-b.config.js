/** Level Set config — Year pages, science and health B (Daily Teaching System, Stage D-2), 2026-11-23.
 *  Themed faces (a copy = a theme): the thinking-skills types. The two published themes of each face are skipped
 *  per language (year-sci-b-published.json, read from the live manifests).
 *  Verdicts: one US K-3 reviewer over the three levels of each type (lcs-stage-d/D2-REVIEW.tsv) after the D-2 fix round
 *  (D2-FIX-RESULT.tsv): "three" = easy, core and hard differ; "core-only" = the levels are one task, so only more core
 *  copies; "L1+L2" = the hard level is the core task again. Visible to teachers, never indexed. */
'use strict';
const PUB = require('./year-sci-b-published.json');
const FIVE = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };
const CORE = { 2: [2, 3, 4, 5, 6] };
const FACES = {"K-039":"FIVE","K-044":"FIVE","K-057":"FIVE","K-069":"FIVE","K-068":"CORE","G1-157":"CORE","G1-158":"FIVE","G3-353":"FIVE","G3-351":"CORE","G3-348":"FIVE"};
const byLoc = (id) => Object.fromEntries(Object.entries(PUB).map(([l, v]) => [l, v[id] || []]));
module.exports = {
  prefix: 'ysb',
  titleMax: 100,
  faceWideDistinct: false,
  allowFewer: true,
  note: 'Level Set 2026-11-23: Year pages, science and health B (Stage D-2). The thinking-skills types of the English units, five themes a level where the levels differ.',
  faces: Object.fromEntries(Object.entries(FACES).map(([id, k]) => [id, { publishedByLoc: byLoc(id), levels: k === 'FIVE' ? FIVE : CORE }])),
  include: () => true,
};
