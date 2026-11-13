#!/usr/bin/env node
/**
 * Part 12.2, Swedish mathematics, STAGE 1, ninth run (2026-11-13): the two units the "Year pages M" made possible (see
 * place-ready.en.math.js for the rules of stage 1).
 *
 *   förskoleklass  Lägga till, ta bort och lösa problem (NEW unit, the last of the year, as the design has it)
 *       Några kommer till: först, sedan, nu      K-642 level 1 (two stories in which some more come; Fickbrädet)
 *       Några går iväg: hur många är kvar?        K-642 level 2 (two take-away stories)
 *       Dela lika: en till dig, en till mig       K-639 (the pile and the bins, no division sign; Locken)
 *       Lös problemet: lägg, rita och berätta     K-642 level 3 (one of each; the story practice on screen)
 *     The design gave the first two lessons the pages K-028 and K-451. K-028 is the page of a lesson the class has had
 *     (Hur många tillsammans?), and both print a plus or a minus sign, which this unit keeps for åk 1 ("stories before
 *     signs"). The new page has a level for each kind of story, so the three story lessons stand on it; a lesson offers
 *     no easier or harder page that is another kind of story.
 *
 *   åk 2  Rutnät, programmering och skala (NEW unit, before Tabeller och diagram)
 *       Hitta rutan i rutnätet                    MOVED from Geometriska objekt, symmetri och rutnät (which keeps seven
 *                                                 lessons and its title: its symmetry pictures are finished on grids)
 *       Programmera med pilar i rutnät            G1-528 + G1-529 (the pages of the åk 1 lesson on following steps, now
 *                                                 read as programs; Skalbaggens räls)
 *       Hitta felet i programmet                  G2-505 Fix the Arrow Program (Skalbaggens räls)
 *       Förstora i rutnät: dubbelt så stort       K-300 (copy on a lettered grid) + K-502 level 3 (every square becomes
 *                                                 a block of 2 by 2)
 *
 *   node scripts/units/year/place-ready-m.sv.math.js      (refuses to run twice)
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

// The beetle's rail (arrow-strip) models following and correcting a program. It is the first tool of the point then:
// every lesson of today on that point names its tool or names none, which this asserts and, where a lesson says
// nothing, writes down (`tool: null`: the lesson keeps what it shows today).
const defsOf = {};
for (const loc of ['en', 'de', 'sv']) { const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); defsOf[loc] = { f, raw, d: JSON.parse(raw) }; }
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  if (Object.keys(j.tools).some((k) => j.tools[k].points.includes('1:map-key'))) throw new Error('1:map-key has a tool already');
  for (const loc of ['en', 'de', 'sv']) for (const u of defsOf[loc].d.units) for (const l of u.lessons) if (l.point === '1:map-key' && !('tool' in l)) l.tool = null;
  j.tools['arrow-strip'].points.push('1:map-key');
  writeJsonLike(f, raw, j);
}

const defs = defsOf.sv.d;
const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error('no unit ' + id); return u; };
const keyOf = (l) => l.id || l.point;
const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
const take = (u, key) => { const i = u.lessons.findIndex((x) => keyOf(x) === key); if (i < 0) throw new Error(u.id + ' has no lesson ' + key); return u.lessons.splice(i, 1)[0]; };
const describe = (u, text) => { if (text.length < 110 || text.length > 170) throw new Error(u.id + ': description of ' + text.length + ' characters'); if (!text.includes(' ' + u.lessons.length + ' lektioner')) throw new Error(u.id + ': the description does not name its ' + u.lessons.length + ' lessons'); u.metaDescription = text; };
const open = (u, before, plan) => {
  if (defs.units.some((x) => x.id === u.id)) throw new Error(u.id + ' exists');
  const p = defs.plans.find((x) => x.id === plan);
  if (before) { defs.units.splice(defs.units.findIndex((x) => x.id === before), 0, u); p.units.splice(p.units.indexOf(before), 0, u.id); }
  else { const last = p.units[p.units.length - 1]; defs.units.splice(defs.units.findIndex((x) => x.id === last) + 1, 0, u); p.units.push(u.id); }
};

// ── förskoleklass ──
{
  const u = { id: 'sv-f-ma-lagga-till-ta-bort', slug: 'lagga-till-ta-bort-och-losa-problem-forskoleklass', status: 'live', grade: 'K', subject: 'math',
    title: 'Lägga till, ta bort och lösa problem', metaTitle: 'Matematik förskoleklass: Lägga till, ta bort och lösa problem',
    metaDescription: '', weeks: 2,
    lessons: [
      fresh({ point: '1:word-problems', id: '1:word-problems#nagra-kommer-till', types: ['K-642'], core: { 'K-642': 1 }, noHard: ['K-642'], tool: 'missing-question', activity: null }),
      fresh({ point: '1:word-problems', id: '1:word-problems#nagra-gar-ivag', types: ['K-642'], noEasy: ['K-642'], noHard: ['K-642'], tool: 'missing-question', activity: null }),
      fresh({ point: '2:share-and-group', id: '2:share-and-group#en-till-dig-en-till-mig', types: ['K-639'], tool: 'lids', activity: null }),
      fresh({ point: '1:word-problems', id: '1:word-problems#los-problemet-rita', types: ['K-642'], core: { 'K-642': 3 }, noEasy: ['K-642'], tool: 'missing-question', activity: 'ten-frame.solve-the-story.k-oa-a-2' }),
    ] };
  open(u, null, 'plan-k-math');
  describe(u, 'Lektionsplanering i matematik för förskoleklass, arbetsområdet ”Lägga till, ta bort och lösa problem”: 4 lektioner med lärarkommentar och arbetsblad till varje lektion.');
}
// ── åk 2 ──
{
  const old = unit('sv-2-ma-geometri');
  const grid = take(old, '2:grid-coordinates');
  const u = { id: 'sv-2-ma-rutnat-programmering', slug: 'rutnat-programmering-och-skala-ak-2', status: 'live', grade: '2', subject: 'math',
    title: 'Rutnät, programmering och skala', metaTitle: 'Matematik åk 2: Rutnät, programmering och skala | Lektionsplanering',
    metaDescription: '', weeks: 2,
    lessons: [
      grid,
      fresh({ point: '1:map-key', id: '1:map-key#programmera-med-pilar', types: ['G1-528', 'G1-529'], tool: 'arrow-strip', activity: null, standards: ['MA.1-3.2.4'] }),
      fresh({ point: '1:map-key', id: '1:map-key#hitta-felet-i-programmet', types: ['G2-505'], tool: 'arrow-strip', activity: null, standards: ['MA.1-3.2.4'] }),
      fresh({ point: 'K:grid-copy', id: 'K:grid-copy#forstora-i-rutnat', types: ['K-300', 'K-502'], core: { 'K-502': 3 }, activity: null, standards: ['MA.1-3.3.4', 'MA.1-3.5.1'] }),
    ] };
  open(u, 'sv-2-ma-diagram', 'plan-2-math');
  describe(u, 'Lektionsplanering i matematik för åk 2, arbetsområdet ”Rutnät, programmering och skala”: 4 lektioner med lärarkommentar och arbetsblad till varje lektion.');
  describe(old, old.metaDescription.replace(/: \d+ lektioner /, ': ' + old.lessons.length + ' lektioner '));
}
for (const loc of ['en', 'de', 'sv']) writeJsonLike(defsOf[loc].f, defsOf[loc].raw, defsOf[loc].d);
console.log('placed: ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
