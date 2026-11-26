#!/usr/bin/env node
/**
 * Daily Teaching System, Stage E-3 (2026-11-26): the fourteen teaching points of the German and Swedish mathematics
 * pages that Stage E-2 built, before their lessons are placed (place-ready-stage-e3.math.js):
 *
 *   de  3:mental-math-hundreds-tens   G3-633 Rechnen mit Hunderter- und Zehnerzahlen
 *       3:multiply-multiples-of-10    G3-635 Einmaleins mit Zehnerzahlen
 *       3:multiply-in-steps           G3-636 Halbschriftlich multiplizieren
 *       3:divide-in-steps             G3-637 Halbschriftlich dividieren
 *       3:kilometres-and-metres       G3-639 Meter und Kilometer
 *       3:comma-notation-money-length G3-640 Mit Komma schreiben: Euro und Cent, Meter und Zentimeter
 *       3:circles-with-compass        G3-644 Mit dem Zirkel zeichnen
 *       3:count-all-possibilities     G3-646 Alle Möglichkeiten finden: Tabelle und Baumdiagramm
 *   sv  K:compare-capacity            K-727  Vad rymmer mest?
 *       1:units-give-different-numbers G1-676 Olika enheter ger olika tal
 *       3:historical-numerals         G3-647 Talsymboler förr och nu
 *       3:add-sub-by-place-value      G3-649 Skriftlig huvudräkning med mellanled
 *       3:old-body-measures           G3-650 Äldre mått: tum, fot, aln och famn
 *       3:proportional-tables         G3-651 Proportionella samband
 *
 * The curriculum rows were read against the wording by the German and the Swedish writer of the lessons' teacher notes
 * (de, de-by, de-nw, de-sn; sv) and are kept in scripts/units/year/crosswalk-e3.math.json; the same file replaces the
 * "not yet read" of three points that German and Swedish units teach from now on (2:explain-strategies and
 * 2:estimate-lengths in de-by, de-nw and de-sn; K:place-words in sv). Every other curriculum gets "not yet read against
 * this curriculum": no unit of its language teaches these points yet.
 * A tool models a new point where the lesson uses it: the Stellenwert-Labor (hundreds and tens, multiples of ten, place
 * by place), the Brötchenblech (multiplying in steps), the Geldmatte (comma notation of money), the Enhetsremsan (two
 * units; old body measures) and the Mätbänken (capacity). The points are new, so no lesson of today changes its tool.
 *
 *   node scripts/units/year/add-points-e3.math.js      (refuses to run twice)
 * Then: node scripts/teaching-graph/build-points.js · every scripts/curricula/build-<x>.js · place-ready-stage-e3.math.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {   // keeps the file's indent and line ends
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const NBT = 'Number & Operations in Base Ten', MD = 'Measurement & Data', OA = 'Operations & Algebraic Thinking', G = 'Geometry';
// after = the point of order.json it follows in its grade
const POINTS = [
  { tp: '3:mental-math-hundreds-tens', grade: '3', strand: NBT, code: '3.NBT.A.2', types: ['G3-633'], after: '3:rounding', loc: 'de',
    skill: 'Add and subtract hundreds and tens in the head by analogy with the small fact (3 + 4 = 7, so 30 + 40 = 70 and 300 + 400 = 700), within 1000' },
  { tp: '3:add-sub-by-place-value', grade: '3', strand: NBT, code: '3.NBT.A.2', types: ['G3-649'], after: '3:mental-math-hundreds-tens', loc: 'sv',
    skill: 'Add and subtract three-digit numbers in a row, place by place, writing the steps (347 + 225 = 500 + 60 + 12 = 572)' },
  { tp: '3:historical-numerals', grade: '3', strand: NBT, code: 'READINESS:historical-numerals', types: ['G3-647'], after: '3:compare-4-digit', loc: 'sv',
    skill: 'Read and write numbers with Egyptian number symbols and Roman numerals to 30, and compare them with place value, where the place of a digit sets its value' },
  { tp: '3:multiply-multiples-of-10', grade: '3', strand: NBT, code: '3.NBT.A.3', types: ['G3-635'], after: '3:times-tables', loc: 'de',
    skill: 'Multiply a one-digit number by a multiple of 10 and divide a multiple of 10 by a one-digit number from a times-table fact (3 · 40 = 120, 240 : 6 = 40)' },
  { tp: '3:multiply-in-steps', grade: '3', strand: NBT, code: '4.NBT.B.5 (grade 3 in KMK)', types: ['G3-636'], after: '3:multiply-multiples-of-10', loc: 'de',
    skill: 'Multiply a two-digit number by a one-digit number in steps: the tens, the ones, then add (4 · 37 = 4 · 30 + 4 · 7)' },
  { tp: '3:divide-in-steps', grade: '3', strand: NBT, code: '4.NBT.B.6 (grade 3 in KMK)', types: ['G3-637'], after: '3:mult-div-relationship', loc: 'de',
    skill: 'Divide a two-digit number by a one-digit number in steps: split it into numbers the divisor goes into (84 : 4 = 80 : 4 + 4 : 4)' },
  { tp: '3:proportional-tables', grade: '3', strand: OA, code: '4.OA.A.2 (grade 3 in Lgr22)', types: ['G3-651'], after: '3:input-output', loc: 'sv',
    skill: 'Complete two-row tables of proportional relations (twice as many, twice as much; half as many, half as much) and say the relation in words' },
  { tp: '3:kilometres-and-metres', grade: '3', strand: MD, code: '4.MD.A.1 (grade 3 in KMK)', types: ['G3-639'], after: '3:thermometer', loc: 'de',
    skill: 'Know that 1 km = 1000 m, picture a kilometre as ten times 100 m, and find how many metres are missing to 1 km' },
  { tp: '3:comma-notation-money-length', grade: '3', strand: MD, code: '4.MD.A.2 (grade 3 in KMK)', types: ['G3-640'], after: '3:kilometres-and-metres', loc: 'de',
    skill: 'Write euros and cents and metres and centimetres with a decimal comma and change between the two ways (3,45 € = 3 € 45 ct, 1,20 m = 1 m 20 cm)' },
  { tp: '3:old-body-measures', grade: '3', strand: MD, code: 'READINESS:historical-measures', types: ['G3-650'], after: '3:comma-notation-money-length', loc: 'sv',
    skill: 'Measure with old body measures (inch, foot, ell, fathom), compare the numbers different bodies give, and say why standard units were agreed' },
  { tp: '3:circles-with-compass', grade: '3', strand: G, code: 'READINESS:circles', types: ['G3-644'], after: '3:symmetry', loc: 'de',
    skill: 'Draw circles with a compass from a given radius or diameter, mark the centre and the radius, and draw circle patterns' },
  { tp: '3:count-all-possibilities', grade: '3', strand: MD, code: 'READINESS:combinatorics', types: ['G3-646'], after: '3:line-plot-halves', loc: 'de',
    skill: 'Find every possibility of a simple combination (outfits, scoops of ice cream) in a table or a tree diagram and count them' },
  { tp: 'K:compare-capacity', grade: 'K', strand: MD, code: 'K.MD.A.2', types: ['K-727'], after: 'K:heavy-light', loc: 'sv',
    skill: 'Compare how much containers hold: say which of two holds the most, order three, and count how many cups fill a jar' },
  { tp: '1:units-give-different-numbers', grade: '1', strand: MD, code: '2.MD.A.2 (G1 readiness)', types: ['G1-676'], after: '1:measure-length-units', loc: 'sv',
    skill: 'Measure the same object with two units and explain why the smaller unit gives the larger number' },
];
const TOOLS = { 'place-value-lab': ['3:mental-math-hundreds-tens', '3:multiply-multiples-of-10', '3:add-sub-by-place-value'], 'baking-tray': ['3:multiply-in-steps'], 'money-mat': ['3:comma-notation-money-length'], 'unit-handle': ['1:units-give-different-numbers', '3:old-body-measures'], 'measurement-bench': ['K:compare-capacity'] };
const ROWS = JSON.parse(read('scripts/units/year/crosswalk-e3.math.json'));   // { curriculum: { point: entry } }
const GAPS = { 'de-by': ['2:explain-strategies', '2:estimate-lengths'], 'de-nw': ['2:explain-strategies', '2:estimate-lengths'], 'de-sn': ['2:explain-strategies', '2:estimate-lengths'], sv: ['K:place-words'] };
const UNREAD = 'not yet read against this curriculum';

// ---- everything is read and checked first
const out = [];   // [file, text]
const existing = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (existing.has(p.tp) || j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) {
    const list = j.subjects.math[p.grade]; if (!Array.isArray(list)) throw new Error('order: no math list of grade ' + p.grade);
    const i = list.indexOf(p.after); if (i < 0) throw new Error('order: grade ' + p.grade + ' has no ' + p.after);
    list.splice(i + 1, 0, p.tp);
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/tools.json', raw = read(f), j = JSON.parse(raw);
  for (const [k, ps] of Object.entries(TOOLS)) { if (!j.tools[k]) throw new Error('no tool ' + k); for (const p of ps) { if (j.tools[k].points.includes(p)) throw new Error(k + ' models ' + p + ' already'); j.tools[k].points.push(p); } }
  out.push([f, jsonLike(raw, j)]);
}
const curricula = fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)));
for (const c of Object.keys(ROWS).filter((k) => !k.startsWith('$'))) if (!curricula.includes(c)) throw new Error('crosswalk-e3: no curriculum ' + c);
for (const c of curricula) {
  const f = `frontend/content/curricula/${c}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  const fw = JSON.parse(read(`frontend/content/curricula/${c}/framework.json`));
  const ids = new Set(JSON.stringify(fw).match(/"id":\s*"[^"]+"/g).map((x) => x.replace(/"id":\s*"/, '').slice(0, -1)));
  const given = ROWS[c] || {};
  const check = (tp, e) => {
    if (!e || (!e.rows && !e.none) || !e.why || !e.review) throw new Error(c + ' ' + tp + ': an entry needs rows or none, why and review');
    for (const r of e.rows || []) { if (!ids.has(r.id)) throw new Error(c + ' ' + tp + ': ' + r.id + ' is not in framework.json'); if (!['teaches', 'prepares', 'extends'].includes(r.rel)) throw new Error(c + ' ' + tp + ': rel ' + r.rel); }
  };
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(c + ': ' + p.tp + ' is authored already');
    const lang = c.slice(0, 2);
    if (lang === p.loc) { if (!given[p.tp]) throw new Error(c + ': no rows for ' + p.tp + ' in crosswalk-e3.math.json'); check(p.tp, given[p.tp]); holder[p.tp] = given[p.tp]; }
    else holder[p.tp] = { none: UNREAD, why: 'The point was added on 2026-11-26 for the ' + (p.loc === 'de' ? 'German' : 'Swedish') + ' year design of mathematics (Stage E-3); no unit of this language teaches it yet. Read it against the wording when one does.', review: 'year-design 2026-11-26' };
  }
  for (const tp of GAPS[c] || []) {
    if (!holder[tp] || holder[tp].none !== UNREAD) throw new Error(c + ': ' + tp + ' is no longer "' + UNREAD + '"');
    if (!given[tp]) throw new Error(c + ': no rows for ' + tp + ' in crosswalk-e3.math.json');
    check(tp, given[tp]); holder[tp] = given[tp];
  }
  for (const tp of Object.keys(given)) if (!POINTS.some((p) => p.tp === tp) && !(GAPS[c] || []).includes(tp)) throw new Error(c + ': crosswalk-e3 names ' + tp + ', which this script does not write');
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.length + ' (' + POINTS.map((p) => p.tp).join(', ') + '); curricula: ' + curricula.length);
