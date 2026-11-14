#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, fifteenth run (2026-11-14): the unit the "Year pages T" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 3  Story Problems with All Four Operations (NEW unit, after Division, as the year design has it)
 *       Multiplication and division word problems    MOVED from Division (which keeps six lessons)
 *       Two-step stories: add and subtract           G3-485 Two-Step Story Problems Within 1,000 (Exchange Machine)
 *       Two-step stories: multiply or divide         G3-486 Two-Step Story Problems: Multiply and Divide (Baking Tray)
 *       A letter for the unknown, and does the       G3-487 Two-Step Stories: Equation, Estimate, Answer
 *       answer make sense?                           (Rounding Hill)
 *     The four lessons of the design, on the new teaching point 3:two-step-word-problems (3.OA.D.8). Each of the three
 *     tools serves one step of its lesson (the column work, the equal groups, rounding to the hundred) and is entered
 *     for the point in tools.json.
 *
 *   node scripts/units/year/place-ready-t.en.math.js      (refuses to run twice)
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
const P = '3:two-step-word-problems';
const TOOLS = ['exchange-machine', 'baking-tray', 'rounding-hill'];
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  for (const t of TOOLS) { if (!j.tools[t]) throw new Error('no tool ' + t); if (j.tools[t].points.includes(P)) throw new Error(t + ' models the point already: this script ran before'); j.tools[t].points.push(P); }
  writeJsonLike(f, raw, j);
}
const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const describe = (u, text) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (!text.includes(' ' + u.lessons.length + ' lessons')) throw new Error(u.id + ': the description does not name its ' + u.lessons.length + ' lessons'); u.metaDescription = text; };
{
  const old = unit('g3-division');
  const one = take(old, '3:muldiv-word-problems');
  const u = { id: 'g3-story-problems-all-four-operations', slug: 'story-problems-with-all-four-operations-grade-3-unit', status: 'live', grade: '3', subject: 'math',
    title: 'Story Problems with All Four Operations', metaTitle: 'Grade 3 Math Lesson Plans: Story Problems, All Four Operations', metaDescription: '', weeks: 2,
    lessons: [
      one,
      fresh({ point: P, id: P + '#two-step-stories-add-and-subtract', types: ['G3-485'], tool: 'exchange-machine', activity: null }),
      fresh({ point: P, id: P + '#two-step-stories-multiply-or-divide', types: ['G3-486'], tool: 'baking-tray', activity: null }),
      fresh({ point: P, id: P + '#an-equation-with-a-letter-and-an-estimate', types: ['G3-487'], tool: 'rounding-hill', activity: null }),
    ] };
  if (defs.units.some((x) => x.id === u.id)) throw new Error(u.id + ' exists');
  defs.units.splice(defs.units.findIndex((x) => x.id === old.id) + 1, 0, u);
  const p = defs.plans.find((x) => x.units.includes(old.id)); p.units.splice(p.units.indexOf(old.id) + 1, 0, u.id);
  describe(u, 'A two-week Grade 3 math unit: 4 lessons on story problems with one step and two steps, an equation with a letter for the unknown, and an estimate as a check.');
  describe(old, 'A three-week Grade 3 math unit: 6 lessons on sharing, making groups, fact families, the facts still to learn, breaking hard facts apart, and remainders.');
}
writeJsonLike(F, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
