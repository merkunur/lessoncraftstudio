#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-fourth run (2026-11-19): the Grade 3 unit Sentences and Conventions on the ten
 * page types of "Year pages, literacy Y" (types/_shared/sentences-g3.js). Every lesson has two page types (first the
 * page to choose on, then the page to write on): no screen activity of the site teaches these at Grade 3.
 *
 *   Sentences and Conventions (NEW unit, last in the Grade 3 literacy plan of today)
 *     Joining words: and, but, so, because, when             G3-521, G3-520   NEW 3:joining-words                 L.3.1.h
 *     Simple, compound, and complex sentences                 G3-522, G3-523   NEW 3:simple-compound-complex       L.3.1.i
 *     Better, best: comparing with adjectives and adverbs     G3-525, G3-524   NEW 3:comparing-adjectives-adverbs  L.3.1.g
 *     Possessives: the dog's bone, the dogs' bones            G3-526, G3-527   NEW 3:possessive-nouns              L.3.2.d
 *     Capitals in titles                                      G3-529, G3-528   NEW 3:capitals-in-titles            L.3.2.a
 *
 * Texas rows for the five new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-y.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-y.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  { tp: '3:joining-words', code: 'L.3.1.h', types: ['G3-521', 'G3-520'], design: 'Joining words: and, but, so, because, when',
    skill: 'Choose the joining word (and, but, or, so, because, when, if, after, before) that fits two ideas, and join two sentences with it',
    tx: [['ELAR.3.11.D.viii', 'teaches'], ['ELAR.3.11.D.x', 'teaches']], txWhy: 'Joining two sentences with and, but, or, so is «coordinating conjunctions to form compound subjects, predicates, and sentences»; the comma written before the joining word is «commas in compound sentences». Because, when, if, after and before go one step further than the Texas wording of Grade 3.' },
  { tp: '3:simple-compound-complex', code: 'L.3.1.i', types: ['G3-522', 'G3-523'], design: 'Simple, compound, and complex sentences',
    skill: 'Tell simple, compound, and complex sentences apart and write two short sentences as a compound and as a complex sentence',
    tx: [['ELAR.3.11.D.i', 'teaches'], ['ELAR.3.11.D.x', 'teaches']], txWhy: 'Telling a simple from a compound sentence and writing both is «complete simple and compound sentences with subject-verb agreement»; the comma of the compound sentence is «commas in compound sentences». The complex sentence goes one step further than the Texas wording of Grade 3.' },
  { tp: '3:comparing-adjectives-adverbs', code: 'L.3.1.g', types: ['G3-525', 'G3-524'], design: 'Better, best: comparing with adjectives and adverbs',
    skill: 'Form and choose the comparing forms of adjectives and adverbs (taller, tallest; more carefully, most carefully; better, best)',
    tx: [['ELAR.3.11.D.iv', 'teaches'], ['ELAR.3.11.D.v', 'teaches']], txWhy: 'Forming and choosing taller, tallest, more careful, better and best is «adjectives, including their comparative and superlative forms»; comparing how something is done (more carefully, fastest) uses «adverbs that convey time and adverbs that convey manner».' },
  { tp: '3:possessive-nouns', code: 'L.3.2.d', types: ['G3-526', 'G3-527'], design: "Possessives: the dog's bone, the dogs' bones",
    skill: 'Write the possessive of one owner, of more than one owner, and of an irregular plural, and tell a possessive from a plain plural',
    tx: [['ELAR.3.11.D.x', 'teaches'], ['ELAR.3.11.D.iii', 'prepares']], txWhy: 'Writing the bee\'s hive, the bees\' hive and the children\'s coats is «punctuation marks, including apostrophes in contractions and possessives»; telling a possessive from a plain plural rests on «singular, plural, common, and proper nouns».' },
  { tp: '3:capitals-in-titles', code: 'L.3.2.a', types: ['G3-529', 'G3-528'], design: 'Capitals in titles',
    skill: 'Capitalize the first word, the last word, and every important word of a title, and keep the small words small',
    tx: [['ELAR.3.11.D.ix', 'extends']], txWhy: 'Texas names «capitalization of official titles of people, holidays, and geographical names and places» in Grade 3; capitals in the titles of books and stories apply the same convention to a title.' },
];
const MAX = 1480;   // two page types per lesson
const UNIT = { id: 'g3-sentences-and-conventions', slug: 'sentences-and-conventions-grade-3-unit', status: 'live', grade: '3', subject: 'literacy', title: 'Sentences and Conventions',
  metaTitle: 'Grade 3 Grammar Lesson Plans: Sentences and Conventions',
  metaDescription: 'A Grade 3 grammar unit: 5 lessons on joining words, simple, compound, and complex sentences, comparing with -er and -est, possessives, and capitals in titles.', weeks: 3 };
const PLAN_ID = 'plan-3-literacy';
const DESIGN_UNIT = 'new:sentences-and-conventions-g3';
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
    j.points.push({ tp: p.tp, grade: '3', strand: 'Language', code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  j.subjects.literacy['3'].push(...POINTS.map((p) => p.tp));   // the unit closes today's Grade 3 plan
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English grammar of Grade 3 (Part 12.3: joining words, kinds of sentences, comparing forms, possessives with an apostrophe, capitals in titles); these are conventions of English, and another language teaches its own. Read it against the wording when the grammar units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) });
  const last = plan.units[plan.units.length - 1]; const a = defs.units.findIndex((x) => x.id === last); if (a < 0) throw new Error('no unit ' + last);
  defs.units.splice(a + 1, 0, unit);
  plan.units.push(UNIT.id);
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
  s = s.replace(head, () => ' * The five notes of the unit Sentences and Conventions (G3-520 to G3-529) were added by place-ready-y.en.literacy.js;\n * the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed last in ' + PLAN_ID + '; notes written; design marked');
