#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, fourteenth run (2026-11-14): the unit the "Year pages S" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 2  Story Problems Within 100 (NEW unit, after Adding and Subtracting Within 100, as the year design has it)
 *       One-step stories with a bar model        MOVED from Adding and Subtracting Within 100
 *       What was there at the start?             MOVED from Adding and Subtracting Within 100 (which keeps seven)
 *       Compare stories: more and fewer          G2-512 Compare Stories Within 100: Two Bars (The Planks)
 *       Two-step stories                         G2-511 Two-Step Story Problems Within 100, and the page with small
 *                                                numbers, G2-489, as its second page
 *     The four lessons of the design. The Planks now model the Grade 2 story point too (two amounts side by side and
 *     the piece by which one is longer).
 *
 *   node scripts/units/year/place-ready-s.en.math.js      (refuses to run twice)
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
const P = '2:two-step-word-problems';
const defsOf = {};
for (const loc of ['en', 'de', 'sv']) { const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); defsOf[loc] = { f, raw, d: JSON.parse(raw) }; }
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  if (j.tools['comparison-planks'].points.includes(P)) throw new Error('The Planks model the point already: this script ran before');
  // every lesson of today on the point names its tool (The Missing Question): asserted, so no lesson changes what it shows
  for (const loc of ['en', 'de', 'sv']) for (const u of defsOf[loc].d.units) for (const l of u.lessons) if (l.point === P && !('tool' in l)) throw new Error(loc + ' ' + (l.id || l.point) + ' names no tool');
  j.tools['comparison-planks'].points.push(P);
  writeJsonLike(f, raw, j);
}
const defs = defsOf.en.d;
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const describe = (u, text) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (!text.includes(' ' + u.lessons.length + ' lessons')) throw new Error(u.id + ': the description does not name its ' + u.lessons.length + ' lessons'); u.metaDescription = text; };
{
  const old = unit('g2-adding-and-subtracting-within-100');
  const bar = take(old, P + '#one-step-stories-with-a-bar-model'), start = take(old, P + '#what-was-there-at-the-start');
  const u = { id: 'g2-story-problems-within-100', slug: 'story-problems-within-100-grade-2-unit', status: 'live', grade: '2', subject: 'math',
    title: 'Story Problems Within 100', metaTitle: 'Grade 2 Math Lesson Plans: Story Problems Within 100', metaDescription: '', weeks: 2,
    lessons: [
      bar, start,
      fresh({ point: P, id: P + '#compare-stories-more-and-fewer', types: ['G2-512'], tool: 'comparison-planks', activity: null }),
      fresh({ point: P, id: P + '#two-step-stories', types: ['G2-511', 'G2-489'], tool: null, activity: null }),
    ] };
  if (defs.units.some((x) => x.id === u.id)) throw new Error(u.id + ' exists');
  defs.units.splice(defs.units.findIndex((x) => x.id === old.id) + 1, 0, u);
  const p = defs.plans.find((x) => x.units.includes(old.id)); p.units.splice(p.units.indexOf(old.id) + 1, 0, u.id);
  describe(u, 'A two-week Grade 2 math unit: 4 lessons on story problems within 100, with a bar model, an unknown start, comparing two amounts, and stories with two steps.');
  describe(old, 'A four-week Grade 2 math unit: 7 lessons on number lines, jumps on the hundreds chart, adding tens and ones, and adding and subtracting vertically within 100.');
}
writeJsonLike(defsOf.en.f, defsOf.en.raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
