#!/usr/bin/env node
/**
 * Part 12.2, German and Swedish mathematics, STAGE 1, eleventh run (2026-11-13): the chance lessons the "Year pages P"
 * made possible (see place-ready.en.math.js for the rules of stage 1). A lesson joins the unit that holds its
 * neighbours of the year design today; the renames of the design ("… und Zufall", "… och slump") wait for stage 2.
 *
 *   de Klasse 2  Messen, Uhrzeit, Geld und Diagramme        + Sicher, möglich, unmöglich (G2-507 and the record sheet
 *                                                             G2-508; Der Zufallsbeutel), the last lesson
 *   de Klasse 3  Rechte Winkel, Vierecke, Symmetrie und Diagramme
 *                                                           + Wahrscheinlicher oder unwahrscheinlicher? (G3-484; Der
 *                                                             Zufallsbeutel), the last lesson. Its experiment of 20
 *                                                             draws runs on the tool, which keeps every draw on the
 *                                                             screen: the record sheet G2-508 is a page of the grade 2
 *                                                             point, and a lesson hands out pages of its own point
 *   sv åk 2      Tabeller och diagram                       + Slump: vad finns i påsen? (G2-507 and G2-508;
 *                                                             Slumppåsen), the last lesson
 *   The Swedish åk 3 lesson Slumpförsök: lika stor chans? has its pages (the die sheet, level 3 of G2-508, and
 *   G3-484) and waits for its unit, Samband, slump och statistik, which has three lessons without a page.
 *
 *   node scripts/units/year/place-ready-p.math.js      (refuses to run twice)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const A = '2:chance-certain-possible', B = '3:chance-more-likely';
const PLAN = {
  de: [
    { unit: 'de2-groessen-daten', lesson: { point: A, types: ['G2-507', 'G2-508'], tool: 'draw-bag', activity: null }, count: /(: )\d+( Stunden )/ },
    { unit: 'g3-shapes-and-data', lesson: { point: B, types: ['G3-484'], tool: 'draw-bag', activity: null }, count: /(: )\d+( Stunden )/ },
  ],
  sv: [
    { unit: 'sv-2-ma-diagram', lesson: { point: A, types: ['G2-507', 'G2-508'], tool: 'draw-bag', activity: null }, count: /(: )\d+( lektioner )/ },
  ],
};
for (const [loc, list] of Object.entries(PLAN)) {
  const f = path.join(REPO, 'frontend/content/units/defs/' + loc + '.json');
  const raw = fs.readFileSync(f, 'utf8'); const defs = JSON.parse(raw);
  for (const { unit, lesson, count } of list) {
    const u = defs.units.find((x) => x.id === unit); if (!u) throw new Error('no unit ' + unit);
    if (defs.units.some((x) => x.lessons.some((l) => (l.id || l.point) === lesson.point))) throw new Error(loc + ': ' + lesson.point + ' is placed already: this script ran before');
    u.lessons.push(lesson);
    const t = u.metaDescription.replace(count, '$1' + u.lessons.length + '$2');
    if (!t.includes(' ' + u.lessons.length + ' ') || t.length < 110 || t.length > 170) throw new Error(unit + ': description "' + t + '" (' + t.length + ')');
    u.metaDescription = t;
  }
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(defs, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  fs.writeFileSync(f, out + (raw.endsWith('\n') ? (raw.includes('\r\n') ? '\r\n' : '\n') : ''));
  console.log(loc + ': ' + defs.units.reduce((n, x) => n + x.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
}
