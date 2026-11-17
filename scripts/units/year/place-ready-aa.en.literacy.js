#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-fifth run (2026-11-17): the Grade 3 unit Parts of Speech on the eight page
 * types of "Year pages, literacy AA" (types/_shared/parts-of-speech-g3.js). Every lesson has two page types: no screen
 * activity of the site teaches these at Grade 3.
 *
 *   Parts of Speech (NEW unit, before Sentences and Conventions in the Grade 3 literacy plan)
 *     What each word does in a sentence            G3-531, G3-530   NEW 3:parts-of-speech            L.3.1.a
 *     Plural nouns: regular and irregular          G3-533, G3-532   NEW 3:plural-nouns               L.3.1.b
 *     Past tense: regular and irregular verbs      G3-534, G3-535   NEW 3:past-tense-verbs           L.3.1.d
 *     Subjects and verbs agree                     G3-536, G3-537   NEW 3:subject-verb-agreement     L.3.1.f
 *
 * The design also listed the existing lesson 3:root-words-in-context in this unit; it stays in Words and Their
 * Meanings, where it is live and where the design lists it too ("Root words as clues").
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-aa.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-aa.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  { tp: '3:parts-of-speech', code: 'L.3.1.a', types: ['G3-531', 'G3-530'], design: 'What each word does in a sentence',
    skill: 'Explain the job of nouns, pronouns, verbs, adjectives, and adverbs, and label each word of a sentence by its job',
    tx: [['ELAR.3.11.D.iii', 'teaches'], ['ELAR.3.11.D.iv', 'teaches'], ['ELAR.3.11.D.v', 'teaches'], ['ELAR.3.11.D.vii', 'teaches']], txWhy: 'Texas names the parts of speech in the conventions a third grader edits for: «singular, plural, common, and proper nouns», «adjectives, including their comparative and superlative forms», «adverbs that convey time and adverbs that convey manner» and «pronouns, including subjective, objective, and possessive cases». Sorting words by their job and labeling each word of a sentence teaches what these words are and do.' },
  { tp: '3:plural-nouns', code: 'L.3.1.b', types: ['G3-533', 'G3-532'], design: 'Plural nouns: regular and irregular',
    skill: 'Form and use regular plurals (boxes, babies, leaves) and irregular plurals (mice, children, sheep)',
    tx: [['ELAR.3.11.D.iii', 'teaches'], ['ELAR.3.2.B.vii', 'teaches']], txWhy: 'Writing and choosing the plural of a noun is «singular, plural, common, and proper nouns»; adding -es and changing y to i before it is «spelling words using knowledge of suffixes, including how they can change base words such as dropping e, changing y to i, and doubling final consonants».' },
  { tp: '3:past-tense-verbs', code: 'L.3.1.d', types: ['G3-534', 'G3-535'], design: 'Past tense: regular and irregular verbs',
    skill: 'Form and use the past tense of regular verbs (jumped, hopped, carried) and of common irregular verbs (ran, brought, knew)',
    tx: [['ELAR.3.11.D.ii', 'teaches'], ['ELAR.3.2.B.vii', 'teaches']], txWhy: 'Writing the past form of a verb and rewriting a story in the past is «past, present, and future verb tense»; dropping e, doubling the last consonant and changing y to i before -ed is «spelling words using knowledge of suffixes, including how they can change base words such as dropping e, changing y to i, and doubling final consonants».' },
  { tp: '3:subject-verb-agreement', code: 'L.3.1.f', types: ['G3-536', 'G3-537'], design: 'Subjects and verbs agree',
    skill: 'Make the verb agree with its subject and the pronoun agree with the noun it stands for',
    tx: [['ELAR.3.11.D.i', 'teaches'], ['ELAR.3.11.D.vii', 'prepares']], txWhy: 'Choosing the verb that agrees with one subject, with two subjects joined by and, and after There is «complete simple and compound sentences with subject-verb agreement». A pronoun that agrees in number with its noun prepares «pronouns, including subjective, objective, and possessive cases», which asks for the case of the pronoun.' },
];
const MAX = 1480;   // two page types per lesson
const UNIT = { id: 'g3-parts-of-speech', slug: 'parts-of-speech-grade-3-unit', status: 'live', grade: '3', subject: 'literacy', title: 'Parts of Speech',
  metaTitle: 'Grade 3 Grammar Lesson Plans: Parts of Speech',
  metaDescription: 'A Grade 3 grammar unit: 4 lessons on the jobs of nouns, pronouns, verbs, adjectives, and adverbs, plural nouns, past tense verbs, and subject-verb agreement.', weeks: 2 };
const PLAN_ID = 'plan-3-literacy';
const DESIGN_UNIT = 'new:parts-of-speech-g3';
const BEFORE_UNIT = 'g3-sentences-and-conventions', BEFORE_POINT = '3:joining-words';
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
  const list = j.subjects.literacy['3'], at = list.indexOf(BEFORE_POINT); if (at < 0) throw new Error('no point ' + BEFORE_POINT + ' in the order');
  list.splice(at, 0, ...POINTS.map((p) => p.tp));   // before the points of Sentences and Conventions
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English grammar of Grade 3 (Part 12.3: the parts of speech, regular and irregular plurals, the past tense of regular and irregular verbs, subject-verb agreement); these are conventions of English, and another language teaches its own. Read it against the wording when the grammar units of this language are designed.', review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) });
  const a = defs.units.findIndex((x) => x.id === BEFORE_UNIT), b = plan.units.indexOf(BEFORE_UNIT); if (a < 0 || b < 0) throw new Error('no unit ' + BEFORE_UNIT);
  defs.units.splice(a, 0, unit);
  plan.units.splice(b, 0, UNIT.id);
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
  s = s.replace(head, () => ' * The four notes of the unit Parts of Speech (G3-530 to G3-537) were added by place-ready-aa.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed before ' + BEFORE_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
