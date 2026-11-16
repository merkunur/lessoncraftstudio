#!/usr/bin/env node
/**
 * Part 12.3, English literacy, nineteenth run (2026-11-18): the Kindergarten unit Short Vowels and CVC Words on the four
 * Kindergarten page types of "Year pages, literacy T" (types/_shared/cvc-k.js).
 *
 *   Short Vowels and CVC Words (NEW unit, after First Words to Read, as the year design has it)
 *     Short a and short i                     K-661 + Build the CVC Word (screen)     NEW K:short-a-i               RF.K.3.b
 *     Short o, short u, and short e           K-662 + Build the CVC Word (screen)     NEW K:short-o-u-e             RF.K.3.b
 *     Change one sound to make a new word     K-663 + Pepper's Sound Swap (screen)    NEW K:change-one-sound        RF.K.2.e
 *     Which word matches: cat or cot?         K-664 + Bingo's Word Hunt (screen)      NEW K:words-one-letter-apart  RF.K.3.d
 *     sh and ch                               K-378                                   point K:digraphs-k   MOVED from First Words
 *                                                                                     to Read (which keeps five lessons)
 *
 * Every lesson has two real assets (a page type and a screen activity). The design's lessons "Vowels and consonants"
 * (K-230, K-533) and "Read a decodable book" (K-628, K-631) join the unit when their teacher notes are written and read.
 * The family word-building gets its first ladder: it is placed in frontend/content/level-set-pathways/sequence.json.
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-t.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · the unit check of the unit that lost a lesson · build-guide --unit (two units) ·
 *       build-year-plan --plan=plan-k-literacy · build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-t.en.literacy.js <notes.json>');
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const DECODE = '«using letter-sound relationships to decode, including VC, CVC, CCVC, and CVCC words»';
const SPELL = '«spelling words with VC, CVC, and CCVC»';
const U = 'k-short-vowels-and-cvc-words';
const POINTS = [
  { tp: 'K:short-a-i', code: 'RF.K.3.b', types: ['K-661'], activities: ['cvc-builder.build-cvc-word.rf-k-3'], design: 'Short a and short i',
    skill: 'Say the short sounds of a and i and read and spell consonant-vowel-consonant words with them (cat, map, pig, sit)',
    tx: [['ELAR.K.2.B.i', 'teaches'], ['ELAR.K.2.B.ii', 'teaches'], ['ELAR.K.2.C.i', 'teaches']], txWhy: 'Saying the short sounds of a and i is «identifying and matching the common sounds that letters represent»; reading the words is ' + DECODE + '; writing the vowel and the word is ' + SPELL + '.' },
  { tp: 'K:short-o-u-e', code: 'RF.K.3.b', types: ['K-662'], activities: ['cvc-builder.build-cvc-word.rf-k-3'], design: 'Short o, short u, and short e',
    skill: 'Say the short sounds of o, u, and e and read and spell consonant-vowel-consonant words with them (hot, bug, bed)',
    tx: [['ELAR.K.2.B.i', 'teaches'], ['ELAR.K.2.B.ii', 'teaches'], ['ELAR.K.2.C.i', 'teaches']], txWhy: 'Saying the short sounds of o, u, and e is «identifying and matching the common sounds that letters represent»; reading the words is ' + DECODE + '; writing the vowel and the word is ' + SPELL + '.' },
  { tp: 'K:change-one-sound', code: 'RF.K.2.e', types: ['K-663'], activities: ['pepper-sound-swap.substitute.rf-k-2-e'], design: 'Change one sound to make a new word',
    skill: 'Change the first, last, or middle sound of a spoken consonant-vowel-consonant word to make a new word and spell it',
    tx: [['ELAR.K.2.B.iii', 'teaches'], ['ELAR.K.2.C.i', 'teaches']], txWhy: 'A ladder on which each step changes one sound of the word above is «recognizing that new words are created when letters are changed, added, or deleted such as it - pit - tip - tap»; the child writes each new word: ' + SPELL + '.' },
  { tp: 'K:words-one-letter-apart', code: 'RF.K.3.d', types: ['K-664'], activities: ['bingo-word-hunt.read-match.rf-k-3-d'], design: 'Which word matches: cat or cot?',
    skill: 'Tell apart two words that differ in one letter (hat and hot, bag and big) and choose the word for a picture',
    tx: [['ELAR.K.2.B.ii', 'teaches'], ['ELAR.K.2.B.iii', 'prepares']], txWhy: 'Reading two words that differ in one letter and choosing the one for the picture is ' + DECODE + '; it prepares «recognizing that new words are created when letters are changed, added, or deleted».' },
];
const MAX = 1930;   // one page type and a screen activity
const MOVED = { tp: 'K:digraphs-k', from: 'k-first-words-to-read' };
const UNIT = { id: U, slug: 'short-vowels-and-cvc-words-kindergarten-unit', status: 'live', grade: 'K', subject: 'literacy', title: 'Short Vowels and CVC Words',
  metaTitle: 'Kindergarten Lesson Plans: Short Vowels and CVC Words',
  metaDescription: 'A Kindergarten phonics unit: 5 lessons on short a and i, short o, u, and e, changing one sound to make a new word, look-alike words, and sh and ch.', weeks: 2 };
const AFTER = 'k-first-words-to-read';
const FROM_OLD = /6 lessons on matching words to pictures/;
const FROM_DESCRIPTION = 'A Kindergarten unit: 5 lessons on matching words to pictures, sight words, a first little book, one and many, and a or an, each with a teacher note.';
const PLAN_ID = 'plan-k-literacy';
const DESIGN_UNIT = 'new:short-vowels-and-cvc-words';
const ORDER_AFTER = 'K:singular-plural';   // the four points stand before K:digraphs-k
const NOTES_FILE = 'scripts/units/notes/en-literacy-yeark.js';
const FAMILY = { strand: 'Reading: Foundational Skills', type: 'word-building', after: 'sight-words' };

// ---- everything is read and checked first
for (const [what, d] of [['the new unit', UNIT.metaDescription], ['the unit the lesson leaves', FROM_DESCRIPTION]]) if (d.length < 110 || d.length > 170) throw new Error('description of ' + what + ': ' + d.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title: ' + UNIT.metaTitle.length);
for (const p of POINTS) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  if (/\bfree\b|Premium/i.test(n.title + n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' says free or Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > MAX) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + MAX + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push({ tp: p.tp, grade: 'K', strand: 'Foundational Skills', code: p.code, skill: p.skill, activities: p.activities }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['K'];
  const at = list.indexOf(ORDER_AFTER); if (at < 0) throw new Error('order: no ' + ORDER_AFTER);
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
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
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-18' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English phonics of Kindergarten (Part 12.3: short vowels and consonant-vowel-consonant words); they are spellings of English, and another language teaches its own. Read it against the wording when the phonics units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/level-set-pathways/sequence.json', raw = read(f), j = JSON.parse(raw);
  let done = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.strand === FAMILY.strand && Array.isArray(o.types) && o.types.includes(FAMILY.after)) { if (o.types.includes(FAMILY.type)) throw new Error(FAMILY.type + ' is in the pathway already'); o.types.splice(o.types.indexOf(FAMILY.after) + 1, 0, FAMILY.type); done++; return; } Object.values(o).forEach(walk); } })(j);
  if (done < 1) throw new Error('no place for ' + FAMILY.type + ' in the pathways');
  if (JSON.stringify(j).split('"' + FAMILY.type + '"').length - 1 !== done) throw new Error(FAMILY.type + ' stands elsewhere in the pathways');
  out.push([f, jsonLike(raw, j)]);
  console.log('pathways: ' + FAMILY.type + ' placed after ' + FAMILY.after + ' (' + done + ' list(s))');
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const from = defs.units.find((x) => x.id === MOVED.from); if (!from) throw new Error('no unit ' + MOVED.from);
  const i = from.lessons.findIndex((l) => l.point === MOVED.tp); if (i < 0) throw new Error(MOVED.from + ' has no lesson ' + MOVED.tp);
  const moved = from.lessons.splice(i, 1)[0];
  if (from.lessons.length < 4) throw new Error(MOVED.from + ' would keep ' + from.lessons.length + ' lessons');
  if (!FROM_OLD.test(from.metaDescription)) throw new Error('the description of ' + MOVED.from + ' is not the one this script replaces: ' + from.metaDescription);
  from.metaDescription = FROM_DESCRIPTION;
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: [...POINTS.map((p) => ({ point: p.tp, types: p.types })), moved] });
  const a = defs.units.findIndex((x) => x.id === AFTER); if (a < 0) throw new Error('no unit ' + AFTER);
  defs.units.splice(a + 1, 0, unit);
  const k = plan.units.indexOf(AFTER); if (k < 0) throw new Error(PLAN_ID + ' does not hold ' + AFTER);
  plan.units.splice(k + 1, 0, UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNIT.id + ' (' + unit.lessons.length + ' lessons) after ' + AFTER + '; ' + MOVED.from + ' keeps ' + from.lessons.length + '; ' + PLAN_ID + ': ' + plan.units.join(' > '));
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
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the unit is in ' + NOTES_FILE + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(NOTES_FILE + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(NOTES_FILE + ': no place for the head line');
  s = s.replace(head, () => ' * The four notes of the unit Short Vowels and CVC Words (K-661 to K-664) were added by place-ready-t.en.literacy.js;\n * the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed in ' + PLAN_ID + '; notes written; design marked');
