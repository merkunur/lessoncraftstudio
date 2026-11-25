#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-25): the four Thinking Skills units of English (plan decision 4: one unit per grade K-3, for
 * morning work and centers; design scripts/units/year/thinking-units.en.json, 2026-11-23), each lesson on its teaching
 * point and its live pages:
 *   K   Look Closely and Think (the design's "Look Closely, Think It Through", shortened so its search title fits):
 *       6 lessons · Grade 1 Detective Thinking: 6 · Grade 2 Clues and Reasons: 4 · Grade 3 Logic Lab: 4.
 * No year plan: a thinking unit is used beside the plans, at any time of year, and is not counted in the coverage
 * weeks (decision 4). The Grade 2 unit carries two Grade 1 points up one level (lesson ids "1:mazes#shortest-way" with
 * the town maze, and "1:logic-picture-clues#harder-level" with the picture-clue puzzles at Level 3, avoiding the four
 * pages the Grade 1 lesson hands out). Search titles from the US harvest of 2026-11-25
 * (docs/SEO/daily-system-demand/thinking-skills.en.json: "critical thinking activities/worksheets for kindergarten",
 * "logic puzzles for 1st/2nd/3rd grade").
 * Two lessons name no activity (activity: null): the activities linked to their points are one-category sorts of
 * Kindergarten and Grade 1 (ziggy-odd-one-out L.1.5.a, mims-baskets L.K.5.a), below a logic grid or a two-circle sort.
 * Review of 2026-11-25 (one US K-3 teacher, lcs-stage-d/thinking/REVIEW.md): the Grade 2 writing lesson PREPARES L.2.1.f
 * (one sentence after a printed starter; the registry row stays "teaches"); two easier sudoku pages whose pictures look
 * alike (yellow emoji faces, six small people in red and white) are harder than their core page and are not handed out.
 * Every lesson has its pages and its routine (`routine` in its teacher note, scripts/units/notes/en-thinking-k3.js).
 *
 *   node scripts/units/year/place-ready-t.en.thinking.js      (refuses to run twice; it checks everything before it writes)
 * Then: notes/apply.js · assemble --loc=en · apply-pacing-to-defs · build-guide / build-looks · assessments/build-checks
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const L = (point, types, extra) => Object.assign({ point, types }, extra || {});
const U = (id, slug, grade, title, metaTitle, desc, lessons) => ({ id, slug, status: 'pilot', grade, subject: 'thinking', title, metaTitle, metaDescription: desc, lessons });
// the four pages the Grade 1 picture-clue lesson hands out (core, easy, hard, exit): the Grade 2 lesson on the same point takes others
const G1_349_TAKEN = ['logic-puzzles-vehicles-g1349', 'logic-puzzles-easy-farm-animals-g1349', 'logic-puzzles-hard-zoo-animals-g1349', 'logic-puzzles-farm-animals-g1349-2'];
const UNITS = [
  U('k-look-closely-and-think', 'look-closely-and-think-kindergarten-critical-thinking-unit', 'K', 'Look Closely and Think',
    'Kindergarten Critical Thinking Lesson Plans: Visual Skills and Mazes',
    'A Kindergarten critical thinking unit: 6 lessons on same and different, spot the difference, shadow matching, visual closure, mazes, grid copying and picture grids.',
    [L('K:same-different-visual', ['K-039', 'K-058']), L('K:spot-the-difference', ['K-397', 'K-399']), L('K:shadow-closure', ['K-057', 'K-069']),
      L('K:mazes', ['K-405']), L('K:grid-copy', ['K-286']), L('K:matrix-logic', ['K-068'])]),
  U('g1-detective-thinking', 'detective-thinking-grade-1-logic-puzzles-unit', '1', 'Detective Thinking',
    'Grade 1 Critical Thinking Lesson Plans: Logic Puzzles and Mazes',
    'A Grade 1 critical thinking unit: 6 lessons on counting differences, planning a maze route, drawing with a grid, picture analogies, 4 by 4 sudoku and logic puzzles.',
    [L('1:find-the-differences', ['G1-413', 'G1-415']), L('1:mazes', ['G1-420', 'G1-423', 'G1-425']), L('1:grid-copy', ['G1-416'], { titles: { 'G1-416': 'Draw a Picture with the Grid' } }),
      L('1:picture-analogies', ['G1-157']), L('1:picture-sudoku', ['G1-158'], { avoid: ['visual-logic-easy-emotions-g1158'] }), L('1:logic-picture-clues', ['G1-349'])]),
  U('g2-clues-and-reasons', 'clues-and-reasons-grade-2-logic-puzzles-unit', '2', 'Clues and Reasons',
    'Grade 2 Critical Thinking Lesson Plans: Logic Puzzles and Clues',
    'A Grade 2 critical thinking unit: 4 lessons on finding and writing about differences, the shortest way through a town maze, and logic puzzles with three clues.',
    [L('2:find-differences', ['G2-388', 'G2-389'], { standards: ['L.2.1.f', 'W.2.2'], standardsRel: { 'L.2.1.f': 'prepares' } }), L('1:mazes', ['G1-422'], { id: '1:mazes#shortest-way', core: { 'G1-422': 3 } }),
      L('1:logic-picture-clues', ['G1-349'], { id: '1:logic-picture-clues#harder-level', core: { 'G1-349': 3 }, avoid: G1_349_TAKEN }),
      L('2:logic-grid', ['G2-319', 'G2-344', 'G2-345'], { activity: null })]),
  U('g3-logic-lab', 'logic-lab-grade-3-logic-puzzles-unit', '3', 'Logic Lab',
    'Grade 3 Critical Thinking Lesson Plans: Logic Grids and Sudoku',
    'A Grade 3 critical thinking unit: 4 lessons on Venn diagram sorts, picture grids with two rules, 6 by 6 picture sudoku, and logic grids with six clues.',
    [L('3:two-attribute-sort', ['G3-353'], { activity: null }), L('3:two-attribute-sort~logic-cabinet', ['G3-351']), L('3:latin-square-sudoku', ['G3-348'], { avoid: ['visual-logic-easy-occupations-g3348'] }), L('3:logic-grids', ['G3-378', 'G3-379'])]),
];

// ---- everything is read and checked first
const pts = new Map(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => [p.id, p]));
const notes = require(file('scripts/units/notes/en-thinking-k3.js')).points;
const assets = JSON.parse(read('frontend/content/teaching-graph/assets/en.json')).types;
for (const u of UNITS) {
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error(u.id + ': description of ' + u.metaDescription.length + ' characters');
  if (u.metaTitle.length > 70) throw new Error(u.id + ': title of ' + u.metaTitle.length + ' characters');
  for (const l of u.lessons) {
    const p = pts.get(l.point);
    if (!p) throw new Error(u.id + ': no teaching point ' + l.point);
    if (p.subject !== 'thinking') throw new Error(u.id + ': ' + l.point + ' is ' + p.subject + ', not thinking');
    const key = l.id || l.point;
    if (!notes[key]) throw new Error(u.id + ': no teacher note of ' + key);
    if (!notes[key].routine || notes[key].routine.length < 120) throw new Error(u.id + ': the note of ' + key + ' has no routine');
    for (const t of l.types) {
      if (!p.types.includes(t)) throw new Error(u.id + ': ' + t + ' is not a type of ' + l.point);
      const a = assets[t], lv = (l.core && l.core[t]) || 2;
      if (!a || !(a.p[lv - 1] > 0)) throw new Error(u.id + ': ' + t + ' has no published English page at level ' + lv);
    }
  }
}
const out = [];
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  for (const u of UNITS) if (defs.units.some((x) => x.id === u.id || x.slug === u.slug)) throw new Error(u.id + ' exists: this script ran before');
  const placed = new Set(defs.units.flatMap((u) => u.lessons.map((l) => l.id || l.point)));
  for (const u of UNITS) for (const l of u.lessons) if (placed.has(l.id || l.point)) throw new Error((l.id || l.point) + ' already sits in a unit');
  defs.units.push(...UNITS);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNITS.map((u) => u.id + ' (' + u.lessons.length + ' lessons)').join('; ') + '; no plan (decision 4)');
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
