#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twentieth run (2026-11-18): three Grade 1 grammar lessons on the four page types of
 * "Year pages, literacy U" (types/_shared/grammar-g1.js), and the split the year design asks for.
 *
 *   Words in Sentences: Grammar (the live unit g1-words-and-how-they-work; its address stays)
 *     keeps    ABC order · kinds of words · pronouns · a and an
 *     NEW      Names, days, and months get capitals     G1-593 (day 1), G1-592 (day 2)          1:capitals-names-days-months  L.1.2.a
 *     NEW      Joining words: and, but, so, because     G1-594 + Hazel's Word Bridge (screen)   1:joining-words               L.1.1.g
 *     NEW      Yesterday, today, tomorrow: verb tense   G1-595 + The Clock Tower (screen)       1:verb-tense                  L.1.1.e
 *   Word Meanings and Word Parts (NEW unit, straight after it)
 *     MOVED    opposites · synonyms · shades of meaning · root words (from the unit above, as the design has it)
 *
 * The design's two further lessons of Word Meanings and Word Parts (words by category; the endings -s, -ed, -ing)
 * join when their pages are built. Both units get their unit check rebuilt by the lead after this script.
 * Texas rows for the three new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-u.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-checks --unit (both units) · build-guide --unit (both) · build-year-plan --plan=plan-1-literacy ·
 *       build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-u.en.literacy.js <notes.json>');
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const OLD = 'g1-words-and-how-they-work', NEW = 'g1-word-meanings-and-word-parts';
const POINTS = [
  { tp: '1:capitals-names-days-months', code: 'L.1.2.a', types: ['G1-593', 'G1-592'], activities: [], design: 'Names, days, and months get capitals', max: 1480,
    skill: 'Write the names of people and pets, the days of the week, and the months with a capital letter, and write a date',
    tx: [['ELAR.1.11.D.viii', 'extends'], ['ELAR.1.11.D.iii', 'teaches']], txWhy: 'Texas asks first graders for «capitalization for the beginning of sentences and the pronoun "I"»; capitals for names, days and months go one step further, and a name with its capital is a proper noun: «singular, plural, common, and proper nouns».' },
  { tp: '1:joining-words', code: 'L.1.1.g', types: ['G1-594'], activities: ['hazel-word-bridge.joining-words.l-1-1-g'], design: 'Joining words: and, but, so, because', max: 1930,
    skill: 'Choose the joining word (and, but, so, because) that fits two ideas and join two sentences into one',
    tx: [['ELAR.1.11.D.i', 'extends']], txWhy: 'Texas names no joining words in Grade 1; joining two complete sentences with and, but, so or because builds on «complete sentences with subject-verb agreement».' },
  { tp: '1:verb-tense', code: 'L.1.1.e', types: ['G1-595'], activities: ['tense.past-present-future.l-1-1-e'], design: 'Yesterday, today, tomorrow: verb tense', max: 1930,
    skill: 'Use a verb to tell about yesterday, today, and tomorrow (I walked, I walk, I will walk)',
    tx: [['ELAR.1.11.D.ii', 'teaches'], ['ELAR.1.11.D.v', 'prepares']], txWhy: 'Writing the past and the present form of a verb is «past and present verb tense» (the future with will goes one step further); yesterday, today and tomorrow are «adverbs that convey time».' },
];
const MOVED = ['1:opposites', '1:synonyms', '1:shades-of-meaning', '1:root-words'];
const OLD_META = { title: 'Words in Sentences: Grammar', metaTitle: 'Grade 1 Grammar Lesson Plans: Words in Sentences',
  metaDescription: 'A Grade 1 grammar unit: 7 lessons on ABC order, nouns, verbs, and adjectives, pronouns, a and an, capitals for names and dates, joining words, and verb tense.' };
const NEW_UNIT = { id: NEW, slug: 'word-meanings-and-word-parts-grade-1-unit', status: 'live', grade: '1', subject: 'literacy', title: 'Word Meanings and Word Parts',
  metaTitle: 'Grade 1 Vocabulary Lessons: Word Meanings and Word Parts',
  metaDescription: 'A Grade 1 vocabulary unit: 4 lessons on opposites, synonyms, shades of meaning (look, peek, stare), and root words, each with a teacher note and pages to print.', weeks: 2 };
const PLAN_ID = 'plan-1-literacy';
const DESIGN_UNIT = OLD;   // the design keeps the live unit's id
const ORDER_AFTER = '1:pronouns';
const NOTES_FILE = 'scripts/units/notes/en-literacy-year1.js';

// ---- everything is read and checked first
for (const [what, m] of [['the grammar unit', OLD_META], ['the new unit', NEW_UNIT]]) {
  if (m.metaDescription.length < 110 || m.metaDescription.length > 170) throw new Error('description of ' + what + ': ' + m.metaDescription.length + ' characters');
  if (m.metaTitle.length > 60) throw new Error('meta title of ' + what + ': ' + m.metaTitle.length);
}
for (const p of POINTS) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  if (/\bfree\b|Premium/i.test(n.title + n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' says free or Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > p.max) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + p.max + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  const all = JSON.parse(read('frontend/content/teaching-graph/points.json')); const allPts = Array.isArray(all.points || all) ? (all.points || all) : Object.values(all.points || all);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp) || allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: '1', strand: 'Language', code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['1'];
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English grammar of Grade 1 (Part 12.3: capitals for names, days and months; the joining words and, but, so, because; verb tense with -ed and will); these are conventions of English, and another language teaches its own. Read it against the wording when the grammar units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === NEW_UNIT.id || x.slug === NEW_UNIT.slug)) throw new Error('the new unit exists already');
  const old = defs.units.find((x) => x.id === OLD); if (!old) throw new Error('no unit ' + OLD);
  if (!/8 lessons on ABC order/.test(old.metaDescription)) throw new Error('the description of ' + OLD + ' is not the one this script replaces: ' + old.metaDescription);
  const moved = MOVED.map((tp) => { const i = old.lessons.findIndex((l) => l.point === tp); if (i < 0) throw new Error(OLD + ' has no lesson ' + tp); return old.lessons.splice(i, 1)[0]; });
  for (const p of POINTS) { if (old.lessons.some((l) => l.point === p.tp)) throw new Error(p.tp + ' is in the unit already'); old.lessons.push({ point: p.tp, types: p.types }); }
  Object.assign(old, OLD_META);
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, NEW_UNIT, { lessons: moved });
  const a = defs.units.findIndex((x) => x.id === OLD); defs.units.splice(a + 1, 0, unit);
  const k = plan.units.indexOf(OLD); if (k < 0) throw new Error(PLAN_ID + ' does not hold ' + OLD);
  plan.units.splice(k + 1, 0, NEW_UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log(OLD + ': ' + old.lessons.map((l) => l.point).join(' · '));
  console.log(NEW + ': ' + unit.lessons.map((l) => l.point).join(' · '));
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
  s = s.replace(head, () => ' * The three grammar notes (G1-592 to G1-595: capitals, joining words, verb tense) were added by\n * place-ready-u.en.literacy.js; the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; lessons placed; unit ' + NEW + ' made; notes written; design marked');
