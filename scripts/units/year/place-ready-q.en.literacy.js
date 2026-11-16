#!/usr/bin/env node
/**
 * Part 12.3, English literacy, seventeenth run (2026-11-17): three lessons on EXISTING maker page types, published as
 * lesson pages with "Year pages, literacy Q" (wave ylq) after their templates were corrected (e1aedac7f).
 *
 *   Kindergarten, Words and Sentences (then 5 lessons, as the design has it)
 *     In, on top of, under, next to    K-548 Choose the Position Word, K-546 Read and Draw   NEW point K:place-words   L.K.1.e
 *                                      + Bramble's Parking Tower (screen); second lesson of the unit
 *   Grade 1, Long Vowels: Silent e and Vowel Teams (then 5 lessons, as the design has it)
 *     Long or short vowel?             G1-495 Long or Short Vowel?   NEW point 1:long-or-short-vowel   RF.1.2.a
 *                                      + Stretch the Giraffe (screen); second lesson of the unit
 *   Grade 1, Digraphs and Blends
 *     Blends at the start              gets G1-493 Blends as its second page (point 1:blends-start)
 *
 * K-548 and K-546 leave the mathematics point K:position-words (its lesson uses K-064 and K-065 and keeps them);
 * G1-495 leaves K:sound-position, G1-493 leaves 1:digraphs. Texas rows for the two new points; every other curriculum:
 * not yet read. The two teacher notes and the sentence added to the blends note were read by a US Kindergarten and
 * Grade 1 teacher (2026-11-17, every finding applied).
 *
 *   node scripts/units/year/place-ready-q.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing · assemble ·
 *       build-guide --unit (three units) · build-year-plan (plan-k-literacy, plan-1-literacy) · build-looks
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
const NOTES_IN = process.argv[2];
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-q.en.literacy.js <notes.json> (two reviewed teacher notes and the sentence for the blends note)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [   // the two NEW points
  { tp: 'K:place-words', grade: 'K', strand: 'Language', code: 'L.K.1.e', types: ['K-548', 'K-546'], activities: ['parking-tower.place-by-relation.k-g-a-1'],
    skill: 'Use the place words in, on top of, under, next to, above, between, behind, and in front of to tell where a thing is',
    unit: 'k-words-and-sentences', after: 'K:naming-and-action-words', designUnit: 'new:words-and-sentences-k', design: 'In, on, under, next to',
    notesFile: 'scripts/units/notes/en-literacy-yeark.js',
    tx: [['ELAR.K.10.D.v', 'teaches']], txWhy: 'Texas states grammar and conventions inside the editing expectation of kindergarten; choosing and using in, on top of, under, next to and the other place words in a sentence is the convention «prepositions».',
    was: /4 lessons on naming and action words, a capital at the start/, desc: 'A Kindergarten unit on words and sentences: 5 lessons on naming and action words, place words, a capital at the start, the end mark, and longer sentences.' },
  { tp: '1:long-or-short-vowel', grade: '1', strand: 'Foundational Skills', code: 'RF.1.2.a', types: ['G1-495'], activities: ['stretch-giraffe.long-short-vowel.rf-1-2-a'],
    skill: 'Hear whether the vowel sound of a one-syllable word is long or short',
    unit: 'g1-long-vowels-silent-e-and-vowel-teams', after: '1:silent-e', designUnit: 'new:long-vowels-g1', design: 'Long or short vowel?',
    notesFile: 'scripts/units/notes/en-literacy-year1.js',
    tx: [['ELAR.1.2.A.iii', 'teaches']], txWhy: 'Saying a one-syllable word and marking its vowel sound long or short is «distinguishing between long and short vowel sounds in one-syllable words».',
    was: /4 lessons on silent e and the vowel teams/, desc: 'A Grade 1 phonics unit on long vowels: 5 lessons on silent e, long and short vowel sounds, and the vowel teams ai and ay, ee and ea, oa and ow.' },
];
const ADDED = { tp: '1:blends-start', type: 'G1-493', unit: 'g1-digraphs-and-blends', notesFile: 'scripts/units/notes/en-literacy-year1.js', key: '1:blends-start+' };

// ---- everything is read and checked first
for (const p of POINTS) {
  if (p.desc.length < 110 || p.desc.length > 170) throw new Error('description of ' + p.unit + ': ' + p.desc.length + ' characters');
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)');
}
const MORE = NOTES[ADDED.key]; if (!MORE || !MORE.startsWith(' ') || MORE.length < 60) throw new Error('no sentence for the blends note (key ' + ADDED.key + ', starting with a space)');
const out = new Map();   // file -> text (a file may be changed more than once)
const cur = (f) => (out.has(f) ? out.get(f) : read(f));
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill, activities: p.activities }); }
  out.set(f, jsonLike(raw, j));
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { const list = j.subjects.literacy[p.grade]; const at = list.indexOf(p.after); if (at < 0) throw new Error('order: no ' + p.after); list.splice(at + 1, 0, p.tp); }
  out.set(f, jsonLike(raw, j));
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  // these four types are makers' templates: the file listed them under the point of their family; they move
  const FROM = { 'K-548': 'K:position-words', 'K-546': 'K:position-words', 'G1-495': 'K:sound-position', 'G1-493': '1:digraphs' };
  for (const [type, tp] of [...POINTS.flatMap((p) => p.types.map((t) => [t, p.tp])), [ADDED.type, ADDED.tp]]) { if (j.types[type] !== FROM[type]) throw new Error(type + ' sits under ' + j.types[type] + ', not under ' + FROM[type] + ': this script ran before, or the file changed'); j.types[type] = tp; }
  out.set(f, jsonLike(raw, j));
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-17' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for an English literacy lesson (Part 12.3) on a page type that exists in this language too; no unit of this language teaches the point yet. Read it against the wording when the literacy units of this language are designed.', review: 'year-design 2026-11-17' };
  }
  out.set(f, jsonLike(raw, j));
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  for (const p of POINTS) {
    const u = defs.units.find((x) => x.id === p.unit); if (!u) throw new Error('no unit ' + p.unit);
    if (u.lessons.some((l) => l.point === p.tp)) throw new Error(p.tp + ' is in ' + p.unit + ' already');
    const at = u.lessons.findIndex((l) => l.point === p.after); if (at < 0) throw new Error(p.unit + ' has no lesson ' + p.after);
    if (!p.was.test(u.metaDescription)) throw new Error('the description of ' + p.unit + ' is not the one this script replaces: ' + u.metaDescription);
    u.lessons.splice(at + 1, 0, { point: p.tp, types: p.types });
    u.metaDescription = p.desc;
    console.log('to place: lesson ' + (at + 2) + ' of ' + p.unit + ' (' + u.lessons.length + ' lessons)');
  }
  const u = defs.units.find((x) => x.id === ADDED.unit); if (!u) throw new Error('no unit ' + ADDED.unit);
  const l = u.lessons.find((x) => x.point === ADDED.tp); if (!l) throw new Error(ADDED.unit + ' has no lesson ' + ADDED.tp);
  if (l.types.includes(ADDED.type)) throw new Error(ADDED.type + ' is in the lesson already');
  l.types = [...l.types, ADDED.type];
  out.set(f, jsonLike(raw, defs));
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { const p = POINTS.find((x) => x.designUnit === o.id); if (p && o.lessons) { for (const l of o.lessons) if (l.title === p.design) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = p.tp; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.set(f, jsonLike(raw, design));
}
const BS = String.fromCharCode(92);
const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
for (const p of POINTS) {
  const f = p.notesFile, raw = cur(f); let s = raw.replace(/\r\n/g, '\n');
  if (s.includes("'" + p.tp + "'")) throw new Error('the note of ' + p.tp + ' is in ' + f + ' already');
  const n = NOTES[p.tp];
  const block = `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`;
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The note of ' + p.tp + ' (' + p.types.join(', ') + ') was added by place-ready-q.en.literacy.js; a US teacher read it\n * (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.set(f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s);
}
{
  // one sentence more in the note of the blends lesson: its second page
  const f = ADDED.notesFile, raw = cur(f); const s = raw.replace(/\r\n/g, '\n');
  const a = s.indexOf("    '" + ADDED.tp + "': {\n"); if (a < 0) throw new Error(f + ': no note of ' + ADDED.tp);
  const w = s.indexOf('\n        words: ', a), e = s.indexOf('\n', w + 1); if (w < 0 || e < 0) throw new Error(f + ': the note of ' + ADDED.tp + ' has no words line');
  const line = s.slice(w, e); if (!line.endsWith("',")) throw new Error(f + ': the words line of ' + ADDED.tp + ' does not end as expected');
  if (line.includes('The page Blends')) throw new Error('the blends note names its second page already');
  const add = MORE.split(BS).join(BS + BS).split("'").join(BS + "'");
  const next = s.slice(0, e - 2) + add + s.slice(e - 2);
  out.set(f, raw.includes('\r\n') ? next.replace(/\n/g, '\r\n') : next);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; ' + ADDED.type + ' on ' + ADDED.tp + '; lessons placed; notes written; design marked');
