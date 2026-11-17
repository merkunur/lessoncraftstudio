#!/usr/bin/env node
/**
 * Part 12.3, English literacy, thirty-ninth run (2026-11-17): the Kindergarten unit Draw and Write: Opinions, Facts,
 * and Stories on the eight page types of "Year pages, literacy OO" (types/_shared/draw-and-write-k.js). Every lesson
 * has two page types: the first is read and marked with the teacher, the second is the child’s own drawing and writing.
 *
 *   Draw and Write: Opinions, Facts, and Stories (NEW unit, the last of the Kindergarten literacy plan, as the design has it)
 *     My favorite and why: an opinion          K-673, K-674   NEW K:opinion-favorite-why        W.K.1
 *     Teach a fact: draw, label, and write     K-675, K-676   NEW K:fact-draw-label-write       W.K.2
 *     What happened to me: a small moment      K-677, K-678   NEW K:small-moment-draw-write     W.K.3
 *     Author’s chair: a friend asks, I add     K-679, K-680   NEW K:authors-chair-add-detail    W.K.5
 *
 * Texas rows for the four new points; every other curriculum: not yet read.
 *
 *   node scripts/units/year/place-ready-oo.en.literacy.js <notes.json>     (refuses to run twice; checks before it writes)
 * Then: build-points · build-assets · every curricula/build-<x>.js · notes/apply.js · assemble --loc=en · pacing ·
 *       assemble · build-guide --unit · build-year-plan --plan=plan-k-literacy · build-looks
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
if (!NF || !fs.existsSync(NF)) throw new Error('usage: place-ready-oo.en.literacy.js <notes.json>');
const straight = (s) => String(s).split('’').join("'").split('‘').join("'");
const NOTES = JSON.parse(fs.readFileSync(NF, 'utf8'));
const POINTS = [
  {"tp":"K:opinion-favorite-why","code":"W.K.1","strand":"Writing","types":["K-673","K-674"],"max":1480,"design":"My favorite and why: an opinion","skill":"Tell what you like best and why: find the opinion and the reason in a short piece, then draw and write your own","tx":[["ELAR.K.10.A","teaches"],["ELAR.K.10.B","teaches"]],"txWhy":"Choosing a favorite and drawing it before writing is «plan by generating ideas for writing through class discussions and drawings»; the drawing with its sentence (or the sentence the child tells the teacher) is «develop drafts in oral, pictorial, or written form by organizing ideas». The Kindergarten TEKS name no opinion piece of its own (K.11 names literary and informational texts)."},
  {"tp":"K:fact-draw-label-write","code":"W.K.2","strand":"Writing","types":["K-675","K-676"],"max":1480,"design":"Teach a fact: draw, label, and write","skill":"Name a topic, draw and label it, and write one or two facts about it","tx":[["ELAR.K.11.B","teaches"],["ELAR.K.10.B","teaches"]],"txWhy":"Drawing a topic, labeling two parts and writing or telling two facts about it is «dictate or compose informational texts»; the drawing, the labels and the sentences are a draft «in oral, pictorial, or written form»."},
  {"tp":"K:small-moment-draw-write","code":"W.K.3","strand":"Writing","types":["K-677","K-678"],"max":1480,"design":"What happened to me: a small moment","skill":"Tell one small moment in the order it happened, draw and write it, and tell how you felt","tx":[["ELAR.K.11.A","teaches"],["ELAR.K.10.B","teaches"]],"txWhy":"A small moment told in three drawings with a sentence is «dictate or compose literary texts, including personal narratives»; putting the moment in order (first, next, last) is «organizing ideas» in a pictorial and written draft."},
  {"tp":"K:authors-chair-add-detail","code":"W.K.5","strand":"Writing","types":["K-679","K-680"],"max":1480,"design":"Author's chair: a friend asks, I add","skill":"Read your writing to the class, answer a classmate’s question, and add one detail to the picture or the words","tx":[["ELAR.K.10.C","teaches"],["ELAR.K.10.E","teaches"],["ELAR.K.1.A","teaches"]],"txWhy":"Adding the detail a friend asked for is «revise drafts by adding details in pictures or words»; reading the piece from the author’s chair is «share writing»; the friend’s question and the author’s answer are «listen actively and ask questions to understand information and answer questions using multi-word responses»."},
];
const GRADE = "K";
const UNIT = {"id":"k-draw-and-write-opinions-facts-and-stories","slug":"draw-and-write-opinions-facts-and-stories-kindergarten-unit","status":"live","grade":"K","subject":"literacy","title":"Draw and Write: Opinions, Facts, and Stories","metaTitle":"Draw and Write: Kindergarten Opinions, Facts, Stories","metaDescription":"Kindergarten writing lessons: tell what you like best and why, draw and label a topic and write a fact, tell a small moment in order, and add a detail a friend asks for.","weeks":2};
const PLAN_ID = "plan-k-literacy";
const DESIGN_UNIT = "new:draw-and-write-k";
const AFTER_UNIT = "k-reading-to-learn-fact-texts", ORDER_AFTER = "K:two-texts-one-topic";   // the unit it follows in the plan; the point its points follow in the order
const NOTES_FILE = "scripts/units/notes/en-literacy-yeark.js";

// ---- everything is read and checked first
if (UNIT.metaDescription.length < 110 || UNIT.metaDescription.length > 170) throw new Error('description: ' + UNIT.metaDescription.length + ' characters');
if (UNIT.metaTitle.length > 60) throw new Error('meta title: ' + UNIT.metaTitle.length);
for (const p of POINTS) {
  const n = NOTES[p.tp]; if (!n || !n.title || !n.objective || !n.mistake || !n.words || !n.watch) throw new Error('no whole teacher note of ' + p.tp);
  for (const k of ['title', 'objective', 'mistake', 'words', 'watch']) n[k] = straight(n[k]);
  if (/\bfree\b|Premium/i.test(n.title + n.objective + n.mistake + n.words + n.watch)) throw new Error('the note of ' + p.tp + ' says free or Premium');
  const len = n.objective.length + n.mistake.length + n.words.length + n.watch.length; if (len > p.max) throw new Error('the note of ' + p.tp + ' has ' + len + ' letters (its sheet holds about ' + p.max + ')');
}
const out = [];   // [file, text]
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  const all = JSON.parse(read('frontend/content/teaching-graph/points.json')); const allPts = Array.isArray(all.points || all) ? (all.points || all) : Object.values(all.points || all);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp) || allPts.some((x) => (x.tp || x.id) === p.tp)) throw new Error(p.tp + ' exists: this script ran before');
    j.points.push(Object.assign({ tp: p.tp, grade: GRADE, strand: p.strand, code: p.code, skill: p.skill }, p.activities ? { activities: p.activities } : {})); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/order.json', raw = read(f), j = JSON.parse(raw);
  const list = j.subjects.literacy[GRADE], at = list.indexOf(ORDER_AFTER); if (at < 0) throw new Error('no point ' + ORDER_AFTER + ' in the order');
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
      : { none: 'not yet read against this curriculum', why: "The point was added on 2026-11-17 for the drawing and writing of Kindergarten (Part 12.3: an opinion with a reason, facts and labels, a small moment in order, a detail added in the author chair); the sentence frames and the word banks are English. Read it against the wording when the first writing units of this language are designed.", review: 'year-design 2026-11-17' };
  }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  if (defs.units.some((x) => x.id === UNIT.id || x.slug === UNIT.slug)) throw new Error('the unit exists already');
  const plan = defs.plans.find((x) => x.id === PLAN_ID); if (!plan) throw new Error('no plan ' + PLAN_ID);
  const unit = Object.assign({}, UNIT, { lessons: POINTS.map((p) => Object.assign({ point: p.tp, types: p.types }, p.days ? { days: p.days } : {})) });   // a point's screen activity comes from the point itself; days: 3 = a writing lesson whose pages take three days (pacing.js)
  const a = defs.units.findIndex((x) => x.id === AFTER_UNIT), b = plan.units.indexOf(AFTER_UNIT); if (a < 0 || b < 0) throw new Error('no unit ' + AFTER_UNIT + ' in ' + PLAN_ID);
  defs.units.splice(a + 1, 0, unit);
  plan.units.splice(b + 1, 0, UNIT.id);
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
  s = s.replace(head, () => ' * The four notes of the unit Draw and Write: Opinions, Facts, and Stories (K-673 to K-680) were added by place-ready-oo.en.literacy.js;\n * the reviewer of the pages read them (2026-11-17, every finding applied).\n' + head);
  s = s.slice(0, -end.length) + block + end;
  out.push([NOTES_FILE, raw.includes('\r\n') ? s.replace(/\n/g, '\r\n') : s]);
}

// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('points added: ' + POINTS.map((p) => p.tp).join(', ') + '; unit placed after ' + AFTER_UNIT + ' in ' + PLAN_ID + '; notes written; design marked');
