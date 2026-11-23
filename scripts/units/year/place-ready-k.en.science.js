#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-23): the nine Kindergarten units of the English science and health years
 * (design.en.science.json and design.en.health.json, grade K), each lesson on its teaching point and pages:
 *   science (7 units, 31 lessons): the existing Kindergarten science types and the batch K types K-687 … K-707;
 *   health (2 units, 11 lessons): the existing health and feelings types and the batch K/K2 types K-705 … K-711.
 * Every lesson has two real assets: its page(s) and its hands-on routine (the investigation, role-play or sort the class
 * does, `routine` in its teacher note, counted since 2026-11-23). Teacher notes: scripts/units/notes/en-science-k.js,
 * en-health-k.js, en-health-k2.js (written from the pages, read by one US Kindergarten teacher in four rounds).
 * Kindergarten science gets its year plan (7 units); Kindergarten health has two units, under the three a plan needs.
 * Weeks follow scripts/units/pacing.js: a lesson is two sessions and a unit ends with three; science has three sessions a
 * week, health one, so a health unit spans a term.
 *
 *   node scripts/units/year/place-ready-k.en.science.js      (refuses to run twice; it checks everything before it writes)
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
const SCI = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: 'K', subject: 'science', title, metaTitle: 'Kindergarten Science Lesson Plans: ' + title, metaDescription: desc, lessons });
const HEA = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: 'K', subject: 'health', title, metaTitle: 'Kindergarten Health Lesson Plans: ' + title, metaDescription: desc, lessons });
const UNITS = [
  SCI('k-senses-and-body', 'my-senses-and-my-body-kindergarten-unit', 'My Senses and My Body',
    'A Kindergarten science unit: 4 lessons on the five senses, the parts of the body, what a body needs to live, and living or not living, each with a hands-on routine.',
    [L('K:five-senses', ['K-355']), L('K:human-body', ['K-354', 'K-363']), L('K:body-needs', ['K-687']), L('K:living-nonliving', ['K-201'])]),
  SCI('k-weather-and-seasons', 'weather-and-the-seasons-kindergarten-unit', 'Weather and the Seasons',
    'A Kindergarten science unit: 5 lessons on weather words and the class weather chart, wind, a rain gauge, the four seasons, and getting ready for stormy weather.',
    [L('K:weather-temperature', ['K-364', 'K-365']), L('K:wind-watch', ['K-688']), L('K:rain-gauge', ['K-689']), L('K:seasons', ['K-322', 'K-207']), L('K:weather-ready', ['K-690'])]),
  SCI('k-animals-and-homes', 'animals-and-their-homes-kindergarten-unit', 'Animals and Their Homes',
    'A Kindergarten science unit: 4 lessons on where animals live, what animals eat, building a home for an animal, and how animals change the land around them.',
    [L('K:animal-groups-homes', ['K-204', 'K-383']), L('K:animal-food', ['K-691']), L('K:animal-home', ['K-692']), L('K:animals-change-land', ['K-693'])]),
  SCI('k-pushes-and-pulls', 'pushes-and-pulls-kindergarten-unit', 'Pushes and Pulls',
    'A Kindergarten science unit: 5 lessons on pushes and pulls, harder pushes, changing direction, and building and testing ramps, each with a hands-on test.',
    [L('K:push-pull', ['K-694']), L('K:push-strength', ['K-695']), L('K:change-direction', ['K-696']), L('K:ramp-to-target', ['K-697']), L('K:compare-ramps', ['K-698'])]),
  SCI('k-sink-float-boats', 'sink-float-and-build-a-boat-kindergarten-unit', 'Sink, Float, and Build a Boat',
    'A Kindergarten science and engineering unit: 4 lessons on testing what sinks or floats, planning a boat for a bear, building and testing it, and comparing boats.',
    [L('K:sink-float', ['K-384']), L('K:boat-plan', ['K-699']), L('K:boat-test', ['K-700']), L('K:boat-compare', ['K-701'])]),
  SCI('k-plants-and-animals-grow', 'plants-and-animals-grow-kindergarten-unit', 'Plants and Animals Grow',
    'A Kindergarten science unit: 4 lessons on what plants need, a bean seed journal, fruits and vegetables as food from plants, and animal babies and their needs.',
    [L('K:plant-needs', ['K-376']), L('K:seed-journal', ['K-702']), L('K:fruit-vegetable', ['K-202']), L('K:animal-babies', ['K-205'])]),
  SCI('k-sunlight-and-earth-care', 'sunlight-and-caring-for-our-earth-kindergarten-unit', 'Sunlight and Caring for Our Earth',
    'A Kindergarten science unit: 5 lessons on day and night, sun and shade, making shade for an ice cube, natural or made by people, and recycling and reusing.',
    [L('K:day-night', ['K-208']), L('K:sun-warms', ['K-703']), L('K:make-shade', ['K-704']), L('K:natural-made', ['K-214']), L('K:recycling', ['K-357', 'K-366'])]),
  HEA('k-feelings-and-friends', 'my-feelings-and-my-friends-kindergarten-unit', 'My Feelings and My Friends',
    'A Kindergarten health unit: 5 lessons on naming feelings, calm-down tools and asking for help, what I am good at, kind words and kind hands, and asking first.',
    [L('K:feelings', ['K-319', 'K-331']), L('K:calm-down', ['K-708']), L('K:i-can', ['K-705']), L('K:kind-words', ['K-709']), L('K:space-bubble', ['K-710'])]),
  HEA('k-healthy-and-safe', 'healthy-and-safe-me-kindergarten-unit', 'Healthy and Safe Me',
    'A Kindergarten health unit: 6 lessons on caring for my body, washing hands, everyday and sometimes foods, sleep and play, trusted grown-ups, and crossing the street.',
    [L('K:hygiene-habits', ['K-380', 'K-382']), L('K:germ-busters', ['K-711']), L('K:healthy-food', ['K-203']), L('K:sleep-play', ['K-706']), L('K:trusted-adults', ['K-707']), L('K:road-safety', ['K-374', 'K-373'])]),
];
const PLAN = { id: 'plan-k-science', slug: 'kindergarten-science-scope-and-sequence', grade: 'K', subject: 'science', title: 'Kindergarten Science Scope and Sequence',
  metaTitle: 'Kindergarten Science Scope and Sequence with Pacing Guide ({weeks} Weeks)',
  metaDescription: '{units} Kindergarten science units in teaching order, about {weeks} weeks of three science sessions a week, with each unit\'s lessons and its NGSS standards.',
  units: UNITS.filter((u) => u.subject === 'science').map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = Object.assign({}, require(file('scripts/units/notes/en-science-k.js')).points, require(file('scripts/units/notes/en-health-k.js')).points, require(file('scripts/units/notes/en-health-k2.js')).points);
for (const u of UNITS) {
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error(u.id + ': description of ' + u.metaDescription.length + ' characters');
  if (u.metaTitle.length > 70) throw new Error(u.id + ': title of ' + u.metaTitle.length + ' characters');
  for (const l of u.lessons) {
    if (!pts.has(l.point)) throw new Error(u.id + ': no teaching point ' + l.point);
    if (!notes[l.point]) throw new Error(u.id + ': no teacher note of ' + l.point);
  }
  // the weeks the description and the hub state come from the pacing rule (a Kindergarten lesson is two sessions)
  u.weeks = PACE.unitWeeks('K', u.lessons.map(() => ({})), { loc: 'en', subject: u.subject });
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
