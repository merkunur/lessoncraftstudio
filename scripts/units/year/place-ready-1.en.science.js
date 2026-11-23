#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-23): the eight Grade 1 units of the English science and health years (design.en.science.json and
 * design.en.health.json, grade 1), on the existing Grade 1 types and the batch 1 types G1-626 … G1-652. Every lesson has
 * its pages and its hands-on routine (notes/en-science-1.js, en-health-1.js). Grade 1 science gets its year plan (6
 * units); Grade 1 health has two units. Weeks follow scripts/units/pacing.js.
 *
 *   node scripts/units/year/place-ready-1.en.science.js      (refuses to run twice)
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
const SCI = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: '1', subject: 'science', title, metaTitle: 'Grade 1 Science Lesson Plans: ' + title, metaDescription: desc, lessons });
const HEA = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: '1', subject: 'health', title, metaTitle: 'Grade 1 Health Lesson Plans: ' + title, metaDescription: desc, lessons });
const UNITS = [
  SCI('g1-sound-and-vibrations', 'sound-and-vibrations-grade-1-unit', 'Sound and Vibrations',
    'A Grade 1 science unit: 4 lessons on the five senses, how vibrations make sound, how sound makes things move, and building and testing cup telephones.',
    [L('1:five-senses', ['G1-357', 'G1-358']), L('1:vibrations-make-sound', ['G1-626'], 3), L('1:sound-moves-things', ['G1-627']), L('1:cup-telephone', ['G1-628'], 3)]),
  SCI('g1-light-shadows-signals', 'light-shadows-and-signals-grade-1-unit', 'Light, Shadows, and Signals',
    'A Grade 1 science unit: 5 lessons on seeing only with light, what light passes through, mirrors, shadows near and far, and sending messages with light.',
    [L('1:see-with-light', ['G1-629']), L('1:light-through-materials', ['G1-630'], 3), L('1:mirrors-bounce-light', ['G1-631']), L('1:shadows-near-far', ['G1-632']), L('1:light-messages', ['G1-633'], 3)]),
  SCI('g1-weather-and-sky', 'weather-and-sky-patterns-grade-1-unit', 'Weather and Sky Patterns',
    'A Grade 1 science unit: 6 lessons on the weather forecast, the Sun, Earth, and Moon, a shadow through the day, a Moon journal, the night sky, and daylight hours.',
    [L('1:weather', ['G1-362', 'G1-363']), L('1:sun-earth-moon', ['G1-378', 'G1-391']), L('1:shadow-through-day', ['G1-634']), L('1:moon-journal', ['G1-635'], 3), L('1:day-night-sky', ['G1-636']), L('1:daylight-hours', ['G1-637'])]),
  SCI('g1-animal-bodies-homes-families', 'animal-bodies-homes-and-families-grade-1-unit', 'Animal Bodies, Homes, and Families',
    'A Grade 1 science unit: 5 lessons on animal groups and coverings, our body parts and their jobs, habitats, animal parents and young, and designs that copy animals.',
    [L('1:animal-classes-coverings', ['G1-201', 'G1-205']), L('1:body-parts', ['G1-356']), L('1:habitats-needs', ['G1-398', 'G1-202']), L('1:animal-parents', ['G1-638'], 3), L('1:design-like-an-animal', ['G1-639'], 3)]),
  SCI('g1-plants-and-young', 'plants-and-young-living-things-grade-1-unit', 'Plants and Young Living Things',
    'A Grade 1 science unit: 4 lessons on the parts of a plant, life cycles in order, young animals like their parents, and seedlings compared with the grown plant.',
    [L('1:plant-parts', ['G1-376']), L('1:life-cycles', ['G1-203', 'G1-377']), L('1:like-parents', ['G1-640'], 3), L('1:seedlings-and-parent', ['G1-641'])]),
  SCI('g1-materials-and-rafts', 'materials-and-rafts-grade-1-unit', 'Materials and Rafts',
    'A Grade 1 science and engineering unit: 4 lessons on what things are made of, testing what sinks or floats, designing a raft, and testing two rafts.',
    [L('1:materials-recycling', ['G1-364', 'G1-365']), L('1:sink-float', ['G1-204', 'G1-399']), L('1:design-a-raft', ['G1-642'], 3), L('1:test-two-rafts', ['G1-643'])]),
  HEA('g1-staying-safe', 'staying-safe-and-getting-help-grade-1-unit', 'Staying Safe and Getting Help',
    'A Grade 1 health unit: 5 lessons on whole-body listening, road signs, fire safety and 911, asking a grown-up about medicine, and say no, go away, tell.',
    [L('1:whole-body-listening', ['G1-649']), L('1:road-signs', ['G1-384']), L('1:fire-safety-911', ['G1-650']), L('1:ask-a-grown-up', ['G1-644']), L('1:say-no-go-tell', ['G1-651'])]),
  HEA('g1-healthy-habits-food', 'healthy-habits-and-healthy-food-grade-1-unit', 'Healthy Habits and Healthy Food',
    'A Grade 1 health unit: 6 lessons on MyPlate food groups, building a MyPlate lunch, a habit to grow, teeth and germs, helping a friend, and health helpers.',
    [L('1:myplate-groups', ['G1-645']), L('1:myplate-lunch', ['G1-646']), L('1:habit-to-grow', ['G1-647']), L('1:healthy-habits', ['G1-403', 'G1-404', 'G1-405']), L('1:help-a-friend', ['G1-652']), L('1:health-helpers', ['G1-648'])]),
];
const PLAN = { id: 'plan-1-science', slug: 'grade-1-science-scope-and-sequence', grade: '1', subject: 'science', title: 'Grade 1 Science Scope and Sequence',
  metaTitle: 'Grade 1 Science Scope and Sequence with Pacing Guide ({weeks} Weeks)',
  metaDescription: '{units} Grade 1 science units in teaching order, about {weeks} weeks of three science sessions a week, with each unit\'s lessons and its NGSS standards.',
  units: UNITS.filter((u) => u.subject === 'science').map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = Object.assign({}, require(file('scripts/units/notes/en-science-1.js')).points, require(file('scripts/units/notes/en-health-1.js')).points);
for (const u of UNITS) {
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error(u.id + ': description of ' + u.metaDescription.length + ' characters');
  if (u.metaTitle.length > 70) throw new Error(u.id + ': title of ' + u.metaTitle.length + ' characters');
  for (const l of u.lessons) {
    if (!pts.has(l.point)) throw new Error(u.id + ': no teaching point ' + l.point);
    if (!notes[l.point]) throw new Error(u.id + ': no teacher note of ' + l.point);
  }
  // the weeks the description and the hub state come from the pacing rule (a Grade 1 lesson is two sessions)
  u.weeks = PACE.unitWeeks('1', u.lessons.map(() => ({})), { loc: 'en', subject: u.subject });
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
