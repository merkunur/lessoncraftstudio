#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, twelfth run (2026-11-13): the lessons the "Year pages Q" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 1  Story Problems Within 20 (NEW unit, after Doubles, Three Addends, and Number Walls, as the year design has it)
 *       Add and subtract story problems              MOVED from Addition and Subtraction Within 10 (which keeps seven)
 *       Find the missing part                        G1-567 (Number Bonds Board)
 *       What happened in the middle?                 G1-568 (The Gap)
 *       How many more? How many fewer?               G1-511 Compare Word Problems (The Planks)
 *     The fifth lesson of the design, Stories with three numbers, waits for its page (work list part D).
 *
 *   Grade 2  Adding and Subtracting Within 100 (exists)  + One-step stories with a bar model (G2-509 and G2-506, with
 *     The Missing Question), its last lesson. The design puts it in a unit of its own, Story Problems Within 100, whose
 *     three other lessons have no page yet (start unknown, compare with a larger or smaller amount unknown, two steps).
 *
 *   The three tools now model the point of the story lessons too; a lesson of today on that point that names no tool
 *   keeps the tool it shows (The Missing Question), written down here.
 *
 *   node scripts/units/year/place-ready-q.en.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const writeJsonLike = (f, raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(file(f), out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
};
const P = '1:word-problems';
const defsOf = {};
for (const loc of ['en', 'de', 'sv']) { const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); defsOf[loc] = { f, raw, d: JSON.parse(raw) }; }
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const now = Object.keys(j.tools).find((k) => j.tools[k].points.includes(P));
  if (now !== 'missing-question') throw new Error('the tool of ' + P + ' is ' + now);
  for (const k of ['part-whole-frame', 'the-gap', 'comparison-planks']) { if (j.tools[k].points.includes(P)) throw new Error(k + ' models the point already: this script ran before'); j.tools[k].points.push(P); }
  for (const loc of ['en', 'de', 'sv']) for (const u of defsOf[loc].d.units) for (const l of u.lessons) if (l.point === P && !('tool' in l)) l.tool = now;
  writeJsonLike(f, raw, j);
}
const defs = defsOf.en.d;
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const describe = (u, text) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (!text.includes(' ' + u.lessons.length + ' lessons')) throw new Error(u.id + ': the description does not name its ' + u.lessons.length + ' lessons'); u.metaDescription = text; };

// ── Grade 1 ──
{
  const old = unit('g1-add-subtract-within-10');
  const i = old.lessons.findIndex((x) => keyOf(x) === P); if (i < 0) throw new Error('no lesson ' + P);
  const stories = old.lessons.splice(i, 1)[0];
  const u = { id: 'g1-story-problems-within-20', slug: 'story-problems-within-20-grade-1-unit', status: 'live', grade: '1', subject: 'math',
    title: 'Story Problems Within 20', metaTitle: 'Grade 1 Math Lesson Plans: Story Problems Within 20', metaDescription: '', weeks: 2,
    lessons: [
      stories,
      fresh({ point: P, id: P + '#find-the-missing-part', types: ['G1-567'], tool: 'part-whole-frame', activity: null, standards: ['1.OA.A.1'] }),
      fresh({ point: P, id: P + '#what-happened-in-the-middle', types: ['G1-568'], tool: 'the-gap', activity: null, standards: ['1.OA.A.1'] }),
      fresh({ point: P, id: P + '#how-many-more-how-many-fewer', types: ['G1-511'], tool: 'comparison-planks', standards: ['1.OA.A.1'] }),
    ] };
  const after = 'g1-doubles-three-addends-number-walls';
  defs.units.splice(defs.units.findIndex((x) => x.id === after) + 1, 0, u);
  const p = defs.plans.find((x) => x.units.includes(after)); p.units.splice(p.units.indexOf(after) + 1, 0, u.id);
  describe(u, 'A two-week Grade 1 math unit: 4 lessons on story problems within 20, with a missing part, a missing change, and how many more or fewer, each with a bar model or picture.');
  describe(old, 'A four-week Grade 1 math unit: 7 lessons on adding and subtracting within 10, each with a teacher note, practice pages (most at three levels), and on-screen practice.');
}
// ── Grade 2 ──
{
  const u = unit('g2-adding-and-subtracting-within-100');
  u.lessons.push(fresh({ point: '2:two-step-word-problems', id: '2:two-step-word-problems#one-step-stories-with-a-bar-model', types: ['G2-509', 'G2-506'], tool: 'missing-question', activity: null }));
  describe(u, 'A five-week Grade 2 math unit: 8 lessons on number lines, jumps on the hundreds chart and an open number line, adding tens and ones, column sums, and story problems.');
}
for (const loc of ['en', 'de', 'sv']) writeJsonLike(defsOf[loc].f, defsOf[loc].raw, defsOf[loc].d);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
