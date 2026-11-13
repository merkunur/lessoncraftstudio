#!/usr/bin/env node
/**
 * Part 12.2, mathematics, STAGE 1, third run (2026-11-13): the lessons the "Year pages E and F" made possible, in the
 * three languages at once (see place-ready.en.math.js for the rules of stage 1). Every lesson goes into a unit that
 * exists; no unit is opened.
 *
 *   English
 *   K   Number Bonds and Partners of 10         + Take apart 6 and 7 (K-636)
 *   K   Teen Numbers and Counting to 100        + Build and draw a teen number (K-637) · Ten and how many more? (K-634)
 *                                                 · Count to 50 (K-633) · Start at any number and count on (K-632)
 *   G1  Tens and Ones                           + Teen numbers: one ten and some ones (G1-564) · Count the tens (G1-563)
 *   G1  Adding Within 100                       + Subtract tens from tens (G1-565)
 *   G2  Adding and Subtracting Within 1,000     + Subtract three-digit numbers (G2-502)
 *   German
 *   Kl. 1  Zahlen bis 10                        + Die Schüttelbox (K-635) · Zahlenhäuser: alle Zerlegungen finden (K-638)
 *   Kl. 1  Plus und Minus bis 10                + Tauschaufgaben (G1-562)
 *   Kl. 1  Verdoppeln, drei Summanden …         + Kleine Aufgabe, große Aufgabe (G1-561: plus easier, minus for everyone, both mixed harder)
 *   Swedish
 *   åk 1   Addition och subtraktion 0–20        + Samma ental, en tia till (G1-561, the same three pages)
 *
 * Held: Swedish förskoleklass "Dela lika: en till dig, en till mig" (K-639 is published): its unit of the design,
 * "Lägga till, ta bort och lösa problem", is not open yet.
 *
 * A lesson needs two real resources: the turn-around lesson has its page and the number balance, the number houses the
 * empty houses (K-638) and the half-filled ones (K-456).
 *
 *   node scripts/units/year/place-ready-e.math.js      (refuses to run twice)
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

// 1. a tool models a point (tools.json): counting aloud in chorus from any number; rods to cross out for tens minus
//    tens would be the Place Value Lab, but it stands before the tools of that point in the file and would become the
//    point's first tool: the lesson names the Number Hotel, as its sister lesson on adding tens does.
{
  const f = 'frontend/content/teaching-graph/tools.json'; const raw = read(f); const j = JSON.parse(raw);
  const add = { 'choral-counting': ['K:count-forward-missing'], 'number-balance': ['1:fact-families'] };   // the balance shows 2 + 5 = 5 + 2; the point had no tool, so its lessons of today are pinned to none below
  for (const [k, ps] of Object.entries(add)) for (const p of ps) if (!j.tools[k].points.includes(p)) j.tools[k].points.push(p);
  const first = (p) => Object.keys(j.tools).find((k) => j.tools[k].points.includes(p));
  for (const [p, t] of [['1:mental-math-to-100', 'open-number-line']]) if (first(p) !== t) throw new Error(p + ': the first tool is now ' + first(p));
  writeJsonLike(f, raw, j);
}

// 2. the units
const place = (loc, lessonsWord, work) => {
  const f = 'frontend/content/units/defs/' + loc + '.json'; const raw = read(f); const defs = JSON.parse(raw);
  const unit = (id) => { const u = defs.units.find((x) => x.id === id); if (!u) throw new Error(loc + ': no unit ' + id); return u; };
  const keyOf = (l) => l.id || l.point;
  const all = new Set(defs.units.flatMap((u) => u.lessons.map(keyOf)));
  const fresh = (L) => { if (all.has(keyOf(L))) throw new Error(loc + ': ' + keyOf(L) + ' is placed already: this script ran before'); all.add(keyOf(L)); return L; };
  /** after = the key of the lesson it follows; null = the first lesson of the unit; 'END' = the last */
  const put = (u, after, L) => {
    fresh(L);
    const i = after === null ? 0 : after === 'END' ? u.lessons.length : u.lessons.findIndex((x) => keyOf(x) === after) + 1;
    if (after !== null && after !== 'END' && i === 0) throw new Error(u.id + ' has no lesson ' + after);
    u.lessons.splice(i, 0, L);
  };
  const says = (u, count, text) => {
    u.metaDescription = text;
    if (!text.includes(count + ' ' + lessonsWord)) throw new Error(u.id + ': the description does not say ' + count + ' ' + lessonsWord);
    if (u.lessons.length !== count) throw new Error(u.id + ' has ' + u.lessons.length + ' lessons, the description says ' + count);
    if (text.length < 110 || text.length > 200) throw new Error(u.id + ': a description of ' + text.length + ' characters');
  };
  for (const [uid, key] of PINS[loc] || []) { const l = unit(uid).lessons.find((x) => keyOf(x) === key); if (!l) throw new Error(loc + ': no lesson ' + key); if (!('tool' in l)) l.tool = null; }
  work({ unit, put, says });
  writeJsonLike(f, raw, defs);
  console.log(loc + ': ' + defs.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons in ' + defs.units.length + ' units');
};

// pins: a fact-family lesson of today keeps showing no tool now that the number balance models its point
const PINS = { en: [['g1-add-subtract-within-10', '1:fact-families']], de: [['de1-aufgabenfamilien-rechengeschichten', '1:fact-families']], sv: [['sv-1-ma-talkamrater', '1:fact-families'], ['sv-1-ma-add-sub-0-20', '1:fact-families#talfamiljer-till-20']] };

place('en', 'lessons', ({ unit, put, says }) => {
  {
    const u = unit('k-putting-together-number-bonds');
    put(u, 'K:number-bonds-k', { point: 'K:number-bonds-k', id: 'K:number-bonds-k#take-apart-6-and-7', types: ['K-636'], tool: 'part-whole-frame', activity: null, standards: ['K.OA.A.3'] });
    says(u, 8, 'A three-week Kindergarten math unit: 8 lessons on number bonds to 10, taking apart 6 to 9, and the partners of 10, with a first look at partners of 20.');
  }
  {
    const u = unit('k-teen-numbers-and-counting-to-100');
    put(u, 'K:teen-numbers', { point: 'K:teen-numbers', id: 'K:teen-numbers#build-and-draw-a-teen-number', types: ['K-637'], tool: 'ten-frame', activity: null, standards: ['K.NBT.A.1'] });
    put(u, 'K:teen-numbers#build-and-draw-a-teen-number', { point: 'K:teen-numbers', id: 'K:teen-numbers#ten-and-how-many-more', types: ['K-634'], tool: 'counting-cups', activity: null, standards: ['K.NBT.A.1'] });
    put(u, 'K:teen-numbers#ten-and-how-many-more', { point: '1:hundreds-chart', id: '1:hundreds-chart#count-to-50', types: ['K-633'], tool: 'number-hotel', activity: null, standards: ['K.CC.A.1'] });
    put(u, '1:hundreds-chart#count-to-100', { point: 'K:count-forward-missing', id: 'K:count-forward-missing#start-at-any-number', types: ['K-632'], tool: 'choral-counting', activity: null, standards: ['K.CC.A.2'] });
    says(u, 8, 'A two-week Kindergarten math unit: 8 lessons on teen numbers as ten and some more, counting to 50 and to 100, counting on from any number, and counting by tens.');
  }
  {
    const u = unit('g1-tens-and-ones');
    put(u, null, { point: '1:tens-and-ones', id: '1:tens-and-ones#teen-numbers-one-ten-and-some-ones', types: ['G1-564'], tool: 'place-value-lab', activity: null, standards: ['1.NBT.B.2'] });
    put(u, '1:tens-and-ones#teen-numbers-one-ten-and-some-ones', { point: '1:tens-and-ones', id: '1:tens-and-ones#count-the-tens', types: ['G1-563'], tool: 'place-value-lab', activity: null, standards: ['1.NBT.B.2'] });
    says(u, 6, 'A two-week Grade 1 math unit: 6 lessons on teen numbers, counting tens, tens and ones, number words, comparing two-digit numbers, and the number of the day.');
  }
  {
    const u = unit('g1-adding-within-100');
    put(u, '1:mental-math-to-100', { point: '1:mental-math-to-100', id: '1:mental-math-to-100#subtract-tens-from-tens', types: ['G1-565'], tool: 'number-hotel', activity: null, standards: ['1.NBT.C.6'] });
    says(u, 5, 'A two-week Grade 1 math unit: 5 lessons on adding tens, subtracting tens, adding ones with and without a new ten, and adding two-digit numbers with rods and cubes.');
  }
  {
    const u = unit('g2-add-subtract-within-1000');
    put(u, '2:subtract-with-blocks', { point: '2:column-method', id: '2:column-method#subtract-three-digit-numbers', types: ['G2-502'], tool: 'exchange-machine', activity: null, standards: ['2.NBT.B.7'] });
    says(u, 5, 'A three-week Grade 2 math unit: 5 lessons on adding and subtracting three-digit numbers with blocks and in columns, with a new ten or hundred and across zeros.');
  }
});

place('de', 'Stunden', ({ unit, put, says }) => {
  {
    const u = unit('de1-zahlen-bis-10');
    put(u, 'END', { point: 'K:number-bonds-k', types: ['K-635'], tool: 'part-whole-frame', activity: null });
    put(u, 'K:number-bonds-k', { point: 'K:number-bonds-k', id: 'K:number-bonds-k#zahlenhaeuser', types: ['K-456', 'K-638'], exitType: 'K-638', tool: 'part-whole-frame', activity: null });
    says(u, 8, 'Vier Wochen Mathe Klasse 1: 8 Stunden zum Zählen und Ziffernschreiben bis 10, zum Vergleichen und Ordnen und zum Zerlegen mit Schüttelbox und Zahlenhaus.');
  }
  {
    const u = unit('g1-add-subtract-within-10');
    put(u, '1:add-within-10-models', { point: '1:fact-families', id: '1:fact-families#tauschaufgaben', types: ['G1-562'], tool: 'number-balance', activity: null });
    says(u, 5, 'Zwei Wochen Mathe Klasse 1: 5 Stunden zum Dazutun und Wegnehmen bis 10, zu Tauschaufgaben, zu den verliebten Zahlen und zum Hüpfen am Zahlenstrahl.');
  }
  {
    const u = unit('g1-doubles-three-addends-number-walls');
    put(u, null, { point: '1:fluency-within-20', id: '1:fluency-within-20#kleine-aufgabe-grosse-aufgabe', types: ['G1-561'], tool: 'rekenrek', activity: null });
    says(u, 5, 'Drei Wochen Mathe Klasse 1: 5 Stunden zu kleinen und großen Aufgaben bis 20, zum Verdoppeln und Halbieren, zu drei Summanden und zu Zahlenmauern.');
  }
});

place('sv', 'lektioner', ({ unit, put, says }) => {
  const u = unit('sv-1-ma-add-sub-0-20');
  put(u, null, { point: '1:fluency-within-20', id: '1:fluency-within-20#samma-ental-en-tia-till', types: ['G1-561'], tool: 'rekenrek', activity: null });
  says(u, 6, 'Lektionsplanering i matematik för åk 1, ”Addition och subtraktion 0–20”: 6 lektioner om samma ental med en tia till, dubblor, tiotalsövergång och talfamiljer.');
});
