#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-24): the five Grade 1 units of the English social studies year (design.en.social.json, grade 1),
 * each lesson on its teaching point and pages:
 *   20 lessons: the existing Grade 1 types (G1-385 and G1-386, G1-379, G1-528) with G1-530 (draw your own map with a key,
 *   first published in English with this batch's Level Set ydq), the batch S1 types G1-653 … G1-669 (the teacher-led class
 *   meeting included) and G1-670 (Prices at the Market, the page of G2-472 under a Grade 1 id).
 * Every lesson has two real assets: its page(s) and its routine (`routine` in its teacher note,
 * scripts/units/notes/en-social-1.js, read by one US first-grade teacher). "Read the map key" carries three sessions as the
 * design gives it (`days`: 3, the third finishes the child's own map).
 * Grade 1 social studies gets its year plan (5 units). Weeks follow scripts/units/pacing.js and the shared half weeks of
 * social studies (scripts/units/assemble.js).
 *
 *   node scripts/units/year/place-ready-1.en.social.js      (refuses to run twice; it checks everything before it writes)
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
const SOC = (id, slug, title, desc, lessons, metaTitleEnd) => ({ id, slug, status: 'live', grade: '1', subject: 'social', title, metaTitle: 'Grade 1 Social Studies Lesson Plans: ' + (metaTitleEnd || title), metaDescription: desc, lessons });
const UNITS = [
  SOC('g1-rules-and-good-citizens', 'rules-and-good-citizens-grade-1-social-studies-unit', 'Rules and Good Citizens',
    'A Grade 1 social studies unit: 4 lessons on rules in different places, a class meeting with talking rules, being a good citizen, and leaders and their jobs.',
    [L('1:rules-in-places', ['G1-653']), L('1:class-meeting', ['G1-669']), L('1:good-citizen', ['G1-654']), L('1:leaders-jobs', ['G1-655'])]),
  SOC('g1-families-long-ago-and-today', 'families-long-ago-and-today-grade-1-social-studies-unit', 'Families Long Ago and Today',
    'A Grade 1 social studies unit: 4 lessons on family generations, clues in an old postcard, asking someone older, and school and play long ago and today.',
    [L('1:family-generations', ['G1-385', 'G1-386']), L('1:old-postcard-clues', ['G1-656']), L('1:ask-someone-older', ['G1-657']), L('1:school-play-long-ago', ['G1-658'])]),
  SOC('g1-maps-and-places', 'maps-and-places-grade-1-social-studies-unit', 'Maps and Places',
    'A Grade 1 social studies unit: 4 lessons on reading a map key and making a map, city, suburb and small town, work that fits the land, and caring for places.',
    [L('1:map-key', ['G1-379', 'G1-528', 'G1-530'], 3), L('1:city-suburb-town', ['G1-659']), L('1:work-fits-land', ['G1-660']), L('1:caring-for-places', ['G1-661'])]),
  SOC('g1-our-country-symbols-stories', 'our-countrys-symbols-and-stories-grade-1-social-studies-unit', 'Our Country\'s Symbols and Stories',
    'A Grade 1 social studies unit: 4 lessons on the symbols of the United States, Washington and Lincoln, the Fourth of July, and people who made life fairer.',
    [L('1:us-symbols', ['G1-662']), L('1:washington-lincoln', ['G1-663']), L('1:fourth-of-july', ['G1-664']), L('1:people-made-fairer', ['G1-665'])]),
  SOC('g1-goods-services-money', 'goods-services-and-money-grade-1-social-studies-unit', 'Goods, Services and Money',
    'A Grade 1 social studies unit: 4 lessons on goods and services near and far, jobs and earning money, prices at the market, and saving for a goal.',
    [L('1:goods-services-near-far', ['G1-666']), L('1:jobs-earning-money', ['G1-667']), L('1:prices-market', ['G1-670']), L('1:saving-goal', ['G1-668'])]),
];
const PLAN = { id: 'plan-1-social', slug: 'grade-1-social-studies-scope-and-sequence', grade: '1', subject: 'social', title: 'Grade 1 Social Studies Scope and Sequence',
  metaTitle: 'Grade 1 Social Studies Scope, Sequence and Pacing ({weeks} Weeks)',
  metaDescription: '{units} Grade 1 social studies units in teaching order, about {weeks} weeks of two social studies sessions a week, with each unit\'s lessons and its C3 standards.',
  units: UNITS.map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = require(file('scripts/units/notes/en-social-1.js')).points;
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
  u.weeks = PACE.unitWeeks('1', u.lessons.map((l) => (l.days === 3 ? { investigateDays: 3 } : {})), { loc: 'en', subject: u.subject });
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
