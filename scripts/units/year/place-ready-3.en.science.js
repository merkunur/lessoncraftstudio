#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-24): the seven Grade 3 units of the English science and health years (design.en.science.json and
 * design.en.health.json, grade 3), on the existing Grade 3 types and the batch 3 types G3-581 … G3-611. Every lesson has
 * its pages and its hands-on routine (notes/en-science-3.js, en-health-3.js); the eleven investigations the design gives
 * three sessions say "days": 3. Grade 3 science gets its year plan (5 units); Grade 3 health has two units. Weeks follow
 * scripts/units/pacing.js.
 *
 *   node scripts/units/year/place-ready-3.en.science.js      (refuses to run twice)
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
const SCI = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: '3', subject: 'science', title, metaTitle: 'Grade 3 Science Lesson Plans: ' + title, metaDescription: desc, lessons });
const HEA = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: '3', subject: 'health', title, metaTitle: 'Grade 3 Health Lesson Plans: ' + title, metaDescription: desc, lessons });
const UNITS = [
  SCI('g3-forces-and-motion', 'forces-and-motion-grade-3-unit', 'Forces and Motion',
    'A Grade 3 science unit: 4 lessons on running a fair test, balanced and unbalanced forces, predicting the swings of a pendulum, and how friction slows a car.',
    [L('3:investigation', ['G3-400']), L('3:balanced-forces', ['G3-581'], 3), L('3:predict-the-swing', ['G3-582'], 3), L('3:friction', ['G3-583'])]),
  SCI('g3-magnets-and-static-electricity', 'magnets-and-static-electricity-grade-3-unit', 'Magnets and Static Electricity',
    'A Grade 3 science unit: 5 lessons on static electricity, what magnets pull, magnet force from a distance, and designing a magnet solution to a problem.',
    [L('3:static-electricity', ['G3-584']), L('3:what-magnets-pull', ['G3-585']), L('3:magnet-distance', ['G3-586'], 3), L('3:magnet-problem', ['G3-587']), L('3:compare-magnet-solutions', ['G3-588'], 3)]),
  SCI('g3-weather-and-climate', 'weather-and-climate-grade-3-unit', 'Weather and Climate',
    'A Grade 3 science unit: 6 lessons on weather data and graphs, the weather of each season, the water cycle, world climates, and designs that reduce weather damage.',
    [L('3:weather-data', ['G3-589'], 3), L('3:seasons-weather', ['G3-590']), L('3:water-cycle', ['G3-385']), L('3:climates-of-the-world', ['G3-591'], 3), L('3:weather-problem', ['G3-592']), L('3:reduce-weather-damage', ['G3-593'], 3)]),
  SCI('g3-life-cycles-and-traits', 'life-cycles-and-traits-grade-3-unit', 'Life Cycles and Traits',
    'A Grade 3 science unit: 5 lessons on butterfly and frog life cycles, flowers and seeds, raising mealworms, traits from parents, and traits the environment changes.',
    [L('3:life-cycles-compare', ['G3-393']), L('3:flower-parts', ['G3-392']), L('3:mealworm-life-cycle', ['G3-594'], 3), L('3:traits-from-parents', ['G3-595'], 3), L('3:traits-environment', ['G3-596'])]),
  SCI('g3-surviving-in-a-changing-world', 'surviving-in-a-changing-world-grade-3-unit', 'Surviving in a Changing World',
    'A Grade 3 science unit: 5 lessons on animals that live in groups, camouflage, which living things survive in a habitat, fossils, and when a habitat changes.',
    [L('3:animals-in-groups', ['G3-597']), L('3:camouflage', ['G3-598'], 3), L('3:survive-well-or-not', ['G3-599']), L('3:fossils', ['G3-600'], 3), L('3:habitat-change', ['G3-601'])]),
  HEA('g3-healthy-body-healthy-choices', 'healthy-body-healthy-choices-grade-3-unit', 'Healthy Body, Healthy Choices',
    'A Grade 3 health unit: 5 lessons on how germs spread, planning MyPlate meals, sleep, screens and play, what sways our choices, and a health goal to track.',
    [L('3:how-germs-spread', ['G3-602']), L('3:myplate-day', ['G3-603']), L('3:sleep-screens-play', ['G3-604']), L('3:what-sways-my-choices', ['G3-605']), L('3:goal-plan-track', ['G3-606'])]),
  HEA('g3-safe-kind-and-ready-to-help', 'safe-kind-and-ready-to-help-grade-3-unit', 'Safe, Kind and Ready to Help',
    'A Grade 3 health unit: 5 lessons on naming and calming big feelings, solving a conflict, saying no, a home fire escape plan, and trusted adults who can help.',
    [L('3:big-feelings', ['G3-609']), L('3:solve-a-conflict', ['G3-610']), L('3:say-no-walk-away', ['G3-611']), L('3:fire-escape-plan', ['G3-607']), L('3:who-can-help', ['G3-608'])]),
];
const PLAN = { id: 'plan-3-science', slug: 'grade-3-science-scope-and-sequence', grade: '3', subject: 'science', title: 'Grade 3 Science Scope and Sequence',
  metaTitle: 'Grade 3 Science Scope and Sequence with Pacing Guide ({weeks} Weeks)',
  metaDescription: '{units} Grade 3 science units in teaching order, about {weeks} weeks of three science sessions a week, with each unit\'s lessons and its NGSS standards.',
  units: UNITS.filter((u) => u.subject === 'science').map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = Object.assign({}, require(file('scripts/units/notes/en-science-3.js')).points, require(file('scripts/units/notes/en-health-3.js')).points);
for (const u of UNITS) {
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error(u.id + ': description of ' + u.metaDescription.length + ' characters');
  if (u.metaTitle.length > 70) throw new Error(u.id + ': title of ' + u.metaTitle.length + ' characters');
  for (const l of u.lessons) {
    if (!pts.has(l.point)) throw new Error(u.id + ': no teaching point ' + l.point);
    if (!notes[l.point]) throw new Error(u.id + ': no teacher note of ' + l.point);
  }
  // the weeks the description and the hub state come from the pacing rule (a Grade 3 lesson is two sessions)
  u.weeks = PACE.unitWeeks('3', u.lessons.map(() => ({})), { loc: 'en', subject: u.subject });
}
const out = [];
{
  const f = 'frontend/content/units/defs/en.json', raw = read(f), defs = JSON.parse(raw);
  for (const u of UNITS) if (defs.units.some((x) => x.id === u.id || x.slug === u.slug)) throw new Error(u.id + ' exists: this script ran before');
  if (defs.plans.some((p) => p.id === PLAN.id)) throw new Error(PLAN.id + ' exists');
  defs.units.push(...UNITS);
  defs.plans.push(PLAN);
  out.push([f, jsonLike(raw, defs)]);
  console.log('to place: ' + UNITS.map((u) => u.id + ' (' + u.lessons.length + ' lessons, ' + u.weeks + ' weeks)').join('; ') + '; plan ' + PLAN.id);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
