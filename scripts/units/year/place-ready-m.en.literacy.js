#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirteenth run (2026-11-17): the Grade 1 unit Long Vowels: Silent e and Vowel Teams, on
 * the four Grade 1 phonics page types of "Year pages, literacy M" (types/_shared/vowels-g1.js; the word bank
 * data/literacy/long-vowels.en.json). The unit stands in the Grade 1 literacy plan after Reading Stories: Characters
 * and Lessons (the design: midyear the class moves from short to long vowels).
 *
 *   Silent e changes the vowel   G1-584   NEW point 1:silent-e        RF.1.3.c   + Add the Magic e (screen)
 *   Long a: ai and ay            G1-585   NEW point 1:long-a-ai-ay    RF.1.3.c   + Build Vowel-Team Words (screen)
 *   Long e: ee and ea            G1-586   NEW point 1:long-e-ee-ea    RF.1.3.c   + Build Vowel-Team Words (screen)
 *   Long o: oa and ow            G1-587   NEW point 1:long-o-oa-ow    RF.1.3.c   + Build Vowel-Team Words (screen)
 *
 * Every lesson has two real assets: its page type and an activity on screen. The lesson of the design "Long or short
 * vowel?" (RF.1.2.a) is NOT placed: its page type G1-495 is a maker template that was never published as a Level Set.
 * Texas rows for the four new points; every other curriculum: not yet read. The teacher notes (read by the reviewer of
 * the pages) are added to scripts/units/notes/en-literacy-year1.js by this script.
 *
 *   node scripts/units/year/place-ready-m.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · after-publish.sh ylm · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-1-literacy · build-looks
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
if (!NOTES_IN || !fs.existsSync(NOTES_IN)) throw new Error('usage: place-ready-m.en.literacy.js <notes.json> (the four reviewed teacher notes)');
const NOTES = JSON.parse(fs.readFileSync(NOTES_IN, 'utf8'));
const POINTS = [
  { tp: '1:silent-e', code: 'RF.1.3.c', types: ['G1-584'], activities: ['cvc-builder.build-magic-e.rf-1-3-silent-e'], design: 'Silent e changes the vowel',
    skill: 'Read and spell one-syllable words with a silent e, and tell how the e changes the vowel sound',
    tx: [['ELAR.1.2.B.iii', 'teaches']], txWhy: 'Reading and spelling one-syllable words with a silent e (cap, cape) is «decoding words with closed syllables; open syllables; VCe syllables; vowel teams, including vowel digraphs and diphthongs; and r-controlled syllables».' },
  { tp: '1:long-a-ai-ay', code: 'RF.1.3.c', types: ['G1-585'], activities: ['syllable-builder.build-vowel-teams.rf-1-3'], design: 'ai and ay',
    skill: 'Read and spell one-syllable words in which ai or ay spells long a',
    tx: [['ELAR.1.2.B.iii', 'teaches']], txWhy: 'Reading and spelling one-syllable words with the vowel teams ai and ay is «decoding words with closed syllables; open syllables; VCe syllables; vowel teams, including vowel digraphs and diphthongs; and r-controlled syllables».' },
  { tp: '1:long-e-ee-ea', code: 'RF.1.3.c', types: ['G1-586'], activities: ['syllable-builder.build-vowel-teams.rf-1-3'], design: 'ee and ea',
    skill: 'Read and spell one-syllable words in which ee or ea spells long e',
    tx: [['ELAR.1.2.B.iii', 'teaches']], txWhy: 'Reading and spelling one-syllable words with the vowel teams ee and ea is «decoding words with closed syllables; open syllables; VCe syllables; vowel teams, including vowel digraphs and diphthongs; and r-controlled syllables».' },
  { tp: '1:long-o-oa-ow', code: 'RF.1.3.c', types: ['G1-587'], activities: ['syllable-builder.build-vowel-teams.rf-1-3'], design: 'oa and ow',
    skill: 'Read and spell one-syllable words in which oa or ow spells long o',
    tx: [['ELAR.1.2.B.iii', 'teaches']], txWhy: 'Reading and spelling one-syllable words with the vowel teams oa and ow is «decoding words with closed syllables; open syllables; VCe syllables; vowel teams, including vowel digraphs and diphthongs; and r-controlled syllables».' },
];
const UNIT = { id: 'g1-long-vowels-silent-e-and-vowel-teams', slug: 'long-vowels-silent-e-and-vowel-teams-grade-1-unit', status: 'live', grade: '1', subject: 'literacy',
  title: 'Long Vowels: Silent e and Vowel Teams', metaTitle: 'Grade 1 Lesson Plans: Long Vowels, Silent e, Vowel Teams',
  metaDescription: 'A Grade 1 phonics unit on long vowels: 4 lessons on silent e and the vowel teams ai and ay, ee and ea, oa and ow, with word sorts, gap words, and sentences.', weeks: 2,
  lessons: POINTS.map((p) => ({ point: p.tp, types: p.types })) };
const AFTER = 'g1-reading-stories-characters-and-lessons', PLAN_ID = 'plan-1-literacy', AFTER_POINT = '1:who-tells-the-story';
const DESIGN_UNIT = 'new:long-vowels-g1';
const DESIGN_MARKS = Object.fromEntries(POINTS.map((p) => [p.design, p.tp]));   // by the TITLE of the design lesson: four lessons share one standard

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description of ' + UNIT.metaDescription.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title of ' + UNIT.metaTitle.length + ' characters');
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > 1930) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (a sheet of the teacher guide holds about 1,900)'); }
const out = [];   // [file, text]
const STRAND = 'Foundational Skills';   // the strand the other extra phonics points carry (strand-map.json maps it to Reading: Foundational Skills)
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: '1', strand: STRAND, code: p.code, skill: p.skill }, p.activities.length ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['1']; const at = list.indexOf(AFTER_POINT); if (at < 0) throw new Error('order: no ' + AFTER_POINT);
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
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-17' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-17 for the English long-vowel spellings of Grade 1 (Part 12.3: silent e, ai and ay, ee and ea, oa and ow); they are spellings of English, and another language teaches its own. Read it against the wording when the phonics units of this language are designed.', review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error(UNIT.id + ' exists');
  const at = defs.units.findIndex((x) => x.id === AFTER); if (at < 0) throw new Error('no unit ' + AFTER);
  defs.units.splice(at + 1, 0, UNIT);
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const k = plan.units.indexOf(AFTER); if (k < 0) throw new Error(PLAN_ID + ' does not hold ' + AFTER);
  plan.units.splice(k + 1, 0, UNIT.id);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNIT.id + ' (' + UNIT.lessons.length + ' lessons) after ' + AFTER + '; ' + PLAN_ID + ' has ' + plan.units.length + ' units; ' + defs.units.length + ' units');
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === DESIGN_UNIT && o.lessons) { for (const l of o.lessons) if (DESIGN_MARKS[l.title]) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = DESIGN_MARKS[l.title]; marked++; } return; } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
{
  const f = 'scripts/units/notes/en-literacy-year1.js', raw = read(f); let s = raw.replace(/\r\n/g, '\n');
  if (POINTS.some((p) => s.includes("'" + p.tp + "'"))) throw new Error('a note of the unit is in ' + f + ' already');
  const BS = String.fromCharCode(92);
  const q = (x) => "'" + String(x).split(BS).join(BS + BS).split("'").join(BS + "'") + "'";
  const block = POINTS.map((p) => { const n = NOTES[p.tp]; return `    ${q(p.tp)}: {\n      title: ${q(n.title)},\n      objective: ${q(n.objective)},\n      note: {\n        mistake: ${q(n.mistake)},\n        words: ${q(n.words)},\n        watch: ${q(n.watch)},\n      },\n    },\n`; }).join('');
  const end = '  },\n};\n'; if (!s.endsWith(end)) throw new Error(f + ' does not end as expected');
  const head = ' * `node scripts/units/notes/apply.js` merges every file'; if (s.split(head).length !== 2) throw new Error(f + ': no place for the head line');
  s = s.replace(head, () => ' * The four notes of the unit Long Vowels: Silent e and Vowel Teams (G1-584 to G1-587) were added by\n * place-ready-m.en.literacy.js; the reviewer of the story pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([f, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed in ' + PLAN_ID + '; notes written; design marked');
