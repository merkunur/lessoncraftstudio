#!/usr/bin/env node
/**
 * Stage D-5 batch K (2026-11-23): the teaching points of the 21 new Kindergarten science and health page types
 * K-687 … K-707 (types/_shared/dk-kinder.js; lessons, review and rulings in lcs-stage-d/batch-k). One point per lesson
 * of the year designs (design.en.science.json, design.en.health.json), so every published type sits under a point.
 *
 *   science points carry their NGSS performance expectation as `code` (NGSS:…): the English crosswalk reads it
 *   (scripts/curricula/build-en.js readCodes); health points carry their NHES indicator, and their English rows are
 *   authored in curricula/en/crosswalk-overrides.json (the code reader does not read NHES), as for the D-0 points.
 *   Every other curriculum, Texas included, is marked "not yet read": no unit teaches these points yet; the reading
 *   comes with the Kindergarten units (Stage D-3).
 * Science and health have no authored order (teaching-graph/order.json): build-points.js orders them mechanically.
 *
 *   node scripts/units/year/add-points-k.en.science.js        (refuses to run twice)
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
const S = 'Science', H = 'Health';   // ("Health & Safety" is not a strand of strand-map.json; road safety's comes from the coverage map)
const POINTS = [
  { tp: 'K:body-needs', strand: S, code: 'NGSS:K-LS1-1', type: 'K-687', skill: 'Tell the things a body needs to live (food, water, air) from the things that are only nice to have' },
  { tp: 'K:wind-watch', strand: S, code: 'NGSS:K-ESS2-1', type: 'K-688', skill: 'Watch the wind with a streamer each day and record whether it hangs still, flutters or flies straight out' },
  { tp: 'K:rain-gauge', strand: S, code: 'NGSS:K-ESS2-1', type: 'K-689', skill: 'Read a rain gauge and compare how much rain fell on different days' },
  { tp: 'K:weather-ready', strand: S, code: 'NGSS:K-ESS3-2', type: 'K-690', skill: 'Choose what to wear or bring, and the safe thing to do, for each kind of weather, storms included' },
  { tp: 'K:animal-food', strand: S, code: 'NGSS:K-LS1-1', type: 'K-691', skill: 'Tell what animals eat: plants, animals, or both' },
  { tp: 'K:animal-home', strand: S, code: 'NGSS:K-ESS3-1', type: 'K-692', skill: 'Build a home that gives an animal what it needs: food, water and a place to hide' },
  { tp: 'K:animals-change-land', strand: S, code: 'NGSS:K-ESS2-2', type: 'K-693', skill: 'Match a change in the land (a hole, an anthill, a dam, a nest) to the animal that made it' },
  { tp: 'K:push-pull', strand: S, code: 'NGSS:K-PS2-1', type: 'K-694', skill: 'Tell a push from a pull' },
  { tp: 'K:push-strength', strand: S, code: 'NGSS:K-PS2-1', type: 'K-695', skill: 'Compare a gentle and a hard push: the harder push makes the ball roll farther' },
  { tp: 'K:change-direction', strand: S, code: 'NGSS:K-PS2-1', type: 'K-696', skill: 'Show how a push or a bump changes the direction a ball rolls' },
  { tp: 'K:ramp-to-target', strand: S, code: 'NGSS:K-PS2-2', type: 'K-697', skill: 'Build a ramp that makes a ball hit a cup, test it, and change it when it does not work' },
  { tp: 'K:compare-ramps', strand: S, code: 'NGSS:K-2-ETS1-3', type: 'K-698', skill: 'Test two ramps the same way and tell which one works better' },
  { tp: 'K:boat-plan', strand: S, code: 'NGSS:K-2-ETS1-2', type: 'K-699', skill: 'Draw a plan for a boat that keeps a toy bear dry' },
  { tp: 'K:boat-test', strand: S, code: 'NGSS:K-2-ETS1-2', type: 'K-700', skill: 'Build and test a boat, then choose a change that would help' },
  { tp: 'K:boat-compare', strand: S, code: 'NGSS:K-2-ETS1-3', type: 'K-701', skill: 'Compare two boats by how many pennies each held before it sank' },
  { tp: 'K:seed-journal', strand: S, code: 'NGSS:K-LS1-1', type: 'K-702', skill: 'Watch a bean seed grow and record what changes from day to day' },
  { tp: 'K:sun-warms', strand: S, code: 'NGSS:K-PS3-1', type: 'K-703', skill: 'Observe that sunlight warms the ground and water: the sunny side is warmer than the shade' },
  { tp: 'K:make-shade', strand: S, code: 'NGSS:K-PS3-2', type: 'K-704', skill: 'Build a shade that slows an ice cube melting in the sun' },
  { tp: 'K:i-can', strand: H, code: 'NHES.1.2.1', type: 'K-705', skill: 'Name something I am good at and something I am learning, and the people who help me',
    en: { rows: [{ id: 'NHES.1.2.1', rel: 'teaches' }], why: 'Drawing what I am good at and what I am learning, and circling who helps me, identifies strengths and assets that support health and well-being (NHES 1.2.1, PreK-2).' } },
  { tp: 'K:sleep-play', strand: H, code: 'NHES.1.2.5', type: 'K-706', skill: 'Put a bedtime routine in order and choose play that moves the whole body: sleep and play help me grow',
    en: { rows: [{ id: 'NHES.1.2.5', rel: 'teaches' }, { id: 'NHES.7.2.1', rel: 'prepares' }], why: 'Ordering bath, pajamas and bed and circling the ways to play that move the whole body tell why sleep and play matter for health (NHES 1.2.5, PreK-2) and lead to practicing those behaviors (NHES 7.2.1).' } },
  { tp: 'K:trusted-adults', strand: H, code: 'NHES.3.2.1', type: 'K-707', skill: 'Find the grown-ups who could help, and always check first with my grown-up',
    en: { rows: [{ id: 'NHES.3.2.1', rel: 'teaches' }], why: 'Circling the grown-ups who could help (a police officer, a firefighter, a doctor, a nurse, a teacher) among children, and the rule to check first with one\'s own grown-up, identify characteristics of trusted adults (NHES 3.2.1, PreK-2).' } },
];
// ---- everything is read and checked first
const out = [];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: 'K', strand: p.strand, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS.filter((x) => x.en)) { if (j.points[p.tp]) throw new Error('en override ' + p.tp + ' exists'); j.points[p.tp] = Object.assign({}, p.en, { review: 'batch-k 2026-11-23' }); }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-23 for the new Kindergarten science and health pages of the English year (Stage D-5 batch K); no unit teaches it yet. Read it against the wording when the Kindergarten science and health units are placed' + (loc === 'en-tx' ? ' (TEKS Science K and Health K).' : ' and this language gets its pages.'), review: 'batch-k 2026-11-23' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points (' + POINTS.filter((p) => p.en).length + ' with English NHES rows); files: ' + out.length);
