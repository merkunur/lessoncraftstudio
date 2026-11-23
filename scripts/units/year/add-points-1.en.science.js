#!/usr/bin/env node
/**
 * Stage D-5 batch 1 (2026-11-23): the teaching points of the 27 new Grade 1 science and health page types
 * G1-626 … G1-652 (types/_shared/dk-g1.js, dk-g1-health.js; lessons, review and rulings in lcs-stage-d/batch-1). One point per lesson
 * of the year designs (design.en.science.json, design.en.health.json), so every published type sits under a point.
 *
 *   science points carry their NGSS performance expectation as `code` (NGSS:…): the English crosswalk reads it
 *   (scripts/curricula/build-en.js readCodes); health points carry their NHES indicator, and their English rows are
 *   authored in curricula/en/crosswalk-overrides.json (the code reader does not read NHES), as for the D-0 points.
 *   Every other curriculum, Texas included, is marked "not yet read": no unit teaches these points yet; the reading
 *   comes with the Kindergarten units (Stage D-3).
 * Science and health have no authored order (teaching-graph/order.json): build-points.js orders them mechanically.
 *
 *   node scripts/units/year/add-points-1.en.science.js        (refuses to run twice)
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
  { tp: '1:vibrations-make-sound', strand: S, code: 'NGSS:1-PS4-1', type: 'G1-626', skill: "Find that every sound comes from something vibrating, at sound stations" },
  { tp: '1:sound-moves-things', strand: S, code: 'NGSS:1-PS4-1', type: 'G1-627', skill: "Show that sound can make materials vibrate (rice on a drum, a ringing tuning fork in water)" },
  { tp: '1:cup-telephone', strand: S, code: 'NGSS:1-PS4-4', type: 'G1-628', skill: "Build and test a cup telephone and find when the sound travels best" },
  { tp: '1:see-with-light', strand: S, code: 'NGSS:1-PS4-2', type: 'G1-629', skill: "Find that we see an object only when light shines on it" },
  { tp: '1:light-through-materials', strand: S, code: 'NGSS:1-PS4-3', type: 'G1-630', skill: "Test which materials let all, some or no light through" },
  { tp: '1:mirrors-bounce-light', strand: S, code: 'NGSS:1-PS4-3', type: 'G1-631', skill: "Use a mirror to bounce a beam of light onto a target" },
  { tp: '1:shadows-near-far', strand: S, code: 'NGSS:1-PS4-3', type: 'G1-632', skill: "Make shadows by blocking light and find how they change near and far from the light" },
  { tp: '1:light-messages', strand: S, code: 'NGSS:1-PS4-4', type: 'G1-633', skill: "Design a code to send a message with light, and test it" },
  { tp: '1:shadow-through-day', strand: S, code: 'NGSS:1-ESS1-1', type: 'G1-634', skill: "Record a shadow in the morning, near noon and in the afternoon and describe how it moves" },
  { tp: '1:moon-journal', strand: S, code: 'NGSS:1-ESS1-1', type: 'G1-635', skill: "Observe and draw the Moon every few days and describe how its lit part changes" },
  { tp: '1:day-night-sky', strand: S, code: 'NGSS:1-ESS1-1', type: 'G1-636', skill: "Compare the day sky and the night sky: the stars are there all the time" },
  { tp: '1:daylight-hours', strand: S, code: 'NGSS:1-ESS1-2', type: 'G1-637', skill: "Graph the whole hours of daylight month by month and compare winter and summer" },
  { tp: '1:animal-parents', strand: S, code: 'NGSS:1-LS1-2', type: 'G1-638', skill: "Tell what animal parents do to help their young survive" },
  { tp: '1:design-like-an-animal', strand: S, code: 'NGSS:1-LS1-1', type: 'G1-639', skill: "Match an animal part to the human design that copies it" },
  { tp: '1:like-parents', strand: S, code: 'NGSS:1-LS3-1', type: 'G1-640', skill: "Find how young animals are like their parents, but not exactly" },
  { tp: '1:seedlings-and-parent', strand: S, code: 'NGSS:1-LS3-1', type: 'G1-641', skill: "Compare seedlings with each other and with the grown plant" },
  { tp: '1:design-a-raft', strand: S, code: 'NGSS:K-2-ETS1-2', type: 'G1-642', skill: "Plan a raft from floating materials that will carry ten pennies" },
  { tp: '1:test-two-rafts', strand: S, code: 'NGSS:K-2-ETS1-3', type: 'G1-643', skill: "Test two rafts with pennies and tell which design held more" },
  { tp: '1:ask-a-grown-up', strand: H, code: 'NHES.5.2.2', type: 'G1-644', skill: "Tell the things only a trusted grown-up gives or uses (medicine, a shot, an iron, a knife) and ask first",
    en: { rows: [{ id: 'NHES.5.2.2', rel: 'teaches' }], why: "Telling the things only a trusted grown-up gives or uses and asking first is recognizing when help is needed for a health-related decision (NHES 5.2.2, PreK-2)." } },
  { tp: '1:myplate-groups', strand: H, code: 'NHES.7.2.1', type: 'G1-645', skill: "Sort foods into the five MyPlate food groups",
    en: { rows: [{ id: 'NHES.7.2.1', rel: 'teaches' }], why: "Sorting foods into the five MyPlate groups identifies practices that support health (NHES 7.2.1, PreK-2)." } },
  { tp: '1:myplate-lunch', strand: H, code: 'NHES.5.2.1', type: 'G1-646', skill: "Build a MyPlate lunch and find the times of the school day we choose a food or drink",
    en: { rows: [{ id: 'NHES.5.2.1', rel: 'teaches' }], why: "Building a MyPlate lunch and finding the times of the day a food or drink is chosen identify when a health-related decision is needed (NHES 5.2.1, PreK-2)." } },
  { tp: '1:habit-to-grow', strand: H, code: 'NHES.6.2.1', type: 'G1-647', skill: "Check the healthy habits I already do and choose one to grow",
    en: { rows: [{ id: 'NHES.6.2.1', rel: 'teaches' }], why: "Checking the habits a child does and choosing one to grow determines a health behavior to change or reinforce (NHES 6.2.1, PreK-2)." } },
  { tp: '1:health-helpers', strand: H, code: 'NHES.3.2.3', type: 'G1-648', skill: "Name the health helpers at school and in town",
    en: { rows: [{ id: 'NHES.3.2.3', rel: 'teaches' }], why: "Naming the school nurse and the town health helpers locates school and community health helpers (NHES 3.2.3, PreK-2)." } },
  { tp: '1:whole-body-listening', strand: H, code: 'NHES.4.2.2', type: 'G1-649', skill: "Listen with the whole body: eyes, ears, quiet hands and feet, a calm body",
    en: { rows: [{ id: 'NHES.4.2.2', rel: 'teaches' }], why: "Whole-body listening (eyes on the speaker, quiet hands and feet, a calm body) is an active listening skill (NHES 4.2.2, PreK-2)." } },
  { tp: '1:fire-safety-911', strand: H, code: 'NHES.3.2.2', type: 'G1-650', skill: "Get out and stay out, crawl low under smoke, stop, drop and roll, and know when to call 911",
    en: { rows: [{ id: 'NHES.3.2.2', rel: 'teaches' }], why: "Getting out, crawling low, stop-drop-roll and calling 911 when someone needs help demonstrate when and how to seek help (NHES 3.2.2, PreK-2)." } },
  { tp: '1:say-no-go-tell', strand: H, code: 'NHES.4.2.3', type: 'G1-651', skill: "When something feels unsafe: say no, go away, and tell a trusted adult",
    en: { rows: [{ id: 'NHES.4.2.3', rel: 'teaches' }], why: "Saying no, going away and telling a trusted adult are communication skills to use when uncomfortable or unsafe (NHES 4.2.3, PreK-2)." } },
  { tp: '1:help-a-friend', strand: H, code: 'NHES.8.2.2', type: 'G1-652', skill: "Find kind ways to help a friend make healthy choices",
    en: { rows: [{ id: 'NHES.8.2.2', rel: 'teaches' }], why: "Friendly reminders and invitations to play are ways to support others in making health-promoting choices (NHES 8.2.2, PreK-2)." } },
];
// ---- everything is read and checked first
const out = [];
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '1', strand: p.strand, code: p.code, skill: p.skill }); }
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
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-23 for the new Grade 1 science and health pages of the English year (Stage D-5 batch 1); no unit teaches it yet. Read it against the wording when the Grade 1 science and health units are placed' + (loc === 'en-tx' ? ' (TEKS Science 1 and Health 1).' : ' and this language gets its pages.'), review: 'batch-k 2026-11-23' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points (' + POINTS.filter((p) => p.en).length + ' with English NHES rows); files: ' + out.length);
