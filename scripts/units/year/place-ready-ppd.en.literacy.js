#!/usr/bin/env node
/**
 * Part 12.3, English literacy, forty-third run (2026-11-17): one Grade 1 lesson on the two page types of
 * types/_shared/sound-position-g1.js. It joins the live unit Sounds and Short-Vowel Words right after its lesson on
 * sound boxes, as the year design has it.
 *
 *   First, middle, or last sound?   G1-624, G1-625   NEW 1:first-middle-last-sound   RF.1.2.c
 *
 * Unit order after this run: rhyming · word families · sound boxes · first, middle, or last sound · spelling picture
 * words. The year design has sound boxes before word families; the live order of those two is kept. The one screen
 * activity on the place of a sound, Coco's Sound Boxes, is aligned to Kindergarten (RF.K.2.d): none is placed here.
 * Texas rows for the new point; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-ppd.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-checks --unit · build-guide --unit · build-year-plan --plan=plan-1-literacy · build-looks
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
const NF = process.argv[2];
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-ppd.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");   // the notes of this folder use straight apostrophes
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const UNIT = "g1-sounds-spelling-syllables";
const GRADE = "1";
const POINTS = [
  {"tp":"1:first-middle-last-sound","code":"RF.1.2.c","strand":"Phonological Awareness","types":["G1-624","G1-625"],"design":"First, middle, or last sound?","after":"1:phoneme-boxes","orderAfter":"1:phoneme-boxes","skill":"Say the first, middle, and last sound of a spoken one-syllable word and mark where a given sound is heard","tx":[["ELAR.1.2.A.vii","teaches"],["ELAR.1.2.A.ii","teaches"]],"txWhy":"Texas Grade 1 has no separate expectation for isolating the first, middle, or last sound. Saying each sound of a picture word and touching a box for it is «segmenting spoken one-syllable words of three to five phonemes into individual phonemes, including words with initial and/or final consonant blends»; finding two words that begin with the same sound is «recognizing spoken alliteration or groups of words that begin with the same spoken onset or initial sound». The middle and the last place go one step further than the Texas wording."},
];
const MAX = 1480;   // two page types per lesson
const OLD_RE = /^A Grade 1 unit on short-vowel words: 4 lessons/;
const NEW_DESCRIPTION = "A Grade 1 unit on short-vowel words: 5 lessons on rhymes, word families, sound boxes, first, middle, and last sounds, and spelling picture words, with pages to print.";
const NEW_META_TITLE = null;
const FINAL_ORDER = null;   // the order of the unit's lessons after this run (null: only the new lessons are put in)
const DESIGN_UNIT = "g1-sounds-spelling-syllables";
const NOTES_FILE = "scripts/units/notes/en-literacy-year1.js";

// ---- everything is read and checked first
if (NEW_DESCRIPTION.length < 110 || NEW_DESCRIPTION.length > 170) throw new Error('description: ' + NEW_DESCRIPTION.length + ' characters');
if (NEW_META_TITLE && NEW_META_TITLE.length > 60) throw new Error('meta title: ' + NEW_META_TITLE.length);
for (const p of POINTS) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  for (const k of ['title', 'objective', 'mistake', 'words', 'watch']) n[k] = straight(n[k]);
  if (/\bfree\b|Premium/i.test(n.title + n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' says free or Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > MAX) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + MAX + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  const all = JSON.parse(read('frontend/content/teaching-graph/points.json')); const allPts = Array.isArray(all.points || all) ? (all.points || all) : Object.values(all.points || all);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp) || allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: GRADE, strand: p.strand || (p.code.startsWith('RF') ? 'Foundational Skills' : 'Language'), code: p.code, skill: p.skill }, p.activities ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy[GRADE];
  for (const p of POINTS) { const at = list.indexOf(p.orderAfter); if (at < 0) throw new Error('order: no ' + p.orderAfter); list.splice(at + 1, 0, p.tp); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) for (const type of p.types) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-17' }
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the English phonological awareness of Grade 1 (Part 12.3: the first, middle, and last sound of a spoken one-syllable word); the skill is not bound to English, but the words are. Read it against the wording when the sound units of this language are designed.", review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  const unit = defs.units.find((x) => x.id === UNIT); if (!unit) throw new Error('no unit ' + UNIT);
  if (OLD_RE && !OLD_RE.test(unit.metaDescription)) throw new Error('the description of ' + UNIT + ' is not the one this script replaces: ' + unit.metaDescription);
  for (const p of POINTS) if (unit.lessons.some((l) => l.point === p.tp)) throw new Error(p.tp + ' is in the unit already');
  for (const p of POINTS) { const at = unit.lessons.findIndex((l) => l.point === p.after); if (at < 0) throw new Error(UNIT + ' has no lesson ' + p.after); unit.lessons.splice(at + 1, 0, { point: p.tp, types: p.types }); }
  if (FINAL_ORDER) {
    if (FINAL_ORDER.length !== unit.lessons.length || FINAL_ORDER.some((tp) => !unit.lessons.some((l) => l.point === tp))) throw new Error('the final order does not name the lessons of ' + UNIT + ': ' + unit.lessons.map((l) => l.point).join(', '));
    unit.lessons = FINAL_ORDER.map((tp) => unit.lessons.find((l) => l.point === tp));
  }
  if (NEW_META_TITLE) unit.metaTitle = NEW_META_TITLE;
  unit.metaDescription = NEW_DESCRIPTION;
  out.push([f, jsonLike(raw, defs)]);
  console.log(UNIT + ': ' + unit.lessons.map((l) => l.point).join(' · '));
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) { const p = POINTS.find((x) => x.design === l.title); if (p) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = p.tp; marked++; } } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const raw = read(NOTES_FILE); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the lessons is in ' + NOTES_FILE + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(NOTES_FILE + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(NOTES_FILE + ': no place for the head line');
  s = s.replace(head, () => ' * The note on the first, middle, or last sound (G1-624, G1-625) was added by place-ready-ppd.en.literacy.js;\n * the reviewer of the pages read it (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; lessons placed in ' + UNIT + '; notes written; design marked');
