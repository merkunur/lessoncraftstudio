#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-25): the five Grade 2 units of the English social studies year (design.en.social.json, grade 2),
 * each lesson on its teaching point and pages:
 *   20 lessons: the existing Grade 2 types (G2-369 and G2-371, G2-370, G2-362) and the batch S2 types G2-614 … G2-630
 *   (first published in English with this batch's Level Set ydr; the teacher-led class market day included).
 * Every lesson has two real assets: its page(s) and its routine (`routine` in its teacher note,
 * scripts/units/notes/en-social-2.js, read by one US second-grade teacher). "Class market day" carries three sessions as
 * the design gives it (`days`: 3: make the goods, write the prices, then the market itself).
 * Grade 2 social studies gets its year plan (5 units). Weeks follow scripts/units/pacing.js and the shared half weeks of
 * social studies (scripts/units/assemble.js).
 *
 *   node scripts/units/year/place-ready-2.en.social.js      (refuses to run twice; it checks everything before it writes)
 * Then: notes/apply.js · assemble --loc=en · apply-pacing-to-defs --check · build-year-plan / build-guide / build-looks ·
 * assessments/build-checks · coverage
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const file = (f) => path.join(REPO, f);
const read = (f) => fs.readFileSync(file(f), 'utf8');
const jsonLike = (raw, obj) => {
  const indent = (/^\{\r?\n(\s+)"/.exec(raw) || [, ' '])[1];
  let out = JSON.stringify(obj, null, indent); if (raw.includes('\r\n')) out = out.replace(/\n/g, '\r\n');
  return out + (/\r?\n$/.test(raw) ? (raw.includes('\r\n') ? '\r\n' : '\n') : '');
};
const PACE = require('../pacing.js');
const L = (point, types, days) => (days ? { point, types, days } : { point, types });
const SOC = (id, slug, title, desc, lessons, metaTitleEnd) => ({ id, slug, status: 'live', grade: '2', subject: 'social', title, metaTitle: 'Grade 2 Social Studies Lesson Plans: ' + (metaTitleEnd || title), metaDescription: desc, lessons });
const UNITS = [
  SOC('g2-our-class-and-community', 'our-class-and-our-community-grade-2-social-studies-unit', 'Our Class and Our Community',
    'A Grade 2 social studies unit: 4 lessons on a class agreement, laws in our community, local, state and national government, and services government provides.',
    [L('2:class-agreement', ['G2-614']), L('2:community-laws', ['G2-615']), L('2:levels-of-government', ['G2-616']), L('2:government-services', ['G2-617'])]),
  SOC('g2-maps-and-our-world', 'maps-and-our-world-grade-2-social-studies-unit', 'Maps and Our World',
    'A Grade 2 social studies unit: 4 lessons on north, south, east and west, the seven continents, how places change, and getting ready when disaster strikes.',
    [L('2:cardinal-directions', ['G2-369', 'G2-371']), L('2:continents', ['G2-370']), L('2:places-change', ['G2-618']), L('2:disaster-ready', ['G2-619'])]),
  SOC('g2-communities-near-and-far', 'communities-near-and-far-grade-2-social-studies-unit', 'Communities Near and Far',
    'A Grade 2 social studies unit: 4 lessons on winter traditions families may keep, where things come from, made here and sold there, and why countries trade.',
    [L('2:winter-traditions', ['G2-620']), L('2:where-it-comes-from', ['G2-621']), L('2:made-here-sold-there', ['G2-622']), L('2:why-countries-trade', ['G2-623'])]),
  SOC('g2-history-of-our-community', 'history-of-our-community-grade-2-social-studies-unit', 'History of Our Community',
    'A Grade 2 social studies unit: 4 lessons on aunts, cousins and grandparents, two stories of the same day, questions about an old photograph, and why a town changed.',
    [L('2:family-relationships', ['G2-362']), L('2:two-accounts', ['G2-624']), L('2:old-photo-questions', ['G2-625']), L('2:why-town-changed', ['G2-626'])]),
  SOC('g2-producers-consumers-money', 'producers-consumers-and-money-grade-2-social-studies-unit', 'Producers, Consumers and Money',
    'A Grade 2 social studies unit: 4 lessons on tools and skills for the job, what it costs to make something, what banks do, and a three-session class market day.',
    [L('2:tools-and-skills', ['G2-627']), L('2:cost-to-make', ['G2-628']), L('2:what-banks-do', ['G2-629']), L('2:class-market', ['G2-630'], 3)]),
];
const PLAN = { id: 'plan-2-social', slug: 'grade-2-social-studies-scope-and-sequence', grade: '2', subject: 'social', title: 'Grade 2 Social Studies Scope and Sequence',
  metaTitle: 'Grade 2 Social Studies Scope, Sequence and Pacing ({weeks} Weeks)',
  metaDescription: '{units} Grade 2 social studies units in teaching order, about {weeks} weeks of two social studies sessions a week, with each unit\'s lessons and its C3 standards.',
  units: UNITS.map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = require(file('scripts/units/notes/en-social-2.js')).points;
const assets = JSON.parse(read('frontend/content/teaching-graph/assets/en.json')).types;
for (const u of UNITS) {
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error(u.id + ': description of ' + u.metaDescription.length + ' characters');
  if (u.metaTitle.length > 70) throw new Error(u.id + ': title of ' + u.metaTitle.length + ' characters');
  for (const l of u.lessons) {
    if (!pts.has(l.point)) throw new Error(u.id + ': no teaching point ' + l.point);
    if (!notes[l.point]) throw new Error(u.id + ': no teacher note of ' + l.point);
    if (!notes[l.point].routine) throw new Error(u.id + ': the note of ' + l.point + ' has no routine');
    for (const t of l.types) { const a = assets[t]; if (!a || !(a.p || []).some((n) => n > 0)) throw new Error(u.id + ': ' + t + ' has no published English page'); }
  }
  // the weeks the description and the hub state come from the pacing rule
  u.weeks = PACE.unitWeeks('2', u.lessons.map((l) => (l.days === 3 ? { investigateDays: 3 } : {})), { loc: 'en', subject: u.subject });
}
const out = [];
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  for (const u of UNITS) if (defs.units.some((x) => x.id === u.id || x.slug === u.slug)) throw new Error(u.id + ' exists: this script ran before');
  if (defs.plans.some((p) => p.id === PLAN.id || p.slug === PLAN.slug)) throw new Error(PLAN.id + ' exists');
  const placed = new Set(defs.units.flatMap((u) => u.lessons.map((l) => l.point)));
  for (const u of UNITS) for (const l of u.lessons) if (placed.has(l.point)) throw new Error(l.point + ' already sits in a unit');
  defs.units.push(...UNITS);
  defs.plans.push(PLAN);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNITS.map((u) => u.id + ' (' + u.lessons.length + ' lessons, ' + u.weeks + ' weeks)').join('; ') + '; plan ' + PLAN.id);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
