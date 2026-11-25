#!/usr/bin/env node
/**
 * Stage D-5 batch S3 (2026-11-25): the teaching points of the 18 new Grade 3 social studies page types
 * G3-612 … G3-629 (types/_shared/dk-social-3.js; lines, review and rulings in lcs-stage-d/batch-s3). One point per new
 * lesson of the year design (design.en.social.json, grade 3), the teacher-led "Deciding together" included, so every
 * published type sits under a point. The Grade 3 lesson served by an existing page keeps its point (3:continents-oceans).
 *
 *   Each point carries its C3 Framework Dimension 2 indicator (3-5) as `code`. The code reader of the English crosswalk
 *   (scripts/curricula/build-en.js readCodes) reads CCSS and NGSS only, so the English rows are authored here into
 *   curricula/en/crosswalk-overrides.json, as for the Grade 1 and Grade 2 points: `teaches` only where the page and its
 *   lesson ask what the indicator asks.
 *   Every other curriculum, Texas included, is marked "not yet read": the reading comes with each language's own pages.
 * Social studies has no authored order (teaching-graph/order.json): build-points.js orders it mechanically.
 *
 *   node scripts/units/year/add-points-3.en.social.js        (refuses to run twice)
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
const SS = 'Social Studies';
const T = (id) => ({ id, rel: 'teaches' });
// DRAFT: the why/skill texts are written from the design; they are read again against the final pages before the run.
const POINTS = [
  { tp: '3:civic-virtues', code: 'D2.Civ.7.3-5', type: 'G3-612', skill: 'Name the civic virtue a school situation calls for (honesty, respect, responsibility, fairness, courage) and write what a good citizen would do',
    en: { rows: [T('D2.Civ.7.3-5')], why: 'Naming the virtue each school situation calls for and writing what a good citizen would do apply civic virtues and democratic principles in school settings (D2.Civ.7, 3-5).' } },
  { tp: '3:constitution', code: 'D2.Civ.3.3-5', type: 'G3-613', skill: 'Tell what the U.S. Constitution and the Bill of Rights are, and write a class constitution with rules and reasons',
    en: { rows: [T('D2.Civ.3.3-5')], why: 'Reading that the Constitution is the plan for our national government and that the Bill of Rights protects freedoms, then writing class rules with their reasons, examine the origins and purposes of rules, laws and key U.S. constitutional provisions (D2.Civ.3, 3-5).' } },
  { tp: '3:changing-laws', code: 'D2.Civ.12.3-5', type: 'G3-614', skill: 'Read how people changed laws (the 19th Amendment, the Americans with Disabilities Act, a crosswalk) and record who, what they did and what changed',
    en: { rows: [T('D2.Civ.12.3-5')], why: 'Reading how people won the vote for women, the Americans with Disabilities Act and a local crosswalk, and recording who acted, what they did and what changed, explain how rules and laws change society and how people change rules and laws (D2.Civ.12, 3-5).' } },
  { tp: '3:map-scale', code: 'D2.Geo.3.3-5', type: 'G3-615', skill: 'Measure distances on a map with a ruler and its scale, and compare a town map with a state map',
    en: { rows: [T('D2.Geo.3.3-5')], why: 'Measuring distances with a ruler and a map scale and comparing what a town map and a state map show use maps of different scales to describe the locations of cultural and environmental characteristics (D2.Geo.3, 3-5).' } },
  { tp: '3:grid-map', code: 'D2.Geo.1.3-5', type: 'G3-616', skill: 'Draw a map of our community on a lettered and numbered grid with a title, a key, a compass rose and a scale, and write grid squares',
    en: { rows: [T('D2.Geo.1.3-5')], why: 'Drawing a community map on a grid with a title, a key, a compass rose and a scale, and writing grid squares for a partner, construct maps and other graphic representations of both familiar and unfamiliar places (D2.Geo.1, 3-5).' } },
  { tp: '3:where-people-live', code: 'D2.Geo.6.3-5', type: 'G3-617', skill: 'Compare a population map with a physical map and tell where many or few people live and why',
    en: { rows: [T('D2.Geo.6.3-5')], why: 'Comparing a population dot map with a physical map and writing why many people live along coasts, rivers and lakes and few in deserts and high mountains describe how environmental and cultural characteristics influence population distribution (D2.Geo.6, 3-5).' } },
  { tp: '3:towns-near-resources', code: 'D2.Geo.8.3-5', type: 'G3-618', skill: 'Choose a good site for a town on a map, write what each site offers and name the worst site',
    en: { rows: [T('D2.Geo.8.3-5')], why: 'Writing what each site on a sample state map offers (river water and soil, a harbor, or dry, rocky land) and choosing the better and the worst place to start a town explain how human settlements and movements relate to the locations and use of natural resources (D2.Geo.8, 3-5).' } },
  { tp: '3:levels-of-government', code: 'D2.Civ.1.3-5', type: 'G3-619', skill: 'Sort leaders and services into local, state and national government, and tell which level to ask about a problem',
    en: { rows: [T('D2.Civ.1.3-5')], why: 'Writing each leader and service under local, state or national government and choosing the level to contact about a problem distinguish the responsibilities and powers of government officials at various levels (D2.Civ.1, 3-5).' } },
  { tp: '3:three-branches', code: 'D2.Civ.5.3-5', type: 'G3-620', skill: 'Place Congress, the president and the courts under the three branches, for the nation and the state',
    en: { rows: [T('D2.Civ.5.3-5')], why: 'Placing Congress, the president and the courts (and the state legislature, the governor and the state courts) under the legislative, executive and judicial branches explain the origins, functions and structure of government (D2.Civ.5, 3-5).' } },
  { tp: '3:taxes-services', code: 'D2.Eco.12.3-5', type: 'G3-621', skill: 'Trace how taxes become services and write which level of government provides each',
    en: { rows: [T('D2.Eco.12.3-5')], why: 'Tracing taxes from people and businesses to a government and on to a service, and labeling the level that provides it, explain the ways in which the government pays for the goods and services it provides (D2.Eco.12, 3-5).' } },
  { tp: '3:ways-to-decide', code: 'D2.Civ.11.3-5', type: 'G3-622', skill: 'Compare a class vote, a town council meeting and an election: who decides, how, and how people have a say',
    en: { rows: [T('D2.Civ.11.3-5')], why: 'Filling a chart of who decides, how, and how people have a say in a class vote, a council meeting and an election compare procedures for making decisions in a variety of settings (D2.Civ.11, 3-5).' } },
  { tp: '3:community-problem', code: 'D2.Civ.13.3-5', type: 'G3-623', skill: 'Weigh solutions to a community problem by cost and benefit and write a letter to the city council',
    en: { rows: [T('D2.Civ.13.3-5')], why: 'Listing solutions to a community problem with a cost and a benefit for each and proposing one in a letter to the city council explain how policies are developed to address public problems (D2.Civ.13, 3-5).' } },
  { tp: '3:primary-secondary', code: 'D2.His.9.3-5', type: 'G3-624', skill: 'Sort sources into primary and secondary and tell what each can tell about the past',
    en: { rows: [T('D2.His.9.3-5')], why: 'Sorting a diary, an old photograph, a letter, a textbook page and other sources into primary and secondary summarize how different kinds of historical sources are used to explain events in the past (D2.His.9, 3-5).' } },
  { tp: '3:double-timeline', code: 'D2.His.1.3-5', type: 'G3-625', skill: 'Place a town\'s events and the nation\'s events on two timelines and find events that happened at about the same time',
    en: { rows: [T('D2.His.1.3-5')], why: 'Placing a sample town\'s events and national events on parallel timelines and joining those within five years create and use a chronological sequence of related events to compare developments that happened at the same time (D2.His.1, 3-5).' } },
  { tp: '3:then-and-now', code: 'D2.His.2.3-5', type: 'G3-626', skill: 'Compare life in a town around 1900 with life today and write what changed and what stayed the same',
    en: { rows: [T('D2.His.2.3-5')], why: 'Comparing getting around, lighting, sending messages and school around 1900 with today, and writing what changed and what stayed the same, compare life in specific historical time periods to life today (D2.His.2, 3-5).' } },
  { tp: '3:economic-resources', code: 'D2.Eco.3.3-5', type: 'G3-627', skill: 'Sort the resources a business uses into natural, human and capital resources',
    en: { rows: [T('D2.Eco.3.3-5')], why: 'Writing the resources a bakery uses under natural, human and capital resources identify examples of the variety of resources that are used to produce goods and services (D2.Eco.3, 3-5).' } },
  { tp: '3:cause-effect-history', code: 'D2.His.14.3-5', type: 'G3-628', skill: 'Link causes to effects in a town\'s history and write the likely cause of a change in our community',
    en: { rows: [T('D2.His.14.3-5')], why: 'Linking each cause in a sample town\'s history to its effect and writing the likely cause of a change in our community explain probable causes and effects of events and developments (D2.His.14, 3-5).' } },
  { tp: '3:deciding-together', code: 'D2.Civ.9.3-5', type: 'G3-629', skill: 'Deliberate on a class question: list reasons for and against each choice, listen to every side and reach a decision most can accept',
    en: { rows: [T('D2.Civ.9.3-5')], why: 'Listing a reason for and against each choice, asking another group a question, and recording the decision the class reached and why I can accept it use deliberative processes when making decisions or reaching judgments as a group (D2.Civ.9, 3-5).' } },
];
// ---- everything is read and checked first
const out = [];
{
  const ids = new Set(JSON.parse(read('frontend/content/teaching-graph/points.json')).points.map((p) => p.id));
  for (const p of POINTS) if (ids.has(p.tp)) throw new Error(p.tp + ' is a point already');
}
{
  const f = 'frontend/content/teaching-graph/extra-points.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points.some((x) => x.tp === p.tp)) throw new Error(p.tp + ' exists: this script ran before'); j.points.push({ tp: p.tp, grade: '3', strand: SS, code: p.code, skill: p.skill }); }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/teaching-graph/type-additions.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.types[p.type]) throw new Error(p.type + ' is listed already'); j.types[p.type] = p.tp; }
  out.push([f, jsonLike(raw, j)]);
}
{
  const f = 'frontend/content/curricula/en/crosswalk-overrides.json', raw = read(f), j = JSON.parse(raw);
  for (const p of POINTS) { if (j.points[p.tp]) throw new Error('en override ' + p.tp + ' exists'); j.points[p.tp] = Object.assign({}, p.en, { review: 'batch-s3 2026-11-25' }); }
  out.push([f, jsonLike(raw, j)]);
}
for (const loc of fs.readdirSync(file('frontend/content/curricula')).filter((d) => fs.existsSync(file(`frontend/content/curricula/${d}/crosswalk-authored.json`)))) {
  const f = `frontend/content/curricula/${loc}/crosswalk-authored.json`, raw = read(f), j = JSON.parse(raw);
  const holder = j.points || j;
  for (const p of POINTS) {
    if (holder[p.tp]) throw new Error(loc + ': ' + p.tp + ' is authored already');
    holder[p.tp] = { none: 'not yet read against this curriculum', why: 'The point was added on 2026-11-25 for the new Grade 3 social studies pages of the English year (Stage D-5 batch S3); no unit teaches it yet. Read it against the wording when the Grade 3 social studies units are placed' + (loc === 'en-tx' ? ' (TEKS Social Studies, Grade 3).' : ' and this language gets its pages.'), review: 'batch-s3 2026-11-25' };
  }
  out.push([f, jsonLike(raw, j)]);
}
// ---- then everything is written
for (const [f, text] of out) fs.writeFileSync(file(f), text);
console.log('added ' + POINTS.length + ' teaching points with English C3 rows; files: ' + out.length);
