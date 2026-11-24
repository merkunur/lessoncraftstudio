#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-24): the five Kindergarten units of the English social studies year (design.en.social.json,
 * grade K), each lesson on its teaching point and pages:
 *   20 lessons: the existing Kindergarten social studies types (K-377 and K-563, K-370 and K-375, K-213, K-212,
 *   K-210 and K-206) and the batch SK types K-712 … K-726, the two teacher-led lessons (the school walk, the class vote)
 *   included, each with its page.
 * Every lesson has two real assets: its page(s) and its routine (the talk, act-out, walk or vote the class does,
 * `routine` in its teacher note). Teacher notes: scripts/units/notes/en-social-k.js (written from the pages, read by one
 * US Kindergarten teacher).
 * Kindergarten social studies gets its year plan (5 units). Weeks follow scripts/units/pacing.js: a lesson is two
 * sessions and a unit ends with three; social studies has two sessions a week.
 *
 *   node scripts/units/year/place-ready-k.en.social.js      (refuses to run twice; it checks everything before it writes)
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
const L = (point, types) => ({ point, types });
const SOC = (id, slug, title, desc, lessons, metaTitleEnd) => ({ id, slug, status: 'live', grade: 'K', subject: 'social', title, metaTitle: 'Kindergarten Social Studies Lesson Plans: ' + (metaTitleEnd || title), metaDescription: desc, lessons });
const UNITS = [
  SOC('k-me-and-my-school', 'me-and-my-school-kindergarten-social-studies-unit', 'Me and My School',
    'A Kindergarten social studies unit: 4 lessons on our class rules, taking turns and sharing, the helpers at our school, and our classroom seen from above.',
    [L('K:class-rules', ['K-712']), L('K:take-turns-share', ['K-713']), L('K:school-helpers', ['K-725']), L('K:birds-eye-view', ['K-377', 'K-563'])]),
  SOC('k-my-family', 'my-family-kindergarten-social-studies-unit', 'My Family',
    'A Kindergarten social studies unit: 4 lessons on who is in my family, the many kinds of families, family traditions, and life long ago and today.',
    [L('K:family', ['K-370', 'K-375']), L('K:many-kinds-of-families', ['K-714']), L('K:family-traditions', ['K-715']), L('K:long-ago-today', ['K-716'])]),
  SOC('k-helpers-needs-wants', 'helpers-needs-and-wants-kindergarten-social-studies-unit', 'Helpers, Needs and Wants',
    'A Kindergarten social studies unit: 4 lessons on community helpers and their tools, needs and wants, choosing one thing, and the goods and services workers make.',
    [L('K:community-helpers', ['K-213']), L('K:wants-needs', ['K-212']), L('K:choosing-one-thing', ['K-717']), L('K:goods-and-services', ['K-718'])]),
  SOC('k-our-country-being-fair', 'our-country-and-being-fair-kindergarten-social-studies-unit', 'Our Country and Being Fair',
    'A Kindergarten social studies unit: 4 lessons on the United States and its flag, Martin Luther King Jr., being fair to everyone, and a class vote.',
    [L('K:our-flag', ['K-719']), L('K:martin-luther-king', ['K-720']), L('K:fair-for-everyone', ['K-721']), L('K:class-vote', ['K-726'])]),
  SOC('k-maps-places-getting-around', 'maps-places-and-getting-around-kindergarten-social-studies-unit', 'Maps, Places and Getting Around',
    'A Kindergarten social studies unit: 4 lessons on land and water on the globe, a neighborhood map, travel on land, water and air, and hot and cold places.',
    [L('K:land-and-water', ['K-722']), L('K:neighborhood-map', ['K-723']), L('K:transport-flying', ['K-210', 'K-206']), L('K:hot-cold-places', ['K-724'])],
    'Maps and Places'),
];
const PLAN = { id: 'plan-k-social', slug: 'kindergarten-social-studies-scope-and-sequence', grade: 'K', subject: 'social', title: 'Kindergarten Social Studies Scope and Sequence',
  metaTitle: 'Kindergarten Social Studies Scope, Sequence and Pacing ({weeks} Weeks)',
  metaDescription: '{units} Kindergarten social studies units in teaching order, about {weeks} weeks of two social studies sessions a week, with each unit\'s lessons and its C3 standards.',
  units: UNITS.map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = require(file('scripts/units/notes/en-social-k.js')).points;
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
  // the weeks the description and the hub state come from the pacing rule (a Kindergarten lesson is two sessions)
  u.weeks = PACE.unitWeeks('K', u.lessons.map(() => ({})), { loc: 'en', subject: u.subject });
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
