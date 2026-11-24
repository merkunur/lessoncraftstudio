#!/usr/bin/env node
/**
 * Stage D-3 (2026-11-24): the eight Grade 2 units of the English science and health years (design.en.science.json and
 * design.en.health.json, grade 2), on the existing Grade 2 types and the batch 2 types G2-584 … G2-613. Every lesson has
 * its pages and its hands-on routine (notes/en-science-2.js, en-health-2.js); the nine investigations the design gives
 * three sessions say "days": 3. Grade 2 science gets its year plan (6 units); Grade 2 health has two units. Weeks follow
 * scripts/units/pacing.js.
 *
 *   node scripts/units/year/place-ready-2.en.science.js      (refuses to run twice)
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
const SCI = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: '2', subject: 'science', title, metaTitle: 'Grade 2 Science Lesson Plans: ' + title, metaDescription: desc, lessons });
const HEA = (id, slug, title, desc, lessons) => ({ id, slug, status: 'live', grade: '2', subject: 'health', title, metaTitle: 'Grade 2 Health Lesson Plans: ' + title, metaDescription: desc, lessons });
const UNITS = [
  SCI('g2-properties-of-materials', 'properties-of-materials-grade-2-unit', 'Properties of Materials',
    'A Grade 2 science unit: 5 lessons on sorting by material, testing properties, shaping clay to float, the best material for a job, and building something new.',
    [L('2:materials', ['G2-348']), L('2:describe-materials', ['G2-584'], 3), L('2:sink-float', ['G2-382', 'G2-383']), L('2:best-material', ['G2-585'], 3), L('2:take-apart-build', ['G2-586'])]),
  SCI('g2-land-and-water', 'land-and-water-on-earth-grade-2-unit', 'Land and Water on Earth',
    'A Grade 2 science unit: 4 lessons on mapping land and water, a landform model, where water is found on Earth, and a globe toss to see if there is more water or land.',
    [L('2:land-water-map', ['G2-587']), L('2:landform-model', ['G2-588'], 3), L('2:water-on-earth', ['G2-589']), L('2:globe-toss', ['G2-590'])]),
  SCI('g2-earth-changes', 'earth-changes-fast-and-slow-grade-2-unit', 'Earth Changes, Fast and Slow',
    'A Grade 2 science unit: 6 lessons on day and night, the Moon in a month, fast and slow Earth changes, water shaping land, and ways to stop sand washing away.',
    [L('2:day-and-night', ['G2-368']), L('2:moon-phases', ['G2-367']), L('2:fast-slow-changes', ['G2-591']), L('2:water-shapes-land', ['G2-592'], 3), L('2:stop-the-sand', ['G2-593'], 3), L('2:best-solution', ['G2-594'])]),
  SCI('g2-heating-and-cooling', 'heating-and-cooling-grade-2-unit', 'Heating and Cooling',
    'A Grade 2 science unit: 4 lessons on where ice melts fastest, melting and freezing, changes we cannot undo, and a claim with evidence about changing back.',
    [L('2:ice-melt-fastest', ['G2-595'], 3), L('2:melt-freeze-back', ['G2-596']), L('2:changes-cannot-undo', ['G2-597']), L('2:change-back-claim', ['G2-598'])]),
  SCI('g2-plants-and-pollinators', 'plants-pollinators-and-life-cycles-grade-2-unit', 'Plants, Pollinators, and Life Cycles',
    'A Grade 2 science unit: 5 lessons on plant parts we eat, what plants need to grow, how seeds travel, being a pollinator, and life cycles from egg to grown-up.',
    [L('2:plant-parts', ['G2-363', 'G2-364']), L('2:plants-light-water', ['G2-599'], 3), L('2:seeds-on-the-move', ['G2-600'], 3), L('2:be-a-pollinator', ['G2-601']), L('2:life-cycles', ['G2-365', 'G2-366'])]),
  SCI('g2-habitats', 'habitats-many-kinds-of-life-grade-2-unit', 'Habitats: Many Kinds of Life',
    'A Grade 2 science unit: 4 lessons on habitats and adaptations, a schoolyard survey of living things, comparing desert, rain forest, and ocean, and plant habitats.',
    [L('2:habitats-adaptations', ['G2-380', 'G2-381']), L('2:schoolyard-survey', ['G2-602'], 3), L('2:compare-habitats', ['G2-603']), L('2:plants-for-habitats', ['G2-604'])]),
  HEA('g2-healthy-choices-and-goals', 'healthy-choices-and-goals-grade-2-unit', 'Healthy Choices and Goals',
    'A Grade 2 health unit: 7 lessons on body, feelings, and friendships, why habits matter, what influences choices, reading ads, setting a goal, and seeing a doctor.',
    [L('2:three-ways-healthy', ['G2-605']), L('2:healthy-habits-why', ['G2-379']), L('2:who-helps-me-choose', ['G2-606']), L('2:ad-detective', ['G2-607']), L('2:health-goal', ['G2-608']), L('2:nurse-doctor-dentist', ['G2-609']), L('2:how-did-my-goal-go', ['G2-610'])]),
  HEA('g2-safe-choices-caring-friends', 'safe-choices-and-caring-friends-grade-2-unit', 'Safe Choices and Caring Friends',
    'A Grade 2 health unit: 4 lessons on road signs, stopping to think about helmets and life jackets, getting ready for sun, heat, and cold, and a class health poster.',
    [L('2:road-signs', ['G2-360', 'G2-361']), L('2:stop-think-choose', ['G2-611']), L('2:sun-heat-cold', ['G2-612']), L('2:health-poster', ['G2-613'])]),
];
const PLAN = { id: 'plan-2-science', slug: 'grade-2-science-scope-and-sequence', grade: '2', subject: 'science', title: 'Grade 2 Science Scope and Sequence',
  metaTitle: 'Grade 2 Science Scope and Sequence with Pacing Guide ({weeks} Weeks)',
  metaDescription: '{units} Grade 2 science units in teaching order, about {weeks} weeks of three science sessions a week, with each unit\'s lessons and its NGSS standards.',
  units: UNITS.filter((u) => u.subject === 'science').map((u) => u.id) };

// ---- everything is read and checked first
const pts = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
const notes = Object.assign({}, require(file('scripts/units/notes/en-science-2.js')).points, require(file('scripts/units/notes/en-health-2.js')).points);
for (const u of UNITS) {
  if (u.metaDescription.length < 110 || u.metaDescription.length > 170) throw new Error(u.id + ': description of ' + u.metaDescription.length + ' characters');
  if (u.metaTitle.length > 70) throw new Error(u.id + ': title of ' + u.metaTitle.length + ' characters');
  for (const l of u.lessons) {
    if (!pts.has(l.point)) throw new Error(u.id + ': no teaching point ' + l.point);
    if (!notes[l.point]) throw new Error(u.id + ': no teacher note of ' + l.point);
  }
  // the weeks the description and the hub state come from the pacing rule (a Grade 2 lesson is two sessions)
  u.weeks = PACE.unitWeeks('2', u.lessons.map(() => ({})), { loc: 'en', subject: u.subject });
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
