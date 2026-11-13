#!/usr/bin/env node
/**
 * Part 12.2, Swedish mathematics, STAGE 1, sixth run (2026-11-13): the lesson the "Year pages J" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   åk 3  Multiplikation och division   + 6:ans tabell ur tabeller du kan (G3-482 level 1: the table of 6 from the
 *                                         table of 5; the harder page adds the table of 7; with Bullplåten)
 *
 * The design puts the lesson in a unit of its own, Multiplikationstabellerna 1–10, which is not open; it joins the
 * live unit on multiplication and division, as its first lesson on the tables.
 *
 *   node scripts/units/year/place-ready-j.sv.math.js      (a lesson that is placed differently stops it)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const f = path.join(REPO, 'frontend/content/units/defs/sv.json');
const raw = fs.readFileSync(f, 'utf8'); const defs = JSON.parse(raw);
const u = defs.units.find((x) => x.id === 'sv-3-ma-mult-division'); if (!u) throw new Error('no unit');
const keyOf = (l) => l.id || l.point;
const L = { point: '3:times-tables', id: '3:times-tables#sexans-tabell-ur-tabeller-du-kan', types: ['G3-482'], core: { 'G3-482': 1 }, titles: { 'G3-482': 'Smarta knep: 6:ans tabell' }, tool: 'baking-tray', activity: null };
const ex = u.lessons.find((x) => keyOf(x) === keyOf(L));
if (ex && JSON.stringify(ex) !== JSON.stringify(L)) throw new Error(keyOf(L) + ' is placed differently');
if (!ex) {
  if (defs.units.some((x) => x.lessons.some((l) => keyOf(l) === keyOf(L)))) throw new Error(keyOf(L) + ' stands in another unit');
  const i = u.lessons.findIndex((x) => keyOf(x) === '2:skip-count-3-4') + 1; if (i === 0) throw new Error('no lesson 2:skip-count-3-4');
  u.lessons.splice(i, 0, L);
}
const text = 'Lektionsplanering i matematik för åk 3, arbetsområdet ”Multiplikation och division”: 8 lektioner med lärarkommentar och arbetsblad till varje lektion, cirka fem veckor.';
if (u.lessons.length !== 8 || text.length < 110 || text.length > 170) throw new Error('unit: ' + u.lessons.length + ' lessons, description ' + text.length + ' characters');
u.metaDescription = text;
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(f, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
console.log('sv: ' + defs.units.reduce((n, x) => n + x.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
