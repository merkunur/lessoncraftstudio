#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, fourth run (2026-11-13): the lessons the "Year pages G and H" made possible
 * (see place-ready.en.math.js for the rules of stage 1). Every lesson goes into a unit that exists.
 *
 *   K   Counting to 10                              + Match them up: more, fewer, or the same (K-641, with the ten-frame)
 *   K   Counting in Order to 20                     + Count and write how many: up to 20 (K-640, with the ten-frame)
 *   G1  Doubles, Three Addends, Addition Pyramids   + Think addition to subtract (G1-566, with the number balance)
 *
 * The design puts "Match them up" in a unit of its own, Comparing Numbers to 10; its other lessons stand in Counting
 * to 10 today, so this one joins them there, before the lesson that compares two groups.
 *
 *   node scripts/units/year/place-ready-g.en.math.js      (refuses to run twice)
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

// 1. a tool models a point (tools.json): two rows of counters in two colours on the ten-frame show which group has
//    counters left over. The ten-frame stands first in the file, so it becomes the point's first tool: every lesson of
//    today on that point names its tool (or none), which the check below asserts in the three languages that have units.
{
  for (const loc of ['en', 'de', 'sv']) {
    const d = JSON.parse(read('frontend/content/units/defs/' + loc + '.json'));
    for (const u of d.units) for (const l of u.lessons) if (l.point === 'K:compare-groups' && !('tool' in l)) throw new Error(loc + ' ' + u.id + ': a lesson on K:compare-groups names no tool and would gain the ten-frame');
  }
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  if (!j.tools['ten-frame'].points.includes('K:compare-groups')) j.tools['ten-frame'].points.push('K:compare-groups');
  writeJsonLike(f, raw, j);
}

// 2. the units
const f = 'frontend/content/units/defs/en.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const put = (u, after, L) => { fresh(L); const i = u.lessons.findIndex((x) => keyOf(x) === after) + 1; if (i === 0) throw new Error(u.id + ' has no lesson ' + after); u.lessons.splice(i, 0, L); };
const says = (u, count, text) => {
  u.metaDescription = text;
  if (!text.includes(count + ' lessons')) throw new Error(u.id + ': the description does not say ' + count + ' lessons');
  if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count);
  if (text.length < 110 || text.length > 170) throw new Error(u.id + ': a description of ' + text.length + ' characters');
};
{
  const u = unit('k-counting-to-10');
  put(u, 'K:subitize', { point: 'K:compare-groups', id: 'K:compare-groups#match-them-up', types: ['K-641'], tool: 'ten-frame', activity: null, standards: ['K.CC.C.6'] });
  says(u, 12, 'A five-week Kindergarten math unit: 12 lessons on counting and writing numbers to 10, quick looks, matching and comparing groups, and one more and one less.');
}
{
  const u = unit('k-counting-in-order-to-20');
  put(u, 'K:numeral-formation#write-11-to-20', { point: 'K:count-how-many', id: 'K:count-how-many#count-and-write-up-to-20', types: ['K-640'], tool: 'ten-frame', activity: null, standards: ['K.CC.B.5', 'K.CC.A.3'] });
  says(u, 7, 'A three-week Kindergarten math unit: 7 lessons on writing 11 to 20, counting up to 20 things, counting forward and back, counting on, and first, second, third.');
}
{
  const u = unit('g1-doubles-three-addends-number-walls');
  put(u, '1:fluency-within-20#make-ten-to-add', { point: '1:fact-families', id: '1:fact-families#think-addition-to-subtract', types: ['G1-566'], tool: 'number-balance', activity: null, standards: ['1.OA.B.4'] });
  says(u, 8, 'A four-week Grade 1 math unit: 8 lessons on doubles and near doubles, making ten, thinking addition to subtract, true or false equations, odd and even, and three addends.');
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
