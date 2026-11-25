#!/usr/bin/env node
/**
 * Stage E-0, second part (2026-11-25): the two English design rows that waited for a page got one (operator: "fix both
 * of them"), and their lessons go into the units the year design gives them (operator ruling 2026-11-25: the unit's
 * description gets the new lesson count, nothing else).
 *   Kindergarten  Sorting, Opposites, and Story Order (k-sorting-words-telling-stories), 5 -> 6 lessons
 *       Walk, March, Tiptoe: Act It Out      K-728 (talk-verbs.js mode verbs)       NEW point K:act-out-verbs   L.K.5.d
 *   Grade 1       Reading Stories: Characters and Lessons (g1-reading-stories-characters-and-lessons), 5 -> 6 lessons
 *       Book Talk: Listen, Then Add On       G1-678 (talk-verbs.js mode booktalk)   NEW point 1:book-talk       SL.1.1.a
 * Both lessons are APPENDED (every unit check, check of the year and placement check names lessons by number; the end
 * moves no number). Neither lesson has a classroom tool that models it (the design's Picture Word Wall holds nouns, Name
 * Sticks only picks a speaker): each lesson's assets are its page and its routine (teacher note). Texas rows for the
 * two points; every other curriculum gets "not yet read". The notes are in scripts/units/notes/en-literacy-e0.js.
 *   node scripts/units/year/place-ready-e0b.en.literacy.js      (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-checks --unit (the two units) · sub-plans assemble · build-guide --unit (two) · gates
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
const POINTS = [
  { tp: 'K:act-out-verbs', grade: 'K', strand: 'Language', code: 'L.K.5.d', type: 'K-728', unit: 'k-sorting-words-telling-stories', after: 'K:two-meanings',
    design: 'Walk, march, tiptoe: act it out', count: [5, 6],
    skill: 'Act out action words with close meanings (walk, march, tiptoe, stomp; nibble, gobble) and tell how they differ: quiet or loud, slow or fast',
    tx: [['ELAR.K.3.C', 'teaches']], txWhy: 'Acting out walk, march, tiptoe and stomp and telling which one is quiet or fast is «identify and use words that name actions».' },
  { tp: '1:book-talk', grade: '1', strand: 'Speaking and Listening', code: 'SL.1.1.a', type: 'G1-678', unit: 'g1-reading-stories-characters-and-lessons', after: '1:who-tells-the-story',
    design: 'Book talk: listen, then add on', count: [5, 6],
    skill: 'Take part in a small-group book talk by its rules: look at and listen to the speaker, talk one at a time, and add on to what was just said',
    tx: [['ELAR.1.1.D', 'teaches'], ['ELAR.1.1.C', 'teaches']], txWhy: 'Taking turns in a group of four by the talk rules and adding on with «I agree with ... because» is «work collaboratively with others by following agreed-upon rules for discussion, including listening to others, speaking when recognized, and making appropriate contributions»; saying one idea about the story is «share information and ideas about the topic under discussion».' },
];
const NOTES = require(file('scripts/units/notes/en-literacy-e0.js')).points;

// ---- everything is read and checked first
for (const p of POINTS) { const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.routine || n.routine.length < 120 || !n.note) throw new Error('no whole teacher note with a routine for ' + p.tp); }
const out = [];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  const all = JSON.parse(read('frontend/content/teaching-graph/points.json')); const allPts = Array.isArray(all.points || all) ? (all.points || all) : Object.values(all.points || all);
  for (const p of POINTS) {
    if (j.points.some((x) => x.tp === p.tp) || allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    if (!allPts.some((x) => (x.tp || x.id) === p.after)) throw new Error('no point ' + p.after);
    j.points.push({ tp: p.tp, grade: p.grade, strand: p.strand, code: p.code, skill: p.skill });
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { const list = j.subjects.literacy[p.grade]; const at = list.indexOf(p.after); if (at < 0) throw new Error('order: no ' + p.after); list.splice(at + 1, 0, p.tp); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = loc === 'en-tx'
      ? { rows: p.tx.map(([id, rel]) => ({ id, rel })), why: p.txWhy, review: 'year-design 2026-11-25' }
      : { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-25 for an English lesson that waited for its page (acting out action words with close meanings; the rules of a book talk); read it against the wording when this language\'s units are designed.', review: 'year-design 2026-11-25' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  for (const p of POINTS) {
    const u = defs.units.find((x) => x.id === p.unit); if (!u) throw new Error('no unit ' + p.unit);
    if (u.lessons.some((l) => l.point === p.tp)) throw new Error(p.unit + ' holds ' + p.tp + ' already');
    if (u.lessons.length !== p.count[0]) throw new Error(p.unit + ' has ' + u.lessons.length + ' lessons, not ' + p.count[0]);
    const from = p.count[0] + ' lessons', to = p.count[1] + ' lessons';
    if (u.metaDescription.split(from).length !== 2) throw new Error(p.unit + ': the description does not say "' + from + '" once: ' + u.metaDescription);
    u.metaDescription = u.metaDescription.replace(from, to);
    u.lessons.push({ point: p.tp, types: [p.type] });
    console.log(p.unit + ': ' + u.lessons.map((l) => l.point).join(' · ') + '\n  ' + u.metaDescription);
  }
  out.push([f, jsonLike(raw, defs)]);
}
{
  const f = 'scripts/units/year/design.en.literacy.json', raw = read(f), design = JSON.parse(raw);
  let marked = 0;
  (function walk(o) { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if (typeof o.title === 'string' && o.new) { const p = POINTS.find((x) => x.design === o.title); if (p) { if (o.placed) throw new Error('the design lesson ' + o.title + ' is placed already'); o.placed = p.tp; marked++; } } Object.values(o).forEach(walk); } })(design);
  if (marked !== POINTS.length) throw new Error('the design names ' + marked + ' of the ' + POINTS.length + ' lessons');
  out.push([f, jsonLike(raw, design)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; two lessons appended; descriptions counted; design marked');
