#!/usr/bin/env node
/**
 * Part 12.2, German mathematics, STAGE 1, tenth run (2026-11-13): the unit the "Year pages O" made possible (see
 * place-ready.en.math.js for the rules of stage 1). It was held one lesson short.
 *
 *   Klasse 2  Plus und Minus bis 100: zweistellige Zahlen (NEW unit, after Plus und Minus bis 100: Einer, Zehner und
 *             Zehnerübergang, as the year design has it)
 *       Zweistellige Zahlen addieren: 35 + 23 und 48 + 37        G2-500 Plus am Rechenstrich (Rechenstrich)
 *       Zweistellige Zahlen subtrahieren: 67 − 24 und 82 − 35    G2-501 Minus am Rechenstrich (Rechenstrich)
 *       Sachaufgaben bis 100: Frage, Rechnung, Antwort           G2-506 (the new page; Die drei Nischen)
 *       Plus und Minus bis 100 üben                              MOVED from Zahlen bis 100: Bündeln und Hundertertafel
 *                                                                (which keeps eight lessons)
 *   The two Rechenstrich lessons offer all three pages: every level stays within 100 (level 3 crosses a ten with a
 *   second number of 31 and more, the kind the lesson titles name: 48 + 37, 82 − 35).
 *   The fifth lesson of the design, Rechenwege vergleichen, waits for its page (work list part D).
 *
 *   node scripts/units/year/place-ready-o.de.math.js      (refuses to run twice)
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

// Die drei Nischen (missing-question: the class decides what could be asked) models the point of the story page too.
// It is the first tool of that point then: a lesson of today on the point that names no tool keeps none.
const defsOf = {};
for (const loc of ['en', 'de', 'sv']) { const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); defsOf[loc] = { f, raw, d: JSON.parse(raw) }; }
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const P = '2:two-step-word-problems';
  if (j.tools['missing-question'].points.includes(P)) throw new Error('the tool models the point already: this script ran before');
  if (!Object.keys(j.tools).some((k) => j.tools[k].points.includes(P))) for (const loc of ['en', 'de', 'sv']) for (const u of defsOf[loc].d.units) for (const l of u.lessons) if (l.point === P && !('tool' in l)) l.tool = null;
  j.tools['missing-question'].points.push(P);
  writeJsonLike(f, raw, j);
}

const defs = defsOf.de.d;
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const describe = (u, text, count) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (u.lessons.length !== count || !text.includes(count + ' Stunden')) throw new Error(u.id + ': ' + u.lessons.length + ' lessons, the description must name ' + count); u.metaDescription = text; };

if (defs.units.some((x) => x.id === 'de2-plus-minus-zweistellig')) throw new Error('de2-plus-minus-zweistellig exists');
const old = unit('de2-zahlen-bis-100');
const practice = take(old, '2:add-sub-within-100-practice');
const u = { id: 'de2-plus-minus-zweistellig', slug: 'plus-und-minus-bis-100-zweistellige-zahlen-klasse-2', status: 'live', grade: '2', subject: 'math',
  title: 'Plus und Minus bis 100: zweistellige Zahlen und Sachaufgaben', metaTitle: 'Mathe Klasse 2: Plus und Minus bis 100 mit zweistelligen Zahlen',
  metaDescription: '', weeks: 3,
  lessons: [
    fresh({ point: '1:open-number-line', id: '1:open-number-line#zweistellig-addieren', types: ['G2-500'], tool: 'open-number-line', activity: null }),
    fresh({ point: '1:open-number-line', id: '1:open-number-line#zweistellig-subtrahieren', types: ['G2-501'], tool: 'open-number-line', activity: null }),
    fresh({ point: '2:two-step-word-problems', id: '2:two-step-word-problems#sachaufgaben-bis-100', types: ['G2-506'], tool: 'missing-question', activity: null }),
    practice,
  ] };
const after = 'de2-plus-minus-bis-100';
defs.units.splice(defs.units.findIndex((x) => x.id === after) + 1, 0, u);
const p = defs.plans.find((x) => x.units.includes(after)); p.units.splice(p.units.indexOf(after) + 1, 0, u.id);
describe(u, 'Drei Wochen Mathe Klasse 2: 4 Stunden zum Addieren und Subtrahieren zweistelliger Zahlen am Rechenstrich, zu Sachaufgaben bis 100 und zum Üben.', 4);
describe(old, 'Fünf Wochen Mathe Klasse 2: 8 Stunden zum Bündeln, zu Zehnern und Einern, zur Hundertertafel, zum Vergleichen, zum Zahlenstrahl und zum Zählen in Schritten.', 8);
for (const loc of ['en', 'de', 'sv']) writeJsonLike(defsOf[loc].f, defsOf[loc].raw, defsOf[loc].d);
console.log('placed: ' + defs.units.reduce((n, x) => n + x.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
