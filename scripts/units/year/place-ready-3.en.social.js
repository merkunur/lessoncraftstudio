#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-25): the four Grade 3 units of the English social studies year (design.en.social.json, grade 3),
 * each lesson on its teaching point and pages:
 *   19 lessons: the existing Grade 3 type G3-396 (continents and oceans) and the batch S3 types G3-612 … G3-629
 *   (first published in English with this batch's Level Set yds; the teacher-led "Deciding together" included, with
 *   its record page G3-629).
 * Every lesson has two real assets: its page(s) and its routine (`routine` in its teacher note,
 * scripts/units/notes/en-social-3.js, read by one US third-grade teacher). "Make a grid map of our community" carries
 * three sessions as the design gives it (`days`: 3).
 * Grade 3 social studies gets its year plan (4 units). Weeks follow scripts/units/pacing.js and the shared half weeks of
 * social studies (scripts/units/assemble.js).
 *
 *   node scripts/units/year/place-ready-3.en.social.js      (refuses to run twice; it checks everything before it writes)
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
const SOC = (id, slug, title, desc, lessons, metaTitleEnd) => ({ id, slug, status: 'live', grade: '3', subject: 'social', title, metaTitle: 'Grade 3 Social Studies Lesson Plans: ' + (metaTitleEnd || title), metaDescription: desc, lessons });
const UNITS = [
  SOC('g3-citizens-rules-and-laws', 'citizens-rules-and-laws-grade-3-social-studies-unit', 'Citizens, Rules and Laws',
    'A Grade 3 social studies unit: 4 lessons on civic virtues at school, the Constitution and a class constitution, deciding together, and how people change laws.',
    [L('3:civic-virtues', ['G3-612']), L('3:constitution', ['G3-613']), L('3:deciding-together', ['G3-629']), L('3:changing-laws', ['G3-614'])]),
  SOC('g3-maps-world-and-state', 'maps-of-our-world-and-our-state-grade-3-social-studies-unit', 'Maps of Our World and Our State',
    'A Grade 3 social studies unit: 5 lessons on continents and oceans, map scale, a grid map of our community, where people live and why, and towns near resources.',
    [L('3:continents-oceans', ['G3-396']), L('3:map-scale', ['G3-615']), L('3:grid-map', ['G3-616'], 3), L('3:where-people-live', ['G3-617']), L('3:towns-near-resources', ['G3-618'])]),
  SOC('g3-how-our-government-works', 'how-our-government-works-grade-3-social-studies-unit', 'How Our Government Works',
    'A Grade 3 social studies unit: 5 lessons on local, state and national government, the three branches, how taxes pay for services, ways to decide, and a community problem.',
    [L('3:levels-of-government', ['G3-619']), L('3:three-branches', ['G3-620']), L('3:taxes-services', ['G3-621']), L('3:ways-to-decide', ['G3-622']), L('3:community-problem', ['G3-623'])]),
  SOC('g3-our-community-then-and-now', 'our-community-then-and-now-grade-3-social-studies-unit', 'Our Community Then and Now',
    'A Grade 3 social studies unit: 5 lessons on primary and secondary sources, a double timeline, life then and now, resources and jobs, and causes and effects in history.',
    [L('3:primary-secondary', ['G3-624']), L('3:double-timeline', ['G3-625']), L('3:then-and-now', ['G3-626']), L('3:economic-resources', ['G3-627']), L('3:cause-effect-history', ['G3-628'])]),
];
const PLAN = { id: 'plan-3-social', slug: 'grade-3-social-studies-scope-and-sequence', grade: '3', subject: 'social', title: 'Grade 3 Social Studies Scope and Sequence',
  metaTitle: 'Grade 3 Social Studies Scope, Sequence and Pacing ({weeks} Weeks)',
  metaDescription: '{units} Grade 3 social studies units in teaching order, about {weeks} weeks of two social studies sessions a week, with each unit\'s lessons and its C3 standards.',
  units: UNITS.map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = require(file('scripts/units/notes/en-social-3.js')).points;
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
  u.weeks = PACE.unitWeeks('3', u.lessons.map((l) => (l.days === 3 ? { investigateDays: 3 } : {})), { loc: 'en', subject: u.subject });
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
