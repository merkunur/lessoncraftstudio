#!/usr/bin/env node
/**
 * Stage E-0 (2026-11-25): three of the five English design rows that waited until a unit's description could change.
 * Operator ruling 2026-11-25: a lesson goes into the unit the year design gives it, and that unit's description gets the
 * new lesson count (count only; titles stay).
 *   k-short-vowels-and-cvc-words           + K:vowels-consonants (K-230) and K:read-decodable-text (the
 *                                             Set 5 books of K-628: all five short vowels): 5 -> 7 lessons
 *   g2-reading-to-learn-informational-texts + 2:mystery-animal (G2-343): 5 -> 6 lessons
 * Where they go: every unit check, check of the year and placement check names lessons by number. The two Kindergarten
 * lessons go at the END (inserted first they renumber lessons named by a check of the year and two placement checks);
 * vowels and consonants then names what the five short-vowel lessons taught. The mystery animal goes FIRST, as the design
 * has it: at the end it is taught on class day 98, after the middle-of-year sub day g2-middle-1 (day 90) that reviews it;
 * the two checks of the year that name this unit's lessons get their numbers moved up by one (year/en.json).
 * Standards (the reviewer of 2026-11-25): vowels and consonants comes after the lessons that teach RF.K.3.b, and the
 * mystery animal works the Grade 1 objective L.1.5.b in Grade 2, so both show their row as reviewed, not prepared.
 * The two other rows (K "Walk, march, tiptoe" L.K.5.d; G1 "Book talk" SL.1.1.a) wait for a page: they are teacher-led
 * and nothing else models them (scripts/units/notes/en-literacy-e0.js).
 *
 *   node scripts/units/year/place-ready-e0.en.literacy.js      (refuses to run twice; it checks everything before it writes)
 * Then: notes/apply.js · assemble --loc=en · apply-pacing-to-defs · build-guide · build-checks for the two units
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const PLACE = [
  { unit: 'k-short-vowels-and-cvc-words', from: '5 lessons', to: '7 lessons', first: [],
    last: [{ point: 'K:vowels-consonants', types: ['K-230'], standards: ['RF.K.3.b'], standardsRel: { 'RF.K.3.b': 'reviews' } }, { point: 'K:read-decodable-text', types: ['K-628'], titles: { 'K-628': 'A Little Book to Fold and Read' },
      prefer: ['readers-k628-tedinbed', 'readers-k628-tenredhens', 'readers-k628-theredbug'] }] },
  { unit: 'g2-reading-to-learn-informational-texts', from: '5 lessons', to: '6 lessons',
    first: [{ point: '2:mystery-animal', types: ['G2-343'], standards: ['L.1.5.b'], standardsRel: { 'L.1.5.b': 'reviews' } }], last: [] },
];
const notes = require(file('scripts/units/notes/en-literacy-e0.js')).points;
const pts = new Map(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => [p.id, p]));
const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
const placed = new Set(defs.units.flatMap((u) => u.lessons.map((l) => l.id || l.point)));
for (const p of PLACE) {
  const u = defs.units.find((x) => x.id === p.unit);
  if (!u) throw new Error('no unit ' + p.unit);
  const n = (u.metaDescription.match(new RegExp(p.from, 'g')) || []).length;
  if (n !== 1) throw new Error(p.unit + ': the description does not name "' + p.from + '" once (this script ran before?)');
  for (const L of [...p.first, ...p.last]) {
    if (placed.has(L.point)) throw new Error(L.point + ' already sits in a unit');
    const pt = pts.get(L.point);
    if (!pt) throw new Error('no teaching point ' + L.point);
    for (const t of L.types) if (!pt.types.includes(t)) throw new Error(t + ' is not a type of ' + L.point);
    if (!notes[L.point] || !notes[L.point].routine) throw new Error('no note with a routine for ' + L.point);
  }
  u.lessons.unshift(...p.first);
  u.lessons.push(...p.last);
  u.metaDescription = u.metaDescription.replace(p.from, p.to);
  if (u.metaDescription.length > 170) throw new Error(p.unit + ': description of ' + u.metaDescription.length + ' characters');
  console.log(p.unit + ': ' + u.lessons.length + ' lessons; ' + u.metaDescription);
}
fs.writeFileSync(file(f), jsonLike(raw, defs));
