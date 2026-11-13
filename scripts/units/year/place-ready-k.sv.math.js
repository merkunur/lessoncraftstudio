#!/usr/bin/env node
/**
 * Part 12.2, Swedish mathematics, STAGE 1, seventh run (2026-11-13): the lessons the "Year pages K" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   åk 3  Multiplikationstabellerna 1–10 (NEW unit, before Multiplikation och division, as the year design has it)
 *           3-hopp och 4-hopp                       MOVED from Multiplikation och division (G2-207, G2-208)
 *         + Tabellträning: de 21 uppgifter          the teacher leads it, with Vikväggen (no worksheet)  
 *         + 3:ans och 4:ans tabell                  G3-367, G3-368 (published pages; work list part A)
 *           6:ans tabell med hjälp av 5:ans tabell  MOVED from Multiplikation och division (G3-482)
 *         + 7:ans, 8:ans och 9:ans tabell           G3-483 Break Apart a Hard Fact + G3-405 the table of 9, Bullplåten
 *   åk 3  Multiplikation och division (exists)      loses the two lessons above: six lessons stay (sharing, grouping,
 *                                                   the link to multiplication, stories, remainders)
 *   åk 2  Addition och subtraktion 0–100 (exists) + Addera tvåsiffriga tal: talsorterna var för sig (G2-504,
 *                                                   Tiotalslabbet), before the subtraction on the empty number line
 *
 *   node scripts/units/year/place-ready-k.sv.math.js      (refuses to run twice)
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

// the place-value blocks model adding by tens and ones too
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  if (!j.tools['place-value-lab'].points.includes('1:mental-math-to-100')) j.tools['place-value-lab'].points.push('1:mental-math-to-100');
  // the lab stands before the other tools of the point in the file, so it becomes the point's first tool: every lesson of
  // today on that point names its tool (or none), which this asserts in the three languages that have units
  for (const loc of ['en', 'de', 'sv']) {
    const d = JSON.parse(read('frontend/content/units/defs/' + loc + '.json'));
    for (const u of d.units) for (const l of u.lessons) if (l.point === '1:mental-math-to-100' && !('tool' in l)) throw new Error(loc + ' ' + u.id + ': a lesson on 1:mental-math-to-100 names no tool and would gain the place-value lab');
  }
  writeJsonLike(f, raw, j);
}

const f = 'frontend/content/units/defs/sv.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const put = (u, after, L) => { fresh(L); const i = u.lessons.findIndex((x) => keyOf(x) === after) + 1; if (i === 0) throw new Error(u.id + ' has no lesson ' + after); u.lessons.splice(i, 0, L); };
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const describe = (u, text) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (!text.includes(' ' + u.lessons.length + ' lektioner')) throw new Error(u.id + ': the description does not name its ' + u.lessons.length + ' lessons'); u.metaDescription = text; };

// ── åk 3 ──
{
  if (defs.units.some((x) => x.id === 'sv-3-ma-multiplikationstabellerna')) throw new Error('sv-3-ma-multiplikationstabellerna exists');
  const old = unit('sv-3-ma-mult-division');
  const skip = take(old, '2:skip-count-3-4');
  const six = take(old, '3:times-tables#sexans-tabell-ur-tabeller-du-kan');
  const u = { id: 'sv-3-ma-multiplikationstabellerna', slug: 'multiplikationstabellerna-ak-3', status: 'live', grade: '3', subject: 'math',
    title: 'Multiplikationstabellerna 1–10', metaTitle: 'Matematik åk 3: Multiplikationstabellerna 1–10 | Lektionsplanering',
    metaDescription: '', weeks: 3,
    lessons: [
      skip,
      fresh({ point: '3:times-tables', id: '3:times-tables#tabelltraning-de-21-uppgifterna', led: true, tool: 'folding-wall', activity: null }),
      fresh({ point: '3:times-tables', id: '3:times-tables#treans-och-fyrans-tabell', types: ['G3-367', 'G3-368'], tool: null, activity: null }),
      six,
      fresh({ point: '3:times-tables', id: '3:times-tables#sjuans-attans-och-nians-tabell', types: ['G3-483', 'G3-405'], tool: 'baking-tray', activity: null }),
    ] };
  // the design puts the tables before division: the unit stands in front of Multiplikation och division
  defs.units.splice(defs.units.findIndex((x) => x.id === old.id), 0, u);
  const p = defs.plans.find((x) => x.id === 'plan-3-math'); p.units.splice(p.units.indexOf(old.id), 0, u.id);
  describe(u, 'Lektionsplanering i matematik för åk 3, arbetsområdet ”Multiplikationstabellerna 1–10”: 5 lektioner med lärarkommentar, daglig tabellträning och arbetsblad.');
  describe(old, 'Lektionsplanering i matematik för åk 3, arbetsområdet ”Multiplikation och division”: 6 lektioner med lärarkommentar och arbetsblad till varje lektion.');
}
// ── åk 2 ──
{
  const u = unit('sv-2-ma-add-sub-0-100');
  put(u, '1:fluency-within-20#tiotalsovergang-upp-till-100', { point: '1:mental-math-to-100', id: '1:mental-math-to-100#talsorterna-var-for-sig', types: ['G2-504'], tool: 'place-value-lab', activity: null });
  const t = u.metaDescription.replace(/: \d+ lektioner /, ': ' + u.lessons.length + ' lektioner ');
  describe(u, t);
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
