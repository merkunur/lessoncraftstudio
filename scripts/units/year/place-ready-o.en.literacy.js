#!/usr/bin/env node
/**
 * Part 12.3, English literacy, fourteenth run (2026-11-17): the Grade 1 unit Digraphs and Blends, on the four Grade 1
 * phonics page types of "Year pages, literacy O" (types/_shared/blends-g1.js; the word bank
 * data/literacy/blends-g1.en.json). The unit stands in the Grade 1 literacy plan after Sounds, Spelling, and Syllables,
 * as the year design has it (once short-vowel words are firm, the class reads digraphs and blends).
 *
 *   sh, ch, and th                 G1-380, G1-392 + G1-588   point 1:digraphs   RF.1.3.a   MOVED from Sounds, Spelling,
 *                                                                                           and Syllables (which keeps five)
 *   ck, ng, and wh                 G1-589   NEW point 1:ck-ng-wh       RF.1.3.a   + Build Blend and Digraph Words (screen)
 *   Blends at the start            G1-590   NEW point 1:blends-start   RF.1.3.b   + Build Blend and Digraph Words (screen)
 *   Blends at the end              G1-591   NEW point 1:blends-end     RF.1.3.b   + Build Blend and Digraph Words (screen)
 *
 * The moved lesson keeps its two picture pages (hear the digraph in a picture word, write its two letters) and gets
 * the word page G1-588 as its third page; its English teacher note is replaced by the note the reviewer of the pages
 * read. The unit it leaves gets a description that names five lessons. Texas rows for the three new points; every
 * other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-o.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh ylo · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · the unit check of the unit that lost a lesson · build-guide --unit (both units) ·
 *       build-year-plan --plan=plan-1-literacy · build-looks
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
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-o.en.literacy.js <notes.json> (the four reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const SCREEN = 'cvc-builder.build-blend-word.rf-1-3';
const TX_READ = '«decoding words with initial and final consonant blends, digraphs, and trigraphs»', TX_SPELL = '«spelling words with initial and final consonant blends, digraphs, and trigraphs»';
const MOVED = { tp: '1:digraphs', type: 'G1-588', from: 'g1-sounds-spelling-syllables' };
const POINTS = [   // the three NEW points
  { tp: '1:ck-ng-wh', code: 'RF.1.3.a', types: ['G1-589'], activities: [SCREEN], design: 'ck, ng, and wh',
    skill: 'Read and spell one-syllable words with the digraphs ck and ng at the end and wh at the start',
    tx: [['ELAR.1.2.B.ii', 'teaches'], ['ELAR.1.2.C.ii', 'teaches']], txWhy: 'Reading words with ck, ng, and wh is ' + TX_READ + '; writing them is ' + TX_SPELL + '.' },
  { tp: '1:blends-start', code: 'RF.1.3.b', types: ['G1-590'], activities: [SCREEN], design: 'Blends at the start: st, fl, tr',
    skill: 'Read and spell one-syllable words that start with a consonant blend (s-blends, l-blends, r-blends)',
    tx: [['ELAR.1.2.B.ii', 'teaches'], ['ELAR.1.2.C.ii', 'teaches']], txWhy: 'Reading words that start with a blend (stop, flag, trip) is ' + TX_READ + '; writing them is ' + TX_SPELL + '.' },
  { tp: '1:blends-end', code: 'RF.1.3.b', types: ['G1-591'], activities: [SCREEN], design: 'Blends at the end: nd, mp, st',
    skill: 'Read and spell short-vowel words that end in a consonant blend (nd, mp, st, nk)',
    tx: [['ELAR.1.2.B.ii', 'teaches'], ['ELAR.1.2.C.ii', 'teaches']], txWhy: 'Reading words that end in a blend (hand, lamp, nest, sink) is ' + TX_READ + '; writing them is ' + TX_SPELL + '.' },
];
const UNIT = { id: 'g1-digraphs-and-blends', slug: 'digraphs-and-blends-grade-1-unit', status: 'live', grade: '1', subject: 'literacy',
  title: 'Digraphs and Blends', metaTitle: 'Grade 1 Lesson Plans: Digraphs and Blends',
  metaDescription: 'A Grade 1 phonics unit on digraphs and blends: 4 lessons on sh, ch, and th, on ck, ng, and wh, and on blends at the start and at the end of a word.', weeks: 2,
  lessons: null };   // set below: the moved lesson first, then the three new ones
const FROM_DESCRIPTION = 'A Grade 1 unit on short-vowel words and syllables: 5 lessons on rhymes, word families, sound boxes, spelling picture words, and splitting words into syllables.';
const PLAN_ID = 'plan-1-literacy';
const DESIGN_UNIT = 'new:digraphs-and-blends';
const DESIGN_MARKS = Object.fromEntries(POINTS.map((p) => [p.design, p.tp]));
// the moved lesson keeps its two picture pages: one sentence of the note says what they are for
const OLD_PAGES = 'Begin with the two picture pages: the child hears the digraph in a picture word and writes its two letters (one page calls it a letter team). ';

// ---- everything is read and checked first
for (const [what, text] of [['unit', UNIT.metaDescription], ['unit the lesson leaves', FROM_DESCRIPTION]]) if (text.length < 110 || text.length > 170) throw new Error('description of the ' + what + ': ' + text.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title of ' + UNIT.metaTitle.length + ' characters');
const noteOf = (tp) => { const n = NOTES[tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + tp); return n; };
const movedNote = Object.assign({}, noteOf(MOVED.tp));
{
  const at = movedNote.words.indexOf('On Level 1'); if (at < 0) throw new Error('the note of ' + MOVED.tp + ' has no "On Level 1" to put the picture pages before');
  movedNote.words = movedNote.words.slice(0, at) + OLD_PAGES + movedNote.words.slice(at);
}
for (const [tp, n] of [[MOVED.tp, movedNote], ...POINTS.map((p) => [p.tp, noteOf(p.tp)])]) {
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length;
  if (len > 1930) throw new Error('the note of ' + tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)');
}
const out = [];   // [file, text]
const STRAND = 'Foundational Skills';
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push({ tp: p.tp, grade: '1', strand: STRAND, code: p.code, skill: p.skill, activities: p.activities }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['1']; const at = list.indexOf(MOVED.tp); if (at < 0) throw new Error('order: no ' + MOVED.tp);
  list.splice(at + 1, 0, ...POINTS.map((p) => p.tp));
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const [type, tp] of [[MOVED.type, MOVED.tp], ...POINTS.flatMap((p) => p.types.map((t) => [t, p.tp]))]) { if (j.types[type]) throw new Error(type + ' is listed already'); j.types[type] = tp; }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-17' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English digraphs and consonant blends of Grade 1 (Part 12.3: ck, ng, and wh; blends at the start; blends at the end); they are spellings of English, and another language teaches its own. Read it against the wording when the phonics units of this language are designed.', review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error(UNIT.id + ' exists');
  const from = defs.units.find((x) => x.id === MOVED.from); if (!from) throw new Error('no unit ' + MOVED.from);
  const i = from.lessons.findIndex((l) => l.point === MOVED.tp); if (i < 0) throw new Error(MOVED.from + ' has no lesson ' + MOVED.tp);
  const lesson = from.lessons.splice(i, 1)[0];
  if (from.lessons.length < 4) throw new Error(MOVED.from + ' would keep ' + from.lessons.length + ' lessons');
  if (!/6 lessons/.test(from.metaDescription) || !/digraphs/.test(from.metaDescription)) throw new Error('the description of ' + MOVED.from + ' is not the one this script replaces: ' + from.metaDescription);
  from.metaDescription = FROM_DESCRIPTION;
  if (lesson.types.includes(MOVED.type)) throw new Error('the lesson holds ' + MOVED.type + ' already');
  lesson.types = [...lesson.types, MOVED.type];   // the picture pages first, as the note says; the lesson keeps its maker, its exit ticket and its three days
  UNIT.lessons = [lesson, ...POINTS.map((p) => ({ point: p.tp, types: p.types }))];
  defs.units.splice(defs.units.indexOf(from) + 1, 0, UNIT);
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const k = plan.units.indexOf(MOVED.from); if (k < 0) throw new Error(PLAN_ID + ' does not hold ' + MOVED.from);
  plan.units.splice(k + 1, 0, UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNIT.id + ' (' + UNIT.lessons.length + ' lessons) after ' + MOVED.from + ' (keeps ' + from.lessons.length + '); ' + PLAN_ID + ' has ' + plan.units.length + ' units; ' + defs.units.length + ' units');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.title]) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = DESIGN_MARKS[l.title]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' new lessons');
  out.push([f, jsonLike(raw, design)]);
}
const BS = String.fromCharCode(92);
const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
const entry = (tp, n) => `    ${q(tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`;
{
  // the three new notes: at the end of the notes of the year design
  const f = 'scripts/units/notes/en-literacy-year1.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the unit is in ' + f + ' already');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The three new notes of the unit Digraphs and Blends (G1-589 to G1-591) were added by place-ready-o.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + POINTS.map((p) => entry(p.tp, noteOf(p.tp))).join('') + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}
{
  // the note of the moved lesson: replaced where it stands
  const f = 'scripts/units/notes/en-literacy-1.js', raw = read(f); const s = raw.replace(/\r\n/g, '\n');
  const a = s.indexOf("    '" + MOVED.tp + "': {\n"); if (a < 0) throw new Error(f + ': no note of ' + MOVED.tp);
  const close = '\n    },\n'; const b = s.indexOf(close, a); if (b < 0) throw new Error(f + ': the note of ' + MOVED.tp + ' does not close');
  const old = s.slice(a, b + close.length);
  if (!old.includes('letter team') || old.includes('digraph is two letters')) throw new Error(f + ': the note of ' + MOVED.tp + ' is not the one this script replaces');
  const next = s.slice(0, a) + entry(MOVED.tp, movedNote) + s.slice(b + close.length);
  out.push([f, raw.includes('\r\n') ? next.replace(/\n/g, '\r\n') : next]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; ' + MOVED.type + ' on ' + MOVED.tp + '; unit placed in ' + PLAN_ID + '; notes written; design marked');
