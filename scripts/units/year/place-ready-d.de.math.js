#!/usr/bin/env node
/**
 * Part 12.2, German mathematics, STAGE 1, second run (2026-11-13): the lessons the "Year pages D" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   Klasse 1  Plus über die 10 und Rechnen bis 20 (exists)   + Minus über die 10: erst zurück zur 10 (G1-556, level 2)
 *   Klasse 2  Plus und Minus bis 100 (NEW, four lessons)       Zehnerzahlen dazu und weg (G1-558, level 3) · Einer dazu
 *             und weg ohne Zehnerübergang (G1-559, level 3) · Plus mit Zehnerübergang: 47 + 8 (G1-557) · Minus mit
 *             Zehnerübergang: 53 − 6 (G1-556, level 3)
 *
 * Held: Ausblick bis 100 (Klasse 1) holds three lessons with "In Zehnern bündeln" (G1-560); the second unit on Plus
 * und Minus bis 100 (zweistellige Zahlen) holds three with the two Rechenstrich pages (G2-500, G2-501).
 *
 *   node scripts/units/year/place-ready-d.de.math.js      (refuses to run twice)
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

// a tool models a point (tools.json): the Rechenstrich shows the two jumps over a ten, the Zahlenhotel the tens and
// ones of a number to 100. Each is added BEHIND the tool that models the point today.
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const add = { 'open-number-line': ['1:fluency-within-20'], 'number-hotel': ['1:mental-math-to-100'] };
  for (const [k, ps] of Object.entries(add)) for (const p of ps) if (!j.tools[k].points.includes(p)) j.tools[k].points.push(p);
  const first = (p) => Object.keys(j.tools).find((k) => j.tools[k].points.includes(p));
  for (const [p, t] of [['1:fluency-within-20', 'rekenrek'], ['1:mental-math-to-100', 'open-number-line']]) if (first(p) !== t) throw new Error(p + ': the first tool is now ' + first(p));
  writeJsonLike(f, raw, j);
}

const f = 'frontend/content/units/defs/de.json'; const raw = read(f); const defs = JSON.parse(raw);
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const put = (u, after, L) => { fresh(L); const i = u.lessons.findIndex((x) => keyOf(x) === after) + 1; if (i === 0) throw new Error(u.id + ' has no lesson ' + after); u.lessons.splice(i, 0, L); };
const says = (u, count, text) => { u.metaDescription = text; if (!text.includes(count + ' Stunden')) throw new Error(u.id + ': the description does not say ' + count + ' Stunden'); if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count); if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); };

// ── Klasse 1 ──
{
  const u = unit('de1-zehneruebergang');
  put(u, '1:near-doubles', { point: '1:fluency-within-20', id: '1:fluency-within-20#minus-ueber-die-10', types: ['G1-556'], tool: 'rekenrek', activity: null });
  says(u, 5, 'Drei Wochen Mathe Klasse 1: 5 Stunden zum Plus- und Minusrechnen über die 10, zu Nachbaraufgaben der Verdopplungen, zu Rechengeschichten und zum Kopfrechnen bis 20.');
}
// ── Klasse 2 ──
{
  if (defs.units.some((x) => x.id === 'de2-plus-minus-bis-100')) throw new Error('de2-plus-minus-bis-100 exists');
  const u = { id: 'de2-plus-minus-bis-100', slug: 'plus-und-minus-bis-100-mit-zehneruebergang-klasse-2', status: 'live', grade: '2', subject: 'math',
    title: 'Plus und Minus bis 100: Einer, Zehner und Zehnerübergang', metaTitle: 'Mathe Klasse 2: Plus und Minus bis 100 mit Zehnerübergang', metaDescription: '', weeks: 3,
    lessons: [
      fresh({ point: '1:mental-math-to-100', types: ['G1-558'], core: { 'G1-558': 3 }, tool: 'number-hotel' }),
      fresh({ point: '1:mental-math-to-100', id: '1:mental-math-to-100#einer-dazu-und-weg', types: ['G1-559'], core: { 'G1-559': 3 }, tool: 'number-hotel', activity: null }),
      fresh({ point: '1:mental-math-to-100', id: '1:mental-math-to-100#plus-mit-zehneruebergang', types: ['G1-557'], tool: 'open-number-line', activity: null }),
      fresh({ point: '1:fluency-within-20', id: '1:fluency-within-20#minus-mit-zehneruebergang-bis-100', types: ['G1-556'], core: { 'G1-556': 3 }, tool: 'open-number-line', activity: null }),
    ] };
  defs.units.splice(defs.units.findIndex((x) => x.id === 'de2-zahlen-bis-100') + 1, 0, u);
  const p = defs.plans.find((x) => x.id === 'plan-2-math'); p.units.splice(p.units.indexOf('de2-zahlen-bis-100') + 1, 0, u.id);
  says(u, 4, 'Drei Wochen Mathe Klasse 2: 4 Stunden zum Rechnen mit Zehnerzahlen, mit Einern ohne Zehnerübergang und zu Plus und Minus mit Zehnerübergang bis 100, mit Lehrerhinweis.');
}
writeJsonLike(f, raw, defs);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
