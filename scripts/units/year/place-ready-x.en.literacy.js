#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-third run (2026-11-18): the Grade 3 unit Reading Long Words on the eight page
 * types of "Year pages, literacy X" (types/_shared/long-words-g3.js). Every lesson has two page types: no screen
 * activity or tool of the site teaches syllable types, these suffixes or these irregular words at Grade 3 (read
 * 2026-11-18: the Syllable Splitter names no syllable type; Heart Words holds none of enough, though, ocean).
 *
 *   Reading Long Words (NEW unit, FIRST in the Grade 3 literacy plan, as the year design has it)
 *     Closed and open syllables                          G3-512, G3-513   NEW 3:closed-open-syllables              RF.3.3.c
 *     Silent-e, vowel-team, and consonant-le syllables   G3-514, G3-515   NEW 3:syllable-types-e-team-le            RF.3.3.c
 *     Suffixes -able, -ment, -ness, -ful, -less          G3-516, G3-517   NEW 3:suffixes-able-ment-ness-ful-less    RF.3.3.a
 *     Tricky words: enough, though, ocean                G3-518, G3-519   NEW 3:tricky-words-enough-though-ocean    RF.3.3.d
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-x.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-3-literacy · build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-x.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const MULTI = '«decoding multisyllabic words with closed syllables; open syllables; VCe syllables; vowel teams, including digraphs and diphthongs; r-controlled syllables; and final stable syllables»';
const POINTS = [
  { tp: '3:closed-open-syllables', code: 'RF.3.3.c', types: ['G3-512', 'G3-513'], design: 'Closed and open syllables',
    skill: 'Split a two-syllable word, tell whether each syllable is closed or open, and read it with the short or the long vowel',
    tx: [['ELAR.3.2.A.ii', 'teaches'], ['ELAR.3.2.A.iv', 'teaches']], txWhy: 'Marking each syllable closed or open and reading it is ' + MULTI + '; splitting rab | bit, ro | bot and cam | el is «decoding words using knowledge of syllable division patterns such as VCCV, VCV, and VCCCV».' },
  { tp: '3:syllable-types-e-team-le', code: 'RF.3.3.c', types: ['G3-514', 'G3-515'], design: 'Silent-e, vowel-team, and consonant-le syllables',
    skill: 'Name silent-e, vowel-team, and consonant-le syllables in longer words and build long words from their syllables',
    tx: [['ELAR.3.2.A.ii', 'teaches'], ['ELAR.3.2.B.i', 'prepares']], txWhy: 'Typing each syllable of a long word (closed, open, silent e, vowel team, consonant-le) and reading the word is ' + MULTI + ' (consonant-le is the final stable syllable); building the words prepares their spelling.' },
  { tp: '3:suffixes-able-ment-ness-ful-less', code: 'RF.3.3.a', types: ['G3-516', 'G3-517'], design: 'Suffixes -able, -ment, -ness, -ful, -less',
    skill: 'Find the base word and the suffix of words with -able, -ment, -ness, -ful, and -less, say what the word means, and choose the word a sentence needs',
    tx: [['ELAR.3.2.A.vi', 'teaches'], ['ELAR.3.3.C', 'teaches']], txWhy: 'Reading words with -able, -ment, -ness, -ful and -less, with a dropped e or a y changed to i, is «decoding words using knowledge of suffixes, including how they can change base words such as dropping e, changing y to i»; saying what the word means is «identify the meaning of and use words with affixes such as ... -ness, -y, and -ful».' },
  { tp: '3:tricky-words-enough-though-ocean', code: 'RF.3.3.d', types: ['G3-518', 'G3-519'], design: 'Tricky words: enough, though, ocean',
    skill: 'Read and spell Grade 3 irregular words (enough, though, ocean, island, answer) and sort ough words by the sound ough makes',
    tx: [['ELAR.3.2.A.vii', 'teaches'], ['ELAR.3.2.A.i', 'teaches']], txWhy: 'Reading and writing enough, though and ocean with their tricky part is «identifying and reading high-frequency words from a research-based list»; sorting ough words by sound is «decoding multisyllabic words with multiple sound-spelling patterns such as eigh, ough, and en».' },
];
const MAX = 1480;   // two page types per lesson
const UNIT = { id: 'g3-reading-long-words', slug: 'reading-long-words-grade-3-unit', status: 'live', grade: '3', subject: 'literacy', title: 'Reading Long Words',
  metaTitle: 'Grade 3 Phonics Lesson Plans: Reading Long Words',
  metaDescription: 'A Grade 3 phonics unit: 4 lessons on closed and open syllables, silent-e, vowel-team, and consonant-le syllables, suffixes, and heart words such as enough.', weeks: 2 };
const PLAN_ID = 'plan-3-literacy';
const DESIGN_UNIT = 'new:decoding-long-words-g3';
const NOTES_FILE = 'scripts/units/notes/en-literacy-year3.js';

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description: ' + UNIT.metaDescription.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title: ' + UNIT.metaTitle.length);
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
    j.points.push({ tp: p.tp, grade: '3', strand: 'Foundational Skills', code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  j.subjects.literacy['3'].unshift(...POINTS.map((p) => p.tp));   // the unit opens the Grade 3 year
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English phonics of Grade 3 (Part 12.3: syllable types, the suffixes -able, -ment, -ness, -ful and -less, irregular words such as enough and though); these are spellings of English, and another language teaches its own. Read it against the wording when the phonics units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) });
  const first = plan.units[0]; const a = defs.units.findIndex((x) => x.id === first); if (a < 0) throw new Error('no unit ' + first);
  defs.units.splice(a, 0, unit);
  plan.units.unshift(UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log(UNIT.id + ': ' + unit.lessons.map((l) => l.point + ' [' + l.types.join('+') + ']').join(' · '));
  console.log(PLAN_ID + ': ' + plan.units.join(' > '));
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
  s = s.replace(head, () => ' * The four notes of the unit Reading Long Words (G3-512 to G3-519) were added by place-ready-x.en.literacy.js;\n * the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed first in ' + PLAN_ID + '; notes written; design marked');
