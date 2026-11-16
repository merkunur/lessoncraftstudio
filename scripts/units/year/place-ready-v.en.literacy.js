#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-first run (2026-11-18): three Grade 2 lessons on the three page types of
 * "Year pages, literacy V" (types/_shared/word-building-g2.js). They join the live unit Spelling, Word Building, and
 * Word Choice after its lesson on root words, as the year design has it.
 *
 *   Prefixes un- and re-                    G2-535 + Marigold's Knowing Machine (screen)   NEW 2:prefixes-un-re          L.2.4.b
 *   Suffixes -ful, -less, and -ly           G2-536 + Marigold's Knowing Machine (screen)   NEW 2:suffixes-ful-less-ly    RF.2.3.d
 *   Apostrophes: can't and the dog's bowl   G2-537 + Nib's Apostrophe Seat (screen)        NEW 2:apostrophes             L.2.2.c
 *
 * The existing point 2:prefixes (G2-320, G2-376: un-, dis-, in-, re-, pre-, mis-) is the Grade 3 unit's review lesson and
 * stays where it is; the Grade 2 lesson gets its own point. Texas rows for the three new points; every other
 * curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-v.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-checks --unit · build-guide --unit · build-year-plan --plan=plan-2-literacy · build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-v.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");   // the notes of this folder use straight apostrophes
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const UNIT = 'g2-spelling-and-word-building';
const POINTS = [
  { tp: '2:prefixes-un-re', code: 'L.2.4.b', types: ['G2-535'], activities: ['affix.apply.l-2-4-b'], design: 'Prefixes un- and re-',
    skill: 'Add un- or re- to a known word, say what the new word means, and choose the prefix a sentence needs',
    tx: [['ELAR.2.3.C', 'teaches'], ['ELAR.2.2.B.vi', 'teaches']], txWhy: 'Building and explaining words with un- and re- is «identify the meaning of and use words with affixes un-, re-, -ly, -er, and -est»; reading them is «decoding words with prefixes, including un-, re-, and dis-».' },
  { tp: '2:suffixes-ful-less-ly', code: 'RF.2.3.d', types: ['G2-536'], activities: ['affix.apply.l-2-4-b'], design: 'Suffixes -ful, -less, and -ly',
    skill: 'Read words with the suffixes -ful, -less, and -ly, say what the suffix adds, and choose the suffix a sentence needs',
    tx: [['ELAR.2.3.C', 'teaches']], txWhy: 'Texas names -ly among the affixes of Grade 2: «identify the meaning of and use words with affixes un-, re-, -ly, -er, and -est»; -ful and -less are taught the same way and go one step further.' },
  { tp: '2:apostrophes', code: 'L.2.2.c', types: ['G2-537'], activities: ['contraction.apostrophe.l-2-2-c'], design: "Apostrophes: can't and the dog's bone",
    skill: 'Write a contraction and the two words it stands for, and show one owner with an apostrophe and s',
    tx: [['ELAR.2.11.D.x', 'teaches'], ['ELAR.2.2.B.iv', 'teaches'], ['ELAR.2.2.C.iii', 'teaches']], txWhy: 'Writing contractions with their apostrophe is «end punctuation, apostrophes in contractions»; reading and spelling them is «decoding compound words, contractions» and «spelling compound words, contractions». The owner with an apostrophe and s is not named in the Texas wording of Grade 2.' },
];
const MAX = 1930;   // one page type and a screen activity
const AFTER_POINT = '2:root-words';
const OLD_RE = /^A Grade 2 unit: 5 lessons on spelling rules/;
const NEW_DESCRIPTION = 'A Grade 2 unit: 8 lessons on spelling rules, compound words, root words, prefixes, suffixes, apostrophes, synonyms, and more exact words for "said."';
const NOTES_FILE = 'scripts/units/notes/en-literacy-year2.js';

// ---- everything is read and checked first
if (NEW_DESCRIPTION.length < 110 || NEW_DESCRIPTION.length > 170) throw new Error('description: ' + NEW_DESCRIPTION.length + ' characters');
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
    j.points.push({ tp: p.tp, grade: '2', strand: p.code.startsWith('RF') ? 'Foundational Skills' : 'Language', code: p.code, skill: p.skill, activities: p.activities }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy['2'];
  const at = list.indexOf(AFTER_POINT); if (at < 0) throw new Error('order: no ' + AFTER_POINT);
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
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-18 for the English word building of Grade 2 (Part 12.3: the prefixes un- and re-, the suffixes -ful, -less and -ly, apostrophes in contractions and for one owner); these are spellings of English, and another language teaches its own. Read it against the wording when the word-building units of this language are designed.', review: 'year-design 2026-11-18' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  const unit = defs.units.find((x) => x.id === UNIT); if (!unit) throw new Error('no unit ' + UNIT);
  if (!OLD_RE.test(unit.metaDescription)) throw new Error('the description of ' + UNIT + ' is not the one this script replaces: ' + unit.metaDescription);
  for (const p of POINTS) if (unit.lessons.some((l) => l.point === p.tp)) throw new Error(p.tp + ' is in the unit already');
  const at = unit.lessons.findIndex((l) => l.point === AFTER_POINT); if (at < 0) throw new Error(UNIT + ' has no lesson ' + AFTER_POINT);
  unit.lessons.splice(at + 1, 0, ...POINTS.map((p) => ({ point: p.tp, types: p.types })));
  unit.metaDescription = NEW_DESCRIPTION;
  out.push([f, jsonLike(raw, defs)]);
  console.log(UNIT + ': ' + unit.lessons.map((l) => l.point).join(' · '));
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (o.id === UNIT && o.lessons) { for (const l of o.lessons) { const p = POINTS.find((x) => x.design === l.title); if (p) { if (l.placed) throw new Error('the design lesson ' + l.title + ' is placed already'); l.placed = p.tp; marked++; } } return; } Object.values(o).forEach(walk); } })(design);
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
  s = s.replace(head, () => ' * The three word-building notes (G2-535 to G2-537: prefixes, suffixes, apostrophes) were added by\n * place-ready-v.en.literacy.js; the reviewer of the pages read them (2026-11-18, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; lessons placed in ' + UNIT + '; notes written; design marked');
