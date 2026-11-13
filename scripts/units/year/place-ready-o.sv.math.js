#!/usr/bin/env node
/**
 * Part 12.2, Swedish mathematics, STAGE 1, tenth run (2026-11-13): the lesson the "Year pages O" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   åk 2  Addition och subtraktion 0–100 med pengar (exists)  + Räknehändelser 0–100: välj räknesätt (G2-506, with
 *         Fickbrädet), after the money lessons. The design puts it in a unit of its own, Pengar och räknehändelser
 *         0–100, which is one lesson short (the notes page); it joins the unit that holds the money lessons today.
 *
 *   node scripts/units/year/place-ready-o.sv.math.js      (run AFTER place-ready-o.de.math.js, which gives the tool
 *                                                          its point; refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const f = path.join(REPO, 'frontend/content/units/defs/sv.json');
const raw = fs.readFileSync(f, 'utf8'); const defs = JSON.parse(raw);
const tools = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend/content/teaching-graph/tools.json'), 'utf8')).tools;
if (!tools['missing-question'].points.includes('2:two-step-word-problems')) throw new Error('run place-ready-o.de.math.js first: the tool does not model the point yet');
const u = defs.units.find((x) => x.id === 'sv-2-ma-add-sub-0-100'); if (!u) throw new Error('no unit');
const keyOf = (l) => l.id || l.point;
const L = { point: '2:two-step-word-problems', id: '2:two-step-word-problems#raknehandelser-0-100', types: ['G2-506'], tool: 'missing-question', activity: null };
if (defs.units.some((x) => x.lessons.some((l) => keyOf(l) === keyOf(L)))) throw new Error(keyOf(L) + ' is placed already: this script ran before');
const i = u.lessons.findIndex((x) => keyOf(x) === '2:shopping-money') + 1; if (i === 0) throw new Error('no lesson 2:shopping-money');
u.lessons.splice(i, 0, L);
const t = u.metaDescription.replace(/: \d+ lektioner /, ': ' + u.lessons.length + ' lektioner ');
if (!t.includes(': ' + u.lessons.length + ' lektioner ') || t.length < 110 || t.length > 170) throw new Error('description: ' + t.length + ' characters');
u.metaDescription = t;
const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
fs.writeFileSync(f, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
console.log('sv: ' + defs.units.reduce((n, x) => n + x.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
