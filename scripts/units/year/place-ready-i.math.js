#!/usr/bin/env node
/**
 * Part 12.2, mathematics, STAGE 1, fifth run (2026-11-13): the lessons the "Year pages I" made possible (see
 * place-ready.en.math.js for the rules of stage 1). Each lesson goes into a unit that exists.
 *
 *   English  G3    Fractions                         + Unit fractions on the number line: the child writes the fraction
 *                                                      of a dot (G3-481), then places the dot of a printed fraction
 *                                                      (G3-406); the check-up page comes from G3-406 (G3-481 has one
 *                                                      page of unit fractions per level)
 *   Swedish  åk 2  Längd, klockan och almanackan     + Liter och deciliter (G2-503, with Mätbänken)
 *
 *   node scripts/units/year/place-ready-i.math.js      (a lesson that is placed differently stops it)
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
const place = (loc, lessonsWord, work) => {
  const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); const defs = JSON.parse(raw);
  const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error(loc + ': no unit ' + id); return u; };
  const keyOf = (l) => l.id || l.point;
  const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
  const put = (u, after, L) => {
    // a second run after a failure in the other language: a lesson that stands exactly as written here is left alone
    const ex = u.lessons.find((x) => keyOf(x) === keyOf(L));
    if (ex && JSON.stringify(ex) === JSON.stringify(L)) return;
    if (all.has(keyOf(L))) throw new Error(loc + ': ' + keyOf(L) + ' is placed already: this script ran before');
    all.add(keyOf(L));
    const i = u.lessons.findIndex((x) => keyOf(x) === after) + 1; if (i === 0) throw new Error(u.id + ' has no lesson ' + after);
    u.lessons.splice(i, 0, L);
  };
  const says = (u, count, text) => {
    u.metaDescription = text;
    if (!text.includes(count + ' ' + lessonsWord)) throw new Error(u.id + ': the description does not say ' + count + ' ' + lessonsWord);
    if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count);
    if (text.length < 110 || text.length > 170) throw new Error(u.id + ': a description of ' + text.length + ' characters');
  };
  work({ unit, put, says });
  writeJsonLike(f, raw, defs);
  console.log(loc + ': ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
};

place('en', 'lessons', ({ unit, put, says }) => {
  const u = unit('g3-fractions');
  put(u, '3:whole-from-unit', { point: '3:fraction-number-line', id: '3:fraction-number-line#unit-fractions-on-the-number-line', types: ['G3-481', 'G3-406'], exitType: 'G3-406', tool: null, activity: null, standards: ['3.NF.A.2'] });
  says(u, 8, 'A four-week Grade 3 math unit: 8 lessons on equal parts, naming fractions, the whole, fractions on a number line, comparing, and equivalent fractions.');
});

place('sv', 'lektioner', ({ unit, put, says }) => {
  const u = unit('sv-2-ma-langd-tid');
  put(u, '2:compare-lengths', { point: '2:read-jugs', id: '2:read-jugs#liter-och-deciliter', types: ['G2-503'], tool: 'measurement-bench', activity: null });
  says(u, 5, 'Lektionsplanering i matematik för åk 2, ”Längd, klockan och almanackan”: 5 lektioner om längd, liter och deciliter, klockan och almanackan, cirka tre veckor.');
});
