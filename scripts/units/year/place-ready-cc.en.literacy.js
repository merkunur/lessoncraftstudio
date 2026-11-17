#!/usr/bin/env node
/**
 * Part 12.3, English literacy, twenty-eighth run (2026-11-17): two Grade 2 lessons on the three page types of
 * "Year pages, literacy CC" (types/_shared/word-choice-g2.js). They join the live unit Spelling, Word Building, and
 * Word Choice after its lesson on more exact words for said.
 *
 *   Spicy, juicy, crunchy: words in real life   G2-549, G2-550                               NEW 2:words-in-real-life    L.2.5.a
 *   Adjective or adverb?                        G2-551 + Glim's Describing Words (screen)   NEW 2:adjective-or-adverb   L.2.1.e
 *
 * The year design puts these two lessons with the two synonym lessons into a unit of their own, Choosing the Right
 * Word. That split WAITS: the unit check of the live unit has four reviewed parts, two of them from the synonym lessons;
 * split now, neither unit would have the three reviewed parts a check needs, and a live check would go. The split is
 * made when the page types G2-535 to G2-537 and G2-549 to G2-551 have card faces a reader has seen.
 * Texas rows for the two new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-cc.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-cc.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");   // the notes of this folder use straight apostrophes
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const UNIT = "g2-spelling-and-word-building";
const GRADE = "2";
const POINTS = [
  {"tp":"2:words-in-real-life","code":"L.2.5.a","types":["G2-549","G2-550"],"design":"Spicy, juicy, crunchy: words in real life","after":"2:synonyms~doing-stage","orderAfter":"2:synonyms~doing-stage","skill":"Connect describing words (spicy, juicy, crunchy, noisy, calm) to real things and places, and use them in sentences","tx":[["ELAR.2.11.D.iv","prepares"]],"txWhy":"Texas has no Grade 2 row for the real-life connections between words and their use. Naming real things that are spicy, juicy or noisy builds the describing words a second grader then uses and edits for: «adjectives, including articles»."},
  {"tp":"2:adjective-or-adverb","code":"L.2.1.e","types":["G2-551"],"activities":["wordclass.adjective-adverb.l-2-1-e"],"design":"Adjective or adverb?","after":"2:words-in-real-life","orderAfter":"2:words-in-real-life","skill":"Tell an adjective from an adverb and choose between them by the word it tells about (a quick dog, the dog ran quickly)","tx":[["ELAR.2.11.D.iv","teaches"],["ELAR.2.11.D.v","extends"]],"txWhy":"Choosing the adjective that tells about a noun is «adjectives, including articles». Texas names «adverbs that convey time and adverbs that convey place» in Grade 2; the adverbs of this lesson tell HOW something is done (quickly, bravely), which Texas names in Grade 3 (adverbs that convey manner)."},
];
const MAX = 1930;   // one page type and a screen activity (the lesson with two page types has 1,405 letters)
const OLD_RE = /^A Grade 2 unit: 8 lessons on spelling rules/;
const NEW_DESCRIPTION = "A Grade 2 unit: 10 lessons on spelling rules, compound words, root words, prefixes, suffixes, apostrophes, synonyms, describing words, and adjective or adverb.";
const NEW_META_TITLE = null;
const FINAL_ORDER = null;   // the order of the unit's lessons after this run (null: only the new lessons are put in)
const DESIGN_UNIT = "new:word-choice-g2";
const NOTES_FILE = "scripts/units/notes/en-literacy-year2.js";

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
    j.points.push(Object.assign({ tp: p.tp, grade: GRADE, strand: p.code.startsWith('RF') ? 'Foundational Skills' : 'Language', code: p.code, skill: p.skill }, p.activities ? { activities: p.activities } : {})); }
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the English vocabulary and grammar of Grade 2 (Part 12.3: describing words and the real things they describe, adjective or adverb); the adjective and adverb forms are English, and another language teaches its own. Read it against the wording when the vocabulary units of this language are designed.", review: 'year-design 2026-11-17' };
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
  s = s.replace(head, () => ' * The two notes on words in real life and on adjective or adverb (G2-549 to G2-551) were added by place-ready-cc.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; lessons placed in ' + UNIT + '; notes written; design marked');
