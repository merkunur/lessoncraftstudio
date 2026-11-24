#!/usr/bin/env node
/**
 * Stage D-5 batch 2 (2026-11-24): the teaching points of the 30 new Grade 2 science and health page types
 * G2-584 … G2-613 (types/_shared/dk-g2.js, dk-g2-health.js; lessons, review and rulings in lcs-stage-d/batch-2). One point per lesson
 * of the year designs (design.en.science.json, design.en.health.json), so every published type sits under a point.
 *
 *   science points carry their NGSS performance expectation as `code` (NGSS:…): the English crosswalk reads it
 *   (scripts/curricula/build-en.js readCodes); health points carry their NHES indicator, and their English rows are
 *   authored in curricula/en/crosswalk-overrides.json (the code reader does not read NHES), as for the D-0 points.
 *   Every other curriculum, Texas included, is marked "not yet read": the Texas reading of the new
 *   points is an open item of Stage D.
 * Science and health have no authored order (teaching-graph/order.json): build-points.js orders them mechanically.
 *
 *   node scripts/units/year/add-points-2.en.science.js        (refuses to run twice)
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
  { tp: '2:describe-materials', strand: S, code: 'NGSS:2-PS1-1', type: 'G2-584', skill: "Test materials and describe them by their properties: hard or soft, bends, rough or smooth, soaks up water" },
  { tp: '2:best-material', strand: S, code: 'NGSS:2-PS1-2', type: 'G2-585', skill: "Test materials to find the best one for a job, and tell why" },
  { tp: '2:take-apart-build', strand: S, code: 'NGSS:2-PS1-3', type: 'G2-586', skill: "Build something new from the pieces of something taken apart" },
  { tp: '2:land-water-map', strand: S, code: 'NGSS:2-ESS2-2', type: 'G2-587', skill: "Color a map of land and water with a key and label a lake, a river, a hill and the ocean" },
  { tp: '2:landform-model', strand: S, code: 'NGSS:2-ESS2-2', type: 'G2-588', skill: "Make a model of landforms and draw it as a map" },
  { tp: '2:water-on-earth', strand: S, code: 'NGSS:2-ESS2-3', type: 'G2-589', skill: "Find where water is on Earth and whether it is solid or liquid, salty or fresh" },
  { tp: '2:globe-toss', strand: S, code: 'NGSS:2-ESS2-3', type: 'G2-590', skill: "Toss a globe, tally water or land, and find that Earth has more water" },
  { tp: '2:fast-slow-changes', strand: S, code: 'NGSS:2-ESS1-1', type: 'G2-591', skill: "Sort Earth changes into fast ones (earthquakes, volcanoes, landslides) and slow ones" },
  { tp: '2:water-shapes-land', strand: S, code: 'NGSS:2-ESS1-1', type: 'G2-592', skill: "Show how moving water slowly shapes the land, in a tray model" },
  { tp: '2:stop-the-sand', strand: S, code: 'NGSS:K-2-ETS1-3', type: 'G2-593', skill: "Test ways to stop sand from washing away and compare them" },
  { tp: '2:best-solution', strand: S, code: 'NGSS:2-ESS2-1', type: 'G2-594', skill: "Compare solutions that keep wind or water from changing the land, and choose one with a reason" },
  { tp: '2:ice-melt-fastest', strand: S, code: 'NGSS:2-PS1-4', type: 'G2-595', skill: "Test where ice melts fastest and record the results" },
  { tp: '2:melt-freeze-back', strand: S, code: 'NGSS:2-PS1-4', type: 'G2-596', skill: "Melt and freeze things and find which changes can be undone" },
  { tp: '2:changes-cannot-undo', strand: S, code: 'NGSS:2-PS1-4', type: 'G2-597', skill: "Find changes from heating that cannot be undone" },
  { tp: '2:change-back-claim', strand: S, code: 'NGSS:2-PS1-4', type: 'G2-598', skill: "Make a claim with evidence: can the change be undone?" },
  { tp: '2:plants-light-water', strand: S, code: 'NGSS:2-LS2-1', type: 'G2-599', skill: "Test whether plants need light and water to grow" },
  { tp: '2:seeds-on-the-move', strand: S, code: 'NGSS:2-LS2-2', type: 'G2-600', skill: "Find how seeds travel by wind, water, animals and people" },
  { tp: '2:be-a-pollinator', strand: S, code: 'NGSS:2-LS2-2', type: 'G2-601', skill: "Model how animals move pollen from flower to flower" },
  { tp: '2:schoolyard-survey', strand: S, code: 'NGSS:2-LS4-1', type: 'G2-602', skill: "Survey the living things in the schoolyard and count the kinds" },
  { tp: '2:compare-habitats', strand: S, code: 'NGSS:2-LS4-1', type: 'G2-603', skill: "Compare the living things of a desert, a rain forest and an ocean" },
  { tp: '2:plants-for-habitats', strand: S, code: 'NGSS:2-LS4-1', type: 'G2-604', skill: "Match plants to the habitats they grow in" },
  { tp: '2:three-ways-healthy', strand: H, code: 'NHES.1.2.2', type: 'G2-605', skill: "Sort healthy actions into body, feelings and friendships",
    en: { rows: [{ id: 'NHES.1.2.2', rel: 'teaches' }], why: "Sorting healthy actions into body, feelings and friendships identifies dimensions of wellness (NHES 1.2.2, PreK-2)." } },
  { tp: '2:who-helps-me-choose', strand: H, code: 'NHES.2.2.1', type: 'G2-606', skill: "Name the people and things that influence my choices",
    en: { rows: [{ id: 'NHES.2.2.1', rel: 'teaches' }], why: "Naming the family, friends, media and other things that shape a choice identifies influences on health (NHES 2.2.1, PreK-2)." } },
  { tp: '2:ad-detective', strand: H, code: 'NHES.2.2.2', type: 'G2-607', skill: "Find what an ad wants me to do and how it tries to make me want it",
    en: { rows: [{ id: 'NHES.2.2.2', rel: 'teaches' }], why: "Finding what an ad wants and how it tries to persuade determines how an influence affects health (NHES 2.2.2, PreK-2)." } },
  { tp: '2:health-goal', strand: H, code: 'NHES.6.2.2', type: 'G2-608', skill: "Choose a health goal and a helper",
    en: { rows: [{ id: 'NHES.6.2.2', rel: 'teaches' }], why: "Choosing a health goal and someone to help identifies a goal that supports health (NHES 6.2.2, PreK-2)." } },
  { tp: '2:nurse-doctor-dentist', strand: H, code: 'NHES.1.2.7', type: 'G2-609', skill: "Tell when to see the nurse, the doctor or the dentist",
    en: { rows: [{ id: 'NHES.1.2.7', rel: 'teaches' }], why: "Telling when to see the nurse, the doctor or the dentist explains when it is important to seek health care (NHES 1.2.7, PreK-2)." } },
  { tp: '2:how-did-my-goal-go', strand: H, code: 'NHES.6.2.6', type: 'G2-610', skill: "Look back on a health goal: what helped and what to try next",
    en: { rows: [{ id: 'NHES.6.2.6', rel: 'teaches' }], why: "Looking back on a goal, what helped and what to try next, reflects on the results of goal-setting (NHES 6.2.6, PreK-2)." } },
  { tp: '2:stop-think-choose', strand: H, code: 'NHES.5.2.3', type: 'G2-611', skill: "Stop, think about the choices and what could happen, then choose (helmets, life jackets)",
    en: { rows: [{ id: 'NHES.5.2.3', rel: 'teaches' }], why: "Stopping to think about the choices and what could happen describes options and outcomes for a health decision (NHES 5.2.3, PreK-2)." } },
  { tp: '2:sun-heat-cold', strand: H, code: 'NHES.1.2.6', type: 'G2-612', skill: "Get ready for sun, heat and cold",
    en: { rows: [{ id: 'NHES.1.2.6', rel: 'teaches' }], why: "Getting ready for sun, heat and cold identifies how the environment affects health (NHES 1.2.6, PreK-2)." } },
  { tp: '2:health-poster', strand: H, code: 'NHES.8.2.3', type: 'G2-613', skill: "Make a poster that encourages others to make a healthy choice",
    en: { rows: [{ id: 'NHES.8.2.3', rel: 'teaches' }], why: "A class poster for a healthy choice encourages others to make health-promoting choices (NHES 8.2.3, PreK-2)." } },
];
// ---- everything is read and checked first
const out = [];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '2', strand: p.strand, code: p.code, skill: p.skill }); }
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
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-23 for the new Grade 2 science and health pages of the English year (Stage D-5 batch 2); no unit teaches it yet. Read it against the wording when the Grade 2 science and health units are placed' + (loc === 'en-tx' ? ' (TEKS Science 2 and Health 2).' : ' and this language gets its pages.'), review: 'batch-k 2026-11-23' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points (' + POINTS.filter((p) => p.en).length + ' with English NHES rows); files: ' + out.length);
