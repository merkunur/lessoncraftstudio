#!/usr/bin/env node
/**
 * Stage D-5 batch 3 (2026-11-24): the teaching points of the 31 new Grade 3 science and health page types
 * G3-581 … G3-611 (types/_shared/dk-g3.js, dk-g3-health.js; lessons, review and rulings in lcs-stage-d/batch-3). One point per lesson
 * of the year designs (design.en.science.json, design.en.health.json), so every published type sits under a point.
 *
 *   science points carry their NGSS performance expectation as `code` (NGSS:…): the English crosswalk reads it
 *   (scripts/curricula/build-en.js readCodes); health points carry their NHES indicator, and their English rows are
 *   authored in curricula/en/crosswalk-overrides.json (the code reader does not read NHES), as for the D-0 points.
 *   Every other curriculum, Texas included, is marked "not yet read": the Texas reading of the new
 *   points is an open item of Stage D.
 * Science and health have no authored order (teaching-graph/order.json): build-points.js orders them mechanically.
 *
 *   node scripts/units/year/add-points-3.en.science.js        (refuses to run twice)
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
const S = 'Science', H = 'Health';
const POINTS = [
  { tp: '3:balanced-forces', strand: S, code: 'NGSS:3-PS2-1', type: 'G3-581', skill: "Draw force arrows and tell balanced forces (the object stays still) from unbalanced forces (it starts to move)" },
  { tp: '3:predict-the-swing', strand: S, code: 'NGSS:3-PS2-2', type: 'G3-582', skill: "Count a pendulum's swings in several trials, find the pattern and use it to predict" },
  { tp: '3:friction', strand: S, code: 'NGSS:3-PS2-1', type: 'G3-583', skill: "Measure how far a car rolls on different surfaces and explain that friction slows it down" },
  { tp: '3:static-electricity', strand: S, code: 'NGSS:3-PS2-3', type: 'G3-584', skill: "Test what a rubbed balloon moves without touching it: static electricity" },
  { tp: '3:what-magnets-pull', strand: S, code: 'NGSS:3-PS2-3', type: 'G3-585', skill: "Predict and test which objects a magnet pulls: things with iron or steel, not every metal" },
  { tp: '3:magnet-distance', strand: S, code: 'NGSS:3-PS2-3', type: 'G3-586', skill: "Measure how a magnet's pull changes with distance and whether it works through paper, cardboard and water" },
  { tp: '3:magnet-problem', strand: S, code: 'NGSS:3-PS2-4', type: 'G3-587', skill: "Define a problem a magnet could solve, with the criteria and constraints of a good solution" },
  { tp: '3:compare-magnet-solutions', strand: S, code: 'NGSS:3-5-ETS1-2', type: 'G3-588', skill: "Sketch solutions, score them against the criteria and constraints, and test the best one" },
  { tp: '3:weather-data', strand: S, code: 'NGSS:3-ESS2-1', type: 'G3-589', skill: "Record the class's weather in a table and a bar graph of daily highs in degrees Fahrenheit, and compare" },
  { tp: '3:seasons-weather', strand: S, code: 'NGSS:3-ESS2-1', type: 'G3-590', skill: "Graph a city's monthly highs and rainfall and describe the weather of each season" },
  { tp: '3:climates-of-the-world', strand: S, code: 'NGSS:3-ESS2-2', type: 'G3-591', skill: "Compare the climates of places around the world from their temperature and rainfall" },
  { tp: '3:weather-problem', strand: S, code: 'NGSS:3-5-ETS1-1', type: 'G3-592', skill: "Define a problem a weather hazard causes, with criteria and constraints for a solution" },
  { tp: '3:reduce-weather-damage', strand: S, code: 'NGSS:3-ESS3-1', type: 'G3-593', skill: "Test designs that reduce the damage of a weather hazard and make a claim with evidence" },
  { tp: '3:mealworm-life-cycle', strand: S, code: 'NGSS:3-LS1-1', type: 'G3-594', skill: "Observe mealworms through their life cycle and record each stage with dated drawings and lengths" },
  { tp: '3:traits-from-parents', strand: S, code: 'NGSS:3-LS3-1', type: 'G3-595', skill: "Find which traits young animals get from their parents and how brothers and sisters differ" },
  { tp: '3:traits-environment', strand: S, code: 'NGSS:3-LS3-2', type: 'G3-596', skill: "Tell traits that come from parents from traits the environment changes" },
  { tp: '3:animals-in-groups', strand: S, code: 'NGSS:3-LS2-1', type: 'G3-597', skill: "Explain with evidence how living in a group helps animals survive" },
  { tp: '3:camouflage', strand: S, code: 'NGSS:3-LS4-2', type: 'G3-598', skill: "Count which colored moths are found least on each background and explain why matching helps them survive" },
  { tp: '3:survive-well-or-not', strand: S, code: 'NGSS:3-LS4-3', type: 'G3-599', skill: "Sort living things by whether they survive well, less well or not at all in a habitat, with evidence" },
  { tp: '3:fossils', strand: S, code: 'NGSS:3-LS4-1', type: 'G3-600', skill: "Tell what fossils show about the living things and environments of long ago" },
  { tp: '3:habitat-change', strand: S, code: 'NGSS:3-LS4-4', type: 'G3-601', skill: "Judge solutions to a problem caused by a change to a habitat, with a claim and evidence" },
  { tp: '3:how-germs-spread', strand: H, code: 'NHES.1.5.3', type: 'G3-602', skill: "Explain how germs spread and how each habit stops them",
    en: { rows: [{ id: 'NHES.1.5.3', rel: 'teaches' }], why: "Explaining how germs spread and how washing, covering a cough and using your own cup stop them explains ways to prevent illness (NHES 1.5.3, grades 3-5)." } },
  { tp: '3:myplate-day', strand: H, code: 'NHES.5.5.4', type: 'G3-603', skill: "Plan a day of meals with all five MyPlate food groups and everyday drinks",
    en: { rows: [{ id: 'NHES.5.5.4', rel: 'teaches' }], why: "Planning a day of meals with all five food groups and choosing water or milk chooses a health-promoting option (NHES 5.5.4, grades 3-5)." } },
  { tp: '3:sleep-screens-play', strand: H, code: 'NHES.7.5.1', type: 'G3-604', skill: "Look at the hours of sleep, screens and active play in my day and choose one change",
    en: { rows: [{ id: 'NHES.7.5.1', rel: 'teaches' }], why: "Looking at the hours of sleep, screens and active play in a day examines practices that support health (NHES 7.5.1, grades 3-5)." } },
  { tp: '3:what-sways-my-choices', strand: H, code: 'NHES.2.5.2', type: 'G3-605', skill: "Work out how family, friends, ads and videos sway my health choices and my friends'",
    en: { rows: [{ id: 'NHES.2.5.2', rel: 'teaches' }], why: "Working out how family, friends, ads and videos sway a choice determines how influences affect the health of self and others (NHES 2.5.2, grades 3-5)." } },
  { tp: '3:goal-plan-track', strand: H, code: 'NHES.6.5.3', type: 'G3-606', skill: "Plan a health goal with steps, things I need and helpers, track it and look back",
    en: { rows: [{ id: 'NHES.6.5.3', rel: 'teaches' }], why: "A goal plan with steps, things needed, helpers and a tracking chart develops a plan with actions, resources and progress-tracking (NHES 6.5.3, grades 3-5)." } },
  { tp: '3:fire-escape-plan', strand: H, code: 'NHES.7.5.2', type: 'G3-607', skill: "Draw a home fire escape plan with two ways out of every room and a meeting place",
    en: { rows: [{ id: 'NHES.7.5.2', rel: 'teaches' }], why: "Drawing and practising a home escape plan demonstrates a practice that supports the safety of self and others (NHES 7.5.2, grades 3-5)." } },
  { tp: '3:who-can-help', strand: H, code: 'NHES.3.5.1', type: 'G3-608', skill: "Choose the trusted adult or resource that fits each situation, and ask clearly for help",
    en: { rows: [{ id: 'NHES.3.5.1', rel: 'teaches' }], why: "Matching each situation to the right trusted adult or resource determines which helpers are appropriate in various situations (NHES 3.5.1, grades 3-5)." } },
  { tp: '3:big-feelings', strand: H, code: 'NHES.4.5.1', type: 'G3-609', skill: "Name a big feeling, calm it, and say what I feel and need",
    en: { rows: [{ id: 'NHES.4.5.1', rel: 'teaches' }], why: "Naming a feeling, calming down and saying what you feel and need uses communication skills to express feelings and needs (NHES 4.5.1, grades 3-5)." } },
  { tp: '3:solve-a-conflict', strand: H, code: 'NHES.4.5.6', type: 'G3-610', skill: "Work out a conflict: calm down, take turns telling, find a fair solution",
    en: { rows: [{ id: 'NHES.4.5.6', rel: 'teaches' }], why: "Calming down, telling each side and finding a fair solution demonstrates strategies to resolve conflict (NHES 4.5.6, grades 3-5)." } },
  { tp: '3:say-no-walk-away', strand: H, code: 'NHES.4.5.5', type: 'G3-611', skill: "Say no clearly, give a reason and walk away from an unsafe choice",
    en: { rows: [{ id: 'NHES.4.5.5', rel: 'teaches' }], why: "Saying no clearly, giving a reason and walking away demonstrates refusal skills (NHES 4.5.5, grades 3-5)." } },
];
// ---- everything is read and checked first
const out = [];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '3', strand: p.strand, code: p.code, skill: p.skill }); }
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
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-24 for the new Grade 3 science and health pages of the English year (Stage D-5 batch 3); no unit teaches it yet. Read it against the wording when the Grade 3 science and health units are placed' + (loc === 'en-tx' ? ' (TEKS Science 3 and Health 3).' : ' and this language gets its pages.'), review: 'batch-k 2026-11-23' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points (' + POINTS.filter((p) => p.en).length + ' with English NHES rows); files: ' + out.length);
