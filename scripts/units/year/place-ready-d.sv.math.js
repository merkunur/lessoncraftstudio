#!/usr/bin/env node
/**
 * Part 12.2, Swedish mathematics, STAGE 1, second run (2026-11-13): the lessons the "Year pages D" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   åk 1  Addition och subtraktion 0–20 (exists)        + Tiotalsövergång i subtraktion: först ner till tian (G1-556)
 *   åk 1  Utblick mot 100: tiotal, ental och kronor (NEW) Hela tiotal (G1-123, level 1) · Bunta tio (G1-560) · Mynten
 *         (G1-228, level 1) · Betala på olika sätt (G2-472, level 1)
 *   åk 2  Addition och subtraktion 0–100 (exists)        + Addera och subtrahera hela tiotal (G1-558, level 3)
 *         + Tiotalsövergång upp till 100 (G1-439, level 3: held in the first run for want of a second asset; the empty
 *         number line now models its point) + Subtrahera tvåsiffriga tal på tom tallinje (G2-501)
 *
 * The three pages that a lesson of åk 2 hands out too (G1-123, G1-228, G2-472) are handed out at LEVEL 1 in åk 1:
 * two coins in a purse, ring the coins of a price up to 20 kronor, two numbers missing in a row of tens.
 *
 *   node scripts/units/year/place-ready-d.sv.math.js      (refuses to run twice)
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

// a tool models a point (tools.json), each added BEHIND the tool that models the point today
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const add = { 'open-number-line': ['1:fluency-within-20'], 'number-hotel': ['1:mental-math-to-100'] };
  for (const [k, ps] of Object.entries(add)) for (const p of ps) if (!j.tools[k].points.includes(p)) j.tools[k].points.push(p);
  const first = (p) => Object.keys(j.tools).find((k) => j.tools[k].points.includes(p));
  for (const [p, t] of [['1:fluency-within-20', 'rekenrek'], ['1:mental-math-to-100', 'open-number-line']]) if (first(p) !== t) throw new Error(p + ': the first tool is now ' + first(p));
  writeJsonLike(f, raw, j);
}

const f = 'frontend/content/units/defs/sv.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const put = (u, after, L) => { fresh(L); const i = u.lessons.findIndex((x) => keyOf(x) === after) + 1; if (i === 0) throw new Error(u.id + ' has no lesson ' + after); u.lessons.splice(i, 0, L); };
/** the description of a Swedish unit names its lessons by count: "…: N lektioner …" */
const recount = (u) => { const t = u.metaDescription.replace(/: \d+ lektioner /, ': ' + u.lessons.length + ' lektioner '); if (!t.includes(': ' + u.lessons.length + ' lektioner ')) throw new Error(u.id + ': the description names no lesson count'); if (t.length < 110 || t.length > 170) throw new Error(u.id + ': description of ' + t.length + ' characters'); u.metaDescription = t; };

// ── åk 1 ──
{
  const u = unit('sv-1-ma-add-sub-0-20');
  put(u, '1:fluency-within-20#tiotalsovergang-addition', { point: '1:fluency-within-20', id: '1:fluency-within-20#tiotalsovergang-subtraktion', types: ['G1-556'], tool: 'open-number-line', activity: null });
  recount(u);
}
{
  if (defs.units.some((x) => x.id === 'sv-1-ma-utblick-100')) throw new Error('sv-1-ma-utblick-100 exists');
  const u = { id: 'sv-1-ma-utblick-100', slug: 'utblick-mot-100-tiotal-ental-och-kronor-ak-1', status: 'live', grade: '1', subject: 'math',
    title: 'Utblick mot 100: tiotal, ental och kronor', metaTitle: 'Matematik åk 1: Utblick mot 100 | Lektionsplanering',
    metaDescription: 'Lektionsplanering i matematik för åk 1, arbetsområdet ”Utblick mot 100: tiotal, ental och kronor”: 0 lektioner med lärarkommentar och arbetsblad till varje lektion.', weeks: 2,
    lessons: [
      fresh({ point: '1:skip-counting', id: '1:skip-counting#hela-tiotal', types: ['G1-123'], core: { 'G1-123': 1 }, tool: 'choral-counting', activity: null }),
      fresh({ point: '2:bundle-ten-ones', id: '2:bundle-ten-ones#bunta-tio', types: ['G1-560'], tool: 'counting-cups', activity: 'bundle-bot.bundle-machine.1-nbt-b-2-a' }),
      fresh({ point: '1:coins', id: '1:coins#mynten', types: ['G1-228'], core: { 'G1-228': 1 }, tool: 'money-mat', activity: null }),
      fresh({ point: '2:shopping-money', id: '2:shopping-money#betala-pa-olika-satt', types: ['G2-472'], core: { 'G2-472': 1 }, tool: 'money-mat', activity: null }),
    ] };
  // the design puts the unit before Sortera, tabeller och diagram, the last unit of the year
  defs.units.splice(defs.units.findIndex((x) => x.id === 'sv-1-ma-diagram'), 0, u);
  const p = defs.plans.find((x) => x.id === 'plan-1-math'); p.units.splice(p.units.indexOf('sv-1-ma-diagram'), 0, u.id);
  recount(u);
}
// ── åk 2 ──
{
  const u = unit('sv-2-ma-add-sub-0-100');
  put(u, '1:fluency-within-20#huvudrakning-daglig-rutin', { point: '1:mental-math-to-100', types: ['G1-558'], core: { 'G1-558': 3 }, tool: 'number-hotel' });
  put(u, '2:subtract-with-blocks', { point: '1:fluency-within-20', id: '1:fluency-within-20#tiotalsovergang-upp-till-100', types: ['G1-439'], core: { 'G1-439': 3 }, tool: 'open-number-line', activity: null });
  put(u, '1:fluency-within-20#tiotalsovergang-upp-till-100', { point: '1:open-number-line', types: ['G2-501'], tool: 'open-number-line' });
  recount(u);
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
