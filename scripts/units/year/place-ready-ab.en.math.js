#!/usr/bin/env node
/**
 * Part 12.2, English mathematics, STAGE 1, twenty-fourth run (2026-11-14): the lesson the "Year pages AB" made possible
 * (see place-ready.en.math.js for the rules of stage 1).
 *
 *   Grade 2  Time, Money, and Measuring Length (the design's order: with the other length lessons, after Compare lengths)
 *       Length story problems   G2-518, after Compare lengths   (The Planks: the difference of two planks is a piece taken
 *                               off the longer one and laid at the end of the shorter one; the tool is listed for the point)
 *
 *   The English registry (frontend/content/curricula/en/crosswalk-overrides.json): word problems about lengths in one unit
 *   are 2.MD.B.5, a new row of the point "compare lengths" (2.MD.A.4). Pinned so that no lesson of today changes: the
 *   lesson on comparing lengths keeps its one objective, 2.MD.A.4.
 *
 *   node scripts/units/year/place-ready-ab.en.math.js      (refuses to run twice)
 * Then: node scripts/curricula/build-en.js · node scripts/units/notes/apply.js · node scripts/units/assemble.js --loc=en
 *       · node scripts/units/apply-pacing-to-defs.js · assemble again (and assemble --loc=de, --loc=sv: unchanged)
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
const keyOf = (l) => l.id || l.point;
const F = 'frontend/content/units/defs/en.json', raw = read(F), defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const all = new Set(defs.units.flatMap((x) => x.lessons.map(keyOf)));
const after = (u, key, L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error('no lesson ' + key + ' in ' + u.id); u.lessons.splice(i + 1, 0, L); all.add(keyOf(L)); };
const describe = (u, text) => { if (text.length < 110 || text.length > 170 || !text.includes(' ' + u.lessons.length + ' lessons')) throw new Error(u.id + ' description: ' + text.length + ' characters, ' + u.lessons.length + ' lessons'); u.metaDescription = text; };
const pin = (lessons, key, field, value) => { const l = lessons.find((x) => keyOf(x) === key); if (!l) throw new Error('no lesson ' + key); if (field in l) throw new Error(key + ' has its ' + field + ' already'); l[field] = value; };

const tools = JSON.parse(read('frontend/content/teaching-graph/tools.json'));
if (!tools.tools['comparison-planks'].points.includes('2:compare-lengths')) throw new Error('The Planks is not listed for 2:compare-lengths');

// 1. the registry row the lesson shows
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json'; const r = read(f); const j = JSON.parse(r);
  if (j.points['2:compare-lengths']) throw new Error('an override for 2:compare-lengths exists');
  j.points['2:compare-lengths'] = { rows: ['2.MD.A.4', '2.MD.B.5'].map((id) => ({ id, rel: 'teaches' })), why: 'The point carries 2.MD.A.4 for its page on measuring two objects and finding how much longer one is. Length Story Problems tells lengths in one unit that are put together, cut off and compared, with a bar model and an equation: word problems within 100 about lengths are 2.MD.B.5. Each lesson of a unit shows the one it teaches.', review: 'year-design 2026-11-14' };
  writeJsonLike(f, r, j);
}

// 2. the unit
const g2m = unit('g2-measurement-time-money');
pin(g2m.lessons, '2:compare-lengths', 'standards', ['2.MD.A.4']);
after(g2m, '2:compare-lengths', { point: '2:compare-lengths', id: '2:compare-lengths#length-story-problems', types: ['G2-518'], tool: 'comparison-planks', activity: null, standards: ['2.MD.B.5'] });
const weeks = { 4: 'four', 5: 'five', 6: 'six' }[g2m.weeks];
if (!weeks) throw new Error('g2-measurement-time-money: ' + g2m.weeks + ' weeks');
describe(g2m, `A ${weeks}-week Grade 2 math unit: 9 lessons on measuring with a ruler and in two units, length story problems, time to five minutes, the calendar, and money.`);

writeJsonLike(F, raw, defs);
console.log(g2m.id + ' (' + g2m.weeks + ' weeks): ' + g2m.lessons.map(keyOf).join(' · '));
